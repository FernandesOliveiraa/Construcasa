import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  Menu,
  X,
  MessageSquare,
  LayoutDashboard,
  Settings,
  ChevronDown,
  Zap,
  Droplets,
  Paintbrush,
  Layers,
  TreePine,
  Wind,
  Building2,
  ShieldCheck,
  Home,
  Flame,
  Hammer,
  HardHat,
  Trash2,
  Sparkles,
  Wrench,
  Mountain,
  BookOpen,
  Grid3X3,
} from 'lucide-react';
import { Logo } from '@/components/shared/Logo';
import type { User } from '@/types';

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavService {
  name: string;
  href?: string;
}

interface NavItem {
  label: string;
  services: NavService[];
  guides: string[];
  isGuides?: boolean;
}

interface NavBarProps {
  onGoHome: () => void;
  onJoin: () => void;
  onDashboard: () => void;
  currentUser: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

// ─── Nav data ─────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Interior',
    services: [
      { name: 'Elétrica' },
      { name: 'Hidráulica' },
      { name: 'Pintura Interna' },
      { name: 'Gesso/Drywall' },
      { name: 'Piso e Revestimento' },
      { name: 'Marcenaria' },
      { name: 'Banheiro' },
      { name: 'Cozinha' },
      { name: 'Climatização' },
    ],
    guides: [
      'Quanto custa reformar um banheiro?',
      'Preço de piso laminado',
      'Custo de instalação elétrica',
    ],
  },
  {
    label: 'Exterior',
    services: [
      { name: 'Pintura Externa' },
      { name: 'Impermeabilização' },
      { name: 'Telhado' },
      { name: 'Fachada' },
      { name: 'Calçada e Piso Externo' },
      { name: 'Jardinagem' },
      { name: 'Muro e Cerca' },
      { name: 'Churrasqueira' },
    ],
    guides: [
      'Quanto custa pintar a fachada?',
      'Preço de reforma de telhado',
      'Custo de impermeabilização',
    ],
  },
  {
    label: 'Infraestrutura',
    services: [
      { name: 'Fundação' },
      { name: 'Alvenaria' },
      { name: 'Reforma Completa' },
      { name: 'Construção Nova' },
      { name: 'Demolição' },
      { name: 'Limpeza Pós-Obra' },
      { name: 'Desentupimento' },
      { name: 'Manutenção Predial' },
    ],
    guides: [
      'Quanto custa construir uma casa?',
      'Preço de reforma completa',
      'Custo de fundação',
    ],
  },
  {
    label: 'Guias de Custo',
    services: [],
    guides: [
      'Guia de preços por região',
      'Tabela de valores 2025',
      'Como pedir orçamento',
      'Direitos do consumidor',
      'Como contratar com segurança',
    ],
    isGuides: true,
  },
];

// ─── Service icon map ─────────────────────────────────────────────────────────

type ServiceIconMap = Record<string, { icon: React.ComponentType<{ size?: number; className?: string }>, color: string }>;

const SERVICE_ICONS: ServiceIconMap = {
  // Interior
  'Elétrica':               { icon: Zap,        color: 'text-amber-500'  },
  'Hidráulica':             { icon: Droplets,   color: 'text-blue-500'   },
  'Pintura Interna':        { icon: Paintbrush, color: 'text-purple-500' },
  'Gesso/Drywall':          { icon: Layers,     color: 'text-slate-500'  },
  'Piso e Revestimento':    { icon: Grid3X3,    color: 'text-orange-500' },
  'Marcenaria':             { icon: TreePine,   color: 'text-green-600'  },
  'Banheiro':               { icon: Droplets,   color: 'text-cyan-500'   },
  'Cozinha':                { icon: Flame,      color: 'text-red-400'    },
  'Climatização':           { icon: Wind,       color: 'text-sky-500'    },
  // Exterior
  'Pintura Externa':        { icon: Paintbrush, color: 'text-purple-500' },
  'Impermeabilização':      { icon: ShieldCheck,color: 'text-blue-600'   },
  'Telhado':                { icon: Home,       color: 'text-slate-600'  },
  'Fachada':                { icon: Building2,  color: 'text-navy'       },
  'Calçada e Piso Externo': { icon: Grid3X3,    color: 'text-stone-500'  },
  'Jardinagem':             { icon: Sparkles,   color: 'text-green-500'  },
  'Muro e Cerca':           { icon: ShieldCheck,color: 'text-slate-500'  },
  'Churrasqueira':          { icon: Flame,      color: 'text-orange-600' },
  // Infraestrutura
  'Fundação':               { icon: Mountain,   color: 'text-stone-600'  },
  'Alvenaria':              { icon: Layers,     color: 'text-amber-700'  },
  'Reforma Completa':       { icon: Hammer,     color: 'text-brand'      },
  'Construção Nova':        { icon: HardHat,    color: 'text-yellow-600' },
  'Demolição':              { icon: Trash2,     color: 'text-red-500'    },
  'Limpeza Pós-Obra':       { icon: Sparkles,   color: 'text-emerald-500'},
  'Desentupimento':         { icon: Wrench,     color: 'text-slate-500'  },
  'Manutenção Predial':     { icon: Wrench,     color: 'text-brand'      },
};

