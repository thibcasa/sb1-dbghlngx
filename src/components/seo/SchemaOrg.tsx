import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SchemaOrgProps {
  path: string;
  title: string;
  description: string;
}

export function SchemaOrg({ path, title, description }: SchemaOrgProps) {
  const baseUrl = 'https://app.ai-crm.com';
  const url = `${baseUrl}${path}`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        'url': baseUrl,
        'name': 'AI-CRM',
        'description': 'Plateforme CRM intelligente pour l\'immobilier'
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        'url': url,
        'name': title,
        'description': description,
        'isPartOf': { '@id': `${baseUrl}/#website` }
      },
      {
        '@type': 'SoftwareApplication',
        'name': 'AI-CRM',
        'applicationCategory': 'BusinessApplication',
        'operatingSystem': 'Web',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'EUR'
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}