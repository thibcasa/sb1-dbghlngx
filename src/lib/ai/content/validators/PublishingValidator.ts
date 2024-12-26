```typescript
import type { GeneratedContent, PublishingPlatform } from '../types';

export class PublishingValidator {
  static validateForPlatform(
    content: GeneratedContent,
    platform: PublishingPlatform
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    const constraints = this.getPlatformConstraints(platform);
    
    // Validation de la longueur
    if (content.body.length > constraints.maxLength) {
      errors.push(`Contenu trop long pour ${platform} (max: ${constraints.maxLength})`);
    }

    // Validation des hashtags
    if (content.hashtags) {
      if (content.hashtags.length > constraints.maxHashtags) {
        warnings.push(`Trop de hashtags pour ${platform} (max: ${constraints.maxHashtags})`);
      }
    }

    // Validation du format
    if (!constraints.formats.includes(content.type)) {
      errors.push(`Format ${content.type} non supporté sur ${platform}`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  private static getPlatformConstraints(platform: PublishingPlatform) {
    const constraints = {
      instagram: {
        maxLength: 2200,
        maxHashtags: 30,
        formats: ['post', 'story', 'reel']
      },
      facebook: {
        maxLength: 63206,
        maxHashtags: 30,
        formats: ['post', 'story', 'reel']
      },
      tiktok: {
        maxLength: 2200,
        maxHashtags: 10,
        formats: ['reel']
      }
    };

    return constraints[platform];
  }
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
```