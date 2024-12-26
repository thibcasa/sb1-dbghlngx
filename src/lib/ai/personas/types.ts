export type CampaignType = 'mandate_acquisition' | 'property_valuation';

export interface PersonaConfig {
  campaignType: CampaignType;
  location: string;
  objective: string;
}

export interface PersonaProfile {
  demographics: {
    ageRange: {
      min: number;
      max: number;
    };
    location: string;
    income: {
      min: number;
      max: number;
    };
    occupation: string[];
  };
  psychographics: {
    goals: string[];
    painPoints: string[];
    motivations: string[];
    interests: string[];
  };
}

export interface PersonaBehavior {
  socialNetworks: string[];
  preferredContent: string[];
  decisionFactors: string[];
  researchMethods: string[];
}

export interface PersonaJourney {
  touchpoints: string[];
  objections: string[];
  triggers: string[];
}

export interface Persona extends PersonaProfile {
  id: string;
  behavior: PersonaBehavior;
  journey: PersonaJourney;
  createdAt: Date;
  updatedAt: Date;
}