// ─── Route maps ───────────────────────────────────────────────────────────────

const SERVICE_ROUTES: Record<string, string> = {
  // Interior
  'Elétrica': '/servicos/eletrica',
  'Hidráulica': '/servicos/hidraulica',
  'Pintura Interna': '/servicos/pintura-interna',
  'Gesso/Drywall': '/servicos/gesso-drywall',
  'Piso e Revestimento': '/servicos/piso-revestimento',
  'Marcenaria': '/servicos/marcenaria',
  'Banheiro': '/servicos/banheiro',
  'Cozinha': '/servicos/cozinha',
  'Climatização': '/servicos/climatizacao',
  // Exterior
  'Pintura Externa': '/servicos/pintura-externa',
  'Impermeabilização': '/servicos/impermeabilizacao',
  'Telhado': '/servicos/telhado',
  'Fachada': '/servicos/fachada',
  'Calçada e Piso Externo': '/servicos/calcada-piso-externo',
  'Jardinagem': '/servicos/jardinagem',
  'Muro e Cerca': '/servicos/muro-cerca',
  'Churrasqueira': '/servicos/churrasqueira',
  // Infraestrutura
  'Fundação': '/servicos/fundacao',
  'Alvenaria': '/servicos/alvenaria',
  'Reforma Completa': '/servicos/reforma-completa',
  'Construção Nova': '/servicos/construcao-nova',
  'Demolição': '/servicos/demolicao',
  'Limpeza Pós-Obra': '/servicos/limpeza-pos-obra',
  'Desentupimento': '/servicos/desentupimento',
  'Manutenção Predial': '/servicos/manutencao-predial',
};

const GUIDE_ROUTES: Record<string, string> = {
  'Quanto custa reformar um banheiro?': '/guias/banheiro',
  'Preço de piso laminado': '/guias/piso-laminado',
  'Custo de instalação elétrica': '/guias/instalacao-eletrica',
  'Quanto custa pintar a fachada?': '/guias/pintura-fachada',
  'Preço de reforma de telhado': '/guias/telhado',
  'Custo de impermeabilização': '/guias/impermeabilizacao',
  'Quanto custa construir uma casa?': '/guias/construir-casa',
  'Preço de reforma completa': '/guias/reforma-completa',
  'Custo de fundação': '/guias/fundacao',
  'Guia de preços por região': '/guias/precos-por-regiao',
  'Tabela de valores 2025': '/guias/tabela-valores-2025',
  'Como pedir orçamento': '/guias/como-pedir-orcamento',
  'Direitos do consumidor': '/guias/direitos-consumidor',
  'Como contratar com segurança': '/guias/contratar-com-seguranca',
};

// ─── MegaMenu component ───────────────────────────────────────────────────────

