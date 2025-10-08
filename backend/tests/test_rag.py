import pytest
from unittest.mock import Mock, patch
from ..app.rag_system import TherapyDatasetProcessor, TherapyRAG

@pytest.fixture
def mock_sentence_transformer():
    with patch("sentence_transformers.SentenceTransformer") as mock:
        mock_instance = Mock()
        mock_instance.encode.return_value = [[0.1, 0.2, 0.3]]
        mock.return_value = mock_instance
        yield mock

@pytest.fixture
def mock_chromadb():
    with patch("chromadb.PersistentClient") as mock:
        mock_instance = Mock()
        mock_collection = Mock()
        mock_collection.count.return_value = 100
        mock_instance.get_or_create_collection.return_value = mock_collection
        mock.return_value = mock_instance
        yield mock

def test_dataset_processor_init():
    processor = TherapyDatasetProcessor()
    assert len(processor.DATASET_CONFIGS) == 11

@pytest.mark.asyncio
async def test_therapy_rag_initialization(mock_sentence_transformer, mock_chromadb):
    rag = TherapyRAG("./test_db")
    assert rag.collection_name == "therapy_conversations"
    assert rag.vector_db_path == "./test_db"

@pytest.mark.asyncio
async def test_therapy_rag_retrieve(mock_sentence_transformer, mock_chromadb):
    rag = TherapyRAG("./test_db")
    results = await rag.retrieve("test query", n_results=3)
    assert isinstance(results, list)

@pytest.mark.asyncio
async def test_therapy_rag_stats(mock_sentence_transformer, mock_chromadb):
    rag = TherapyRAG("./test_db")
    stats = rag.get_stats()
    assert "total_documents" in stats
    assert "collection_name" in stats
    assert "embedding_model" in stats

def test_text_processing():
    processor = TherapyDatasetProcessor()
    text = " This is a  test   message  "
    processed = processor._process_text(text)
    assert processed == "This is a test message"

@pytest.mark.asyncio
async def test_load_and_index_datasets_empty(mock_sentence_transformer, mock_chromadb):
    rag = TherapyRAG("./test_db")
    with patch("datasets.load_dataset") as mock_load:
        mock_load.return_value = {"train": []}
        await rag.load_and_index_datasets()
        # Should not raise any exceptions

@pytest.mark.asyncio
async def test_get_context_for_llm(mock_sentence_transformer, mock_chromadb):
    rag = TherapyRAG("./test_db")
    with patch.object(rag, "retrieve") as mock_retrieve:
        mock_retrieve.return_value = [
            {
                "text": "Example conversation",
                "metadata": {"source": "test_dataset"}
            }
        ]
        context = rag.get_context_for_llm("test query")
        assert isinstance(context, str)
        assert "Example conversation" in context