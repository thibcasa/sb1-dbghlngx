import React from 'react';
import { Card } from '@/components/common/Card';
import { BarChart, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import type { WorkflowExecution } from '../types';

interface WorkflowAnalyticsProps {
  executions: WorkflowExecution[];
}

export function WorkflowAnalytics({ executions }: WorkflowAnalyticsProps) {
  const metrics = React.useMemo(() => {
    const total = executions.length;
    if (total === 0) return null;

    const completed = executions.filter(e => e.status === 'completed').length;
    const failed = executions.filter(e => e.status === 'failed').length;
    
    const avgDuration = executions
      .filter(e => e.completedAt)
      .reduce((acc, e) => acc + (e.completedAt!.getTime() - e.startedAt.getTime()), 0) / completed;

    return {
      successRate: (completed / total) * 100,
      failureRate: (failed / total) * 100,
      averageDuration: avgDuration / 1000, // Convert to seconds
      totalExecutions: total
    };
  }, [executions]);

  if (!metrics) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <div className="flex items-center gap-3">
          <BarChart className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Taux de succès</p>
            <p className="text-2xl font-bold text-gray-900">
              {metrics.successRate.toFixed(1)}%
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <div>
            <p className="text-sm text-gray-500">Taux d'échec</p>
            <p className="text-2xl font-bold text-gray-900">
              {metrics.failureRate.toFixed(1)}%
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-green-500" />
          <div>
            <p className="text-sm text-gray-500">Durée moyenne</p>
            <p className="text-2xl font-bold text-gray-900">
              {metrics.averageDuration.toFixed(1)}s
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-purple-500" />
          <div>
            <p className="text-sm text-gray-500">Total exécutions</p>
            <p className="text-2xl font-bold text-gray-900">
              {metrics.totalExecutions}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}