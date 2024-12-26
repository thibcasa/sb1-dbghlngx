import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { PipelineStage, ContactInPipeline } from '../types';

export function usePipeline() {
  const [stages, setStages] = useState<PipelineStage[]>([]);
  const [contacts, setContacts] = useState<ContactInPipeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadPipeline();
  }, []);

  const loadPipeline = async () => {
    try {
      setLoading(true);
      
      // Charger les étapes
      const { data: stagesData, error: stagesError } = await supabase
        .from('pipeline_stages')
        .select('*')
        .order('order_index');
      
      if (stagesError) throw stagesError;

      // Charger les contacts dans le pipeline
      const { data: contactsData, error: contactsError } = await supabase
        .from('contacts_in_pipeline')
        .select(\`
          contact_id,
          stage_id,
          position,
          contacts (
            id,
            name,
            email,
            status
          )
        \`);

      if (contactsError) throw contactsError;

      setStages(stagesData);
      setContacts(contactsData.map((c: any) => ({
        id: c.contact_id,
        stageId: c.stage_id,
        position: c.position,
        ...c.contacts
      })));

    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load pipeline'));
    } finally {
      setLoading(false);
    }
  };

  const moveContact = async (
    contactId: string,
    fromStageId: string,
    toStageId: string
  ) => {
    try {
      // Créer l'événement de pipeline
      await supabase.from('pipeline_events').insert({
        contact_id: contactId,
        from_stage_id: fromStageId,
        to_stage_id: toStageId
      });

      // Mettre à jour la position du contact
      await supabase
        .from('contacts_in_pipeline')
        .update({ stage_id: toStageId })
        .eq('contact_id', contactId);

      // Recharger les données
      await loadPipeline();

    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to move contact'));
    }
  };

  const updateStage = async (stage: PipelineStage) => {
    try {
      await supabase
        .from('pipeline_stages')
        .update(stage)
        .eq('id', stage.id);

      await loadPipeline();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update stage'));
    }
  };

  return {
    stages,
    contacts,
    loading,
    error,
    moveContact,
    updateStage,
    refresh: loadPipeline
  };
}