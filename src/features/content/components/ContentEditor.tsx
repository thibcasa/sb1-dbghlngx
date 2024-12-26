```typescript
import React from 'react';
import { Card } from '@/components/common/Card';
import { Calendar, Hash, Users } from 'lucide-react';
import type { Content, ContentType } from '../types';

interface ContentEditorProps {
  content: Content;
  onSave: (content: Content) => Promise<void>;
}

export function ContentEditor({ content, onSave }: ContentEditorProps) {
  const [localContent, setLocalContent] = React.useState(content);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(localContent);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Titre
          </label>
          <input
            type="text"
            value={localContent.title}
            onChange={e => setLocalContent(prev => ({ 
              ...prev, 
              title: e.target.value 
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contenu
          </label>
          <textarea
            value={localContent.body}
            onChange={e => setLocalContent(prev => ({ 
              ...prev, 
              body: e.target.value 
            }))}
            rows={6}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Publication
            </label>
            <div className="mt-1 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <input
                type="datetime-local"
                value={localContent.scheduledFor?.toISOString().slice(0, 16)}
                onChange={e => setLocalContent(prev => ({
                  ...prev,
                  scheduledFor: e.target.value ? new Date(e.target.value) : undefined
                }))}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mots-clés
            </label>
            <div className="mt-1 flex items-center gap-2">
              <Hash className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Ajouter des mots-clés..."
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const value = e.currentTarget.value.trim();
                    if (value) {
                      setLocalContent(prev => ({
                        ...prev,
                        metadata: {
                          ...prev.metadata,
                          keywords: [...prev.metadata.keywords, value]
                        }
                      }));
                      e.currentTarget.value = '';
                    }
                  }
                }}
              />
            </div>
            {localContent.metadata.keywords.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {localContent.metadata.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Audience cible
            </label>
            <div className="mt-1 flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-400" />
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={localContent.metadata.targetAudience?.location || ''}
                onChange={e => setLocalContent(prev => ({
                  ...prev,
                  metadata: {
                    ...prev.metadata,
                    targetAudience: {
                      ...prev.metadata.targetAudience,
                      location: e.target.value
                    }
                  }
                }))}
              >
                <option value="">Sélectionner une zone</option>
                <option value="local">Local</option>
                <option value="regional">Régional</option>
                <option value="national">National</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Aperçu
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {localContent.status === 'draft' ? 'Enregistrer' : 'Publier'}
          </button>
        </div>
      </form>
    </Card>
  );
}
```