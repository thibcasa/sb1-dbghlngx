import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { Campaign } from '@/types';

export function useCampaignOptimizer() {
  const [optimizing, setOptimizing] = useState(false);

  const optimizeCampaign = async (campaign: Campaign) => {
    setOptimizing(true);
    try {
      // Analyser les performances actuelles
      const metrics = calculateMetrics(campaign);
      
      // Générer des optimisations
      const optimizations = await generateOptimizations(metrics);
      
      // Appliquer les optimisations
      const updatedCampaign = await applyOptimizations(campaign, optimizations);
      
      return updatedCampaign;
    } finally {
      setOptimizing(false);
    }
  };

  return { optimizeCampaign, optimizing };
}

function calculateMetrics(campaign: Campaign) {
  const totalCost = campaign.channels.reduce((sum, ch) => sum + ch.metrics.cost, 0);
  const totalConversions = campaign.channels.reduce((sum, ch) => sum + ch.metrics.conversions, 0);
  
  return {
    costPerConversion: totalCost / totalConversions,
    conversionRate: totalConversions / campaign.performance.totalClicks,
    channelPerformance: campaign.channels.map(ch => ({
      type: ch.type,
      roi: (ch.metrics.conversions * 100) / ch.metrics.cost
    }))
  };
}

async function generateOptimizations(metrics: any) {
  // Simuler une analyse IA
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    budgetAdjustments: [
      { channel: 'facebook', adjustment: 1.2 },
      { channel: 'instagram', adjustment: 0.8 }
    ],
    targetingUpdates: [
      { channel: 'facebook', updates: { ageRange: { min: 35, max: 55 } } }
    ]
  };
}

async function applyOptimizations(campaign: Campaign, optimizations: any) {
  const { data, error } = await supabase
    .from('campaigns')
    .update({
      channels: campaign.channels.map(ch => {
        const budgetAdjustment = optimizations.budgetAdjustments
          .find((adj: any) => adj.channel === ch.type);
        
        if (budgetAdjustment) {
          return {
            ...ch,
            metrics: {
              ...ch.metrics,
              cost: ch.metrics.cost * budgetAdjustment.adjustment
            }
          };
        }
        return ch;
      })
    })
    .eq('id', campaign.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}