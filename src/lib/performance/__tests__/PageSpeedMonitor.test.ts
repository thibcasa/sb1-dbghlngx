import { describe, it, expect, vi } from 'vitest';
import { PageSpeedMonitor } from '../PageSpeedMonitor';
import { fetchPageSpeedMetrics } from '../api/pageSpeedApi';

vi.mock('../api/pageSpeedApi');

describe('PageSpeedMonitor', () => {
  it('identifie correctement les problèmes de performance', async () => {
    vi.mocked(fetchPageSpeedMetrics).mockResolvedValue({
      FCP: 3000, // Lent
      LCP: 4000, // Très lent
      FID: 50,   // Bon
      CLS: 0.05, // Bon
      TTI: 5000, // Lent
      performance_score: 65
    });

    const result = await PageSpeedMonitor.analyzePerformance('https://example.com');
    
    expect(result.issues).toHaveLength(3);
    expect(result.issues[0].type).toBe('FCP');
    expect(result.issues[1].type).toBe('LCP');
    expect(result.suggestions.length).toBeGreaterThan(0);
  });
});