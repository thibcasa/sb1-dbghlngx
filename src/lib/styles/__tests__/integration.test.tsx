import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';
import { useStyleMonitor } from '../hooks/useStyleMonitor';
import { CSSAnalyzer } from '../monitor/CSSAnalyzer';
import { CSSOptimizer } from '../optimizer/CSSOptimizer';

describe('Intégration du système de monitoring CSS', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container">
        <header class="header">
          <h1 class="title">Test</h1>
        </header>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      .container { 
        max-width: 1200px;
        margin: 0 auto;
        margin: 1rem auto;
      }
      .unused-class { color: red; }
      #specific-id.with-class[data-test] { color: blue; }
    `;
    document.head.appendChild(style);
  });

  it('fournit des suggestions cohérentes entre les différents analyseurs', () => {
    const { result } = renderHook(() => useStyleMonitor());
    
    // Vérifier que les suggestions du moniteur correspondent aux analyses individuelles
    const suggestions = result.current;
    
    // Vérifier la détection des styles inutilisés
    const unusedSuggestion = suggestions.find(s => s.type === 'unused');
    expect(unusedSuggestion?.selector).toBe('.unused-class');

    // Vérifier la détection des propriétés dupliquées
    const duplicateSuggestion = suggestions.find(s => s.type === 'duplicate');
    expect(duplicateSuggestion?.selector).toBe('.container');

    // Vérifier la détection de la spécificité excessive
    const specificitySuggestion = suggestions.find(s => s.type === 'specificity');
    expect(specificitySuggestion?.selector).toContain('#specific-id');
  });
});