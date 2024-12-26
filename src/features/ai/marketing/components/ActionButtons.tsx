import React from 'react';
import { Play, BarChart, Settings } from 'lucide-react';
import type { AIAction } from '../types';

interface ActionButtonsProps {
  actions: AIAction[];
  onAction: (action: AIAction) => void;
}

export function ActionButtons({ actions, onAction }: ActionButtonsProps) {
  if (!actions?.length) return null;

  const getIcon = (type: AIAction['type']) => {
    switch (type) {
      case 'create_campaign':
        return <Play className="w-4 h-4" />;
      case 'analyze_campaign':
        return <BarChart className="w-4 h-4" />;
      case 'optimize_campaign':
        return <Settings className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => onAction(action)}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
        >
          {getIcon(action.type)}
          {formatActionLabel(action.type)}
        </button>
      ))}
    </div>
  );
}

function formatActionLabel(type: AIAction['type']): string {
  switch (type) {
    case 'create_campaign':
      return 'Lancer la campagne';
    case 'analyze_campaign':
      return 'Voir l\'analyse';
    case 'optimize_campaign':
      return 'Optimiser';
  }
}