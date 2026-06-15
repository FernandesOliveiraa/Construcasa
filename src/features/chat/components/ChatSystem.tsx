import React, { useState, useEffect, useRef } from 'react';
import { Send, Search, MessageSquare, ArrowLeft, User as UserIcon } from 'lucide-react';
import type { ChatSession, Message, User } from '@/types';

interface ChatSystemProps {
  currentUser: User;
  chats: ChatSession[];
  messages: Message[];
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onSendMessage: (chatId: string, text: string) => void;
  onBack: () => void;
}

export const ChatSystem: React.FC<ChatSystemProps> = ({
  currentUser,
  chats,
  messages,
  activeChatId,
  onSelectChat,
  onSendMessage,
  onBack
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find(c => c.id === activeChatId);

  // Filter chats based on current user role
  const myChats = chats.filter(c => {
    if (currentUser.type === 'client') return c.clientId === currentUser.id;
    const proId = currentUser.professionalProfileId || currentUser.id;
    return c.proId === proId;
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && activeChatId) {
      onSendMessage(activeChatId, inputText);
      setInputText('');
    }
  };

  // Determine the name/avatar of the "other" person in the chat
  const getChatPartner = (chat: ChatSession) => {
    if (currentUser.type === 'client') {
      return { name: chat.proName, avatar: chat.proAvatar, role: 'Profissional' };
    } else {
      return { name: chat.clientName, avatar: null, role: 'Cliente' };
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 h-[calc(100vh-80px)]">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full flex border border-slate-200">

        {/* Sidebar / Chat List */}
        <div className={`${activeChatId ? 'hidden md:flex' : 'flex'} w-full md:w-80 flex-col border-r border-slate-100 bg-slate-50`}>
          <div className="p-4 border-b border-slate-100 bg-white">
            <div className="flex items-center gap-2 mb-4">
              <button onClick={onBack} className="md:hidden p-2 -ml-2 text-slate-500">
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-xl font-bold text-slate-800">Mensagens</h2>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar conversa..."
                className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-orange-500 outline-none"
              />
              <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {myChats.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                <MessageSquare size={32} className="mx-auto mb-2 opacity-20" />
                <p className="text-sm">Nenhuma conversa iniciada.</p>
              </div>
            ) : (
              myChats.map(chat => {
                const partner = getChatPartner(chat);
                return (
                  <div
                    key={chat.id}
                    onClick={() => onSelectChat(chat.id)}
                    className={`p-4 cursor-pointer hover:bg-white transition-colors border-b border-slate-100 last:border-0 ${activeChatId === chat.id ? 'bg-white border-l-4 border-l-orange-500 shadow-sm' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      {partner.avatar ? (
                        <img src={partner.avatar} alt={partner.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">
                          <UserIcon size={20} />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="font-semibold text-slate-900 text-sm truncate">{partner.name}</h4>
                          <span className="text-xs text-slate-400">
                            {new Date(chat.lastMessageTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 truncate">{chat.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div className={`${!activeChatId ? 'hidden md:flex' : 'flex'} flex-1 flex-col bg-slate-100 relative`}>
          {!activeChat ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                <MessageSquare size={48} className="text-orange-200" />
              </div>
              <h3 className="text-lg font-semibold text-slate-600">Selecione uma conversa</h3>
              <p className="text-sm">Escolha um contato à esquerda para começar a conversar.</p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="p-4 bg-white border-b border-slate-200 flex items-center gap-4 shadow-sm z-10">
                <button onClick={() => onSelectChat('')} className="md:hidden text-slate-500">
                  <ArrowLeft size={24} />
                </button>
                {getChatPartner(activeChat).avatar ? (
                    <img src={getChatPartner(activeChat).avatar || ''} alt="" className="w-10 h-10 rounded-full object-cover" />
                ) : (
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">
                        <UserIcon size={20} />
                    </div>
                )}
                <div>
                  <h3 className="font-bold text-slate-900">{getChatPartner(activeChat).name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span> Online agora
                  </p>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                {messages.map((msg) => {
                  const isMe = msg.senderId === currentUser.id;
                  return (
                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] md:max-w-[60%] rounded-2xl px-4 py-3 shadow-sm ${
                        isMe
                          ? 'bg-slate-900 text-white rounded-br-none'
                          : 'bg-white text-slate-800 rounded-bl-none'
                      }`}>
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                        <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-slate-400' : 'text-slate-400'}`}>
                          {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-slate-200">
                <form onSubmit={handleSend} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 bg-slate-100 border-0 rounded-full px-5 py-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/30"
                  >
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
