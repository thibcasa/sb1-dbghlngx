import { useState, useEffect } from 'react';
import type { GeneratedContent } from '../types';

export function useContentHistory() {
  const [history, setHistory] = useState<GeneratedContent[]>([]);

  const addToHistory = (content: GeneratedContent) => {
    setHistory(prev => [content, ...prev].slice(0, 10));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return { history, addToHistory, clearHistory };
}