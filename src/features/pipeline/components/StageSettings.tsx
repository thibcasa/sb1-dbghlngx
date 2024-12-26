import React from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import type { PipelineStage } from '../types';

interface StageSettingsProps {
  stage: PipelineStage;
  onSave: (stage: PipelineStage) => Promise<void>;
  onClose: () => void;
}

export function StageSettings({ stage, onSave, onClose }: StageSettingsProps) {
  const [formData, setFormData] = React.useState(stage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
    onClose();
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom de l'étape
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Couleur
          </label>
          <input
            type="color"
            value={formData.color}
            onChange={e => setFormData(prev => ({ ...prev, color: e.target.value }))}
            className="w-full h-10 p-1 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prérequis
          </label>
          <div className="space-y-2">
            {formData.requirements.map((req, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={req}
                  onChange={e => {
                    const newReqs = [...formData.requirements];
                    newReqs[index] = e.target.value;
                    setFormData(prev => ({ ...prev, requirements: newReqs }));
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newReqs = formData.requirements.filter((_, i) => i !== index);
                    setFormData(prev => ({ ...prev, requirements: newReqs }));
                  }}
                  className="text-red-500 hover:text-red-600"
                >
                  Supprimer
                </button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  requirements: [...prev.requirements, '']
                }));
              }}
            >
              Ajouter un prérequis
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit">
            Enregistrer
          </Button>
        </div>
      </form>
    </Card>
  );
}