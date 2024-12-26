```typescript
import { AIEngine } from '../../core/AIEngine';
import type { ContentTemplate } from '@/features/content/types';

export class StoryGenerator extends AIEngine {
  static async generateStory(params: {
    images: string[];
    objective: string;
    audience: any;
  }) {
    const config = await this.getModelConfig('story_generation');
    const template = await this.selectTemplate('story');
    
    return {
      slides: await this.generateSlides(params.images, template),
      interactions: await this.generateInteractions(params.objective),
      metadata: {
        duration: 15, // 15 secondes par story
        music: await this.selectBackgroundMusic(params.objective)
      }
    };
  }

  private static async generateSlides(images: string[], template: ContentTemplate) {
    return images.map((image, index) => ({
      image,
      text: this.generateSlideText(template, index),
      animation: this.selectAnimation(index),
      duration: 5 // 5 secondes par slide
    }));
  }

  private static async generateInteractions(objective: string) {
    return [
      {
        type: 'poll',
        question: await this.generatePollQuestion(objective),
        options: await this.generatePollOptions(objective)
      },
      {
        type: 'slider',
        question: 'Intéressé par ce bien ?',
        emoji: '🏠'
      }
    ];
  }

  private static async selectBackgroundMusic(objective: string) {
    // Sélectionner une musique adaptée à l'objectif
    return {
      url: 'URL_MUSIQUE',
      duration: 15,
      volume: 0.3
    };
  }
}
```