import { seoConfig } from '@/components/seo/SeoConfig';
import type { PageMeta } from '@/components/seo/types';
import { SeoMonitor } from './SeoMonitor';

export class SeoAutoCorrector {
  private static readonly KEYWORD_DENSITY_TARGET = 0.02; // 2%
  private static readonly MAX_KEYWORDS = 10;

  static autoCorrect(meta: PageMeta): PageMeta {
    const correctedMeta = { ...meta };

    // Correction du titre
    if (!correctedMeta.title || 
        correctedMeta.title.length < SeoMonitor.MIN_TITLE_LENGTH ||
        correctedMeta.title.length > SeoMonitor.MAX_TITLE_LENGTH) {
      correctedMeta.title = this.optimizeTitle(correctedMeta.title || '');
    }

    // Correction de la description
    if (!correctedMeta.description || 
        correctedMeta.description.length < SeoMonitor.MIN_DESCRIPTION_LENGTH ||
        correctedMeta.description.length > SeoMonitor.MAX_DESCRIPTION_LENGTH) {
      correctedMeta.description = this.optimizeDescription(correctedMeta.description || '');
    }

    // Optimisation des mots-clés
    correctedMeta.description = this.optimizeKeywordDensity(correctedMeta.description);

    return correctedMeta;
  }

  private static optimizeTitle(title: string): string {
    const keywords = this.getRelevantKeywords();
    
    if (title.length < SeoMonitor.MIN_TITLE_LENGTH) {
      // Enrichir le titre avec des mots-clés pertinents
      const missingKeywords = keywords.filter(kw => !title.toLowerCase().includes(kw));
      const additionalKeywords = missingKeywords
        .slice(0, 2)
        .join(' | ');
      
      title = `${title} ${additionalKeywords}`;
    }
    
    if (title.length > SeoMonitor.MAX_TITLE_LENGTH) {
      // Réduire le titre en gardant les mots-clés importants
      title = title
        .split(' ')
        .reduce((acc, word) => {
          if ((acc + ' ' + word).length <= SeoMonitor.MAX_TITLE_LENGTH) {
            return acc + ' ' + word;
          }
          return acc;
        }, '')
        .trim();
    }

    return title;
  }

  private static optimizeDescription(description: string): string {
    const keywords = this.getRelevantKeywords();
    
    if (description.length < SeoMonitor.MIN_DESCRIPTION_LENGTH) {
      // Enrichir la description avec des mots-clés pertinents
      const missingKeywords = keywords.filter(kw => !description.toLowerCase().includes(kw));
      const additionalContent = this.generateDescriptionContent(missingKeywords);
      description = `${description} ${additionalContent}`.trim();
    }
    
    if (description.length > SeoMonitor.MAX_DESCRIPTION_LENGTH) {
      // Réduire la description en gardant les phrases avec mots-clés
      const sentences = description.split('. ');
      description = sentences.reduce((acc, sentence) => {
        if ((acc + '. ' + sentence).length <= SeoMonitor.MAX_DESCRIPTION_LENGTH) {
          return acc + '. ' + sentence;
        }
        return acc;
      }, '').trim();
    }

    return description;
  }

  private static optimizeKeywordDensity(text: string): string {
    const keywords = this.getRelevantKeywords();
    const words = text.split(' ');
    const totalWords = words.length;
    
    keywords.forEach(keyword => {
      const keywordCount = words.filter(w => 
        w.toLowerCase().includes(keyword)
      ).length;
      
      const density = keywordCount / totalWords;
      
      if (density < this.KEYWORD_DENSITY_TARGET) {
        // Ajouter le mot-clé de manière naturelle
        const position = Math.floor(totalWords / 2);
        words.splice(position, 0, keyword);
      }
    });

    return words.join(' ');
  }

  private static getRelevantKeywords(): string[] {
    return seoConfig.additionalMetaTags
      .find(tag => tag.name === 'keywords')
      ?.content.split(',')
      .map(k => k.trim().toLowerCase())
      .slice(0, this.MAX_KEYWORDS) || [];
  }

  private static generateDescriptionContent(keywords: string[]): string {
    const templates = [
      "Découvrez comment KEYWORD1 et KEYWORD2 peuvent améliorer votre activité",
      "Optimisez vos résultats avec KEYWORD1 et gérez efficacement votre KEYWORD2",
      "Solution professionnelle de KEYWORD1 intégrant KEYWORD2"
    ];

    const template = templates[Math.floor(Math.random() * templates.length)];
    return template
      .replace('KEYWORD1', keywords[0] || '')
      .replace('KEYWORD2', keywords[1] || '');
  }
}