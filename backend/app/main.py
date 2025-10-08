from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional

from app.config import settings
from app.models import (
    ChatRequest,
    ChatResponse,
    SessionCreate,
    SessionResponse,
    ConversationHistory,
    SummaryRequest,
    SummaryResponse,
    RAGStats
)
from app.rag_system import TherapyRAG
from app.session_manager import SessionManager
from app.utils.logger import api_logger

# Initialize FastAPI app
app = FastAPI(title="AI Therapist API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize components
session_manager = SessionManager()
rag_system = TherapyRAG()
logger = api_logger.getChild("main")

# Health check endpoint
@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

# Session management endpoints
@app.post("/api/sessions/create", response_model=SessionResponse)
async def create_session(request: SessionCreate):
    try:
        session_id = session_manager.create_session(
            user_id=request.user_id,
            metadata=request.metadata
        )
        session_data = session_manager.session_metadata[session_id]
        return SessionResponse(
            session_id=session_id,
            created_at=session_data["created_at"],
            message_count=session_data["message_count"]
        )
    except Exception as e:
        logger.error(f"Error creating session: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create session")

@app.delete("/api/sessions/{session_id}")
async def delete_session(session_id: str):
    if session_manager.delete_session(session_id):
        return {"status": "success", "message": "Session deleted"}
    raise HTTPException(status_code=404, detail="Session not found")

# Chat endpoints
@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # Get session
        therapist = session_manager.get_session(request.session_id)
        if not therapist:
            raise HTTPException(status_code=404, detail="Session not found")

        # Generate response
        response = await therapist.chat(
            user_message=request.message,
            use_rag=request.use_rag,
            n_examples=request.n_examples
        )

        # Update session
        session_manager.increment_message_count(request.session_id)

        return ChatResponse(
            response=response["response"],
            session_id=request.session_id,
            timestamp=response["timestamp"],
            sources_used=response["sources_used"]
        )

    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to generate response")

@app.get("/api/sessions/{session_id}/history", response_model=ConversationHistory)
async def get_session_history(session_id: str):
    history = session_manager.get_session_history(session_id)
    if history is None:
        raise HTTPException(status_code=404, detail="Session not found")

    metadata = session_manager.session_metadata[session_id]
    return ConversationHistory(
        session_id=session_id,
        messages=history,
        created_at=metadata["created_at"]
    )

@app.post("/api/sessions/{session_id}/summary", response_model=SummaryResponse)
async def get_session_summary(session_id: str, request: SummaryRequest):
    therapist = session_manager.get_session(session_id)
    if not therapist:
        raise HTTPException(status_code=404, detail="Session not found")

    try:
        summary = await therapist.get_conversation_summary()
        return SummaryResponse(
            summary=summary,
            session_id=session_id
        )
    except Exception as e:
        logger.error(f"Error generating summary: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to generate summary")

# RAG system endpoints
@app.post("/api/rag/initialize")
async def initialize_rag():
    try:
        await rag_system.load_and_index_datasets()
        return {"status": "success", "message": "RAG system initialized"}
    except Exception as e:
        logger.error(f"Error initializing RAG system: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to initialize RAG system")

@app.get("/api/rag/stats", response_model=RAGStats)
async def get_rag_stats():
    try:
        return rag_system.get_stats()
    except Exception as e:
        logger.error(f"Error getting RAG stats: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get RAG statistics")

# Background tasks
@app.on_event("startup")
async def startup_event():
    logger.info("Starting AI Therapist API")
    
    # Check if Gemini API key is configured
    if not settings.GEMINI_API_KEY:
        logger.error("GEMINI_API_KEY is not set. Please add it to your .env file.")
        raise Exception("GEMINI_API_KEY is not configured")
    
    # Verify Gemini API key format
    if not settings.GEMINI_API_KEY.startswith("AI") and len(settings.GEMINI_API_KEY) < 10:
        logger.warning("GEMINI_API_KEY format looks incorrect. Please verify your API key.")
    
    logger.info("API configuration verified")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Shutting down AI Therapist API")
