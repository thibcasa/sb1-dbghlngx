export interface Persona {
  id: string;
  name: string;
  demographics: {
    ageRange: { min: number; max: number };
    location: string;
    income: { min: number; max: number };
    occupation: string[];
  };
  psychographics: {
    goals: string[];
    painPoints: string[];
    motivations: string[];
    interests: string[];
  };
  behavior: {
    socialNetworks: string[];
    preferredContent: string[];
    decisionFactors: string[];
    researchMethods: string[];
  };
  journey: {
    touchpoints: string[];
    objections: string[];
    triggers: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface PersonaFormData extends Omit<Persona, 'id' | 'createdAt' | 'updatedAt'> {}