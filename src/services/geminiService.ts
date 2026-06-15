import { api } from '@/lib/api';
import type { SearchIntent, Review, ReputationAnalysis } from '@/types';

export const parseSearchQuery = async (query: string): Promise<SearchIntent> => {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return { trade: null, location: null, keywords: [] };
  }
  try {
    const { data } = await api.post<SearchIntent>('/ai/parse-search', { query });
    return data;
  } catch {
    return { trade: null, location: null, keywords: [] };
  }
};

export const generateReputationSummary = async (
  reviews: Review[]
): Promise<ReputationAnalysis | null> => {
  if (reviews.length === 0) return null;
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return {
      summary: 'Análise indisponível (modo offline).',
      strengths: [],
      weaknesses: [],
    };
  }
  try {
    const { data } = await api.post<ReputationAnalysis | null>('/ai/reputation-summary', { reviews });
    return data;
  } catch {
    return null;
  }
};
