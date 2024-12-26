import { MarketingObjective, SequenceStep } from '../objectives/types';

export class CampaignConfigurator {
  static createObjective(params: {
    target: number;
    deadline: Date;
    audience: any;
  }): MarketingObjective {
    return {
      id: crypto.randomUUID(),
      status: 'active',
      target: params.target,
      deadline: params.deadline,
      currentLeads: 0,
      sequence: this.generateSequence(params),
      metrics: this.initializeMetrics(),
      nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000)
    };
  }

  private static generateSequence(params: any): SequenceStep[] {
    const totalDays = Math.ceil((params.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    
    return [
      {
        type: 'awareness',
        objective: 'reach_property_owners',
        budgetAllocation: 0.4,
        expectedDuration: Math.floor(totalDays * 0.3),
        requirements: ['targeting', 'content']
      },
      {
        type: 'engagement',
        objective: 'generate_leads',
        budgetAllocation: 0.4,
        expectedDuration: Math.floor(totalDays * 0.4),
        requirements: ['lead_magnet', 'landing_page']
      },
      {
        type: 'conversion',
        objective: 'schedule_meetings',
        budgetAllocation: 0.2,
        expectedDuration: Math.floor(totalDays * 0.3),
        requirements: ['follow_up', 'appointment_booking']
      }
    ];
  }

  private static initializeMetrics() {
    return {
      leadAcquisitionRate: 0,
      averageCostPerLead: 0,
      conversionRate: 0,
      roi: 0
    };
  }
}