import { useState, useEffect } from 'react';
import { MarketingAICore } from '../MarketingAICore';

export function useMarketingAI() {
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchInsights() {
      try {
        const data = await MarketingAICore.analyzeMarketingData();
        setInsights(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to analyze marketing data'));
      } finally {
        setLoading(false);
      }
    }

    fetchInsights();
  }, []);

  return { insights, loading, error };
}