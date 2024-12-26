```tsx
import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { ContentOrchestrator } from '../components/ContentOrchestrator';

export default function ContentOrchestratorPage() {
  return (
    <PageLayout
      title="Générateur de Contenu"
      description="Créez et planifiez du contenu optimisé pour chaque plateforme"
    >
      <div className="max-w-4xl mx-auto">
        <ContentOrchestrator />
      </div>
    </PageLayout>
  );
}
```