import React from 'react';
import { Card } from '@/components/common/Card';
import { ProgressBar } from '@/components/common/ProgressBar';
import { Badge } from '@/components/common/Badge';
import { Calendar, Target, TrendingUp } from 'lucide-react';
import { formatDate } from '@/utils/formatters';
import type { MarketingObjective } from '@/lib/ai/marketing/objectives/types';

interface ObjectiveProgressProps {
  objective: MarketingObjective;
}

export function ObjectiveProgress({ objective }: ObjectiveProgressProps) {
  const progress = (objective.currentLeads / objective.target) * 100;
  const daysLeft = Math.ceil((objective.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <Card className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          Progression de l'objectif
        </h3>
        <Badge variant={objective.status === 'active' ? 'primary' : 'neutral'}>
          {objective.status === 'active' ? 'En cours' : 'Terminé'}
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Progression</span>
          <span className="font-medium">{objective.currentLeads} / {objective.target} mandats</span>
        </div>
        <ProgressBar value={progress} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Échéance</p>
            <p className="font-medium">{formatDate(objective.deadline)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Jours restants</p>
            <p className="font-medium">{daysLeft} jours</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">Taux conversion</p>
            <p className="font-medium">{(objective.metrics.conversionRate * 100).toFixed(1)}%</p>
          </div>
        </div>
      </div>
    </Card>
  );
}