import { supabase } from '@/lib/supabase/client';

export async function generateSuggestions(context: any | null): Promise<string[]> {
  // Suggestions par défaut
  const defaultSuggestions = [
    'Créer une campagne de prospection',
    'Analyser les performances marketing',
    'Optimiser le budget publicitaire',
    'Générer du contenu pour les réseaux sociaux'
  ];

  if (!context) return defaultSuggestions;

  // Suggestions contextuelles basées sur l'historique
  const { data: history } = await supabase
    .from('marketing_analytics')
    .select('metrics, insights')
    .order('created_at', { ascending: false })
    .limit(1);

  if (!history?.length) return defaultSuggestions;

  const suggestions: string[] = [];
  const metrics = history[0].metrics;

  // Suggestions basées sur les performances
  if (metrics.clickRate < 0.02) {
    suggestions.push('Améliorer les visuels des annonces');
    suggestions.push('Affiner le ciblage publicitaire');
  }

  if (metrics.conversionRate < 0.01) {
    suggestions.push('Optimiser la landing page');
    suggestions.push('Tester de nouveaux messages');
  }

  if (metrics.costPerLead > 50) {
    suggestions.push('Réduire le coût par lead');
    suggestions.push('Optimiser le budget publicitaire');
  }

  return suggestions.length > 0 ? suggestions : defaultSuggestions;
}