```tsx
import React from 'react';
import { Card } from '@/components/common/Card';
import { ContentForm } from './form/ContentForm';
import { ContentPreview } from './preview/ContentPreview';
import { ContentOptimizer } from './optimizer/ContentOptimizer';
import { ContentScheduler } from './scheduler/ContentScheduler';
import { useContentGenerator } from '../hooks/useContentGenerator';
import type { GeneratedContent } from '@/lib/ai/content/types';

export function ContentOrchestrator() {
  const { generateContent, generating } = useContentGenerator();
  const [content, setContent] = React.useState<GeneratedContent | null>(null);

  const handleGenerate = async (params: any) => {
    const generated = await generateContent(params);
    setContent(generated);
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Créer du contenu automatisé
        </h2>
        <ContentForm onSubmit={handleGenerate} isGenerating={generating} />
      </Card>

      {content && (
        <>
          <ContentPreview content={content} />
          <ContentOptimizer content={content} onOptimize={setContent} />
          <ContentScheduler content={content} />
        </>
      )}
    </div>
  );
}
```