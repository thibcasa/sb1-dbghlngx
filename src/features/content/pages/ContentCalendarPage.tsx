import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { ContentCalendar } from '../components/ContentCalendar';
import { Button } from '@/components/common/Button';
import { Plus } from 'lucide-react';
import { useContent } from '../hooks/useContent';

export default function ContentCalendarPage() {
  const { contents, loading, error, saveContent } = useContent();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;

  return (
    <PageLayout
      title="Calendrier de contenu"
      description="Planifiez et gérez votre contenu"
      actions={
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nouveau contenu
        </Button>
      }
    >
      <ContentCalendar
        contents={contents}
        onSelect={(content) => console.log('Selected:', content)}
      />
    </PageLayout>
  );
}