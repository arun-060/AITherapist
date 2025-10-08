// API Base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Types
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: string[];
}

export interface Session {
  sessionId: string;
  createdAt: Date;
  messageCount: number;
}

export interface RAGStats {
  totalDocuments: number;
  collectionName: string;
  embeddingModel: string;
  lastUpdated?: Date;
}

// API Client
class APIClient {
  private sessionId: string | null = null;

  // Create a new therapy session
  async createSession(): Promise<string> {
    try {
      const response = await fetch(`${API_URL}/api/sessions/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error('Failed to create session');
      }

      const data = await response.json();
      this.sessionId = data.session_id;
      return data.session_id;
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  }

  // Send a message to the AI therapist
  async sendMessage(message: string, useRAG: boolean = true): Promise<ChatMessage> {
    if (!this.sessionId) {
      throw new Error('No active session');
    }

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          session_id: this.sessionId,
          use_rag: useRAG,
          n_examples: 3,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      return {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(data.timestamp),
        sources: data.sources_used,
      };
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  // Get conversation history
  async getSessionHistory(): Promise<ChatMessage[]> {
    if (!this.sessionId) {
      return [];
    }

    try {
      const response = await fetch(
        `${API_URL}/api/sessions/${this.sessionId}/history`
      );

      if (!response.ok) {
        throw new Error('Failed to get history');
      }

      const data = await response.json();
      return data.messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
        timestamp: new Date(msg.timestamp),
        sources: msg.sources,
      }));
    } catch (error) {
      console.error('Error getting history:', error);
      throw error;
    }
  }

  // Get conversation summary
  async getSummary(): Promise<string> {
    if (!this.sessionId) {
      throw new Error('No active session');
    }

    try {
      const response = await fetch(
        `${API_URL}/api/sessions/${this.sessionId}/summary`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ session_id: this.sessionId }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get summary');
      }

      const data = await response.json();
      return data.summary;
    } catch (error) {
      console.error('Error getting summary:', error);
      throw error;
    }
  }

  // Delete session
  async deleteSession(): Promise<void> {
    if (!this.sessionId) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/sessions/${this.sessionId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete session');
      }

      this.sessionId = null;
    } catch (error) {
      console.error('Error deleting session:', error);
      throw error;
    }
  }

  // Get RAG system statistics
  async getRAGStats(): Promise<RAGStats> {
    try {
      const response = await fetch(`${API_URL}/api/rag/stats`);

      if (!response.ok) {
        throw new Error('Failed to get RAG stats');
      }

      const data = await response.json();
      return {
        totalDocuments: data.total_documents,
        collectionName: data.collection_name,
        embeddingModel: data.embedding_model,
        lastUpdated: data.last_updated ? new Date(data.last_updated) : undefined,
      };
    } catch (error) {
      console.error('Error getting RAG stats:', error);
      throw error;
    }
  }

  // Check API health
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/api/health`);
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  // Get current session ID
  getCurrentSessionId(): string | null {
    return this.sessionId;
  }

  // Set session ID
  setSessionId(sessionId: string) {
    this.sessionId = sessionId;
  }
}

// Export singleton instance
export const apiClient = new APIClient();