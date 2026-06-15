import React, { useState, useRef, useMemo, useCallback } from 'react';
import { QuoteRequest, QuoteStatus, User } from '@/types';
import {
  Home,
  FileText,
  MessageSquare,
  Heart,
  Settings,
  Bell,
  LogOut,
  User as UserIcon,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Image as ImageIcon,
  Star,
  CheckCircle,
  XCircle,
  Clock,
  Hammer,
  Save,
  X,
  Edit2,
  TrendingUp,
  ChevronRight,
} from 'lucide-react';

interface ClientDashboardProps {
  currentUser: User;
  requests: QuoteRequest[];
  onReviewClick: (request: QuoteRequest) => void;
  onUpdateUser: (data: Partial<User>) => void;
  onUpdateQuoteStatus: (id: string, status: QuoteStatus) => void;
  onLogout?: () => void;
  onNavigate?: (section: string) => void;
}

type FilterTab = 'all' | 'pending' | 'accepted' | 'completed' | 'rejected';

const NAV_ITEMS = [
  { key: 'home', label: 'Início', icon: Home },
  { key: 'requests', label: 'Pedidos', icon: FileText },
  { key: 'messages', label: 'Mensagens', icon: MessageSquare },
  { key: 'favorites', label: 'Favoritos', icon: Heart },
  { key: 'settings', label: 'Configurações', icon: Settings },
] as const;

type NavKey = (typeof NAV_ITEMS)[number]['key'];

