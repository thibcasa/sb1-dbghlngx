```typescript
import { lazy } from 'react';

export const routes = {
  // ... autres routes existantes
  content: {
    path: '/content',
    component: lazy(() => import('@/features/content/pages/ContentOrchestratorPage')),
    title: 'Contenu',
    icon: 'FileText',
    children: {
      generator: {
        path: '/content/generator',
        component: lazy(() => import('@/features/content/pages/ContentOrchestratorPage')),
        title: 'Générateur IA'
      }
    }
  }
};
```