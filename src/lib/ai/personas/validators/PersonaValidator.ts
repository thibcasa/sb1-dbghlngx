import type { Persona } from '../types';

export class PersonaValidator {
  static validate(persona: Persona): void {
    this.validateDemographics(persona);
    this.validatePsychographics(persona);
    this.validateBehavior(persona);
    this.validateJourney(persona);
  }

  private static validateDemographics(persona: Persona) {
    const { demographics } = persona;

    if (!demographics.ageRange || 
        demographics.ageRange.min < 18 || 
        demographics.ageRange.max > 80) {
      throw new Error('Invalid age range');
    }

    if (!demographics.location) {
      throw new Error('Location is required');
    }

    if (!demographics.occupation || demographics.occupation.length === 0) {
      throw new Error('At least one occupation is required');
    }
  }

  private static validatePsychographics(persona: Persona) {
    const { psychographics } = persona;

    if (!psychographics.goals || psychographics.goals.length === 0) {
      throw new Error('At least one goal is required');
    }

    if (!psychographics.painPoints || psychographics.painPoints.length === 0) {
      throw new Error('At least one pain point is required');
    }

    if (!psychographics.motivations || psychographics.motivations.length === 0) {
      throw new Error('At least one motivation is required');
    }
  }

  private static validateBehavior(persona: Persona) {
    const { behavior } = persona;

    if (!behavior.socialNetworks || behavior.socialNetworks.length === 0) {
      throw new Error('At least one social network is required');
    }

    if (!behavior.preferredContent || behavior.preferredContent.length === 0) {
      throw new Error('At least one preferred content type is required');
    }
  }

  private static validateJourney(persona: Persona) {
    const { journey } = persona;

    if (!journey.touchpoints || journey.touchpoints.length === 0) {
      throw new Error('At least one touchpoint is required');
    }

    if (!journey.objections || journey.objections.length === 0) {
      throw new Error('At least one objection is required');
    }

    if (!journey.triggers || journey.triggers.length === 0) {
      throw new Error('At least one trigger is required');
    }
  }
}