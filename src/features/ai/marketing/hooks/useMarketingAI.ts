import { useState } from 'react';
import { MarketingWorkflowEngine } from '@/lib/ai/marketing/workflows/MarketingWorkflowEngine';
import { PersonaGenerator } from '@/lib/ai/personas/PersonaGenerator';
import { generateSuggestions } from '../utils/suggestionGenerator';
import { parseCommand } from '../utils/commandParser';
import type { AIResponse } from '../types';

export function useMarketingAI() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [context, setContext] = useState<any>(null);

  const processCommand = async (command: string): Promise<AIResponse> => {
    setIsProcessing(true);
    try {
      const params = parseCommand(command);
      
      switch (params.type) {
        case 'create':
          return await handleCreateCommand(params);
        case 'analyze':
          return await handleAnalyzeCommand();
        case 'optimize':
          return await handleOptimizeCommand();
        default:
          return handleUnknownCommand();
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCreateCommand = async (params: any) => {
    // Générer un persona adapté
    const persona = await PersonaGenerator.generatePersona({
      campaignType: 'mandate_acquisition',
      location: params.location,
      objective: `${params.target} mandats`
    });

    // Initialiser le workflow avec le persona
    const objective = await MarketingWorkflowEngine.initializeWorkflow({
      target: params.target,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      audience: persona
    });

    setContext({ type: 'campaign', id: objective.id, persona });

    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: formatCampaignCreation(objective, persona),
      timestamp: new Date(),
      actions: [{
        type: 'create_campaign',
        payload: { objective, persona }
      }],
      suggestions: [
        'Ajuster le ciblage',
        'Modifier le budget',
        'Lancer la campagne'
      ]
    };
  };

  // ... autres méthodes existantes ...

  return { processCommand, isProcessing };
}

function formatCampaignCreation(objective: any, persona: any): string {
  return `Je crée une campagne optimisée pour votre persona cible :

Profil :
- Âge : ${persona.demographics.ageRange.min}-${persona.demographics.ageRange.max} ans
- Occupation : ${persona.demographics.occupation.join(', ')}
- Réseaux : ${persona.behavior.socialNetworks.join(', ')}

Stratégie proposée :
- Budget : ${objective.budget}€
- Durée : 7 jours
- Canaux : ${persona.behavior.socialNetworks.join(', ')}
- Contenu : ${persona.behavior.preferredContent.join(', ')}

Points clés :
- Motivations : ${persona.psychographics.motivations[0]}
- Freins : ${persona.psychographics.painPoints[0]}

Souhaitez-vous :
- Ajuster le ciblage
- Modifier le budget
- Lancer la campagne`;
}