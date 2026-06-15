import { useNavigate } from 'react-router-dom';
import { Search, Droplets, Paintbrush, Zap, Grid2X2, Building2, Home, ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Guia {
  slug: string;
  titulo: string;
  descricao: string;
  categoria: string;
  precoMin: number;
  precoMax: number;
  unidade?: string;
  icon: string;
  popular: boolean;
}

const GUIAS: Guia[] = [
  {
    slug: 'custo-reforma-banheiro',
    titulo: 'Custo de Reforma de Banheiro',
    descricao: 'Quanto custa reformar um banheiro em 2025? Veja tabelas por tamanho e padrão.',
    categoria: 'Hidráulica',
    precoMin: 2800,
    precoMax: 18000,
    icon: 'Droplets',
    popular: true,
  },
  {
    slug: 'custo-pintura-casa',
    titulo: 'Custo de Pintura Residencial',
    descricao: 'Preço por metro quadrado de pintura interna e externa com todos os acabamentos.',
    categoria: 'Pintura',
    precoMin: 15,
    precoMax: 55,
    unidade: 'm²',
    icon: 'Paintbrush',
    popular: true,
  },
  {
    slug: 'custo-instalacao-eletrica',
    titulo: 'Custo de Instalação Elétrica',
    descricao: 'Preço de pontos elétricos, quadro de distribuição e laudo técnico.',
    categoria: 'Elétrica',
    precoMin: 120,
    precoMax: 400,
    unidade: 'ponto',
    icon: 'Zap',
    popular: true,
  },
  {
    slug: 'custo-piso-revestimento',
    titulo: 'Custo de Piso e Revestimento',
    descricao: 'Tabela completa: cerâmica, porcelanato, madeira e vinílico por m².',
    categoria: 'Acabamento',
    precoMin: 45,
    precoMax: 180,
    unidade: 'm²',
    icon: 'Grid2X2',
    popular: false,
  },
  {
    slug: 'custo-construcao-muro',
    titulo: 'Custo de Construção de Muro',
    descricao: 'Preço por metro linear de muro em alvenaria, misto ou pré-moldado.',
    categoria: 'Alvenaria',
    precoMin: 380,
    precoMax: 950,
    unidade: 'metro linear',
    icon: 'Building2',
    popular: false,
  },
  {
    slug: 'custo-telhado',
    titulo: 'Custo de Reforma de Telhado',
    descricao: 'Troca de telhas, impermeabilização e estrutura — tudo por m².',
    categoria: 'Telhado',
    precoMin: 80,
    precoMax: 300,
    unidade: 'm²',
    icon: 'Home',
    popular: false,
  },
];

const ICON_MAP: Record<string, LucideIcon> = {
  Droplets,
  Paintbrush,
  Zap,
  Grid2X2,
  Building2,
  Home,
};

function formatPreco(value: number): string {
  return value.toLocaleString('pt-BR');
}

function PrecoFaixa({ guia }: { guia: Guia }) {
  const unidade = guia.unidade ? `/${guia.unidade}` : '';
  return (
    <span className="text-brand font-bold">
      R$ {formatPreco(guia.precoMin)} – R$ {formatPreco(guia.precoMax)}
      {unidade && <span className="text-sm font-normal text-navy opacity-60">{unidade}</span>}
    </span>
  );
}

export default function GuiasPage() {
  const navigate = useNavigate();

  const guiasPopulares = GUIAS.filter((g) => g.popular);
  const todosGuias = GUIAS;

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="section-navy" style={{ paddingTop: '103px' }}>
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <span className="inline-block bg-white text-brand font-semibold text-sm px-4 py-1 rounded-full mb-5">
            Gratuito
          </span>
          <h1 className="font-display text-5xl font-bold text-white mb-4">
            Guias de Custo de Obras
          </h1>
          <p className="text-lg text-white opacity-75 mb-10 max-w-xl mx-auto">
            Pesquise o preço justo antes de contratar. Dados atualizados com base em orçamentos reais.
          </p>
          <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-navy opacity-40" size={20} />
            <input
              type="text"
              placeholder="Buscar guia de custo..."
              className="input-base w-full pl-12"
              readOnly
            />
          </div>
        </div>
      </section>

      {/* Guias em Destaque */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-navy mb-10">Mais consultados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guiasPopulares.map((guia) => {
              const Icon = ICON_MAP[guia.icon];
              return (
                <div key={guia.slug} className="bg-cream rounded-2xl p-6 border border-border hover:border-brand transition-colors">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4">
                    {Icon && <Icon size={24} className="text-brand" />}
                  </div>
                  <span className="badge-brand text-xs mb-3 inline-block">{guia.categoria}</span>
                  <h3 className="font-display text-xl font-bold text-navy mb-2">{guia.titulo}</h3>
                  <p className="text-navy opacity-70 text-sm mb-4">{guia.descricao}</p>
                  <div className="mb-5">
                    <PrecoFaixa guia={guia} />
                  </div>
                  <button
                    className="btn-primary w-full"
                    onClick={() => navigate(`/guias/${guia.slug}`)}
                  >
                    Ver Guia <ChevronRight size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Todos os Guias */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-navy mb-10">Todos os Guias</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todosGuias.map((guia) => {
              const Icon = ICON_MAP[guia.icon];
              return (
                <div
                  key={guia.slug}
                  className="card p-4 flex items-center gap-4 cursor-pointer hover:border-brand transition-colors"
                  onClick={() => navigate(`/guias/${guia.slug}`)}
                >
                  <div className="w-10 h-10 bg-brand-subtle rounded-lg flex items-center justify-center flex-shrink-0">
                    {Icon && <Icon size={20} className="text-brand" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-navy text-sm leading-tight mb-1 truncate">
                      {guia.titulo}
                    </h3>
                    <PrecoFaixa guia={guia} />
                  </div>
                  <ChevronRight size={16} className="text-navy opacity-40 flex-shrink-0" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Calculadora */}
      <section className="section-navy py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            Não encontrou o que procura?
          </h2>
          <p className="text-white opacity-75 mb-8 text-lg">
            Use nossa Calculadora para estimar o custo da sua obra.
          </p>
          <button
            className="btn-primary text-base px-8 py-3"
            onClick={() => navigate('/calculadora')}
          >
            Usar Calculadora
          </button>
        </div>
      </section>
    </div>
  );
}
