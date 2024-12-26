import React from 'react';
import { MessageCircle } from 'lucide-react';

const tones = [
  { value: 'professional', label: 'Professionnel' },
  { value: 'friendly', label: 'Amical' },
  { value: 'formal', label: 'Formel' },
  { value: 'casual', label: 'Décontracté' }
];

export function ToneSelect() {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Ton
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MessageCircle className="h-5 w-5 text-gray-400" />
        </div>
        <select
          name="tone"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          {tones.map(tone => (
            <option key={tone.value} value={tone.value}>
              {tone.label}
            </option>
          ))}
        </select>
      </div>
      <p className="mt-1 text-xs text-gray-500">
        Style de communication à adopter
      </p>
    </div>
  );
}