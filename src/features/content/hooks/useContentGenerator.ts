```typescript
import { useState } from 'react';
import { ContentOrchestrator } from '@/lib/ai/content/generators/ContentOrchestrator';
import type { GeneratedContent } from '@/lib/ai/content/types';

export function useContentGenerator() {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generateContent = async (params: {
    type: string;
    objective: string;
    persona: any;
    channel: string;
  }): Promise<GeneratedContent> => {
    setGenerating(true);
    try {
      return await ContentOrchestrator.generateContent(params);
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
```