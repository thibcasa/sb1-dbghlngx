import React from 'react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { TrendingUp, AlertTriangle, Zap } from 'lucide-react';
import type { Campaign } from '@/types';

interface CampaignOptimizerProps {
  campaign: Campaign;
  onOptimize: (optimizations: any) => Promise<void>;
}

export function CampaignOptimizer({ campaign, onOptimize }: CampaignOptimizerProps) {
  const [optimizing, setOptimizing] = React.useState(false);

  const handleOptimize = async () => {
    if (optimizing) return;
    setOptimizing(true);
    try {
      const optimizations = await analyzeAndOptimize(campaign);
      await onOptimize(optimizations);
    } finally {
      setOptimizing(false);
    }
  };

  return (
    <Card>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-medium text-gray-900">
              Optimisations IA
            </h3>
          </div>
          <button
            onClick={handleOptimize}
            disabled={optimizing}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {optimizing ? 'Analyse...' : 'Optimiser'}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">ROI actuel</p>
            <p className="text-2xl font-bold text-gray-900">
              {campaign.performance.roi}x
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Taux de conversion</p>
            <p className="text-2xl font-bold text-gray-900">
              {(campaign.performance.totalConversions / campaign.performance.totalClicks * 100).toFixed(1)}%
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Coût par lead</p>
            <p className="text-2xl font-bold text-gray-900">
              {(campaign.performance.totalCost / campaign.performance.totalConversions).toFixed(0)}€
            </p>
          </div>
        </div>

        {campaign.channels.map((channel, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">{channel.type}</h4>
              <Badge variant={
                channel.metrics.conversions > 0 ? 'success' : 'warning'
              }>
                {channel.metrics.conversions} conversions
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Impressions</span>
                <span className="font-medium">{channel.metrics.impressions}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Clics</span>
                <span className="font-medium">{channel.metrics.clicks}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Coût</span>
                <span className="font-medium">{channel.metrics.cost}€</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

async function analyzeAndOptimize(campaign: Campaign) {
  // Simuler une analyse IA
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    suggestions: [
      {
        type: 'budget_reallocation',
        channel: 'facebook',
        action: 'increase',
        amount: 50
      },
      {
        type: 'targeting_optimization',
        channel: 'instagram',
        suggestions: ['Affiner le ciblage géographique', 'Ajouter des intérêts similaires']
      }
    ]
  };
}