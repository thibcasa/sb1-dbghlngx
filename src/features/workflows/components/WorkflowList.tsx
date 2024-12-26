import React from 'react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Zap, Calendar } from 'lucide-react';
import type { Workflow } from '../types';

interface WorkflowListProps {
  workflows: Workflow[];
  onSelect: (workflow: Workflow) => void;
}

export function WorkflowList({ workflows, onSelect }: WorkflowListProps) {
  return (
    <div className="space-y-4">
      {workflows.map(workflow => (
        <Card 
          key={workflow.id}
          className="hover:border-blue-200 cursor-pointer transition-colors"
          onClick={() => onSelect(workflow)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {workflow.trigger.type === 'event' ? (
                <Zap className="w-5 h-5 text-blue-500" />
              ) : (
                <Calendar className="w-5 h-5 text-blue-500" />
              )}
              <div>
                <h3 className="font-medium text-gray-900">{workflow.name}</h3>
                {workflow.description && (
                  <p className="text-sm text-gray-500">{workflow.description}</p>
                )}
              </div>
            </div>
            <Badge variant={workflow.isActive ? 'success' : 'neutral'}>
              {workflow.isActive ? 'Actif' : 'Inactif'}
            </Badge>
          </div>
        </Card>
      ))}
    </div>
  );
}