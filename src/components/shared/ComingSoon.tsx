import React, { useState } from 'react';
import {
  HardHat, Home, ArrowLeft, CheckCircle,
  Zap, ShieldCheck, Star,
} from 'lucide-react';

interface ComingSoonProps {
  title?: string;
  description?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  onBack?: () => void;
  onGoHome?: () => void;
}

export function ComingSoon({
  title,
  description,
  icon: Icon,
  onBack,
  onGoHome,
}: ComingSoonProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  const DisplayIcon = Icon ?? HardHat;

  return (
    <div className="relative min-h-screen bg-cream flex flex-col" style={{ paddingTop: '103px' }}>
      {/* Blobs decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-[0.06]"
          style={{ background: '#E85D26' }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-[0.04]"
          style={{ background: '#1B2B4B' }}
        />
      </div>

      {/* Conteúdo centralizado */}
      <div className="relative flex flex-col items-center flex-1 px-6 py-16">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center">

          {/* Ícone animado */}
          <div className="w-24 h-24 rounded-3xl bg-white border border-border shadow-lg flex items-center justify-center mx-auto mb-8 animate-pulse">
            <DisplayIcon size={40} className="text-brand" />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-subtle border border-brand/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            <span className="text-brand text-xs font-semibold uppercase tracking-widest">Em breve</span>
          </div>

          {/* Título */}
          <h1 className="font-display font-bold text-4xl text-navy mb-4 text-center">
            {title || 'Estamos construindo'}
            <br />
            <span className="text-brand">algo incrível</span>
          </h1>

          {/* Descrição */}
          <p className="text-slate-500 text-lg text-center leading-relaxed max-w-md mx-auto mb-10">
            {description || 'Esta seção está em desenvolvimento. Em breve estará disponível com tudo que você precisa.'}
          </p>

          {/* Barra de progresso fake */}
          <div className="w-full max-w-sm mx-auto mb-10">
            <div className="flex justify-between text-xs text-slate-400 mb-2">
              <span>Progresso</span>
              <span>67%</span>
            </div>
            <div className="h-2 bg-white border border-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: '67%', background: 'linear-gradient(90deg, #E85D26, #F4793F)' }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-2 text-center">Lançamento previsto para Q3 2025</p>
          </div>

          {/* Email capture */}
          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-emerald-600 font-medium mb-8">
              <CheckCircle size={18} />
              <span>Ótimo! Você será notificado quando lançarmos.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto mb-8 w-full"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor email"
                required
                className="flex-1 px-4 py-3 rounded-xl border border-border bg-white text-navy placeholder-slate-400 text-sm focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
              <button type="submit" className="btn-primary rounded-xl px-5 py-3 text-sm whitespace-nowrap">
                Avisar-me
              </button>
            </form>
          )}

          {/* Botões de navegação */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-slate-500 hover:text-navy transition-colors text-sm font-medium"
              >
                <ArrowLeft size={15} />
                Voltar
              </button>
            )}
            {onBack && onGoHome && <span className="text-slate-300">·</span>}
            {onGoHome && (
              <button
                onClick={onGoHome}
                className="flex items-center gap-2 text-brand font-semibold text-sm hover:underline"
              >
                <Home size={15} />
                Ir para o início
              </button>
            )}
          </div>

          {/* Features "O que está chegando" */}
          <div className="mt-16 pt-12 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
            {[
              { icon: Zap,         label: 'Rápido',     desc: 'Experiência otimizada'       },
              { icon: ShieldCheck, label: 'Seguro',      desc: 'Dados protegidos'            },
              { icon: Star,        label: 'Qualidade',   desc: 'Profissionais verificados'   },
            ].map(({ icon: FeatureIcon, label, desc }) => (
              <div key={label} className="text-center">
                <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center mx-auto mb-3">
                  <FeatureIcon size={18} className="text-brand" />
                </div>
                <div className="font-display font-semibold text-navy text-sm">{label}</div>
                <div className="text-xs text-slate-400 mt-1">{desc}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
