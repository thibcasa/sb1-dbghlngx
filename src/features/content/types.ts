// Ajout des types pour l'analyse
export interface ContentAnalytics {
  score: number;
  reach: number;
  engagement: {
    rate: number;
    likes: number;
    comments: number;
    shares: number;
    interactions: {
      type: string;
      count: number;
    }[];
  };
  conversion: {
    rate: number;
    leads: number;
    actions: {
      type: string;
      count: number;
    }[];
  };
  performanceOverTime: {
    date: string;
    reach: number;
    engagement: number;
    conversion: number;
  }[];
  audience: {
    demographics: {
      ageRanges: {
        range: string;
        percentage: number;
      }[];
      locations: {
        name: string;
        percentage: number;
      }[];
    };
    interests: {
      name: string;
      score: number;
    }[];
    bestTimes: {
      day: string;
      hour: number;
      engagement: number;
    }[];
  };
}

export interface ContentPerformance {
  id: string;
  contentId: string;
  metrics: ContentAnalytics;
  recommendations: {
    type: string;
    message: string;
    priority: 'high' | 'medium' | 'low';
    impact: number;
  }[];
  createdAt: Date;
}