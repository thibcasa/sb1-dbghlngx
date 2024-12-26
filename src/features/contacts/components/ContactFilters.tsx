import React from 'react';
import { Search, Filter } from 'lucide-react';
import type { ContactFilters as FilterOptions } from '../types';

interface ContactFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export function ContactFilters({ filters, onFilterChange }: ContactFiltersProps) {
  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center gap-2">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={filters.search}
          onChange={e => onFilterChange({ ...filters, search: e.target.value })}
          placeholder="Rechercher un contact..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <select
          value={filters.status}
          onChange={e => onFilterChange({ ...filters, status: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tous les statuts</option>
          <option value="new">Nouveau</option>
          <option value="active">Actif</option>
          <option value="inactive">Inactif</option>
        </select>

        <select
          value={filters.source}
          onChange={e => onFilterChange({ ...filters, source: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Toutes les sources</option>
          <option value="website">Site web</option>
          <option value="social">Réseaux sociaux</option>
          <option value="referral">Parrainage</option>
        </select>

        <select
          value={filters.tag}
          onChange={e => onFilterChange({ ...filters, tag: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tous les tags</option>
          <option value="vip">VIP</option>
          <option value="prospect">Prospect</option>
          <option value="client">Client</option>
        </select>
      </div>
    </div>
  );
}