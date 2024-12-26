```tsx
import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface Platform {
  id: string;
  name: string;
  icon: LucideIcon;
}

interface PlatformListProps {
  platforms: Platform[];
  selectedPlatforms: string[];
  onSelect: (platforms: string[]) => void;
}

export function PlatformList({ 
  platforms, 
  selectedPlatforms, 
  onSelect 
}: PlatformListProps) {
  const togglePlatform = (platformId: string) => {
    if (selectedPlatforms.includes(platformId)) {
      onSelect(selectedPlatforms.filter(id => id !== platformId));
    } else {
      onSelect([...selectedPlatforms, platformId]);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {platforms.map(platform => {
        const Icon = platform.icon;
        const isSelected = selectedPlatforms.includes(platform.id);

        return (
          <button
            key={platform.id}
            type="button"
            onClick={() => togglePlatform(platform.id)}
            className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-colors ${
              isSelected 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-200'
            }`}
          >
            <Icon className={`w-6 h-6 ${
              isSelected ? 'text-blue-500' : 'text-gray-500'
            }`} />
            <span className={`text-sm font-medium ${
              isSelected ? 'text-blue-700' : 'text-gray-700'
            }`}>
              {platform.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
```