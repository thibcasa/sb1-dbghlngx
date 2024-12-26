import { supabase } from '@/lib/supabase/client';
import type { Workflow, WorkflowExecution } from '../types';

export const workflowService = {
  async createWorkflow(workflow: Omit<Workflow, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await supabase
      .from('workflows')
      .insert(workflow)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateWorkflow(id: string, workflow: Partial<Workflow>) {
    const { data, error } = await supabase
      .from('workflows')
      .update(workflow)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getWorkflows() {
    const { data, error } = await supabase
      .from('workflows')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getWorkflowExecutions(workflowId: string) {
    const { data, error } = await supabase
      .from('workflow_executions')
      .select('*')
      .eq('workflow_id', workflowId)
      .order('started_at', { ascending: false });

    if (error) throw error;
    return data as WorkflowExecution[];
  }
};