import { describe, it, expect } from 'vitest';
import { CSSOptimizer } from '../optimizer/CSSOptimizer';
import type { StyleRules } from '../types';

describe('CSSOptimizer', () => {
  it('suggère des optimisations pour les sélecteurs trop spécifiques', () => {
    const rules: StyleRules = [
      {
        selector: 'div.container #header.large.blue',
        declarations: [
          { property: 'color', value: 'blue' }
        ]
      }
    ];

    const suggestions = CSSOptimizer.optimizeStyles(rules);
    
    expect(suggestions).toContainEqual(expect.objectContaining({
      type: 'specificity',
      selector: 'div.container #header.large.blue'
    }));
  });

  it('identifie les propriétés communes pour création de classes utilitaires', () => {
    const rules: StyleRules = [
      {
        selector: '.btn-primary',
        declarations: [
          { property: 'padding', value: '0.5rem 1rem' },
          { property: 'border-radius', value: '0.25rem' }
        ]
      },
      {
        selector: '.btn-secondary',
        declarations: [
          { property: 'padding', value: '0.5rem 1rem' },
          { property: 'border-radius', value: '0.25rem' }
        ]
      }
    ];

    const suggestions = CSSOptimizer.optimizeStyles(rules);
    
    expect(suggestions).toContainEqual(expect.objectContaining({
      type: 'grouping',
      properties: expect.arrayContaining([
        'padding:0.5rem 1rem',
        'border-radius:0.25rem'
      ])
    }));
  });
});