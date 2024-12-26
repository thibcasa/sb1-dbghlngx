import { renderHook } from '@testing-library/react-hooks';
import { describe, it, expect, beforeEach } from 'vitest';
import { useStyleMonitor } from '../hooks/useStyleMonitor';

describe('useStyleMonitor', () => {
  beforeEach(() => {
    // Réinitialiser le DOM
    document.body.innerHTML = '';
    
    // Ajouter une feuille de style de test
    const style = document.createElement('style');
    style.textContent = `
      .test { color: blue; }
      .unused { background: red; }
      .duplicate { 
        margin: 1rem;
        margin: 2rem;
      }
    `;
    document.head.appendChild(style);
  });

  it('détecte les styles inutilisés', () => {
    const { result } = renderHook(() => useStyleMonitor());
    
    expect(result.current).toContainEqual(
      expect.objectContaining({
        type: 'unused',
        selector: '.unused'
      })
    );
  });

  it('détecte les propriétés dupliquées', () => {
    const { result } = renderHook(() => useStyleMonitor());
    
    expect(result.current).toContainEqual(
      expect.objectContaining({
        type: 'duplicate',
        selector: '.duplicate',
        properties: expect.arrayContaining(['margin'])
      })
    );
  });
});