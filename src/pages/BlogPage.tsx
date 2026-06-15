import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, User, ChevronRight } from 'lucide-react';

const CATEGORIAS = ['todos', 'Reforma', 'Decoração', 'Dicas', 'Mercado', 'Tecnologia'];

const ARTIGOS = [
  {
    id: '1',
    slug: 'como-planejar-reforma-apartamento',
    titulo: 'Como Planejar a Reforma do seu Apartamento sem Estresse',
    excerpt: 'Guia completo com checklist, cronograma e dicas de especialistas para uma reforma tranquila.',
    categoria: 'Reforma',
    autor: 'Rafael Mendes',
    dataPublicacao: '22 Mai 2025',
    tempoLeitura: '8 min',
    imagem: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80',
    destaque: true,
  },
  {
    id: '2',
    slug: 'tendencias-design-interiores-2025',
    titulo: '10 Tendências de Design de Interiores para 2025',
    excerpt: 'Do minimalismo japonês ao biofílico, veja o que vai dominar os projetos este ano.',
    categoria: 'Decoração',
    autor: 'Camila Torres',
    dataPublicacao: '18 Mai 2025',
    tempoLeitura: '6 min',
    imagem: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    destaque: true,
  },
  {
    id: '3',
    slug: 'como-contratar-eletricista',
    titulo: 'Como Contratar um Eletricista: 7 Perguntas que Você Precisa Fazer',
    excerpt: 'Antes de fechar contrato, saiba o que perguntar para garantir um serviço seguro e com garantia.',
    categoria: 'Dicas',
    autor: 'Diego Alves',
    dataPublicacao: '14 Mai 2025',
    tempoLeitura: '5 min',
    imagem: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
    destaque: false,
  },
  {
    id: '4',
    slug: 'mercado-reformas-brasil-2025',
    titulo: 'Mercado de Reformas no Brasil Cresce 18% e Deve Atingir R$ 400 Bi',
    excerpt: 'Dados do setor mostram aceleração impulsionada por crédito imobiliário e valorização dos imóveis.',
    categoria: 'Mercado',
    autor: 'Juliana Costa',
    dataPublicacao: '10 Mai 2025',
    tempoLeitura: '4 min',
    imagem: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    destaque: false,
  },
  {
    id: '5',
    slug: 'ia-no-mercado-de-reformas',
    titulo: 'Como a IA Está Transformando o Setor de Reformas',
    excerpt: 'Do orçamento automático ao projeto 3D, conheça as ferramentas que já estão mudando tudo.',
    categoria: 'Tecnologia',
    autor: 'Rafael Mendes',
    dataPublicacao: '05 Mai 2025',
    tempoLeitura: '7 min',
    imagem: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=800&q=80',
    destaque: false,
  },
  {
    id: '6',
    slug: 'dicas-economia-reforma',
    titulo: '12 Maneiras de Economizar na Reforma sem Abrir Mão da Qualidade',
    excerpt: 'Estratégias práticas que profissionais usam e que você pode aplicar na sua próxima obra.',
    categoria: 'Dicas',
    autor: 'Camila Torres',
    dataPublicacao: '01 Mai 2025',
    tempoLeitura: '9 min',
    imagem: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80',
    destaque: false,
  },
];

interface Artigo {
  id: string;
  slug: string;
  titulo: string;
  excerpt: string;
  categoria: string;
  autor: string;
  dataPublicacao: string;
  tempoLeitura: string;
  imagem: string;
  destaque: boolean;
}

function ArticleMeta({ artigo }: { artigo: Artigo }) {
  return (
    <div className="flex items-center gap-4 text-sm text-navy opacity-60">
      <span className="flex items-center gap-1">
        <User size={14} />
        {artigo.autor}
      </span>
      <span>{artigo.dataPublicacao}</span>
      <span className="flex items-center gap-1">
        <Clock size={14} />
        {artigo.tempoLeitura}
      </span>
    </div>
  );
}

