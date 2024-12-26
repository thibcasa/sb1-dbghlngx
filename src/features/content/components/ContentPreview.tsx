import React from 'react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Eye, Copy, Check } from 'lucide-react';

interface ContentPreviewProps {
  content: {
    title: string;
    body: string;
    metadata: {
      keywords: string[];
      estimatedEngagement: number;
    };
  };
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
            <h3 className="text-lg font-medium text-gray-900">
              Aperçu du contenu
            </h3>
          </div>
          <Badge variant="success">
            {(content.metadata.estimatedEngagement * 100).toFixed(1)}% engagement
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

        <div className="flex flex-wrap gap-2">
          {content.metadata.keywords.map((keyword, index) => (
            <Badge key={index} variant="info">
              #{keyword}
            </Badge>
          ))}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
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
    </Card>
  );
}