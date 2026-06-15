import React from 'react';
import { CheckCircle, X, MessageSquare, LayoutDashboard, Search } from 'lucide-react';

interface QuoteSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToDashboard: () => void;
}

const TIMELINE_STEPS = [
  {
    icon: <MessageSquare size={16} />,
    title: 'Profissional é notificado',
    description: 'Ele recebe sua solicitação e analisa os detalhes.',
  },
  {
    icon: <CheckCircle size={16} />,
    title: 'Orçamento no chat',
    description: 'Você negocia valores e condições diretamente pelo chat.',
  },
  {
    icon: <LayoutDashboard size={16} />,
    title: 'Acompanhe no painel',
    description: 'Monitore todas as suas solicitações em um só lugar.',
  },
];

export const QuoteSuccessModal: React.FC<QuoteSuccessModalProps> = ({
  isOpen,
  onClose,
  onGoToDashboard,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm mx-4 rounded-3xl shadow-2xl overflow-hidden animate-scale-in relative">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-slate-400 hover:text-slate-600 transition-colors bg-white/80 hover:bg-white rounded-full p-1.5 shadow-sm"
          aria-label="Fechar"
        >
          <X size={20} />
        </button>

        {/* Success hero */}
        <div className="flex flex-col items-center pt-10 pb-8 px-8 text-center">
          {/* Animated check icon */}
          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 bg-emerald-100 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
            </div>
            <div className="relative w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center">
              <CheckCircle
                size={64}
                className="text-emerald-500"
                style={{ animation: 'scaleIn 0.5s ease-out' }}
              />
            </div>
          </div>

          <h2 className="font-display font-bold text-2xl text-navy">Solicitação Enviada!</h2>
          <p className="text-slate-500 mt-2 text-sm leading-relaxed">
            Seu pedido foi encaminhado com sucesso para análise do profissional.
          </p>
        </div>

        {/* Timeline */}
        <div className="px-6 pb-6 space-y-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">O que acontece agora</p>

          <div className="space-y-0">
            {TIMELINE_STEPS.map((step, idx) => (
              <div key={idx} className="flex gap-4">
                {/* Icon + vertical connector */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-brand-subtle text-brand flex items-center justify-center flex-shrink-0 shadow-sm">
                    {step.icon}
                  </div>
                  {idx < TIMELINE_STEPS.length - 1 && (
                    <div className="w-0.5 flex-1 bg-[--color-border] my-1.5 min-h-[20px]" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-5">
                  <p className="text-sm font-bold text-slate-800">{step.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={onGoToDashboard}
              className="btn-primary w-full py-3.5 flex items-center justify-center gap-2"
            >
              <LayoutDashboard size={18} />
              Ver Minhas Solicitações
            </button>
            <button
              onClick={onClose}
              className="btn-secondary w-full py-3.5 flex items-center justify-center gap-2"
            >
              <Search size={16} />
              Continuar Navegando
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scaleIn {
          0%   { transform: scale(0); opacity: 0; }
          60%  { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
