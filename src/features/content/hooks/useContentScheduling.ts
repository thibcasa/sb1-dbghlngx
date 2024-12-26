```ts
import { useState } from 'react';
import { ContentSchedulingService } from '@/lib/ai/content/services/ContentSchedulingService';
import type { GeneratedContent, PublishingPlatform } from '@/lib/ai/content/types';

export function useContentScheduling() {
  const [scheduling, setScheduling] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const scheduleContent = async (
    content: GeneratedContent,
    platform: PublishingPlatform,
    scheduledTime: Date
  ) => {
    setScheduling(true);
    try {
      return await ContentSchedulingService.scheduleContent(
        content,
        platform,
        scheduledTime
      );
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to schedule content');
      setError(error);
      throw error;
    } finally {
      setScheduling(false);
    }
  };

  return {
    scheduleContent,
    scheduling,
    error
  };
}
```