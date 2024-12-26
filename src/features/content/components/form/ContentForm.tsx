```tsx
import React from 'react';
import { Target, Users, Clock, Layout } from 'lucide-react';
import { PlatformSelector } from './PlatformSelector';
import { ObjectiveInput } from './ObjectiveInput';
import { AudienceSelector } from './AudienceSelector';
import { FormatSelector } from './FormatSelector';

interface ContentFormProps {
  onSubmit: (params: any) => Promise<void>;
  isGenerating: boolean;
}

export function ContentForm({ onSubmit, isGenerating }: ContentFormProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    await onSubmit({
      platforms: formData.getAll('platforms'),
      objective: formData.get('objective'),
      format: formData.get('format'),
      audience: {
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
      <PlatformSelector />
      <ObjectiveInput />
      <FormatSelector />
      <AudienceSelector />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isGenerating}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isGenerating ? 'Génération...' : 'Générer le contenu'}
        </button>
      </div>
    </form>
  );
}
```