import { renderHook } from '@testing-library/react-hooks';
import { describe, it, expect } from 'vitest';
import { useAutoSeoCorrection } from '../useAutoSeoCorrection';
import type { PageMeta } from '@/components/seo/types';

describe('useAutoSeoCorrection', () => {
  it('corrige automatiquement les métadonnées SEO', () => {
    const initialMeta: PageMeta = {
      title: 'Titre court',
      description: 'Description courte'
    };

    const { result } = renderHook(() => 
      useAutoSeoCorrection(initialMeta, '/dashboard')
    );

    expect(result.current.title.length).toBeGreaterThanOrEqual(30);
    expect(result.current.description.length).toBeGreaterThanOrEqual(120);
  });

  it('conserve les métadonnées valides', () => {
    const validMeta: PageMeta = {
      title: 'Un titre suffisamment long pour le SEO du CRM',
      description: 'Une description complète et optimisée qui contient tous les mots-clés importants comme CRM, immobilier, leads et marketing, avec une longueur optimale pour le référencement.'
    };

    const { result } = renderHook(() => 
      useAutoSeoCorrection(validMeta, '/dashboard')
    );

    expect(result.current).toEqual(validMeta);
  });
});