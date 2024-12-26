export interface MarketingObjective {
  id: string;
  status: 'active' | 'completed' | 'failed';
  target: number;
  deadline: Date;
  currentLeads: number;
  sequence: SequenceStep[];
  campaigns: any[];
  metrics: ObjectiveMetrics;
  nextReview: Date;
  createdAt?: Date;
}

export interface SequenceStep {
  type: 'awareness' | 'engagement' | 'conversion';
  objective: string;
  budgetAllocation: number;
  expectedDuration: number;
  requirements: string[];
  metrics?: StepMetrics;
  triggers?: StepTriggers;
  nextSteps?: string[];
}

export interface StepMetrics {
  reach: number;
  engagement: number;
  conversion: number;
  cost: number;
}

export interface StepTriggers {
  start: TriggerCondition;
  complete: TriggerCondition;
}

export interface TriggerCondition {
  conditions: any[];
  delay?: number;
  timeout?: number;
}

export interface ObjectiveMetrics {
  leadAcquisitionRate: number;
  averageCostPerLead: number;
  conversionRate: number;
  roi: number;
  targetCPL?: number;
}

export interface ObjectiveStatus {
  status: 'on_track' | 'needs_adjustment' | 'at_risk';
  recommendations: ObjectiveAdjustment[];
}

export interface ObjectiveAdjustment {
  type: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  actions?: string[];
}