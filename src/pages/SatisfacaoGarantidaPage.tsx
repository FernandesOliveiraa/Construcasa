import { Shield, CheckCircle, X, UserCheck, FileCheck, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    number: '1',
    title: 'Você contrata um profissional verificado',
    description: 'Escolha entre milhares de profissionais verificados pelo ConstruCasa, compare avaliações reais e solicite orçamentos sem compromisso.',
  },
  {
    number: '2',
    title: 'O serviço é realizado e avaliado',
    description: 'Após a conclusão do serviço, você avalia o resultado diretamente pela plataforma. Sua opinião é fundamental para nossa comunidade.',
  },
  {
    number: '3',
    title: 'Não está satisfeito? Abra uma disputa',
    description: 'Caso o resultado não atenda ao combinado, você tem até 7 dias corridos após o término do serviço para abrir uma disputa pela plataforma.',
  },
  {
    number: '4',
    title: 'Nossa equipe medeia a solução',
    description: 'Nossos especialistas analisam o caso com base no orçamento acordado, fotos e evidências, e trabalham para encontrar a melhor solução para ambas as partes.',
  },
];

const covered = [
  'Serviço entregue de forma diferente do descrito no orçamento aprovado',
  'Uso de materiais de qualidade inferior ao especificado sem aviso prévio',
  'Prazo descumprido sem justificativa ou comunicação antecipada',
  'Danos causados pelo profissional durante a execução do serviço',
];

const notCovered = [
  'Mudanças de escopo solicitadas pelo cliente após o início do serviço',
  'Eventos de força maior (desastres naturais, paralisações, emergências)',
  'Danos preexistentes não documentados antes do início do serviço',
  'Insatisfação com resultado decorativo ou estético subjetivo não especificado',
];

const verificationSteps = [
  {
    icon: UserCheck,
    step: '1',
    title: 'Verificação de Identidade',
    description: 'CPF validado na base da Receita Federal e confirmação de foto de perfil com documento de identidade oficial.',
  },
  {
    icon: FileCheck,
    step: '2',
    title: 'Verificação Técnica',
    description: 'Certificações profissionais e registro em conselhos (CREA, CAU, etc.) validados diretamente nas fontes oficiais.',
  },
  {
    icon: Star,
    step: '3',
    title: 'Histórico de Avaliações',
    description: 'Mínimo de 10 avaliações verificadas com média igual ou superior a 4,5 estrelas para manter o selo de verificado.',
  },
];

const testimonials = [
  {
    img: 'https://i.pravatar.cc/150?img=32',
    name: 'Mariana Figueiredo',
    city: 'São Paulo, SP',
    text: 'Fiquei muito mais tranquila sabendo que havia uma garantia. O profissional foi excelente, mas saber que estava protegida me deu confiança para contratar sem medo.',
  },
  {
    img: 'https://i.pravatar.cc/150?img=11',
    name: 'Roberto Carvalho',
    city: 'Belo Horizonte, MG',
    text: 'Nunca tinha contratado reforma pela internet. A garantia do ConstruCasa foi o que me convenceu. No final tudo correu perfeitamente, mas a segurança foi fundamental.',
  },
  {
    img: 'https://i.pravatar.cc/150?img=47',
    name: 'Fernanda Lopes',
    city: 'Curitiba, PR',
    text: 'Tive um pequeno problema com o prazo e a equipe do ConstruCasa resolveu rapidamente. Senti que estavam do meu lado do início ao fim.',
  },
];

export default function SatisfacaoGarantidaPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="section-navy" style={{ paddingTop: '103px', paddingBottom: '80px' }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-brand rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <span className="badge-brand mb-6 inline-block">Proteção ConstruCasa</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 max-w-2xl mx-auto leading-tight">
            Satisfação Garantida
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Contrate com confiança. Se algo der errado, nós cobrimos.
          </p>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-navy text-center mb-16">
            Como nossa garantia funciona
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col gap-0">
              {steps.map((step, index) => (
                <div key={step.number} className="flex gap-6">
                  {/* Step indicator + line */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-display font-bold text-lg">{step.number}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-0.5 flex-1 bg-border my-2" />
                    )}
                  </div>
                  {/* Content */}
                  <div className={index < steps.length - 1 ? 'pb-10' : ''}>
                    <h3 className="text-lg font-display font-semibold text-navy mb-2 mt-2">{step.title}</h3>
                    <p className="text-navy/70 leading-relaxed text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* O Que Está Coberto */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-navy text-center mb-12">
            Cobertura da garantia
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Cobre */}
            <div className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-7 h-7 text-green-500" />
                <h3 className="text-xl font-display font-bold text-navy">O que cobrimos</h3>
              </div>
              <ul className="flex flex-col gap-4">
                {covered.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-navy/70 leading-relaxed text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Não cobre */}
            <div className="card p-8">
              <div className="flex items-center gap-3 mb-6">
                <X className="w-7 h-7 text-red-400" />
                <h3 className="text-xl font-display font-bold text-navy">O que não está incluído</h3>
              </div>
              <ul className="flex flex-col gap-4">
                {notCovered.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-navy/70 leading-relaxed text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Profissionais Verificados */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-navy text-center mb-4">
            Profissionais que passaram pela nossa verificação
          </h2>
          <p className="text-navy/60 text-center mb-12 max-w-xl mx-auto">
            Para garantir que você contrate com segurança, cada profissional passa por um processo rigoroso de verificação antes de aparecer na plataforma.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {verificationSteps.map((item) => (
              <div key={item.step} className="card p-8 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-brand" />
                  </div>
                  <span className="text-3xl font-display font-bold text-navy/20">{item.step}</span>
                </div>
                <h3 className="text-lg font-display font-semibold text-navy">{item.title}</h3>
                <p className="text-navy/70 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-navy text-center mb-12">
            Quem contratou conta
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="card p-8 flex flex-col gap-4">
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-brand fill-brand" />
                  ))}
                </div>
                <p className="text-navy/70 text-sm leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-3 mt-2">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-border"
                  />
                  <div>
                    <p className="font-semibold text-navy text-sm">{t.name}</p>
                    <p className="text-navy/50 text-xs">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-navy py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Pronto para contratar com segurança?
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Encontre o profissional ideal para o seu projeto e aproveite a tranquilidade de saber que você está protegido pelo ConstruCasa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Encontrar Profissional
            </button>
            <button
              onClick={() => navigate('/contato')}
              className="text-white/70 hover:text-white transition-colors text-sm underline underline-offset-4"
            >
              Dúvidas? Fale com o suporte →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
