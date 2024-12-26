```typescript
import { supabase } from '@/lib/supabase/client';
import type { GeneratedContent, PublishingPlatform } from '../types';

export class ContentPublishingService {
  static async publishContent(
    content: GeneratedContent,
    platform: PublishingPlatform
  ) {
    // Valider le contenu avant publication
    await this.validateForPlatform(content, platform);
    
    // Adapter le contenu pour la plateforme
    const adaptedContent = await this.adaptForPlatform(content, platform);
    
    // Publier le contenu
    const result = await this.publish(adaptedContent, platform);
    
    // Enregistrer les métriques de publication
    await this.logPublishing(content.id, platform, result);
    
    return result;
  }

  private static async validateForPlatform(
    content: GeneratedContent,
    platform: PublishingPlatform
  ) {
    const constraints = this.getPlatformConstraints(platform);
    
    if (content.type === 'post' && content.body.length > constraints.maxLength) {
      throw new Error(`Contenu trop long pour ${platform}`);
    }
    
    if (content.type === 'reel' && content.duration > constraints.maxDuration) {
      throw new Error(`Durée trop longue pour ${platform}`);
    }
  }

  private static async adaptForPlatform(
    content: GeneratedContent,
    platform: PublishingPlatform
  ) {
    // Adapter le format du contenu selon la plateforme
    switch (platform) {
      case 'instagram':
        return this.adaptForInstagram(content);
      case 'facebook':
        return this.adaptForFacebook(content);
      case 'tiktok':
        return this.adaptForTikTok(content);
      default:
        return content;
    }
  }

  private static getPlatformConstraints(platform: PublishingPlatform) {
    const constraints = {
      instagram: {
        maxLength: 2200,
        maxDuration: 60,
        formats: ['jpg', 'mp4']
      },
      facebook: {
        maxLength: 63206,
        maxDuration: 240,
        formats: ['jpg', 'mp4', 'gif']
      },
      tiktok: {
        maxLength: 2200,
        maxDuration: 180,
        formats: ['mp4']
      }
    };

    return constraints[platform];
  }

  private static async logPublishing(
    contentId: string,
    platform: PublishingPlatform,
    result: any
  ) {
    await supabase.from('content_publishing_logs').insert({
      content_id: contentId,
      platform,
      status: result.success ? 'success' : 'error',
      metrics: result.metrics,
      error: result.error,
      published_at: new Date().toISOString()
    });
  }

  private static async adaptForInstagram(content: GeneratedContent) {
    return {
      ...content,
      hashtags: content.hashtags?.slice(0, 30),
      caption: this.truncateText(content.body, 2200)
    };
  }

  private static async adaptForFacebook(content: GeneratedContent) {
    return {
      ...content,
      body: this.enrichWithLinks(content.body)
    };
  }

  private static async adaptForTikTok(content: GeneratedContent) {
    return {
      ...content,
      hashtags: content.hashtags?.slice(0, 5),
      caption: this.truncateText(content.body, 300)
    };
  }

  private static truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  }

  private static enrichWithLinks(text: string): string {
    // Ajouter des liens cliquables
    return text.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank">$1</a>'
    );
  }
}
```