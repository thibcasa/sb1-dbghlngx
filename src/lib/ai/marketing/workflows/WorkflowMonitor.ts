import { supabase } from '@/lib/supabase/client';
import { PerformanceAlert } from '../monitoring/types';

export class WorkflowMonitor {
  private static readonly ALERT_THRESHOLDS = {
    clickRate: 0.05,
    conversionRate: 0.02,
    costPerLead: 50
  };

  static async startMonitoring(objectiveId: string) {
    // Initialiser le monitoring dans la base de données
    await supabase.from('marketing_analytics').insert({
      workflow_id: objectiveId,
      metrics: {},
      insights: [],
      recommendations: []
    });
  }

  static async checkStatus(objectiveId: string) {
    const { data: metrics } = await supabase
      .from('marketing_analytics')
      .select('metrics')
      .eq('workflow_id', objectiveId)
      .single();

    const alerts = this.analyzeMetrics(metrics);
    const needsOptimization = alerts.some(alert => alert.type === 'critical');

    return {
      alerts,
      needsOptimization,
      metrics
    };
  }

  private static analyzeMetrics(metrics: any): PerformanceAlert[] {
    const alerts: PerformanceAlert[] = [];

    if (metrics.clickRate < this.ALERT_THRESHOLDS.clickRate) {
      alerts.push({
        type: 'warning',
        metric: 'clickRate',
        message: 'Taux de clic insuffisant',
        recommendations: [
          'Optimiser le ciblage',
          'Revoir le contenu des annonces'
        ]
      });
    }

    return alerts;
  }
}