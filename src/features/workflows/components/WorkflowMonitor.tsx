import React from 'react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Clock, AlertCircle } from 'lucide-react';
import type { WorkflowExecution } from '../types';

interface WorkflowMonitorProps {
  executions: WorkflowExecution[];
}

export function WorkflowMonitor({ executions }: WorkflowMonitorProps) {
  return (
    <Card>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Exécutions récentes</h3>
      <div className="space-y-4">
        {executions.map(execution => (
          <div 
            key={execution.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              {execution.status === 'failed' ? (
                <AlertCircle className="w-5 h-5 text-red-500" />
              ) : (
                <Clock className="w-5 h-5 text-blue-500" />
              )}
              <div>
                <p className="text-sm text-gray-900">
                  Démarré le {new Date(execution.startedAt).toLocaleString()}
                </p>
                {execution.error && (
                  <p className="text-sm text-red-600 mt-1">{execution.error}</p>
                )}
              </div>
            </div>
            <Badge 
              variant={
                execution.status === 'completed' ? 'success' :
                execution.status === 'failed' ? 'danger' : 'primary'
              }
            >
              {execution.status}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}