import { useLocation } from 'react-router-dom';
import { routes } from './index';
import type { BreadcrumbItem } from './types';

export function useRoutes() {
  const location = useLocation();

  const getCurrentRoute = () => {
    const path = location.pathname;
    return Object.values(routes).find(route => route.path === path);
  };

  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const path = location.pathname;
    const pathSegments = path.split('/').filter(Boolean);
    
    return pathSegments.reduce<BreadcrumbItem[]>((acc, segment, index) => {
      const currentPath = `/${pathSegments.slice(0, index + 1).join('/')}`;
      const route = Object.values(routes).find(r => r.path === currentPath);
      
      if (route) {
        acc.push({
          title: route.title,
          path: currentPath
        });
      }
      
      return acc;
    }, []);
  };

  return {
    routes,
    currentRoute: getCurrentRoute(),
    breadcrumbs: getBreadcrumbs()
  };
}