import { useState, type FormEvent } from 'react';
import { Bell, MessageCircle, Camera, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FEATURES = [
  {
    icon: Bell,
    titulo: 'Notificações em tempo real',
    descricao: 'Saiba imediatamente quando seu orçamento for aprovado ou quando um profissional entrar em contato.',
  },
  {
    icon: MessageCircle,
    titulo: 'Chat integrado',
    descricao: 'Fale com seu profissional sem sair do app. Histórico de conversa salvo e acessível a qualquer hora.',
  },
  {
    icon: Camera,
    titulo: 'Fotos direto da câmera',
    descricao: 'Envie fotos do local diretamente do seu celular para orçamentos mais precisos e rápidos.',
  },
  {
    icon: MapPin,
    titulo: 'Profissionais perto de você',
    descricao: 'Encontre quem atende sua região com filtros de localização inteligentes.',
  },
];

export default function AppPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setEnviado(true);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero — 2 colunas */}
      <section className="section-navy" style={{ paddingTop: '103px', paddingBottom: '80px' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Conteúdo */}
            <div>
              <span className="badge-brand inline-block mb-6">Em breve no iOS e Android</span>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                O ConstruCasa no seu bolso
              </h1>
              <p className="text-white/70 text-lg mb-10 leading-relaxed">
                Solicite orçamentos, acompanhe suas obras e converse com profissionais — tudo pelo app.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {/* App Store */}
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-5 py-3.5 transition-all"
                >
                  <div className="flex flex-col items-start">
                    <span className="text-white/60 text-xs">Disponível brevemente</span>
                    <span className="text-white font-display font-semibold text-base">App Store</span>
                  </div>
                </button>

                {/* Google Play */}
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-5 py-3.5 transition-all"
                >
                  <div className="flex flex-col items-start">
                    <span className="text-white/60 text-xs">Disponível brevemente</span>
                    <span className="text-white font-display font-semibold text-base">Google Play</span>
                  </div>
                </button>
              </div>

              <p className="text-white/40 text-sm">
                * Cadastre-se agora e seja notificado no lançamento
              </p>
            </div>

            {/* Mockup de celular */}
            <div className="flex justify-center">
              <div
                className="relative bg-navy border-2 border-white/20 rounded-[40px] w-64 h-[520px] shadow-2xl flex flex-col overflow-hidden"
              >
                {/* Notch */}
                <div className="flex justify-center pt-4 pb-2">
                  <div className="w-24 h-5 bg-white/10 rounded-full" />
                </div>

                {/* Header simulado */}
                <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between">
                  <span className="text-white/80 text-xs font-display font-semibold">ConstruCasa</span>
                  <div className="w-6 h-6 rounded-full bg-brand/60" />
                </div>

                {/* Conteúdo simulado */}
                <div className="flex-1 px-5 py-4 flex flex-col gap-3">
                  <div className="bg-white/5 rounded-xl p-3">
                    <div className="w-3/4 h-2 bg-white/20 rounded mb-2" />
                    <div className="w-1/2 h-2 bg-white/10 rounded" />
                  </div>
                  <div className="bg-brand/20 rounded-xl p-3">
                    <div className="w-full h-2 bg-brand/40 rounded mb-2" />
                    <div className="w-2/3 h-2 bg-brand/20 rounded" />
                  </div>
                  <div className="bg-white/5 rounded-xl p-3">
                    <div className="w-5/6 h-2 bg-white/20 rounded mb-2" />
                    <div className="w-1/3 h-2 bg-white/10 rounded" />
                  </div>
                  <div className="bg-white/5 rounded-xl p-3">
                    <div className="w-4/5 h-2 bg-white/20 rounded mb-2" />
                    <div className="w-1/2 h-2 bg-white/10 rounded" />
                  </div>
                </div>

                {/* Bottom nav simulado */}
                <div className="px-5 py-4 border-t border-white/10 flex justify-around">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-xl ${i === 0 ? 'bg-brand/60' : 'bg-white/10'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por que baixar o app */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-navy text-center mb-12">
            Tudo que você já usa, ainda melhor
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURES.map((feature) => (
              <div key={feature.titulo} className="card p-8 flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
                  <feature.icon className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-semibold text-navy mb-2">{feature.titulo}</h3>
                  <p className="text-navy/60 leading-relaxed">{feature.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-navy text-center mb-12">
            Uma experiência pensada para você
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Card 1 — Busca */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-full bg-navy rounded-3xl p-4 aspect-[9/16] flex flex-col gap-3">
                <div className="bg-white/10 rounded-xl px-3 py-2 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/30" />
                  <div className="flex-1 h-2 bg-white/20 rounded" />
                </div>
                <div className="bg-white/5 rounded-xl p-3 flex flex-col gap-2">
                  <div className="w-2/3 h-2 bg-white/30 rounded" />
                  <div className="w-1/2 h-1.5 bg-white/15 rounded" />
                </div>
                <div className="bg-brand/20 rounded-xl p-3 flex flex-col gap-2">
                  <div className="w-3/4 h-2 bg-brand/50 rounded" />
                  <div className="w-1/2 h-1.5 bg-brand/25 rounded" />
                </div>
              </div>
              <span className="text-navy/60 text-sm font-medium">Busca</span>
            </div>

            {/* Card 2 — Chat */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-full bg-navy rounded-3xl p-4 aspect-[9/16] flex flex-col justify-end gap-2">
                <div className="self-start bg-white/10 rounded-2xl rounded-bl-none px-3 py-2 max-w-[70%]">
                  <div className="w-20 h-2 bg-white/30 rounded" />
                </div>
                <div className="self-end bg-brand/40 rounded-2xl rounded-br-none px-3 py-2 max-w-[70%]">
                  <div className="w-16 h-2 bg-brand/70 rounded" />
                </div>
                <div className="self-start bg-white/10 rounded-2xl rounded-bl-none px-3 py-2 max-w-[70%]">
                  <div className="w-24 h-2 bg-white/30 rounded" />
                </div>
                <div className="self-end bg-brand/40 rounded-2xl rounded-br-none px-3 py-2 max-w-[70%]">
                  <div className="w-12 h-2 bg-brand/70 rounded" />
                </div>
                <div className="bg-white/5 rounded-xl px-3 py-2 flex items-center gap-2 mt-2">
                  <div className="flex-1 h-2 bg-white/10 rounded" />
                  <div className="w-6 h-6 rounded-full bg-brand/50" />
                </div>
              </div>
              <span className="text-navy/60 text-sm font-medium">Chat</span>
            </div>

            {/* Card 3 — Orçamento */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-full bg-navy rounded-3xl p-4 aspect-[9/16] flex flex-col gap-3">
                <div className="w-2/3 h-2 bg-white/40 rounded" />
                <div className="bg-white/10 rounded-xl p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <div className="w-1/2 h-2 bg-white/30 rounded" />
                    <div className="bg-brand/40 rounded-full px-2 py-0.5">
                      <div className="w-10 h-1.5 bg-brand/60 rounded" />
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded" />
                  <div className="w-4/5 h-1.5 bg-white/10 rounded" />
                  <div className="w-1/3 h-4 bg-brand/40 rounded-lg mt-1" />
                </div>
                <div className="bg-white/5 rounded-xl p-3 flex flex-col gap-2">
                  <div className="w-3/4 h-1.5 bg-white/20 rounded" />
                  <div className="w-1/2 h-1.5 bg-white/10 rounded" />
                </div>
              </div>
              <span className="text-navy/60 text-sm font-medium">Orçamento</span>
            </div>

            {/* Card 4 — Perfil */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-full bg-navy rounded-3xl p-4 aspect-[9/16] flex flex-col items-center gap-4 pt-8">
                <div className="w-16 h-16 rounded-full bg-brand/40 border-2 border-brand/60" />
                <div className="flex flex-col items-center gap-1.5 w-full">
                  <div className="w-2/3 h-2.5 bg-white/40 rounded" />
                  <div className="w-1/2 h-1.5 bg-white/20 rounded" />
                </div>
                <div className="grid grid-cols-3 gap-2 w-full">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-2 flex flex-col items-center gap-1">
                      <div className="w-6 h-3 bg-brand/40 rounded" />
                      <div className="w-8 h-1.5 bg-white/20 rounded" />
                    </div>
                  ))}
                </div>
                <div className="w-full bg-brand/30 rounded-xl h-8" />
              </div>
              <span className="text-navy/60 text-sm font-medium">Perfil</span>
            </div>
          </div>
        </div>
      </section>

      {/* Formulário de notificação */}
      <section className="section-navy py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Seja o primeiro a saber
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Deixe seu email e avisamos quando o app estiver disponível.
          </p>

          {enviado ? (
            <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-8 py-5">
              <span className="text-white font-display font-semibold text-lg">
                Perfeito! Você será notificado no lançamento.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="input-base flex-1"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Quero ser notificado
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
