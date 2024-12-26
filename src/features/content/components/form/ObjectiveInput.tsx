```tsx
import React from 'react';
import { Target } from 'lucide-react';

export function ObjectiveInput() {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Objectif
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <Target className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          name="objective"
          required
          className="pl-10 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ex: Générer des leads qualifiés"
        />
      </div>
    </div>
  );
}
```