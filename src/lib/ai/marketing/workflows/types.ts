export interface WorkflowStatus {
  alerts: WorkflowAlert[];
  needsOptimization: boolean;
  metrics: Record<string, any>;
}

export interface WorkflowAlert {
  type: 'warning' | 'critical';
  metric: string;
  message: string;
  recommendations: string[];
}

export interface WorkflowConfig {
  target: number;
  deadline: Date;
  audience: {
    demographics: Record<string, any>;
    interests: string[];
    behavior: Record<string, any>;
  };
}

export interface WorkflowMetrics {
  leadAcquisitionRate: number;
  averageCostPerLead: number;
  conversionRate: number;
  roi: number;
}