import { useState, useEffect } from 'react';
import { PageSpeedMonitor } from '../PageSpeedMonitor';
import type { PageSpeedMetrics } from '../types';

export function usePageSpeedMonitor(url: string) {
  const [metrics, setMetrics] = useState<PageSpeedMetrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const analyzePerformance = async () => {
      setLoading(true);
      try {
        const result = await PageSpeedMonitor.analyzePerformance(url);
        setMetrics(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to analyze performance'));
      } finally {
        setLoading(false);
      }
    };

    analyzePerformance();

    // Réanalyse toutes les 5 minutes en développement
    if (process.env.NODE_ENV === 'development') {
      const interval = setInterval(analyzePerformance, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [url]);

  return { metrics, loading, error };
}