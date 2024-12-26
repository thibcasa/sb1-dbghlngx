export interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
}

export interface AIAction {
  type: 'create_campaign' | 'update_lead' | 'schedule_interaction';
  payload: unknown;
}

export interface AIResponse {
  message: string;
  actions?: AIAction[];
}