import { AIEngine } from '../core/AIEngine';
import { ContentAICore } from './ContentAICore';
import type { ContentType } from '@/features/content/types';

export class ContentGenerationEngine extends AIEngine {
  static async generateContent(params: {
    type: ContentType;
    objective: string;
    audience: {
      demographics: any;
      interests: string[];
      behavior: any;
    };
    tone?: string;
    length?: 'short' | 'medium' | 'long';
  }) {
    const config = await this.getModelConfig('content_generation');
    const suggestions = await ContentAICore.generateContent(params.type, {
      audience: params.audience,
      objective: params.objective
    });

    const bestSuggestion = suggestions[0];
    
    await this.logPrediction({
      modelType: 'content_generation',
      input: params,
      output: bestSuggestion,
      confidence: bestSuggestion.score
    });

    return {
      title: this.generateTitle(bestSuggestion.content, params),
      body: bestSuggestion.content,
      metadata: {
        seoTitle: this.generateSEOTitle(bestSuggestion.content),
        seoDescription: this.generateSEODescription(bestSuggestion.content),
        keywords: this.extractKeywords(bestSuggestion.content),
        targetAudience: params.audience
      }
    };
  }

  private static generateTitle(content: string, params: any): string {
    // Générer un titre accrocheur basé sur le contenu et l'objectif
    return content.split('\n')[0];
  }

  private static generateSEOTitle(content: string): string {
    // Optimiser le titre pour le SEO
    return content.split('\n')[0].substring(0, 60);
  }

  private static generateSEODescription(content: string): string {
    // Générer une meta description optimisée
    return content.substring(0, 160);
  }

  private static extractKeywords(content: string): string[] {
    // Extraire les mots-clés pertinents
    return content
      .toLowerCase()
      .split(/\W+/)
      .filter(word => word.length > 3)
      .slice(0, 5);
  }
}