import React from 'react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { AlertTriangle, TrendingUp, AlertCircle } from 'lucide-react';
import type { MonitoringStatus, PerformanceAlert } from '@/lib/ai/monitoring/types';

interface PerformanceMonitorProps {
  status: MonitoringStatus;
}

export function PerformanceMonitor({ status }: PerformanceMonitorProps) {
  return (
    <Card>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            Monitoring des Performances
          </h3>
          <span className="text-sm text-gray-500">
            Mis à jour {status.lastUpdated.toLocaleTimeString()}
          </span>
        </div>

        {/* Métriques actuelles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(status.currentMetrics).map(([key, value]) => (
            <div key={key} className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">{key}</p>
              <p className="text-xl font-bold text-gray-900">
                {typeof value === 'number' ? value.toFixed(2) : value}
              </p>
            </div>
          ))}
        </div>

        {/* Alertes */}
        {status.alerts.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Alertes ({status.alerts.length})
            </h4>
            
            <div className="space-y-3">
              {status.alerts.map((alert, index) => (
                <AlertCard key={index} alert={alert} />
              ))}
            </div>
          </div>
        )}

        {/* Optimisations */}
        {status.optimizations.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Optimisations en cours
            </h4>
            
            <div className="space-y-3">
              {status.optimizations.map((opt, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="primary">{opt.type}</Badge>
                    <span className="text-sm text-gray-700">
                      Impact estimé: +{(opt.expectedImpact * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Badge variant={
                    opt.priority === 'high' ? 'danger' :
                    opt.priority === 'medium' ? 'warning' : 'info'
                  }>
                    {opt.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

function AlertCard({ alert }: { alert: PerformanceAlert }) {
  return (
    <div className={`p-4 rounded-lg ${
      alert.type === 'critical' ? 'bg-red-50' : 'bg-yellow-50'
    }`}>
      <div className="flex items-start gap-3">
        <AlertCircle className={`w-5 h-5 ${
          alert.type === 'critical' ? 'text-red-500' : 'text-yellow-500'
        }`} />
        
        <div className="flex-1">
          <p className={`font-medium ${
            alert.type === 'critical' ? 'text-red-700' : 'text-yellow-700'
          }`}>
            {alert.message}
          </p>
          
          {alert.recommendations.length > 0 && (
            <ul className="mt-2 space-y-1">
              {alert.recommendations.map((rec, i) => (
                <li key={i} className="text-sm text-gray-600">• {rec}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}