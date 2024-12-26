import type { Storyboard, Scene } from '../../types';

export class StoryboardGenerator {
  static async generate(params: {
    objective: string;
    duration: number;
  }): Promise<Storyboard> {
    const scenes = this.generateScenes(params);
    return {
      scenes,
      totalDuration: params.duration,
      transitions: this.generateTransitions(scenes)
    };
  }

  private static generateScenes(params: any): Scene[] {
    const { objective, duration } = params;
    
    // Distribution du temps entre les scènes
    const introDuration = Math.round(duration * 0.2);
    const mainDuration = Math.round(duration * 0.6);
    const outroDuration = duration - introDuration - mainDuration;

    return [
      {
        type: 'intro',
        duration: introDuration,
        content: {
          text: this.generateIntroText(objective),
          animation: 'fade-in'
        }
      },
      {
        type: 'main',
        duration: mainDuration,
        content: {
          steps: this.generateMainSteps(objective),
          animation: 'slide-up'
        }
      },
      {
        type: 'outro',
        duration: outroDuration,
        content: {
          callToAction: this.generateCallToAction(objective),
          animation: 'bounce'
        }
      }
    ];
  }

  private static generateIntroText(objective: string): string {
    return `Découvrez comment obtenir une estimation gratuite de votre bien en ${objective} étapes !`;
  }

  private static generateMainSteps(objective: string): string[] {
    return [
      'Remplissez le formulaire en ligne',
      'Recevez une première estimation',
      'Rencontrez notre expert local'
    ];
  }

  private static generateCallToAction(objective: string): string {
    return 'Cliquez ici pour estimer votre bien gratuitement !';
  }

  private static generateTransitions(scenes: Scene[]): string[] {
    return scenes.map((_, index) => 
      index === 0 ? 'none' : 'fade'
    );
  }
}