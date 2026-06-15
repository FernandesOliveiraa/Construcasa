import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paintbrush,
  Zap,
  Droplets,
  Layers,
  Bath,
  LayoutGrid,
  Home,
  Building2,
  Wrench,
  Sparkles,
} from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  startingPrice: string;
  Icon: React.ElementType;
}

const SERVICES: Service[] = [
  {
    id: '1',
    name: 'Pintura de Apartamento',
    description: 'Pintura interna com tinta lavável, inclui preparo de superfície',
    startingPrice: '800',
    Icon: Paintbrush,
  },
  {
    id: '2',
    name: 'Instalação Elétrica',
    description: 'Tomadas, interruptores e quadro de distribuição',
    startingPrice: '350',
    Icon: Zap,
  },
  {
    id: '3',
    name: 'Reparos Hidráulicos',
    description: 'Vazamentos, trocas de registro e torneiras',
    startingPrice: '180',
    Icon: Droplets,
  },
  {
    id: '4',
    name: 'Assentamento de Piso',
    description: 'Porcelanato ou cerâmica, até 20m²',
    startingPrice: '1.200',
    Icon: Layers,
  },
  {
    id: '5',
    name: 'Reforma de Banheiro',
    description: 'Revestimentos, louças e metais',
    startingPrice: '2.800',
    Icon: Bath,
  },
  {
    id: '6',
    name: 'Gesso e Drywall',
    description: 'Forro de gesso, divisórias e acabamentos',
    startingPrice: '650',
    Icon: LayoutGrid,
  },
  {
    id: '7',
    name: 'Telhado e Cobertura',
    description: 'Troca de telhas, impermeabilização e calhas',
    startingPrice: '1.500',
    Icon: Home,
  },
  {
    id: '8',
    name: 'Pintura de Fachada',
    description: 'Pintura externa com textura ou tinta acrílica',
    startingPrice: '1.200',
    Icon: Building2,
  },
  {
    id: '9',
    name: 'Pequenas Reformas',
    description: 'Reparos gerais, fixações e ajustes',
    startingPrice: '150',
    Icon: Wrench,
  },
  {
    id: '10',
    name: 'Limpeza Pós-Obra',
    description: 'Limpeza completa após construção ou reforma',
    startingPrice: '300',
    Icon: Sparkles,
  },
];

const SERVICE_PAGE_ROUTES: Record<string, string> = {
  'Pintura de Apartamento': '/servicos/pintura-interna',
  'Instalação Elétrica': '/servicos/eletrica',
  'Reparos Hidráulicos': '/servicos/hidraulica',
  'Assentamento de Piso': '/servicos/piso-revestimento',
  'Reforma de Banheiro': '/servicos/banheiro',
  'Gesso e Drywall': '/servicos/gesso-drywall',
  'Telhado e Cobertura': '/servicos/telhado',
  'Pintura de Fachada': '/servicos/pintura-externa',
  'Pequenas Reformas': '/servicos/reforma-completa',
  'Limpeza Pós-Obra': '/servicos/limpeza-pos-obra',
};

export default function PopularServices() {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display font-bold text-2xl text-navy mb-6 text-center">
          Serviços populares na sua região
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-3 -mx-6 px-6 scrollbar-none">
          {SERVICES.map((service) => (
            <button
              key={service.id}
              onClick={() => navigate(SERVICE_PAGE_ROUTES[service.name] ?? '/servicos')}
              className="flex-none w-56 lg:w-64 text-left border border-border rounded-xl p-4 hover:border-brand hover:shadow-md transition-all duration-200 bg-white group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center group-hover:bg-amber-50 transition-colors">
                  <service.Icon
                    size={20}
                    className="text-navy group-hover:text-brand transition-colors"
                  />
                </div>
                <span className="text-xs text-slate-400 font-medium">popular</span>
              </div>
              <h3 className="font-display font-semibold text-navy text-sm mb-1 leading-tight">
                {service.name}
              </h3>
              <p className="text-xs text-slate-400 mb-3 line-clamp-2">{service.description}</p>
              <div className="text-brand font-display font-bold text-base">
                a partir de R$ {service.startingPrice}
              </div>
            </button>
          ))}
        </div>

        <p className="text-xs text-slate-400 mt-3 text-center">
          * Preços são estimativas médias nacionais. Valores reais podem variar conforme localização
          e escopo.
        </p>
      </div>
    </section>
  );
}
