export type ID = string;

export enum Trade {
  PEDREIRO = 'Pedreiro',
  ELETRICISTA = 'Eletricista',
  ENCANADOR = 'Encanador',
  PINTOR = 'Pintor',
  ARQUITETO = 'Arquiteto',
  MARCENEIRO = 'Marceneiro',
  GERAL = 'Geral',
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface ReputationAnalysis {
  summary: string;
  strengths: string[];
  weaknesses: string[];
}

export interface Professional {
  id: string;
  name: string;
  trade: Trade[];
  location: string;
  avatar: string;
  bio: string;
  yearsExperience: number;
  verified: boolean;
  certifications: string[];
  portfolio: string[];
  reviews: Review[];
  hourlyRate: string;
  hourlyRateValue: number;
  availability: 'Disponível' | 'Agenda Cheia' | 'Consulte';
}

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'client' | 'professional';
  professionalProfileId?: string;
  avatar?: string;
  phone?: string;
  location?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type QuoteStatus = 'pending' | 'accepted' | 'rejected' | 'completed';

export interface QuoteRequest {
  id: string;
  clientId: string;
  clientName: string;
  proId: string;
  proName: string;
  proAvatar: string;
  title: string;
  description: string;
  location: string;
  preferredDate: string;
  images: string[];
  status: QuoteStatus;
  createdAt: string;
  priceEstimate?: string;
  hasReviewed?: boolean;
  viewedByPro?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  clientId: string;
  clientName: string;
  proId: string;
  proName: string;
  proAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
}

export interface SearchIntent {
  trade: Trade | null;
  location: string | null;
  keywords: string[];
}

export interface SearchFiltersState {
  trade: string;
  minRating: number;
  maxPrice: number;
  sortBy: 'recommended' | 'priceAsc' | 'priceDesc' | 'rating';
}
