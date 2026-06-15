import { useState } from 'react';
import type { ComponentType } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Zap, Droplets, Paintbrush, Hammer, Building2, Home, Grid2X2, PenSquare,
  Sparkles, Wind, Shield, Leaf, Star, MapPin, ChevronDown, ChevronUp, ArrowLeft,
} from 'lucide-react';

interface CategoriaServico {
  id: string;
  nome: string;
  descricao: string;
  icon: string;
  cor: string;
  corTexto: string;
  subcategorias: string[];
  profissionaisCount: number;
  categoria: string;
}

const CATEGORIAS_SERVICO: CategoriaServico[] = [
  {
    id: 'eletrica', nome: 'Elétrica', icon: 'Zap', cor: 'bg-amber-50', corTexto: 'text-amber-600',
    descricao: 'Instalações, reparos e laudos elétricos residenciais e comerciais.',
    subcategorias: ['Instalação de tomadas', 'Troca de disjuntores', 'Laudo elétrico', 'Instalação de ar-condicionado', 'SPDA/Para-raios'],
    profissionaisCount: 847, categoria: 'Instalações',
  },
  {
    id: 'hidraulica', nome: 'Hidráulica', icon: 'Droplets', cor: 'bg-blue-50', corTexto: 'text-blue-600',
    descricao: 'Encanamento, reparos de vazamentos, banheiros e cozinhas.',
    subcategorias: ['Conserto de vazamentos', 'Desentupimento', 'Instalação de torneiras', 'Reforma de banheiro', "Caixa d'água"],
    profissionaisCount: 623, categoria: 'Instalações',
  },
  {
    id: 'pintura', nome: 'Pintura', icon: 'Paintbrush', cor: 'bg-orange-50', corTexto: 'text-orange-600',
    descricao: 'Pintura interna, externa, textura e acabamentos especiais.',
    subcategorias: ['Pintura interna', 'Pintura externa', 'Textura', 'Epóxi', 'Grafitagem decorativa'],
    profissionaisCount: 934, categoria: 'Acabamentos',
  },
  {
    id: 'marcenaria', nome: 'Marcenaria', icon: 'Hammer', cor: 'bg-yellow-50', corTexto: 'text-yellow-700',
    descricao: 'Móveis planejados, reparos em madeira e carpintaria geral.',
    subcategorias: ['Móveis planejados', 'Portas e janelas', 'Deck de madeira', 'Reparos em móveis', 'Carpintaria'],
    profissionaisCount: 412, categoria: 'Acabamentos',
  },
  {
    id: 'alvenaria', nome: 'Alvenaria', icon: 'Building2', cor: 'bg-stone-50', corTexto: 'text-stone-600',
    descricao: 'Construção de paredes, demolição e serviços de pedreiro.',
    subcategorias: ['Paredes e muros', 'Demolição controlada', 'Contrapiso', 'Reboco e gesso', 'Construção de ambientes'],
    profissionaisCount: 758, categoria: 'Construção',
  },
  {
    id: 'telhado', nome: 'Telhado', icon: 'Home', cor: 'bg-red-50', corTexto: 'text-red-600',
    descricao: 'Troca de telhas, impermeabilização e estrutura de cobertura.',
    subcategorias: ['Troca de telhas', 'Impermeabilização', 'Estrutura de madeira', 'Calhas e rufos', 'Telhado verde'],
    profissionaisCount: 289, categoria: 'Construção',
  },
  {
    id: 'piso', nome: 'Piso e Revestimento', icon: 'Grid2X2', cor: 'bg-purple-50', corTexto: 'text-purple-600',
    descricao: 'Assentamento de cerâmica, porcelanato, madeira e vinílico.',
    subcategorias: ['Cerâmica e porcelanato', 'Piso de madeira', 'Piso vinílico', 'Piso polido', 'Revestimento de fachada'],
    profissionaisCount: 556, categoria: 'Acabamentos',
  },
  {
    id: 'arquitetura', nome: 'Arquitetura e Projetos', icon: 'PenSquare', cor: 'bg-green-50', corTexto: 'text-green-600',
    descricao: 'Projetos arquitetônicos, interiores e complementares.',
    subcategorias: ['Projeto arquitetônico', 'Design de interiores', 'Projeto elétrico', 'Projeto hidráulico', 'Render 3D'],
    profissionaisCount: 321, categoria: 'Projetos',
  },
  {
    id: 'limpeza', nome: 'Limpeza Pós-Obra', icon: 'Sparkles', cor: 'bg-cyan-50', corTexto: 'text-cyan-600',
    descricao: 'Limpeza profissional após reformas e construções.',
    subcategorias: ['Limpeza fina', 'Limpeza pesada', 'Limpeza de vidros', 'Limpeza de fachada', 'Polimento de piso'],
    profissionaisCount: 445, categoria: 'Serviços',
  },
  {
    id: 'ar-condicionado', nome: 'Ar-Condicionado', icon: 'Wind', cor: 'bg-sky-50', corTexto: 'text-sky-600',
    descricao: 'Instalação, manutenção e higienização de aparelhos.',
    subcategorias: ['Instalação', 'Manutenção preventiva', 'Higienização', 'Desinstalação', 'Projetos de climatização'],
    profissionaisCount: 378, categoria: 'Instalações',
  },
  {
    id: 'serralheria', nome: 'Serralheria e Vidraçaria', icon: 'Shield', cor: 'bg-gray-50', corTexto: 'text-gray-600',
    descricao: 'Grades, portões, estruturas metálicas e vidros.',
    subcategorias: ['Grades e portões', 'Estruturas metálicas', 'Vidros e espelhos', 'Box de banheiro', 'Janelas de alumínio'],
    profissionaisCount: 267, categoria: 'Instalações',
  },
  {
    id: 'garden', nome: 'Paisagismo e Jardins', icon: 'Leaf', cor: 'bg-emerald-50', corTexto: 'text-emerald-600',
    descricao: 'Projetos de jardim, manutenção e paisagismo.',
    subcategorias: ['Projeto de jardim', 'Manutenção', 'Irrigação', 'Grama e gramado', 'Árvores e plantas'],
    profissionaisCount: 198, categoria: 'Serviços',
  },
];

