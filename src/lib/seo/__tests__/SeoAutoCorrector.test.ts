import { describe, it, expect } from 'vitest';
import { SeoAutoCorrector } from '../SeoAutoCorrector';
import type { PageMeta } from '@/components/seo/types';

describe('SeoAutoCorrector', () => {
  it('corrige un titre trop court', () => {
    const meta: PageMeta = {
      title: 'CRM',
      description: 'Description complète du CRM'
    };

    const corrected = SeoAutoCorrector.autoCorrect(meta);
    expect(corrected.title.length).toBeGreaterThanOrEqual(30);
    expect(corrected.title).toContain('CRM');
  });

  it('optimise une description trop courte', () => {
    const meta: PageMeta = {
      title: 'Titre suffisamment long pour le SEO',
      description: 'Description courte'
    };

    const corrected = SeoAutoCorrector.autoCorrect(meta);
    expect(corrected.description.length).toBeGreaterThanOrEqual(120);
    expect(corrected.description).toContain('Description courte');
  });

  it('maintient une densité de mots-clés optimale', () => {
    const meta: PageMeta = {
      title: 'Titre du CRM',
      description: 'Une description sans mots-clés importants'
    };

    const corrected = SeoAutoCorrector.autoCorrect(meta);
    expect(corrected.description).toMatch(/crm|immobilier|leads|marketing/i);
  });
});