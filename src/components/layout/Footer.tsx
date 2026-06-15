import React, { useState } from 'react';
import {
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  ChevronDown,
  Smartphone,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '@/components/shared/Logo';

interface FooterColumn {
  title: string;
  links: string[];
}

const columns: FooterColumn[] = [
  {
    title: 'Para clientes',
    links: [
      'Encontrar Profissionais',
      'Como Funciona',
      'Solicitar Orçamento',
      'Minhas Contratações',
      'Avaliações',
    ],
  },
  {
    title: 'Para profissionais',
    links: [
      'Cadastrar meu Negócio',
      'Painel do Profissional',
      'Como Receber Pedidos',
      'Planos e Preços',
      'Central de Ajuda Pro',
    ],
  },
  {
    title: 'Recursos',
    links: [
      'Guias de Custo',
      'Central de Dicas',
      'Blog',
      'Calculadora de Obras',
      'Tabela de Preços',
    ],
  },
  {
    title: 'Sobre nós',
    links: [
      'Como Funciona',
      'Sobre o ConstruCasa',
      'Carreiras',
      'Imprensa',
      'Contato',
      'Satisfação Garantida',
    ],
  },
];

const socialLinks = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Facebook, label: 'Facebook' },
  { icon: Youtube, label: 'YouTube' },
  { icon: Linkedin, label: 'LinkedIn' },
];

interface FooterProps {
  onOpenJoin?: () => void;
}

const FOOTER_LINKS: Record<string, string> = {
  // Para clientes
  'Encontrar Profissionais': '/',
  'Como Funciona': '/',
  'Solicitar Orçamento': '/',
  'Minhas Contratações': '/dashboard',
  'Avaliações': '/dashboard',
  // Para profissionais
  'Cadastrar meu Negócio': '/join',
  'Painel do Profissional': '/dashboard',
  'Como Receber Pedidos': '/artigos',
  'Planos e Preços': '/planos',
  'Central de Ajuda Pro': '/faq',
  // Recursos
  'Guias de Custo': '/guias',
  'Central de Dicas': '/artigos',
  'Blog': '/blog',
  'Calculadora de Obras': '/calculadora',
  'Tabela de Preços': '/guias',
  // Sobre nós
  'Sobre o ConstruCasa': '/sobre',
  'Carreiras': '/carreiras',
  'Imprensa': '/imprensa',
  'Contato': '/contato',
  'Satisfação Garantida': '/satisfacao-garantida',
};

