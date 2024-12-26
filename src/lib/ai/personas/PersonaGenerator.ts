import { supabase } from '@/lib/supabase/client';
import type { Persona, CampaignType } from './types';

export class PersonaGenerator {
  static async generatePersona(params: {
    campaignType: CampaignType;
    location: string;
    objective: string;
  }): Promise<Persona> {
    // Analyser les données historiques pour affiner le persona
    const historicalData = await this.analyzeHistoricalData(params);
    
    // Générer le persona de base
    const basePersona = this.createBasePersona(params);
    
    // Enrichir avec les données historiques
    const enrichedPersona = this.enrichPersonaWithData(basePersona, historicalData);
    
    // Sauvegarder le persona
    const { data: persona } = await supabase
      .from('personas')
      .insert(enrichedPersona)
      .select()
      .single();

    return persona;
  }

  private static async analyzeHistoricalData(params: any) {
    const { data } = await supabase
      .from('marketing_analytics')
      .select('metrics, audience')
      .eq('location', params.location)
      .eq('campaign_type', params.campaignType)
      .order('conversion_rate', { ascending: false })
      .limit(10);

    return this.aggregateHistoricalData(data || []);
  }

  private static createBasePersona(params: any): Partial<Persona> {
    const personaTemplates = {
      mandate_acquisition: {
        demographics: {
          ageRange: { min: 45, max: 65 },
          income: { min: 50000, max: 150000 },
          occupation: ['Propriétaire', 'Investisseur', 'Cadre supérieur']
        },
        psychographics: {
          goals: ['Vendre au meilleur prix', 'Transaction rapide', 'Service professionnel'],
          painPoints: ['Manque de temps', 'Incertitude du marché', 'Processus complexe'],
          motivations: ['Maximiser la valeur', 'Sécuriser la transaction', 'Éviter les tracas']
        },
        behavior: {
          socialNetworks: ['Facebook', 'LinkedIn'],
          preferredContent: ['Articles immobiliers', 'Vidéos explicatives', 'Témoignages'],
          decisionFactors: ['Réputation', 'Expertise locale', 'Transparence']
        }
      },
      // Autres templates...
    };

    return {
      name: `Persona ${params.campaignType} - ${params.location}`,
      ...personaTemplates[params.campaignType as keyof typeof personaTemplates]
    };
  }

  private static enrichPersonaWithData(
    basePersona: Partial<Persona>, 
    historicalData: any
  ): Partial<Persona> {
    return {
      ...basePersona,
      demographics: {
        ...basePersona.demographics,
        ageRange: this.optimizeAgeRange(
          basePersona.demographics?.ageRange,
          historicalData.bestPerformingAges
        )
      },
      behavior: {
        ...basePersona.behavior,
        socialNetworks: this.optimizeChannels(
          basePersona.behavior?.socialNetworks || [],
          historicalData.bestPerformingChannels
        )
      }
    };
  }

  private static aggregateHistoricalData(data: any[]) {
    return {
      bestPerformingAges: this.analyzeBestPerformingAges(data),
      bestPerformingChannels: this.analyzeBestPerformingChannels(data)
    };
  }

  private static analyzeBestPerformingAges(data: any[]) {
    // Analyser les tranches d'âge les plus performantes
    const ageRanges = data.map(d => d.audience.ageRange);
    return {
      min: Math.min(...ageRanges.map(r => r.min)),
      max: Math.max(...ageRanges.map(r => r.max))
    };
  }

  private static analyzeBestPerformingChannels(data: any[]) {
    // Identifier les canaux les plus performants
    const channels = data.flatMap(d => d.audience.channels);
    return Array.from(new Set(channels));
  }

  private static optimizeAgeRange(
    baseRange: { min: number; max: number } | undefined,
    historicalRange: { min: number; max: number }
  ) {
    if (!baseRange) return historicalRange;
    return {
      min: Math.round((baseRange.min + historicalRange.min) / 2),
      max: Math.round((baseRange.max + historicalRange.max) / 2)
    };
  }

  private static optimizeChannels(
    baseChannels: string[],
    historicalChannels: string[]
  ) {
    return Array.from(new Set([...baseChannels, ...historicalChannels]));
  }
}