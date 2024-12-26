```tsx
import React from 'react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Calendar, Clock, Instagram, Facebook, TikTok } from 'lucide-react';
import { ScheduleForm } from './ScheduleForm';
import { PlatformList } from './PlatformList';
import { useContentScheduling } from '../../hooks/useContentScheduling';
import type { GeneratedContent } from '@/lib/ai/content/types';

interface ContentSchedulerProps {
  content: GeneratedContent;
}

export function ContentScheduler({ content }: ContentSchedulerProps) {
  const { scheduleContent, scheduling } = useContentScheduling();
  const [selectedPlatforms, setSelectedPlatforms] = React.useState<string[]>([]);

  const handleSchedule = async (scheduledTime: Date) => {
    if (selectedPlatforms.length === 0) return;

    await Promise.all(
      selectedPlatforms.map(platform =>
        scheduleContent(content, platform, scheduledTime)
      )
    );
  };

  return (
    <Card>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Planifier la publication</h3>
          {scheduling && (
            <Badge variant="info">Planification en cours...</Badge>
          )}
        </div>

        <PlatformList
          platforms={[
            { id: 'instagram', name: 'Instagram', icon: Instagram },
            { id: 'facebook', name: 'Facebook', icon: Facebook },
            { id: 'tiktok', name: 'TikTok', icon: TikTok }
          ]}
          selectedPlatforms={selectedPlatforms}
          onSelect={setSelectedPlatforms}
        />

        <ScheduleForm onSchedule={handleSchedule} disabled={scheduling} />
      </div>
    </Card>
  );
}
```