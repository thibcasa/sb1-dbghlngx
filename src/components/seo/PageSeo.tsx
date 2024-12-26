import React from 'react';
import { MetaTags } from './MetaTags';
import { SchemaOrg } from './SchemaOrg';
import { seoConfig } from './SeoConfig';
import { useAutoSeoCorrection } from '@/lib/seo/useAutoSeoCorrection';
import type { PageMeta } from './types';

interface PageSeoProps {
  meta: PageMeta;
  path: string;
}

export function PageSeo({ meta: initialMeta, path }: PageSeoProps) {
  // Utiliser la correction automatique du SEO
  const optimizedMeta = useAutoSeoCorrection(initialMeta, path);

  return (
    <>
      <MetaTags
        title={optimizedMeta.title}
        description={optimizedMeta.description || seoConfig.defaultDescription}
        canonicalUrl={`${seoConfig.baseUrl}${path}`}
      />
      <SchemaOrg
        path={path}
        title={optimizedMeta.title}
        description={optimizedMeta.description || seoConfig.defaultDescription}
      />
    </>
  );
}