import { MarketingObjective } from '../objectives/types';
import { CampaignConfigurator } from './CampaignConfigurator';
import { WorkflowMonitor } from './WorkflowMonitor';
import { WorkflowOptimizer } from './WorkflowOptimizer';

export class MarketingWorkflowEngine {
  static async initializeWorkflow(params: {
    target: number;
    deadline: Date;
    audience: any;
  }): Promise<MarketingObjective> {
    // Configurer la campagne initiale
    const objective = CampaignConfigurator.createObjective(params);
    
    // Démarrer le monitoring
    WorkflowMonitor.startMonitoring(objective.id);
    
    return objective;
  }

  static async processWorkflowStep(objectiveId: string) {
    const status = await WorkflowMonitor.checkStatus(objectiveId);
    
    if (status.needsOptimization) {
      await WorkflowOptimizer.optimizeWorkflow(objectiveId);
    }
    
    return status;
  }
}