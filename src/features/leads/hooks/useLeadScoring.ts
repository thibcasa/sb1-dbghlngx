import { useState } from 'react';
import { LeadScoringEngine } from '@/lib/ai/sales/LeadScoringEngine';
import { supabase } from '@/lib/supabase/client';

export function useLeadScoring() {
  const [scoring, setScoring] = useState(false);

  const scoreLeads = async (leadIds: string[]) => {
    setScoring(true);
    try {
      const { data: leads } = await supabase
        .from('leads')
        .select(`
          *,
          interactions (*)
        `)
        .in('id', leadIds);

      if (!leads) return;

      const scoredLeads = await Promise.all(
        leads.map(async (lead) => {
          const score = await LeadScoringEngine.calculateScore({
            behavior: {
              pageViews: lead.interactions.length,
              timeOnSite: lead.interactions.reduce((total, i) => total + i.duration, 0),
              interactions: lead.interactions.length
            },
            profile: {
              demographics: lead.demographics,
              interests: lead.interests,
              budget: lead.budget
            }
          });

          return {
            id: lead.id,
            score: score.total,
            details: score.details,
            nextAction: score.nextBestAction
          };
        })
      );

      // Mettre à jour les scores dans la base de données
      await Promise.all(
        scoredLeads.map(({ id, score, details, nextAction }) =>
          supabase
            .from('leads')
            .update({
              score,
              score_details: details,
              next_action: nextAction,
              scored_at: new Date().toISOString()
            })
            .eq('id', id)
        )
      );

      return scoredLeads;
    } finally {
      setScoring(false);
    }
  };

  return {
    scoreLeads,
    scoring
  };
}