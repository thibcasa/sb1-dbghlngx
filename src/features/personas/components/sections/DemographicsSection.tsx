import React from 'react';
import { Users } from 'lucide-react';
import { FormSection } from '@/components/common/FormSection';
import type { Persona } from '../../types';

interface DemographicsSectionProps {
  data?: Persona['demographics'];
  onChange: (data: Persona['demographics']) => void;
}

export function DemographicsSection({ data, onChange }: DemographicsSectionProps) {
  return (
    <FormSection
      title="Démographie"
      description="Caractéristiques démographiques de votre persona cible"
      icon={Users}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tranche d'âge
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={data?.ageRange.min || ''}
              onChange={e => onChange({
                ...data!,
                ageRange: { ...data!.ageRange, min: parseInt(e.target.value) }
              })}
              className="w-24 px-3 py-2 border rounded-md"
              placeholder="Min"
            />
            <span>-</span>
            <input
              type="number"
              value={data?.ageRange.max || ''}
              onChange={e => onChange({
                ...data!,
                ageRange: { ...data!.ageRange, max: parseInt(e.target.value) }
              })}
              className="w-24 px-3 py-2 border rounded-md"
              placeholder="Max"
            />
            <span className="text-sm text-gray-500">ans</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Zone géographique
          </label>
          <input
            type="text"
            value={data?.location || ''}
            onChange={e => onChange({ ...data!, location: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Ex: Nice et alentours"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Revenus annuels (k€)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={data?.income.min || ''}
              onChange={e => onChange({
                ...data!,
                income: { ...data!.income, min: parseInt(e.target.value) }
              })}
              className="w-24 px-3 py-2 border rounded-md"
              placeholder="Min"
            />
            <span>-</span>
            <input
              type="number"
              value={data?.income.max || ''}
              onChange={e => onChange({
                ...data!,
                income: { ...data!.income, max: parseInt(e.target.value) }
              })}
              className="w-24 px-3 py-2 border rounded-md"
              placeholder="Max"
            />
            <span className="text-sm text-gray-500">k€</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Professions
          </label>
          <input
            type="text"
            placeholder="Ajouter une profession"
            className="w-full px-3 py-2 border rounded-md"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const value = e.currentTarget.value.trim();
                if (value) {
                  onChange({
                    ...data!,
                    occupation: [...data!.occupation, value]
                  });
                  e.currentTarget.value = '';
                }
              }
            }}
          />
          {data?.occupation.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {data.occupation.map((job, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {job}
                  <button
                    type="button"
                    onClick={() => onChange({
                      ...data,
                      occupation: data.occupation.filter((_, i) => i !== index)
                    })}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </FormSection>
  );
}