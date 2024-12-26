import { describe, it, expect } from 'vitest';
import { CSSAnalyzer } from '../monitor/CSSAnalyzer';
import type { StyleRules } from '../types';

describe('CSSAnalyzer', () => {
  describe('analyzeSpecificity', () => {
    it('calcule correctement la spécificité des sélecteurs', () => {
      expect(CSSAnalyzer.analyzeSpecificity('.class')).toBe(10);
      expect(CSSAnalyzer.analyzeSpecificity('#id')).toBe(100);
      expect(CSSAnalyzer.analyzeSpecificity('div.class')).toBe(11);
      expect(CSSAnalyzer.analyzeSpecificity('div.class:hover')).toBe(21);
    });
  });

  describe('findUnusedStyles', () => {
    it('détecte les styles inutilisés', () => {
      document.body.innerHTML = '<div class="used">Test</div>';
      
      const rules: StyleRules = [
        {
          selector: '.used',
          declarations: [{ property: 'color', value: 'red' }]
        },
        {
          selector: '.unused',
          declarations: [{ property: 'color', value: 'blue' }]
        }
      ];

      const unused = CSSAnalyzer.findUnusedStyles(rules);
      expect(unused).toContain('.unused');
      expect(unused).not.toContain('.used');
    });
  });

  describe('findDuplicateProperties', () => {
    it('identifie les propriétés dupliquées', () => {
      const rules: StyleRules = [
        {
          selector: '.test',
          declarations: [
            { property: 'color', value: 'red' },
            { property: 'color', value: 'blue' }
          ]
        }
      ];

      const duplicates = CSSAnalyzer.findDuplicateProperties(rules);
      expect(duplicates.get('.test')?.has('color')).toBe(true);
    });
  });
});