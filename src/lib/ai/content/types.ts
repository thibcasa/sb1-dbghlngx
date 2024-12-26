```typescript
export type ContentType = 'post' | 'story' | 'reel' | 'article' | 'ad';
export type PublishingPlatform = 'instagram' | 'facebook' | 'tiktok';

export interface GeneratedContent {
  id: string;
  type: ContentType;
  title: string;
  body: string;
  hashtags?: string[];
  metadata: {
    objective: string;
    targetAudience: any;
    estimatedEngagement: number;
  };
}

export interface ContentTemplate {
  id: string;
  type: ContentType;
  content: string;
  variables: string[];
  performance: {
    engagementRate: number;
    conversionRate: number;
  };
}

export interface PublishingSchedule {
  id: string;
  contentId: string;
  platform: PublishingPlatform;
  scheduledTime: Date;
  status: 'pending' | 'published' | 'failed';
  error?: string;
}
```