import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { MetricsGrid } from '@/components/Dashboard/MetricsGrid';
import { LeadPipeline } from '@/features/leads/components/LeadPipeline';
import { ActivityFeed } from '@/features/activity/components/ActivityFeed';
import { AIRecommendations } from '@/components/marketing/AIRecommendations';

export default function DashboardPage() {
  return (
    <PageLayout
      title="Tableau de bord"
      description="Vue d'ensemble de votre activité"
    >
      <div className="space-y-6">
        <MetricsGrid />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <LeadPipeline />
          </div>
          <div>
            <ActivityFeed />
          </div>
        </div>

        <AIRecommendations />
      </div>
    </PageLayout>
  );
}