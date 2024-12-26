import { StyleRules, Breakpoint } from '../types';

export class ResponsiveChecker {
  private static breakpoints: Breakpoint[] = [
    { name: 'sm', width: 640 },
    { name: 'md', width: 768 },
    { name: 'lg', width: 1024 },
    { name: 'xl', width: 1280 },
    { name: '2xl', width: 1536 }
  ];

  static findMissingResponsiveRules(rules: StyleRules): Map<string, Breakpoint[]> {
    const missingRules = new Map<string, Breakpoint[]>();

    rules.forEach(rule => {
      if (this.requiresResponsive(rule.selector)) {
        const missing = this.checkBreakpoints(rule);
        if (missing.length > 0) {
          missingRules.set(rule.selector, missing);
        }
      }
    });

    return missingRules;
  }

  private static requiresResponsive(selector: string): boolean {
    // Vérifie si le sélecteur nécessite des règles responsives
    return /flex|grid|w-|h-|p-|m-|text-/.test(selector);
  }

  private static checkBreakpoints(rule: StyleRules[0]): Breakpoint[] {
    return this.breakpoints.filter(bp => 
      !rule.declarations.some(decl => 
        decl.property.startsWith(`@screen ${bp.name}`)
      )
    );
  }
}