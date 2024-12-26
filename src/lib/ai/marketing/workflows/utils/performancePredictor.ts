export function predictPerformance(params: {
  audience: any;
  content: any;
  historicalData?: Record<string, number>;
}) {
  const { audience, content, historicalData = {} } = params;

  return {
    expectedReach: predictReach(audience, historicalData),
    expectedEngagement: predictEngagement(content, historicalData),
    expectedConversion: predictConversion(audience, content, historicalData),
    suggestedBudget: calculateSuggestedBudget(historicalData)
  };
}

function predictReach(audience: any, historicalData: Record<string, number>) {
  const baseReach = historicalData.averageReach || 1000;
  const locationMultiplier = getLocationMultiplier(audience.location);
  const audienceMultiplier = getAudienceMultiplier(audience);

  return Math.round(baseReach * locationMultiplier * audienceMultiplier);
}

function predictEngagement(content: any, historicalData: Record<string, number>) {
  const baseEngagement = historicalData.averageEngagement || 0.02;
  const contentMultiplier = getContentMultiplier(content);

  return baseEngagement * contentMultiplier;
}

function predictConversion(
  audience: any,
  content: any,
  historicalData: Record<string, number>
) {
  const baseConversion = historicalData.averageConversion || 0.01;
  const audienceMultiplier = getAudienceMultiplier(audience);
  const contentMultiplier = getContentMultiplier(content);

  return baseConversion * audienceMultiplier * contentMultiplier;
}

function calculateSuggestedBudget(historicalData: Record<string, number>) {
  const baseBudget = historicalData.averageBudget || 500;
  const performanceMultiplier = getPerformanceMultiplier(historicalData);

  return Math.round(baseBudget * performanceMultiplier);
}

function getLocationMultiplier(location: string): number {
  const locationFactors = {
    'Nice': 1.2,
    'Paris': 1.5,
    'Lyon': 1.3,
    'Marseille': 1.2
  };
  return locationFactors[location as keyof typeof locationFactors] || 1;
}

function getAudienceMultiplier(audience: any): number {
  // Calculer un multiplicateur basé sur la qualité de l'audience
  return 1 + (audience.interests?.length || 0) * 0.1;
}

function getContentMultiplier(content: any): number {
  // Calculer un multiplicateur basé sur la qualité du contenu
  const hasVideo = content.format === 'video' ? 1.2 : 1;
  const hasImage = content.format === 'image' ? 1.1 : 1;
  return hasVideo * hasImage;
}

function getPerformanceMultiplier(historicalData: Record<string, number>): number {
  // Ajuster le budget en fonction des performances historiques
  if (historicalData.roi > 2) return 1.2;
  if (historicalData.roi < 1) return 0.8;
  return 1;
}