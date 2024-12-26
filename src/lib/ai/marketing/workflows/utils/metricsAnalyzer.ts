const PERFORMANCE_THRESHOLDS = {
  clickRate: 0.05,
  conversionRate: 0.02,
  costPerLead: 50
};

export function analyzeMetrics(metrics: Record<string, number>) {
  const alerts = [];

  // Check click rate
  if (metrics.clickRate < PERFORMANCE_THRESHOLDS.clickRate) {
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

  // Check conversion rate
  if (metrics.conversionRate < PERFORMANCE_THRESHOLDS.conversionRate) {
    alerts.push({
      type: 'critical',
      metric: 'conversionRate',
      message: 'Taux de conversion critique',
      recommendations: [
        'Optimiser les landing pages',
        'Revoir le processus de qualification'
      ]
    });
  }

  return {
    alerts,
    needsOptimization: alerts.some(alert => alert.type === 'critical'),
    metrics
  };
}