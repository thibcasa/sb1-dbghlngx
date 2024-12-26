import type { PageSpeedMetrics } from '../types';

const API_KEY = process.env.VITE_PAGESPEED_API_KEY;
const API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

export async function fetchPageSpeedMetrics(url: string): Promise<PageSpeedMetrics['metrics']> {
  try {
    const response = await fetch(
      `${API_URL}?url=${encodeURIComponent(url)}&key=${API_KEY}&strategy=mobile`
    );

    if (!response.ok) {
      throw new Error('PageSpeed API request failed');
    }

    const data = await response.json();
    
    return {
      FCP: data.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.percentile,
      LCP: data.loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS.percentile,
      FID: data.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.percentile,
      CLS: data.loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile,
      TTI: data.loadingExperience.metrics.INTERACTIVE.percentile,
      performance_score: data.lighthouseResult.categories.performance.score * 100
    };
  } catch (error) {
    console.error('PageSpeed API Error:', error);
    throw error;
  }
}