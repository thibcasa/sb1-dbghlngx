import { useState, useEffect } from 'react';
import { workflowService } from '../services/workflowService';
import type { WorkflowExecution } from '../types';

export function useWorkflowMonitor(workflowId: string) {
  const [executions, setExecutions] = useState<WorkflowExecution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadExecutions = async () => {
      try {
        setLoading(true);
        const data = await workflowService.getWorkflowExecutions(workflowId);
        setExecutions(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load executions'));
      } finally {
        setLoading(false);
      }
    };

    loadExecutions();
    
    // Rafraîchir toutes les 30 secondes
    const interval = setInterval(loadExecutions, 30000);
    return () => clearInterval(interval);
  }, [workflowId]);

  return { executions, loading, error };
}