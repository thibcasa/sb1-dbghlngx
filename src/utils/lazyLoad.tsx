import React, { Suspense } from 'react';
import type { ComponentType } from 'react';

interface LoadingProps {
  message?: string;
}

export const Loading = ({ message = 'Chargement...' }: LoadingProps) => (
  <div className="flex items-center justify-center p-4">
    <div className="text-gray-500">{message}</div>
  </div>
);

export function withLazyLoading<P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  LoadingComponent: React.ComponentType = Loading
) {
  const LazyComponent = React.lazy(importFn);

  return function WithLazyLoading(props: P) {
    return (
      <Suspense fallback={<LoadingComponent />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}