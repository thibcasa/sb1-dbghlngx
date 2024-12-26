import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { StatsCharts } from '@/features/stats/components/StatsCharts';
import { AIRecommendations } from '@/components/marketing/AIRecommendations';
import { PerformanceAnalytics } from '@/features/social/components/PerformanceAnalytics';

export default function AnalyticsPage() {
  return (
    <PageLayout
      title="Analyses"
      description="Visualisez et analysez vos performances"
    >
      <div className="space-y-6">
        <PerformanceAnalytics 
          metrics={{
            reach: 1200,
            engagement: 450,
            clicks: 280,
            leads: 45,
            conversionRate: 0.15
          }}
        />
        <StatsCharts />
        <AIRecommendations />
      </div>
    </PageLayout>
  );
}