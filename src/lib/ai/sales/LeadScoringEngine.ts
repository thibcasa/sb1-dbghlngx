import type { LeadScore, LeadBehavior, LeadProfile } from './types';

export class LeadScoringEngine {
  static calculateScore(behavior: LeadBehavior, profile: LeadProfile): LeadScore {
    const engagementScore = this.calculateEngagementScore(behavior);
    const fitScore = this.calculateFitScore(profile);
    const intentScore = this.calculateIntentScore(behavior);

    return {
      total: this.weightedAverage([engagementScore, fitScore, intentScore]),
      details: {
        engagement: engagementScore,
        fit: fitScore,
        intent: intentScore
      },
      nextBestAction: this.determineNextBestAction(engagementScore, fitScore, intentScore)
    };
  }

  private static calculateEngagementScore(behavior: LeadBehavior): number {
    const weights = {
      pageViews: 0.2,
      timeOnSite: 0.3,
      interactions: 0.5
    };

    return (
      (behavior.pageViews * weights.pageViews) +
      (behavior.timeOnSite * weights.timeOnSite) +
      (behavior.interactions * weights.interactions)
    );
  }

  private static calculateFitScore(profile: LeadProfile): number {
    // Implémentation du calcul du score d'adéquation
    return 0.85;
  }

  private static calculateIntentScore(behavior: LeadBehavior): number {
    // Implémentation du calcul du score d'intention
    return 0.75;
  }

  private static weightedAverage(scores: number[]): number {
    const weights = [0.4, 0.3, 0.3];
    return scores.reduce((acc, score, i) => acc + score * weights[i], 0);
  }

  private static determineNextBestAction(
    engagement: number,
    fit: number,
    intent: number
  ): string {
    if (engagement < 0.3) return 'nurture';
    if (fit < 0.5) return 'qualify';
    if (intent > 0.8) return 'contact';
    return 'monitor';
  }
}