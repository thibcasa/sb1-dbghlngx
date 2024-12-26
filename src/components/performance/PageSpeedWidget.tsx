import React from 'react';
import { usePageSpeedMonitor } from '@/lib/performance/hooks/usePageSpeedMonitor';
import { Gauge, AlertTriangle, CheckCircle } from 'lucide-react';

interface PageSpeedWidgetProps {
  url: string;
}

export function PageSpeedWidget({ url }: PageSpeedWidgetProps) {
  const { metrics, loading, error } = usePageSpeedMonitor(url);

  if (loading) {
    return (
      <div className="animate-pulse bg-white p-4 rounded-lg shadow">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
        <div className="flex items-center text-red-800">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Erreur lors de l'analyse des performances
        </div>
      </div>
    );
  }

  if (!metrics) return null;

  const score = metrics.metrics.performance_score;
  const scoreColor = score >= 90 ? 'text-green-500' : score >= 50 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Performance PageSpeed</h3>
        <span className={`text-2xl font-bold ${scoreColor}`}>
          {score}/100
        </span>
      </div>

      <div className="space-y-4">
        {metrics.issues.length > 0 ? (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Problèmes détectés</h4>
            {metrics.issues.map((issue, index) => (
              <div key={index} className="flex items-start text-sm">
                <AlertTriangle className={`w-4 h-4 mr-2 mt-0.5 ${
                  issue.severity === 'high' ? 'text-red-500' : 'text-yellow-500'
                }`} />
                <span>{issue.message}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center text-green-600">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span>Aucun problème majeur détecté</span>
          </div>
        )}

        {metrics.suggestions.length > 0 && (
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Suggestions d'amélioration</h4>
            <ul className="space-y-2">
              {metrics.suggestions.map((suggestion, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="mr-2">•</span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}