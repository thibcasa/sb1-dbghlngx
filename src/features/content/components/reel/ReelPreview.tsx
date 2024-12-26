import React from 'react';
import { Card } from '@/components/common/Card';
import { Play, Volume2, VolumeX } from 'lucide-react';
import type { GeneratedReel } from '@/lib/ai/content/types';

interface ReelPreviewProps {
  reel: GeneratedReel;
  onPlay: () => void;
}

export function ReelPreview({ reel, onPlay }: ReelPreviewProps) {
  const [muted, setMuted] = React.useState(true);

  return (
    <Card>
      <div className="space-y-4">
        <div className="relative aspect-[9/16] bg-gray-900 rounded-lg overflow-hidden">
          {/* Prévisualisation des scènes */}
          <div className="absolute inset-0">
            {reel.storyboard.scenes.map((scene, index) => (
              <div key={index} className="absolute inset-0 flex items-center justify-center">
                {scene.content.text && (
                  <p className="text-white text-xl font-bold text-center px-6">
                    {scene.content.text}
                  </p>
                )}
                {scene.content.steps && (
                  <div className="space-y-4">
                    {scene.content.steps.map((step, i) => (
                      <p key={i} className="text-white text-lg">{step}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bouton de lecture */}
          <button
            onClick={onPlay}
            className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/60 transition-colors"
          >
            <Play className="w-16 h-16 text-white" />
          </button>

          {/* Contrôle du son */}
          <button
            onClick={() => setMuted(!muted)}
            className="absolute bottom-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/60"
          >
            {muted ? (
              <VolumeX className="w-6 h-6 text-white" />
            ) : (
              <Volume2 className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Informations du réel */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Durée</span>
            <span className="font-medium">{reel.metadata.duration}s</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Format</span>
            <span className="font-medium">{reel.metadata.resolution}</span>
          </div>
        </div>

        {/* Timeline des scènes */}
        <div className="flex gap-1">
          {reel.storyboard.scenes.map((scene, index) => (
            <div
              key={index}
              className="flex-1 h-1 bg-blue-200 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-blue-600"
                style={{
                  width: `${(scene.duration / reel.metadata.duration) * 100}%`
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}