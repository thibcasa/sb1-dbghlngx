import type { PersonaJourney, PersonaProfile, PersonaBehavior } from '../types';

export class PersonaJourneyGenerator {
  static async generate(
    profile: PersonaProfile,
    behavior: PersonaBehavior
  ): Promise<PersonaJourney> {
    return {
      touchpoints: this.generateTouchpoints(profile, behavior),
      objections: this.generateObjections(profile),
      triggers: this.generateTriggers(profile)
    };
  }

  private static generateTouchpoints(
    profile: PersonaProfile,
    behavior: PersonaBehavior
  ): string[] {
    const touchpoints = [
      ...behavior.socialNetworks.map(network => `Post ${network}`),
      'Site web',
      'Landing page estimation'
    ];

    // Ajouter des points de contact spécifiques
    if (profile.demographics.ageRange.max > 50) {
      touchpoints.push('Appel téléphonique', 'Email personnalisé');
    }

    if (behavior.preferredContent.includes('Vidéos courtes')) {
      touchpoints.push('Stories Instagram', 'Reels');
    }

    return touchpoints;
  }

  private static generateObjections(profile: PersonaProfile): string[] {
    return [
      'Prix de vente trop bas',
      'Durée de la vente incertaine',
      'Frais d\'agence',
      'Engagement exclusif',
      'Manque de visibilité sur le processus'
    ];
  }

  private static generateTriggers(profile: PersonaProfile): string[] {
    const triggers = [
      'Besoin de vendre rapidement',
      'Projet d\'achat en cours',
      'Changement de situation professionnelle'
    ];

    // Ajouter des déclencheurs spécifiques
    if (profile.psychographics.goals.includes('Maximiser la valeur')) {
      triggers.push('Hausse des prix du marché');
    }

    if (profile.psychographics.painPoints.includes('Manque de temps')) {
      triggers.push('Besoin d\'accompagnement complet');
    }

    return triggers;
  }
}