import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

interface Testimonial {
  rating: number;
  text: string;
  author: string;
  city: string;
  date: string;
  service: string;
  initials: string;
  avatarBg: string;
  avatarText: string;
}

const AVATAR_COLORS = [
  { bg: 'bg-amber-100', text: 'text-amber-700' },
  { bg: 'bg-orange-100', text: 'text-orange-700' },
  { bg: 'bg-stone-100', text: 'text-stone-700' },
  { bg: 'bg-red-100', text: 'text-red-700' },
  { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  { bg: 'bg-brand-subtle', text: 'text-brand' },
];

const TESTIMONIALS: Testimonial[] = [
  {
    rating: 5,
    text: "Contratei o encanador para uma reforma completa do banheiro. Chegou no horário, trouxe todos os materiais e entregou em 8 dias. O acabamento ficou impecável — melhor do que eu imaginava.",
    author: "Carlos M.",
    city: "São Paulo, SP",
    date: "há 3 dias",
    service: "Reforma de Banheiro",
    initials: "CM",
    avatarBg: AVATAR_COLORS[0].bg,
    avatarText: AVATAR_COLORS[0].text,
  },
  {
    rating: 5,
    text: "Precisava de um eletricista com urgência — um curto-circuito que assustou a família toda. Em menos de 2 horas já tinham me mandado 3 orçamentos. A Ana resolveu tudo na mesma tarde, pontual e com preço justo.",
    author: "Ana L.",
    city: "Rio de Janeiro, RJ",
    date: "há 1 semana",
    service: "Instalação Elétrica",
    initials: "AL",
    avatarBg: AVATAR_COLORS[1].bg,
    avatarText: AVATAR_COLORS[1].text,
  },
  {
    rating: 5,
    text: "Queria pintar o apartamento antes de alugar. O Roberto veio, avaliou e deu um orçamento claro. Em 4 dias o imóvel estava pintado, limpo e pronto. Aluguei na primeira visita.",
    author: "Roberto S.",
    city: "Belo Horizonte, MG",
    date: "há 2 semanas",
    service: "Pintura Residencial",
    initials: "RS",
    avatarBg: AVATAR_COLORS[2].bg,
    avatarText: AVATAR_COLORS[2].text,
  },
  {
    rating: 5,
    text: "Minha cozinha precisava de um piso novo. O pedreiro trouxe os materiais, não precisei ir em nenhuma loja. Ele mesmo ajudou a escolher o modelo que combinava com o ambiente. Resultado lindo!",
    author: "Julia F.",
    city: "São Paulo, SP",
    date: "há 3 semanas",
    service: "Troca de Piso",
    initials: "JF",
    avatarBg: AVATAR_COLORS[3].bg,
    avatarText: AVATAR_COLORS[3].text,
  },
  {
    rating: 5,
    text: "Instalação de dois splits em ambientes diferentes. O Marcelo passou um orçamento detalhado e foi o único que explicou o motivo de cada custo. Serviço rápido, sem sujeira e com nota fiscal.",
    author: "Marcelo P.",
    city: "Curitiba, PR",
    date: "há 1 mês",
    service: "Instalação de Ar-Condicionado",
    initials: "MP",
    avatarBg: AVATAR_COLORS[4].bg,
    avatarText: AVATAR_COLORS[4].text,
  },
  {
    rating: 5,
    text: "Reforma pequena na cozinha: troca de azulejos e um balcão novo. A Fernanda me indicou o profissional certo pelo chat e o serviço ficou dentro do orçamento combinado. Recomendo a todas as amigas.",
    author: "Fernanda C.",
    city: "Salvador, BA",
    date: "há 1 mês",
    service: "Reforma de Cozinha",
    initials: "FC",
    avatarBg: AVATAR_COLORS[5].bg,
    avatarText: AVATAR_COLORS[5].text,
  },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, idx) => (
      <Star
        key={idx}
        size={13}
        className={idx < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 fill-slate-200'}
      />
    ))}
  </div>
);

const InitialsAvatar: React.FC<{ initials: string; bgClass: string; textClass: string }> = ({
  initials,
  bgClass,
  textClass,
}) => (
  <div
    className={`w-11 h-11 rounded-full ${bgClass} ${textClass} flex items-center justify-center font-bold text-sm font-display flex-shrink-0`}
  >
    {initials}
  </div>
);

const TestimonialCard: React.FC<{ t: Testimonial }> = ({ t }) => (
  <div className="bg-white border border-border rounded-2xl p-6 shadow-sm break-inside-avoid mb-6">
    {/* Card header: avatar + name + city */}
    <div className="flex items-center gap-3 mb-3">
      <InitialsAvatar initials={t.initials} bgClass={t.avatarBg} textClass={t.avatarText} />
      <div className="min-w-0 flex-1">
        <p className="font-display font-bold text-navy text-sm leading-tight">{t.author}</p>
        <p className="text-xs text-slate-400 mt-0.5">{t.city}</p>
      </div>
      {/* Service badge */}
      <span className="bg-amber-50 border border-amber-100 text-amber-800 rounded-full px-3 py-1 text-xs font-medium flex-shrink-0">
        {t.service}
      </span>
    </div>

    {/* Rating */}
    <StarRating rating={t.rating} />

    {/* Testimonial text */}
    <p className="mt-3 text-slate-600 text-sm leading-relaxed">{t.text}</p>

    {/* Footer */}
    <p className="mt-4 text-xs text-slate-400">via ConstruCasa · {t.date}</p>
  </div>
);

const STATS = [
  { value: '12.847', label: 'avaliações' },
  { value: '4.9/5', label: 'média' },
  { value: '98%', label: 'recomendariam' },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2 text-sm font-medium shadow-sm mb-6">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="text-slate-700">4.9 · 12.847 avaliações verificadas</span>
          </div>

          <h2 className="font-display font-bold text-4xl md:text-5xl text-navy mb-4 text-balance">
            Quem usa, recomenda.
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Histórias reais de clientes que encontraram o profissional certo.
          </p>
        </div>

        {/* Trust signal — Satisfação Garantida */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex flex-col sm:flex-row items-center gap-6 bg-cream rounded-2xl border border-border p-6">
            <div className="w-14 h-14 rounded-full bg-brand-subtle flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={24} className="text-brand" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-navy mb-1">Satisfação garantida</h3>
              <p className="text-sm text-slate-500">
                Não ficou satisfeito com o profissional? Nossa equipe está pronta para resolver. Trabalhamos para garantir que sua experiência seja sempre positiva.
              </p>
            </div>
            <a href="#" className="text-brand font-semibold text-sm hover:underline whitespace-nowrap flex-shrink-0">
              Saiba mais →
            </a>
          </div>
        </div>

        {/* Masonry-like grid */}
        <div className="max-w-6xl mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </div>
        </div>

        {/* Bottom stats strip */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-center gap-8 lg:gap-16 text-center">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="font-display font-bold text-3xl text-brand leading-none">
                {stat.value}
              </span>
              <span className="text-sm text-slate-500 mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
