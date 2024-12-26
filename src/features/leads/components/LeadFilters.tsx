import React from 'react';
import { Search, Filter } from 'lucide-react';

interface LeadFiltersProps {
  filters: {
    status: string;
    source: string;
    score: string;
  };
  onChange: (filters: any) => void;
}

export function LeadFilters({ filters, onChange }: LeadFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
      <div className="flex items-center gap-2">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher un lead..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <select
          value={filters.status}
          onChange={e => onChange({ ...filters, status: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tous les statuts</option>
          <option value="new">Nouveau</option>
          <option value="contacted">Contacté</option>
          <option value="qualified">Qualifié</option>
          <option value="negotiation">En négociation</option>
          <option value="won">Gagné</option>
          <option value="lost">Perdu</option>
        </select>

        <select
          value={filters.source}
          onChange={e => onChange({ ...filters, source: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Toutes les sources</option>
          <option value="website">Site web</option>
          <option value="social">Réseaux sociaux</option>
          <option value="referral">Parrainage</option>
        </select>

        <select
          value={filters.score}
          onChange={e => onChange({ ...filters, score: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tous les scores</option>
          <option value="80">Score > 80</option>
          <option value="60">Score > 60</option>
          <option value="40">Score > 40</option>
        </select>
      </div>
    </div>
  );
}