import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PipelineBoard } from '../components/PipelineBoard';
import { usePipeline } from '../hooks/usePipeline';

export default function PipelinePage() {
  const { stages, contacts, loading, error, moveContact } = usePipeline();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <PageLayout
      title="Pipeline"
      description="Gérez votre pipeline de vente"
    >
      <PipelineBoard
        stages={stages}
        contacts={contacts}
        onContactMove={moveContact}
        onStageSettingsClick={(stage) => console.log('Stage settings:', stage)}
      />
    </PageLayout>
  );
}