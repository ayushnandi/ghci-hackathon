'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BotIcon, UserIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export type MessageRole = 'user' | 'assistant';

export interface MessageProps {
  role: MessageRole;
  content: string;
  timestamp?: Date;
  className?: string;
}

export const Message = ({
  role,
  content,
  timestamp,
  className,
}: MessageProps) => {
  const isUser = role === 'user';

  return (
    <div
      className={cn(
        'flex w-full gap-3',
        isUser ? 'justify-end' : 'justify-start',
        className
      )}
    >
      {!isUser && (
        <Avatar className="size-8 shrink-0">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <BotIcon className="size-4" />
          </AvatarFallback>
          <AvatarImage src="/bot-avatar.png" alt="BroBankAI" />
        </Avatar>
      )}

      <div
        className={cn(
          'flex max-w-[80%] flex-col gap-1',
          isUser && 'items-end'
        )}
      >
        <Card
          className={cn(
            'border-none shadow-sm',
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-foreground'
          )}
        >
          <CardContent className="p-3">
            {isUser ? (
              <p className="whitespace-pre-wrap text-sm">{content}</p>
            ) : (
              <div className="prose prose-sm max-w-none dark:prose-invert prose-p:leading-relaxed prose-pre:p-0">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => (
                      <p className="mb-2 last:mb-0">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="mb-2 ml-4 list-disc last:mb-0">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="mb-2 ml-4 list-decimal last:mb-0">
                        {children}
                      </ol>
                    ),
                    code: ({ className, children, ...props }) => {
                      const inline = !className;
                      return inline ? (
                        <code
                          className="rounded bg-primary/10 px-1 py-0.5 font-mono text-xs"
                          {...props}
                        >
                          {children}
                        </code>
                      ) : (
                        <code
                          className={cn('font-mono text-xs', className)}
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            )}
          </CardContent>
        </Card>

        {timestamp && (
          <span className="px-1 text-xs text-muted-foreground">
            {timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        )}
      </div>

      {isUser && (
        <Avatar className="size-8 shrink-0">
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            <UserIcon className="size-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};
