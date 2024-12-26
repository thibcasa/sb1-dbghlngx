```typescript
import React from 'react';
import { Card } from '@/components/common/Card';
import { Target, Users, MessageSquare, Sparkles } from 'lucide-react';
import { useContentGeneration } from '../hooks/useContentGeneration';
import type { ContentType } from '../types';

interface ContentGenerationFormProps {
  onGenerated: (content: any) => void;
}

export function ContentGenerationForm({ onGenerated }: ContentGenerationFormProps) {
  const { generateContent, generating } = useContentGeneration();
  const [formData, setFormData] = React.useState({
    type: 'post' as ContentType,
    objective: '',
    audience: {
      demographics: {
        ageRange: { min: 25, max: 55 },
        location: ''
      },
      interests: [],
      behavior: {}
    },
    tone: 'professional',
    length: 'medium' as 'short' | 'medium' | 'long'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (generating) return;

    try {
      const generated = await generateContent(formData);
      onGenerated(generated);
    } catch (error) {
      console.error('Failed to generate content:', error);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-medium text-gray-900">
            Génération de contenu IA
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type de contenu
            </label>
            <select
              value={formData.type}
              onChange={e => setFormData(prev => ({ 
                ...prev, 
                type: e.target.value as ContentType 
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="post">Post social</option>
              <option value="story">Story</option>
              <option value="email">Email</option>
              <option value="ad">Publicité</option>
            </select>
          </div>

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
                value={formData.objective}
                onChange={e => setFormData(prev => ({ 
                  ...prev, 
                  objective: e.target.value 
                }))}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Ex: Générer des leads qualifiés"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Audience cible
            </label>
            <div className="mt-1 space-y-2">
              <div className="flex gap-2">
                <input
                  type="number"
                  value={formData.audience.demographics.ageRange.min}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    audience: {
                      ...prev.audience,
                      demographics: {
                        ...prev.audience.demographics,
                        ageRange: {
                          ...prev.audience.demographics.ageRange,
                          min: parseInt(e.target.value)
                        }
                      }
                    }
                  }))}
                  className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Min"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  value={formData.audience.demographics.ageRange.max}
                  onChange={e => setFormData(prev => ({
                    ...prev,
                    audience: {
                      ...prev.audience,
                      demographics: {
                        ...prev.audience.demographics,
                        ageRange: {
                          ...prev.audience.demographics.ageRange,
                          max: parseInt(e.target.value)
                        }
                      }
                    }
                  }))}
                  className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Max"
                />
                <span className="text-sm text-gray-500">ans</span>
              </div>

              <input
                type="text"
                value={formData.audience.demographics.location}
                onChange={e => setFormData(prev => ({
                  ...prev,
                  audience: {
                    ...prev.audience,
                    demographics: {
                      ...prev.audience.demographics,
                      location: e.target.value
                    }
                  }
                }))}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Localisation"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ton
            </label>
            <select
              value={formData.tone}
              onChange={e => setFormData(prev => ({ 
                ...prev, 
                tone: e.target.value 
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="professional">Professionnel</option>
              <option value="casual">Décontracté</option>
              <option value="formal">Formel</option>
              <option value="friendly">Amical</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={generating}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {generating ? 'Génération...' : 'Générer le contenu'}
          </button>
        </div>
      </form>
    </Card>
  );
}
```