import React from 'react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import type { SequenceStep } from '@/lib/ai/marketing/objectives/types';

interface SequenceTimelineProps {
  sequence: SequenceStep[];
}

export function SequenceTimeline({ sequence }: SequenceTimelineProps) {
  return (
    <Card>
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        Séquence d'actions
      </h3>

      <div className="relative">
        {sequence.map((step, index) => (
          <div key={index} className="mb-8 last:mb-0">
            <div className="flex items-start">
              <div className="flex flex-col items-center mr-4">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${step.metrics?.conversion ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}
                `}>
                  {index + 1}
                </div>
                {index < sequence.length - 1 && (
                  <div className="w-px h-full bg-gray-200 my-2" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">
                    {step.type.charAt(0).toUpperCase() + step.type.slice(1)}
                  </h4>
                  <Badge variant={step.metrics?.conversion ? 'success' : 'primary'}>
                    {step.metrics?.conversion ? 'Complété' : 'En cours'}
                  </Badge>
                </div>
                
                <div className="text-sm text-gray-500 mb-2">
                  {step.objective}
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Budget</p>
                    <p className="font-medium">{(step.budgetAllocation * 100).toFixed(0)}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Durée</p>
                    <p className="font-medium">{step.expectedDuration} jours</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Conversion</p>
                    <p className="font-medium">
                      {step.metrics?.conversion ? `${(step.metrics.conversion * 100).toFixed(1)}%` : '-'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}