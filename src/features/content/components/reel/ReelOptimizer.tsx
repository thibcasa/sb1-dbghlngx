import React from 'react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Sparkles, Clock, Users, TrendingUp } from 'lucide-react';
import type { GeneratedReel } from '@/lib/ai/content/types';

interface ReelOptimizerProps {
  reel: GeneratedReel;
  onOptimize: (optimizations: any) => void;
}

export function ReelOptimizer({ reel, onOptimize }: ReelOptimizerProps) {
  const [suggestions] = React.useState([
    {
      type: 'timing',
      message: 'Réduire la durée de l\'intro de 2 secondes',
      impact: 'high'
    },
    {
      type: 'content',
      message: 'Ajouter un hook plus accrocheur',
      impact: 'medium'
    },
    {
      type: 'visual',
      message: 'Utiliser des transitions plus dynamiques',
      impact: 'low'
    }
  ]);

  return (
    <Card>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <h3 className="font-medium">Optimisations suggérées</h3>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Durée optimale</span>
            </div>
            <p className="text-lg font-medium">{reel.metadata.duration}s</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Audience cible</span>
            </div>
            <p className="text-lg font-medium">35-55 ans</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Score</span>
            </div>
            <p className="text-lg font-medium">8.5/10</p>
          </div>
        </div>

        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-4 bg-blue-50 rounded-lg border border-blue-100"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-blue-900 font-medium">{suggestion.message}</p>
                <Badge variant={
                  suggestion.impact === 'high' ? 'danger' :
                  suggestion.impact === 'medium' ? 'warning' : 'info'
                }>
                  {suggestion.impact}
                </Badge>
              </div>
              <button
                onClick={() => onOptimize(suggestion)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Appliquer
              </button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}