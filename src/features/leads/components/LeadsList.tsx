import React from 'react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Calendar, Mail, Phone } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'qualified' | 'negotiation' | 'won' | 'lost';
  lastContact: string;
}

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean@example.com',
    phone: '06 12 34 56 78',
    status: 'new',
    lastContact: '2024-03-15'
  },
  {
    id: '2',
    name: 'Marie Martin',
    email: 'marie@example.com',
    phone: '06 98 76 54 32',
    status: 'contacted',
    lastContact: '2024-03-14'
  }
];

export function LeadsList() {
  return (
    <div className="space-y-4">
      {mockLeads.map((lead) => (
        <Card key={lead.id} className="hover:border-blue-200 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">{lead.name}</h3>
              <div className="mt-1 space-y-1">
                <div className="flex items-center text-sm text-gray-500">
                  <Mail className="w-4 h-4 mr-2" />
                  {lead.email}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Phone className="w-4 h-4 mr-2" />
                  {lead.phone}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge variant={lead.status}>{lead.status}</Badge>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(lead.lastContact).toLocaleDateString()}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}