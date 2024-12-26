import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useRoutes } from '@/lib/core/routes/useRoutes';

export function Breadcrumbs() {
  const { breadcrumbs } = useRoutes();

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={item.path} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
              )}
              {isLast ? (
                <span className="text-sm font-medium text-gray-700">
                  {item.title}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {item.title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}