import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

export function usePersonaAnalytics(personaId: string) {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        
        // Récupérer les analyses
        const { data, error } = await supabase
          .from('persona_analytics')
          .select(`
            metrics,
            insights,
            recommendations,
            persona_campaigns (
              performance_metrics
            ),
            persona_content (
              performance_metrics
            )
          `)
          .eq('persona_id', personaId)
          .single();

        if (error) throw error;
        setAnalytics(data);
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
  }, [personaId]);

  return { analytics, loading, error };
}