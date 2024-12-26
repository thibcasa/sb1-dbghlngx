```typescript
import { useState, useEffect } from 'react';
import { contentService } from '../services/contentService';
import type { Content } from '../types';

export function useContent() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadContents();
  }, []);

  const loadContents = async () => {
    try {
      setLoading(true);
      const data = await contentService.getContents();
      setContents(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load contents'));
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async (content: Partial<Content>) => {
    try {
      if ('id' in content) {
        const updated = await contentService.updateContent(content.id!, content);
        setContents(prev => prev.map(c => c.id === updated.id ? updated : c));
        return updated;
      } else {
        const created = await contentService.createContent(content as Omit<Content, 'id' | 'createdAt' | 'updatedAt'>);
        setContents(prev => [...prev, created]);
        return created;
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to save content'));
      throw err;
    }
  };

  return {
    contents,
    loading,
    error,
    saveContent,
    refresh: loadContents
  };
}
```