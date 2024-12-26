import React from 'react';
import { MapPin } from 'lucide-react';

export function LocationInput() {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Zone géographique
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPin className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          name="location"
          required
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ex: Nice et alentours"
        />
      </div>
      <p className="mt-1 text-xs text-gray-500">
        Zone de ciblage pour votre contenu
      </p>
    </div>
  );
}