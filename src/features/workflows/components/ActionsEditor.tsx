import React from 'react';
import { Mail, Bell, CheckSquare, RefreshCw } from 'lucide-react';
import type { WorkflowAction, ActionType } from '../types';

interface ActionsEditorProps {
  actions: WorkflowAction[];
  onChange?: (actions: WorkflowAction[]) => void;
}

export function ActionsEditor({ actions, onChange }: ActionsEditorProps) {
  const actionTypes: Array<{ type: ActionType; label: string; icon: React.ReactNode }> = [
    { type: 'email', label: 'Email', icon: <Mail className="w-5 h-5" /> },
    { type: 'notification', label: 'Notification', icon: <Bell className="w-5 h-5" /> },
    { type: 'task', label: 'Tâche', icon: <CheckSquare className="w-5 h-5" /> },
    { type: 'pipeline_update', label: 'Mise à jour pipeline', icon: <RefreshCw className="w-5 h-5" /> }
  ];

  const addAction = (type: ActionType) => {
    const newAction: WorkflowAction = {
      type,
      config: {},
      order: actions.length
    };
    onChange?.([...actions, newAction]);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Actions</h3>

      <div className="space-y-4">
        {actions.map((action, index) => (
          <div
            key={index}
            className="p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {actionTypes.find(t => t.type === action.type)?.icon}
                <span className="font-medium">
                  {actionTypes.find(t => t.type === action.type)?.label}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newActions = [...actions];
                  newActions.splice(index, 1);
                  onChange?.(newActions);
                }}
                className="text-red-600 hover:text-red-700"
              >
                Supprimer
              </button>
            </div>

            {/* Configuration spécifique au type d'action */}
            {action.type === 'email' && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Objet"
                  className="block w-full rounded-md border-gray-300"
                />
                <textarea
                  placeholder="Contenu"
                  className="block w-full rounded-md border-gray-300"
                  rows={3}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actionTypes.map(({ type, label, icon }) => (
          <button
            key={type}
            type="button"
            onClick={() => addAction(type)}
            className="flex items-center gap-2 p-4 rounded-lg border border-dashed border-gray-300 hover:border-blue-500 hover:text-blue-500"
          >
            {icon}
            <span>Ajouter {label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}