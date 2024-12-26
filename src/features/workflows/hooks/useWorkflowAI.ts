import { useState } from 'react';
import { WorkflowAIEngine } from '@/lib/ai/workflow/WorkflowAIEngine';
import { WorkflowOptimizer } from '@/lib/ai/workflow/WorkflowOptimizer';
import type { Workflow, WorkflowTemplate, WorkflowExecution } from '../types';

export function useWorkflowAI() {
  const [generating, setGenerating] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const generateWorkflow = async (objective: string, context: any) => {
    setGenerating(true);
    try {
      return await WorkflowAIEngine.generateWorkflow(objective, context);
    } finally {
      setGenerating(false);
    }
  };

  const analyzeWorkflow = async (workflow: Workflow, executions: WorkflowExecution[]) => {
    setAnalyzing(true);
    try {
      return await WorkflowOptimizer.analyzePerformance(workflow, executions);
    } finally {
      setAnalyzing(false);
    }
  };

  return {
    generateWorkflow,
    analyzeWorkflow,
    generating,
    analyzing
  };
}