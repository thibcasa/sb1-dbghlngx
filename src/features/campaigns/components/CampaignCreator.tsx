import React from 'react';
import { Card } from '@/components/common/Card';
import { Target, Users, DollarSign, Calendar } from 'lucide-react';
import { useAIAssistant } from '@/lib/hooks/useAIChat';
import type { Campaign } from '@/types';

interface CampaignCreatorProps {
  onSave: (campaign: Campaign) => Promise<void>;
}

export function CampaignCreator({ onSave }: CampaignCreatorProps) {
  const { processMessage } = useAIAssistant();
  const [objective, setObjective] = React.useState('');
  const [targetCount, setTargetCount] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      const response = await processMessage(
        `Générer un plan de campagne pour obtenir ${targetCount} mandats avec l'objectif: ${objective}`
      );

      if (response.actions?.[0]?.type === 'create_campaign') {
        await onSave(response.actions[0].payload);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Objectif de la campagne
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Target className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="pl-10 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex: Obtenir des mandats exclusifs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre de mandats visés
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="number"
                value={targetCount}
                onChange={(e) => setTargetCount(e.target.value)}
                className="block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: 4"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Délai
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="pl-10 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="7">7 jours</option>
                <option value="14">14 jours</option>
                <option value="30">30 jours</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Génération du plan...' : 'Générer le plan de campagne'}
        </button>
      </form>
    </Card>
  );
}