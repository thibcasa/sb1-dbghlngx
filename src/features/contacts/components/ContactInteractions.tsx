import React from 'react';
import { Card } from '@/components/common/Card';
import { MessageSquare, Phone, Mail, Calendar } from 'lucide-react';
import type { Interaction } from '../types';

interface ContactInteractionsProps {
  interactions: Interaction[];
}

export function ContactInteractions({ interactions }: ContactInteractionsProps) {
  const getIcon = (type: Interaction['type']) => {
    switch (type) {
      case 'message': return MessageSquare;
      case 'call': return Phone;
      case 'email': return Mail;
      case 'meeting': return Calendar;
    }
  };

  return (
    <Card>
      <h3 className="text-lg font-medium text-gray-900 mb-6">Historique des interactions</h3>
      
      <div className="space-y-6">
        {interactions.map(interaction => {
          const Icon = getIcon(interaction.type);
          
          return (
            <div key={interaction.id} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    {interaction.title}
                  </p>
                  <span className="text-sm text-gray-500">
                    {new Date(interaction.timestamp).toLocaleString()}
                  </span>
                </div>
                
                {interaction.notes && (
                  <p className="mt-1 text-sm text-gray-600">
                    {interaction.notes}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}