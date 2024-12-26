import { ReactNode } from 'react';

export interface MetricCardProps {
  title: string;
  value: string;
  target?: string;
  icon: ReactNode;
  trend: string;
  progress?: number;
}

export interface DashboardMetrics {
  mandats: MetricData;
  leads: MetricData;
  conversion: MetricData;
  campaigns: MetricData;
  meetings: MetricData;
  conversations: MetricData;
}

interface MetricData {
  value: string;
  target?: string;
  trend: string;
  progress?: number;
}