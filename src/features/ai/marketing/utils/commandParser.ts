import type { CommandParams } from '../types';

export function parseCommand(command: string): CommandParams {
  // Créer campagne
  const createMatch = command.match(/créer campagne (\d+) mandats? (.+)/i);
  if (createMatch) {
    return {
      type: 'create',
      target: parseInt(createMatch[1]),
      location: createMatch[2].trim()
    };
  }

  // Analyser persona
  const personaMatch = command.match(/analyser persona/i);
  if (personaMatch) {
    return { type: 'analyze_persona' };
  }

  // Optimiser persona
  const optimizePersonaMatch = command.match(/optimiser persona/i);
  if (optimizePersonaMatch) {
    return { type: 'optimize_persona' };
  }

  // Autres commandes existantes...
  const analyzeMatch = command.match(/analyser campagne/i);
  if (analyzeMatch) {
    return { type: 'analyze' };
  }

  const optimizeMatch = command.match(/optimiser performances?/i);
  if (optimizeMatch) {
    return { type: 'optimize' };
  }

  return { type: 'unknown' };
}