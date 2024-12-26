import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Sparkles } from 'lucide-react';
import { ContentForm } from './form/ContentForm';
import { ContentPreview } from './preview/ContentPreview';
import { SeoPreview } from './preview/SeoPreview';
import { HistoryList } from './history/HistoryList';
import { useAIContentGeneration } from '../hooks/useAIContentGeneration';
import { useContentValidation } from '../hooks/useContentValidation';
import { useContentHistory } from '../hooks/useContentHistory';
import type { GenerationParams, GeneratedContent } from '../types';

export function AIContentGenerator() {
  const { generateContent, isGenerating } = useAIContentGeneration();
  const { errors, validateContent } = useContentValidation();
  const { history, addToHistory, clearHistory } = useContentHistory();
  const [preview, setPreview] = useState<GeneratedContent | null>(null);
  
  const handleSubmit = async (params: GenerationParams) => {
    if (!validateContent(params)) return;
    
    const content = await generateContent(params);
    setPreview(content);
    addToHistory(content);
  };

  const handleHistorySelect = (content: GeneratedContent) => {
    setPreview(content);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-medium text-gray-900">
              Générateur de Contenu IA
            </h3>
          </div>

          <ContentForm 
            onSubmit={handleSubmit} 
            isGenerating={isGenerating}
            errors={errors}
          />
        </Card>

        {preview && (
          <>
            <ContentPreview content={preview} />
            <SeoPreview seo={preview.seo} />
          </>
        )}
      </div>

      <div>
        <HistoryList
          history={history}
          onSelect={handleHistorySelect}
          onClear={clearHistory}
        />
      </div>
    </div>
  );
}