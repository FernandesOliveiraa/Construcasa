import { useState, useEffect, useMemo, useCallback, type Dispatch, type SetStateAction } from 'react';
import { api, getApiErrorMessage } from '@/lib/api';
import type { Professional, SearchFiltersState, SearchIntent, Trade, User } from '@/types';

interface UseProfessionalsReturn {
  allPros: Professional[];
  displayedPros: Professional[];
  isSearching: boolean;
  searchIntent: SearchIntent | null;
  filters: SearchFiltersState;
  setFilters: Dispatch<SetStateAction<SearchFiltersState>>;
  clearSearch: () => void;
  handleSearch: (query: string) => Promise<void>;
  handleCreateOrUpdateProfile: (proData: Professional, currentUser: User) => Promise<void>;
}

const DEFAULT_FILTERS: SearchFiltersState = {
  trade: '',
  minRating: 0,
  maxPrice: 500,
  sortBy: 'recommended',
};

export function useProfessionals(): UseProfessionalsReturn {
  const [allPros, setAllPros] = useState<Professional[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchIntent, setSearchIntent] = useState<SearchIntent | null>(null);
  const [filters, setFilters] = useState<SearchFiltersState>(DEFAULT_FILTERS);

  const fetchProfessionals = useCallback(async () => {
    try {
      const { data } = await api.get<Professional[]>('/professionals');
      setAllPros(data);
    } catch {
      // silently ignore polling errors
    }
  }, []);

  useEffect(() => {
    fetchProfessionals();
    const interval = setInterval(fetchProfessionals, 30_000);
    return () => clearInterval(interval);
  }, [fetchProfessionals]);

  const displayedPros = useMemo(() => {
    let result = [...allPros];

    if (searchIntent) {
      if (searchIntent.trade && searchIntent.trade !== 'Geral') {
        result = result.filter((p) => p.trade.includes(searchIntent.trade as Trade));
      }
      if (searchIntent.location) {
        const loc = searchIntent.location.toLowerCase();
        result = result.filter((p) => p.location.toLowerCase().includes(loc));
      }
      if (searchIntent.keywords.length > 0 && result.length === allPros.length) {
        result = result.filter((p) =>
          searchIntent.keywords.some(
            (k) =>
              p.bio.toLowerCase().includes(k.toLowerCase()) ||
              p.name.toLowerCase().includes(k.toLowerCase())
          )
        );
      }
    }

    if (filters.trade) {
      result = result.filter((p) => p.trade.includes(filters.trade as Trade));
    }
    if (filters.minRating > 0) {
      result = result.filter((p) => {
        const avg =
          p.reviews.length > 0
            ? p.reviews.reduce((a, b) => a + b.rating, 0) / p.reviews.length
            : 0;
        return avg >= filters.minRating;
      });
    }
    if (filters.maxPrice < 500) {
      result = result.filter((p) => p.hourlyRateValue <= filters.maxPrice);
    }

    switch (filters.sortBy) {
      case 'priceAsc':
        result.sort((a, b) => a.hourlyRateValue - b.hourlyRateValue);
        break;
      case 'priceDesc':
        result.sort((a, b) => b.hourlyRateValue - a.hourlyRateValue);
        break;
      case 'rating':
        result.sort((a, b) => {
          const avgA = a.reviews.length ? a.reviews.reduce((s, r) => s + r.rating, 0) / a.reviews.length : 0;
          const avgB = b.reviews.length ? b.reviews.reduce((s, r) => s + r.rating, 0) / b.reviews.length : 0;
          return avgB - avgA;
        });
        break;
    }

    return result;
  }, [allPros, searchIntent, filters]);

  const handleSearch = async (searchQuery: string) => {
    setIsSearching(true);
    setFilters((prev) => ({ ...prev, trade: '', minRating: 0 }));
    try {
      const { data } = await api.post<SearchIntent>('/ai/parse-search', { query: searchQuery });
      setSearchIntent(data);
    } catch {
      setSearchIntent({ trade: null, location: null, keywords: searchQuery.split(' ') });
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchIntent(null);
    setFilters(DEFAULT_FILTERS);
  };

  const handleCreateOrUpdateProfile = async (proData: Professional, _currentUser: User) => {
    try {
      await api.post('/professionals', proData);
      await fetchProfessionals();
    } catch (error) {
      throw new Error(getApiErrorMessage(error));
    }
  };

  return {
    allPros,
    displayedPros,
    isSearching,
    searchIntent,
    filters,
    setFilters,
    clearSearch,
    handleSearch,
    handleCreateOrUpdateProfile,
  };
}
