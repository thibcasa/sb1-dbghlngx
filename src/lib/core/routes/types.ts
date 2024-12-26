import { ComponentType } from 'react';
import { LucideIcon } from 'lucide-react';

export interface RouteConfig {
  path: string;
  component: ComponentType;
  title: string;
  icon: keyof typeof import('lucide-react');
  children?: Record<string, RouteConfig>;
}

export interface BreadcrumbItem {
  title: string;
  path: string;
}