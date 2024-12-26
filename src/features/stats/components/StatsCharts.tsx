import React from 'react';
import { Card } from '@/components/common/Card';

export function StatsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Performance des Campagnes
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          Graphique des performances
        </div>
      </Card>
      
      <Card>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Conversion par Source
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          Graphique des conversions
        </div>
      </Card>
    </div>
  );
}