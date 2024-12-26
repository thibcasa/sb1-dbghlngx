import React from 'react';
import { Mail, Phone, Calendar, MapPin } from 'lucide-react';

interface LeadCardProps {
  lead: {
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
  };
  onStatusChange: (status: string) => void;
}

export default function LeadCard({ lead, onStatusChange }: LeadCardProps) {
  const statusColors = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    qualified: 'bg-green-100 text-green-800',
    negotiation: 'bg-purple-100 text-purple-800',
    won: 'bg-emerald-100 text-emerald-800',
    lost: 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{lead.name}</h3>
        <select
          value={lead.status}
          onChange={(e) => onStatusChange(e.target.value)}
          className={`${statusColors[lead.status as keyof typeof statusColors]} text-sm font-medium px-3 py-1 rounded-full`}
        >
          <option value="new">Nouveau</option>
          <option value="contacted">Contacté</option>
          <option value="qualified">Qualifié</option>
          <option value="negotiation">En négociation</option>
          <option value="won">Gagné</option>
          <option value="lost">Perdu</option>
        </select>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-gray-600">
          <Mail className="w-4 h-4 mr-2" />
          <a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline">
            {lead.email}
          </a>
        </div>

        {lead.phone && (
          <div className="flex items-center text-gray-600">
            <Phone className="w-4 h-4 mr-2" />
            <a href={`tel:${lead.phone}`} className="text-blue-600 hover:underline">
              {lead.phone}
            </a>
          </div>
        )}

        {lead.property_details?.location && (
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{lead.property_details.location}</span>
          </div>
        )}

        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>
            {new Date(lead.created_at).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Source: {lead.source}
          </span>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Voir les détails
          </button>
        </div>
      </div>
    </div>
  );
}