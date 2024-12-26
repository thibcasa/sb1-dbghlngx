import React from 'react';
import { Activity } from 'lucide-react';
import { FormSection } from '@/components/common/FormSection';
import { TagInput } from '@/components/common/TagInput';
import type { Persona } from '../../types';

interface BehaviorSectionProps {
  data?: Persona['behavior'];
  onChange: (data: Persona['behavior']) => void;
}

export function BehaviorSection({ data, onChange }: BehaviorSectionProps) {
  return (
    <FormSection
      title="Comportement"
      description="Habitudes et préférences de votre persona"
      icon={Activity}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Réseaux sociaux utilisés
          </label>
          <TagInput
            tags={data?.socialNetworks || []}
            onAdd={tag => onChange({ ...data!, socialNetworks: [...data!.socialNetworks, tag] })}
            onRemove={index => onChange({
              ...data!,
              socialNetworks: data!.socialNetworks.filter((_, i) => i !== index)
            })}
            placeholder="Ex: Facebook"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Types de contenu préférés
          </label>
          <TagInput
            tags={data?.preferredContent || []}
            onAdd={tag => onChange({ ...data!, preferredContent: [...data!.preferredContent, tag] })}
            onRemove={index => onChange({
              ...data!,
              preferredContent: data!.preferredContent.filter((_, i) => i !== index)
            })}
            placeholder="Ex: Vidéos courtes"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Facteurs de décision
          </label>
          <TagInput
            tags={data?.decisionFactors || []}
            onAdd={tag => onChange({ ...data!, decisionFactors: [...data!.decisionFactors, tag] })}
            onRemove={index => onChange({
              ...data!,
              decisionFactors: data!.decisionFactors.filter((_, i) => i !== index)
            })}
            placeholder="Ex: Prix du marché"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Méthodes de recherche
          </label>
          <TagInput
            tags={data?.researchMethods || []}
            onAdd={tag => onChange({ ...data!, researchMethods: [...data!.researchMethods, tag] })}
            onRemove={index => onChange({
              ...data!,
              researchMethods: data!.researchMethods.filter((_, i) => i !== index)
            })}
            placeholder="Ex: Sites immobiliers"
          />
        </div>
      </div>
    </FormSection>
  );
}