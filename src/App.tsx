import React, { useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import { Filter } from 'lucide-react';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { useProfessionals } from '@/features/professionals/hooks/useProfessionals';
import { useQuotes } from '@/features/quotes/hooks/useQuotes';
import { useChat } from '@/features/chat/hooks/useChat';

import { AuthModal } from '@/features/auth/components/AuthModal';
import { ProfessionalCard } from '@/features/professionals/components/ProfessionalCard';
import { ProfessionalProfile } from '@/features/professionals/components/ProfessionalProfile';
import { SearchFilters } from '@/features/professionals/components/SearchFilters';
import { JoinForm } from '@/features/professionals/components/JoinForm';
import { QuoteRequestForm } from '@/features/quotes/components/QuoteRequestForm';
import { QuoteSuccessModal } from '@/features/quotes/components/QuoteSuccessModal';
import { ReviewModal } from '@/features/quotes/components/ReviewModal';
import { ChatSystem } from '@/features/chat/components/ChatSystem';
import { ClientDashboard } from '@/features/dashboard/components/ClientDashboard';
import { ProfessionalDashboard } from '@/features/dashboard/components/ProfessionalDashboard';
import { NavBar } from '@/components/layout/NavBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/shared/Hero';
import { BrandBar } from '@/components/shared/BrandBar';
import { Testimonials } from '@/components/shared/Testimonials';
import { FAQ } from '@/components/shared/FAQ';
// Páginas — Institucionais
import SobrePage from '@/pages/SobrePage';
import ImprensaPage from '@/pages/ImprensaPage';
import CarreirasPage from '@/pages/CarreirasPage';
import ContatoPage from '@/pages/ContatoPage';

// Páginas — Legal
import TermosPage from '@/pages/TermosPage';
import PrivacidadePage from '@/pages/PrivacidadePage';
import AcessibilidadePage from '@/pages/AcessibilidadePage';
import SatisfacaoGarantidaPage from '@/pages/SatisfacaoGarantidaPage';

// Páginas — Editorial
import BlogPage from '@/pages/BlogPage';
import ArtigosPage from '@/pages/ArtigosPage';
import GuiasPage from '@/pages/GuiasPage';
import GuiaDetalhePage from '@/pages/GuiaDetalhePage';

// Páginas — Produto
import PlanosPage from '@/pages/PlanosPage';
import AppPage from '@/pages/AppPage';
import CalculadoraPage from '@/pages/CalculadoraPage';

// Páginas — Serviços
import ServicosPage from '@/pages/ServicosPage';
import ServicosCategoriaPage from '@/pages/ServicosCategoriaPage';
import ConfiguracoesPage from '@/pages/ConfiguracoesPage';
import PopularServices from '@/components/shared/PopularServices';
import CostGuides from '@/components/shared/CostGuides';
import NewsletterSection from '@/components/shared/NewsletterSection';

import type { Professional, User, ChatSession, QuoteRequest, Message } from '@/types';

type QuoteSubmitData = Omit<QuoteRequest, 'id' | 'status' | 'createdAt' | 'clientId' | 'clientName' | 'proId' | 'proName' | 'proAvatar'>;

interface ProfileRouteProps {
  allPros: Professional[];
  currentUser: User | null;
  onRequireAuth: () => void;
  onStartChat: (pro: Professional) => Promise<void>;
}

function ProfileRoute({ allPros, currentUser, onRequireAuth, onStartChat }: ProfileRouteProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pro = allPros.find((p) => p.id === id);

  if (!pro && allPros.length > 0) {
    return <div className="text-center py-20">Profissional não encontrado.</div>;
  }
  if (!pro) {
    return <div className="text-center py-20">Carregando perfil...</div>;
  }

  return (
    <ProfessionalProfile
      pro={pro}
      onBack={() => navigate(-1)}
      currentUser={currentUser}
      onRequireAuth={onRequireAuth}
      onRequestQuote={() => navigate(`/quote-request/${pro.id}`)}
      onStartChat={() => onStartChat(pro)}
    />
  );
}

interface QuoteRequestRouteProps {
  allPros: Professional[];
  currentUser: User | null;
  onSubmit: (data: QuoteSubmitData, pro: Professional) => Promise<void>;
}

function QuoteRequestRoute({ allPros, currentUser, onSubmit }: QuoteRequestRouteProps) {
  const { proId } = useParams<{ proId: string }>();
  const navigate = useNavigate();
  const pro = allPros.find((p) => p.id === proId);

  if (!pro && allPros.length > 0) {
    return <div className="text-center py-20">Profissional não encontrado.</div>;
  }
  if (!pro) {
    return <div className="text-center py-20">Carregando formulário...</div>;
  }

  return (
    <QuoteRequestForm
      pro={pro}
      onBack={() => navigate(-1)}
      onSubmit={(data) => onSubmit(data, pro)}
    />
  );
}

interface MessagesRouteProps {
  currentUser: User | null;
  chatSessions: ChatSession[];
  messages: Message[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onSendMessage: (chatId: string, text: string) => Promise<void>;
}

function MessagesRoute({ currentUser, chatSessions, messages, activeChatId, onSelectChat, onSendMessage }: MessagesRouteProps) {
  const { chatId } = useParams<{ chatId?: string }>();
  const navigate = useNavigate();

  if (!currentUser) {
    return <div className="text-center py-20">Faça login para ver suas mensagens.</div>;
  }

  return (
    <ChatSystem
      currentUser={currentUser}
      chats={chatSessions}
      messages={messages}
      activeChatId={chatId ?? activeChatId}
      onSelectChat={(id) => { onSelectChat(id); navigate(`/messages/${id}`); }}
      onSendMessage={onSendMessage}
      onBack={() => navigate(-1)}
    />
  );
}

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const auth = useAuth();
  const { currentUser, isAuthModalOpen, openAuthModal, closeAuthModal, handleLogin, handleRegister, handleLogout, handleUpdateProfile, authError } = auth;

  const professionals = useProfessionals();
  const { allPros, displayedPros, isSearching, searchIntent, filters, setFilters, clearSearch, handleSearch, handleCreateOrUpdateProfile } = professionals;

  const quotes = useQuotes(currentUser);
  const { quoteRequests, isReviewModalOpen, reviewTargetRequest, isQuoteSuccessOpen, openReviewModal, closeReviewModal, closeQuoteSuccess, handleQuoteStatusUpdate, markNotificationAsViewed, handleSubmitReview } = quotes;

  const chat = useChat(currentUser);
  const { chatSessions, activeMessages, setActiveChatId } = chat;

  const currentView = location.pathname.split('/')[1] || 'home';
  const isHomePage = location.pathname === '/' && !searchIntent;

  const handleGoHome = useCallback(() => {
    navigate('/');
    clearSearch();
  }, [navigate, clearSearch]);

  const handleProfessionalJoinClick = useCallback(() => {
    if (currentUser?.type === 'professional') {
      navigate('/join');
    } else {
      openAuthModal();
    }
  }, [currentUser, navigate, openAuthModal]);

  return (
    <div className="min-h-screen bg-cream font-sans text-navy flex flex-col">
      <NavBar
        onGoHome={handleGoHome}
        onJoin={handleProfessionalJoinClick}
        onDashboard={() => navigate('/dashboard')}
        currentUser={currentUser}
        onOpenAuth={openAuthModal}
        onLogout={handleLogout}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        onLogin={handleLogin}
        onRegister={handleRegister}
        authError={authError}
      />

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={closeReviewModal}
        onSubmit={(rating, text) => {
          if (currentUser) handleSubmitReview(rating, text, currentUser, allPros);
        }}
        proName={reviewTargetRequest?.proName ?? ''}
        proAvatar={reviewTargetRequest?.proAvatar}
      />

      <QuoteSuccessModal
        isOpen={isQuoteSuccessOpen}
        onClose={() => { closeQuoteSuccess(); navigate('/'); }}
        onGoToDashboard={() => { closeQuoteSuccess(); navigate('/dashboard'); }}
      />

      <Routes>
        <Route path="/faq" element={<FAQ onBack={() => navigate(-1)} />} />

        <Route
          path="/join"
          element={
            <JoinForm
              onClose={() => navigate(-1)}
              onSubmit={async (proData) => {
                if (!currentUser) return;
                await handleCreateOrUpdateProfile(proData, currentUser);
                navigate('/dashboard');
              }}
              initialData={
                currentUser?.type === 'professional' && currentUser.professionalProfileId
                  ? allPros.find((p) => p.id === currentUser.professionalProfileId)
                  : undefined
              }
              currentUser={currentUser}
            />
          }
        />

        <Route
          path="/profile/:id"
          element={
            <ProfileRoute
              allPros={allPros}
              currentUser={currentUser}
              onRequireAuth={openAuthModal}
              onStartChat={async (pro) => {
                if (!currentUser) return;
                const sessionId = await chat.handleStartChat(pro, currentUser);
                setActiveChatId(sessionId);
                navigate(`/messages/${sessionId}`);
              }}
            />
          }
        />

        <Route
          path="/quote-request/:proId"
          element={
            <QuoteRequestRoute
              allPros={allPros}
              currentUser={currentUser}
              onSubmit={async (data, pro) => {
                if (!currentUser) return;
                await quotes.handleSubmitQuote(data, currentUser, pro);
              }}
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            !currentUser ? (
              <div className="text-center py-20">Faça login para ver seu painel.</div>
            ) : currentUser.type === 'client' ? (
              <ClientDashboard
                currentUser={currentUser}
                requests={quoteRequests.filter((q) => q.clientId === currentUser.id)}
                onReviewClick={openReviewModal}
                onUpdateUser={handleUpdateProfile}
                onUpdateQuoteStatus={(id, status, estimate) =>
                  handleQuoteStatusUpdate(id, status, currentUser, estimate)
                }
              />
            ) : (
              <ProfessionalDashboard
                currentUser={currentUser}
                requests={quoteRequests.filter(
                  (q) => q.proId === (currentUser.professionalProfileId ?? currentUser.id)
                )}
                onUpdateStatus={(id, status, estimate) =>
                  handleQuoteStatusUpdate(id, status, currentUser, estimate)
                }
                onMarkViewed={markNotificationAsViewed}
                onEditProfile={() => navigate('/join')}
              />
            )
          }
        />

        <Route
          path="/messages"
          element={
            <MessagesRoute
              currentUser={currentUser}
              chatSessions={chatSessions}
              messages={activeMessages}
              activeChatId={chat.activeChatId}
              onSelectChat={(id) => setActiveChatId(id)}
              onSendMessage={(chatId, text) =>
                currentUser ? chat.handleSendMessage(chatId, text, currentUser) : Promise.resolve()
              }
            />
          }
        />
        <Route
          path="/messages/:chatId"
          element={
            <MessagesRoute
              currentUser={currentUser}
              chatSessions={chatSessions}
              messages={activeMessages}
              activeChatId={chat.activeChatId}
              onSelectChat={(id) => setActiveChatId(id)}
              onSendMessage={(chatId, text) =>
                currentUser ? chat.handleSendMessage(chatId, text, currentUser) : Promise.resolve()
              }
            />
          }
        />

        {/* ── Páginas completas ── */}
        <Route path="/sobre"                element={<SobrePage />} />
        <Route path="/blog"                 element={<BlogPage />} />
        <Route path="/imprensa"             element={<ImprensaPage />} />
        <Route path="/carreiras"            element={<CarreirasPage />} />
        <Route path="/contato"              element={<ContatoPage />} />
        <Route path="/planos"               element={<PlanosPage />} />
        <Route path="/guias"                element={<GuiasPage />} />
        <Route path="/guias/:slug"          element={<GuiaDetalhePage />} />
        <Route path="/configuracoes"        element={<ConfiguracoesPage currentUser={currentUser} onUpdateUser={handleUpdateProfile} />} />
        <Route path="/satisfacao-garantida" element={<SatisfacaoGarantidaPage />} />
        <Route path="/termos"               element={<TermosPage />} />
        <Route path="/privacidade"          element={<PrivacidadePage />} />
        <Route path="/app"                  element={<AppPage />} />
        <Route path="/acessibilidade"       element={<AcessibilidadePage />} />
        <Route path="/artigos"              element={<ArtigosPage />} />
        <Route path="/artigos/:slug"        element={<ArtigosPage />} />
        <Route path="/calculadora"          element={<CalculadoraPage />} />
        <Route path="/servicos"             element={<ServicosPage />} />
        <Route path="/servicos/:categoria"  element={<ServicosCategoriaPage />} />

        <Route
          path="*"
          element={
            <>
              {isHomePage && (
                <>
                  <Hero onSearch={handleSearch} isSearching={isSearching} />
                  <BrandBar />
                  <PopularServices />
                </>
              )}

              <main className="container mx-auto px-4 py-20 flex-grow pb-24 md:pb-8">
                {(location.pathname === '/search' || searchIntent) && (
                  <div className="mb-12">
                    <h2 className="text-4xl font-display font-bold mb-4 text-slate-900">
                      {searchIntent ? 'RESULTADOS DA BUSCA' : 'TODOS OS PROFISSIONAIS'}
                    </h2>
                    {searchIntent?.trade && (
                      <div className="flex gap-2">
                        <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-wider">
                          <Filter size={14} />
                          {searchIntent.trade}
                        </span>
                        {searchIntent.location && (
                          <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider">
                            {searchIntent.location}
                          </span>
                        )}
                        <button
                          onClick={clearSearch}
                          className="text-xs text-slate-400 font-bold hover:text-brand transition-colors ml-4 uppercase tracking-widest"
                        >
                          Limpar busca
                        </button>
                      </div>
                    )}
                    {isSearching && (
                      <p className="text-slate-500 mt-6 animate-pulse text-lg">
                        Nossa IA está encontrando o melhor profissional para você...
                      </p>
                    )}
                  </div>
                )}

                {isHomePage && (
                  <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-l-4 border-brand pl-6">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-2">
                        PROFISSIONAIS EM DESTAQUE
                      </h2>
                      <p className="text-slate-500 font-medium tracking-wide">
                        Os mais bem avaliados pela nossa comunidade nesta semana
                      </p>
                    </div>
                    <button
                      onClick={() => navigate('/search')}
                      className="text-brand font-bold text-sm uppercase tracking-widest hover:translate-x-2 transition-transform mt-4 md:mt-0"
                    >
                      Ver Todos →
                    </button>
                  </div>
                )}

                <div className="flex flex-col lg:flex-row gap-12 items-start">
                  <div className="w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-28">
                    <SearchFilters filters={filters} onChange={setFilters} />
                  </div>
                  <div className="flex-grow w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                      {displayedPros.length > 0 ? (
                        displayedPros.map((pro) => (
                          <ProfessionalCard
                            key={pro.id}
                            pro={pro}
                            onClick={(p: Professional) => {
                              navigate(`/profile/${p.id}`);
                              window.scrollTo(0, 0);
                            }}
                          />
                        ))
                      ) : (
                        <div className="col-span-full text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200 shadow-sm">
                          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                            <Filter size={40} />
                          </div>
                          <p className="text-slate-500 text-lg font-medium">
                            Nenhum profissional encontrado com estes filtros.
                          </p>
                          <button
                            onClick={() =>
                              setFilters({ trade: '', minRating: 0, maxPrice: 500, sortBy: 'recommended' })
                            }
                            className="mt-6 bg-brand/10 text-brand px-8 py-3 rounded-full font-bold hover:bg-brand hover:text-white transition-all"
                          >
                            Limpar Filtros
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </main>

              {isHomePage && (
                <>
                  <CostGuides />
                  <Testimonials />
                  <NewsletterSection />
                </>
              )}
            </>
          }
        />
      </Routes>

      <BottomNav
        activeView={currentView}
        onNavigate={(v) => navigate('/' + (v === 'home' ? '' : v))}
        currentUser={currentUser}
        onOpenAuth={openAuthModal}
      />

      <Footer onOpenJoin={handleProfessionalJoinClick} />
    </div>
  );
};

export default App;
