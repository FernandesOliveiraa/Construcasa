import type { Professional, Review } from '@/types';

export function getAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function getProfessionalById(
  professionals: Professional[],
  id: string
): Professional | undefined {
  return professionals.find((p) => p.id === id);
}

export function buildChatSessionId(userId1: string, userId2: string): string {
  return [userId1, userId2].sort().join('_');
}