export const Footer: React.FC<FooterProps> = ({ onOpenJoin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [openColumn, setOpenColumn] = useState<string | null>(null);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  const toggleColumn = (title: string) => {
    setOpenColumn((prev) => (prev === title ? null : title));
  };

  return (
    <footer className="mt-auto overflow-hidden">
      {/* ── CTA para profissionais ── */}
      <div className="bg-brand">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-2xl text-white">
              É profissional de construção?
            </h3>
            <p className="text-white/80 text-sm mt-1">
              Cadastre-se grátis e receba pedidos de orçamento na sua região.
            </p>
          </div>
          <button
            onClick={onOpenJoin}
            className="flex-shrink-0 bg-white text-brand font-bold rounded-lg px-8 py-3 hover:bg-cream transition-colors text-sm"
          >
            Criar perfil profissional
          </button>
        </div>
      </div>

      {/* ── Footer principal ── */}
      <div style={{ background: '#2a2925' }}>
        {/* Grid 5 colunas */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-7xl mx-auto px-6 py-16">
          {/* Coluna 1 — Baixe o app */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4 uppercase tracking-wide">
              Baixe o app
            </h4>
            <p className="text-white/50 text-sm leading-relaxed">
              Acesse pelo celular e acompanhe tudo em tempo real.
            </p>
            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={() => navigate('/app')}
                className="flex items-center gap-2 border border-white/20 rounded-lg px-4 py-2.5 hover:border-white/40 transition-colors"
              >
                <Smartphone size={18} className="text-white/60" />
                <div className="text-left">
                  <div className="text-[9px] text-white/50 uppercase tracking-wide">Disponível na</div>
                  <div className="text-xs text-white font-semibold">App Store</div>
                </div>
              </button>
              <button
                onClick={() => navigate('/app')}
                className="flex items-center gap-2 border border-white/20 rounded-lg px-4 py-2.5 hover:border-white/40 transition-colors"
              >
                <Smartphone size={18} className="text-white/60" />
                <div className="text-left">
                  <div className="text-[9px] text-white/50 uppercase tracking-wide">Disponível no</div>
                  <div className="text-xs text-white font-semibold">Google Play</div>
                </div>
              </button>
            </div>

            {/* Newsletter inline */}
            <form onSubmit={handleNewsletter} className="mt-6 space-y-2">
              <p className="text-[9px] text-white/50 uppercase tracking-wide">Newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu e-mail..."
                  required
                  className="flex-1 min-w-0 bg-white/10 border border-white/10 rounded-lg px-3 py-2 outline-none focus:border-white/40 transition-colors text-white text-xs placeholder:text-white/30"
                />
                <button
                  type="submit"
                  aria-label="Assinar newsletter"
                  className="flex-shrink-0 bg-brand hover:bg-brand text-white rounded-lg px-3 py-2 text-xs font-semibold transition-colors"
                >
                  OK
                </button>
              </div>
            </form>
          </div>

          {/* Colunas 2–5 — Desktop */}
          {columns.map((col) => (
            <div key={col.title} className="hidden lg:block">
              <h4 className="font-display font-semibold text-white text-sm mb-4 uppercase tracking-wide">
                {col.title}
              </h4>
              <ul>
                {col.links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => navigate(FOOTER_LINKS[link] ?? '/')}
                      className="block text-white/50 hover:text-white text-sm py-1 transition-colors text-left"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Colunas 2–5 — Tablet (md, não lg) */}
          <div className="lg:hidden col-span-2 md:col-span-2 grid grid-cols-2 gap-8">
            {columns.map((col) => (
              <div key={col.title} className="hidden md:block">
                <h4 className="font-display font-semibold text-white text-sm mb-4 uppercase tracking-wide">
                  {col.title}
                </h4>
                <ul>
                  {col.links.map((link) => (
                    <li key={link}>
                      <button
                        onClick={() => navigate(FOOTER_LINKS[link] ?? '/')}
                        className="block text-white/50 hover:text-white text-sm py-1 transition-colors text-left"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Accordion mobile */}
          <div className="md:hidden col-span-2 space-y-2">
            {columns.map((col) => {
              const isOpen = openColumn === col.title;
              return (
                <div
                  key={col.title}
                  className="border border-white/10 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleColumn(col.title)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="font-display font-semibold text-white text-sm uppercase tracking-wide">
                      {col.title}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-white/40 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <ul className="px-5 pb-4">
                      {col.links.map((link) => (
                        <li key={link}>
                          <button
                            onClick={() => navigate(FOOTER_LINKS[link] ?? '/')}
                            className="block text-white/50 hover:text-white text-sm py-1 transition-colors text-left"
                          >
                            {link}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom bar: logo + social + legal ── */}
        <div className="border-t border-white/10 py-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <Logo variant="horizontal" colorScheme="white" size={28} />

            {/* Social */}
            <div className="flex items-center gap-5">
              {socialLinks.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="text-white/40 hover:text-white transition-colors duration-200"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>

            {/* Links legais */}
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <button
                onClick={() => navigate('/termos')}
                className="text-white/30 text-xs hover:text-white/60 transition-colors"
              >
                Termos de Uso
              </button>
              <span className="text-white/20 text-xs">|</span>
              <button
                onClick={() => navigate('/privacidade')}
                className="text-white/30 text-xs hover:text-white/60 transition-colors"
              >
                Privacidade
              </button>
              <span className="text-white/20 text-xs">|</span>
              <button
                onClick={() => navigate('/acessibilidade')}
                className="text-white/30 text-xs hover:text-white/60 transition-colors"
              >
                Acessibilidade
              </button>
            </div>
          </div>

          {/* Copyright */}
          <div className="max-w-7xl mx-auto px-6 mt-4">
            <p className="text-white/20 text-xs text-center md:text-left">
              © 2025 ConstruCasa. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
