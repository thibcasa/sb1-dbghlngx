import { describe, it, expect, vi } from 'vitest';
import { AIPerformanceOptimizer } from '../ai/AIPerformanceOptimizer';
import type { PageSpeedMetrics } from '../types';

describe('AIPerformanceOptimizer', () => {
  const mockMetrics: PageSpeedMetrics = {
    metrics: {
      FCP: 2500,
      LCP: 3000,
      FID: 100,
      CLS: 0.1,
      TTI: 4000,
      performance_score: 75
    },
    issues: [],
    suggestions: [],
    timestamp: new Date().toISOString()
  };

  it('analyse correctement les patterns de performance', () => {
    const patterns = AIPerformanceOptimizer.analyzePerformancePattern(mockMetrics);
    expect(patterns).toContain('image-heavy');
    expect(patterns).toContain('heavy-javascript');
  });

  it('génère des optimisations pertinentes', async () => {
    const optimizations = await AIPerformanceOptimizer.generateOptimizations(mockMetrics);
    
    expect(optimizations.length).toBeGreaterThan(0);
    expect(optimizations[0]).toHaveProperty('priority');
    expect(optimizations[0]).toHaveProperty('impact');
    expect(optimizations[0]).toHaveProperty('implementation');
  });
});