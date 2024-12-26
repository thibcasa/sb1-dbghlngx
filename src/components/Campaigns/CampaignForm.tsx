import React, { useState } from 'react';
import { Target, Users, DollarSign } from 'lucide-react';

interface CampaignFormProps {
  onSubmit: (data: any) => Promise<void>;
}

export default function CampaignForm({ onSubmit }: CampaignFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    budget: '',
    targetAudience: {
      ageMin: '',
      ageMax: '',
      location: '',
      propertyOwner: false
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nom de la campagne
        </label>
        <div className="mt-1">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Budget
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <DollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            value={formData.budget}
            onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
            className="block w-full pl-10 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Public Cible</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Âge minimum
            </label>
            <input
              type="number"
              value={formData.targetAudience.ageMin}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                targetAudience: { ...prev.targetAudience, ageMin: e.target.value }
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Âge maximum
            </label>
            <input
              type="number"
              value={formData.targetAudience.ageMax}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                targetAudience: { ...prev.targetAudience, ageMax: e.target.value }
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Localisation
          </label>
          <input
            type="text"
            value={formData.targetAudience.location}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              targetAudience: { ...prev.targetAudience, location: e.target.value }
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="propertyOwner"
            checked={formData.targetAudience.propertyOwner}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              targetAudience: { ...prev.targetAudience, propertyOwner: e.target.checked }
            }))}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="propertyOwner" className="ml-2 block text-sm text-gray-900">
            Propriétaire de bien
          </label>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Création...' : 'Créer la campagne'}
        </button>
      </div>
    </form>
  );
}