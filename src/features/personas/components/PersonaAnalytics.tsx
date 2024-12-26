import React from 'react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Target, Users, TrendingUp, MessageSquare } from 'lucide-react';
import { usePersonaAnalytics } from '../hooks/usePersonaAnalytics';
import { PerformanceMetrics } from './analytics/PerformanceMetrics';
import { ContentEffectiveness } from './analytics/ContentEffectiveness';
import { CampaignResults } from './analytics/CampaignResults';

interface PersonaAnalyticsProps {
  personaId: string;
}

export function PersonaAnalytics({ personaId }: PersonaAnalyticsProps) {
  const { analytics, loading, error } = usePersonaAnalytics(personaId);

  if (loading) {
    return (
      <Card>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-100 rounded w-1/3" />
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-100 rounded" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <div className="text-red-500">
          Une erreur est survenue lors du chargement des analyses
        </div>
      </Card>
    );
  }

  if (!analytics) return null;

  return (
    <div className="space-y-6">
      <PerformanceMetrics metrics={analytics.metrics} />
      <ContentEffectiveness effectiveness={analytics.content} />
      <CampaignResults results={analytics.campaigns} />
    </div>
  );
}