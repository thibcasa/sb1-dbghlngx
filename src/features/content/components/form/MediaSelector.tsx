import React from 'react';
import { Image, Film, Images } from 'lucide-react';
import type { MediaType } from '../../types';

const mediaTypes: Array<{
  value: MediaType;
  label: string;
  icon: React.ReactNode;
  description: string;
}> = [
  {
    value: 'image',
    label: 'Image',
    icon: <Image className="w-5 h-5" />,
    description: 'Photo unique optimisée'
  },
  {
    value: 'video',
    label: 'Vidéo',
    icon: <Film className="w-5 h-5" />,
    description: 'Vidéo courte dynamique'
  },
  {
    value: 'carousel',
    label: 'Carousel',
    icon: <Images className="w-5 h-5" />,
    description: 'Série de 3-5 images'
  }
];

export function MediaSelector() {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Type de média
      </label>
      <div className="grid grid-cols-3 gap-3">
        {mediaTypes.map(type => (
          <label
            key={type.value}
            className="relative flex flex-col bg-white p-4 border rounded-lg cursor-pointer hover:border-blue-500 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
          >
            <input
              type="radio"
              name="mediaType"
              value={type.value}
              className="sr-only peer"
            />
            <div className="flex items-center gap-2">
              <div className="text-blue-600">{type.icon}</div>
              <span className="text-sm font-medium">{type.label}</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">{type.description}</p>
          </label>
        ))}
      </div>
    </div>
  );
}