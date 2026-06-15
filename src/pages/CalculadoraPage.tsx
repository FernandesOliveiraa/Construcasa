import { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Calculator } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type UnidadeServico = 'm²' | 'ponto' | 'metro linear' | 'unidade';

type Servico = {
  id: string;
  nome: string;
  unidade: UnidadeServico;
  precos: {
    basico: { min: number; max: number };
    padrao: { min: number; max: number };
    premium: { min: number; max: number };
  };
  descricao: string;
};

const SERVICOS: Servico[] = [
  {
    id: 'pintura',
    nome: 'Pintura',
    unidade: 'm²',
    precos: {
      basico: { min: 15, max: 25 },
      padrao: { min: 25, max: 40 },
      premium: { min: 40, max: 65 },
    },
    descricao: 'Pintura interna ou externa com rolo e acabamento padrão',
  },
  {
    id: 'piso',
    nome: 'Piso e Revestimento',
    unidade: 'm²',
    precos: {
      basico: { min: 45, max: 80 },
      padrao: { min: 80, max: 140 },
      premium: { min: 140, max: 220 },
    },
    descricao: 'Assentamento de cerâmica, porcelanato ou piso vinílico',
  },
  {
    id: 'eletrica',
    nome: 'Instalação Elétrica',
    unidade: 'ponto',
    precos: {
      basico: { min: 120, max: 180 },
      padrao: { min: 180, max: 280 },
      premium: { min: 280, max: 420 },
    },
    descricao: 'Instalação de pontos elétricos (tomada, interruptor, luminárias)',
  },
  {
    id: 'hidraulica',
    nome: 'Instalação Hidráulica',
    unidade: 'ponto',
    precos: {
      basico: { min: 250, max: 380 },
      padrao: { min: 380, max: 550 },
      premium: { min: 550, max: 800 },
    },
    descricao: 'Pontos de água fria, quente e esgoto',
  },
  {
    id: 'banheiro',
    nome: 'Reforma de Banheiro',
    unidade: 'm²',
    precos: {
      basico: { min: 800, max: 1200 },
      padrao: { min: 1200, max: 2000 },
      premium: { min: 2000, max: 3500 },
    },
    descricao: 'Reforma completa incluindo revestimento, louças e metais',
  },
  {
    id: 'cozinha',
    nome: 'Reforma de Cozinha',
    unidade: 'm²',
    precos: {
      basico: { min: 700, max: 1100 },
      padrao: { min: 1100, max: 1800 },
      premium: { min: 1800, max: 3000 },
    },
    descricao: 'Reforma completa de cozinha com armários e bancada',
  },
  {
    id: 'alvenaria',
    nome: 'Alvenaria / Construção',
    unidade: 'm²',
    precos: {
      basico: { min: 900, max: 1400 },
      padrao: { min: 1400, max: 2200 },
      premium: { min: 2200, max: 3800 },
    },
    descricao: 'Construção de paredes, lajes e estruturas em alvenaria',
  },
  {
    id: 'telhado',
    nome: 'Telhado / Cobertura',
    unidade: 'm²',
    precos: {
      basico: { min: 80, max: 140 },
      padrao: { min: 140, max: 220 },
      premium: { min: 220, max: 380 },
    },
    descricao: 'Troca de telhas, impermeabilização e estrutura de madeira',
  },
];

type NivelAcabamento = 'basico' | 'padrao' | 'premium';

const NIVEIS: { id: NivelAcabamento; nome: string; descricao: string }[] = [
  {
    id: 'basico',
    nome: 'Básico',
    descricao: 'Materiais econômicos, mão de obra sem especialização. Ideal para obras funcionais com custo reduzido.',
  },
  {
    id: 'padrao',
    nome: 'Padrão',
    descricao: 'Materiais de qualidade média, profissional qualificado. Ótima relação custo-benefício.',
  },
  {
    id: 'premium',
    nome: 'Premium',
    descricao: 'Materiais nobres, especialista certificado. Para quem exige o melhor acabamento e durabilidade.',
  },
];

const formatCurrency = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

