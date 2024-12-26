import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PersonaForm } from '../components/PersonaForm';
import { usePersonas } from '../hooks/usePersonas';
import type { PersonaFormData } from '../types';

export default function PersonaCreatorPage() {
  const { createPersona } = usePersonas();

  const handleSubmit = async (data: PersonaFormData) => {
    try {
      await createPersona(data);
      // Redirection ou notification de succès
    } catch (error) {
      console.error('Error creating persona:', error);
    }
  };

  return (
    <PageLayout
      title="Créer un Persona"
      description="Définissez votre persona cible pour optimiser vos campagnes marketing"
    >
      <div className="max-w-7xl mx-auto">
        <PersonaForm onSubmit={handleSubmit} />
      </div>
    </PageLayout>
  );
}