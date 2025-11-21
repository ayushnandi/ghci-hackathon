'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';

export interface ChatContainerProps {
  children: ReactNode;
  className?: string;
}

export const ChatContainer = ({ children, className }: ChatContainerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [children]);

  return (
    <div className={cn('flex h-full flex-col', className)}>
      <ScrollArea className="flex-1">
        <div ref={scrollRef} className="flex flex-col gap-4 p-4">
          {children}
        </div>
      </ScrollArea>
    </div>
  );
};
