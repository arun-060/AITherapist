# AI Therapist API Documentation

## Base URL
```
http://localhost:8000
```

## Authentication
Currently, no authentication is required. JWT-based authentication will be added in future versions.

## Endpoints

### Health Check
```http
GET /api/health
```
Returns server health status.

Response:
```json
{
  "status": "healthy"
}
```

### Session Management

#### Create Session
```http
POST /api/sessions/create
```
Create a new therapy session.

Request Body:
```json
{
  "user_id": "optional_user_id",
  "metadata": {
    "any": "custom metadata"
  }
}
```

Response:
```json
{
  "session_id": "uuid",
  "created_at": "2025-10-08T12:00:00Z",
  "message_count": 0
}
```

#### Delete Session
```http
DELETE /api/sessions/{session_id}
```
Delete a therapy session.

Response:
```json
{
  "status": "success",
  "message": "Session deleted"
}
```

### Chat Interaction

#### Send Message
```http
POST /api/chat
```
Send a message and get AI response.

Request Body:
```json
{
  "message": "I'm feeling anxious",
  "session_id": "uuid",
  "use_rag": true,
  "n_examples": 3
}
```

Response:
```json
{
  "response": "I understand that anxiety can be overwhelming...",
  "session_id": "uuid",
  "timestamp": "2025-10-08T12:01:00Z",
  "sources_used": ["dataset1", "dataset2"]
}
```

#### Get Session History
```http
GET /api/sessions/{session_id}/history
```
Get conversation history for a session.

Response:
```json
{
  "session_id": "uuid",
  "messages": [
    {
      "role": "user",
      "content": "I'm feeling anxious",
      "timestamp": "2025-10-08T12:00:00Z"
    },
    {
      "role": "assistant",
      "content": "I understand...",
      "timestamp": "2025-10-08T12:00:01Z"
    }
  ],
  "created_at": "2025-10-08T12:00:00Z"
}
```

#### Get Conversation Summary
```http
POST /api/sessions/{session_id}/summary
```
Get a summary of the conversation.

Request Body:
```json
{
  "session_id": "uuid"
}
```

Response:
```json
{
  "summary": "Session focused on anxiety management...",
  "session_id": "uuid"
}
```

### RAG System Management

#### Initialize RAG
```http
POST /api/rag/initialize
```
Initialize the RAG system by loading and indexing datasets.

Response:
```json
{
  "status": "success",
  "message": "RAG system initialized"
}
```

#### Get RAG Statistics
```http
GET /api/rag/stats
```
Get statistics about the RAG system.

Response:
```json
{
  "total_documents": 1000,
  "collection_name": "therapy_conversations",
  "embedding_model": "sentence-transformers/all-MiniLM-L6-v2",
  "last_updated": "2025-10-08T12:00:00Z"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "detail": "Invalid request parameters"
}
```

### 404 Not Found
```json
{
  "detail": "Session not found"
}
```

### 429 Too Many Requests
```json
{
  "detail": "Too many requests. Please try again in a minute."
}
```

### 500 Internal Server Error
```json
{
  "detail": "An unexpected error occurred"
}
```

## Rate Limiting
- 60 requests per minute per IP
- Burst limit: 120 requests per minute
- 10 requests per 10 seconds (burst window)

## Best Practices
1. Always maintain session context by using the same session_id
2. Handle rate limiting with exponential backoff
3. Implement proper error handling
4. Clean up sessions when done
5. Use RAG when needed for more contextual responses

## Future Enhancements
1. JWT Authentication
2. WebSocket support for real-time chat
3. Message encryption
4. Bulk operations
5. Advanced session management