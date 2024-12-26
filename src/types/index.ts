export interface Campaign {
  id: string;
  name: string;
  budget: number;
  targetAudience: {
    ageRange: {
      min: number;
      max: number;
    };
    location: string;
    propertyOwner: boolean;
  };
  channels: Channel[];
  status: 'draft' | 'active' | 'paused' | 'completed';
  performance: CampaignPerformance;
  createdAt: Date;
  updatedAt: Date;
}

export interface Channel {
  type: 'facebook' | 'instagram' | 'tiktok' | 'google' | 'linkedin' | 'email';
  content: {
    title: string;
    description: string;
    mediaUrl?: string;
  };
  metrics: ChannelMetrics;
}

export interface ChannelMetrics {
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
}

export interface CampaignPerformance {
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  totalCost: number;
  roi: number;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  source: Channel['type'];
  status: 'new' | 'contacted' | 'qualified' | 'negotiation' | 'won' | 'lost';
  propertyDetails?: {
    type: string;
    location: string;
    estimatedValue: number;
  };
  interactions: Interaction[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Interaction {
  id: string;
  type: 'email' | 'call' | 'message' | 'meeting';
  status: 'scheduled' | 'completed' | 'failed';
  notes?: string;
  timestamp: Date;
}