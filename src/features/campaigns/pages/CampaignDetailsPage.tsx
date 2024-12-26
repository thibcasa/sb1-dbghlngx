import React from 'react';
import { useParams } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import { CampaignOptimizer } from '../components/CampaignOptimizer';
import { PerformanceAnalytics } from '@/features/social/components/PerformanceAnalytics';
import { useCampaign } from '../hooks/useCampaign';

export default function CampaignDetailsPage() {
  const { id } = useParams();
  const { campaign, loading, error } = useCampaign(id);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;
  if (!campaign) return <div>Campagne non trouvée</div>;

  return (
    <PageLayout
      title={campaign.name}
      description="Détails et performances de la campagne"
    >
      <div className="space-y-6">
        <PerformanceAnalytics metrics={campaign.performance} />
        <CampaignOptimizer 
          campaign={campaign}
          onOptimize={async (optimizations) => {
            console.log('Optimizations:', optimizations);
          }}
        />
      </div>
    </PageLayout>
  );
}