import React, { useState } from 'react';
import { Bot } from 'lucide-react';
import { useMarketingAI } from '../hooks/useMarketingAI';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import type { AIResponse } from '../types';

const INITIAL_MESSAGE: AIResponse = {
  id: '1',
  type: 'assistant',
  content: "Bonjour ! Je suis votre assistant marketing. Je peux vous aider à créer et gérer vos campagnes. Par exemple:\n- Créer campagne 4 mandats Nice\n- Analyser campagne en cours\n- Optimiser performances",
  timestamp: new Date()
};

export function MarketingAIChat() {
  const { processCommand, isProcessing } = useMarketingAI();
  const [responses, setResponses] = useState<AIResponse[]>([INITIAL_MESSAGE]);

  const handleSubmit = async (message: string) => {
    // Ajouter le message utilisateur
    const userMessage: AIResponse = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };
    setResponses(prev => [...prev, userMessage]);

    // Traiter la commande
    const response = await processCommand(message);
    setResponses(prev => [...prev, response]);
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-600" />
          <h3 className="font-medium">Assistant Marketing</h3>
        </div>
      </div>

      {/* Messages */}
      <div className="h-[400px] overflow-y-auto p-4 space-y-4">
        {responses.map(msg => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
      </div>

      {/* Input */}
      <ChatInput onSubmit={handleSubmit} isProcessing={isProcessing} />
    </div>
  );
}