import React from 'react';
import ChatMessage from './ChatMessage';
import type { Message } from './types';

interface ChatMessagesProps {
  messages: Message[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="h-[calc(100%-8rem)] overflow-y-auto p-4">
      {messages.map(msg => (
        <ChatMessage key={msg.id} {...msg} />
      ))}
    </div>
  );
}