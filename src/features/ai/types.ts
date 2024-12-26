export interface AIResponse {
  message: string;
  actions?: AIAction[];
  confidence: number;
}

export interface AIAction {
  type: 'create_campaign' | 'update_lead' | 'analyze_performance' | 'suggest_optimization';
  payload: unknown;
  priority: 'high' | 'medium' | 'low';
  confidence: number;
}

export interface AIQuery {
  id: string;
  query: string;
  response: AIResponse;
  created_at: string;
  user_id: string;
}