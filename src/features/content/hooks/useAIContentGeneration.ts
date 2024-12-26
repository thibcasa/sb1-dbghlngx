import { useState } from 'react';
import { ContentGenerator } from '@/lib/ai/content/ContentGenerator';
import type { ContentType } from '../types';

interface GenerationParams {
  type: ContentType;
  objective: string;
  audience: {
    demographics: {
      ageRange: { min: number; max: number };
      location: string;
    };
    interests: string[];
  };
  tone?: string;
}

export function useAIContentGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateContent = async (params: GenerationParams) => {
    setIsGenerating(true);
    try {
      return await ContentGenerator.generateContent(params);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateContent,
    isGenerating
  };
}