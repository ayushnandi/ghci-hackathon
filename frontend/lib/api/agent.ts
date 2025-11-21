export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface SendMessageRequest {
  message: string;
  conversationId?: string;
}

export interface SendMessageResponse {
  response: string;
  conversationId: string;
  suggestions?: string[];
}

export class AgentAPIClient {
  private baseURL: string;

  constructor(baseURL: string = '/api/agent') {
    this.baseURL = baseURL;
  }

  async sendMessage(
    request: SendMessageRequest
  ): Promise<SendMessageResponse> {
    try {
      const response = await fetch(`${this.baseURL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
}

export const agentAPI = new AgentAPIClient();
