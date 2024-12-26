import { ContentAICore } from '../ContentAICore';
import { PersonaAnalyzer } from '../../personas/PersonaAnalyzer';
import type { Persona } from '../../personas/types';
import type { PostConfig, GeneratedPost } from '../types';

export class PostGenerator {
  static async generatePost(params: {
    objective: string;
    persona: Persona;
    channel: string;
    format: 'post' | 'story' | 'reel';
  }): Promise<GeneratedPost> {
    // Analyser le persona pour optimiser le contenu
    const personaAnalytics = await PersonaAnalyzer.analyzePersona(params.persona.id);
    
    // Configurer le post
    const config = this.createPostConfig(params, personaAnalytics);
    
    // Générer le contenu
    const content = await ContentAICore.generateContent(config);
    
    return {
      title: content.title,
      body: content.body,
      callToAction: this.generateCallToAction(params.objective),
      hashtags: this.generateHashtags(params),
      visualSuggestion: this.generateVisualSuggestion(params),
      scheduleSuggestion: this.suggestBestTime(personaAnalytics),
      metadata: {
        objective: params.objective,
        targetAudience: params.persona.demographics,
        estimatedEngagement: content.metadata.estimatedEngagement
      }
    };
  }

  private static createPostConfig(params: any, analytics: any): PostConfig {
    return {
      type: params.format,
      objective: params.objective,
      tone: this.determineTone(params.persona),
      keywords: this.extractKeywords(params),
      constraints: {
        maxLength: this.getMaxLength(params.format),
        mustInclude: this.getMandatoryElements(params.objective)
      }
    };
  }

  private static determineTone(persona: Persona): string {
    // Adapter le ton en fonction du persona
    if (persona.psychographics.goals.includes('Service professionnel')) {
      return 'professional';
    }
    return 'friendly';
  }

  private static extractKeywords(params: any): string[] {
    const keywords = [
      'immobilier',
      params.persona.demographics.location,
      ...params.persona.behavior.decisionFactors
    ];
    return Array.from(new Set(keywords));
  }

  private static generateCallToAction(objective: string): string {
    const ctas = {
      mandate_acquisition: 'Estimez votre bien gratuitement 👉',
      property_valuation: 'Découvrez la valeur de votre bien 🏠',
      market_analysis: 'Téléchargez notre étude de marché 📊'
    };
    return ctas[objective as keyof typeof ctas] || 'Contactez-nous 📱';
  }

  private static generateHashtags(params: any): string[] {
    return [
      '#immobilier',
      `#${params.persona.demographics.location}`,
      '#estimation',
      '#vente',
      '#expertise'
    ];
  }

  private static generateVisualSuggestion(params: any): string {
    const visualTypes = {
      post: 'Photo professionnelle d\'un bien avec vue mer',
      story: 'Courte vidéo de visite avec texte superposé',
      reel: 'Montage dynamique des étapes de vente'
    };
    return visualTypes[params.format as keyof typeof visualTypes];
  }

  private static suggestBestTime(analytics: any): Date {
    // Calculer le meilleur moment pour publier
    const now = new Date();
    now.setHours(18); // Par défaut 18h
    now.setMinutes(0);
    return now;
  }

  private static getMaxLength(format: string): number {
    const lengths = {
      post: 2200,
      story: 100,
      reel: 150
    };
    return lengths[format as keyof typeof lengths];
  }

  private static getMandatoryElements(objective: string): string[] {
    return [
      'valeur marché',
      'expertise locale',
      'estimation gratuite'
    ];
  }
}