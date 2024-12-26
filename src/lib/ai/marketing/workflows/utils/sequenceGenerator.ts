import type { SequenceStep } from '../../objectives/types';

export function generateWorkflowSequence(params: {
  deadline: Date;
  target: number;
}): SequenceStep[] {
  const totalDays = Math.ceil(
    (params.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  
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