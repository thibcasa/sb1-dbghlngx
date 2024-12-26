import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/common/Button';
import { Plus } from 'lucide-react';
import { WorkflowList } from '../components/WorkflowList';
import { WorkflowEditor } from '../components/WorkflowEditor';
import { useWorkflow } from '../hooks/useWorkflow';
import type { Workflow } from '../types';

export function WorkflowsPage() {
  const [selectedWorkflow, setSelectedWorkflow] = React.useState<Workflow | null>(null);
  const { workflow, saveWorkflow } = useWorkflow(selectedWorkflow?.id);

  return (
    <PageLayout
      title="Workflows"
      description="Automatisez vos processus métier"
      actions={
        <Button onClick={() => setSelectedWorkflow(null)}>
          <Plus className="w-4 h-4 mr-2" />
          Nouveau workflow
        </Button>
      }
    >
      <div className="space-y-6">
        {selectedWorkflow ? (
          <WorkflowEditor
            workflow={workflow!}
            onSave={saveWorkflow}
          />
        ) : (
          <WorkflowList
            workflows={[]} // TODO: Add useWorkflows hook
            onSelect={setSelectedWorkflow}
          />
        )}
      </div>
    </PageLayout>
  );
}