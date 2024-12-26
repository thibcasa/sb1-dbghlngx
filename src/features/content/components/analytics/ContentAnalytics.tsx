import React from 'react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { TrendingUp, Users, MessageSquare, BarChart } from 'lucide-react';
import { PerformanceChart } from './PerformanceChart';
import { EngagementMetrics } from './EngagementMetrics';
import { AudienceInsights } from './AudienceInsights';
import type { ContentAnalytics } from '../../types';

interface ContentAnalyticsProps {
  analytics: ContentAnalytics;
}

export function ContentAnalytics({ analytics }: ContentAnalyticsProps) {
  return (
    <Card>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Performance du contenu</h3>
          <Badge variant={analytics.score >= 80 ? 'success' : 'warning'}>
            Score: {analytics.score}/100
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Portée</p>
              <p className="text-xl font-bold">{analytics.reach.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Engagement</p>
              <p className="text-xl font-bold">{analytics.engagement.rate}%</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Conversion</p>
              <p className="text-xl font-bold">{analytics.conversion.rate}%</p>
            </div>
          </div>
        </div>

        <PerformanceChart data={analytics.performanceOverTime} />
        <EngagementMetrics metrics={analytics.engagement} />
        <AudienceInsights insights={analytics.audience} />
      </div>
    </Card>
  );
}