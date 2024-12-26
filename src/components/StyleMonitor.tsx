import React from 'react';
import { useStyleMonitor } from '../lib/styles/hooks/useStyleMonitor';

export function StyleMonitor() {
  const suggestions = useStyleMonitor();

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 left-4 max-w-md bg-white p-4 rounded-lg shadow-lg border border-gray-200 overflow-auto max-h-[60vh]">
      <h2 className="text-lg font-semibold mb-4">Moniteur de Style</h2>
      
      {suggestions.length === 0 ? (
        <p className="text-green-600">Aucune suggestion d'amélioration</p>
      ) : (
        <ul className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="p-3 bg-gray-50 rounded">
              <p className="font-medium text-gray-900">{suggestion.message}</p>
              {suggestion.selector && (
                <p className="text-sm text-gray-600 mt-1">
                  Sélecteur: <code className="bg-gray-100 px-1 rounded">{suggestion.selector}</code>
                </p>
              )}
              {suggestion.suggestion && (
                <p className="text-sm text-blue-600 mt-1">
                  Suggestion: {suggestion.suggestion}
                </p>
              )}
              {suggestion.properties && (
                <ul className="mt-1 text-sm text-gray-600">
                  {suggestion.properties.map((prop, i) => (
                    <li key={i} className="ml-4">• {prop}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}