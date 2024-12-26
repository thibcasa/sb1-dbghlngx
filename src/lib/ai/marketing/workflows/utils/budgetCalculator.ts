export function calculateBudgetDistribution(params: {
  target: number;
  daysRemaining: number;
  historicalCostPerLead?: number;
}) {
  const { target, daysRemaining, historicalCostPerLead = 50 } = params;
  
  // Calculate base budget needed
  const estimatedBudget = target * historicalCostPerLead;
  
  // Distribute budget across stages
  return {
    awareness: estimatedBudget * 0.4,
    engagement: estimatedBudget * 0.4,
    conversion: estimatedBudget * 0.2,
    dailyBudget: estimatedBudget / daysRemaining
  };
}

export function optimizeBudgetAllocation(
  currentMetrics: Record<string, number>,
  currentBudget: number
) {
  const performanceWeights = {
    awareness: currentMetrics.reachRate || 0.5,
    engagement: currentMetrics.engagementRate || 0.5,
    conversion: currentMetrics.conversionRate || 0.5
  };

  // Adjust budget based on performance
  return Object.entries(performanceWeights).reduce((acc, [stage, weight]) => ({
    ...acc,
    [stage]: currentBudget * weight
  }), {});
}