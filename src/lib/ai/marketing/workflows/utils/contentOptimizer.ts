export function optimizeContent(params: {
  currentMetrics: Record<string, number>;
  content: any;
}) {
  const { currentMetrics, content } = params;

  return {
    title: optimizeTitle(content.title, currentMetrics),
    description: optimizeDescription(content.description, currentMetrics),
    callToAction: optimizeCallToAction(content.callToAction, currentMetrics),
    format: suggestBestFormat(currentMetrics)
  };
}

function optimizeTitle(title: string, metrics: Record<string, number>) {
  // Si le CTR est faible, suggérer un titre plus accrocheur
  if (metrics.clickRate < 0.02) {
    return addUrgency(title);
  }
  return title;
}

function optimizeDescription(description: string, metrics: Record<string, number>) {
  // Si l'engagement est faible, rendre la description plus concise
  if (metrics.engagementRate < 0.05) {
    return shortenDescription(description);
  }
  return description;
}

function optimizeCallToAction(cta: string, metrics: Record<string, number>) {
  // Si le taux de conversion est faible, rendre le CTA plus direct
  if (metrics.conversionRate < 0.02) {
    return makeCtaMoreDirect(cta);
  }
  return cta;
}

function suggestBestFormat(metrics: Record<string, number>) {
  // Suggérer le meilleur format en fonction des performances
  if (metrics.videoEngagementRate > metrics.imageEngagementRate) {
    return 'video';
  }
  return 'image';
}

function addUrgency(title: string): string {
  const urgencyPhrases = [
    'Dernière chance !',
    'Offre limitée :',
    'Ne manquez pas :'
  ];
  const prefix = urgencyPhrases[Math.floor(Math.random() * urgencyPhrases.length)];
  return `${prefix} ${title}`;
}

function shortenDescription(description: string): string {
  return description.split('.')[0] + '.';
}

function makeCtaMoreDirect(cta: string): string {
  const directCtas = {
    'En savoir plus': 'Obtenir mon estimation gratuite',
    'Découvrir': 'Je veux vendre maintenant',
    'Contacter': 'Prendre rendez-vous'
  };
  return directCtas[cta as keyof typeof directCtas] || cta;
}