import React, { useMemo, useCallback, useState } from 'react';
import { QuoteRequest, QuoteStatus, User } from '@/types';
import {
  Home,
  FileText,
  MessageSquare,
  BarChart2,
  Settings,
  Bell,
  LogOut,
  User as UserIcon,
  Calendar,
  MapPin,
  Star,
  CheckCircle,
  Clock,
  Check,
  X,
  Edit2,
  ShieldCheck,
  Eye,
  TrendingUp,
  DollarSign,
  Briefcase,
  ChevronRight,
} from 'lucide-react';

interface ProfessionalDashboardProps {
  currentUser: User;
  requests: QuoteRequest[];
  onUpdateStatus: (id: string, status: QuoteStatus, estimate?: string) => void;
  onMarkViewed: (id: string) => void;
  onEditProfile: () => void;
  onLogout?: () => void;
  onNavigate?: (section: string) => void;
}

type NavKey = 'home' | 'requests' | 'messages' | 'stats' | 'settings';

const NAV_ITEMS: { key: NavKey; label: string; icon: React.ElementType }[] = [
  { key: 'home', label: 'Início', icon: Home },
  { key: 'requests', label: 'Pedidos', icon: FileText },
  { key: 'messages', label: 'Mensagens', icon: MessageSquare },
  { key: 'stats', label: 'Estatísticas', icon: BarChart2 },
  { key: 'settings', label: 'Configurações', icon: Settings },
];

/** Renders a tiny sparkline using inline SVG (no chart library). */
const Sparkline: React.FC<{ values: number[]; color: string }> = ({ values, color }) => {
  if (values.length < 2) return null;
  const max = Math.max(...values, 1);
  const w = 80;
  const h = 32;
  const step = w / (values.length - 1);
  const points = values
    .map((v, i) => `${i * step},${h - (v / max) * h}`)
    .join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden="true">
      <polyline points={points} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
};

