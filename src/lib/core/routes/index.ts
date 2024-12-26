import { lazy } from 'react';
import type { RouteConfig } from './types';

export const routes: Record<string, RouteConfig> = {
  dashboard: {
    path: '/',
    component: lazy(() => import('@/features/dashboard/pages/DashboardPage')),
    title: 'Tableau de bord',
    icon: 'LayoutDashboard'
  },
  personas: {
    path: '/personas',
    component: lazy(() => import('@/features/personas/pages/PersonasPage')),
    title: 'Personas',
    icon: 'Users',
    children: {
      create: {
        path: '/personas/create',
        component: lazy(() => import('@/features/personas/pages/PersonaCreatorPage')),
        title: 'Créer un persona'
      }
    }
  },
  content: {
    path: '/content',
    component: lazy(() => import('@/features/content/pages/ContentGeneratorPage')),
    title: 'Contenu',
    icon: 'FileText',
    children: {
      generator: {
        path: '/content/generator',
        component: lazy(() => import('@/features/content/pages/ContentGeneratorPage')),
        title: 'Générateur IA'
      },
      analytics: {
        path: '/content/analytics',
        component: lazy(() => import('@/features/content/pages/ContentAnalyticsPage')),
        title: 'Analyses'
      }
    }
  },
  campaigns: {
    path: '/campaigns',
    component: lazy(() => import('@/features/campaigns/pages/CampaignsPage')),
    title: 'Campagnes',
    icon: 'Target',
    children: {
      create: {
        path: '/campaigns/create',
        component: lazy(() => import('@/features/campaigns/pages/CampaignCreatorPage')),
        title: 'Nouvelle campagne'
      },
      details: {
        path: '/campaigns/:id',
        component: lazy(() => import('@/features/campaigns/pages/CampaignDetailsPage')),
        title: 'Détails campagne'
      }
    }
  },
  leads: {
    path: '/leads',
    component: lazy(() => import('@/features/leads/pages/LeadsPage')),
    title: 'Leads',
    icon: 'UserPlus',
    children: {
      pipeline: {
        path: '/leads/pipeline',
        component: lazy(() => import('@/features/pipeline/pages/PipelinePage')),
        title: 'Pipeline'
      }
    }
  },
  analytics: {
    path: '/analytics',
    component: lazy(() => import('@/features/analytics/pages/AnalyticsPage')),
    title: 'Analyses',
    icon: 'BarChart'
  }
};