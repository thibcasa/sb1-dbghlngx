import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { ContentAnalytics } from '../types';

export function useContentAnalytics(contentId: string) {
  const [analytics, setAnalytics] = useState<ContentAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('content_analytics')
          .select('*')
          .eq('content_id', contentId)
          .single();

        if (error) throw error;
        setAnalytics(data.metrics);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch analytics'));
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
    
    // Rafraîchir les données toutes les 5 minutes
    const interval = setInterval(fetchAnalytics, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [contentId]);

  return { analytics, loading, error };
}