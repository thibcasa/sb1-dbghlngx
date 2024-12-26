import React from 'react';
import { useMarketingAI } from '@/lib/ai/marketing/hooks/useMarketingAI';
import { Card } from '../common/Card';
import { TrendingUp, Target, Users, MessageSquare } from 'lucide-react';

export function AIRecommendations() {
  const { insights, loading, error } = useMarketingAI();

  if (loading) return <div>Chargement des recommandations...</div>;
  if (error) return <div>Erreur: {error.message}</div>;
  if (!insights) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Recommandations IA
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium">Optimisation Budget</h3>
          </div>
          <div className="space-y-2">
            {insights.recommendations.budgetAllocation.map((rec: any, i: number) => (
              <p key={i} className="text-sm text-gray-600">{rec}</p>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium">Ciblage</h3>
          </div>
          <div className="space-y-2">
            {insights.recommendations.targetingAdjustments.map((rec: any, i: number) => (
              <p key={i} className="text-sm text-gray-600">{rec}</p>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium">Contenu</h3>
          </div>
          <div className="space-y-2">
            {insights.recommendations.contentSuggestions.map((rec: any, i: number) => (
              <p key={i} className="text-sm text-gray-600">{rec}</p>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}