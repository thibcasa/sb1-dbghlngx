```tsx
import React from 'react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Eye, Copy, Check } from 'lucide-react';
import type { GeneratedContent } from '@/lib/ai/content/types';

interface ContentPreviewProps {
  content: GeneratedContent;
}

export function ContentPreview({ content }: ContentPreviewProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-500" />
            <h3 className="font-medium">Prévisualisation</h3>
          </div>
          <Badge variant="success">
            Score: {(content.metadata.estimatedEngagement * 100).toFixed(1)}%
          </Badge>
        </div>

        <div className="prose prose-blue max-w-none">
          <h4 className="text-xl font-medium text-gray-900">
            {content.title}
          </h4>
          <div className="mt-4 text-gray-600 whitespace-pre-wrap">
            {content.body}
          </div>
        </div>

        {content.hashtags && content.hashtags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {content.hashtags.map((tag, index) => (
              <Badge key={index} variant="info">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copié !
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copier
              </>
            )}
          </button>
        </div>
      </div>
    </Card>
  );
}
```