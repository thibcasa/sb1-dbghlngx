import { useState, useEffect } from 'react';
import { AIPerformanceOptimizer } from '../ai/AIPerformanceOptimizer';
import { usePageSpeedMonitor } from './usePageSpeedMonitor';

export function useAIPerformanceOptimizer(url: string) {
  const { metrics, loading, error } = usePageSpeedMonitor(url);
  const [optimizations, setOptimizations] = useState<any[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);

  useEffect(() => {
    if (metrics && !loading && !error) {
      setIsOptimizing(true);
      AIPerformanceOptimizer.generateOptimizations(metrics)
        .then(suggestions => {
          setOptimizations(suggestions);
        })
        .finally(() => {
          setIsOptimizing(false);
        });
    }
  }, [metrics, loading, error]);

  return {
    optimizations,
    isOptimizing,
    metrics,
    loading,
    error
  };
}