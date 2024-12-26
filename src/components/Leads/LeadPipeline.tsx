import React from 'react';
import LeadCard from './LeadCard';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: string;
  source: string;
  property_details?: {
    type?: string;
    location?: string;
    estimatedValue?: number;
  };
  created_at: string;
}

interface LeadPipelineProps {
  leads: Lead[];
  onStatusChange: (leadId: string, status: string) => void;
}

export default function LeadPipeline({ leads, onStatusChange }: LeadPipelineProps) {
  const columns = [
    { id: 'new', title: 'Nouveaux' },
    { id: 'contacted', title: 'Contactés' },
    { id: 'qualified', title: 'Qualifiés' },
    { id: 'negotiation', title: 'En négociation' },
    { id: 'won', title: 'Gagnés' }
  ];

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map(column => (
        <div
          key={column.id}
          className="flex-1 min-w-[320px] bg-gray-50 rounded-lg p-4"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {column.title}
            <span className="ml-2 text-sm text-gray-500">
              ({leads.filter(lead => lead.status === column.id).length})
            </span>
          </h3>

          <div className="space-y-4">
            {leads
              .filter(lead => lead.status === column.id)
              .map(lead => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onStatusChange={(status) => onStatusChange(lead.id, status)}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}