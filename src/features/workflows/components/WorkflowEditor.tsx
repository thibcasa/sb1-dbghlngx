import React from 'react';
import { Card } from '@/components/common/Card';
import { TriggerEditor } from './TriggerEditor';
import { ActionsEditor } from './ActionsEditor';
import type { Workflow } from '../types';

interface WorkflowEditorProps {
  workflow: Workflow;
  onSave: (workflow: Workflow) => Promise<void>;
}

export function WorkflowEditor({ workflow, onSave }: WorkflowEditorProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(workflow);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nom du workflow
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={workflow.name}
          />
        </div>

        <TriggerEditor trigger={workflow.trigger} />
        <ActionsEditor actions={workflow.actions} />

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </Card>
  );
}