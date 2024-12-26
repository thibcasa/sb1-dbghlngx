```tsx
import React from 'react';
import { FileText, Video, Image } from 'lucide-react';

const formats = [
  { id: 'post', name: 'Post', icon: FileText },
  { id: 'reel', name: 'Reel', icon: Video },
  { id: 'story', name: 'Story', icon: Image }
];

export function FormatSelector() {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Format
      </label>
      <div className="grid grid-cols-3 gap-4">
        {formats.map(format => {
          const Icon = format.icon;
          return (
            <label
              key={format.id}
              className="relative flex flex-col items-center gap-2 p-4 rounded-lg border cursor-pointer hover:border-blue-500 peer-checked:border-blue-500"
            >
              <input
                type="radio"
                name="format"
                value={format.id}
                className="sr-only peer"
              />
              <Icon className="w-6 h-6 text-gray-500 peer-checked:text-blue-500" />
              <span className="text-sm font-medium">{format.name}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
```