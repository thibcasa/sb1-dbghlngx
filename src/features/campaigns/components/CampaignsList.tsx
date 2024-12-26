import React from 'react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Target, Users, TrendingUp } from 'lucide-react';

// ... (keep existing interfaces)

export function CampaignsList() {
  return (
    <div className="space-y-4">
      {mockCampaigns.map((campaign) => (
        <Card key={campaign.id} className="hover:border-blue-200 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="min-w-0"> {/* Add min-w-0 to enable truncation */}
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900 truncate">{campaign.name}</h3>
                <Badge variant="primary" className={`${statusColors[campaign.status]} shrink-0`}>
                  {campaign.status}
                </Badge>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-gray-500">
                Budget: {campaign.budget.toLocaleString()}€
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-2 sm:gap-4 shrink-0">
              <div className="flex items-center gap-1 sm:gap-2">
                <Users className="w-4 h-4 text-gray-400 shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">{campaign.metrics.leads}</p>
                  <p className="text-xs text-gray-500">Leads</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 sm:gap-2">
                <Target className="w-4 h-4 text-gray-400 shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">{campaign.metrics.conversion}%</p>
                  <p className="text-xs text-gray-500">Conv.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 sm:gap-2">
                <TrendingUp className="w-4 h-4 text-gray-400 shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">{campaign.metrics.roi}x</p>
                  <p className="text-xs text-gray-500">ROI</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}