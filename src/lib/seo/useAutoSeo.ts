import { useEffect } from 'react';
import { SeoMonitor } from './SeoMonitor';
import type { PageMeta } from '@/components/seo/types';

export function useAutoSeo(meta: PageMeta, path: string) {
  useEffect(() => {
    // Analyse SEO en temps réel
    const analysis = SeoMonitor.analyzePage(meta, path);
    const suggestions = SeoMonitor.suggestImprovements(meta);

    // Log des problèmes en développement
    if (process.env.NODE_ENV === 'development') {
      if (analysis.issues.length > 0) {
        console.group('🔴 Problèmes SEO détectés');
        analysis.issues.forEach(issue => {
          console.error(`${issue.message}${issue.suggestion ? ` - ${issue.suggestion}` : ''}`);
        });
        console.groupEnd();
      }

      if (analysis.warnings.length > 0) {
        console.group('⚠️ Avertissements SEO');
        analysis.warnings.forEach(warning => {
          console.warn(`${warning.message}${warning.suggestion ? ` - ${warning.suggestion}` : ''}`);
        });
        console.groupEnd();
      }

      if (suggestions.length > 0) {
        console.group('💡 Suggestions d\'amélioration');
        suggestions.forEach(suggestion => console.info(suggestion));
        console.groupEnd();
      }
    }
  }, [meta, path]);
}