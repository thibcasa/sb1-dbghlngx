import { useState, useEffect } from 'react';
import { airtableService } from '../services/airtableService';
import type { AirtableRecord } from '../types';

export function useAirtableRecords(tableName: string, filterFormula?: string) {
  const [records, setRecords] = useState<AirtableRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        const data = await airtableService.findRecords(tableName, filterFormula);
        setRecords(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch records'));
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [tableName, filterFormula]);

  return { records, loading, error };
}