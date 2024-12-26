import React from 'react';
import { Card } from '@/components/common/Card';
import { TrendingUp, Users, MessageSquare, BarChart } from 'lucide-react';

interface PerformanceMetrics {
  reach: number;
  engagement: number;
  clicks: number;
  leads: number;
  conversionRate: number;
}

interface PerformanceAnalyticsProps {
  metrics: PerformanceMetrics;
}

export function PerformanceAnalytics({ metrics }: PerformanceAnalyticsProps) {
  return (
    <Card>
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        Performance des Publications
      </h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Users className="w-4 h-4" />
            <span className="text-sm">Portée</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {metrics.reach.toLocaleString()}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm">Engagement</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {metrics.engagement.toLocaleString()}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">Leads</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {metrics.leads.toLocaleString()}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <BarChart className="w-4 h-4" />
            <span className="text-sm">Conversion</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {(metrics.conversionRate * 100).toFixed(1)}%
          </p>
        </div>
      </div>
    </Card>
  );
}