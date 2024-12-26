import { supabase } from '@/lib/supabase/client';
import type { PersonaProfile, PersonaConfig } from '../types';

export class PersonaProfileGenerator {
  static async generate(config: PersonaConfig): Promise<PersonaProfile> {
    // Analyser les données historiques
    const historicalData = await this.analyzeHistoricalData(config);
    
    return {
      demographics: this.generateDemographics(config, historicalData),
      psychographics: this.generatePsychographics(config, historicalData)
    };
  }

  private static async analyzeHistoricalData(config: PersonaConfig) {
    const { data } = await supabase
      .from('marketing_analytics')
      .select('metrics, audience')
      .eq('campaign_type', config.campaignType)
      .eq('location', config.location)
      .order('conversion_rate', { ascending: false })
      .limit(10);

    return this.aggregateData(data || []);
  }

  private static generateDemographics(config: PersonaConfig, historicalData: any) {
    return {
      ageRange: this.calculateAgeRange(config, historicalData),
      location: config.location,
      income: this.calculateIncomeRange(config, historicalData),
      occupation: this.selectOccupations(config, historicalData)
    };
  }

  private static generatePsychographics(config: PersonaConfig, historicalData: any) {
    return {
      goals: this.generateGoals(config),
      painPoints: this.generatePainPoints(config),
      motivations: this.generateMotivations(config),
      interests: this.generateInterests(config, historicalData)
    };
  }

  private static calculateAgeRange(config: PersonaConfig, historicalData: any) {
    const baseRange = {
      min: config.campaignType === 'mandate_acquisition' ? 35 : 25,
      max: config.campaignType === 'mandate_acquisition' ? 65 : 55
    };

    if (!historicalData.ageMetrics) return baseRange;

    return {
      min: Math.round((baseRange.min + historicalData.ageMetrics.min) / 2),
      max: Math.round((baseRange.max + historicalData.ageMetrics.max) / 2)
    };
  }

  private static calculateIncomeRange(config: PersonaConfig, historicalData: any) {
    return {
      min: 50000,
      max: 150000
    };
  }

  private static selectOccupations(config: PersonaConfig, historicalData: any) {
    const baseOccupations = [
      'Propriétaire',
      'Investisseur',
      'Cadre supérieur',
      'Profession libérale'
    ];

    return baseOccupations;
  }

  private static generateGoals(config: PersonaConfig) {
    const goals = {
      mandate_acquisition: [
        'Vendre au meilleur prix',
        'Transaction rapide',
        'Service professionnel'
      ],
      property_valuation: [
        'Connaître la valeur de son bien',
        'Préparer une vente future',
        'Optimiser son patrimoine'
      ]
    };

    return goals[config.campaignType] || [];
  }

  private static generatePainPoints(config: PersonaConfig) {
    return [
      'Manque de temps',
      'Incertitude du marché',
      'Processus complexe',
      'Risque de sous-évaluation'
    ];
  }

  private static generateMotivations(config: PersonaConfig) {
    return [
      'Maximiser la valeur',
      'Sécuriser la transaction',
      'Éviter les tracas administratifs',
      'Bénéficier d\'une expertise professionnelle'
    ];
  }

  private static generateInterests(config: PersonaConfig, historicalData: any) {
    return [
      'Immobilier',
      'Investissement',
      'Finance',
      'Architecture',
      'Décoration'
    ];
  }

  private static aggregateData(data: any[]) {
    return {
      ageMetrics: this.aggregateAgeMetrics(data),
      conversionRates: this.aggregateConversionRates(data),
      commonInterests: this.aggregateInterests(data)
    };
  }

  private static aggregateAgeMetrics(data: any[]) {
    const ages = data.map(d => d.audience?.ageRange).filter(Boolean);
    if (ages.length === 0) return null;

    return {
      min: Math.min(...ages.map(a => a.min)),
      max: Math.max(...ages.map(a => a.max))
    };
  }

  private static aggregateConversionRates(data: any[]) {
    return data.reduce((acc, d) => ({
      ...acc,
      [d.audience?.type]: (acc[d.audience?.type] || 0) + d.metrics.conversionRate
    }), {});
  }

  private static aggregateInterests(data: any[]) {
    return Array.from(new Set(
      data.flatMap(d => d.audience?.interests || [])
    ));
  }
}