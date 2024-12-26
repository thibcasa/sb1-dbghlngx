import type { MarketingObjective } from '../marketing/objectives/types';

export interface MonitoringMetrics {
  reach: number;
  engagement: number;
  conversion: number;
  costPerLead: number;
  roi: number;
}

export interface PerformanceAlert {
  type: 'warning' | 'critical';
  metric: keyof MonitoringMetrics;
  threshold: number;
  currentValue: number;
  message: string;
  recommendations: string[];
}

export interface OptimizationAction {
  type: 'budget' | 'targeting' | 'content' | 'timing';
  priority: 'low' | 'medium' | 'high';
  changes: any;
  expectedImpact: number;
}

export interface MonitoringStatus {
  objective: MarketingObjective;
  currentMetrics: MonitoringMetrics;
  alerts: PerformanceAlert[];
  optimizations: OptimizationAction[];
  lastUpdated: Date;
}