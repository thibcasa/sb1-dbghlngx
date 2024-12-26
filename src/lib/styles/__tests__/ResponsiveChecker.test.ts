import { describe, it, expect } from 'vitest';
import { ResponsiveChecker } from '../monitor/ResponsiveChecker';
import type { StyleRules } from '../types';

describe('ResponsiveChecker', () => {
  it('détecte les règles responsives manquantes', () => {
    const rules: StyleRules = [
      {
        selector: '.flex-container',
        declarations: [
          { property: 'display', value: 'flex' },
          { property: '@screen sm', value: 'flex-col' }
        ]
      }
    ];

    const missingRules = ResponsiveChecker.findMissingResponsiveRules(rules);
    const missing = missingRules.get('.flex-container');

    expect(missing).toBeDefined();
    expect(missing?.some(bp => bp.name === 'md')).toBe(true);
    expect(missing?.some(bp => bp.name === 'lg')).toBe(true);
  });

  it('ignore les sélecteurs ne nécessitant pas de responsive', () => {
    const rules: StyleRules = [
      {
        selector: '.static-element',
        declarations: [
          { property: 'color', value: 'blue' }
        ]
      }
    ];

    const missingRules = ResponsiveChecker.findMissingResponsiveRules(rules);
    expect(missingRules.size).toBe(0);
  });
});