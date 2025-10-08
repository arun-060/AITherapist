from datetime import datetime
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field

class ChatRequest(BaseModel):
    message: str
    session_id: str
    use_rag: bool = True
    n_examples: int = Field(default=3, ge=1, le=10)

class ChatResponse(BaseModel):
    response: str
    session_id: str
    timestamp: datetime = Field(default_factory=datetime.now)
    sources_used: Optional[List[str]] = None

class SessionCreate(BaseModel):
    user_id: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None

class SessionResponse(BaseModel):
    session_id: str
    created_at: datetime
    message_count: int

class ConversationHistory(BaseModel):
    session_id: str
    messages: List[Dict[str, Any]]
    created_at: datetime

class SummaryRequest(BaseModel):
    session_id: str

class SummaryResponse(BaseModel):
    summary: str
    session_id: str

class RAGStats(BaseModel):
    total_documents: int
    collection_name: str
    embedding_model: str
    last_updated: Optional[datetime] = None