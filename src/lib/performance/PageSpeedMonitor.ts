import { fetchPageSpeedMetrics } from './api/pageSpeedApi';
import type { PageSpeedMetrics, PerformanceIssue } from './types';

export class PageSpeedMonitor {
  private static readonly PERFORMANCE_THRESHOLD = {
    FCP: 2000, // First Contentful Paint (ms)
    LCP: 2500, // Largest Contentful Paint (ms)
    FID: 100,  // First Input Delay (ms)
    CLS: 0.1,  // Cumulative Layout Shift
    TTI: 3500  // Time to Interactive (ms)
  };

  static async analyzePerformance(url: string): Promise<PageSpeedMetrics> {
    const metrics = await fetchPageSpeedMetrics(url);
    const issues = this.identifyIssues(metrics);
    const suggestions = this.generateSuggestions(issues);

    return {
      metrics,
      issues,
      suggestions,
      timestamp: new Date().toISOString()
    };
  }

  private static identifyIssues(metrics: PageSpeedMetrics['metrics']): PerformanceIssue[] {
    const issues: PerformanceIssue[] = [];

    if (metrics.FCP > this.PERFORMANCE_THRESHOLD.FCP) {
      issues.push({
        type: 'FCP',
        severity: 'high',
        message: 'First Contentful Paint trop lent',
        value: metrics.FCP,
        threshold: this.PERFORMANCE_THRESHOLD.FCP
      });
    }

    if (metrics.LCP > this.PERFORMANCE_THRESHOLD.LCP) {
      issues.push({
        type: 'LCP',
        severity: 'high',
        message: 'Largest Contentful Paint trop lent',
        value: metrics.LCP,
        threshold: this.PERFORMANCE_THRESHOLD.LCP
      });
    }

    // Ajoutez d'autres vérifications de métriques...

    return issues;
  }

  private static generateSuggestions(issues: PerformanceIssue[]): string[] {
    const suggestions = new Set<string>();

    issues.forEach(issue => {
      switch (issue.type) {
        case 'FCP':
          suggestions.add('Optimisez le chargement des ressources critiques');
          suggestions.add('Utilisez un CDN pour les assets statiques');
          break;
        case 'LCP':
          suggestions.add('Optimisez les images avec des formats modernes (WebP)');
          suggestions.add('Implémentez le lazy loading pour les images hors écran');
          break;
        // Ajoutez d'autres suggestions...
      }
    });

    return Array.from(suggestions);
  }
}