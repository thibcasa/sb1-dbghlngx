import React from 'react';
import { Card } from '@/components/common/Card';
import { MessageSquare, Phone, Calendar, Mail } from 'lucide-react';

interface Activity {
  id: string;
  type: 'message' | 'call' | 'meeting' | 'email';
  description: string;
  timestamp: string;
  leadName: string;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'call',
    description: 'Appel de suivi',
    timestamp: '2024-03-15T10:30:00',
    leadName: 'Jean Dupont'
  },
  {
    id: '2',
    type: 'meeting',
    description: 'Visite propriété',
    timestamp: '2024-03-14T14:00:00',
    leadName: 'Marie Martin'
  }
];

const activityIcons = {
  message: MessageSquare,
  call: Phone,
  meeting: Calendar,
  email: Mail
};

export function ActivityFeed() {
  return (
    <Card>
      <div className="space-y-6">
        {mockActivities.map((activity) => {
          const Icon = activityIcons[activity.type];
          return (
            <div key={activity.id} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {activity.description} avec {activity.leadName}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}