export default function BlogPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const artigosDestaque = ARTIGOS.filter((a) => a.destaque);
  const artigosFiltrados =
    activeCategory === 'todos'
      ? ARTIGOS.filter((a) => !a.destaque)
      : ARTIGOS.filter((a) => a.categoria === activeCategory);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="section-navy" style={{ paddingTop: '103px' }}>
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="font-display text-5xl font-bold text-white mb-4">
            Blog ConstruCasa
          </h1>
          <p className="text-lg text-white opacity-75 mb-10 max-w-xl mx-auto">
            Dicas, tendências e tudo que você precisa saber sobre reformas e construção.
          </p>
          <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-navy opacity-40" size={20} />
            <input
              type="text"
              placeholder="Buscar artigos..."
              className="input-base w-full pl-12"
              readOnly
            />
          </div>
        </div>
      </section>

      {/* Artigos em Destaque */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-navy mb-10">Em Destaque</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Card grande */}
            {artigosDestaque[0] && (
              <div
                className="card lg:col-span-2 overflow-hidden cursor-pointer"
                onClick={() => navigate(`/artigos/${artigosDestaque[0].slug}`)}
              >
                <img
                  src={artigosDestaque[0].imagem}
                  alt={artigosDestaque[0].titulo}
                  className="w-full object-cover"
                  style={{ height: '350px' }}
                />
                <div className="p-8">
                  <span className="badge-brand text-sm mb-3 inline-block">
                    {artigosDestaque[0].categoria}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-navy mb-3 leading-tight">
                    {artigosDestaque[0].titulo}
                  </h3>
                  <p className="text-navy opacity-70 mb-4">{artigosDestaque[0].excerpt}</p>
                  <ArticleMeta artigo={artigosDestaque[0]} />
                  <button
                    className="btn-primary mt-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/artigos/${artigosDestaque[0].slug}`);
                    }}
                  >
                    Ler artigo <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Card menor */}
            {artigosDestaque[1] && (
              <div
                className="card overflow-hidden cursor-pointer"
                onClick={() => navigate(`/artigos/${artigosDestaque[1].slug}`)}
              >
                <img
                  src={artigosDestaque[1].imagem}
                  alt={artigosDestaque[1].titulo}
                  className="w-full object-cover"
                  style={{ height: '200px' }}
                />
                <div className="p-6">
                  <span className="badge-brand text-sm mb-3 inline-block">
                    {artigosDestaque[1].categoria}
                  </span>
                  <h3 className="font-display text-xl font-bold text-navy mb-2 leading-tight">
                    {artigosDestaque[1].titulo}
                  </h3>
                  <p className="text-navy opacity-70 text-sm mb-4">{artigosDestaque[1].excerpt}</p>
                  <ArticleMeta artigo={artigosDestaque[1]} />
                  <button
                    className="btn-ghost mt-4 px-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/artigos/${artigosDestaque[1].slug}`);
                    }}
                  >
                    Ler artigo <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categorias + Grid */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filtros */}
          <div className="flex flex-wrap gap-3 mb-10">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full font-semibold text-sm border transition-colors ${
                  activeCategory === cat
                    ? 'bg-brand text-white border-brand'
                    : 'bg-white text-navy border-border hover:border-brand hover:text-brand'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Grid */}
          {artigosFiltrados.length === 0 ? (
            <p className="text-navy opacity-60 text-center py-12">
              Nenhum artigo nesta categoria ainda.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artigosFiltrados.map((artigo) => (
                <div
                  key={artigo.id}
                  className="card overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/artigos/${artigo.slug}`)}
                >
                  <img
                    src={artigo.imagem}
                    alt={artigo.titulo}
                    className="w-full object-cover"
                    style={{ height: '200px' }}
                  />
                  <div className="p-6">
                    <span className="badge-brand text-xs mb-3 inline-block">
                      {artigo.categoria}
                    </span>
                    <h3 className="font-display text-lg font-bold text-navy mb-2 leading-tight line-clamp-2">
                      {artigo.titulo}
                    </h3>
                    <p className="text-navy opacity-70 text-sm mb-4 line-clamp-2">
                      {artigo.excerpt}
                    </p>
                    <ArticleMeta artigo={artigo} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-navy py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            Receba dicas direto no seu email
          </h2>
          <p className="text-white opacity-75 mb-8">
            Conteúdo selecionado toda semana para quem quer reformar com inteligência.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="seu@email.com"
              className="input-base flex-1"
            />
            <button className="btn-primary whitespace-nowrap">Assinar grátis</button>
          </div>
        </div>
      </section>
    </div>
  );
}
