```typescript
export interface AIModelConfig {
  id: string;
  type: string;
  parameters: Record<string, any>;
  version: string;
  lastUpdated: Date;
}

export interface AIPrediction {
  id: string;
  modelType: string;
  input: any;
  output: any;
  confidence: number;
  createdAt: Date;
}

export interface AIOptimizationResult {
  suggestions: AIOptimizationSuggestion[];
  metrics: Record<string, number>;
  confidence: number;
}

export interface AIOptimizationSuggestion {
  type: string;
  priority: 'high' | 'medium' | 'low';
  suggestion: string;
  impact: number;
  implementation?: {
    code?: string;
    config?: Record<string, any>;
  };
}
```