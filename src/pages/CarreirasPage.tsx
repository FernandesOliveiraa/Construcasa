import { useState, type FormEvent } from 'react';
import { Zap, TrendingUp, GraduationCap, Heart, Home, Sun, BookOpen, Users, CheckCircle } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  area: string;
  regime: string;
  location: string;
}

const jobs: Job[] = [
  { id: crypto.randomUUID(), title: 'Engenheiro(a) de Software Senior', area: 'Engenharia', regime: 'CLT/PJ', location: 'Remoto' },
  { id: crypto.randomUUID(), title: 'Product Designer', area: 'Design', regime: 'CLT', location: 'Remoto' },
  { id: crypto.randomUUID(), title: 'Gerente de Comunidade', area: 'Marketing', regime: 'CLT', location: 'São Paulo' },
  { id: crypto.randomUUID(), title: 'Analista de Dados', area: 'Data', regime: 'PJ', location: 'Remoto' },
  { id: crypto.randomUUID(), title: 'Customer Success', area: 'Operações', regime: 'CLT', location: 'São Paulo' },
  { id: crypto.randomUUID(), title: 'Desenvolvedor(a) Mobile', area: 'Engenharia', regime: 'PJ', location: 'Remoto' },
];

const culturePillars = [
  {
    icon: Zap,
    title: 'Autonomia',
    description: 'Você tem ownership real do seu trabalho. Decisões são tomadas por quem está mais próximo do problema.',
  },
  {
    icon: TrendingUp,
    title: 'Impacto',
    description: 'Cada feature que você entrega afeta diretamente a vida de milhares de profissionais e clientes no Brasil.',
  },
  {
    icon: GraduationCap,
    title: 'Crescimento',
    description: 'Budget de learning, mentoria estruturada e apoio para participar das maiores conferências do setor.',
  },
];

const benefits = [
  { icon: Heart, title: 'Saúde Completa', description: 'Plano médico e odontológico desde o primeiro dia.' },
  { icon: Home, title: 'Home Office Total', description: 'Trabalhe de onde quiser, do jeito que funciona pra você.' },
  { icon: TrendingUp, title: 'Equity', description: 'Participação no crescimento e no sucesso da empresa.' },
  { icon: Sun, title: 'Férias Flexíveis', description: 'Sem limite de dias, com responsabilidade e confiança.' },
  { icon: BookOpen, title: 'Learning Budget', description: 'R$ 3.000/ano para cursos, livros e eventos.' },
  { icon: Users, title: 'Diversidade', description: 'Time plural e ambiente genuinamente inclusivo.' },
];

export default function CarreirasPage() {
  const [appliedJob, setAppliedJob] = useState<string | null>(null);
  const [cvEmail, setCvEmail] = useState('');
  const [cvSubmitted, setCvSubmitted] = useState(false);

  function handleCvSubmit(e: FormEvent) {
    e.preventDefault();
    setCvSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="section-navy" style={{ paddingTop: '103px', paddingBottom: '80px' }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="badge-brand mb-6 inline-block">Venha crescer com a gente</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
            Construa sua carreira no ConstruCasa
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
            Junte-se a um time apaixonado por impacto social e tecnologia. Estamos transformando a forma como o Brasil constrói — e queremos você nessa jornada.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <span className="w-2 h-2 rounded-full bg-brand inline-block" />
              50+ colaboradores
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <span className="w-2 h-2 rounded-full bg-brand inline-block" />
              4 países em expansão
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <span className="w-2 h-2 rounded-full bg-brand inline-block" />
              100% remoto
            </div>
          </div>
        </div>
      </section>

      {/* Nossa Cultura */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-navy text-center mb-12">Como trabalhamos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {culturePillars.map((pillar) => (
              <div key={pillar.title} className="card p-8 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center">
                  <pillar.icon className="w-6 h-6 text-brand" />
                </div>
                <h3 className="text-xl font-display font-semibold text-navy">{pillar.title}</h3>
                <p className="text-navy/70 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-navy text-center mb-12">Benefícios</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="card p-6 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                  <benefit.icon className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <p className="font-display font-semibold text-navy mb-1">{benefit.title}</p>
                  <p className="text-navy/60 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vagas Abertas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-navy mb-12">Oportunidades</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map((job) => {
              const applied = appliedJob === job.id;
              return (
                <div key={job.id} className="card p-6 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="badge-brand">{job.area}</span>
                    <span className="text-xs bg-navy/10 text-navy px-2 py-0.5 rounded-full font-medium">{job.regime}</span>
                    <span className="text-xs bg-navy/10 text-navy px-2 py-0.5 rounded-full font-medium">{job.location}</span>
                  </div>
                  <h3 className="text-lg font-display font-semibold text-navy">{job.title}</h3>
                  <div className="mt-auto">
                    {applied ? (
                      <div className="flex items-center gap-2 text-green-600 font-medium text-sm">
                        <CheckCircle className="w-4 h-4" />
                        Candidatura enviada!
                      </div>
                    ) : (
                      <button
                        onClick={() => setAppliedJob(job.id)}
                        className="btn-primary text-sm"
                      >
                        Candidatar-se
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-navy py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">Não encontrou a vaga ideal?</h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Mande seu currículo e entraremos em contato quando surgir a oportunidade certa.
          </p>
          {cvSubmitted ? (
            <div className="flex flex-col items-center gap-3 text-white">
              <CheckCircle className="w-10 h-10 text-brand" />
              <p className="text-lg font-semibold">Currículo recebido!</p>
              <p className="text-white/70 text-sm">Entraremos em contato em breve.</p>
            </div>
          ) : (
            <form onSubmit={handleCvSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="seu@email.com"
                value={cvEmail}
                onChange={(e) => setCvEmail(e.target.value)}
                className="input-base flex-1"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Enviar currículo
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
