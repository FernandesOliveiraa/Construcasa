import { useState, useMemo } from 'react';
import type { ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Zap, Droplets, Paintbrush, Hammer, Building2, Home, Grid2X2, PenSquare, Sparkles, Wind, Shield, Leaf } from 'lucide-react';

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

const FILTROS = ['Todas', 'Instalações', 'Acabamentos', 'Construção', 'Projetos', 'Serviços'] as const;

export default function ServicosPage() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>('todas');

  const categoriasFiltradas = useMemo(() => {
    let resultado = CATEGORIAS_SERVICO.filter(
      (c) =>
        c.nome.toLowerCase().includes(busca.toLowerCase()) ||
        c.subcategorias.some((s) => s.toLowerCase().includes(busca.toLowerCase())),
    );
    if (categoriaAtiva !== 'todas') {
      resultado = resultado.filter((c) => c.categoria === categoriaAtiva);
    }
    return resultado;
  }, [busca, categoriaAtiva]);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="section-navy" style={{ paddingTop: '103px' }}>
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Todos os Serviços
          </h1>
          <p className="text-xl text-white/70 mb-3 max-w-2xl mx-auto">
            Explore nossa lista completa e encontre o profissional certo para o que você precisa.
          </p>
          <p className="text-sm text-white/50 mb-10">
            12 categorias · 6.200+ profissionais cadastrados
          </p>

          {/* Busca */}
          <div className="relative max-w-xl mx-auto">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40 pointer-events-none" />
            <input
              type="text"
              className="input-base pl-12 py-4 text-base rounded-xl"
              placeholder="Buscar serviço ou especialidade..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Filtros sticky */}
      <div className="sticky top-[103px] z-30 bg-white border-b border-border py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 flex-wrap">
            {FILTROS.map((f) => {
              const key = f === 'Todas' ? 'todas' : f;
              const isActive = categoriaAtiva === key;
              return (
                <button
                  key={key}
                  onClick={() => setCategoriaAtiva(key)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-brand text-white'
                      : 'bg-cream text-navy hover:bg-cream-muted'
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid de serviços */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          {categoriasFiltradas.length === 0 && busca ? (
            <div className="text-center py-24">
              <Search size={48} className="mx-auto mb-4 text-navy/20" />
              <h3 className="text-xl font-semibold text-navy mb-2">Nenhum serviço encontrado</h3>
              <p className="text-navy/60">Tente buscar por outro termo ou navegue pelas categorias.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoriasFiltradas.map((cat) => {
                const IconComponent = ICON_MAP[cat.icon];
                const extras = cat.subcategorias.length - 3;
                return (
                  <div key={cat.id} className="card overflow-hidden flex flex-col">
                    {/* Header colorido */}
                    <div className={`${cat.cor} p-5 flex items-center gap-4`}>
                      {IconComponent && (
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/60`}>
                          <IconComponent size={24} className={cat.corTexto} />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-bold text-lg text-navy truncate`}>{cat.nome}</h3>
                        <span className={`badge badge-brand text-xs`}>
                          {cat.profissionaisCount.toLocaleString('pt-BR')} profissionais
                        </span>
                      </div>
                    </div>

                    {/* Corpo */}
                    <div className="p-5 flex flex-col flex-1">
                      <p className="text-navy/70 text-sm mb-4 leading-relaxed">{cat.descricao}</p>

                      <ul className="space-y-1.5 mb-5 flex-1">
                        {cat.subcategorias.slice(0, 3).map((sub) => (
                          <li key={sub} className="flex items-center gap-2 text-sm text-navy/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                            {sub}
                          </li>
                        ))}
                        {extras > 0 && (
                          <li className="text-sm text-navy/50 pl-3.5">e mais {extras} serviços</li>
                        )}
                      </ul>

                      <button
                        className="btn-secondary w-full mt-auto"
                        onClick={() => navigate(`/servicos/${cat.id}`)}
                      >
                        Ver Profissionais →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-navy py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Não encontrou o serviço?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Descreva o que você precisa e nossa IA encontra o profissional ideal.
          </p>
          <button className="btn-primary text-lg px-8 py-3" onClick={() => navigate('/')}>
            Descrever meu serviço
          </button>
        </div>
      </section>
    </div>
  );
}
