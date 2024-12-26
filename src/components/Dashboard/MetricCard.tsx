import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  target?: string;
  icon: React.ReactNode;
  trend: string;
  progress?: number;
}

export default function MetricCard({ title, value, target, icon, trend, progress }: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-blue-600">{icon}</div>
        {progress && (
          <div className="text-sm font-medium text-gray-500">
            {value}/{target}
          </div>
        )}
      </div>
      
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      
      <div className="space-y-3">
        <div className="flex items-end justify-between">
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{trend}</p>
        </div>
        
        {progress && (
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}