import React from 'react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Users, Phone, Mail, Calendar } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'new' | 'contacted' | 'qualified' | 'negotiation' | 'won' | 'lost';
  source: string;
  lastContact?: Date;
}

interface LeadPipelineProps {
  leads: Lead[];
  onStatusChange: (leadId: string, newStatus: Lead['status']) => void;
}

export function LeadPipeline({ leads, onStatusChange }: LeadPipelineProps) {
  const columns = [
    { id: 'new', title: 'Nouveaux', variant: 'new' },
    { id: 'contacted', title: 'Contactés', variant: 'contacted' },
    { id: 'qualified', title: 'Qualifiés', variant: 'qualified' },
    { id: 'negotiation', title: 'En négociation', variant: 'negotiation' },
    { id: 'won', title: 'Gagnés', variant: 'won' }
  ];

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map(column => (
        <div key={column.id} className="flex-1 min-w-[300px]">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">{column.title}</h3>
              <Badge variant={column.variant as any}>
                {leads.filter(lead => lead.status === column.id).length}
              </Badge>
            </div>

            <div className="space-y-4">
              {leads
                .filter(lead => lead.status === column.id)
                .map(lead => (
                  <div
                    key={lead.id}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{lead.name}</h4>
                      <select
                        value={lead.status}
                        onChange={e => onStatusChange(lead.id, e.target.value as Lead['status'])}
                        className="text-sm border-0 bg-transparent"
                      >
                        <option value="new">Nouveau</option>
                        <option value="contacted">Contacté</option>
                        <option value="qualified">Qualifié</option>
                        <option value="negotiation">En négociation</option>
                        <option value="won">Gagné</option>
                        <option value="lost">Perdu</option>
                      </select>
                    </div>

                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {lead.email}
                      </div>
                      {lead.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {lead.phone}
                        </div>
                      )}
                      {lead.lastContact && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(lead.lastContact).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}