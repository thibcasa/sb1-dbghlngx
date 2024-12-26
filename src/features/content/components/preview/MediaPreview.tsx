import React from 'react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Image, Film, Images, Lightbulb } from 'lucide-react';
import type { GeneratedMedia } from '../../types';

interface MediaPreviewProps {
  media: GeneratedMedia[];
}

export function MediaPreview({ media }: MediaPreviewProps) {
  const getIcon = (type: GeneratedMedia['type']) => {
    switch (type) {
      case 'image': return <Image className="w-5 h-5" />;
      case 'video': return <Film className="w-5 h-5" />;
      case 'carousel': return <Images className="w-5 h-5" />;
    }
  };

  return (
    <Card>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getIcon(media[0].type)}
            <h3 className="text-lg font-medium text-gray-900">
              Créatives générées
            </h3>
          </div>
          <Badge variant="info">
            {media.length} {media.length > 1 ? 'médias' : 'média'}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {media.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={item.url}
                  alt={item.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              {item.suggestions && item.suggestions.length > 0 && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Lightbulb className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">
                      Suggestions
                    </span>
                  </div>
                  <ul className="text-xs text-blue-800 space-y-1">
                    {item.suggestions.map((suggestion, i) => (
                      <li key={i}>• {suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}