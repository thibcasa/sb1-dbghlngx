import { StyleRules } from '../types';

export class CSSAnalyzer {
  static analyzeSpecificity(selector: string): number {
    let score = 0;
    // ID selectors
    score += (selector.match(/#/g) || []).length * 100;
    // Class, attribute, pseudo-class selectors
    score += (selector.match(/\.|[\[\]:]|::/g) || []).length * 10;
    // Element selectors
    score += (selector.match(/[a-z]/g) || []).length;
    return score;
  }

  static findUnusedStyles(rules: StyleRules): string[] {
    const unusedSelectors: string[] = [];
    rules.forEach(rule => {
      const elements = document.querySelectorAll(rule.selector);
      if (elements.length === 0) {
        unusedSelectors.push(rule.selector);
      }
    });
    return unusedSelectors;
  }

  static findDuplicateProperties(rules: StyleRules): Map<string, Set<string>> {
    const duplicates = new Map<string, Set<string>>();
    
    rules.forEach(rule => {
      const properties = new Set<string>();
      rule.declarations.forEach(decl => {
        if (properties.has(decl.property)) {
          if (!duplicates.has(rule.selector)) {
            duplicates.set(rule.selector, new Set());
          }
          duplicates.get(rule.selector)?.add(decl.property);
        }
        properties.add(decl.property);
      });
    });

    return duplicates;
  }
}