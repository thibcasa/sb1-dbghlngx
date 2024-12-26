import { useEffect, useState } from 'react';
import { CSSAnalyzer } from '../monitor/CSSAnalyzer';
import { ResponsiveChecker } from '../monitor/ResponsiveChecker';
import { CSSOptimizer } from '../optimizer/CSSOptimizer';
import type { StyleRules, OptimizationSuggestion } from '../types';

export function useStyleMonitor() {
  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([]);

  useEffect(() => {
    const analyzeStyles = () => {
      // Récupère toutes les règles CSS appliquées
      const styleSheets = Array.from(document.styleSheets);
      const rules: StyleRules = [];

      styleSheets.forEach(sheet => {
        try {
          Array.from(sheet.cssRules).forEach(rule => {
            if (rule instanceof CSSStyleRule) {
              rules.push({
                selector: rule.selectorText,
                declarations: Array.from(rule.style).map(prop => ({
                  property: prop,
                  value: rule.style.getPropertyValue(prop)
                }))
              });
            }
          });
        } catch (e) {
          console.warn('CORS prevented reading stylesheet');
        }
      });

      // Analyse et optimisation
      const unusedStyles = CSSAnalyzer.findUnusedStyles(rules);
      const duplicateProps = CSSAnalyzer.findDuplicateProperties(rules);
      const missingResponsive = ResponsiveChecker.findMissingResponsiveRules(rules);
      const optimizations = CSSOptimizer.optimizeStyles(rules);

      setSuggestions([
        ...optimizations,
        ...unusedStyles.map(selector => ({
          type: 'unused' as const,
          selector,
          message: 'Style non utilisé détecté'
        })),
        ...Array.from(duplicateProps.entries()).map(([selector, props]) => ({
          type: 'duplicate' as const,
          selector,
          message: 'Propriétés dupliquées détectées',
          properties: Array.from(props)
        })),
        ...Array.from(missingResponsive.entries()).map(([selector, breakpoints]) => ({
          type: 'responsive' as const,
          selector,
          message: 'Règles responsives manquantes',
          suggestion: `Ajouter des règles pour: ${breakpoints.map(bp => bp.name).join(', ')}`
        }))
      ]);
    };

    analyzeStyles();
    
    // Réanalyse lors des changements de DOM
    const observer = new MutationObserver(analyzeStyles);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    return () => observer.disconnect();
  }, []);

  return suggestions;
}