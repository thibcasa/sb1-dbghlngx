import React from 'react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Sparkles, TrendingUp, AlertTriangle } from 'lucide-react';
import { useWorkflowAI } from '../hooks/useWorkflowAI';
import type { Workflow, WorkflowExecution } from '../types';

interface WorkflowAIAssistantProps {
  workflow?: Workflow;
  executions?: WorkflowExecution[];
}

export function WorkflowAIAssistant({ workflow, executions }: WorkflowAIAssistantProps) {
  const { analyzeWorkflow, analyzing } = useWorkflowAI();
  const [analysis, setAnalysis] = React.useState<any>(null);

  React.useEffect(() => {
    if (workflow && executions?.length) {
      analyzeWorkflow(workflow, executions).then(setAnalysis);
    }
  }, [workflow, executions]);

  if (!workflow || analyzing) return null;

  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-medium text-gray-900">
          Assistant IA
        </h3>
      </div>

      {analysis && (
        <div className="space-y-4">
          {/* Métriques */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Taux de succès</p>
              <p className="text-2xl font-bold text-gray-900">
                {(analysis.metrics.successRate * 100).toFixed(1)}%
              </p>
            </div>
            {/* Autres métriques... */}
          </div>

          {/* Recommandations */}
          {analysis.recommendations.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Recommandations
              </h4>
              {analysis.recommendations.map((rec: any, i: number) => (
                <div key={i} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-900">{rec.suggestion}</p>
                    <Badge variant="primary" className="mt-1">
                      {rec.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}