# AI Therapist Backend

A FastAPI-based backend system for the AI Therapist application, featuring RAG-enhanced conversational AI using Gemini API.

## Features

- FastAPI REST API with async support
- RAG system using ChromaDB and HuggingFace datasets
- Google Gemini integration for AI responses
- Session management and conversation history
- Content safety monitoring
- Rate limiting and request validation
- Comprehensive logging and monitoring
- Docker support

## Setup

1. Create virtual environment:
```powershell
python -m venv .venv
.\.venv\Scripts\activate  # Windows
```

2. Install dependencies:
```powershell
pip install -r requirements.txt
```

3. Configure environment variables:
```powershell
Copy-Item .env.example .env
# Edit .env with your settings
```

4. Run the application:
```powershell
uvicorn app.main:app --reload --port 8000
```

## Initialize RAG System

Before using the chat functionality, initialize the RAG system:

```http
POST http://localhost:8000/api/rag/initialize
```

Note: Initial indexing may take 30-60 minutes depending on your hardware.

## API Documentation

Once running, visit:
- OpenAPI docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

Detailed API documentation available in `/docs/API.md`

## Project Structure

```
backend/
├── app/
│   ├── main.py           # FastAPI application
│   ├── models.py         # Pydantic models
│   ├── config.py         # Configuration management
│   ├── therapist.py      # Gemini integration
│   ├── rag_system.py     # RAG implementation
│   ├── session_manager.py # Session handling
│   ├── monitoring.py     # Metrics collection
│   ├── middleware/
│   │   └── rate_limiter.py
│   └── utils/
│       ├── logger.py
│       └── safety_checker.py
├── tests/
│   ├── test_api.py
│   └── test_rag.py
├── logs/                 # Log files
├── therapy_vector_db/    # ChromaDB storage
├── requirements.txt
├── Dockerfile
└── .env
```

## Testing

Run tests:
```powershell
pytest tests/
```

With coverage:
```powershell
pytest --cov=app tests/
```

## Docker Support

Build image:
```powershell
docker build -t ai-therapist-backend .
```

Run container:
```powershell
docker run -p 8000:8000 -v therapy_vector_db:/app/therapy_vector_db ai-therapist-backend
```

## Environment Variables

- `GEMINI_API_KEY`: Google Gemini API key
- `VECTOR_DB_PATH`: ChromaDB storage path
- `EMBEDDING_MODEL`: Sentence transformer model
- `GEMINI_MODEL`: Gemini model version
- `LOG_LEVEL`: Logging level (INFO/DEBUG)

## Monitoring

The application includes comprehensive monitoring:
- Request metrics
- Token usage tracking
- System performance
- Error rates
- Response times

Access metrics:
```http
GET http://localhost:8000/api/monitoring/stats
```

## Security

- Rate limiting: 60 requests/minute per IP
- Content safety checking
- Input validation
- CORS configuration
- Error handling

## Contributing

1. Create feature branch
2. Make changes
3. Run tests
4. Submit pull request

## License

MIT License - see LICENSE file for details