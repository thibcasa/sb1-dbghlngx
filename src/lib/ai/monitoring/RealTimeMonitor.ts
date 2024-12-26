import { MarketingMonitor } from './MarketingMonitor';
import { PerformanceAnalyzer } from './PerformanceAnalyzer';
import { OptimizationEngine } from './OptimizationEngine';
import type { MonitoringStatus, PerformanceAlert, OptimizationAction } from './types';
import type { MarketingObjective } from '../marketing/objectives/types';

export class RealTimeMonitor {
  private static readonly UPDATE_INTERVAL = 5 * 60 * 1000; // 5 minutes
  private static readonly ALERT_THRESHOLDS = {
    reach: 0.7,      // 70% de l'objectif
    engagement: 0.02, // 2% taux d'engagement
    conversion: 0.01, // 1% taux de conversion
    costPerLead: 50  // 50€ maximum par lead
  };

  static async startMonitoring(objective: MarketingObjective): Promise<NodeJS.Timer> {
    // Démarrer le monitoring initial
    await this.checkStatus(objective);

    // Configurer la surveillance continue
    return setInterval(async () => {
      await this.checkStatus(objective);
    }, this.UPDATE_INTERVAL);
  }

  private static async checkStatus(objective: MarketingObjective): Promise<MonitoringStatus> {
    // Analyser les performances actuelles
    const analysis = await PerformanceAnalyzer.analyzePerformanceTrends(objective);
    
    // Vérifier les alertes
    const alerts = this.checkAlerts(analysis);
    
    // Générer des optimisations si nécessaire
    const optimizations = alerts.length > 0 
      ? await OptimizationEngine.optimizeObjective(objective)
      : [];

    // Appliquer les optimisations urgentes automatiquement
    await this.applyUrgentOptimizations(optimizations);

    // Mettre à jour le statut
    const status = {
      objective,
      currentMetrics: analysis.metrics,
      alerts,
      optimizations,
      lastUpdated: new Date()
    };

    // Notifier les changements importants
    this.notifyStatusChanges(status);

    return status;
  }

  private static checkAlerts(analysis: any): PerformanceAlert[] {
    const alerts: PerformanceAlert[] = [];

    // Vérifier chaque métrique
    Object.entries(this.ALERT_THRESHOLDS).forEach(([metric, threshold]) => {
      const currentValue = analysis.metrics[metric];
      
      if (currentValue < threshold) {
        alerts.push({
          type: currentValue < threshold * 0.5 ? 'critical' : 'warning',
          metric: metric as keyof typeof this.ALERT_THRESHOLDS,
          threshold,
          currentValue,
          message: this.generateAlertMessage(metric, currentValue, threshold),
          recommendations: this.generateRecommendations(metric)
        });
      }
    });

    return alerts;
  }

  private static generateAlertMessage(
    metric: string,
    value: number,
    threshold: number
  ): string {
    const percentage = ((value / threshold) * 100).toFixed(1);
    return `${metric} est à ${percentage}% de l'objectif (${value} vs ${threshold})`;
  }

  private static generateRecommendations(metric: string): string[] {
    const recommendations = {
      reach: [
        'Augmenter le budget publicitaire',
        'Élargir le ciblage géographique',
        'Tester de nouveaux canaux'
      ],
      engagement: [
        'Optimiser le contenu pour plus d\'interactions',
        'Tester différents formats de contenu',
        'Augmenter la fréquence de publication'
      ],
      conversion: [
        'Optimiser les landing pages',
        'Revoir les call-to-action',
        'Améliorer le ciblage des audiences'
      ],
      costPerLead: [
        'Optimiser les enchères publicitaires',
        'Affiner le ciblage',
        'Réduire les dépenses sur les créneaux peu performants'
      ]
    };

    return recommendations[metric as keyof typeof recommendations] || [];
  }

  private static async applyUrgentOptimizations(
    optimizations: OptimizationAction[]
  ): Promise<void> {
    const urgentOptimizations = optimizations.filter(opt => opt.priority === 'high');
    
    for (const optimization of urgentOptimizations) {
      try {
        await this.applyOptimization(optimization);
      } catch (error) {
        console.error(`Erreur lors de l'application de l'optimisation:`, error);
      }
    }
  }

  private static async applyOptimization(optimization: OptimizationAction): Promise<void> {
    switch (optimization.type) {
      case 'budget':
        await this.adjustBudget(optimization.changes);
        break;
      case 'targeting':
        await this.adjustTargeting(optimization.changes);
        break;
      case 'content':
        await this.optimizeContent(optimization.changes);
        break;
      case 'timing':
        await this.adjustTiming(optimization.changes);
        break;
    }
  }

  private static async adjustBudget(changes: any): Promise<void> {
    // Implémentation de l'ajustement du budget
  }

  private static async adjustTargeting(changes: any): Promise<void> {
    // Implémentation de l'ajustement du ciblage
  }

  private static async optimizeContent(changes: any): Promise<void> {
    // Implémentation de l'optimisation du contenu
  }

  private static async adjustTiming(changes: any): Promise<void> {
    // Implémentation de l'ajustement du timing
  }

  private static notifyStatusChanges(status: MonitoringStatus): void {
    // Notifier les changements importants
    if (status.alerts.some(alert => alert.type === 'critical')) {
      console.error('Alertes critiques détectées:', status.alerts);
    }

    if (status.optimizations.length > 0) {
      console.info('Optimisations appliquées:', status.optimizations);
    }
  }
}