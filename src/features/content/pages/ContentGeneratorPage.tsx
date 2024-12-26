import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { AIContentGenerator } from '../components/AIContentGenerator';
import { Button } from '@/components/common/Button';
import { History, Settings } from 'lucide-react';

export default function ContentGeneratorPage() {
  return (
    <PageLayout
      title="Générateur de Contenu IA"
      description="Créez du contenu optimisé et personnalisé avec notre assistant IA"
      actions={
        <div className="flex gap-2">
          <Button variant="outline">
            <History className="w-4 h-4 mr-2" />
            Historique
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Paramètres
          </Button>
        </div>
      }
    >
      <div className="max-w-4xl mx-auto">
        <AIContentGenerator />
      </div>
    </PageLayout>
  );
}