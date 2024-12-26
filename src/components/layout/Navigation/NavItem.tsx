import React from 'react';
import type { NavItemProps } from './types';

export function NavItem({ icon: Icon, label, path, isActive }: NavItemProps) {
  return (
    <a
      href={path}
      className={`
        inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors
        ${isActive
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }
      `}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {label}
    </a>
  );
}