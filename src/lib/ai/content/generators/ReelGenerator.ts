import { ContentAICore } from '../ContentAICore';
import { StoryboardGenerator } from './reel/StoryboardGenerator';
import { VisualGenerator } from './reel/VisualGenerator';
import { AudioGenerator } from './reel/AudioGenerator';
import type { ReelConfig, GeneratedReel } from '../types';

export class ReelGenerator {
  static async generateReel(params: {
    objective: string;
    persona: any;
    duration: number;
  }): Promise<GeneratedReel> {
    // Générer le storyboard
    const storyboard = await StoryboardGenerator.generate({
      objective: params.objective,
      duration: params.duration
    });

    // Générer les séquences visuelles
    const visuals = await VisualGenerator.generateSequences(storyboard);

    // Générer l'audio
    const audio = await AudioGenerator.generate({
      storyboard,
      persona: params.persona
    });

    return {
      storyboard,
      visuals,
      audio,
      metadata: {
        duration: params.duration,
        format: 'vertical',
        resolution: '1080x1920'
      }
    };
  }
}