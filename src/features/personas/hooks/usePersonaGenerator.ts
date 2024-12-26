import { useState } from 'react';
import { PersonaGenerator } from '@/lib/ai/personas/generators/PersonaGenerator';
import type { Persona, PersonaConfig } from '@/lib/ai/personas/types';

export function usePersonaGenerator() {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generatePersona = async (config: PersonaConfig): Promise<Persona> => {
    setGenerating(true);
    try {
      return await PersonaGenerator.generatePersona(config);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to generate persona');
      setError(error);
      throw error;
    } finally {
      setGenerating(false);
    }
  };

  return {
    generatePersona,
    generating,
    error
  };
}