export interface PageSpeedMetrics {
  metrics: {
    FCP: number;      // First Contentful Paint
    LCP: number;      // Largest Contentful Paint
    FID: number;      // First Input Delay
    CLS: number;      // Cumulative Layout Shift
    TTI: number;      // Time to Interactive
    performance_score: number;
  };
  issues: PerformanceIssue[];
  suggestions: string[];
  timestamp: string;
}

export interface PerformanceIssue {
  type: 'FCP' | 'LCP' | 'FID' | 'CLS' | 'TTI';
  severity: 'low' | 'medium' | 'high';
  message: string;
  value: number;
  threshold: number;
}

export interface PerformanceHistory {
  url: string;
  metrics: PageSpeedMetrics[];
}