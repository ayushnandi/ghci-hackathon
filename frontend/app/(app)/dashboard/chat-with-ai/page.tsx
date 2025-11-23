'use client';

import { ChatContainer } from '@/components/chat/chat-container';
import { Message } from '@/components/chat/message';
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
} from '@/components/chat/prompt-input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useChat } from '@/hooks/use-chat';
import { BrainCircuitIcon, SparklesIcon } from 'lucide-react';
import { type FormEvent, useState } from 'react';

const SUGGESTED_PROMPTS = [
  'Show me my recent transactions',
  'What is my current account balance?',
  'Help me create a monthly budget',
  'Analyze my spending patterns',
  'How can I save more money?',
  'Explain my latest credit card statement',
];

export default function ChatWithAI() {
  const { messages, status, sendMessage, isLoading } = useChat();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    await sendMessage(inputValue);
    setInputValue('');
  };

  const handleSuggestionClick = (prompt: string) => {
    if (isLoading) return;
    sendMessage(prompt);
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col gap-4 p-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <BrainCircuitIcon className="size-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Chat With AI</h1>
          <p className="text-sm text-muted-foreground">
            Your personal financial assistant powered by BroBankAI
          </p>
        </div>
      </div>

      {/* Chat Area */}
      <Card className="flex flex-1 flex-col overflow-hidden">
        <CardHeader className="border-b">
          <CardTitle className="text-lg">Conversation</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-4 p-0">
          {messages.length === 0 ? (
            /* Empty State */
            <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
              <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
                <SparklesIcon className="size-10 text-primary" />
              </div>
              <div className="text-center">
                <h2 className="mb-2 text-xl font-semibold">
                  Start a Conversation
                </h2>
                <p className="mb-6 text-muted-foreground">
                  Ask me anything about your finances, transactions, or get
                  personalized advice
                </p>
              </div>

              {/* Suggested Prompts */}
              <div className="w-full max-w-2xl">
                <p className="mb-3 text-sm font-medium text-muted-foreground">
                  Try asking:
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSuggestionClick(prompt)}
                      className="rounded-lg border bg-card p-3 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Message List */
            <ChatContainer className="flex-1">
              {messages.map((message, index) => (
                <Message
                  key={index}
                  role={message.role}
                  content={message.content}
                  timestamp={message.timestamp}
                />
              ))}
            </ChatContainer>
          )}

          {/* Input Area */}
          <div className="border-t p-4">
            <PromptInput onSubmit={handleSubmit}>
              <PromptInputTextarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about your finances..."
                disabled={isLoading}
              />
              <PromptInputToolbar>
                <div className="flex-1" />
                <PromptInputSubmit status={status} disabled={isLoading} />
              </PromptInputToolbar>
            </PromptInput>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
