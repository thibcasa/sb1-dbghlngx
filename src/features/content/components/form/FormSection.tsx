import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface FormSectionProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export function FormSection({ title, description, icon: Icon, children }: FormSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-5 h-5 text-gray-400" />
        <label className="block text-sm font-medium text-gray-700">
          {title}
        </label>
      </div>
      {description && (
        <p className="mt-1 text-xs text-gray-500 mb-2">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}