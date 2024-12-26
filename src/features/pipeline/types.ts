export interface PipelineStage {
  id: string;
  name: string;
  description?: string;
  orderIndex: number;
  color?: string;
  requirements: string[];
  metrics: {
    conversionRate?: number;
    averageTime?: number;
    dropoffRate?: number;
  };
}

export interface ContactInPipeline {
  id: string;
  stageId: string;
  position: number;
  name: string;
  email: string;
  status: string;
}

export interface PipelineEvent {
  id: string;
  contactId: string;
  fromStageId: string;
  toStageId: string;
  duration?: number;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface PipelineMetrics {
  id: string;
  stageId: string;
  date: string;
  metrics: {
    totalContacts: number;
    conversions: number;
    averageTime: number;
    dropoffs: number;
  };
}