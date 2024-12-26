import React from 'react';
import { useAIPerformanceOptimizer } from '@/lib/performance/hooks/useAIPerformanceOptimizer';
import { Gauge, Zap, Code, Image, FileJson } from 'lucide-react';

interface AIPerformanceWidgetProps {
  url: string;
}

export function AIPerformanceWidget({ url }: AIPerformanceWidgetProps) {
  const { optimizations, isOptimizing, metrics, loading, error } = useAIPerformanceOptimizer(url);

  if (loading || isOptimizing) {
    return (
      <div className="animate-pulse bg-white p-6 rounded-lg shadow-sm space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
        <p className="text-red-800">Erreur lors de l'analyse IA des performances</p>
      </div>
    );
  }

  const getOptimizationIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="w-5 h-5" />;
      case 'code': return <Code className="w-5 h-5" />;
      case 'javascript': return <FileJson className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">
          Optimisations IA
        </h3>
        <Gauge className="w-6 h-6 text-blue-500" />
      </div>

      {optimizations.length > 0 ? (
        <div className="space-y-6">
          {optimizations.map((opt, index) => (
            <div key={index} className="border-t border-gray-100 pt-4 first:border-0 first:pt-0">
              <div className="flex items-start gap-3">
                <div className="text-blue-500">
                  {getOptimizationIcon(opt.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-900">
                      {opt.suggestion}
                    </h4>
                    <span className={`text-xs font-medium ${getPriorityColor(opt.priority)}`}>
                      {opt.priority.toUpperCase()}
                    </span>
                  </div>
                  
                  {opt.implementation.code && (
                    <div className="mt-2">
                      <pre className="text-xs bg-gray-50 p-3 rounded-md overflow-x-auto">
                        <code>{opt.implementation.code}</code>
                      </pre>
                    </div>
                  )}
                  
                  {opt.implementation.selectors && (
                    <ul className="mt-2 text-sm text-gray-600">
                      {opt.implementation.selectors.map((selector: string, i: number) => (
                        <li key={i} className="font-mono">{selector}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Aucune optimisation nécessaire</p>
      )}
    </div>
  );
}