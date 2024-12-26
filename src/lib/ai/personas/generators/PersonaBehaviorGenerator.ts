import type { PersonaBehavior, PersonaProfile } from '../types';

export class PersonaBehaviorGenerator {
  static async generate(profile: PersonaProfile): Promise<PersonaBehavior> {
    return {
      socialNetworks: this.selectSocialNetworks(profile),
      preferredContent: this.selectPreferredContent(profile),
      decisionFactors: this.generateDecisionFactors(profile),
      researchMethods: this.generateResearchMethods(profile)
    };
  }

  private static selectSocialNetworks(profile: PersonaProfile): string[] {
    const networks = [];

    // Sélection basée sur l'âge
    if (profile.demographics.ageRange.max < 35) {
      networks.push('Instagram', 'TikTok');
    } else if (profile.demographics.ageRange.max < 50) {
      networks.push('Facebook', 'Instagram', 'LinkedIn');
    } else {
      networks.push('Facebook', 'LinkedIn');
    }

    // Ajout basé sur la profession
    if (profile.demographics.occupation.includes('Cadre supérieur') ||
        profile.demographics.occupation.includes('Profession libérale')) {
      networks.push('LinkedIn');
    }

    return Array.from(new Set(networks));
  }

  private static selectPreferredContent(profile: PersonaProfile): string[] {
    const content = ['Articles immobiliers'];

    // Contenu basé sur les intérêts
    if (profile.psychographics.interests.includes('Architecture')) {
      content.push('Visites virtuelles', 'Photos professionnelles');
    }

    if (profile.psychographics.interests.includes('Finance')) {
      content.push('Analyses de marché', 'Guides d\'investissement');
    }

    // Contenu basé sur l'âge
    if (profile.demographics.ageRange.max < 45) {
      content.push('Vidéos courtes', 'Stories');
    } else {
      content.push('Articles détaillés', 'Newsletters');
    }

    return content;
  }

  private static generateDecisionFactors(profile: PersonaProfile): string[] {
    return [
      'Réputation de l\'agence',
      'Expertise locale',
      'Transparence des prix',
      'Qualité du service',
      'Recommandations'
    ];
  }

  private static generateResearchMethods(profile: PersonaProfile): string[] {
    return [
      'Recherche en ligne',
      'Recommandations',
      'Réseaux sociaux',
      'Sites immobiliers spécialisés'
    ];
  }
}