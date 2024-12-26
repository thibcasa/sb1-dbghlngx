import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';
import { useAutoSeoCorrection } from '../useAutoSeoCorrection';
import { SeoMonitor } from '../SeoMonitor';
import type { PageMeta } from '@/components/seo/types';

describe('Intégration SEO', () => {
  it('corrige et vérifie les améliorations', () => {
    const initialMeta: PageMeta = {
      title: 'Titre court',
      description: 'Description courte'
    };

    // Analyse initiale
    const initialAnalysis = SeoMonitor.analyzePage(initialMeta, '/dashboard');
    expect(initialAnalysis.issues.length).toBeGreaterThan(0);

    // Application des corrections
    const { result } = renderHook(() => 
      useAutoSeoCorrection(initialMeta, '/dashboard')
    );

    // Vérification des améliorations
    const finalAnalysis = SeoMonitor.analyzePage(result.current, '/dashboard');
    expect(finalAnalysis.issues.length).toBeLessThan(initialAnalysis.issues.length);
  });
});