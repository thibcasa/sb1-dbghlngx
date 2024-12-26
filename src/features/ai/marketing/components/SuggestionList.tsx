import React from 'react';
import { Sparkles } from 'lucide-react';

interface SuggestionListProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export function SuggestionList({ suggestions, onSelect }: SuggestionListProps) {
  if (!suggestions?.length) return null;

  return (
    <div className="mt-2 space-y-1">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSelect(suggestion)}
          className="w-full text-left px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          {suggestion}
        </button>
      ))}
    </div>
  );
}