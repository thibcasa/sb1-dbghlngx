```typescript
import { PostGenerator } from './PostGenerator';
import { ReelGenerator } from './ReelGenerator';
import { PersonaAnalyzer } from '../../personas/PersonaAnalyzer';
import type { ContentType, GeneratedContent } from '../types';

export class ContentOrchestrator {
  static async generateContent(params: {
    type: ContentType;
    objective: string;
    persona: any;
    channel: string;
  }): Promise<GeneratedContent> {
    // Analyser le persona pour optimiser le contenu
    const personaAnalytics = await PersonaAnalyzer.analyzePersona(params.persona.id);
    
    // Sélectionner le générateur approprié
    switch (params.type) {
      case 'post':
        return PostGenerator.generatePost({
          ...params,
          analytics: personaAnalytics
        });
      case 'reel':
        return ReelGenerator.generateReel({
          ...params,
          duration: 30,
          analytics: personaAnalytics
        });
      default:
        throw new Error(`Type de contenu non supporté: ${params.type}`);
    }
  }
}
```