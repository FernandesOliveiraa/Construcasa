import { useState } from 'react';
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Plano {
  id: string;
  nome: string;
  descricao: string;
  preco: { mensal: number | null; anual: number | null };
  badge?: string;
  destaque: boolean;
  recursos: string[];
  cta: string;
  ctaVariant: 'primary' | 'secondary';
}

const PLANOS: Plano[] = [
  {
    id: 'gratis',
    nome: 'Gratuito',
    descricao: 'Para quem quer encontrar profissionais sem compromisso',
    preco: { mensal: 0, anual: 0 },
    destaque: false,
    recursos: [
      'Busca ilimitada de profissionais',
      'Até 3 pedidos de orçamento por mês',
      'Chat com profissionais',
      'Avaliações e comentários',
      'Garantia de satisfação básica',
    ],
    cta: 'Começar Grátis',
    ctaVariant: 'secondary',
  },
  {
    id: 'pro-basico',
    nome: 'Pro Básico',
    descricao: 'Para profissionais que querem aparecer nas buscas',
    preco: { mensal: 89, anual: 71 },
    destaque: false,
    recursos: [
      'Perfil profissional completo',
      'Aparece nas buscas orgânicas',
      'Até 15 leads por mês',
      'Badge "Verificado"',
      'Suporte por email',
      'Analytics básico do perfil',
    ],
    cta: 'Assinar Pro Básico',
    ctaVariant: 'secondary',
  },
  {
    id: 'pro-premium',
    nome: 'Pro Premium',
    descricao: 'Para profissionais que querem dominar o mercado',
    preco: { mensal: 199, anual: 159 },
    badge: 'Mais popular',
    destaque: true,
    recursos: [
      'Tudo do Pro Básico',
      'Destaque nas buscas (2× visibilidade)',
      'Leads ilimitados',
      'Badge "Premium" dourado',
      'Analytics avançado',
      'Suporte prioritário (chat + telefone)',
      'Acesso antecipado a novos recursos',
      'Ferramentas de gestão de orçamentos',
    ],
    cta: 'Assinar Pro Premium',
    ctaVariant: 'primary',
  },
];

const FAQ_ITEMS = [
  {
    pergunta: 'Posso cancelar a qualquer momento?',
    resposta: 'Sim, sem multa ou burocracia. Ao cancelar, você mantém acesso ao plano até o fim do período já pago.',
  },
  {
    pergunta: 'Como funciona o teste grátis?',
    resposta: 'Oferecemos 14 dias grátis no Pro Premium. Nenhum cartão é cobrado durante o período de teste — você só paga se decidir continuar.',
  },
  {
    pergunta: 'Quais formas de pagamento são aceitas?',
    resposta: 'Aceitamos cartão de crédito (todas as bandeiras), Pix e boleto bancário. O plano anual pode ser parcelado em até 12x no cartão.',
  },
  {
    pergunta: 'Posso mudar de plano?',
    resposta: 'Sim. Upgrade é imediato — você começa a usar os benefícios na hora. Downgrade entra em vigor no início do próximo ciclo de cobrança.',
  },
  {
    pergunta: 'Preciso de CNPJ para assinar?',
    resposta: 'Não. CPF é suficiente para se cadastrar e assinar qualquer plano. Profissionais autônomos são bem-vindos.',
  },
];

type ComparativoFeature = {
  label: string;
  gratis: string;
  proBasico: string;
  proPremium: string;
};

const COMPARATIVO: ComparativoFeature[] = [
  { label: 'Pedidos de orçamento', gratis: 'Até 3/mês', proBasico: 'Ilimitado', proPremium: 'Ilimitado' },
  { label: 'Leads/mês', gratis: '–', proBasico: 'Até 15', proPremium: 'Ilimitado' },
  { label: 'Badge', gratis: '–', proBasico: 'Verificado', proPremium: 'Premium Dourado' },
  { label: 'Destaque na busca', gratis: '–', proBasico: '–', proPremium: '2× visibilidade' },
  { label: 'Analytics', gratis: '–', proBasico: 'Básico', proPremium: 'Avançado' },
  { label: 'Suporte', gratis: '–', proBasico: 'Email', proPremium: 'Chat + Telefone' },
  { label: 'Leads ilimitados', gratis: '–', proBasico: '–', proPremium: '✓' },
];

function CellValue({ value }: { value: string }) {
  if (value === '✓') {
    return <span className="text-green-600 font-semibold">✓</span>;
  }
  if (value === '–') {
    return <span className="text-navy/30">–</span>;
  }
  return <span className="text-navy/80 text-sm">{value}</span>;
}

