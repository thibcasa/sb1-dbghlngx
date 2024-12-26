import React from 'react';
import { Card } from '@/components/common/Card';
import { Users, Target, Brain } from 'lucide-react';
import type { Persona } from '../types';

interface PersonaListProps {
  personas: Persona[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  loading?: boolean;
}

export function PersonaList({ personas, selectedId, onSelect, loading }: PersonaListProps) {
  if (loading) {
    return (
      <Card>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-gray-100 rounded" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="space-y-4">
        {personas.map(persona => (
          <button
            key={persona.id}
            onClick={() => onSelect(persona.id)}
            className={`w-full text-left p-4 rounded-lg transition-colors ${
              selectedId === persona.id
                ? 'bg-blue-50 border border-blue-200'
                : 'hover:bg-gray-50 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-blue-500" />
              <h3 className="font-medium text-gray-900">{persona.name}</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 text-gray-500">
                <Target className="w-4 h-4" />
                <span>{persona.demographics.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Brain className="w-4 h-4" />
                <span>{persona.psychographics.goals.length} objectifs</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
}