import { seoConfig } from '@/components/seo/SeoConfig';
import type { PageMeta } from '@/components/seo/types';

export class SeoMonitor {
  private static readonly MIN_DESCRIPTION_LENGTH = 120;
  private static readonly MAX_DESCRIPTION_LENGTH = 160;
  private static readonly MIN_TITLE_LENGTH = 30;
  private static readonly MAX_TITLE_LENGTH = 60;

  static analyzePage(meta: PageMeta, path: string): SeoAnalysis {
    const issues: SeoIssue[] = [];
    const warnings: SeoWarning[] = [];
    
    // Analyse du titre
    if (!meta.title) {
      issues.push({ type: 'error', message: 'Le titre est manquant' });
    } else {
      if (meta.title.length < this.MIN_TITLE_LENGTH) {
        warnings.push({ 
          type: 'warning',
          message: `Le titre est trop court (${meta.title.length} caractères)`,
          suggestion: 'Ajoutez plus de mots-clés pertinents'
        });
      }
      if (meta.title.length > this.MAX_TITLE_LENGTH) {
        issues.push({
          type: 'error',
          message: `Le titre est trop long (${meta.title.length} caractères)`,
          suggestion: 'Réduisez à 60 caractères maximum'
        });
      }
    }

    // Analyse de la description
    if (!meta.description) {
      issues.push({ 
        type: 'error', 
        message: 'La description est manquante',
        suggestion: 'Ajoutez une description meta entre 120-160 caractères'
      });
    } else {
      if (meta.description.length < this.MIN_DESCRIPTION_LENGTH) {
        warnings.push({
          type: 'warning',
          message: `Description trop courte (${meta.description.length} caractères)`,
          suggestion: 'Enrichissez la description avec plus de détails'
        });
      }
      if (meta.description.length > this.MAX_DESCRIPTION_LENGTH) {
        issues.push({
          type: 'error',
          message: `Description trop longue (${meta.description.length} caractères)`,
          suggestion: 'Réduisez à 160 caractères maximum'
        });
      }
    }

    return { issues, warnings, path };
  }

  static suggestImprovements(meta: PageMeta): string[] {
    const suggestions: string[] = [];
    
    // Analyse des mots-clés
    const keywords = seoConfig.additionalMetaTags
      .find(tag => tag.name === 'keywords')
      ?.content.split(',') || [];
      
    const titleKeywords = meta.title?.toLowerCase().split(' ') || [];
    const descKeywords = meta.description?.toLowerCase().split(' ') || [];
    
    const missingKeywords = keywords.filter(keyword => {
      const kw = keyword.trim().toLowerCase();
      return !titleKeywords.includes(kw) && !descKeywords.includes(kw);
    });

    if (missingKeywords.length > 0) {
      suggestions.push(
        `Considérez d'ajouter ces mots-clés : ${missingKeywords.join(', ')}`
      );
    }

    return suggestions;
  }
}

interface SeoAnalysis {
  issues: SeoIssue[];
  warnings: SeoWarning[];
  path: string;
}

interface SeoIssue {
  type: 'error';
  message: string;
  suggestion?: string;
}

interface SeoWarning {
  type: 'warning';
  message: string;
  suggestion?: string;
}