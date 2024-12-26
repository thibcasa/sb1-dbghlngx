```typescript
import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/common/Button';
import { Plus } from 'lucide-react';
import { ContentEditor } from '../components/ContentEditor';
import { ContentCalendar } from '../components/ContentCalendar';
import { useContent } from '../hooks/useContent';
import type { Content } from '../types';

export function ContentPage() {
  const { contents, saveContent, loading } = useContent();
  const [selectedContent, setSelectedContent] = React.useState<Content | null>(null);

  const handleCreate = () => {
    setSelectedContent({
      id: '',
      type: 'post',
      title: '',
      body: '',
      status: 'draft',
      metadata: {
        keywords: []
      },
      createdAt: new Date(),
      updatedAt: new Date()
    });
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <PageLayout
      title="Contenu"
      description="Gérez votre contenu et vos publications"
      actions={
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Nouveau contenu
        </Button>
      }
    >
      <div className="space-y-6">
        {selectedContent ? (
          <ContentEditor
            content={selectedContent}
            onSave={async (content) => {
              await saveContent(content);
              setSelectedContent(null);
            }}
          />
        ) : (
          <ContentCalendar
            contents={contents}
            onSelect={setSelectedContent}
          />
        )}
      </div>
    </PageLayout>
  );
}
```