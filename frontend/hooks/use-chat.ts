'use client';

import { agentAPI, type ChatMessage } from '@/lib/api/agent';
import { useCallback, useState } from 'react';
import type { ChatStatus } from '@/components/chat/prompt-input';

export interface UseChatOptions {
  initialMessages?: ChatMessage[];
  onError?: (error: Error) => void;
}

export interface UseChatReturn {
  messages: ChatMessage[];
  status: ChatStatus;
  sendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
  error: Error | null;
  clearMessages: () => void;
}

export function useChat(options: UseChatOptions = {}): UseChatReturn {
  const { initialMessages = [], onError } = options;

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [status, setStatus] = useState<ChatStatus>('idle');
  const [error, setError] = useState<Error | null>(null);
  const [conversationId, setConversationId] = useState<string | undefined>();

  const sendMessage = useCallback(
    async (message: string) => {
      if (!message.trim()) return;

      // Add user message immediately
      const userMessage: ChatMessage = {
        role: 'user',
        content: message.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setStatus('submitted');
      setError(null);

      try {
        // Call the API
        const response = await agentAPI.sendMessage({
          message: message.trim(),
          conversationId,
        });

        // Update conversation ID if this is the first message
        if (!conversationId && response.conversationId) {
          setConversationId(response.conversationId);
        }

        // Add assistant message
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: response.response,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setStatus('idle');
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        setStatus('error');
        onError?.(error);

        // Add error message
        const errorMessage: ChatMessage = {
          role: 'assistant',
          content:
            'Sorry, I encountered an error processing your message. Please try again.',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);

        // Reset status after a delay
        setTimeout(() => setStatus('idle'), 3000);
      }
    },
    [conversationId, onError]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setConversationId(undefined);
    setStatus('idle');
    setError(null);
  }, []);

  return {
    messages,
    status,
    sendMessage,
    isLoading: status === 'submitted' || status === 'streaming',
    error,
    clearMessages,
  };
}
