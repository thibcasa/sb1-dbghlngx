import { LucideIcon } from 'lucide-react';

export interface NavItem {
  icon?: LucideIcon;
  label: string;
  path: string;
}

export interface NavItemProps extends NavItem {
  isActive: boolean;
}

export interface MobileMenuProps {
  isOpen: boolean;
  items: NavItem[];
  activeRoute: string;
}