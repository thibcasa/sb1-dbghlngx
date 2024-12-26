import type { MarketingObjective } from './types';

export class ObjectiveAnalyzer {
  static async analyzePerformance(objective: MarketingObjective) {
    const progress = await this.calculateProgress(objective);
    const projections = this.calculateProjections(objective, progress);
    
    return {
      isOnTrack: this.isOnTrack(projections, objective),
      progress,
      projections,
      recommendations: this.generateRecommendations(objective, progress)
    };
  }

  private static async calculateProgress(objective: MarketingObjective) {
    const timeElapsed = this.calculateTimeElapsed(objective);
    const leadProgress = objective.currentLeads / objective.target;
    
    return {
      timeProgress: timeElapsed,
      leadProgress,
      efficiency: this.calculateEfficiency(objective)
    };
  }

  private static calculateTimeElapsed(objective: MarketingObjective): number {
    const now = new Date();
    const start = new Date(objective.createdAt);
    const total = objective.deadline.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    
    return elapsed / total;
  }

  private static calculateEfficiency(objective: MarketingObjective): number {
    const { currentLeads, metrics } = objective;
    if (currentLeads === 0) return 0;
    
    return currentLeads / metrics.averageCostPerLead;
  }

  private static calculateProjections(
    objective: MarketingObjective,
    progress: any
  ) {
    const projectedLeads = this.projectLeads(objective, progress);
    const projectedCompletion = this.projectCompletion(objective, progress);
    
    return { projectedLeads, projectedCompletion };
  }

  private static projectLeads(objective: MarketingObjective, progress: any): number {
    const dailyRate = objective.currentLeads / (progress.timeProgress * 30);
    const daysRemaining = this.calculateDaysRemaining(objective);
    
    return objective.currentLeads + (dailyRate * daysRemaining);
  }

  private static projectCompletion(objective: MarketingObjective, progress: any): Date {
    const dailyRate = objective.currentLeads / (progress.timeProgress * 30);
    const remainingLeads = objective.target - objective.currentLeads;
    const daysNeeded = remainingLeads / dailyRate;
    
    const completion = new Date();
    completion.setDate(completion.getDate() + daysNeeded);
    
    return completion;
  }

  private static calculateDaysRemaining(objective: MarketingObjective): number {
    const now = new Date();
    const remaining = objective.deadline.getTime() - now.getTime();
    return Math.ceil(remaining / (1000 * 60 * 60 * 24));
  }

  private static isOnTrack(projections: any, objective: MarketingObjective): boolean {
    return (
      projections.projectedLeads >= objective.target &&
      projections.projectedCompletion <= objective.deadline
    );
  }

  private static generateRecommendations(
    objective: MarketingObjective,
    progress: any
  ) {
    const recommendations = [];

    if (progress.leadProgress < progress.timeProgress) {
      recommendations.push({
        type: 'increase_acquisition',
        priority: 'high',
        suggestions: this.generateAcquisitionSuggestions(objective)
      });
    }

    if (objective.metrics.averageCostPerLead > objective.metrics.targetCPL) {
      recommendations.push({
        type: 'optimize_cost',
        priority: 'medium',
        suggestions: this.generateCostOptimizationSuggestions(objective)
      });
    }

    return recommendations;
  }

  private static generateAcquisitionSuggestions(objective: MarketingObjective) {
    return [
      'Augmenter le budget des campagnes performantes',
      'Élargir le ciblage sur les segments les plus réceptifs',
      'Tester de nouveaux formats de contenu'
    ];
  }

  private static generateCostOptimizationSuggestions(objective: MarketingObjective) {
    return [
      'Optimiser les enchères sur les canaux payants',
      'Concentrer les dépenses sur les créneaux horaires les plus performants',
      'Affiner le ciblage pour réduire les clics non qualifiés'
    ];
  }
}