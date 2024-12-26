```typescript
import type { GeneratedContent } from '../types';

export class ContentValidator {
  static validate(content: GeneratedContent): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validation du contenu de base
    this.validateBasicContent(content, errors, warnings);
    
    // Validation spécifique au type
    this.validateByType(content, errors, warnings);
    
    // Validation des métadonnées
    this.validateMetadata(content, errors, warnings);

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  private static validateBasicContent(
    content: GeneratedContent,
    errors: string[],
    warnings: string[]
  ) {
    if (!content.title?.trim()) {
      errors.push('Le titre est requis');
    } else if (content.title.length < 10) {
      warnings.push('Le titre est très court');
    }

    if (!content.body?.trim()) {
      errors.push('Le contenu est requis');
    }
  }

  private static validateByType(
    content: GeneratedContent,
    errors: string[],
    warnings: string[]
  ) {
    const constraints = this.getTypeConstraints(content.type);
    
    if (content.body.length > constraints.maxLength) {
      errors.push(`Le contenu dépasse la limite de ${constraints.maxLength} caractères`);
    }

    if (content.hashtags && content.hashtags.length > constraints.maxHashtags) {
      warnings.push(`Nombre de hashtags élevé (${content.hashtags.length}/${constraints.maxHashtags})`);
    }
  }

  private static validateMetadata(
    content: GeneratedContent,
    errors: string[],
    warnings: string[]
  ) {
    if (!content.metadata.objective) {
      errors.push('L\'objectif est requis');
    }

    if (!content.metadata.targetAudience) {
      warnings.push('L\'audience cible n\'est pas définie');
    }
  }

  private static getTypeConstraints(type: string) {
    const constraints = {
      post: { maxLength: 2200, maxHashtags: 30 },
      story: { maxLength: 100, maxHashtags: 10 },
      reel: { maxLength: 150, maxHashtags: 15 }
    };

    return constraints[type as keyof typeof constraints] || constraints.post;
  }
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
```