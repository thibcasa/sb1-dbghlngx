import React from 'react';
import { Bot, User } from 'lucide-react';
import { SuggestionList } from './SuggestionList';
import { ActionButtons } from './ActionButtons';
import type { AIResponse, AIAction } from '../types';

interface ChatMessageProps {
  message: AIResponse;
  onSuggestionSelect: (suggestion: string) => void;
  onAction: (action: AIAction) => void;
}

export function ChatMessage({ message, onSuggestionSelect, onAction }: ChatMessageProps) {
  const isUser = message.type === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-2`}>
        <div className={`flex-shrink-0 rounded-full p-2 ${
          isUser ? 'bg-blue-100' : 'bg-gray-100'
        }`}>
          {isUser ? (
            <User className="w-4 h-4 text-blue-600" />
          ) : (
            <Bot className="w-4 h-4 text-gray-600" />
          )}
        </div>
        
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`rounded-lg px-4 py-2 ${
            isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
          }`}>
            <p className="whitespace-pre-wrap">{message.content}</p>
            
            {!isUser && message.suggestions && (
              <SuggestionList 
                suggestions={message.suggestions} 
                onSelect={onSuggestionSelect}
              />
            )}
            
            {!isUser && message.actions && (
              <ActionButtons 
                actions={message.actions}
                onAction={onAction}
              />
            )}
          </div>
          
          <span className="text-xs text-gray-500 mt-1">
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
      </div>
    </div>
  );
}