export const ClientDashboard: React.FC<ClientDashboardProps> = ({
  currentUser,
  requests,
  onReviewClick,
  onUpdateUser,
  onUpdateQuoteStatus,
  onLogout,
  onNavigate,
}) => {
  const [activeNav, setActiveNav] = useState<NavKey>('home');
  const [isEditing, setIsEditing] = useState(false);
  const [filterTab, setFilterTab] = useState<FilterTab>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone ?? '',
    location: currentUser.location ?? '',
    avatar: currentUser.avatar,
  });

  const handleSaveProfile = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onUpdateUser(formData);
      setIsEditing(false);
    },
    [formData, onUpdateUser],
  );

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
    setFormData({
      name: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone ?? '',
      location: currentUser.location ?? '',
      avatar: currentUser.avatar,
    });
  }, [currentUser]);

  const handleAvatarChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, avatar: imageUrl }));
    }
  }, []);

  const handleNavClick = useCallback(
    (key: NavKey) => {
      setActiveNav(key);
      onNavigate?.(key);
    },
    [onNavigate],
  );

  const stats = useMemo(() => {
    const sent = requests.length;
    const received = requests.filter(r => r.priceEstimate).length;
    const active = requests.filter(r => r.status === 'accepted').length;
    const done = requests.filter(r => r.status === 'completed').length;
    return { sent, received, active, done };
  }, [requests]);

  const filteredRequests = useMemo(() => {
    if (filterTab === 'all') return requests;
    return requests.filter(r => r.status === filterTab);
  }, [requests, filterTab]);

  const getStatusBadge = (status: QuoteStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-xs font-semibold">
            <Clock size={11} /> Pendente
          </span>
        );
      case 'accepted':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-xs font-semibold">
            <Hammer size={11} /> Em Andamento
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-xs font-semibold">
            <XCircle size={11} /> Cancelado
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-semibold">
            <CheckCircle size={11} /> Concluído
          </span>
        );
    }
  };

  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const firstName = currentUser.name.split(' ')[0];

  return (
    <div className="flex min-h-screen bg-cream">
      {/* ── Sidebar (desktop) ── */}
      <aside className="hidden lg:flex flex-col w-60 bg-navy min-h-screen fixed left-0 top-0 bottom-0 z-30">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10">
          <span className="font-display font-bold text-xl text-white tracking-tight">
            Constru<span className="text-brand">Casa</span>
          </span>
        </div>

        {/* Nav */}
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
            </button>
          ))}
        </nav>

        {/* User footer */}
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
              <p className="text-white/40 text-xs truncate">{currentUser.email}</p>
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
        {/* ── Mobile TopBar ── */}
        <header className="lg:hidden sticky top-0 z-20 bg-white border-b border-[--color-border] px-4 py-3 flex items-center justify-between">
          <div>
            <p className="font-display font-bold text-slate-900 text-base">
              Olá, {firstName}!
            </p>
            <p className="text-slate-400 text-xs capitalize">{today}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl bg-cream hover:bg-[--color-border] transition-colors">
              <Bell size={18} className="text-slate-600" />
              {requests.filter(r => r.status === 'pending').length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-brand rounded-full" />
              )}
            </button>
            <div className="w-9 h-9 rounded-full bg-brand-subtle overflow-hidden flex items-center justify-center">
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
              ) : (
                <UserIcon size={18} className="text-brand" />
              )}
            </div>
          </div>
        </header>

        {/* ── Desktop top greeting ── */}
        <div className="hidden lg:block px-8 pt-8 pb-2">
          <p className="font-display font-bold text-2xl text-navy">
            Olá, {firstName}!
          </p>
          <p className="text-slate-400 text-sm capitalize">{today}</p>
        </div>

        {/* ── Page body ── */}
        <main className="flex-1 px-4 lg:px-8 py-6 pb-24 lg:pb-8 space-y-8">
          {/* Stats grid — 2x2 mobile, 4x1 desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: 'Solicitações Enviadas',
                value: stats.sent,
                trend: '+2 esta semana',
                iconBg: 'bg-brand-subtle text-brand',
                icon: FileText,
              },
              {
                label: 'Orçamentos Recebidos',
                value: stats.received,
                trend: '+1 esta semana',
                iconBg: 'bg-blue-50 text-blue-600',
                icon: MessageSquare,
              },
              {
                label: 'Em Andamento',
                value: stats.active,
                trend: 'em progresso',
                iconBg: 'bg-amber-50 text-amber-600',
                icon: Hammer,
              },
              {
                label: 'Concluídos',
                value: stats.done,
                trend: 'no total',
                iconBg: 'bg-emerald-50 text-emerald-600',
                icon: CheckCircle,
              },
            ].map(({ label, value, trend, iconBg, icon: Icon }) => (
              <div
                key={label}
                className="bg-white rounded-2xl border border-[--color-border] p-5 flex flex-col gap-3"
              >
                <div className={`w-10 h-10 rounded-xl p-2.5 flex items-center justify-center ${iconBg}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <p className="font-display font-bold text-2xl text-navy">{value}</p>
                  <p className="text-slate-500 text-sm mt-0.5">{label}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-emerald-600">
                  <TrendingUp size={11} />
                  <span>{trend}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Requests section */}
          <div className="bg-white rounded-2xl border border-[--color-border] overflow-hidden">
            {/* Section header */}
            <div className="px-6 py-5 border-b border-[--color-border] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="font-display font-bold text-lg text-navy">Minhas Solicitações</h2>

              {/* Filter tabs — pill style */}
              <div className="flex items-center gap-1 bg-cream rounded-full p-1 overflow-x-auto">
                {(
                  [
                    { key: 'all', label: 'Todas' },
                    { key: 'pending', label: 'Pendente' },
                    { key: 'accepted', label: 'Em andamento' },
                    { key: 'completed', label: 'Concluído' },
                  ] as { key: FilterTab; label: string }[]
                ).map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setFilterTab(key)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      filterTab === key
                        ? 'bg-navy text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Request list */}
            {filteredRequests.length === 0 ? (
              <div className="py-16 flex flex-col items-center gap-4 text-center px-6">
                <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
                  <rect width="72" height="72" rx="36" fill="#FAF8F5" />
                  <rect x="20" y="38" width="32" height="20" rx="3" fill="#E85D26" opacity="0.2" />
                  <rect x="28" y="28" width="16" height="12" rx="2" fill="#E85D26" opacity="0.4" />
                  <path d="M18 38 L36 22 L54 38" stroke="#E85D26" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="30" y="44" width="12" height="14" rx="2" fill="#E85D26" opacity="0.5" />
                  <circle cx="52" cy="26" r="8" fill="#FAF8F5" />
                  <path d="M49 26h6M52 23v6" stroke="#E85D26" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <div>
                  <h3 className="font-display font-bold text-navy text-lg">
                    Nenhuma solicitação aqui
                  </h3>
                  <p className="text-slate-400 text-sm mt-1 max-w-xs">
                    Busque um profissional e solicite um orçamento para começar.
                  </p>
                </div>
                <button className="btn-primary text-sm mt-2">
                  Buscar Profissionais
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[--color-border]">
                {filteredRequests.map(req => (
                  <div
                    key={req.id}
                    className="px-6 py-5 hover:bg-cream transition-colors animate-fade-in"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Pro info */}
                      <div className="flex items-center gap-3 md:w-52 flex-shrink-0">
                        <img
                          src={req.proAvatar}
                          alt={req.proName}
                          className="w-11 h-11 rounded-full object-cover shadow-sm flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900 text-sm truncate">{req.proName}</p>
                          <p className="text-slate-400 text-xs">Profissional</p>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-bold text-slate-900 text-sm truncate">{req.title}</h4>
                          <span className="text-slate-400 text-xs whitespace-nowrap flex-shrink-0">
                            {new Date(req.createdAt).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                        <p className="text-slate-500 text-xs line-clamp-1 mb-2">{req.description}</p>
                        <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <MapPin size={11} className="text-brand" />
                            {req.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={11} className="text-blue-400" />
                            {new Date(req.preferredDate).toLocaleDateString('pt-BR')}
                          </span>
                          {req.images.length > 0 && (
                            <span className="flex items-center gap-1">
                              <ImageIcon size={11} />
                              {req.images.length} fotos
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {getStatusBadge(req.status)}

                        {req.status === 'accepted' && (
                          <button
                            onClick={() => onUpdateQuoteStatus(req.id, 'completed')}
                            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors"
                          >
                            <CheckCircle size={13} className="text-emerald-400" />
                            Finalizar
                          </button>
                        )}

                        {req.status === 'completed' && !req.hasReviewed && (
                          <button
                            onClick={() => onReviewClick(req)}
                            className="flex items-center gap-1.5 bg-brand hover:bg-brand-dark text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors"
                          >
                            <Star size={13} className="fill-white" />
                            Avaliar
                          </button>
                        )}

                        {req.status === 'completed' && req.hasReviewed && (
                          <span className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                            <CheckCircle size={12} /> Avaliado
                          </span>
                        )}

                        <button className="p-1.5 rounded-lg hover:bg-[--color-border] transition-colors text-slate-400">
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile edit card */}
          <div className="bg-white rounded-2xl border border-[--color-border] p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-bold text-lg text-navy">Meu Perfil</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-brand-dark transition-colors"
                >
                  <Edit2 size={13} />
                  Editar
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="space-y-4 animate-fade-in">
                {/* Avatar */}
                <div className="flex justify-center mb-2">
                  <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <div className="w-20 h-20 rounded-full bg-cream border-4 border-white shadow-sm overflow-hidden flex items-center justify-center">
                      {formData.avatar ? (
                        <img src={formData.avatar} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <UserIcon size={36} className="text-slate-300" />
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={20} />
                    </div>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleAvatarChange} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Nome</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2.5 bg-cream border border-[--color-border] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Email</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2.5 bg-cream border border-[--color-border] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Telefone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      placeholder="(00) 00000-0000"
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2.5 bg-cream border border-[--color-border] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Localização</label>
                    <input
                      type="text"
                      value={formData.location}
                      placeholder="Cidade - UF"
                      onChange={e => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3 py-2.5 bg-cream border border-[--color-border] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-1">
                  <button type="submit" className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm">
                    <Save size={15} /> Salvar
                  </button>
                  <button type="button" onClick={handleCancelEdit} className="btn-secondary flex items-center gap-2 px-5 py-2.5 text-sm">
                    <X size={15} /> Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-full bg-cream border-4 border-white shadow-sm overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon size={28} className="text-slate-300" />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-display font-bold text-navy text-lg">{currentUser.name}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-slate-600">
                    <span className="flex items-center gap-2">
                      <Mail size={14} className="text-slate-400 flex-shrink-0" />
                      <span className="truncate">{currentUser.email}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <Phone size={14} className="text-slate-400 flex-shrink-0" />
                      {currentUser.phone ?? <em className="text-slate-400 not-italic">Não informado</em>}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin size={14} className="text-slate-400 flex-shrink-0" />
                      {currentUser.location ?? <em className="text-slate-400 not-italic">Não informado</em>}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[--color-border] flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => handleNavClick(key)}
            className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all ${
              activeNav === key ? 'text-brand' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Icon size={20} strokeWidth={activeNav === key ? 2.5 : 1.8} />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};
