import { MarketingObjectiveEngine } from '../objectives/MarketingObjectiveEngine';
import { FunnelAICore } from '../../sales/FunnelAICore';
import type { MarketingObjective } from '../objectives/types';

export class SalesObjectiveHandler {
  static async handleMandateRequest(count: number) {
    const objective = await this.createMandateObjective(count);
    const funnel = await this.createSalesFunnel(objective);
    
    return {
      objective,
      funnel,
      initialRecommendations: await this.generateInitialRecommendations(count)
    };
  }

  private static async createMandateObjective(count: number): Promise<MarketingObjective> {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 30); // 30 jours pour atteindre l'objectif

    return MarketingObjectiveEngine.createObjective({
      target: count,
      deadline,
      audience: {
        propertyOwners: true,
        location: 'local',
        sellingIntent: 'high'
      },
      budget: count * 500 // Budget estimé par mandat
    });
  }

  private static async createSalesFunnel(objective: MarketingObjective) {
    return FunnelAICore.createFunnel(
      'mandate_acquisition',
      objective.sequence[0].objective
    );
  }

  private static async generateInitialRecommendations(count: number) {
    return [
      {
        type: 'content',
        description: `Créer ${count * 2} posts ciblés sur les propriétaires locaux`,
        priority: 'high'
      },
      {
        type: 'targeting',
        description: 'Cibler les propriétaires ayant consulté des estimations',
        priority: 'high'
      },
      {
        type: 'conversion',
        description: 'Mettre en place une landing page d\'estimation gratuite',
        priority: 'high'
      }
    ];
  }
}