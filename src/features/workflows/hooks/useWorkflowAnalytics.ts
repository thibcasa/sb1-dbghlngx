import { useState, useEffect } from 'react';
import { workflowService } from '../services/workflowService';
import type { WorkflowExecution, WorkflowLog } from '../types';

export function useWorkflowAnalytics(workflowId: string) {
  const [executions, setExecutions] = useState<WorkflowExecution[]>([]);
  const [logs, setLogs] = useState<WorkflowLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setLoading(true);
        const [executionsData, logsData] = await Promise.all([
          workflowService.getWorkflowExecutions(workflowId),
          workflowService.getWorkflowLogs(workflowId)
        ]);
        
        setExecutions(executionsData);
        setLogs(logsData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load analytics'));
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
    
    // Rafraîchir toutes les minutes
    const interval = setInterval(loadAnalytics, 60000);
    return () => clearInterval(interval);
  }, [workflowId]);

  return { executions, logs, loading, error };
}