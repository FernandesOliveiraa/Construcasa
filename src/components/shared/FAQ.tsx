import React, { useState } from 'react';
import {
  ChevronDown,
  HelpCircle,
  ArrowLeft,
  Shield,
  Users,
  DollarSign,
  Search,
  MessageCircle,
} from 'lucide-react';

interface FAQProps {
  onBack: () => void;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  category: string;
  subtitle: string;
  icon: React.ElementType;
  items: FAQItem[];
}

const FAQ_DATA: FAQSection[] = [
  {
    category: 'Sobre a Plataforma',
    subtitle: 'Como a ConstruCasa funciona no dia a dia',
    icon: Search,
    items: [
      {
        question: 'Como funciona a ConstruCasa?',
        answer:
          'A ConstruCasa conecta clientes que precisam de serviços de construção e reforma com profissionais qualificados. Você pode buscar por especialidade, ver avaliações, solicitar orçamentos e negociar diretamente pela plataforma.',
      },
      {
        question: 'Preciso pagar para usar o site?',
        answer:
          'Para clientes, o uso da plataforma é totalmente gratuito. Você pode buscar profissionais e solicitar orçamentos sem custo. Para profissionais, oferecemos planos para destacar o perfil e acessar mais oportunidades.',
      },
    ],
  },
  {
    category: 'Profissionais e Serviços',
    subtitle: 'Entenda quem são os profissionais da plataforma',
    icon: Users,
    items: [
      {
        question: 'Quais tipos de profissionais encontro aqui?',
        answer:
          'Temos uma ampla gama de especialistas, incluindo Pedreiros, Eletricistas, Encanadores, Pintores, Arquitetos, Marceneiros e profissionais de serviços gerais.',
      },
      {
        question: 'Como sei se o profissional é qualificado?',
        answer:
          "Incentivamos a verificação de perfil. Profissionais com o selo 'Verificado' passaram por uma checagem básica de documentos. Além disso, você deve sempre ler as avaliações e comentários deixados por outros clientes para garantir a qualidade do serviço.",
      },
    ],
  },
  {
    category: 'Segurança e Confiança',
    subtitle: 'Contrate com tranquilidade e proteção',
    icon: Shield,
    items: [
      {
        question: 'É seguro contratar pela plataforma?',
        answer:
          'Trabalhamos para criar um ambiente seguro. Recomendamos sempre manter as conversas dentro do chat da plataforma para ter um registro do combinado. Nunca realize pagamentos antecipados integrais sem um contrato ou garantia.',
      },
      {
        question: 'O que fazer se tiver problemas com o serviço?',
        answer:
          'Primeiramente, tente resolver diretamente com o profissional. Se não houver acordo, entre em contato com nosso suporte. Avaliações honestas também ajudam a manter a qualidade da comunidade.',
      },
    ],
  },
  {
    category: 'Orçamentos e Pagamentos',
    subtitle: 'Tudo sobre preços, orçamentos e pagamentos',
    icon: DollarSign,
    items: [
      {
        question: 'Como solicito um orçamento?',
        answer:
          "Navegue pelo perfil do profissional desejado e clique no botão 'Pedir Orçamento'. Preencha os detalhes do serviço, adicione fotos se possível e aguarde o retorno.",
      },
      {
        question: 'O pagamento é feito pelo site?',
        answer:
          'Atualmente, a ConstruCasa conecta as partes, mas o pagamento é combinado e realizado diretamente entre cliente e profissional. Recomendamos o uso de meios seguros e recibos.',
      },
    ],
  },
];

export const FAQ: React.FC<FAQProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const currentSection = FAQ_DATA[activeCategory];

  const handleCategoryChange = (idx: number) => {
    setActiveCategory(idx);
    setOpenIndex(null);
  };

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen pb-16">
      {/* Page header */}
      <div className="bg-cream border-b border-border pt-10 pb-12">
        <div className="container mx-auto px-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-navy transition-colors mb-8 text-sm font-medium"
          >
            <ArrowLeft size={18} />
            Voltar
          </button>

          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-border text-slate-600 font-medium text-sm px-4 py-2 rounded-full mb-6 shadow-sm">
              <HelpCircle size={14} className="text-brand" />
              Perguntas Frequentes
            </div>

            <h1 className="font-display font-bold text-4xl md:text-5xl text-navy mb-4 text-balance">
              Tire suas dúvidas
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed">
              Tudo sobre o funcionamento da ConstruCasa, segurança e contratação de serviços.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-5xl mx-auto">
          {/* Desktop: 2-column layout */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* ── Sidebar (desktop) ── */}
            <aside className="hidden lg:block w-56 flex-shrink-0">
              <div className="sticky top-24 space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-3">
                  Categorias
                </p>
                {FAQ_DATA.map((section, idx) => {
                  const Icon = section.icon;
                  const isActive = activeCategory === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleCategoryChange(idx)}
                      className={[
                        'flex items-center gap-3 rounded-xl p-3 w-full text-left text-sm transition-all duration-200',
                        isActive
                          ? 'bg-brand-subtle text-brand font-semibold border-l-2 border-brand'
                          : 'text-slate-600 hover:bg-cream',
                      ].join(' ')}
                    >
                      <Icon size={16} />
                      <span>{section.category}</span>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* ── Mobile: horizontal tab pills ── */}
            <div className="lg:hidden overflow-x-auto pb-2">
              <div className="flex gap-2 w-max">
                {FAQ_DATA.map((section, idx) => {
                  const Icon = section.icon;
                  const isActive = activeCategory === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleCategoryChange(idx)}
                      className={[
                        'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200',
                        isActive
                          ? 'bg-brand text-white shadow-sm'
                          : 'bg-cream text-slate-600 border border-border',
                      ].join(' ')}
                    >
                      <Icon size={14} />
                      {section.category}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── FAQ content area ── */}
            <div className="flex-1 min-w-0">
              {/* Category header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-subtle flex items-center justify-center flex-shrink-0">
                  {React.createElement(currentSection.icon, { size: 22, className: 'text-brand' })}
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl text-navy">
                    {currentSection.category}
                  </h2>
                  <p className="text-slate-500 text-sm mt-0.5">{currentSection.subtitle}</p>
                </div>
              </div>

              {/* Accordion */}
              <div className="space-y-2">
                {currentSection.items.map((item, iIdx) => {
                  const isOpen = openIndex === iIdx;
                  return (
                    <div
                      key={iIdx}
                      className="border border-border rounded-xl overflow-hidden transition-colors duration-200"
                    >
                      <button
                        onClick={() => toggleFAQ(iIdx)}
                        className="w-full flex justify-between items-center p-4 text-left gap-4 cursor-pointer hover:bg-cream focus:outline-none transition-colors"
                      >
                        <span className="font-display font-semibold text-navy text-sm leading-snug">
                          {item.question}
                        </span>
                        <ChevronDown
                          size={18}
                          className={[
                            'flex-shrink-0 text-slate-400 transition-transform duration-300',
                            isOpen ? 'rotate-180' : '',
                          ].join(' ')}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 animate-slide-down">
                          <p className="text-slate-500 text-sm leading-relaxed">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* CTA card */}
              <div className="mt-8 bg-navy rounded-2xl p-8 text-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 bg-brand">
                  <MessageCircle size={24} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-2">
                  Não encontrou sua resposta?
                </h3>
                <p className="text-white/70 mb-6 text-sm">
                  Nossa equipe de suporte está pronta para te ajudar em até 2 horas.
                </p>
                <button className="btn-primary">
                  Falar com Suporte
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
