import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface FormErrorProps {
  errors: string[];
}

export function FormError({ errors }: FormErrorProps) {
  if (errors.length === 0) return null;

  return (
    <div className="bg-red-50 p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="w-4 h-4 text-red-500" />
        <h4 className="font-medium text-red-800">
          Erreurs de validation
        </h4>
      </div>
      <ul className="space-y-1 text-sm text-red-700">
        {errors.map((error, index) => (
          <li key={index}>• {error}</li>
        ))}
      </ul>
    </div>
  );
}