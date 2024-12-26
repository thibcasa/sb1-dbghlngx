import { supabase } from '@/lib/supabase/client';
import type { MarketingObjective, ObjectiveStatus, SequenceStep } from './types';
import { SequenceOptimizer } from './SequenceOptimizer';
import { ObjectiveAnalyzer } from './ObjectiveAnalyzer';
import { MarketingAICore } from '../MarketingAICore';

export class MarketingObjectiveEngine {
  static async createObjective(params: {
    target: number;
    deadline: Date;
    audience: any;
    budget: number;
  }): Promise<MarketingObjective> {
    const sequence = await SequenceOptimizer.generateSequence(params);
    const campaigns = await this.generateInitialCampaigns(sequence, params);

    return {
      id: crypto.randomUUID(),
      status: 'active',
      target: params.target,
      deadline: params.deadline,
      currentLeads: 0,
      sequence,
      campaigns,
      metrics: this.initializeMetrics(),
      nextReview: this.calculateNextReview()
    };
  }

  static async evaluateProgress(objective: MarketingObjective): Promise<ObjectiveStatus> {
    const analysis = await ObjectiveAnalyzer.analyzePerformance(objective);
    
    if (analysis.isOnTrack) {
      return { status: 'on_track', recommendations: [] };
    }

    const adjustments = await this.generateAdjustments(objective, analysis);
    return {
      status: 'needs_adjustment',
      recommendations: adjustments
    };
  }

  private static async generateInitialCampaigns(
    sequence: SequenceStep[],
    params: any
  ) {
    return Promise.all(
      sequence.map(step => 
        MarketingAICore.createCampaign(
          step.objective,
          params.audience,
          this.allocateBudget(step, params.budget)
        )
      )
    );
  }

  private static allocateBudget(step: SequenceStep, totalBudget: number): number {
    return totalBudget * step.budgetAllocation;
  }

  private static initializeMetrics() {
    return {
      leadAcquisitionRate: 0,
      averageCostPerLead: 0,
      conversionRate: 0,
      roi: 0
    };
  }

  private static calculateNextReview(): Date {
    const review = new Date();
    review.setDate(review.getDate() + 7);
    return review;
  }

  private static async generateAdjustments(
    objective: MarketingObjective,
    analysis: any
  ) {
    const adjustments = [];

    if (analysis.leadAcquisitionRate < objective.target / 30) {
      adjustments.push({
        type: 'increase_reach',
        description: 'Augmenter la portée des campagnes',
        priority: 'high'
      });
    }

    if (analysis.conversionRate < 0.02) {
      adjustments.push({
        type: 'optimize_conversion',
        description: 'Optimiser les points de conversion',
        priority: 'high'
      });
    }

    return adjustments;
  }
}