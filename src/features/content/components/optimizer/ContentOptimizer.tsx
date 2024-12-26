```tsx
import React from 'react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Sparkles, TrendingUp, AlertTriangle } from 'lucide-react';
import type { GeneratedContent } from '@/lib/ai/content/types';

interface ContentOptimizerProps {
  content: GeneratedContent;
  onOptimize: (content: GeneratedContent) => void;
}

export function ContentOptimizer({ content, onOptimize }: ContentOptimizerProps) {
  const [suggestions] = React.useState([
    {
      type: 'engagement',
      message: 'Ajouter une question pour augmenter l\'engagement',
      impact: 'high'
    },
    {
      type: 'hashtags',
      message: 'Utiliser des hashtags plus pertinents',
      impact: 'medium'
    },
    {
      type: 'timing',
      message: 'Programmer à un meilleur horaire',
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
                onClick={() => onOptimize({
                  ...content,
                  // Appliquer l'optimisation spécifique
                })}
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
```