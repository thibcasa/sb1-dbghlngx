import { AIEngine } from './AIEngine';

export class AIMonitor extends AIEngine {
  static async monitorPerformance(metrics: Record<string, number>) {
    const config = await this.getModelConfig('monitoring');
    const analysis = this.analyzeMetrics(metrics);
    
    if (analysis.alerts.length > 0) {
      await this.triggerAlerts(analysis.alerts);
    }

    await this.logPrediction({
      modelType: 'monitoring',
      input: metrics,
      output: analysis,
      confidence: this.calculateConfidence([0.9])
    });

    return analysis;
  }

  private static analyzeMetrics(metrics: Record<string, number>) {
    const alerts = [];
    const insights = [];

    // Analyser les métriques et générer des alertes/insights
    Object.entries(metrics).forEach(([key, value]) => {
      if (value < 0.5) {
        alerts.push({
          type: 'performance_drop',
          metric: key,
          value,
          severity: value < 0.3 ? 'high' : 'medium'
        });
      }
    });

    return { alerts, insights };
  }

  private static async triggerAlerts(alerts: any[]) {
    await supabase
      .from('ai_monitoring')
      .insert(alerts.map(alert => ({
        type: 'alert',
        metrics: alert,
        created_at: new Date().toISOString()
      })));
  }
}