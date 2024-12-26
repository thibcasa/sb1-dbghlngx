```tsx
import React from 'react';
import { Users } from 'lucide-react';

export function AudienceSelector() {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Audience cible
      </label>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-gray-500">Âge min</label>
          <input
            type="number"
            name="ageMin"
            min="18"
            max="80"
            defaultValue="35"
            required
            className="mt-1 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500">Âge max</label>
          <input
            type="number"
            name="ageMax"
            min="18"
            max="80"
            defaultValue="55"
            required
            className="mt-1 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500">Localisation</label>
          <input
            type="text"
            name="location"
            required
            className="mt-1 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ex: Nice"
          />
        </div>
      </div>
    </div>
  );
}
```