export const ProfessionalDashboard: React.FC<ProfessionalDashboardProps> = ({
  currentUser,
  requests,
  onUpdateStatus,
  onMarkViewed,
  onEditProfile,
  onLogout,
  onNavigate,
}) => {
  const [activeNav, setActiveNav] = useState<NavKey>('home');

  const pendingRequests = useMemo(() => requests.filter(r => r.status === 'pending'), [requests]);
  const activeRequests = useMemo(() => requests.filter(r => r.status === 'accepted'), [requests]);
  const completedRequests = useMemo(() => requests.filter(r => r.status === 'completed'), [requests]);
  const notifications = useMemo(() => requests.filter(r => r.viewedByPro === false), [requests]);

  const totalEarnings = useMemo(
    () => completedRequests.length * 150 + activeRequests.length * 50,
    [completedRequests.length, activeRequests.length],
  );

  // Sparkline data: simulate weekly earnings across 7 data points
  const sparkValues = useMemo(
    () => [40, 80, 60, 120, 90, 150, totalEarnings > 0 ? Math.min(totalEarnings, 200) : 50],
    [totalEarnings],
  );

  // Recent reviews from completed + reviewed requests
  const recentReviews = useMemo(
    () =>
      completedRequests
        .filter(r => r.hasReviewed)
        .slice(0, 3)
        .map(r => ({
          id: r.id,
          author: r.clientName,
          rating: 5,
          comment: 'Excelente profissional, trabalho de qualidade!',
          date: r.createdAt,
        })),
    [completedRequests],
  );

  // Profile completion percentage
  const profileCompletion = useMemo(() => {
    let score = 40; // base
    if (currentUser.avatar) score += 20;
    if (currentUser.phone) score += 20;
    if (currentUser.location) score += 20;
    return score;
  }, [currentUser]);

  const handleNavClick = useCallback(
    (key: NavKey) => {
      setActiveNav(key);
      onNavigate?.(key);
    },
    [onNavigate],
  );

  const firstName = currentUser.name.split(' ')[0];

  return (
    <div className="flex min-h-screen bg-cream">
      {/* ── Sidebar (desktop) ── */}
      <aside className="hidden lg:flex flex-col w-60 bg-navy min-h-screen fixed left-0 top-0 bottom-0 z-30">
        <div className="px-6 py-6 border-b border-white/10">
          <span className="font-display font-bold text-xl text-white tracking-tight">
            Constru<span className="text-brand">Casa</span>
          </span>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => handleNavClick(key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeNav === key
                  ? 'bg-white/10 text-brand rounded-xl'
                  : 'text-white/40 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon size={18} />
              {label}
              {key === 'requests' && notifications.length > 0 && (
                <span className="ml-auto bg-brand text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="px-4 pb-6 border-t border-white/10 pt-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-white/20 overflow-hidden flex-shrink-0 flex items-center justify-center">
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
              ) : (
                <UserIcon size={18} className="text-white/60" />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">{currentUser.name}</p>
              <p className="text-white/40 text-xs">Profissional</p>
            </div>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 text-xs font-medium transition-all"
            >
              <LogOut size={14} />
              Sair
            </button>
          )}
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        {/* Mobile TopBar */}
        <header className="lg:hidden sticky top-0 z-20 bg-white border-b border-[--color-border] px-4 py-3 flex items-center justify-between">
          <span className="font-display font-bold text-navy text-base">
            Olá, {firstName}!
          </span>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl bg-cream hover:bg-[--color-border] transition-colors">
              <Bell size={18} className="text-slate-600" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-brand rounded-full" />
              )}
            </button>
            <div className="w-9 h-9 rounded-full overflow-hidden bg-brand-subtle flex items-center justify-center">
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt="" className="w-full h-full object-cover" />
              ) : (
                <UserIcon size={18} className="text-brand" />
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 lg:px-8 py-6 pb-24 lg:pb-8 space-y-6">
          {/* ── Profile banner ── */}
          <div className="bg-white rounded-2xl border border-[--color-border] overflow-hidden">
            {/* Navy-to-navy-medium gradient banner — gradient in style prop per rules */}
            <div
              className="h-28 relative"
              style={{ background: 'linear-gradient(to right, #1B2B4B, #2a3f6b)' }}
            />

            {/* Avatar + info */}
            <div className="px-6 pb-6 -mt-12">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div className="flex items-end gap-4">
                  <div className="w-[72px] h-[72px] rounded-full border-4 border-white shadow-lg bg-cream overflow-hidden flex items-center justify-center flex-shrink-0">
                    {currentUser.avatar ? (
                      <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                    ) : (
                      <UserIcon size={32} className="text-slate-300" />
                    )}
                  </div>
                  <div className="pb-1">
                    <h1 className="font-display font-bold text-xl text-navy flex items-center gap-2">
                      {currentUser.name}
                      {currentUser.professionalProfileId && (
                        <ShieldCheck size={16} className="text-blue-500" />
                      )}
                    </h1>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                        <CheckCircle size={10} />
                        Profissional Verificado
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-1.5">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star
                          key={i}
                          size={13}
                          className={i <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200 fill-slate-200'}
                        />
                      ))}
                      <span className="text-xs text-slate-500 ml-1">4.0</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onEditProfile}
                  className="btn-secondary flex items-center gap-2 py-2.5 px-5 text-sm self-end sm:self-auto"
                >
                  <Edit2 size={14} />
                  {currentUser.professionalProfileId ? 'Editar Perfil' : 'Completar Perfil'}
                </button>
              </div>

              {/* Profile completion bar */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-500">Perfil {profileCompletion}% completo</span>
                  <span className="text-xs text-brand font-bold">{profileCompletion}%</span>
                </div>
                <div className="h-2 bg-[--color-border] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand rounded-full transition-all duration-700"
                    style={{ width: `${profileCompletion}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Notifications ── */}
          {notifications.length > 0 && (
            <div className="space-y-3 animate-fade-in">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Bell size={13} className="text-brand" /> Alertas Recentes
              </h2>
              {notifications.map(notif => (
                <div
                  key={notif.id}
                  className="bg-brand-subtle border border-brand/20 rounded-2xl p-4 flex items-center justify-between gap-4 relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand rounded-l-2xl" />
                  <div className="flex items-center gap-3 pl-2">
                    <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-brand shadow-sm flex-shrink-0">
                      {notif.hasReviewed ? <Star size={17} className="fill-brand" /> : <CheckCircle size={17} />}
                    </div>
                    <div>
                      <p className="text-sm text-slate-800">
                        <span className="font-bold">{notif.clientName}</span> marcou
                        <span className="font-semibold italic"> "{notif.title}"</span> como
                        {notif.hasReviewed ? ' avaliado!' : ' concluído!'}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">Clique em "Entendi" para arquivar.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onMarkViewed(notif.id)}
                    className="flex-shrink-0 bg-white hover:bg-cream text-slate-600 border border-brand/20 text-xs font-bold px-4 py-2 rounded-xl transition-colors"
                  >
                    Entendi
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ── Metrics grid ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: 'Visualizações do Perfil',
                value: '127',
                icon: Eye,
                iconBg: 'bg-blue-50 text-blue-600',
                trend: '+12% esta semana',
                sparkline: false,
              },
              {
                label: 'Orçamentos Solicitados',
                value: String(pendingRequests.length + activeRequests.length + completedRequests.length),
                icon: Briefcase,
                iconBg: 'bg-brand-subtle text-brand',
                trend: '+3 este mês',
                sparkline: false,
              },
              {
                label: 'Projetos Concluídos',
                value: String(completedRequests.length),
                icon: CheckCircle,
                iconBg: 'bg-emerald-50 text-emerald-600',
                trend: 'no total',
                sparkline: false,
              },
              {
                label: 'Receita do Mês',
                value: `R$ ${totalEarnings}`,
                icon: DollarSign,
                iconBg: 'bg-amber-50 text-amber-600',
                trend: null,
                sparkline: true,
              },
            ].map(({ label, value, icon: Icon, iconBg, trend, sparkline }) => (
              <div
                key={label}
                className="bg-white rounded-2xl border border-[--color-border] p-5 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl p-2.5 flex items-center justify-center flex-shrink-0 ${iconBg}`}>
                    <Icon size={19} />
                  </div>
                  {sparkline && <Sparkline values={sparkValues} color="var(--color-brand, #E85D26)" />}
                </div>
                <div>
                  <p className="font-display font-bold text-2xl text-navy">{value}</p>
                  <p className="text-slate-500 text-sm mt-0.5">{label}</p>
                </div>
                {trend && (
                  <div className="flex items-center gap-1 text-xs text-emerald-600">
                    <TrendingUp size={11} />
                    <span>{trend}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* ── Pending requests ── */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="font-display font-bold text-lg text-navy flex items-center gap-2">
                <Clock size={18} className="text-brand" />
                Solicitações Pendentes
                {pendingRequests.length > 0 && (
                  <span className="ml-1 bg-brand text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {pendingRequests.length}
                  </span>
                )}
              </h2>

              {pendingRequests.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-[--color-border] rounded-2xl p-10 text-center">
                  <p className="text-slate-400 text-sm">Nenhuma solicitação nova no momento.</p>
                </div>
              ) : (
                pendingRequests.map(req => (
                  <div
                    key={req.id}
                    className="bg-white rounded-2xl border border-[--color-border] overflow-hidden animate-fade-in"
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-navy">{req.title}</h3>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Cliente: <span className="font-semibold text-slate-700">{req.clientName}</span>
                          </p>
                        </div>
                        {/* Urgente badge — animate-pulse indicates new/urgent */}
                        <span className="bg-brand-subtle text-brand text-[10px] font-bold uppercase px-2.5 py-1 rounded-full animate-pulse">
                          Novo
                        </span>
                      </div>

                      <div className="bg-cream rounded-xl p-3 mb-4 text-sm text-slate-600 border border-[--color-border] line-clamp-2">
                        {req.description}
                      </div>

                      <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-5">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={12} className="text-brand" />
                          {req.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-blue-400" />
                          {new Date(req.preferredDate).toLocaleDateString('pt-BR')}
                        </span>
                      </div>

                      <div className="flex gap-3 border-t border-[--color-border] pt-4">
                        <button
                          onClick={() => onUpdateStatus(req.id, 'accepted', 'R$ 150 - R$ 300')}
                          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
                        >
                          <Check size={16} /> Aceitar
                        </button>
                        <button
                          onClick={() => onUpdateStatus(req.id, 'rejected')}
                          className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 py-2.5 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                        >
                          <X size={16} /> Recusar
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-[--color-border] text-slate-400 hover:bg-cream transition-colors flex-shrink-0">
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* ── Sidebar: active + completed + reviews ── */}
            <div className="space-y-6">
              {/* Active work */}
              <div className="bg-white rounded-2xl border border-[--color-border] p-5">
                <h3 className="font-bold text-navy mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                  Em Andamento
                </h3>
                {activeRequests.length === 0 ? (
                  <p className="text-slate-400 text-xs italic">Nenhum serviço ativo.</p>
                ) : (
                  <div className="space-y-3">
                    {activeRequests.map(req => (
                      <div key={req.id} className="bg-cream rounded-xl p-3">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-slate-800 text-sm truncate flex-1">{req.title}</h4>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0 ml-2" />
                        </div>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                          <MapPin size={10} /> {req.location}
                        </p>
                        <span className="inline-block bg-white text-slate-700 text-[11px] font-bold px-2 py-0.5 rounded-lg border border-[--color-border]">
                          {req.clientName}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent completed */}
              {completedRequests.length > 0 && (
                <div className="bg-white rounded-2xl border border-[--color-border] p-5">
                  <h3 className="font-bold text-navy mb-4">Concluídos</h3>
                  <div className="space-y-2">
                    {completedRequests.slice(0, 4).map(req => (
                      <div key={req.id} className="flex items-center justify-between bg-cream rounded-xl px-3 py-2.5">
                        <span className="text-sm text-slate-700 font-medium truncate flex-1">{req.title}</span>
                        {req.hasReviewed ? (
                          <span className="text-brand text-xs font-bold flex items-center gap-0.5 ml-2 flex-shrink-0">
                            <Star size={11} className="fill-brand" /> Avaliada
                          </span>
                        ) : (
                          <CheckCircle size={14} className="text-blue-400 ml-2 flex-shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent reviews */}
              {recentReviews.length > 0 && (
                <div className="bg-white rounded-2xl border border-[--color-border] p-5">
                  <h3 className="font-bold text-navy mb-4">Avaliações Recentes</h3>
                  <div className="space-y-4">
                    {recentReviews.map(review => (
                      <div key={review.id} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-subtle flex items-center justify-center text-brand font-bold text-xs flex-shrink-0">
                          {review.author.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="text-sm font-semibold text-slate-800 truncate">{review.author}</p>
                            <div className="flex gap-0.5 flex-shrink-0">
                              {[1, 2, 3, 4, 5].map(i => (
                                <Star
                                  key={i}
                                  size={10}
                                  className={i <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200 fill-slate-200'}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-2">{review.comment}</p>
                          <p className="text-[10px] text-slate-400 mt-1">
                            {new Date(review.date).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </main>
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[--color-border] flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => handleNavClick(key)}
            className={`relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all ${
              activeNav === key ? 'text-brand' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Icon size={20} strokeWidth={activeNav === key ? 2.5 : 1.8} />
            <span className="text-[10px] font-medium">{label}</span>
            {key === 'requests' && notifications.length > 0 && (
              <span className="absolute top-1.5 right-2 w-2 h-2 bg-brand rounded-full" />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};
