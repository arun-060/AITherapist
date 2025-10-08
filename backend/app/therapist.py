import google.generativeai as genai
from typing import List, Dict, Any, Optional
from datetime import datetime

from .utils.logger import therapist_logger
from .config import settings
from .rag_system import TherapyRAG

class GeminiTherapist:
    """AI Therapist using Gemini API with RAG support"""

    def __init__(
        self,
        gemini_api_key: str,
        rag_system: Optional[TherapyRAG] = None,
        model_name: str = None
    ):
        self.logger = therapist_logger.getChild("GeminiTherapist")
        self.model_name = model_name or settings.GEMINI_MODEL
        self.conversation_history: List[Dict[str, Any]] = []
        self.rag_system = rag_system

        # Initialize Gemini API
        genai.configure(api_key=gemini_api_key)
        
        # Configure the model with generation settings
        generation_config = {
            "temperature": 0.7,
            "top_p": 0.8,
            "top_k": 40
        }
        self.model = genai.GenerativeModel(
            model_name=self.model_name,
            generation_config=generation_config
        )
        
        # Start chat
        self.chat_session = self.model.start_chat(history=[])

    def _build_system_prompt(self, context: str = "") -> str:
        """Build system prompt with RAG context"""
        base_prompt = """You are a compassionate and empathetic AI therapist. Your goal is to provide supportive, non-judgmental responses while maintaining professional boundaries. Focus on:

            1. Active Listening & Validation
            2. Emotional Support & Understanding
            3. Gentle Guidance & Coping Strategies
            4. Safety & Professional Referral when needed

            Guidelines:
            * Use a warm, empathetic tone
            * Ask clarifying questions
            * Validate emotions and experiences
            * Suggest practical coping strategies
            * Maintain appropriate boundaries

            Safety Protocol:
            * For suicidal thoughts -> Immediate professional help
            * For serious mental health -> Recommend therapy
            * No medical diagnoses
            * No prescriptions or medical advice

            Reference Examples:
        """

        if context:
            base_prompt += f"\n{context}"
        
        if self.conversation_history:
            base_prompt += f"\n\nConversation History:\n{self._format_conversation_history()}"
            
        base_prompt += "\n\nRespond as a compassionate therapist while following all guidelines above."
        
        return base_prompt

    def _format_conversation_history(self) -> str:
        """Format conversation history for context"""
        if not self.conversation_history:
            return "No previous conversation."
            
        formatted = []
        for msg in self.conversation_history[-settings.MAX_CONVERSATION_HISTORY:]:
            role = "User" if msg["role"] == "user" else "Therapist"
            formatted.append(f"{role}: {msg['content']}")
            
        return "\n".join(formatted)

    async def chat(
        self,
        user_message: str,
        use_rag: bool = True,
        n_examples: int = 3
    ) -> Dict[str, Any]:
        """Generate a response to user message"""
        try:
            # Get RAG context if enabled
            context = ""
            sources_used = []
            if use_rag and self.rag_system:
                retrieved = await self.rag_system.retrieve(user_message, n_examples)
                if retrieved:
                    context_parts = []
                    for i, result in enumerate(retrieved, 1):
                        context_parts.append(f"Example {i}:\n{result['text']}")
                        sources_used.append(result['metadata']['source'])
                    context = "\n\n".join(context_parts)

            # Build the complete message with context and guidelines
            system_prompt = self._build_system_prompt(context)
            complete_message = f"{system_prompt}\n\nUser: {user_message}"
            
            # Add user message to history
            self.conversation_history.append({
                "role": "user",
                "content": user_message,
                "timestamp": datetime.now()
            })

            try:
                # Generate response
                response = self.chat_session.send_message(complete_message)
            except Exception as e:
                self.logger.error(f"Error from Gemini API: {str(e)}")
                # Handle common API errors
                if "API key" in str(e).lower():
                    raise Exception("Invalid or missing API key. Please check your configuration.")
                elif "rate limit" in str(e).lower():
                    raise Exception("API rate limit exceeded. Please try again later.")
                else:
                    raise Exception(f"Error from Gemini API: {str(e)}")

            # Add assistant response to history
            assistant_message = {
                "role": "assistant",
                "content": response.text,
                "timestamp": datetime.now()
            }
            self.conversation_history.append(assistant_message)

            # Trim history if needed
            if len(self.conversation_history) > settings.MAX_CONVERSATION_HISTORY * 2:
                self.conversation_history = self.conversation_history[-settings.MAX_CONVERSATION_HISTORY * 2:]

            return {
                "response": response.text,
                "sources_used": sources_used if sources_used else None,
                "timestamp": datetime.now()
            }

        except Exception as e:
            self.logger.error(f"Error in chat: {str(e)}")
            raise

    def reset_conversation(self) -> None:
        """Clear conversation history"""
        self.conversation_history = []
        self.chat_session = self.model.start_chat(history=[])

    async def get_conversation_summary(self) -> str:
        """Generate a summary of the conversation"""
        if not self.conversation_history:
            return "No conversation to summarize."

        try:
            summary_prompt = (
                "Please provide a concise summary of the following therapy conversation, highlighting:\n"
                "1. Main topics discussed\n"
                "2. User's key concerns\n"
                "3. Your therapeutic approaches used\n"
                "4. Any action items or recommendations given\n\n"
                f"Conversation:\n{self._format_conversation_history()}"
            )

            response =  self.chat_session.send_message(summary_prompt)

            return response.text

        except Exception as e:
            self.logger.error(f"Error in get_conversation_summary: {str(e)}")
            raise

    def get_conversation_history(self) -> List[Dict[str, Any]]:
        """Return the conversation history"""
        return self.conversation_history