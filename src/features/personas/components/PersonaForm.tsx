import React from 'react';
import { Card } from '@/components/common/Card';
import { Users, Target, Brain, Route } from 'lucide-react';
import { DemographicsSection } from './sections/DemographicsSection';
import { PsychographicsSection } from './sections/PsychographicsSection';
import { BehaviorSection } from './sections/BehaviorSection';
import { JourneySection } from './sections/JourneySection';
import type { PersonaFormData } from '../types';

interface PersonaFormProps {
  initialData?: Partial<PersonaFormData>;
  onSubmit: (data: PersonaFormData) => Promise<void>;
}

export function PersonaForm({ initialData, onSubmit }: PersonaFormProps) {
  const [formData, setFormData] = React.useState<Partial<PersonaFormData>>(
    initialData || {
      name: '',
      demographics: {
        ageRange: { min: 25, max: 55 },
        location: '',
        income: { min: 0, max: 0 },
        occupation: []
      },
      psychographics: {
        goals: [],
        painPoints: [],
        motivations: [],
        interests: []
      },
      behavior: {
        socialNetworks: [],
        preferredContent: [],
        decisionFactors: [],
        researchMethods: []
      },
      journey: {
        touchpoints: [],
        objections: [],
        triggers: []
      }
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData as PersonaFormData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <DemographicsSection
            data={formData.demographics}
            onChange={demographics => setFormData(prev => ({ ...prev, demographics }))}
          />
        </Card>

        <Card>
          <PsychographicsSection
            data={formData.psychographics}
            onChange={psychographics => setFormData(prev => ({ ...prev, psychographics }))}
          />
        </Card>

        <Card>
          <BehaviorSection
            data={formData.behavior}
            onChange={behavior => setFormData(prev => ({ ...prev, behavior }))}
          />
        </Card>

        <Card>
          <JourneySection
            data={formData.journey}
            onChange={journey => setFormData(prev => ({ ...prev, journey }))}
          />
        </Card>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Enregistrer le persona
        </button>
      </div>
    </form>
  );
}