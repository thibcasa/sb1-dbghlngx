```tsx
import React from 'react';
import { Instagram, Facebook, TikTok } from 'lucide-react';

const platforms = [
  { id: 'instagram', name: 'Instagram', icon: Instagram },
  { id: 'facebook', name: 'Facebook', icon: Facebook },
  { id: 'tiktok', name: 'TikTok', icon: TikTok }
];

export function PlatformSelector() {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Plateformes
      </label>
      <div className="grid grid-cols-3 gap-4">
        {platforms.map(platform => {
          const Icon = platform.icon;
          return (
            <label
              key={platform.id}
              className="relative flex flex-col items-center gap-2 p-4 rounded-lg border cursor-pointer hover:border-blue-500 peer-checked:border-blue-500"
            >
              <input
                type="checkbox"
                name="platforms"
                value={platform.id}
                className="sr-only peer"
              />
              <Icon className="w-6 h-6 text-gray-500 peer-checked:text-blue-500" />
              <span className="text-sm font-medium">{platform.name}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
```