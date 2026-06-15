import { useState, useEffect, useCallback } from 'react';
import { api, getApiErrorMessage } from '@/lib/api';
import type { User, QuoteRequest, QuoteStatus, Review, Professional } from '@/types';

interface UseQuotesReturn {
  quoteRequests: QuoteRequest[];
  isReviewModalOpen: boolean;
  reviewTargetRequest: QuoteRequest | null;
  isQuoteSuccessOpen: boolean;
  openReviewModal: (request: QuoteRequest) => void;
  closeReviewModal: () => void;
  closeQuoteSuccess: () => void;
  handleSubmitQuote: (
    data: Omit<QuoteRequest, 'id' | 'status' | 'createdAt' | 'clientId' | 'clientName' | 'proId' | 'proName' | 'proAvatar'>,
    currentUser: User,
    selectedPro: Professional
  ) => Promise<void>;
  handleQuoteStatusUpdate: (id: string, status: QuoteStatus, currentUser: User, estimate?: string) => Promise<void>;
  markNotificationAsViewed: (id: string) => Promise<void>;
  handleSubmitReview: (rating: number, text: string, currentUser: User, allPros: Professional[]) => Promise<void>;
}

export function useQuotes(currentUser: User | null): UseQuotesReturn {
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewTargetRequest, setReviewTargetRequest] = useState<QuoteRequest | null>(null);
  const [isQuoteSuccessOpen, setIsQuoteSuccessOpen] = useState(false);

  const fetchQuotes = useCallback(async () => {
    if (!currentUser) {
      setQuoteRequests([]);
      return;
    }
    try {
      const { data } = await api.get<QuoteRequest[]>('/quotes');
      setQuoteRequests(data);
    } catch {
      // silently ignore
    }
  }, [currentUser]);

  useEffect(() => {
    fetchQuotes();
    const interval = setInterval(fetchQuotes, 15_000);
    return () => clearInterval(interval);
  }, [fetchQuotes]);

  const handleSubmitQuote = async (
    data: Omit<QuoteRequest, 'id' | 'status' | 'createdAt' | 'clientId' | 'clientName' | 'proId' | 'proName' | 'proAvatar'>,
    _currentUser: User,
    selectedPro: Professional
  ) => {
    try {
      await api.post('/quotes', { ...data, proId: selectedPro.id });
      setIsQuoteSuccessOpen(true);
      await fetchQuotes();
    } catch (error) {
      throw new Error(getApiErrorMessage(error));
    }
  };

  const handleQuoteStatusUpdate = async (
    id: string,
    status: QuoteStatus,
    currentUser: User,
    estimate?: string
  ) => {
    try {
      const isCompletedByClient = currentUser.type === 'client' && status === 'completed';
      const updateData: Partial<QuoteRequest> = {
        status,
        viewedByPro: !isCompletedByClient,
      };
      if (estimate !== undefined) updateData.priceEstimate = estimate;
      await api.patch(`/quotes/${id}`, updateData);
      await fetchQuotes();
    } catch (error) {
      throw new Error(getApiErrorMessage(error));
    }
  };

  const markNotificationAsViewed = async (id: string) => {
    try {
      await api.patch(`/quotes/${id}`, { viewedByPro: true });
      await fetchQuotes();
    } catch {
      // silently ignore
    }
  };

  const handleSubmitReview = async (
    rating: number,
    text: string,
    currentUser: User,
    _allPros: Professional[]
  ) => {
    if (!reviewTargetRequest) return;
    try {
      await api.post(`/quotes/${reviewTargetRequest.id}/review`, {
        rating,
        text,
        author: currentUser.name,
      });
      setIsReviewModalOpen(false);
      setReviewTargetRequest(null);
      await fetchQuotes();
    } catch (error) {
      throw new Error(getApiErrorMessage(error));
    }
  };

  return {
    quoteRequests,
    isReviewModalOpen,
    reviewTargetRequest,
    isQuoteSuccessOpen,
    openReviewModal: (request) => {
      setReviewTargetRequest(request);
      setIsReviewModalOpen(true);
    },
    closeReviewModal: () => {
      setIsReviewModalOpen(false);
      setReviewTargetRequest(null);
    },
    closeQuoteSuccess: () => setIsQuoteSuccessOpen(false),
    handleSubmitQuote,
    handleQuoteStatusUpdate,
    markNotificationAsViewed,
    handleSubmitReview,
  };
}
