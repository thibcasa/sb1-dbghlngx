import { useState } from 'react';
import { ContentGenerator } from '@/lib/ai/content/ContentGenerator';
import type { ContentType } from '../types';

export function useContentGeneration() {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generateContent = async (params: {
    type: ContentType;
    objective: string;
    audience: {
      demographics: any;
      interests: string[];
      behavior: any;
    };
    tone?: string;
    length?: 'short' | 'medium' | 'long';
  }) => {
    setGenerating(true);
    setError(null);

    try {
      return await ContentGenerator.generateContent(params);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to generate content');
      setError(error);
      throw error;
    } finally {
      setGenerating(false);
    }
  };

  return {
    generateContent,
    generating,
    error
  };
}