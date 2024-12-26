import React from 'react';
import { Line } from 'react-chartjs-2';

interface PerformanceChartProps {
  data: {
    date: string;
    reach: number;
    engagement: number;
    conversion: number;
  }[];
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  const chartData = {
    labels: data.map(d => new Date(d.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Portée',
        data: data.map(d => d.reach),
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.4
      },
      {
        label: 'Engagement',
        data: data.map(d => d.engagement),
        borderColor: 'rgb(34, 197, 94)',
        tension: 0.4
      },
      {
        label: 'Conversion',
        data: data.map(d => d.conversion),
        borderColor: 'rgb(168, 85, 247)',
        tension: 0.4
      }
    ]
  };

  return (
    <div className="h-64">
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }}
      />
    </div>
  );
}