import React from 'react';
import { SalesObjectiveHandler } from '@/lib/ai/marketing/handlers/SalesObjectiveHandler';

export async function handleSalesRequest(message: string): Promise<{
  response: string;
  actions: any[];
}> {
  // Extraire le nombre de mandats demandé
  const count = extractMandateCount(message);
  if (!count) {
    return {
      response: "Pouvez-vous préciser le nombre de mandats souhaité ?",
      actions: []
    };
  }

  try {
    const { objective, funnel, initialRecommendations } = 
      await SalesObjectiveHandler.handleMandateRequest(count);

    return {
      response: generateResponse(count, objective, initialRecommendations),
      actions: generateActions(objective, funnel)
    };
  } catch (error) {
    console.error('Error handling sales request:', error);
    return {
      response: "Je n'ai pas pu traiter votre demande. Veuillez réessayer.",
      actions: []
    };
  }
}

function extractMandateCount(message: string): number | null {
  const match = message.match(/\d+/);
  return match ? parseInt(match[0]) : null;
}

function generateResponse(
  count: number,
  objective: any,
  recommendations: any[]
): string {
  return `
Je vais vous aider à obtenir ${count} mandats de vente.

Plan d'action :
1. ${recommendations[0].description}
2. ${recommendations[1].description}
3. ${recommendations[2].description}

Durée estimée : ${objective.deadline ? formatDate(objective.deadline) : '30 jours'}
Budget recommandé : ${objective.budget}€

Souhaitez-vous que je lance la première campagne maintenant ?
  `.trim();
}

function generateActions(objective: any, funnel: any) {
  return [
    {
      type: 'create_campaign',
      payload: {
        name: 'Campagne Acquisition Mandats',
        objective: 'mandate_acquisition',
        budget: objective.budget / 3, // Premier tiers du budget
        audience: objective.audience,
        funnel: funnel.stages[0]
      }
    }
  ];
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long'
  }).format(date);
}