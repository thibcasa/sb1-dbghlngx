export interface AIResponse {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: AIAction[];
  suggestions?: string[];
}

export interface AIAction {
  type: 'create_campaign' | 'analyze_campaign' | 'optimize_campaign' | 'analyze_persona' | 'optimize_persona';
  payload: any;
}

export type CommandParams = 
  | { type: 'create'; target: number; location: string }
  | { type: 'analyze' }
  | { type: 'optimize' }
  | { type: 'analyze_persona' }
  | { type: 'optimize_persona' }
  | { type: 'unknown' };