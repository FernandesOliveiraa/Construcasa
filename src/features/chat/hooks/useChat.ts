import { useState, useEffect, useCallback } from 'react';
import { api, getApiErrorMessage } from '@/lib/api';
import type { User, Professional, ChatSession, Message } from '@/types';

interface UseChatReturn {
  chatSessions: ChatSession[];
  activeChatId: string | null;
  activeMessages: Message[];
  setActiveChatId: (id: string | null) => void;
  handleSendMessage: (chatId: string, text: string, currentUser: User) => Promise<void>;
  handleStartChat: (pro: Professional, currentUser: User) => Promise<string>;
  isLoadingMessages: boolean;
}

export function useChat(currentUser: User | null): UseChatReturn {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatIdState] = useState<string | null>(null);
  const [activeMessages, setActiveMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  // Polling de sessões (a cada 10s)
  const fetchSessions = useCallback(async () => {
    if (!currentUser) { setChatSessions([]); return; }
    try {
      const { data } = await api.get<ChatSession[]>('/chats');
      setChatSessions(data);
    } catch {
      // silently ignore
    }
  }, [currentUser]);

  useEffect(() => {
    fetchSessions();
    const interval = setInterval(fetchSessions, 10_000);
    return () => clearInterval(interval);
  }, [fetchSessions]);

  // Polling de mensagens do chat ativo (a cada 3s)
  const fetchMessages = useCallback(async (chatId: string) => {
    try {
      const { data } = await api.get<Message[]>(`/chats/${chatId}/messages`);
      setActiveMessages(data);
    } catch {
      // silently ignore
    }
  }, []);

  useEffect(() => {
    if (!activeChatId) { setActiveMessages([]); return; }
    setIsLoadingMessages(true);
    fetchMessages(activeChatId).finally(() => setIsLoadingMessages(false));
    const interval = setInterval(() => fetchMessages(activeChatId), 3_000);
    return () => clearInterval(interval);
  }, [activeChatId, fetchMessages]);

  const setActiveChatId = (id: string | null) => {
    setActiveChatIdState(id);
    setActiveMessages([]);
  };

  const handleSendMessage = async (chatId: string, text: string, _currentUser: User) => {
    try {
      const { data: message } = await api.post<Message>(`/chats/${chatId}/messages`, { text });
      setActiveMessages((prev) => [...prev, message]);
      await fetchSessions();
    } catch (error) {
      throw new Error(getApiErrorMessage(error));
    }
  };

  const handleStartChat = async (pro: Professional, _currentUser: User): Promise<string> => {
    try {
      // O backend usa o professionalProfileId do usuário para encontrar o proUserId
      const { data: session } = await api.post<ChatSession>('/chats', { proUserId: pro.id });
      await fetchSessions();
      return session.id;
    } catch (error) {
      throw new Error(getApiErrorMessage(error));
    }
  };

  return {
    chatSessions,
    activeChatId,
    activeMessages,
    setActiveChatId,
    handleSendMessage,
    handleStartChat,
    isLoadingMessages,
  };
}
