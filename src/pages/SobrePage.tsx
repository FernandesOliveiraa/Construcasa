import { Target, Eye, Shield, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const stats = [
  { value: '12.000+', label: 'Profissionais verificados' },
  { value: '98%', label: 'Índice de satisfação' },
  { value: '52', label: 'Cidades atendidas' },
  { value: 'R$ 280M+', label: 'Em obras realizadas' },
];

const values = [
  {
    icon: Shield,
    title: 'Confiança',
    description: 'Verificamos cada profissional antes da aprovação na plataforma, garantindo segurança para quem contrata.',
  },
  {
    icon: Star,
    title: 'Qualidade',
    description: 'Avaliações reais de clientes reais — sem filtro, sem manipulação. Você vê o histórico verdadeiro de cada profissional.',
  },
  {
    icon: Eye,
    title: 'Transparência',
    description: 'Preços claros, contratos simples e sem surpresas. Você sabe exatamente pelo que está pagando antes de fechar qualquer negócio.',
  },
];

const team = [
  { img: 'https://i.pravatar.cc/150?img=1', name: 'Rafael Mendes', role: 'CEO & Co-fundador', bio: 'Empreendedor serial com 15 anos no setor de construção civil.' },
  { img: 'https://i.pravatar.cc/150?img=2', name: 'Camila Torres', role: 'CPO', bio: 'Designer de produto apaixonada por experiências que simplificam a vida das pessoas.' },
  { img: 'https://i.pravatar.cc/150?img=3', name: 'Diego Alves', role: 'CTO', bio: 'Engenheiro de software com experiência em plataformas de marketplace de alta escala.' },
  { img: 'https://i.pravatar.cc/150?img=4', name: 'Juliana Costa', role: 'Head de Comunidade', bio: 'Especialista em construir comunidades vibrantes e engajadas ao redor de produtos.' },
];

export default function SobrePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="section-navy" style={{ paddingTop: '103px', paddingBottom: '80px' }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="badge-brand mb-6 inline-block">Fundada em 2023</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
            Construindo pontes entre quem precisa e quem sabe fazer
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Nossa missão é democratizar o acesso a profissionais de qualidade em todo o Brasil, conectando clientes a especialistas de confiança para cada etapa da construção e reforma.
          </p>
        </div>
      </section>

      {/* Missão e Visão */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-brand" />
              </div>
              <h2 className="text-2xl font-display font-bold text-navy">Nossa Missão</h2>
              <p className="text-navy/70 leading-relaxed">
                Conectar com segurança e eficiência cada pessoa que precisa de um serviço de construção ou reforma ao profissional mais qualificado para realizá-lo — simplificando um processo que historicamente era burocrático, caro e cheio de incertezas.
              </p>
            </div>

            <div className="hidden md:flex items-center justify-center">
              <div className="w-px h-32 bg-border" />
            </div>

            <div className="flex flex-col gap-4 md:col-start-2 md:row-start-1">
              <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-brand" />
              </div>
              <h2 className="text-2xl font-display font-bold text-navy">Nossa Visão</h2>
              <p className="text-navy/70 leading-relaxed">
                Ser a plataforma de referência em serviços de construção e reforma na América Latina, reconhecida pela excelência na experiência do cliente e pelo impacto positivo na vida dos profissionais do setor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Números em destaque */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-navy text-center mb-12">ConstruCasa em números</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="card text-center p-8">
                <p className="text-4xl font-display font-bold text-brand mb-2">{stat.value}</p>
                <p className="text-navy/60 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-navy text-center mb-12">O que nos guia</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="card p-8 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center">
                  <value.icon className="w-6 h-6 text-brand" />
                </div>
                <h3 className="text-xl font-display font-semibold text-navy">{value.title}</h3>
                <p className="text-navy/70 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-navy text-center mb-12">Quem está por trás</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="card p-6 flex flex-col items-center text-center gap-4">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-border"
                />
                <div>
                  <p className="font-display font-semibold text-navy">{member.name}</p>
                  <p className="text-brand text-sm font-medium">{member.role}</p>
                </div>
                <p className="text-navy/60 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="section-navy py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">Faça parte da nossa história</h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Seja como profissional qualificado ou como cliente em busca do serviço certo, você é parte essencial da comunidade ConstruCasa. Venha construir algo maior conosco.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/cadastro-profissional')}
              className="btn-primary"
            >
              Cadastrar como Profissional
            </button>
            <button
              onClick={() => navigate('/contato')}
              className="btn-secondary"
            >
              Fale Conosco
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
