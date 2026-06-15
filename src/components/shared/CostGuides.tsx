import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplets, Zap, Paintbrush, Home, Hammer, Layers } from 'lucide-react';

interface Guide {
  id: string;
  title: string;
  category: string;
  readTime: string;
  Icon: React.ElementType;
}

const GUIDES: Guide[] = [
  {
    id: '1',
    title: 'Quanto custa reformar um banheiro?',
    category: 'Hidráulica',
    readTime: '5 min',
    Icon: Droplets,
  },
  {
    id: '2',
    title: 'Preço médio de instalação elétrica residencial',
    category: 'Elétrica',
    readTime: '4 min',
    Icon: Zap,
  },
  {
    id: '3',
    title: 'Tabela de preços de pintura 2025',
    category: 'Pintura',
    readTime: '6 min',
    Icon: Paintbrush,
  },
  {
    id: '4',
    title: 'Quanto custa construir uma casa em 2025?',
    category: 'Construção',
    readTime: '8 min',
    Icon: Home,
  },
  {
    id: '5',
    title: 'Reforma de cozinha: o que considerar no orçamento',
    category: 'Reforma',
    readTime: '5 min',
    Icon: Hammer,
  },
  {
    id: '6',
    title: 'Piso e revestimento: guia completo de preços',
    category: 'Acabamento',
    readTime: '7 min',
    Icon: Layers,
  },
];

const GUIDE_PAGE_ROUTES: Record<string, string> = {
  'Quanto custa reformar um banheiro?': '/guias/banheiro',
  'Preço médio de instalação elétrica residencial': '/guias/instalacao-eletrica',
  'Tabela de preços de pintura 2025': '/guias/pintura',
  'Quanto custa construir uma casa em 2025?': '/guias/construir-casa',
  'Reforma de cozinha: o que considerar no orçamento': '/guias/cozinha',
  'Piso e revestimento: guia completo de preços': '/guias/piso-revestimento',
};

export default function CostGuides() {
  const navigate = useNavigate();

  return (
    <section className="bg-amber-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="font-display font-bold text-4xl text-navy mb-3">Guias de custo</h2>
            <p className="text-slate-500 max-w-lg">
              De preços médios a dicas de especialistas — tudo que você precisa para planejar sua
              obra com segurança.
            </p>
          </div>
          <button
            onClick={() => navigate('/guias')}
            className="text-brand font-semibold text-sm hover:underline whitespace-nowrap"
          >
            Ver todos os guias →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GUIDES.map((guide) => (
            <button
              key={guide.id}
              onClick={() => navigate(GUIDE_PAGE_ROUTES[guide.title] ?? '/guias')}
              className="group bg-white rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow text-left w-full"
            >
              <div className="h-40 bg-gradient-to-br from-cream to-border flex items-center justify-center">
                <guide.Icon size={40} className="text-brand opacity-30" />
              </div>
              <div className="p-4">
                <span className="text-xs text-brand font-semibold uppercase tracking-wide">
                  {guide.category}
                </span>
                <h3 className="font-display font-semibold text-navy mt-1 mb-2 group-hover:text-brand transition-colors leading-snug">
                  {guide.title}
                </h3>
                <p className="text-xs text-slate-400">{guide.readTime} de leitura</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
