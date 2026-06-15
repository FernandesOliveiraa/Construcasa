import { CheckCircle, Clock, Keyboard, Monitor, Brain, Headphones } from 'lucide-react';

const statusItems = [
  {
    icon: CheckCircle,
    color: 'text-green-500',
    bg: 'bg-green-50',
    border: 'border-green-200',
    label: 'WCAG 2.1 Nível A',
    status: 'Conforme',
  },
  {
    icon: CheckCircle,
    color: 'text-green-500',
    bg: 'bg-green-50',
    border: 'border-green-200',
    label: 'WCAG 2.1 Nível AA',
    status: 'Parcialmente Conforme',
  },
  {
    icon: Clock,
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    label: 'WCAG 2.1 Nível AAA',
    status: 'Em progresso',
  },
];

const implementedFeatures = [
  {
    icon: Monitor,
    category: 'Visual',
    items: [
      'Alto contraste entre texto e fundo (razão mínima de 4.5:1)',
      'Tamanho de fonte ajustável sem perda de funcionalidade',
      'Informações nunca dependem exclusivamente de cor',
      'Foco visual claramente visível em todos os elementos interativos',
    ],
  },
  {
    icon: Keyboard,
    category: 'Motor',
    items: [
      'Todos os recursos acessíveis via teclado (Tab, Enter, Espaço, setas)',
      'Sem armadilhas de foco do teclado',
      'Áreas de clique e toque com tamanho mínimo de 44x44px',
      'Sem limites de tempo em formulários ou interações críticas',
    ],
  },
  {
    icon: Brain,
    category: 'Cognitivo',
    items: [
      'Linguagem clara, simples e consistente em toda a plataforma',
      'Instruções claras e objetivas em formulários e fluxos',
      'Mensagens de erro descritivas com orientação para correção',
      'Navegação consistente e previsível em todas as páginas',
    ],
  },
  {
    icon: Headphones,
    category: 'Tecnológico (Leitores de Tela)',
    items: [
      'Compatível com NVDA (Windows)',
      'Compatível com VoiceOver (macOS e iOS)',
      'Compatível com JAWS (Windows)',
      'Uso correto de roles e atributos ARIA',
    ],
  },
];

const limitations = [
  {
    issue: 'Algumas imagens de portfólio enviadas por profissionais podem não ter texto alternativo.',
    fix: 'Correção prevista para Q2 2025 com validação obrigatória no upload.',
  },
  {
    issue: 'Gráficos de avaliação podem não ser totalmente acessíveis a leitores de tela.',
    fix: 'Versão textual dos dados em desenvolvimento, previsão Q3 2025.',
  },
  {
    issue: 'Alguns componentes de seleção de data não são totalmente compatíveis com JAWS.',
    fix: 'Substituição por componente acessível agendada para Q2 2025.',
  },
  {
    issue: 'O sistema de chat em tempo real pode apresentar dificuldades com leitores de tela mais antigos.',
    fix: 'Refatoração completa do chat com suporte a ARIA live regions prevista para Q3 2025.',
  },
];

export default function AcessibilidadePage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="section-navy" style={{ paddingTop: '103px', paddingBottom: '80px' }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="badge-brand mb-6 inline-block">Compromisso</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Declaração de Acessibilidade
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            O ConstruCasa se compromete com a acessibilidade digital para todas as pessoas, independentemente de suas capacidades ou tecnologias assistivas utilizadas.
          </p>
        </div>
      </section>

      {/* Nosso Compromisso */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-display font-bold text-navy mb-6">Nosso Compromisso</h2>
              <p className="text-navy/70 leading-relaxed mb-4">
                O ConstruCasa está comprometido em garantir que sua plataforma digital seja acessível às pessoas com deficiência. Trabalhamos continuamente para melhorar a experiência do usuário para todos e aplicamos os padrões de acessibilidade relevantes.
              </p>
              <p className="text-navy/70 leading-relaxed mb-4">
                Buscamos estar em conformidade com as Diretrizes de Acessibilidade para Conteúdo Web (WCAG) 2.1, nível AA, definidas pelo World Wide Web Consortium (W3C). Essas diretrizes explicam como tornar o conteúdo web mais acessível a pessoas com deficiências visuais, auditivas, físicas, de fala, cognitivas, de linguagem, de aprendizado e neurológicas.
              </p>
              <p className="text-navy/70 leading-relaxed">
                Nossa equipe de produto e desenvolvimento recebe treinamento regular em acessibilidade digital, e a acessibilidade é considerada em todas as etapas do ciclo de desenvolvimento de novos recursos.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-display font-semibold text-navy mb-4">Recursos Implementados</h3>
              <ul className="flex flex-col gap-3">
                {[
                  'Navegação completa por teclado em todos os fluxos principais',
                  'Compatibilidade com principais leitores de tela do mercado',
                  'Contraste adequado em todos os textos e elementos de interface',
                  'Textos alternativos descritivos em imagens informativas',
                  'Formulários com labels claras e mensagens de erro acessíveis',
                  'Estrutura semântica correta com headings hierárquicos',
                  'Elementos interativos com áreas de ativação adequadas',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-navy/70 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Status de Conformidade */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-navy text-center mb-4">Status de Conformidade</h2>
          <p className="text-navy/60 text-center mb-12 max-w-xl mx-auto">
            Avaliação realizada em janeiro de 2025 usando ferramentas automatizadas (axe, Lighthouse) e testes manuais com usuários reais.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {statusItems.map((item) => (
              <div key={item.label} className={`card p-8 border ${item.border} ${item.bg}`}>
                <item.icon className={`w-10 h-10 ${item.color} mb-4`} />
                <h3 className="text-lg font-display font-bold text-navy mb-1">{item.label}</h3>
                <p className={`font-semibold ${item.color}`}>{item.status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recursos de Acessibilidade */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-navy text-center mb-12">O que já implementamos</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {implementedFeatures.map((feature) => (
              <div key={feature.category} className="card p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-brand" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-navy">{feature.category}</h3>
                </div>
                <ul className="flex flex-col gap-2">
                  {feature.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-navy/70 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Limitações Conhecidas */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-navy mb-4">Limitações Conhecidas</h2>
          <p className="text-navy/60 mb-10 max-w-2xl">
            Apesar dos nossos esforços, existem algumas áreas onde nossa acessibilidade ainda pode ser melhorada. Estamos trabalhando ativamente para resolver as seguintes limitações:
          </p>
          <div className="flex flex-col gap-4">
            {limitations.map((item) => (
              <div key={item.issue} className="card p-6 border-l-4 border-brand">
                <p className="text-navy font-medium mb-2">{item.issue}</p>
                <p className="text-navy/60 text-sm">
                  <span className="font-semibold text-brand">Plano de correção:</span> {item.fix}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reportar Problema */}
      <section className="section-navy py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Encontrou uma barreira de acessibilidade?
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
            Se você encontrou alguma barreira de acessibilidade em nosso site que não está listada acima, ou se precisou usar tecnologia assistiva e encontrou dificuldades, gostaríamos muito de saber. Seu feedback nos ajuda a melhorar continuamente.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="text-white/70 text-sm">
              <span className="block font-semibold text-white mb-1">E-mail para acessibilidade</span>
              <a href="mailto:acessibilidade@construcasa.com.br" className="text-brand hover:underline">
                acessibilidade@construcasa.com.br
              </a>
              <span className="block mt-1">Resposta em até 5 dias úteis</span>
            </div>
            <a
              href="mailto:acessibilidade@construcasa.com.br"
              className="btn-secondary"
            >
              Enviar Feedback
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
