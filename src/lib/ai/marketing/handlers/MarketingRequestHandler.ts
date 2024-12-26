import { SalesObjectiveHandler } from './SalesObjectiveHandler';
import { ContentAICore } from '../../content/ContentAICore';
import { MarketingAICore } from '../MarketingAICore';
import type { AIRequestResponse } from '../types';

export class MarketingRequestHandler {
  static async handleRequest(message: string): Promise<AIRequestResponse> {
    const intent = await this.analyzeIntent(message);
    
    switch (intent.type) {
      case 'mandate_request':
        return this.handleMandateRequest(intent.params);
      case 'content_request':
        return this.handleContentRequest(intent.params);
      case 'campaign_request':
        return this.handleCampaignRequest(intent.params);
      default:
        return this.handleUnknownRequest();
    }
  }

  private static async analyzeIntent(message: string) {
    // Analyse des mandats
    const mandateMatch = message.match(/(\d+)\s*mandat/i);
    if (mandateMatch) {
      return {
        type: 'mandate_request',
        params: {
          count: parseInt(mandateMatch[1]),
          urgency: message.includes('urgent') ? 'high' : 'normal',
          source: this.extractSource(message)
        }
      };
    }

    // Analyse du contenu
    if (message.includes('post') || message.includes('article') || message.includes('story')) {
      return {
        type: 'content_request',
        params: {
          type: this.extractContentType(message),
          topic: this.extractTopic(message),
          audience: this.extractAudience(message)
        }
      };
    }

    // Analyse de campagne
    if (message.includes('campagne') || message.includes('campaign')) {
      return {
        type: 'campaign_request',
        params: {
          objective: this.extractObjective(message),
          budget: this.extractBudget(message),
          duration: this.extractDuration(message)
        }
      };
    }

    return { type: 'unknown', params: {} };
  }

  private static async handleMandateRequest(params: any): Promise<AIRequestResponse> {
    const result = await SalesObjectiveHandler.handleMandateRequest(params.count);
    
    return {
      message: `Je vais vous aider à obtenir ${params.count} mandats.
      
1. Je crée une séquence de ${result.funnel.stages.length} étapes
2. Budget recommandé: ${result.objective.budget}€
3. Durée estimée: ${this.formatDuration(result.objective.deadline)}

Souhaitez-vous que je lance la première campagne maintenant ?`,
      actions: result.funnel.stages[0].actions
    };
  }

  private static async handleContentRequest(params: any): Promise<AIRequestResponse> {
    const suggestions = await ContentAICore.generateContent(params.type, {
      audience: params.audience,
      topic: params.topic
    });

    return {
      message: `J'ai généré du contenu optimisé pour votre audience.
      
Suggestion principale:
${suggestions[0].content}

Canaux recommandés: ${suggestions[0].metadata.recommendedChannels.join(', ')}
Engagement estimé: ${(suggestions[0].metadata.estimatedEngagement * 100).toFixed(1)}%

Voulez-vous que je publie ce contenu maintenant ?`,
      actions: [{
        type: 'create_content',
        payload: suggestions[0]
      }]
    };
  }

  private static async handleCampaignRequest(params: any): Promise<AIRequestResponse> {
    const campaign = await MarketingAICore.createCampaign(
      params.objective,
      params.audience,
      params.budget
    );

    return {
      message: `J'ai créé une campagne optimisée pour votre objectif.
      
Budget: ${params.budget}€
Durée: ${params.duration} jours
Canaux: ${campaign.channels.map(c => c.type).join(', ')}

La campagne est prête à être lancée. Dois-je la démarrer ?`,
      actions: [{
        type: 'launch_campaign',
        payload: campaign
      }]
    };
  }

  private static handleUnknownRequest(): AIRequestResponse {
    return {
      message: "Je n'ai pas bien compris votre demande. Pouvez-vous préciser si vous souhaitez :\n\n1. Obtenir des mandats\n2. Créer du contenu\n3. Lancer une campagne",
      actions: []
    };
  }

  // Utilitaires d'extraction
  private static extractSource(message: string): string {
    if (message.includes('facebook')) return 'facebook';
    if (message.includes('instagram')) return 'instagram';
    return 'all';
  }

  private static extractContentType(message: string): string {
    if (message.includes('post')) return 'post';
    if (message.includes('story')) return 'story';
    if (message.includes('article')) return 'article';
    return 'post';
  }

  private static extractTopic(message: string): string {
    // Logique d'extraction du sujet
    return 'real_estate';
  }

  private static extractAudience(message: string): any {
    // Logique d'extraction de l'audience
    return {
      type: 'property_owners',
      location: 'local'
    };
  }

  private static extractObjective(message: string): string {
    // Logique d'extraction de l'objectif
    return 'lead_generation';
  }

  private static extractBudget(message: string): number {
    const match = message.match(/(\d+)[\s€]*/);
    return match ? parseInt(match[1]) : 500;
  }

  private static extractDuration(message: string): number {
    const match = message.match(/(\d+)\s*jours/);
    return match ? parseInt(match[1]) : 30;
  }

  private static formatDuration(deadline: Date): string {
    const days = Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return `${days} jours`;
  }
}