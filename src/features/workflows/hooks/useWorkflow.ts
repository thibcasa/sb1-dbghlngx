import { useState, useEffect } from 'react';
import { workflowService } from '../services/workflowService';
import type { Workflow } from '../types';

export function useWorkflow(workflowId?: string) {
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!workflowId) {
      setLoading(false);
      return;
    }

    const loadWorkflow = async () => {
      try {
        setLoading(true);
        const data = await workflowService.getWorkflows();
        const found = data.find(w => w.id === workflowId);
        setWorkflow(found || null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load workflow'));
      } finally {
        setLoading(false);
      }
    };

    loadWorkflow();
  }, [workflowId]);

  const saveWorkflow = async (data: Partial<Workflow>) => {
    try {
      if (workflow?.id) {
        const updated = await workflowService.updateWorkflow(workflow.id, data);
        setWorkflow(updated);
      } else {
        const created = await workflowService.createWorkflow(data as Omit<Workflow, 'id' | 'createdAt' | 'updatedAt'>);
        setWorkflow(created);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to save workflow'));
      throw err;
    }
  };

  return {
    workflow,
    loading,
    error,
    saveWorkflow
  };
}