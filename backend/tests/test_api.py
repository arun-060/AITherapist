import pytest
from fastapi.testclient import TestClient
from ..app.main import app
from ..app.models import (
    ChatRequest,
    SessionCreate,
    SummaryRequest
)

@pytest.fixture
def test_client():
    return TestClient(app)

def test_health_check(test_client):
    response = test_client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

def test_create_session(test_client):
    request = SessionCreate(user_id="test_user")
    response = test_client.post("/api/sessions/create", json=request.dict())
    assert response.status_code == 200
    data = response.json()
    assert "session_id" in data
    assert "created_at" in data
    assert "message_count" in data
    assert data["message_count"] == 0

def test_delete_session(test_client):
    # First create a session
    request = SessionCreate(user_id="test_user")
    create_response = test_client.post("/api/sessions/create", json=request.dict())
    session_id = create_response.json()["session_id"]
    
    # Then delete it
    delete_response = test_client.delete(f"/api/sessions/{session_id}")
    assert delete_response.status_code == 200
    assert delete_response.json()["status"] == "success"
    
    # Try deleting again should fail
    second_delete = test_client.delete(f"/api/sessions/{session_id}")
    assert second_delete.status_code == 404

def test_chat_with_invalid_session(test_client):
    request = ChatRequest(
        message="Hello",
        session_id="nonexistent_session",
        use_rag=True,
        n_examples=3
    )
    response = test_client.post("/api/chat", json=request.dict())
    assert response.status_code == 404

def test_chat_flow(test_client):
    # Create session
    session_response = test_client.post(
        "/api/sessions/create",
        json=SessionCreate().dict()
    )
    session_id = session_response.json()["session_id"]
    
    # Send chat message
    chat_request = ChatRequest(
        message="Hello, I'm feeling anxious",
        session_id=session_id,
        use_rag=True,
        n_examples=3
    )
    chat_response = test_client.post("/api/chat", json=chat_request.dict())
    assert chat_response.status_code == 200
    assert "response" in chat_response.json()
    
    # Get history
    history_response = test_client.get(f"/api/sessions/{session_id}/history")
    assert history_response.status_code == 200
    assert len(history_response.json()["messages"]) > 0
    
    # Get summary
    summary_request = SummaryRequest(session_id=session_id)
    summary_response = test_client.post(
        f"/api/sessions/{session_id}/summary",
        json=summary_request.dict()
    )
    assert summary_response.status_code == 200
    assert "summary" in summary_response.json()

def test_rag_stats(test_client):
    response = test_client.get("/api/rag/stats")
    assert response.status_code == 200
    data = response.json()
    assert "total_documents" in data
    assert "collection_name" in data
    assert "embedding_model" in data

def test_cors_headers(test_client):
    response = test_client.options("/api/health")
    assert "access-control-allow-origin" in response.headers
    assert "access-control-allow-credentials" in response.headers
    assert "access-control-allow-methods" in response.headers
    assert "access-control-allow-headers" in response.headers

def test_rate_limiting(test_client):
    # Make many requests quickly
    for _ in range(70):  # More than our per-minute limit
        test_client.get("/api/health")
        
    # Next request should fail
    response = test_client.get("/api/health")
    assert response.status_code == 429
    assert "Too many requests" in response.json()["detail"]

def test_invalid_requests(test_client):
    # Test missing required fields
    response = test_client.post("/api/chat", json={})
    assert response.status_code == 422
    
    # Test invalid session ID format
    response = test_client.get("/api/sessions/invalid-format/history")
    assert response.status_code == 404