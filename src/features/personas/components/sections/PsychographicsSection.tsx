import React from 'react';
import { Brain } from 'lucide-react';
import { FormSection } from '@/components/common/FormSection';
import { TagInput } from '@/components/common/TagInput';
import type { Persona } from '../../types';

interface PsychographicsSectionProps {
  data?: Persona['psychographics'];
  onChange: (data: Persona['psychographics']) => void;
}

export function PsychographicsSection({ data, onChange }: PsychographicsSectionProps) {
  return (
    <FormSection
      title="Psychographie"
      description="Comprendre les motivations et freins de votre persona"
      icon={Brain}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Objectifs principaux
          </label>
          <TagInput
            tags={data?.goals || []}
            onAdd={tag => onChange({ ...data!, goals: [...data!.goals, tag] })}
            onRemove={index => onChange({
              ...data!,
              goals: data!.goals.filter((_, i) => i !== index)
            })}
            placeholder="Ex: Vendre rapidement"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Freins et objections
          </label>
          <TagInput
            tags={data?.painPoints || []}
            onAdd={tag => onChange({ ...data!, painPoints: [...data!.painPoints, tag] })}
            onRemove={index => onChange({
              ...data!,
              painPoints: data!.painPoints.filter((_, i) => i !== index)
            })}
            placeholder="Ex: Peur de sous-évaluer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Motivations
          </label>
          <TagInput
            tags={data?.motivations || []}
            onAdd={tag => onChange({ ...data!, motivations: [...data!.motivations, tag] })}
            onRemove={index => onChange({
              ...data!,
              motivations: data!.motivations.filter((_, i) => i !== index)
            })}
            placeholder="Ex: Meilleur prix de vente"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Centres d'intérêt
          </label>
          <TagInput
            tags={data?.interests || []}
            onAdd={tag => onChange({ ...data!, interests: [...data!.interests, tag] })}
            onRemove={index => onChange({
              ...data!,
              interests: data!.interests.filter((_, i) => i !== index)
            })}
            placeholder="Ex: Investissement immobilier"
          />
        </div>
      </div>
    </FormSection>
  );
}