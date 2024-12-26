import type { GenerationParams } from '../types';

export function validateGenerationParams(params: GenerationParams): string[] {
  const errors: string[] = [];

  if (!params.type) {
    errors.push('Le type de contenu est requis');
  }

  if (!params.objective || params.objective.length < 10) {
    errors.push('L\'objectif doit contenir au moins 10 caractères');
  }

  if (!params.audience.demographics.location) {
    errors.push('La zone géographique est requise');
  }

  return errors;
}