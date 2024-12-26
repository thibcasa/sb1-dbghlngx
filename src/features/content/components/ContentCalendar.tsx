```typescript
import React from 'react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import type { Content } from '../types';

interface ContentCalendarProps {
  contents: Content[];
  onSelect: (content: Content) => void;
}

export function ContentCalendar({ contents, onSelect }: ContentCalendarProps) {
  const groupedByDate = React.useMemo(() => {
    const groups = new Map<string, Content[]>();
    
    contents.forEach(content => {
      const date = content.scheduledFor?.toISOString().split('T')[0] || 'draft';
      if (!groups.has(date)) {
        groups.set(date, []);
      }
      groups.get(date)?.push(content);
    });
    
    return groups;
  }, [contents]);

  return (
    <Card>
      <div className="space-y-6">
        {Array.from(groupedByDate.entries()).map(([date, items]) => (
          <div key={date} className="space-y-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-gray-400" />
              <h3 className="font-medium text-gray-900">
                {date === 'draft' ? 'Brouillons' : new Date(date).toLocaleDateString()}
              </h3>
            </div>

            <div className="grid gap-4">
              {items.map(content => (
                <div
                  key={content.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                  onClick={() => onSelect(content)}
                >
                  <div>
                    <h4 className="font-medium text-gray-900">{content.title}</h4>
                    <div className="flex items-center gap-4 mt-1">
                      <Badge variant={
                        content.status === 'published' ? 'success' :
                        content.status === 'scheduled' ? 'warning' : 'neutral'
                      }>
                        {content.status}
                      </Badge>
                      {content.scheduledFor && (
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          {content.scheduledFor.toLocaleTimeString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
```