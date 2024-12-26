import { useEffect, useState } from 'react';
import { SeoAutoCorrector } from './SeoAutoCorrector';
import { SeoMonitor } from './SeoMonitor';
import type { PageMeta } from '@/components/seo/types';

export function useAutoSeoCorrection(initialMeta: PageMeta, path: string) {
  const [meta, setMeta] = useState<PageMeta>(initialMeta);

  useEffect(() => {
    // Analyser le SEO actuel
    const analysis = SeoMonitor.analyzePage(meta, path);
    
    // Si des problèmes sont détectés, appliquer la correction automatique
    if (analysis.issues.length > 0 || analysis.warnings.length > 0) {
      const correctedMeta = SeoAutoCorrector.autoCorrect(meta);
      setMeta(correctedMeta);
      
      // Vérifier les améliorations
      const newAnalysis = SeoMonitor.analyzePage(correctedMeta, path);
      
      if (process.env.NODE_ENV === 'development') {
        console.group('🔧 Corrections SEO appliquées');
        console.log('Avant:', meta);
        console.log('Après:', correctedMeta);
        console.log('Améliorations:', {
          issuesFixed: analysis.issues.length - newAnalysis.issues.length,
          warningsFixed: analysis.warnings.length - newAnalysis.warnings.length
        });
        console.groupEnd();
      }
    }
  }, [initialMeta, path]);

  return meta;
}