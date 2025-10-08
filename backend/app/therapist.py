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
        self.model = genai.GenerativeModel(self.model_name)
        
        # Start chat
        self.chat = self.model.start_chat(history=[])

    def _build_system_prompt(self, context: str = "") -> str:
        """Build system prompt with RAG context"""
        return f"""You are a compassionate and empathetic AI therapist specializing in mental health support.

Your responsibilities:
- Provide emotional support and active listening
- Use evidence-based therapeutic techniques
- Ask clarifying questions when needed
- Validate feelings and emotions
- Suggest healthy coping strategies
- Maintain a warm, non-judgmental tone
- Prioritize user safety and wellbeing

IMPORTANT SAFETY GUIDELINES:
- If user expresses suicidal thoughts, immediately encourage professional help
- Provide crisis hotline numbers when appropriate
- Never provide medical diagnoses
- Always recommend professional help for serious issues

Use the following examples from real therapy conversations to guide your responses:
{context}

Recent conversation context:
{self._format_conversation_history()}"""

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

            # Update system prompt with new context
            system_prompt = self._build_system_prompt(context)
            
            # Add user message to history
            self.conversation_history.append({
                "role": "user",
                "content": user_message,
                "timestamp": datetime.now()
            })

            # Generate response
            response = await self.chat.send_message(
                user_message,
                system_prompt=system_prompt
            )

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
        self.chat = self.model.start_chat(history=[])

    async def get_conversation_summary(self) -> str:
        """Generate a summary of the conversation"""
        if not self.conversation_history:
            return "No conversation to summarize."

        try:
            summary_prompt = f"""Please provide a concise summary of the following therapy conversation, highlighting:
- Main topics discussed
- User's key concerns
- Your therapeutic approaches used
- Any action items or recommendations given

Conversation:
{self._format_conversation_history()}"""

            response = await self.chat.send_message(
                summary_prompt,
                system_prompt="You are analyzing a therapy conversation to create a professional summary."
            )

            return response.text

        except Exception as e:
            self.logger.error(f"Error in get_conversation_summary: {str(e)}")
            raise

    def get_conversation_history(self) -> List[Dict[str, Any]]:
        """Return the conversation history"""
        return self.conversation_history