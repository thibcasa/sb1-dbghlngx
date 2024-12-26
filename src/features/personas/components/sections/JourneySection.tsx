import React from 'react';
import { Route } from 'lucide-react';
import { FormSection } from '@/components/common/FormSection';
import { TagInput } from '@/components/common/TagInput';
import type { Persona } from '../../types';

interface JourneySectionProps {
  data?: Persona['journey'];
  onChange: (data: Persona['journey']) => void;
}

export function JourneySection({ data, onChange }: JourneySectionProps) {
  return (
    <FormSection
      title="Parcours client"
      description="Points de contact et déclencheurs d'action"
      icon={Route}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Points de contact
          </label>
          <TagInput
            tags={data?.touchpoints || []}
            onAdd={tag => onChange({ ...data!, touchpoints: [...data!.touchpoints, tag] })}
            onRemove={index => onChange({
              ...data!,
              touchpoints: data!.touchpoints.filter((_, i) => i !== index)
            })}
            placeholder="Ex: Réseaux sociaux"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Objections courantes
          </label>
          <TagInput
            tags={data?.objections || []}
            onAdd={tag => onChange({ ...data!, objections: [...data!.objections, tag] })}
            onRemove={index => onChange({
              ...data!,
              objections: data!.objections.filter((_, i) => i !== index)
            })}
            placeholder="Ex: Prix trop élevé"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Déclencheurs d'action
          </label>
          <TagInput
            tags={data?.triggers || []}
            onAdd={tag => onChange({ ...data!, triggers: [...data!.triggers, tag] })}
            onRemove={index => onChange({
              ...data!,
              triggers: data!.triggers.filter((_, i) => i !== index)
            })}
            placeholder="Ex: Besoin urgent de vendre"
          />
        </div>
      </div>
    </FormSection>
  );
}