export default function PlanosPage() {
  const navigate = useNavigate();
  const [billing, setBilling] = useState<'mensal' | 'anual'>('mensal');
  const [faqAberto, setFaqAberto] = useState<number | null>(null);

  const getPreco = (plano: Plano) => {
    const valor = billing === 'mensal' ? plano.preco.mensal : plano.preco.anual;
    return valor;
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="section-navy" style={{ paddingTop: '103px', paddingBottom: '80px' }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
            Planos e Preços
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
            Comece grátis como cliente. Para profissionais, escolha o plano certo para crescer.
          </p>

          {/* Toggle mensal/anual */}
          <div className="inline-flex items-center gap-3 bg-white/10 rounded-full p-1">
            <button
              onClick={() => setBilling('mensal')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                billing === 'mensal'
                  ? 'bg-white text-navy'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBilling('anual')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                billing === 'anual'
                  ? 'bg-white text-navy'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Anual
              <span className="badge-brand text-xs px-2 py-0.5 rounded-full font-semibold">20% off</span>
            </button>
          </div>
        </div>
      </section>

      {/* Cards de Planos */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {PLANOS.map((plano) => {
              const preco = getPreco(plano);
              return (
                <div
                  key={plano.id}
                  className={`relative flex flex-col rounded-3xl p-8 bg-white ${
                    plano.destaque
                      ? 'border-2 border-brand shadow-xl shadow-brand/10'
                      : 'border border-border shadow-md'
                  }`}
                >
                  {plano.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="badge-brand px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap">
                        {plano.badge}
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-display font-bold text-navy mb-1">{plano.nome}</h3>
                    <p className="text-navy/60 text-sm">{plano.descricao}</p>
                  </div>

                  <div className="mb-8">
                    {preco === 0 ? (
                      <p className="text-4xl font-display font-bold text-navy">Grátis</p>
                    ) : (
                      <>
                        <p className="text-4xl font-display font-bold text-navy">
                          R$ {preco}
                          <span className="text-base font-normal text-navy/50">/mês</span>
                        </p>
                        {billing === 'anual' && (
                          <p className="text-sm text-navy/50 mt-1">cobrado anualmente</p>
                        )}
                      </>
                    )}
                  </div>

                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {plano.recursos.map((recurso) => (
                      <li key={recurso} className="flex items-start gap-2 text-sm text-navy/80">
                        <CheckCircle className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                        {recurso}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => navigate('/')}
                    className={plano.ctaVariant === 'primary' ? 'btn-primary w-full' : 'btn-secondary w-full'}
                  >
                    {plano.cta}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparativo detalhado */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-navy text-center mb-12">
            Comparativo detalhado
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-4 px-4 text-navy/50 text-sm font-medium w-1/2">Recurso</th>
                  <th className="text-center py-4 px-4 text-navy font-display font-semibold">Gratuito</th>
                  <th className="text-center py-4 px-4 text-navy font-display font-semibold">Pro Básico</th>
                  <th className="text-center py-4 px-4 text-brand font-display font-semibold">Pro Premium</th>
                </tr>
              </thead>
              <tbody>
                {COMPARATIVO.map((row, idx) => (
                  <tr
                    key={row.label}
                    className={`border-b border-border ${idx % 2 === 0 ? 'bg-cream/40' : ''}`}
                  >
                    <td className="py-4 px-4 text-navy/80 text-sm">{row.label}</td>
                    <td className="py-4 px-4 text-center">
                      <CellValue value={row.gratis} />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <CellValue value={row.proBasico} />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <CellValue value={row.proPremium} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-navy text-center mb-12">
            Dúvidas sobre os planos
          </h2>

          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item, idx) => {
              const aberto = faqAberto === idx;
              return (
                <div key={item.pergunta} className="card overflow-hidden">
                  <button
                    onClick={() => setFaqAberto(aberto ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-display font-semibold text-navy pr-4">{item.pergunta}</span>
                    {aberto ? (
                      <ChevronUp className="w-5 h-5 text-brand shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-navy/40 shrink-0" />
                    )}
                  </button>
                  {aberto && (
                    <div className="px-6 pb-6 text-navy/70 leading-relaxed">
                      {item.resposta}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-navy py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Comece hoje mesmo — 14 dias grátis no Pro Premium
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Sem cartão de crédito necessário para iniciar. Cancele quando quiser.
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary text-lg px-10 py-4"
          >
            Começar período gratuito
          </button>
        </div>
      </section>
    </div>
  );
}
