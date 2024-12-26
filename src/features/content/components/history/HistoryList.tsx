import React from 'react';
import { Card } from '@/components/common/Card';
import { History, Trash2 } from 'lucide-react';
import type { GeneratedContent } from '../../types';
import { truncateText } from '../../utils/contentFormatters';

interface HistoryListProps {
  history: GeneratedContent[];
  onSelect: (content: GeneratedContent) => void;
  onClear: () => void;
}

export function HistoryList({ history, onSelect, onClear }: HistoryListProps) {
  if (history.length === 0) {
    return (
      <Card>
        <div className="text-center py-6 text-gray-500">
          <History className="w-8 h-8 mx-auto mb-2" />
          <p>Aucun historique disponible</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Historique</h3>
        <button
          onClick={onClear}
          className="text-gray-500 hover:text-red-500"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {history.map((content, index) => (
          <button
            key={index}
            onClick={() => onSelect(content)}
            className="w-full text-left p-3 rounded-lg hover:bg-gray-50"
          >
            <h4 className="font-medium text-gray-900">{content.title}</h4>
            <p className="text-sm text-gray-500 mt-1">
              {truncateText(content.body, 100)}
            </p>
          </button>
        ))}
      </div>
    </Card>
  );
}