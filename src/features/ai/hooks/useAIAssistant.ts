import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { AIResponse, AIAction } from '../types';

export function useAIAssistant() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const processQuery = useCallback(async (query: string): Promise<AIResponse> => {
    setIsProcessing(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('ai_queries')
        .insert({ query })
        .select('response')
        .single();

      if (error) throw error;

      return {
        message: data.response.message,
        actions: data.response.actions,
        confidence: data.response.confidence
      };
    } catch (err) {
      setError(err instanceof Error ? err : new Error('AI processing failed'));
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return { processQuery, isProcessing, error };
}