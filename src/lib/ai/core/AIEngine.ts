import { supabase } from '@/lib/supabase/client';

export class AIEngine {
  protected static async getModelConfig(modelType: string) {
    const { data, error } = await supabase
      .from('ai_models')
      .select('*')
      .eq('type', modelType)
      .single();

    if (error) throw error;
    return data;
  }

  protected static async logPrediction(params: {
    modelType: string;
    input: any;
    output: any;
    confidence: number;
  }) {
    await supabase
      .from('ai_predictions')
      .insert({
        model_type: params.modelType,
        input: params.input,
        output: params.output,
        confidence: params.confidence,
        created_at: new Date().toISOString()
      });
  }

  protected static calculateConfidence(scores: number[]): number {
    if (scores.length === 0) return 0;
    return scores.reduce((a, b) => a + b) / scores.length;
  }

  protected static async monitorPerformance(metrics: Record<string, number>) {
    await supabase
      .from('ai_monitoring')
      .insert({
        type: 'performance',
        metrics,
        created_at: new Date().toISOString()
      });
  }
}