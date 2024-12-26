import { AIEngine } from '../core/AIEngine';
import type { Workflow, WorkflowExecution } from '@/features/workflows/types';

export class WorkflowOptimizer extends AIEngine {
  static async analyzePerformance(workflow: Workflow, executions: WorkflowExecution[]) {
    const config = await this.getModelConfig('workflow_optimization');
    const metrics = this.calculateMetrics(executions);
    const bottlenecks = this.identifyBottlenecks(metrics);
    
    const recommendations = await this.generateRecommendations(bottlenecks);
    
    await this.logPrediction({
      modelType: 'workflow_optimization',
      input: { workflow, executions },
      output: recommendations,
      confidence: this.calculateConfidence(recommendations.map(r => r.confidence))
    });
    
    return {
      metrics,
      bottlenecks,
      recommendations
    };
  }

  private static calculateMetrics(executions: WorkflowExecution[]) {
    const total = executions.length;
    const successful = executions.filter(e => e.status === 'completed').length;
    const failed = executions.filter(e => e.status === 'failed').length;
    
    return {
      successRate: successful / total,
      averageExecutionTime: this.calculateAverageTime(executions),
      failureRate: failed / total
    };
  }

  private static identifyBottlenecks(metrics: any) {
    const bottlenecks = [];
    
    if (metrics.failureRate > 0.1) {
      bottlenecks.push({
        type: 'high_failure_rate',
        severity: 'high',
        details: `Taux d'échec de ${(metrics.failureRate * 100).toFixed(1)}%`
      });
    }
    
    return bottlenecks;
  }

  private static async generateRecommendations(bottlenecks: any[]) {
    return bottlenecks.map(bottleneck => ({
      type: 'optimization',
      priority: bottleneck.severity,
      suggestion: this.getRecommendation(bottleneck),
      confidence: 0.8
    }));
  }

  private static calculateAverageTime(executions: WorkflowExecution[]) {
    const completedExecutions = executions.filter(e => 
      e.status === 'completed' && e.completedAt
    );
    
    if (completedExecutions.length === 0) return 0;
    
    const totalTime = completedExecutions.reduce((sum, execution) => {
      const duration = execution.completedAt!.getTime() - execution.startedAt.getTime();
      return sum + duration;
    }, 0);
    
    return totalTime / completedExecutions.length;
  }

  private static getRecommendation(bottleneck: any) {
    const recommendations = {
      high_failure_rate: 'Ajouter des mécanismes de retry et de validation',
      long_execution_time: 'Optimiser les délais entre les actions',
      low_engagement: 'Personnaliser davantage les communications'
    };
    
    return recommendations[bottleneck.type as keyof typeof recommendations] || 
      'Analyser les logs pour plus de détails';
  }
}