import { supabase } from '@/lib/supabase/client';
import type { Persona, PersonaAnalytics } from './types';

export class PersonaAnalyzer {
  static async analyzePersona(personaId: string): Promise<PersonaAnalytics> {
    const { data: persona } = await supabase
      .from('personas')
      .select('*')
      .eq('id', personaId)
      .single();

    const performance = await this.analyzePerformance(personaId);
    const insights = this.generateInsights(persona, performance);
    const recommendations = this.generateRecommendations(insights);

    return {
      metrics: performance,
      insights,
      recommendations
    };
  }

  private static async analyzePerformance(personaId: string) {
    const { data: campaigns } = await supabase
      .from('persona_campaigns')
      .select('performance_metrics')
      .eq('persona_id', personaId);

    return this.calculateAverageMetrics(campaigns || []);
  }

  private static calculateAverageMetrics(campaigns: any[]) {
    const metrics = campaigns.map(c => c.performance_metrics);
    return {
      conversionRate: this.average(metrics.map(m => m.conversionRate)),
      engagementRate: this.average(metrics.map(m => m.engagementRate)),
      costPerLead: this.average(metrics.map(m => m.costPerLead))
    };
  }

  private static generateInsights(persona: Persona, performance: any) {
    const insights: string[] = [];

    // Analyser les performances par canal
    persona.behavior.socialNetworks.forEach(network => {
      const channelPerformance = this.analyzeChannelPerformance(network, performance);
      insights.push(channelPerformance);
    });

    // Analyser l'adéquation avec le contenu
    persona.behavior.preferredContent.forEach(contentType => {
      const contentInsight = this.analyzeContentPreference(contentType, performance);
      insights.push(contentInsight);
    });

    return insights;
  }

  private static generateRecommendations(insights: string[]) {
    return insights.map(insight => ({
      type: this.categorizeInsight(insight),
      message: this.formatRecommendation(insight),
      priority: this.determinePriority(insight)
    }));
  }

  private static average(values: number[]) {
    return values.reduce((a, b) => a + b, 0) / values.length;
  }

  private static analyzeChannelPerformance(channel: string, performance: any) {
    return `Le canal ${channel} montre un taux de conversion de ${performance.conversionRate}%`;
  }

  private static analyzeContentPreference(contentType: string, performance: any) {
    return `Le contenu de type ${contentType} génère un engagement de ${performance.engagementRate}%`;
  }

  private static categorizeInsight(insight: string) {
    if (insight.includes('conversion')) return 'conversion';
    if (insight.includes('engagement')) return 'engagement';
    return 'general';
  }

  private static formatRecommendation(insight: string) {
    if (insight.includes('faible')) {
      return `Optimiser ${insight.split(' ')[2]} pour améliorer les performances`;
    }
    return `Continuer à exploiter ${insight.split(' ')[2]} qui performe bien`;
  }

  private static determinePriority(insight: string): 'high' | 'medium' | 'low' {
    if (insight.includes('faible')) return 'high';
    if (insight.includes('moyen')) return 'medium';
    return 'low';
  }
}