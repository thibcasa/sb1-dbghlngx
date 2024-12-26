export interface FunnelTemplate {
  stages: FunnelStage[];
  metrics: FunnelMetrics;
}

export interface FunnelStage {
  type: 'awareness' | 'consideration' | 'conversion';
  contentType: 'post' | 'article' | 'landing';
  requirements: string[];
  metrics: OptimizationMetrics;
  contentStrategy?: ContentStrategy;
  triggers?: StageTriggers;
  nextStages?: string[];
}

export interface OptimizationMetrics {
  conversionRate: number;
  timeInStage: number;
  dropOffRate: number;
}

export interface ContentStrategy {
  primaryMessage: string;
  format: string;
  frequency: number;
}

export interface StageTriggers {
  entry: any[];
  exit: any[];
  timeout: number;
}

export interface FunnelMetrics {
  conversionRate: number;
  dropOffPoints: string[];
  averageTimeInStage: number;
}

export interface LeadScore {
  total: number;
  details: {
    engagement: number;
    fit: number;
    intent: number;
  };
  nextBestAction: string;
}

export interface LeadBehavior {
  pageViews: number;
  timeOnSite: number;
  interactions: number;
}

export interface LeadProfile {
  demographics: any;
  interests: string[];
  budget: number;
}