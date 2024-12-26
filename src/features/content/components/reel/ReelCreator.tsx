```tsx
import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { useReelGenerator } from '@/features/content/hooks/useReelGenerator';
import { ReelPreview } from './ReelPreview';
import { ReelOptimizer } from './ReelOptimizer';
import { ReelExporter } from './ReelExporter';
import { ReelForm } from './ReelForm';
import type { GeneratedReel } from '@/lib/ai/content/types';

export function ReelCreator() {
  const { generateReel, generating } = useReelGenerator();
  const [reel, setReel] = useState<GeneratedReel | null>(null);

  const handleGenerate = async (params: any) => {
    const generated = await generateReel(params);
    setReel(generated);
  };

  const handleOptimize = async (optimizations: any) => {
    if (!reel) return;
    // Appliquer les optimisations au réel
    setReel({
      ...reel,
      // Appliquer les optimisations
    });
  };

  const handleExport = async (platform: string, format: string) => {
    if (!reel) return;
    // Exporter le réel
    console.log('Exporting reel to', platform, 'in format', format);
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Créer un nouveau réel
        </h2>
        <ReelForm onSubmit={handleGenerate} isGenerating={generating} />
      </Card>

      {reel && (
        <>
          <ReelPreview reel={reel} onPlay={() => {}} />
          <ReelOptimizer reel={reel} onOptimize={handleOptimize} />
          <ReelExporter reel={reel} onExport={handleExport} />
        </>
      )}
    </div>
  );
}
```