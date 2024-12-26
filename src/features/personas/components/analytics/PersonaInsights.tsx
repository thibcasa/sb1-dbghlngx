import React from 'react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Brain, Target, Users, TrendingUp } from 'lucide-react';
import { usePersonaAnalytics } from '../../hooks/usePersonaAnalytics';

interface PersonaInsightsProps {
  personaId: string;
}

export function PersonaInsights({ personaId }: PersonaInsightsProps) {
  const { analytics, loading } = usePersonaAnalytics(personaId);

  if (loading) {
    return (
      <Card>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-100 rounded w-1/3" />
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-gray-100 rounded" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Préférences de Communication */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Préférences de Communication
          </h3>
          <Badge variant="success">
            {analytics.preferences.score}% match
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Canaux Préférés</h4>
            {analytics.preferences.channels.map((channel, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>{channel.name}</span>
                <Badge variant="info">{channel.score}%</Badge>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Moments Optimaux</h4>
            {analytics.preferences.timing.bestTimes.map((time, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>{time.day}</span>
                <Badge variant="info">{time.hour}h</Badge>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Recommandations IA */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-medium text-gray-900">
            Recommandations IA
          </h3>
        </div>

        <div className="space-y-4">
          {analytics.recommendations.map((rec, index) => (
            <div
              key={index}
              className="p-4 bg-blue-50 rounded-lg border border-blue-100"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-blue-900">{rec.title}</h4>
                <Badge variant={rec.priority}>
                  {rec.priority}
                </Badge>
              </div>
              <p className="text-blue-800">{rec.description}</p>
              {rec.actions && (
                <div className="mt-2 space-y-1">
                  {rec.actions.map((action, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <span className="text-blue-700">{action}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}