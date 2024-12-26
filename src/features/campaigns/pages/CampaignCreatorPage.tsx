import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { CampaignCreator } from '../components/CampaignCreator';
import { campaignService } from '@/lib/services/campaignService';
import { useNavigate } from 'react-router-dom';

export default function CampaignCreatorPage() {
  const navigate = useNavigate();

  const handleSave = async (campaign: any) => {
    try {
      await campaignService.createCampaign(campaign);
      navigate('/campaigns');
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  return (
    <PageLayout
      title="Créer une campagne"
      description="Laissez l'IA générer une campagne optimisée pour vos objectifs"
    >
      <div className="max-w-3xl mx-auto">
        <CampaignCreator onSave={handleSave} />
      </div>
    </PageLayout>
  );
}