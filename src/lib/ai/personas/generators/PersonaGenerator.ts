import { PersonaProfileGenerator } from './PersonaProfileGenerator';
import { PersonaBehaviorGenerator } from './PersonaBehaviorGenerator';
import { PersonaJourneyGenerator } from './PersonaJourneyGenerator';
import { PersonaValidator } from '../validators/PersonaValidator';
import type { Persona, PersonaConfig } from '../types';

export class PersonaGenerator {
  static async generatePersona(config: PersonaConfig): Promise<Persona> {
    // Générer le profil de base
    const profile = await PersonaProfileGenerator.generate(config);
    
    // Générer le comportement
    const behavior = await PersonaBehaviorGenerator.generate(profile);
    
    // Générer le parcours client
    const journey = await PersonaJourneyGenerator.generate(profile, behavior);
    
    // Valider le persona
    const persona = { ...profile, behavior, journey };
    PersonaValidator.validate(persona);
    
    return persona;
  }
}