import { supabase } from '@/lib/supabase/client';
import type { PostTemplate } from '../types';

export class PostTemplateManager {
  static async getTemplates(type: string): Promise<PostTemplate[]> {
    const { data } = await supabase
      .from('content_templates')
      .select('*')
      .eq('type', type)
      .order('performance_score', { ascending: false });
    
    return data || [];
  }

  static async updateTemplatePerformance(templateId: string, metrics: {
    engagement: number;
    clicks: number;
    conversions: number;
  }) {
    const score = this.calculatePerformanceScore(metrics);
    
    await supabase
      .from('content_templates')
      .update({ 
        performance_score: score,
        last_metrics: metrics 
      })
      .eq('id', templateId);
  }

  private static calculatePerformanceScore(metrics: any): number {
    return (
      metrics.engagement * 0.3 +
      metrics.clicks * 0.3 +
      metrics.conversions * 0.4
    );
  }
}