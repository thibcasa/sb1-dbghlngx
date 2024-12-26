import React from 'react';
import { FileText, Mail, Target } from 'lucide-react';
import type { ContentType } from '../../types';

const contentTypes: Array<{
  value: ContentType;
  label: string;
  icon: React.ReactNode;
  description: string;
}> = [
  {
    value: 'post',
    label: 'Post Social',
    icon: <FileText className="w-5 h-5" />,
    description: 'Publication pour les réseaux sociaux'
  },
  {
    value: 'email',
    label: 'Email',
    icon: <Mail className="w-5 h-5" />,
    description: 'Email marketing personnalisé'
  },
  {
    value: 'ad',
    label: 'Publicité',
    icon: <Target className="w-5 h-5" />,
    description: 'Annonce publicitaire ciblée'
  }
];

export function ContentTypeSelect() {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Type de contenu
      </label>
      <div className="grid grid-cols-3 gap-3">
        {contentTypes.map(type => (
          <label
            key={type.value}
            className="relative flex flex-col bg-white p-4 border rounded-lg cursor-pointer hover:border-blue-500 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
          >
            <input
              type="radio"
              name="type"
              value={type.value}
              className="sr-only peer"
            />
            <div className="flex items-center gap-2">
              <div className="text-blue-600">{type.icon}</div>
              <span className="text-sm font-medium">{type.label}</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">{type.description}</p>
          </label>
        ))}
      </div>
    </div>
  );
}