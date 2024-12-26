import { useState } from 'react';
import { ReelGenerator } from '@/lib/ai/content/generators/ReelGenerator';
import type { GeneratedReel } from '@/lib/ai/content/types';

export function useReelGenerator() {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generateReel = async (params: {
    objective: string;
    persona: any;
    duration: number;
  }): Promise<GeneratedReel> => {
    setGenerating(true);
    try {
      return await ReelGenerator.generateReel(params);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to generate reel');
      setError(error);
      throw error;
    } finally {
      setGenerating(false);
    }
  };

  return {
    generateReel,
    generating,
    error
  };
}