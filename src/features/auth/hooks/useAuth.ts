import { useState, useEffect, useCallback } from 'react';
import { api, tokenStorage, getApiErrorMessage } from '@/lib/api';
import type { User } from '@/types';

interface AuthTokenResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

interface UseAuthReturn {
  currentUser: User | null;
  isAuthLoading: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleRegister: (name: string, email: string, password: string, type: 'client' | 'professional') => Promise<void>;
  handleLogout: () => Promise<void>;
  handleUpdateProfile: (data: Partial<User>) => Promise<void>;
  authError: string | null;
  clearAuthError: () => void;
}

export function useAuth(): UseAuthReturn {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Ao montar: tenta restaurar sessão via token armazenado
  useEffect(() => {
    const restore = async () => {
      const token = tokenStorage.getAccessToken();
      if (!token) {
        setIsAuthLoading(false);
        return;
      }
      try {
        const { data } = await api.get<User>('/auth/me');
        setCurrentUser(data);
      } catch {
        tokenStorage.clearTokens();
      } finally {
        setIsAuthLoading(false);
      }
    };
    restore();
  }, []);

  // Escuta evento de logout forçado (token expirado e refresh falhou)
  useEffect(() => {
    const onForceLogout = () => {
      setCurrentUser(null);
      tokenStorage.clearTokens();
    };
    window.addEventListener('auth:logout', onForceLogout);
    return () => window.removeEventListener('auth:logout', onForceLogout);
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    setAuthError(null);
    try {
      const { data } = await api.post<AuthTokenResponse>('/auth/login', { email, password });
      tokenStorage.setTokens(data.accessToken, data.refreshToken);
      setCurrentUser(data.user);
      setIsAuthModalOpen(false);
    } catch (error) {
      setAuthError(getApiErrorMessage(error));
    }
  }, []);

  const handleRegister = useCallback(async (name: string, email: string, password: string, type: 'client' | 'professional') => {
    setAuthError(null);
    try {
      const { data } = await api.post<AuthTokenResponse>('/auth/register', { name, email, password, type });
      tokenStorage.setTokens(data.accessToken, data.refreshToken);
      setCurrentUser(data.user);
      setIsAuthModalOpen(false);
    } catch (error) {
      setAuthError(getApiErrorMessage(error));
    }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } catch {
      // silent
    } finally {
      tokenStorage.clearTokens();
      setCurrentUser(null);
    }
  }, []);

  const handleUpdateProfile = useCallback(async (data: Partial<User>) => {
    if (!currentUser) return;
    try {
      const { data: updated } = await api.patch<User>('/auth/me', data);
      setCurrentUser(updated);
    } catch (error) {
      throw new Error(getApiErrorMessage(error));
    }
  }, [currentUser]);

  return {
    currentUser,
    isAuthLoading,
    isAuthModalOpen,
    openAuthModal: () => { setIsAuthModalOpen(true); setAuthError(null); },
    closeAuthModal: () => { setIsAuthModalOpen(false); setAuthError(null); },
    handleLogin,
    handleRegister,
    handleLogout,
    handleUpdateProfile,
    authError,
    clearAuthError: () => setAuthError(null),
  };
}
