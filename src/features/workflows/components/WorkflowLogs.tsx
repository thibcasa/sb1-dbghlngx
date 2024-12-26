import React from 'react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Info, AlertTriangle, AlertOctagon } from 'lucide-react';
import type { WorkflowLog } from '../types';

interface WorkflowLogsProps {
  logs: WorkflowLog[];
}

export function WorkflowLogs({ logs }: WorkflowLogsProps) {
  const getLogIcon = (type: WorkflowLog['type']) => {
    switch (type) {
      case 'error': return <AlertOctagon className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getLogBadge = (type: WorkflowLog['type']) => {
    switch (type) {
      case 'error': return <Badge variant="danger">Erreur</Badge>;
      case 'warning': return <Badge variant="warning">Attention</Badge>;
      default: return <Badge variant="info">Info</Badge>;
    }
  };

  return (
    <Card>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Logs d'exécution</h3>
      <div className="space-y-4">
        {logs.map((log, index) => (
          <div 
            key={index}
            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
          >
            {getLogIcon(log.type)}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-gray-900">{log.message}</p>
                {getLogBadge(log.type)}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(log.timestamp).toLocaleString()}
              </p>
              {log.details && Object.keys(log.details).length > 0 && (
                <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                  {JSON.stringify(log.details, null, 2)}
                </pre>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}