import React from 'react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Search, AlertTriangle } from 'lucide-react';
import type { SeoMetadata } from '../types';

interface SeoPreviewProps {
  seo: SeoMetadata;
}

export function SeoPreview({ seo }: SeoPreviewProps) {
  return (
    <Card>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-medium text-gray-900">
              Optimisation SEO
            </h3>
          </div>
          <Badge variant={seo.score >= 80 ? 'success' : 'warning'}>
            Score SEO: {seo.score}/100
          </Badge>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">
              Titre SEO ({seo.title.length}/60)
            </h4>
            <p className="text-gray-900">{seo.title}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">
              Meta Description ({seo.description.length}/160)
            </h4>
            <p className="text-gray-600">{seo.description}</p>
          </div>

          {seo.suggestions.length > 0 && (
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <h4 className="font-medium text-yellow-800">
                  Suggestions d'amélioration
                </h4>
              </div>
              <ul className="space-y-1 text-sm text-yellow-700">
                {seo.suggestions.map((suggestion, index) => (
                  <li key={index}>• {suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}