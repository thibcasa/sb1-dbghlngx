import React from 'react';
import { Target, Users } from 'lucide-react';
import { ContentTypeSelect } from './form/ContentTypeSelect';
import { ObjectiveInput } from './form/ObjectiveInput';
import { LocationInput } from './form/LocationInput';
import { ToneSelect } from './form/ToneSelect';
import type { GenerationParams } from '../types';

interface ContentFormProps {
  onSubmit: (params: GenerationParams) => Promise<void>;
  isGenerating: boolean;
}

export function ContentForm({ onSubmit, isGenerating }: ContentFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      type: formData.get('type') as GenerationParams['type'],
      objective: formData.get('objective') as string,
      audience: {
        demographics: {
          ageRange: { min: 35, max: 55 },
          location: formData.get('location') as string
        },
        interests: ['immobilier', 'investissement']
      },
      tone: formData.get('tone') as string
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContentTypeSelect />
        <ObjectiveInput />
        <LocationInput />
        <ToneSelect />
      </div>

      <button
        type="submit"
        disabled={isGenerating}
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isGenerating ? 'Génération...' : 'Générer le contenu'}
      </button>
    </form>
  );
}