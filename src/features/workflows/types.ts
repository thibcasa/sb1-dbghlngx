export type TriggerType = 'user_action' | 'event' | 'schedule' | 'condition';
export type ActionType = 'email' | 'notification' | 'task' | 'pipeline_update';

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  trigger: WorkflowTrigger;
  actions: WorkflowAction[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowTrigger {
  type: TriggerType;
  config: Record<string, any>;
  conditions?: WorkflowCondition[];
}

export interface WorkflowAction {
  type: ActionType;
  config: Record<string, any>;
  order: number;
  delay?: number;
}

export interface WorkflowCondition {
  field: string;
  operator: 'equals' | 'contains' | 'greater' | 'less';
  value: any;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  workflow: Omit<Workflow, 'id' | 'createdAt' | 'updatedAt'>;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: 'running' | 'completed' | 'failed';
  startedAt: Date;
  completedAt?: Date;
  error?: string;
  logs: WorkflowLog[];
}

export interface WorkflowLog {
  timestamp: Date;
  type: 'info' | 'warning' | 'error';
  message: string;
  details?: Record<string, any>;
}