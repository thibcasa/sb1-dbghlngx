export function optimizeTargeting(params: {
  currentMetrics: Record<string, number>;
  audience: any;
}) {
  const { currentMetrics, audience } = params;
  
  // Ajuster le ciblage en fonction des performances
  const adjustments = {
    ageRange: optimizeAgeRange(currentMetrics, audience),
    interests: optimizeInterests(currentMetrics, audience),
    location: optimizeLocation(currentMetrics, audience)
  };

  return {
    ...audience,
    ...adjustments
  };
}

function optimizeAgeRange(metrics: Record<string, number>, audience: any) {
  // Si le taux de conversion est faible, réduire la plage d'âge
  if (metrics.conversionRate < 0.02) {
    return {
      min: audience.ageRange.min + 5,
      max: audience.ageRange.max - 5
    };
  }
  return audience.ageRange;
}

function optimizeInterests(metrics: Record<string, number>, audience: any) {
  // Garder uniquement les intérêts performants
  return audience.interests.filter((interest: string) => 
    metrics[`interest_${interest}_score`] > 0.5
  );
}

function optimizeLocation(metrics: Record<string, number>, audience: any) {
  // Ajuster le rayon de ciblage en fonction des performances
  const radius = metrics.conversionRate < 0.02 
    ? Math.max(5, audience.radius - 5)
    : audience.radius;

  return {
    ...audience.location,
    radius
  };
}