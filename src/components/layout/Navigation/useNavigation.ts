import { useState, useCallback } from 'react';
import { LayoutDashboard, Users, Target, BarChart } from 'lucide-react';
import type { NavItem } from './types';

export function useNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const menuItems: NavItem[] = [
    {
      icon: LayoutDashboard,
      label: 'Tableau de bord',
      path: '/dashboard'
    },
    {
      icon: Target,
      label: 'Campagnes',
      path: '/campaigns'
    },
    {
      icon: Users,
      label: 'Leads',
      path: '/leads'
    },
    {
      icon: BarChart,
      label: 'Analyses',
      path: '/analytics'
    }
  ];

  // Dans un vrai projet, utilisez un router pour gérer cela
  const activeRoute = window.location.pathname;

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  return {
    activeRoute,
    menuItems,
    isMenuOpen,
    toggleMenu
  };
}