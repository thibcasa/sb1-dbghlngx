export interface AIRequestResponse {
  message: string;
  actions: AIAction[];
}

export interface AIAction {
  type: 'create_campaign' | 'create_content' | 'launch_campaign';
  payload: any;
}

export interface RequestIntent {
  type: 'mandate_request' | 'content_request' | 'campaign_request' | 'unknown';
  params: any;
}