export function formatEngagementScore(score: number): string {
  return `${(score * 100).toFixed(1)}%`;
}

export function formatSeoScore(score: number): string {
  return `${score}/100`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}