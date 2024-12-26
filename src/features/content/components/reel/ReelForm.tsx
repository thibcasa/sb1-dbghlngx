```tsx
import React from 'react';
import { Video, Target, Users, Clock } from 'lucide-react';

interface ReelFormProps {
  onSubmit: (params: any) => Promise<void>;
  isGenerating: boolean;
}

export function ReelForm({ onSubmit, isGenerating }: ReelFormProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    await onSubmit({
      objective: formData.get('objective'),
      duration: parseInt(formData.get('duration') as string),
      persona: {
        demographics: {
          ageRange: {
            min: parseInt(formData.get('ageMin') as string),
            max: parseInt(formData.get('ageMax') as string)
          },
          location: formData.get('location')
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Objectif
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Target className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="objective"
              required
              className="pl-10 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex: Présenter une estimation immobilière"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Durée (secondes)
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              name="duration"
              min="15"
              max="60"
              defaultValue="30"
              required
              className="pl-10 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Audience cible
          </label>
          <div className="mt-1 grid grid-cols-3 gap-4">
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
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isGenerating}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isGenerating ? 'Génération...' : 'Générer le réel'}
        </button>
      </div>
    </form>
  );
}
```