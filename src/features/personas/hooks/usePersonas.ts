import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { Persona, PersonaFormData } from '../types';

export function usePersonas() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createPersona = async (data: PersonaFormData): Promise<Persona> => {
    setLoading(true);
    try {
      const { data: persona, error } = await supabase
        .from('personas')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return persona;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create persona'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createPersona,
    loading,
    error
  };
}