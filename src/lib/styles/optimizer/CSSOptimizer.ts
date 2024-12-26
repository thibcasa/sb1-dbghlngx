import { StyleRules, OptimizationSuggestion } from '../types';
import { CSSAnalyzer } from '../monitor/CSSAnalyzer';

export class CSSOptimizer {
  static optimizeStyles(rules: StyleRules): OptimizationSuggestion[] {
    const suggestions: OptimizationSuggestion[] = [];

    // Optimisation de la spécificité
    rules.forEach(rule => {
      const specificity = CSSAnalyzer.analyzeSpecificity(rule.selector);
      if (specificity > 100) {
        suggestions.push({
          type: 'specificity',
          selector: rule.selector,
          message: 'Réduire la spécificité du sélecteur',
          suggestion: this.simplifySelector(rule.selector)
        });
      }
    });

    // Regroupement des propriétés communes
    const commonProperties = this.findCommonProperties(rules);
    if (commonProperties.size > 0) {
      suggestions.push({
        type: 'grouping',
        message: 'Créer des classes utilitaires pour les propriétés communes',
        properties: Array.from(commonProperties)
      });
    }

    return suggestions;
  }

  private static simplifySelector(selector: string): string {
    return selector
      .replace(/\[class[^\]]*\]/g, '') // Supprime les sélecteurs d'attributs de classe complexes
      .replace(/\s+/g, ' ') // Normalise les espaces
      .trim();
  }

  private static findCommonProperties(rules: StyleRules): Set<string> {
    const propertyCount = new Map<string, number>();
    
    rules.forEach(rule => {
      rule.declarations.forEach(decl => {
        const key = `${decl.property}:${decl.value}`;
        propertyCount.set(key, (propertyCount.get(key) || 0) + 1);
      });
    });

    return new Set(
      Array.from(propertyCount.entries())
        .filter(([_, count]) => count > 2)
        .map(([prop]) => prop)
    );
  }
}