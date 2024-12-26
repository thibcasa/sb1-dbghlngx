import { useState } from 'react';
import { PostGenerator } from '@/lib/ai/content/generators/PostGenerator';
import type { GeneratedPost } from '@/lib/ai/content/types';

export function usePostGenerator() {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generatePost = async (params: {
    objective: string;
    persona: any;
    channel: string;
    format: 'post' | 'story' | 'reel';
  }): Promise<GeneratedPost> => {
    setGenerating(true);
    try {
      return await PostGenerator.generatePost(params);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to generate post');
      setError(error);
      throw error;
    } finally {
      setGenerating(false);
    }
  };

  return {
    generatePost,
    generating,
    error
  };
}