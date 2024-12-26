import React, { useState } from 'react';
import { MarketingRequestHandler } from '@/lib/ai/marketing/handlers/MarketingRequestHandler';
import { useAIChat } from '@/lib/hooks/useAIChat';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import type { Message } from './types';

const INITIAL_MESSAGE: Message = {
  id: '1',
  content: "Bonjour ! Je suis votre assistant marketing. Comment puis-je vous aider aujourd'hui ?",
  type: 'assistant',
  timestamp: new Date()
};

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [minimized, setMinimized] = useState(false);
  const { isProcessing } = useAIChat();

  const handleSubmit = async (message: string) => {
    if (!message.trim() || isProcessing) return;

    // Ajouter le message utilisateur
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      type: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      // Traiter la requête
      const response = await MarketingRequestHandler.handleRequest(message);
      
      // Ajouter la réponse de l'assistant
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.message,
        type: 'assistant',
        timestamp: new Date(),
        actions: response.actions
      };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('Error processing request:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Désolé, une erreur s'est produite. Veuillez réessayer.",
        type: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl border border-gray-200 ${
      minimized ? 'h-16' : 'h-[600px]'
    } transition-all duration-200`}>
      <ChatHeader 
        minimized={minimized} 
        onToggleMinimize={() => setMinimized(!minimized)} 
      />

      {!minimized && (
        <>
          <ChatMessages messages={messages} />
          <ChatInput
            onSubmit={handleSubmit}
            isProcessing={isProcessing}
          />
        </>
      )}
    </div>
  );
}