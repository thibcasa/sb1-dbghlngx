import React from 'react';
import { MainNav } from './Navigation/MainNav';
import { PageHeader } from './PageHeader';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function PageLayout({ children, title, description, actions }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {description && (
                <p className="mt-1 text-sm text-gray-500">{description}</p>
              )}
            </div>
            {actions && (
              <div className="flex flex-col sm:flex-row gap-2">
                {actions}
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6">
          {children}
        </div>
      </main>
    </div>
  );
}