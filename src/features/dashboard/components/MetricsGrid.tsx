import React from 'react';
import { BarChart, Users, Calendar, MessageSquare, Target, TrendingUp } from 'lucide-react';
import { MetricsCard } from './MetricsCard';
import { useDashboardMetrics } from '../hooks/useDashboardMetrics';

export function MetricsGrid() {
  const { metrics, loading, error } = useDashboardMetrics();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;
  if (!metrics) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MetricsCard
        title="Mandats Obtenus"
        {...metrics.mandats}
        icon={<Target className="w-6 h-6" />}
      />
      <MetricsCard
        title="Leads Actifs"
        {...metrics.leads}
        icon={<Users className="w-6 h-6" />}
      />
      {/* ... other metrics */}
    </div>
  );
}