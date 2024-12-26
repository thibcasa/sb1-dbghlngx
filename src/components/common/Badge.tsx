import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'new' | 'contacted' | 'qualified' | 'negotiation' | 'won' | 'lost';
}

export function Badge({ children, variant = 'new' }: BadgeProps) {
  const variants = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    qualified: 'bg-purple-100 text-purple-800',
    negotiation: 'bg-indigo-100 text-indigo-800',
    won: 'bg-green-100 text-green-800',
    lost: 'bg-red-100 text-red-800'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}