const STEP_LABELS = ['Serviço', 'Quantidade', 'Acabamento', 'Resultado'];

export default function CalculadoraPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedServico, setSelectedServico] = useState<string>('');
  const [quantidade, setQuantidade] = useState<string>('');
  const [nivelAcabamento, setNivelAcabamento] = useState<NivelAcabamento>('padrao');
  const [resultado, setResultado] = useState<{ min: number; max: number } | null>(null);

  const servicoSelecionado = SERVICOS.find((s) => s.id === selectedServico);

  const calcular = () => {
    const servico = SERVICOS.find((s) => s.id === selectedServico);
    if (!servico || !quantidade) return;
    const qtd = parseFloat(quantidade.replace(',', '.'));
    if (isNaN(qtd) || qtd <= 0) return;
    const faixa = servico.precos[nivelAcabamento];
    setResultado({ min: Math.round(faixa.min * qtd), max: Math.round(faixa.max * qtd) });
    setStep(4);
  };

  const resetar = () => {
    setStep(1);
    setSelectedServico('');
    setQuantidade('');
    setNivelAcabamento('padrao');
    setResultado(null);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="section-navy" style={{ paddingTop: '103px', paddingBottom: '80px' }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="badge-brand inline-block mb-6">Estimativa Gratuita</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
            Calculadora de Obras
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Estime o custo da sua reforma antes de solicitar orçamentos. Dados baseados em preços reais do mercado.
          </p>
        </div>
      </section>

      {/* Calculadora Multi-step */}
      <section className="py-20 bg-cream">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white rounded-3xl p-8 shadow-md">
            {/* Progress Bar */}
            <div className="flex items-center mb-10">
              {STEP_LABELS.map((label, idx) => {
                const stepNum = idx + 1;
                const isActive = step === stepNum;
                const isCompleted = step > stepNum;
                return (
                  <div key={label} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-display font-semibold transition-all ${
                          isCompleted
                            ? 'bg-brand text-white'
                            : isActive
                            ? 'bg-navy text-white'
                            : 'bg-cream text-navy/40 border border-border'
                        }`}
                      >
                        {isCompleted ? '✓' : stepNum}
                      </div>
                      <span
                        className={`text-xs hidden sm:block ${
                          isActive ? 'text-navy font-medium' : 'text-navy/40'
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                    {idx < STEP_LABELS.length - 1 && (
                      <div
                        className={`flex-1 h-px mx-2 mb-5 transition-all ${
                          isCompleted ? 'bg-brand' : 'bg-border'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Etapa 1 — Selecionar Serviço */}
            {step === 1 && (
              <div>
                <h3 className="text-xl font-display font-bold text-navy mb-6">
                  Qual serviço você precisa?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICOS.map((servico) => {
                    const selecionado = selectedServico === servico.id;
                    return (
                      <button
                        key={servico.id}
                        onClick={() => {
                          setSelectedServico(servico.id);
                          setStep(2);
                        }}
                        className={`text-left p-4 rounded-2xl border-2 transition-all ${
                          selecionado
                            ? 'bg-brand border-brand text-white'
                            : 'bg-cream border-border hover:border-brand text-navy'
                        }`}
                      >
                        <p className="font-display font-semibold text-sm mb-1">{servico.nome}</p>
                        <p
                          className={`text-xs leading-relaxed ${
                            selecionado ? 'text-white/70' : 'text-navy/50'
                          }`}
                        >
                          {servico.descricao}
                        </p>
                        <p
                          className={`text-xs font-medium mt-2 ${
                            selecionado ? 'text-white/80' : 'text-brand'
                          }`}
                        >
                          por {servico.unidade}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Etapa 2 — Quantidade */}
            {step === 2 && servicoSelecionado && (
              <div>
                <h3 className="text-xl font-display font-bold text-navy mb-6">
                  Qual é a quantidade?
                </h3>

                <div className="bg-cream rounded-2xl p-4 mb-6 flex flex-col gap-1">
                  <p className="text-sm text-navy/60">
                    Serviço: <span className="text-navy font-medium">{servicoSelecionado.nome}</span>
                  </p>
                  <p className="text-sm text-navy/60">
                    Unidade: <span className="text-navy font-medium">{servicoSelecionado.unidade}</span>
                  </p>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-navy/70 mb-2">
                    Quantidade (em {servicoSelecionado.unidade})
                  </label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    placeholder={`Ex: ${servicoSelecionado.unidade === 'ponto' ? '8' : '25'}`}
                    className="input-base w-full"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="btn-ghost flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Voltar
                  </button>
                  <button
                    onClick={() => {
                      const qtd = parseFloat(quantidade.replace(',', '.'));
                      if (!isNaN(qtd) && qtd > 0) setStep(3);
                    }}
                    disabled={!quantidade || isNaN(parseFloat(quantidade.replace(',', '.')))}
                    className="btn-primary flex items-center gap-2 flex-1 justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continuar
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Etapa 3 — Nível de Acabamento */}
            {step === 3 && (
              <div>
                <h3 className="text-xl font-display font-bold text-navy mb-6">
                  Qual nível de acabamento?
                </h3>

                <div className="flex flex-col gap-3 mb-8">
                  {NIVEIS.map((nivel) => {
                    const selecionado = nivelAcabamento === nivel.id;
                    return (
                      <button
                        key={nivel.id}
                        onClick={() => setNivelAcabamento(nivel.id)}
                        className={`text-left p-5 rounded-2xl border-2 transition-all ${
                          selecionado
                            ? 'bg-brand/5 border-brand'
                            : 'bg-cream border-border hover:border-brand/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-display font-semibold text-navy">{nivel.nome}</p>
                          {selecionado && (
                            <div className="w-5 h-5 rounded-full bg-brand flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-navy/60 leading-relaxed">{nivel.descricao}</p>
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="btn-ghost flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Voltar
                  </button>
                  <button
                    onClick={calcular}
                    className="btn-primary flex items-center gap-2 flex-1 justify-center"
                  >
                    Ver Estimativa
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Etapa 4 — Resultado */}
            {step === 4 && resultado && servicoSelecionado && (
              <div>
                <h3 className="text-xl font-display font-bold text-navy mb-6">
                  Estimativa para sua obra
                </h3>

                {/* Resumo */}
                <div className="bg-cream rounded-2xl p-4 mb-6 flex flex-col gap-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-navy/60">Serviço</span>
                    <span className="text-navy font-medium">{servicoSelecionado.nome}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-navy/60">Quantidade</span>
                    <span className="text-navy font-medium">
                      {quantidade.replace(',', '.')} {servicoSelecionado.unidade}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-navy/60">Acabamento</span>
                    <span className="text-navy font-medium capitalize">
                      {NIVEIS.find((n) => n.id === nivelAcabamento)?.nome}
                    </span>
                  </div>
                </div>

                {/* Destaque do resultado */}
                <div className="bg-navy rounded-2xl p-8 text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Calculator className="w-5 h-5 text-brand" />
                    <span className="text-white/70 text-sm font-medium">Estimativa total</span>
                  </div>
                  <p className="text-white font-display font-bold text-3xl md:text-4xl">
                    {formatCurrency(resultado.min)}
                    <span className="text-white/50 mx-2">–</span>
                    {formatCurrency(resultado.max)}
                  </p>
                  <p className="text-white/50 text-sm mt-2">
                    Baseado em preços de mercado para acabamento{' '}
                    <span className="text-brand">
                      {NIVEIS.find((n) => n.id === nivelAcabamento)?.nome.toLowerCase()}
                    </span>
                  </p>
                </div>

                <p className="text-navy/50 text-xs leading-relaxed mb-8">
                  * Esta é uma estimativa baseada em dados de mercado. O valor real pode variar conforme
                  região, especificações e disponibilidade dos profissionais.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={resetar}
                    className="btn-ghost flex items-center gap-2 justify-center"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Nova Estimativa
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="btn-primary flex items-center gap-2 flex-1 justify-center"
                  >
                    Buscar Profissionais
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
