import { useState, useCallback } from 'react';
import { supabase } from '../supabase/client';

interface AIResponse {
  message: string;
  actions?: {
    type: 'create_campaign' | 'update_lead' | 'schedule_interaction';
    payload: any;
  }[];
}

export function useAIChat() {
  const [isProcessing, setIsProcessing] = useState(false);

  const processMessage = useCallback(async (message: string): Promise<AIResponse> => {
    setIsProcessing(true);
    try {
      // TODO: Implement actual AI processing
      // For now, return a mock response
      return {
        message: "Je comprends votre demande. Je vais vous aider à configurer une campagne optimisée.",
        actions: [
          {
            type: 'create_campaign',
            payload: {
              name: 'Campagne Propriétaires Nice',
              budget: 300,
              targetAudience: {
                ageRange: { min: 35, max: 55 },
                location: 'Nice',
                propertyOwner: true
              }
            }
          }
        ]
      };
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return { processMessage, isProcessing };
}