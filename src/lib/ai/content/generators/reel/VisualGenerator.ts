import type { Scene, VisualSequence } from '../../types';

export class VisualGenerator {
  static async generateSequences(storyboard: {
    scenes: Scene[];
    transitions: string[];
  }): Promise<VisualSequence[]> {
    return Promise.all(
      storyboard.scenes.map((scene, index) => 
        this.generateSequence(scene, storyboard.transitions[index])
      )
    );
  }

  private static async generateSequence(
    scene: Scene,
    transition: string
  ): Promise<VisualSequence> {
    return {
      type: scene.type,
      duration: scene.duration,
      elements: await this.generateVisualElements(scene),
      transition,
      animation: scene.content.animation
    };
  }

  private static async generateVisualElements(scene: Scene) {
    switch (scene.type) {
      case 'intro':
        return this.generateIntroVisuals(scene);
      case 'main':
        return this.generateMainVisuals(scene);
      case 'outro':
        return this.generateOutroVisuals(scene);
      default:
        return [];
    }
  }

  private static async generateIntroVisuals(scene: Scene) {
    return [{
      type: 'text',
      content: scene.content.text,
      style: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center'
      }
    }];
  }

  private static async generateMainVisuals(scene: Scene) {
    return scene.content.steps.map((step: string, index: number) => ({
      type: 'step',
      content: step,
      style: {
        fontSize: '20px',
        color: '#ffffff',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '16px'
      },
      delay: index * 1000
    }));
  }

  private static async generateOutroVisuals(scene: Scene) {
    return [{
      type: 'cta',
      content: scene.content.callToAction,
      style: {
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#2563eb',
        padding: '20px',
        borderRadius: '12px'
      }
    }];
  }
}