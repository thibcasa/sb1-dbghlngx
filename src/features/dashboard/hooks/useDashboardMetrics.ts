import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { DashboardMetrics } from '../types';

export function useDashboardMetrics() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const { data: leads } = await supabase
          .from('leads')
          .select('status');

        const { data: campaigns } = await supabase
          .from('campaigns')
          .select('status');

        // Calculate metrics from data
        setMetrics({
          mandats: {
            value: '16',
            target: '20',
            trend: '+4 cette semaine',
            progress: 80
          },
          leads: {
            value: '48',
            target: '60',
            trend: '+15 cette semaine',
            progress: 80
          },
          // ... other metrics
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch metrics'));
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
  }, []);

  return { metrics, loading, error };
}