const ICON_MAP: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  Zap, Droplets, Paintbrush, Hammer, Building2, Home, Grid2X2, PenSquare, Sparkles, Wind, Shield, Leaf,
};

interface ProMock {
  id: string;
  nome: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  cidade: string;
  badge?: string;
  precoHora: string;
  especialidades: string[];
}

const PROS_MOCK: ProMock[] = [
  { id: '1', nome: 'Carlos Eduardo Lima', avatar: 'https://i.pravatar.cc/100?img=11', rating: 4.9, reviewsCount: 127, cidade: 'São Paulo, SP', badge: 'Premium', precoHora: 'R$ 180/h', especialidades: ['Instalações residenciais', 'Laudo técnico', 'SPDA'] },
  { id: '2', nome: 'Marcos Vieira', avatar: 'https://i.pravatar.cc/100?img=12', rating: 4.8, reviewsCount: 89, cidade: 'São Paulo, SP', precoHora: 'R$ 150/h', especialidades: ['Tomadas e interruptores', 'Quadro elétrico'] },
  { id: '3', nome: 'Ana Paula Freitas', avatar: 'https://i.pravatar.cc/100?img=13', rating: 4.7, reviewsCount: 63, cidade: 'Guarulhos, SP', badge: 'Verificado', precoHora: 'R$ 130/h', especialidades: ['Ar-condicionado', 'Instalações comerciais'] },
  { id: '4', nome: 'Roberto Santos', avatar: 'https://i.pravatar.cc/100?img=14', rating: 4.9, reviewsCount: 201, cidade: 'Santo André, SP', badge: 'Premium', precoHora: 'R$ 200/h', especialidades: ['Projetos elétricos', 'Laudo SPDA'] },
  { id: '5', nome: 'Fernanda Rocha', avatar: 'https://i.pravatar.cc/100?img=15', rating: 4.6, reviewsCount: 44, cidade: 'São Bernardo, SP', precoHora: 'R$ 120/h', especialidades: ['Residencial', 'Condomínios'] },
  { id: '6', nome: 'Paulo Henrique', avatar: 'https://i.pravatar.cc/100?img=16', rating: 4.8, reviewsCount: 76, cidade: 'Osasco, SP', badge: 'Verificado', precoHora: 'R$ 160/h', especialidades: ['Automação residencial', 'Fotovoltaico'] },
];

interface FaqItem {
  pergunta: string;
  resposta: string;
}

function getFaqPorCategoria(nomeCategoria: string): FaqItem[] {
  return [
    {
      pergunta: `Quanto tempo leva um serviço de ${nomeCategoria}?`,
      resposta: `O prazo varia conforme o escopo do projeto. Serviços simples costumam ser concluídos em 1 a 2 dias, enquanto projetos maiores podem levar de 1 a 4 semanas. Solicite um orçamento detalhado com cronograma.`,
    },
    {
      pergunta: `Os profissionais de ${nomeCategoria} são verificados?`,
      resposta: `Sim. Todos os profissionais passam por verificação de documentos, histórico e avaliações antes de serem aprovados na plataforma ConstruCasa.`,
    },
    {
      pergunta: `Posso solicitar mais de um orçamento para o mesmo serviço?`,
      resposta: `Sim, é possível e recomendado! Você pode receber até 5 orçamentos de diferentes profissionais e comparar preços, prazos e avaliações antes de contratar.`,
    },
  ];
}

