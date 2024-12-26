import React, { useState } from 'react';
import { useAIAssistant } from '../hooks/useAIAssistant';
import { AIChat } from './AIChat';
import { AIActions } from './AIActions';
import { AIFeedback } from './AIFeedback';
import type { AIAction } from '../types';

export function AIAssistant() {
  const [actions, setActions] = useState<AIAction[]>([]);
  const { processQuery, isProcessing, error } = useAIAssistant();

  const handleQuery = async (query: string) => {
    try {
      const response = await processQuery(query);
      if (response.actions) {
        setActions(response.actions);
      }
      return response;
    } catch (err) {
      console.error('AI Assistant error:', err);
      return {
        message: "Je suis désolé, une erreur s'est produite. Veuillez réessayer.",
        confidence: 0
      };
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl">
      <AIChat onQuery={handleQuery} isProcessing={isProcessing} />
      {actions.length > 0 && <AIActions actions={actions} />}
      {error && <AIFeedback error={error} />}
    </div>
  );
}