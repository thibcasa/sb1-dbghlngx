import { supabase } from '@/lib/supabase/client';
import type { FunnelStage, FunnelTemplate, LeadScore } from './types';
import { LeadScoringEngine } from './LeadScoringEngine';
import { StageOptimizer } from './StageOptimizer';
import { ContentAICore } from '../content/ContentAICore';

export class FunnelAICore {
  static async createFunnel(objective: string, audience: any): Promise<FunnelTemplate> {
    const stages = await this.generateOptimalStages(objective, audience);
    const content = await this.generateStageContent(stages, audience);
    
    return {
      stages: stages.map((stage, index) => ({
        ...stage,
        content: content[index]
      })),
      metrics: this.initializeFunnelMetrics()
    };
  }

  private static async generateOptimalStages(
    objective: string, 
    audience: any
  ): Promise<FunnelStage[]> {
    return StageOptimizer.generateStages(objective, audience);
  }

  private static async generateStageContent(
    stages: FunnelStage[],
    audience: any
  ): Promise<any[]> {
    return Promise.all(
      stages.map(stage => 
        ContentAICore.generateContent(stage.contentType, {
          audience,
          stage: stage.type
        })
      )
    );
  }

  private static initializeFunnelMetrics() {
    return {
      conversionRate: 0,
      dropOffPoints: [],
      averageTimeInStage: 0
    };
  }
}