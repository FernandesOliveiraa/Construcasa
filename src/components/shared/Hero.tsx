import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Loader2,
  Building2,
  Zap,
  Droplets,
  Paintbrush,
  TreePine,
  Layers,
  Hammer,
  LayoutDashboard,
  Sparkles,
  Flower2,
} from 'lucide-react';

interface HeroProps {
  onSearch: (query: string) => Promise<void>;
  isSearching: boolean;
}

const CATEGORIES = [
  { label: 'Pedreiro', icon: Building2 },
  { label: 'Eletricista', icon: Zap },
  { label: 'Encanador', icon: Droplets },
  { label: 'Pintor', icon: Paintbrush },
  { label: 'Marceneiro', icon: TreePine },
  { label: 'Gesseiro', icon: Layers },
  { label: 'Reforma', icon: Hammer },
  { label: 'Arquiteto', icon: LayoutDashboard },
  { label: 'Limpeza', icon: Sparkles },
  { label: 'Jardim', icon: Flower2 },
] as const;

const HOW_IT_WORKS = [
  {
    number: 1,
    title: 'Descreva o serviço',
    description: 'Conte o que precisa, quando quer e onde você está.',
  },
  {
    number: 2,
    title: 'Receba orçamentos',
    description: 'Profissionais verificados enviam propostas em até 2 horas.',
  },
  {
    number: 3,
    title: 'Contrate com confiança',
    description:
      'Compare avaliações, escolha o melhor e acompanhe tudo pela plataforma.',
  },
] as const;

const HERO_BG: React.CSSProperties = {
  backgroundColor: '#1B2B4B',
};

export const Hero: React.FC<HeroProps> = ({ onSearch, isSearching }) => {
  const [input, setInput] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = [input.trim(), city.trim()].filter(Boolean).join(' em ');
    if (query) {
      onSearch(query);
    }
  };

  const handleCategoryClick = (label: string) => {
    onSearch(label);
  };

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden min-h-screen flex items-center pt-[103px] pb-16"
        style={HERO_BG}
        role="img"
        aria-label="Profissional de construção em ação"
      >
        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            tabIndex={-1}
            className="absolute inset-0 w-full h-full object-cover"
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%231B2B4B'/%3E%3C/svg%3E"
          >
            <source src="https://videos.pexels.com/video-files/32244801/13751986_2560_1440_50fps.mp4" type="video/mp4" />
          </video>

          {/* Overlay escuro para legibilidade do texto */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(27,43,75,0.85) 0%, rgba(27,43,75,0.65) 50%, rgba(27,43,75,0.40) 100%)' }}
          />

          {/* Overlay de cor brand sutil na base */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/3"
            style={{ background: 'linear-gradient(to top, rgba(232,93,38,0.15), transparent)' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          {/* Headline */}
          <h1
            className="font-display font-bold text-5xl lg:text-6xl text-white mb-5 max-w-2xl"
            style={{ letterSpacing: '-0.03em', lineHeight: 1.1 }}
          >
            Quem você confia,{'\n'}
            <span style={{ display: 'block' }}>para encontrar quem você precisa.</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-xl mb-10 max-w-lg"
            style={{ color: 'rgba(255,255,255,0.70)' }}
          >
            Descreva o serviço. Receba orçamentos. Contrate com confiança.
          </p>

          {/* Search bar pill */}
          <form onSubmit={handleSubmit} className="max-w-2xl w-full">
            <div className="bg-white rounded-full border border-border shadow-lg flex items-center">
              {/* Field 1: service */}
              <div className="flex items-center flex-1 px-4">
                <Search size={18} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="O que você precisa?"
                  className="flex-1 px-4 py-4 bg-transparent outline-none text-navy placeholder-slate-400 text-base"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>

              {/* Divider */}
              <div className="w-px h-8 bg-border mx-1 shrink-0" />

              {/* Field 2: city */}
              <div className="flex items-center w-36 px-3">
                <MapPin size={16} className="text-brand shrink-0" />
                <input
                  type="text"
                  placeholder="Sua cidade"
                  className="w-full py-4 px-2 bg-transparent outline-none text-navy placeholder-slate-400 text-sm"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSearching}
                className="bg-brand hover:bg-brand-dark text-white rounded-full px-6 py-3 font-semibold text-sm my-1 mr-1 flex items-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shrink-0"
              >
                {isSearching ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    <Search size={16} />
                    Buscar
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ── Category strip ── */}
      <section className="bg-white border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-6 text-center">
            Explore por categoria
          </p>
          <div className="flex items-start justify-start lg:justify-center gap-4 lg:gap-8 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => handleCategoryClick(label)}
                className="flex flex-col items-center gap-2 min-w-[72px] hover:opacity-75 transition-opacity cursor-pointer shrink-0"
              >
                <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center">
                  <Icon size={24} className="text-navy" />
                </div>
                <span className="text-xs font-medium text-navy text-center leading-tight whitespace-nowrap">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-cream py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl text-navy mb-3">
              Como o ConstruCasa funciona
            </h2>
            <p className="text-slate-500 text-lg">
              Do pedido ao profissional em poucos minutos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {HOW_IT_WORKS.map(({ number, title, description }) => (
              <div key={number} className="text-center">
                <div className="w-10 h-10 rounded-full bg-brand text-white font-display font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {number}
                </div>
                <h3 className="font-display font-semibold text-navy text-lg mb-2">
                  {title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
