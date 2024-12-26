import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { WorkflowList } from '@/features/workflows/components/WorkflowList';
import { Button } from '@/components/common/Button';
import { Plus } from 'lucide-react';
import { useWorkflow } from '@/features/workflows/hooks/useWorkflow';

export default function AutomationPage() {
  const { workflow, loading, error, saveWorkflow } = useWorkflow();

  return (
    <PageLayout
      title="Automatisations"
      description="Gérez vos workflows et automatisations"
      actions={
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nouveau workflow
        </Button>
      }
    >
      <div className="space-y-6">
        <WorkflowList
          workflows={[]}
          onSelect={(workflow) => console.log('Selected:', workflow)}
        />
      </div>
    </PageLayout>
  );
}