interface MegaMenuProps {
  item: NavItem;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onNavigate: (path: string) => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ item, onMouseEnter, onMouseLeave, onNavigate }) => {
  return (
    <>
      <style>{`
        @keyframes megaMenuIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div
        className="fixed left-0 right-0 z-50"
        style={{
          top: '103px',
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(232,228,223,0.6)',
          boxShadow: '0 8px 32px rgba(27,43,75,0.12)',
          animation: 'megaMenuIn 0.18s ease-out forwards',
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {item.isGuides ? (
          // ── Guias de Custo — 2 columns ──────────────────────────────────────
          <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-[1fr_280px] gap-12">
            {/* Left: guide grid */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  Pesquisar custos
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                {item.guides.map((guide) => (
                  <button
                    key={guide}
                    onClick={() => { onNavigate(GUIDE_ROUTES[guide] ?? '/guias'); }}
                    className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-brand-subtle group transition-all duration-150 text-left"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                    <span className="text-sm text-slate-600 group-hover:text-brand transition-colors leading-snug">
                      {guide}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: highlight card */}
            <div
              className="rounded-2xl p-5"
              style={{ background: 'linear-gradient(135deg, #E85D26 0%, #C44A18 100%)' }}
            >
              <BookOpen size={24} className="text-white/80 mb-3" />
              <h3 className="font-display font-bold text-white text-sm mb-1">
                Guia completo de orçamentos
              </h3>
              <p className="text-white/70 text-xs leading-relaxed mb-4">
                Saiba o preço médio de qualquer reforma antes de contratar.
              </p>
              <button
                onClick={() => { onNavigate('/guias'); }}
                className="w-full bg-white text-brand text-xs font-bold py-2.5 rounded-xl hover:bg-cream transition-colors"
              >
                Explorar guias grátis
              </button>
            </div>
          </div>
        ) : (
          // ── Interior / Exterior / Infraestrutura — 3 columns ────────────────
          <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-[1fr_280px_240px] gap-8">
            {/* Column 1: services with icons */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  Encontrar profissional
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {item.services.map((svc) => {
                  const meta = SERVICE_ICONS[svc.name] ?? { icon: Wrench, color: 'text-slate-400' };
                  const Icon = meta.icon;
                  return (
                    <button
                      key={svc.name}
                      onClick={() => { onNavigate(SERVICE_ROUTES[svc.name] ?? '/servicos'); }}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-brand-subtle group transition-all duration-150 text-left"
                    >
                      <div className="w-7 h-7 rounded-md bg-cream flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors">
                        <Icon size={14} className={`${meta.color} group-hover:text-brand transition-colors`} />
                      </div>
                      <span className="text-sm text-navy group-hover:text-brand transition-colors font-medium">
                        {svc.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => { onNavigate('/servicos'); }}
                className="mt-4 ml-3 text-xs font-semibold text-brand hover:underline flex items-center gap-1"
              >
                Ver todos os serviços →
              </button>
            </div>

            {/* Column 2: guides */}
            <div className="border-l border-border pl-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                  Pesquisar custos
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="space-y-1">
                {item.guides.map((guide) => (
                  <button
                    key={guide}
                    onClick={() => { onNavigate(GUIDE_ROUTES[guide] ?? '/guias'); }}
                    className="w-full flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-brand-subtle group transition-all duration-150 text-left"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0 group-hover:scale-125 transition-transform" />
                    <span className="text-sm text-slate-600 group-hover:text-brand transition-colors leading-snug">
                      {guide}
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => { onNavigate('/guias'); }}
                className="mt-4 ml-3 text-xs font-semibold text-brand hover:underline flex items-center gap-1"
              >
                Ver todos os guias →
              </button>
            </div>

            {/* Column 3: CTA highlight card */}
            <div
              className="rounded-2xl p-5 flex flex-col justify-between"
              style={{ background: 'linear-gradient(135deg, #1B2B4B 0%, #2C3E6B 100%)' }}
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-brand flex items-center justify-center mb-3">
                  <Hammer size={18} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-white text-sm leading-snug mb-1">
                  Descreva seu projeto
                </h3>
                <p className="text-white/60 text-xs leading-relaxed">
                  Receba orçamentos de profissionais verificados em até 2 horas.
                </p>
              </div>

              <button
                onClick={() => { onNavigate('/'); }}
                className="mt-4 w-full bg-brand hover:bg-brand-dark text-white text-xs font-bold py-2.5 rounded-xl transition-colors"
              >
                Solicitar orçamento grátis
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// ─── NavBar ───────────────────────────────────────────────────────────────────

export const NavBar: React.FC<NavBarProps> = ({
  onGoHome,
  onJoin,
  onDashboard,
  currentUser,
  onOpenAuth,
  onLogout,
}) => {
  const navigate = useNavigate();
  const [atTop, setAtTop] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null);

  const userDropdownRef = useRef<HTMLDivElement>(null);
  const megaMenuCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll detection
  useEffect(() => {
    const handle = () => setAtTop(window.scrollY < 60);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(e.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Cleanup mega-menu timer on unmount
  useEffect(() => {
    return () => {
      if (megaMenuCloseTimer.current) clearTimeout(megaMenuCloseTimer.current);
    };
  }, []);

  const handleNavEnter = useCallback((label: string) => {
    if (megaMenuCloseTimer.current) clearTimeout(megaMenuCloseTimer.current);
    setOpenMegaMenu(label);
  }, []);

  const handleNavLeave = useCallback(() => {
    megaMenuCloseTimer.current = setTimeout(() => {
      setOpenMegaMenu(null);
    }, 150);
  }, []);

  const getInitials = (name: string) =>
    name
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  // Contextual color classes based on scroll position
  const navLinkClass = atTop
    ? 'text-white/90 hover:text-white'
    : 'text-navy hover:text-brand';

  const hamburgerClass = atTop
    ? 'text-white hover:bg-white/10'
    : 'text-navy hover:bg-cream-muted';

  return (
    <>
      {/* ── Desktop / Fixed navbar ── */}
      <nav
        className={`fixed top-0 w-full z-50 transition-colors duration-200 ${
          atTop
            ? 'bg-transparent'
            : 'bg-white border-b border-border shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-[103px] flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={onGoHome}
            className="flex items-center cursor-pointer flex-shrink-0 hover:opacity-80 transition-opacity"
            aria-label="ConstruCasa — Página inicial"
          >
            <Logo
              variant="horizontal"
              colorScheme={atTop ? 'white' : 'color'}
              size={34}
            />
          </button>

          {/* Desktop nav links with mega-menu */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                onMouseEnter={() => handleNavEnter(item.label)}
                onMouseLeave={handleNavLeave}
              >
                <button
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded transition-colors duration-200 ${navLinkClass}`}
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      openMegaMenu === item.label ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2">
                {/* Messages */}
                <button
                  onClick={onDashboard}
                  className={`relative p-2 rounded transition-all duration-200 ${navLinkClass}`}
                  title="Mensagens"
                >
                  <MessageSquare size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
                </button>

                {/* Avatar + dropdown */}
                <div ref={userDropdownRef} className="relative">
                  <button
                    onClick={() => setUserDropdownOpen((prev) => !prev)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded hover:bg-white/10 border border-transparent transition-all duration-200 ${navLinkClass}`}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 border-2 border-white shadow-sm"
                      style={{ background: 'linear-gradient(135deg, #E85D26, #F4793F)' }}
                    >
                      {currentUser.avatar ? (
                        <img src={currentUser.avatar} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white font-bold text-sm">
                          {getInitials(currentUser.name)}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-semibold hidden xl:block">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 opacity-60 ${
                        userDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* User dropdown */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-border py-2 z-10">
                      <button
                        onClick={() => { onDashboard(); setUserDropdownOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-navy hover:bg-cream hover:text-brand transition-colors"
                      >
                        <LayoutDashboard size={16} />
                        Dashboard
                      </button>
                      <button
                        onClick={() => { onDashboard(); setUserDropdownOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-navy hover:bg-cream hover:text-brand transition-colors"
                      >
                        <MessageSquare size={16} />
                        Mensagens
                      </button>
                      <button
                        onClick={() => { onDashboard(); setUserDropdownOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-navy hover:bg-cream hover:text-brand transition-colors"
                      >
                        <Settings size={16} />
                        Configurações
                      </button>
                      <div className="my-1.5 border-t border-border" />
                      <button
                        onClick={() => { onLogout(); setUserDropdownOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                {/* CTA hierarchy — 3 levels (Angi pattern) */}

                {/* Level 1: plain text link */}
                <button
                  onClick={onJoin}
                  className={`text-sm font-medium transition-colors duration-200 ${navLinkClass}`}
                >
                  Cadastrar como Pro
                </button>

                {/* Level 2: outline button */}
                <button
                  onClick={onOpenAuth}
                  className={`border border-current rounded px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${navLinkClass}`}
                >
                  Entrar
                </button>

                {/* Level 3: solid brand button */}
                <button
                  onClick={onOpenAuth}
                  className="btn-primary rounded px-4 py-1.5 text-sm"
                >
                  Buscar →
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden p-2 rounded transition-all duration-200 ${hamburgerClass}`}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mega-menu rendered at nav level so it spans the full viewport width */}
        {openMegaMenu && (() => {
          const activeItem = NAV_ITEMS.find((i) => i.label === openMegaMenu);
          return activeItem ? (
            <MegaMenu
              item={activeItem}
              onMouseEnter={() => handleNavEnter(openMegaMenu)}
              onMouseLeave={handleNavLeave}
              onNavigate={(path) => { setOpenMegaMenu(null); navigate(path); }}
            />
          ) : null;
        })()}
      </nav>

      {/* ── Mobile fullscreen menu ── */}
      <div
        className={`fixed inset-0 bg-cream z-40 lg:hidden flex flex-col transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Mobile menu top bar */}
        <div className="flex items-center justify-between px-6 h-[103px] border-b border-border flex-shrink-0">
          <button
            onClick={() => { onGoHome(); setMobileOpen(false); }}
            aria-label="ConstruCasa"
          >
            <Logo variant="horizontal" colorScheme="color" size={32} />
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded text-navy hover:bg-cream-muted transition-colors"
            aria-label="Fechar menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Nav links — flat list (no mega-menu on mobile) */}
        <div className="flex-grow flex flex-col items-center justify-center gap-4 px-6 overflow-y-auto">
          {/* Interior */}
          <div className="text-center">
            <p className="font-display font-semibold text-xs uppercase tracking-widest text-slate-400 mb-2">
              Interior
            </p>
            {NAV_ITEMS[0].services.map((svc) => (
              <button
                key={svc.name}
                onClick={() => { navigate(SERVICE_ROUTES[svc.name] ?? '/servicos'); setMobileOpen(false); }}
                className="block mx-auto text-lg font-display font-semibold text-navy hover:text-brand transition-colors py-0.5"
              >
                {svc.name}
              </button>
            ))}
          </div>

          <div className="w-12 h-px bg-border" />

          {/* Other categories as simple links */}
          {NAV_ITEMS.slice(1).map((item) => (
            <button
              key={item.label}
              onClick={() => { navigate('/servicos'); setMobileOpen(false); }}
              className="text-2xl font-display font-semibold text-navy hover:text-brand transition-colors duration-200"
            >
              {item.label}
            </button>
          ))}

          {currentUser && (
            <>
              <div className="w-12 h-px bg-border" />
              <button
                onClick={() => { onDashboard(); setMobileOpen(false); }}
                className="text-2xl font-display font-semibold text-navy hover:text-brand transition-colors"
              >
                Dashboard
              </button>
            </>
          )}
        </div>

        {/* Bottom CTAs */}
        <div className="px-6 pb-10 flex flex-col gap-3 flex-shrink-0">
          {currentUser ? (
            <>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-border">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #E85D26, #F4793F)' }}
                >
                  {currentUser.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-white font-bold">
                      {getInitials(currentUser.name)}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-navy">{currentUser.name.split(' ')[0]}</p>
                  <p className="text-xs text-slate-400">
                    {currentUser.type === 'client' ? 'Cliente' : 'Profissional'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => { onLogout(); setMobileOpen(false); }}
                className="w-full py-3 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
              >
                Sair da conta
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => { onOpenAuth(); setMobileOpen(false); }}
                className="btn-primary w-full justify-center py-3.5 text-base rounded"
              >
                Buscar →
              </button>
              <button
                onClick={() => { onOpenAuth(); setMobileOpen(false); }}
                className="w-full border border-navy rounded py-3.5 text-base font-medium text-navy hover:text-brand hover:border-brand transition-colors justify-center"
              >
                Entrar
              </button>
              <button
                onClick={() => { onJoin(); setMobileOpen(false); }}
                className="text-sm font-medium text-slate-400 hover:text-brand transition-colors text-center py-2"
              >
                Cadastrar como Pro
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
