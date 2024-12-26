import { AIEngine } from '../../core/AIEngine';
import { StoryGenerator } from './StoryGenerator';
import { ReelGenerator } from './ReelGenerator';
import { PodcastGenerator } from './PodcastGenerator';
import type { ContentType } from '@/features/content/types';

export class ContentGenerator extends AIEngine {
  static async generateContent(params: {
    type: ContentType;
    objective: string;
    audience: {
      demographics: any;
      interests: string[];
      behavior: any;
    };
    format?: 'text' | 'story' | 'reel' | 'podcast';
    tone?: string;
    length?: 'short' | 'medium' | 'long';
  }) {
    const config = await this.getModelConfig('content_generation');
    
    // Sélectionner le générateur approprié
    switch (params.format) {
      case 'story':
        return StoryGenerator.generateStory({
          images: await this.getPropertyImages(params.objective),
          objective: params.objective,
          audience: params.audience
        });
      
      case 'reel':
        return ReelGenerator.generateReel({
          property: await this.getPropertyDetails(params.objective),
          objective: params.objective,
          duration: 30
        });
      
      case 'podcast':
        const article = await this.generateArticle(params);
        return PodcastGenerator.generatePodcast({
          article,
          duration: 180 // 3 minutes
        });
      
      default:
        return this.generateTextContent(params);
    }
  }

  private static async generateTextContent(params: any) {
    const template = await this.selectTemplate(params.type);
    const content = await this.adaptTemplate(template, params);
    
    return {
      title: await this.generateTitle(content, params),
      body: content,
      metadata: {
        seo: await this.generateSEOMetadata(content),
        keywords: await this.extractKeywords(content),
        targetAudience: params.audience
      }
    };
  }

  private static async generateArticle(params: any) {
    // Générer un article complet qui servira de base pour le podcast
    const sections = [
      await this.generateIntroduction(params),
      await this.generateMainPoints(params),
      await this.generateConclusion(params)
    ];

    return sections.join('\n\n');
  }

  private static async getPropertyImages(objective: string) {
    // Récupérer les images pertinentes pour la story
    return ['URL_IMAGE_1', 'URL_IMAGE_2', 'URL_IMAGE_3'];
  }

  private static async getPropertyDetails(objective: string) {
    // Récupérer les détails du bien immobilier
    return {
      type: 'appartement',
      features: ['vue mer', 'terrasse', 'parking']
    };
  }
}