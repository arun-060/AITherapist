'use client';

import React, { useState, useEffect, useRef } from 'react';
import { apiClient, ChatMessage } from '@/lib/api';

interface ChatInterfaceProps {
  onSessionCreate?: (sessionId: string) => void;
  initialSessionId?: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  onSessionCreate,
  initialSessionId,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useRAG, setUseRAG] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Initialize session
  useEffect(() => {
    const initSession = async () => {
      try {
        if (initialSessionId) {
          apiClient.setSessionId(initialSessionId);
          setSessionId(initialSessionId);
          const history = await apiClient.getSessionHistory();
          setMessages(history);
        } else {
          const newSessionId = await apiClient.createSession();
          setSessionId(newSessionId);
          if (onSessionCreate) {
            onSessionCreate(newSessionId);
          }
        }
      } catch (error) {
        console.error('Error initializing session:', error);
      }
    };

    initSession();
  }, [initialSessionId, onSessionCreate]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    try {
      setIsLoading(true);
      
      // Add user message
      const userMessage: ChatMessage = {
        role: 'user',
        content: inputMessage,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setInputMessage('');

      // Get AI response
      const response = await apiClient.sendMessage(inputMessage, useRAG);
      setMessages((prev) => [...prev, response]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto p-4">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              {message.sources && message.sources.length > 0 && (
                <div className="mt-2 text-xs opacity-75">
                  Sources: {message.sources.join(', ')}
                </div>
              )}
              <div className="text-xs opacity-75 mt-1">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t pt-4">
        <div className="flex items-center mb-2">
          <label className="flex items-center text-sm text-gray-600">
            <input
              type="checkbox"
              checked={useRAG}
              onChange={(e) => setUseRAG(e.target.checked)}
              className="mr-2"
            />
            Use RAG System
          </label>
        </div>
        <div className="flex space-x-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg resize-none"
            rows={3}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className={`px-4 py-2 rounded-lg ${
              isLoading || !inputMessage.trim()
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};