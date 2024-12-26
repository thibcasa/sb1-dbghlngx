import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/common/Button';
import { Plus } from 'lucide-react';
import { CampaignsList } from '../components/CampaignsList';

export default function CampaignsPage() {
  return (
    <PageLayout
      title="Campagnes"
      description="Gérez vos campagnes marketing"
      actions={
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle campagne
        </Button>
      }
    >
      <div className="space-y-6">
        <CampaignsList />
      </div>
    </PageLayout>
  );
}