export interface StyleRule {
  selector: string;
  declarations: StyleDeclaration[];
}

export interface StyleDeclaration {
  property: string;
  value: string;
}

export interface Breakpoint {
  name: string;
  width: number;
}

export interface OptimizationSuggestion {
  type: 'specificity' | 'grouping' | 'responsive';
  message: string;
  selector?: string;
  suggestion?: string;
  properties?: string[];
}

export type StyleRules = StyleRule[];