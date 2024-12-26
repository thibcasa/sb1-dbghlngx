import React from 'react';
import { Zap, Calendar, UserCheck, Filter } from 'lucide-react';
import type { WorkflowTrigger, TriggerType } from '../types';

interface TriggerEditorProps {
  trigger: WorkflowTrigger;
  onChange?: (trigger: WorkflowTrigger) => void;
}

export function TriggerEditor({ trigger, onChange }: TriggerEditorProps) {
  const triggerTypes: Array<{ type: TriggerType; label: string; icon: React.ReactNode }> = [
    { type: 'event', label: 'Événement', icon: <Zap className="w-5 h-5" /> },
    { type: 'schedule', label: 'Planification', icon: <Calendar className="w-5 h-5" /> },
    { type: 'user_action', label: 'Action utilisateur', icon: <UserCheck className="w-5 h-5" /> },
    { type: 'condition', label: 'Condition', icon: <Filter className="w-5 h-5" /> }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Déclencheur</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {triggerTypes.map(({ type, label, icon }) => (
          <button
            key={type}
            type="button"
            onClick={() => onChange?.({ ...trigger, type })}
            className={`flex items-center gap-2 p-4 rounded-lg border ${
              trigger.type === type 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-200 hover:border-blue-200'
            }`}
          >
            {icon}
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Configuration spécifique au type de déclencheur */}
      <div className="mt-4">
        {trigger.type === 'event' && (
          <div className="space-y-4">
            <select className="block w-full rounded-md border-gray-300">
              <option value="lead_created">Lead créé</option>
              <option value="stage_changed">Étape modifiée</option>
              <option value="task_completed">Tâche terminée</option>
            </select>
          </div>
        )}
        
        {trigger.type === 'schedule' && (
          <div className="space-y-4">
            <input
              type="datetime-local"
              className="block w-full rounded-md border-gray-300"
            />
          </div>
        )}
      </div>
    </div>
  );
}