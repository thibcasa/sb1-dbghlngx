import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from './ErrorBoundary';
import { StyleMonitor } from '@/components/StyleMonitor';
import { AIAssistant } from '@/features/ai/components/AIAssistant';

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        {children}
        {process.env.NODE_ENV === 'development' && <StyleMonitor />}
        <AIAssistant />
      </HelmetProvider>
    </ErrorBoundary>
  );
}