function FaqAccordion({ faq }: { faq: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faq.map((item, idx) => (
        <div key={idx} className="card overflow-hidden">
          <button
            className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          >
            <span className="font-semibold text-navy">{item.pergunta}</span>
            {openIndex === idx ? (
              <ChevronUp size={18} className="text-brand flex-shrink-0" />
            ) : (
              <ChevronDown size={18} className="text-navy/40 flex-shrink-0" />
            )}
          </button>
          {openIndex === idx && (
            <div className="px-6 pb-5 text-navy/70 text-sm leading-relaxed">
              {item.resposta}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ServicosCategoriaPage() {
  const navigate = useNavigate();
  const { categoria } = useParams<{ categoria: string }>();

  const categoriaEncontrada = CATEGORIAS_SERVICO.find((c) => c.id === categoria);

  if (!categoriaEncontrada) {
    return (
      <div className="min-h-screen bg-cream">
        <section className="section-navy" style={{ paddingTop: '103px' }}>
          <div className="max-w-7xl mx-auto px-6 py-24 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Serviço não encontrado</h1>
            <p className="text-white/70 mb-8">A categoria que você buscou não existe em nossa plataforma.</p>
            <button className="btn-primary" onClick={() => navigate('/servicos')}>
              <ArrowLeft size={18} />
              Ver todos os serviços
            </button>
          </div>
        </section>
      </div>
    );
  }

  const IconComponent = ICON_MAP[categoriaEncontrada.icon];
  const faq = getFaqPorCategoria(categoriaEncontrada.nome);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="section-navy" style={{ paddingTop: '103px' }}>
        <div className="max-w-7xl mx-auto px-6 py-20">
          <button
            className="flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors text-sm"
            onClick={() => navigate('/servicos')}
          >
            <ArrowLeft size={16} />
            Todos os serviços
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(232,93,38,0.2)' }}>
              {IconComponent && <IconComponent size={36} className="text-brand" />}
            </div>

            <div className="flex-1">
              <span className="badge badge-brand mb-3">{categoriaEncontrada.categoria}</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                {categoriaEncontrada.nome}
              </h1>
              <p className="text-white/70 text-lg mb-4 max-w-2xl">
                {categoriaEncontrada.descricao}
              </p>
              <p className="text-white/50 text-sm mb-6">
                {categoriaEncontrada.profissionaisCount.toLocaleString('pt-BR')} profissionais verificados
              </p>
              <button className="btn-primary text-base px-8 py-3" onClick={() => navigate('/')}>
                Solicitar Orçamento
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Subcategorias */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-navy mb-6">Serviços Incluídos</h2>
          <div className="flex flex-wrap gap-3">
            {categoriaEncontrada.subcategorias.map((sub) => (
              <span
                key={sub}
                className="px-4 py-2 bg-cream rounded-full text-sm font-medium text-navy border border-border"
              >
                {sub}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Profissionais em Destaque */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-navy mb-2">Profissionais Verificados</h2>
          <p className="text-navy/60 text-sm mb-8">
            * Mostrando exemplos. Busque para ver profissionais reais na sua região.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROS_MOCK.map((pro) => (
              <div key={pro.id} className="card p-5 flex flex-col">
                {/* Topo */}
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={pro.avatar}
                    alt={pro.nome}
                    className="w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-border"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-navy text-base truncate">{pro.nome}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star size={13} className="text-amber-400 fill-amber-400" />
                      <span className="text-sm font-semibold text-navy">{pro.rating}</span>
                      <span className="text-xs text-navy/50">({pro.reviewsCount} avaliações)</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin size={12} className="text-navy/40" />
                      <span className="text-xs text-navy/60">{pro.cidade}</span>
                    </div>
                  </div>
                </div>

                {/* Badge + preço */}
                <div className="flex items-center gap-2 mb-3">
                  {pro.badge && (
                    <span className="badge badge-brand text-xs">{pro.badge}</span>
                  )}
                  <span className="text-brand font-bold text-sm ml-auto">{pro.precoHora}</span>
                </div>

                {/* Especialidades */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {pro.especialidades.map((esp) => (
                    <span key={esp} className="px-2.5 py-1 bg-cream rounded-full text-xs text-navy/70 border border-border">
                      {esp}
                    </span>
                  ))}
                </div>

                <button
                  className="btn-secondary w-full mt-auto text-sm"
                  onClick={() => navigate('/')}
                >
                  Ver Perfil
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-navy mb-10 text-center">Como Funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                titulo: 'Descreva',
                descricao: 'Conte o que você precisa. Nossa IA interpreta seu pedido e identifica a categoria certa.',
              },
              {
                step: '2',
                titulo: 'Receba orçamentos',
                descricao: 'Profissionais verificados enviam propostas com preço, prazo e portfólio.',
              },
              {
                step: '3',
                titulo: 'Contrate com segurança',
                descricao: 'Compare, escolha e contrate. Todo o histórico de avaliações é real e auditado.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-brand text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">{item.titulo}</h3>
                <p className="text-navy/60 text-sm leading-relaxed">{item.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-navy mb-8">
            Perguntas sobre {categoriaEncontrada.nome}
          </h2>
          <FaqAccordion faq={faq} />
        </div>
      </section>

      {/* CTA */}
      <section className="section-navy py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para contratar?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Encontre o melhor profissional de {categoriaEncontrada.nome} para o seu projeto agora mesmo.
          </p>
          <button className="btn-primary text-lg px-10 py-4" onClick={() => navigate('/')}>
            Solicitar Orçamento Agora
          </button>
        </div>
      </section>
    </div>
  );
}
