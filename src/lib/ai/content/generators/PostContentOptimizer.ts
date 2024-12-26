import type { PostConfig, GeneratedPost } from '../types';

export class PostContentOptimizer {
  static optimizeContent(content: string, config: PostConfig): string {
    let optimized = content;

    // Optimiser la longueur
    optimized = this.optimizeLength(optimized, config.constraints.maxLength);

    // Ajouter les éléments obligatoires manquants
    optimized = this.addMissingElements(optimized, config.constraints.mustInclude);

    // Optimiser pour le ton
    optimized = this.adjustTone(optimized, config.tone);

    return optimized;
  }

  private static optimizeLength(content: string, maxLength: number): string {
    if (content.length <= maxLength) return content;

    // Réduire intelligemment en gardant les phrases clés
    const sentences = content.split('.');
    let result = '';
    
    for (const sentence of sentences) {
      if ((result + sentence).length <= maxLength) {
        result += sentence + '.';
      } else break;
    }

    return result.trim();
  }

  private static addMissingElements(content: string, required: string[]): string {
    const missing = required.filter(elem => 
      !content.toLowerCase().includes(elem.toLowerCase())
    );

    if (missing.length === 0) return content;

    // Ajouter les éléments manquants de manière naturelle
    const additions = missing.map(elem => {
      switch (elem) {
        case 'valeur marché':
          return 'Obtenez la vraie valeur de marché de votre bien.';
        case 'expertise locale':
          return 'Bénéficiez de notre expertise locale.';
        case 'estimation gratuite':
          return 'Estimation gratuite et sans engagement.';
        default:
          return '';
      }
    });

    return `${content}\n\n${additions.join(' ')}`;
  }

  private static adjustTone(content: string, tone: string): string {
    const toneAdjustments: Record<string, (text: string) => string> = {
      professional: (text) => this.makeProfessional(text),
      friendly: (text) => this.makeFriendly(text)
    };

    return toneAdjustments[tone]?.(content) || content;
  }

  private static makeProfessional(text: string): string {
    return text
      .replace(/!/g, '.')
      .replace(/(?:^|\. )(\w)/g, (m) => m.toUpperCase());
  }

  private static makeFriendly(text: string): string {
    return text
      .replace(/\.$/, ' ! 😊')
      .replace(/([.!?])(\s+)(\w)/g, '$1$2👉 $3');
  }
}