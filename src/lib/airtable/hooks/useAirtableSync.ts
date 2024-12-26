import { useState, useEffect } from 'react';
import { airtableService } from '../services/airtableService';
import { supabase } from '@/lib/supabase/client';

export function useAirtableSync(tableName: string) {
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const syncData = async () => {
    try {
      setSyncing(true);
      
      // Récupérer les données d'Airtable
      const airtableRecords = await airtableService.findRecords(tableName);
      
      // Convertir les données au format Supabase
      const supabaseData = airtableRecords.map(record => ({
        id: record.id,
        ...record.fields,
        airtable_id: record.id,
        synced_at: new Date().toISOString()
      }));

      // Synchroniser avec Supabase
      const { error } = await supabase
        .from(tableName)
        .upsert(supabaseData, { onConflict: 'airtable_id' });

      if (error) throw error;
      
      setLastSync(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to sync data'));
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    // Synchronisation automatique toutes les heures
    const interval = setInterval(syncData, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [tableName]);

  return {
    syncData,
    syncing,
    lastSync,
    error
  };
}