import React from 'react';
import { Users, Briefcase, Star, Clock } from 'lucide-react';

const MEDIA_BRANDS = [
  'Exame',
  'InfoMoney',
  'Veja SP',
  'UOL',
  'Estadão',
  'Exame',
  'InfoMoney',
  'Veja SP',
  'UOL',
  'Estadão',
];

interface Stat {
  icon: React.ElementType;
  value: string;
  label: string;
  sublabel: string;
}

const STATS: Stat[] = [
  {
    icon: Users,
    value: '10.247',
    label: 'Profissionais',
    sublabel: 'verificados',
  },
  {
    icon: Briefcase,
    value: '48.392',
    label: 'Serviços',
    sublabel: 'realizados',
  },
  {
    icon: Star,
    value: '4.9★',
    label: 'Avaliação',
    sublabel: 'média',
  },
  {
    icon: Clock,
    value: '< 2h',
    label: 'Resposta média',
    sublabel: 'dos profissionais',
  },
];

export const BrandBar: React.FC = () => {
  return (
    <div>
      {/* ── Seção 1: Presente nas principais mídias ── */}
      <div className="bg-white border-y border-border py-8">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-slate-400 text-sm mb-5">
            Confiado por clientes que já viram na mídia:
          </p>

          {/* Marquee wrapper */}
          <div
            className="relative flex overflow-hidden select-none"
            style={{
              maskImage:
                'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
            }}
          >
            {/* Two identical lists for seamless loop */}
            <div className="flex shrink-0 items-center gap-16 animate-marquee">
              {MEDIA_BRANDS.map((brand, i) => (
                <span
                  key={`a-${i}`}
                  className="font-display font-bold text-lg text-slate-300 hover:text-slate-500 transition-colors duration-300 cursor-default whitespace-nowrap"
                >
                  {brand}
                </span>
              ))}
            </div>
            <div
              className="flex shrink-0 items-center gap-16 animate-marquee"
              aria-hidden="true"
            >
              {MEDIA_BRANDS.map((brand, i) => (
                <span
                  key={`b-${i}`}
                  className="font-display font-bold text-lg text-slate-300 hover:text-slate-500 transition-colors duration-300 cursor-default whitespace-nowrap"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Seção 2: Stats de impacto ── */}
      <div className="bg-cream py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display font-bold text-3xl text-navy text-center mb-12">
            Números que falam por si
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {STATS.map(({ icon: Icon, value, label, sublabel }) => (
              <div key={label} className="flex flex-col items-center text-center">
                <Icon size={32} className="text-brand mb-3 opacity-40" />
                <p className="font-display font-bold text-5xl text-brand leading-none">{value}</p>
                <p className="text-sm text-slate-500 mt-2 font-medium">{label}</p>
                <p className="text-xs text-slate-400">{sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
