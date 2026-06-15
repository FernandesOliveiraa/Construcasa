import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Droplets,
  Paintbrush,
  Zap,
  Grid2X2,
  Building2,
  Home,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  CheckCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Impacto = 'baixo' | 'medio' | 'alto';

interface FatorPreco {
  fator: string;
  impacto: Impacto;
}

interface TabelaNivel {
  nivel: string;
  precoMin: number;
  precoMax: number;
  descricao: string;
}

interface FaqItem {
  pergunta: string;
  resposta: string;
}

interface GuiaConteudo {
  slug: string;
  titulo: string;
  descricao: string;
  categoria: string;
  precoMin: number;
  precoMax: number;
  unidade?: string;
  icon: string;
  popular: boolean;
  atualizadoEm: string;
  fatores: FatorPreco[];
  tabela: TabelaNivel[];
  dicas: string[];
  faq: FaqItem[];
}

const ICON_MAP: Record<string, LucideIcon> = {
  Droplets,
  Paintbrush,
  Zap,
  Grid2X2,
  Building2,
  Home,
};

const GUIAS: GuiaConteudo[] = [
  {
    slug: 'custo-reforma-banheiro',
    titulo: 'Custo de Reforma de Banheiro',
    descricao: 'Quanto custa reformar um banheiro em 2025? Veja tabelas por tamanho e padrão.',
    categoria: 'Hidráulica',
    precoMin: 2800,
    precoMax: 18000,
    icon: 'Droplets',
    popular: true,
    atualizadoEm: 'Janeiro 2025',
    fatores: [
      { fator: 'Tamanho do banheiro (m²)', impacto: 'alto' },
      { fator: 'Padrão dos revestimentos escolhidos', impacto: 'alto' },
      { fator: 'Necessidade de quebrar paredes', impacto: 'alto' },
      { fator: 'Troca de tubulação hidráulica', impacto: 'medio' },
      { fator: 'Instalação de aquecedor ou chuveiro elétrico', impacto: 'medio' },
      { fator: 'Pintura e acabamento final', impacto: 'baixo' },
      { fator: 'Acesso ao imóvel (andar alto sem elevador)', impacto: 'baixo' },
    ],
    tabela: [
      {
        nivel: 'Básico',
        precoMin: 2800,
        precoMax: 6000,
        descricao: 'Cerâmica simples, louças e metais de linha básica, sem alteração de layout',
      },
      {
        nivel: 'Padrão',
        precoMin: 6000,
        precoMax: 12000,
        descricao: 'Porcelanato, louças de qualidade média, box de vidro, alguma alteração de layout',
      },
      {
        nivel: 'Premium',
        precoMin: 12000,
        precoMax: 18000,
        descricao: 'Porcelanato importado, louças e metais de alto padrão, projeto assinado, reforma completa',
      },
    ],
    dicas: [
      'Evite mudar o posicionamento de vaso sanitário e chuveiro — mover tubulação encarece muito a obra',
      'Compre os revestimentos com 10% a mais para reposição futura',
      'Contrate encanador e azulejista separadamente para ter maior controle dos custos',
      'Peça três orçamentos e compare itemizado — não compare somente o total',
      'Considere tinta epóxi nas paredes em vez de azulejo em areas menos críticas para economizar',
      'Planeje toda a obra antes de começar para evitar mudanças de última hora',
    ],
    faq: [
      {
        pergunta: 'Quanto tempo leva a reforma de um banheiro?',
        resposta: 'Uma reforma de banheiro básico leva de 10 a 15 dias úteis. Reformas completas com troca de tubulação e mudança de layout podem levar de 20 a 30 dias úteis.',
      },
      {
        pergunta: 'É necessário pedir aprovação para reformar o banheiro?',
        resposta: 'Em apartamentos, mudanças estruturais ou de posicionamento de tubulação geralmente precisam de aprovação do condomínio. Verifique a convenção condominial antes de iniciar a obra.',
      },
      {
        pergunta: 'Posso morar no imóvel durante a reforma do banheiro?',
        resposta: 'Depende do escopo. Reformas simples de revestimento permitem uso do imóvel. Reformas completas com troca de tubulação tornam o banheiro inutilizável por vários dias — planeje uma alternativa.',
      },
      {
        pergunta: 'Qual o material mais barato para piso de banheiro?',
        resposta: 'A cerâmica simples é a opção mais econômica, custando entre R$ 20 e R$ 60/m². O porcelanato é mais durável e fácil de limpar, mas custa entre R$ 60 e R$ 300/m².',
      },
    ],
  },
  {
    slug: 'custo-pintura-casa',
    titulo: 'Custo de Pintura Residencial',
    descricao: 'Preço por metro quadrado de pintura interna e externa com todos os acabamentos.',
    categoria: 'Pintura',
    precoMin: 15,
    precoMax: 55,
    unidade: 'm²',
    icon: 'Paintbrush',
    popular: true,
    atualizadoEm: 'Janeiro 2025',
    fatores: [
      { fator: 'Área total a ser pintada', impacto: 'alto' },
      { fator: 'Tipo de tinta (PVA, acrílica, premium)', impacto: 'alto' },
      { fator: 'Estado atual das paredes (necessidade de massa corrida)', impacto: 'alto' },
      { fator: 'Número de demãos necessárias', impacto: 'medio' },
      { fator: 'Pintura externa versus interna', impacto: 'medio' },
      { fator: 'Cores escuras ou especiais que exigem mais demãos', impacto: 'medio' },
      { fator: 'Altura do pé direito', impacto: 'baixo' },
    ],
    tabela: [
      {
        nivel: 'Básico',
        precoMin: 15,
        precoMax: 25,
        descricao: 'Tinta PVA simples, 2 demãos, sem massa corrida, paredes em bom estado',
      },
      {
        nivel: 'Padrão',
        precoMin: 25,
        precoMax: 40,
        descricao: 'Tinta acrílica de qualidade, massa corrida, 2-3 demãos, correção de imperfeições',
      },
      {
        nivel: 'Premium',
        precoMin: 40,
        precoMax: 55,
        descricao: 'Tinta premium lavável, massa corrida grossa, 3 demãos, tratamento de trincas',
      },
    ],
    dicas: [
      'Sempre use selador antes da tinta em paredes novas ou muito porosas',
      'Pinte em dias sem chuva e com boa ventilação para secagem adequada',
      'Proteja pisos e móveis com plástico antes de iniciar — limpeza posterior é cara',
      'Tintas de cores escuras geralmente precisam de mais demãos — calcule esse custo',
      'Contrate pintores por m² e não por diária para ter previsibilidade de custo',
      'Compre toda a tinta de uma vez para garantir o mesmo lote e cor uniforme',
    ],
    faq: [
      {
        pergunta: 'Quanto tinta é necessário por m² de parede?',
        resposta: 'Em média, 1 litro de tinta cobre de 10 a 12 m² com 2 demãos. Para teto e cálculo completo, some a área de todas as paredes e subtraia janelas e portas.',
      },
      {
        pergunta: 'Qual a diferença entre tinta PVA e acrílica?',
        resposta: 'A tinta PVA é mais barata mas menos durável e difícil de lavar. A tinta acrílica é lavável, mais durável e resistente à umidade — ideal para cozinhas e banheiros.',
      },
      {
        pergunta: 'De quanto em quanto tempo devo pintar a casa?',
        resposta: 'Em geral, a pintura interna dura de 5 a 8 anos. A externa dura de 3 a 5 anos por causa da exposição ao sol e chuva. Manchas, bolhas ou descascamentos indicam que é hora de repintar.',
      },
      {
        pergunta: 'Vale a pena pintar antes de vender o imóvel?',
        resposta: 'Sim. Pesquisas indicam que imóveis recém-pintados vendem até 10% mais rápido e por valores maiores. O investimento em pintura tem um dos melhores retornos em valorização imobiliária.',
      },
    ],
  },
  {
    slug: 'custo-instalacao-eletrica',
    titulo: 'Custo de Instalação Elétrica',
    descricao: 'Preço de pontos elétricos, quadro de distribuição e laudo técnico.',
    categoria: 'Elétrica',
    precoMin: 120,
    precoMax: 400,
    unidade: 'ponto',
    icon: 'Zap',
    popular: true,
    atualizadoEm: 'Janeiro 2025',
    fatores: [
      { fator: 'Número de pontos elétricos e circuitos', impacto: 'alto' },
      { fator: 'Necessidade de trocar o quadro de distribuição', impacto: 'alto' },
      { fator: 'Fiação exposta versus embutida', impacto: 'alto' },
      { fator: 'Disjuntores e proteção diferencial (DR/DPS)', impacto: 'medio' },
      { fator: 'Laudo técnico e ART do engenheiro', impacto: 'medio' },
      { fator: 'Acesso às paredes e teto', impacto: 'medio' },
      { fator: 'Tipo de eletroduto (PVC, metálico, flexível)', impacto: 'baixo' },
    ],
    tabela: [
      {
        nivel: 'Básico',
        precoMin: 120,
        precoMax: 200,
        descricao: 'Pontos simples em imóvel novo, sem quebrar paredes, fiação embutida em eletroduto',
      },
      {
        nivel: 'Padrão',
        precoMin: 200,
        precoMax: 300,
        descricao: 'Pontos com quebra de parede, eletroduto, passagem de fio, caixa de embutir',
      },
      {
        nivel: 'Premium',
        precoMin: 300,
        precoMax: 400,
        descricao: 'Pontos especializados (ar-condicionado, chuveiro), com laudo técnico e ART',
      },
    ],
    dicas: [
      'Nunca faça instalações elétricas sem desligar o disjuntor geral — risco de vida',
      'Use fios de cobre de bitola adequada para cada circuito — nunca economize em fiação',
      'Separar circuitos por ambiente facilita a manutenção e aumenta a segurança',
      'Instale proteção diferencial (DR) em todos os circuitos de banheiro e área externa',
      'Peça ART (Anotação de Responsabilidade Técnica) ao contratar eletricista formado',
      'Documente com fotos onde cada fio e tubulação foi embutido antes de fechar as paredes',
    ],
    faq: [
      {
        pergunta: 'Quando é necessário trocar a fiação elétrica da casa?',
        resposta: 'A vida útil da fiação de cobre é de 20 a 30 anos. Disjuntores que disparam com frequência, tomadas quentes ou cheiro de queimado são sinais de que a fiação precisa ser revisada imediatamente.',
      },
      {
        pergunta: 'Qual a diferença entre 110V e 220V?',
        resposta: 'A tensão 220V é mais eficiente para aparelhos de alta potência como ar-condicionado, chuveiro e fogão. A tensão 110V é padrão para tomadas gerais. Muitos imóveis modernos têm instalação bifásica (ambas).',
      },
      {
        pergunta: 'É obrigatório ter aterramento elétrico?',
        resposta: 'Sim, pelo código NBR 5410 da ABNT. O aterramento protege contra choques elétricos e garante o funcionamento dos dispositivos de proteção diferencial (DR). Imóveis sem aterramento não estão em conformidade com as normas.',
      },
      {
        pergunta: 'O que é a ART e quando é obrigatória?',
        resposta: 'A ART (Anotação de Responsabilidade Técnica) é o documento que comprova que um profissional habilitado pelo CREA realizou ou supervisionou a instalação. É obrigatória em instalações elétricas de maior porte e necessária para aprovação em concessionárias.',
      },
    ],
  },
  {
    slug: 'custo-piso-revestimento',
    titulo: 'Custo de Piso e Revestimento',
    descricao: 'Tabela completa: cerâmica, porcelanato, madeira e vinílico por m².',
    categoria: 'Acabamento',
    precoMin: 45,
    precoMax: 180,
    unidade: 'm²',
    icon: 'Grid2X2',
    popular: false,
    atualizadoEm: 'Janeiro 2025',
    fatores: [
      { fator: 'Tipo de material (cerâmica, porcelanato, madeira)', impacto: 'alto' },
      { fator: 'Área total a ser revestida', impacto: 'alto' },
      { fator: 'Necessidade de demolir piso antigo', impacto: 'medio' },
      { fator: 'Padrão do rejunte e argamassa', impacto: 'baixo' },
      { fator: 'Complexidade do layout (cortes, diagonais)', impacto: 'medio' },
      { fator: 'Nível de preparo do contrapiso', impacto: 'medio' },
      { fator: 'Acabamentos (rodapé, soleira)', impacto: 'baixo' },
    ],
    tabela: [
      {
        nivel: 'Básico',
        precoMin: 45,
        precoMax: 75,
        descricao: 'Cerâmica simples 45x45, rejunte e argamassa comuns, instalação linear',
      },
      {
        nivel: 'Padrão',
        precoMin: 75,
        precoMax: 130,
        descricao: 'Porcelanato 60x60, piso vinílico ou laminado, rejunte epóxi',
      },
      {
        nivel: 'Premium',
        precoMin: 130,
        precoMax: 180,
        descricao: 'Porcelanato importado, madeira maciça ou piso aquecido, instalação complexa',
      },
    ],
    dicas: [
      'Compre 10% a mais de material para cobrir cortes e perdas',
      'Verifique a resistência ao deslizamento (PEI) antes de comprar — use PEI 4 ou 5 em áreas úmidas',
      'Pisos vinílicos são ótima opção custo-benefício: fáceis de instalar e duráveis',
      'Contrate separadamente material e mão de obra para ter controle de qualidade',
      'Aguarde 28 dias para usar pisos de porcelanato após a instalação (cura da argamassa)',
    ],
    faq: [
      {
        pergunta: 'É possível assentar porcelanato sobre piso antigo?',
        resposta: 'Sim, é possível, mas o piso antigo precisa estar firme, nivelado e sem partes soltas. O sobrepiso aumenta o nível do piso em cerca de 1,5 cm, o que pode criar desnível nas portas.',
      },
      {
        pergunta: 'Qual piso é mais fácil de manter?',
        resposta: 'O porcelanato polido é o mais fácil de limpar, mas escorregadio. O porcelanato acetinado (matte) é mais seguro e também de fácil manutenção. Madeira exige mais cuidado com umidade.',
      },
    ],
  },
  {
    slug: 'custo-construcao-muro',
    titulo: 'Custo de Construção de Muro',
    descricao: 'Preço por metro linear de muro em alvenaria, misto ou pré-moldado.',
    categoria: 'Alvenaria',
    precoMin: 380,
    precoMax: 950,
    unidade: 'metro linear',
    icon: 'Building2',
    popular: false,
    atualizadoEm: 'Janeiro 2025',
    fatores: [
      { fator: 'Altura do muro', impacto: 'alto' },
      { fator: 'Tipo de material (alvenaria, pré-moldado, misto)', impacto: 'alto' },
      { fator: 'Tipo de solo e necessidade de fundação', impacto: 'alto' },
      { fator: 'Acabamento (reboco, pintura, pedra)', impacto: 'medio' },
      { fator: 'Comprimento total do muro', impacto: 'medio' },
      { fator: 'Acesso ao terreno para obra', impacto: 'baixo' },
    ],
    tabela: [
      {
        nivel: 'Básico',
        precoMin: 380,
        precoMax: 550,
        descricao: 'Muro pré-moldado até 2m, sem acabamento especial',
      },
      {
        nivel: 'Padrão',
        precoMin: 550,
        precoMax: 750,
        descricao: 'Muro de alvenaria com reboco, pintura e portão simples',
      },
      {
        nivel: 'Premium',
        precoMin: 750,
        precoMax: 950,
        descricao: 'Muro misto com pedras decorativas, altura acima de 2,5m, iluminação',
      },
    ],
    dicas: [
      'Verifique recuos obrigatórios na prefeitura antes de construir',
      'Muros acima de 2m geralmente exigem projeto estrutural assinado por engenheiro',
      'Pré-moldado é mais rápido de instalar mas menos personalizável que alvenaria',
      'Inclua pingadeiras no topo do muro para evitar infiltração e deterioração',
    ],
    faq: [
      {
        pergunta: 'Preciso de alvará para construir muro?',
        resposta: 'Depende do município. Muros simples até certa altura geralmente não exigem alvará, mas é obrigatório verificar na prefeitura local antes de iniciar a obra.',
      },
      {
        pergunta: 'Qual a altura máxima de muro sem projeto estrutural?',
        resposta: 'Em geral, muros até 1,5m não exigem projeto estrutural, mas isso varia por município e tipo de solo. Consulte um engenheiro civil para maior segurança.',
      },
    ],
  },
  {
    slug: 'custo-telhado',
    titulo: 'Custo de Reforma de Telhado',
    descricao: 'Troca de telhas, impermeabilização e estrutura — tudo por m².',
    categoria: 'Telhado',
    precoMin: 80,
    precoMax: 300,
    unidade: 'm²',
    icon: 'Home',
    popular: false,
    atualizadoEm: 'Janeiro 2025',
    fatores: [
      { fator: 'Tipo de telha (cerâmica, metálica, shingle)', impacto: 'alto' },
      { fator: 'Estado da estrutura de madeira (tesouras)', impacto: 'alto' },
      { fator: 'Área total do telhado', impacto: 'alto' },
      { fator: 'Necessidade de impermeabilização', impacto: 'medio' },
      { fator: 'Inclinação do telhado', impacto: 'medio' },
      { fator: 'Calhas, rufos e acabamentos', impacto: 'baixo' },
    ],
    tabela: [
      {
        nivel: 'Básico',
        precoMin: 80,
        precoMax: 140,
        descricao: 'Troca de telhas cerâmicas, estrutura em bom estado, sem impermeabilização',
      },
      {
        nivel: 'Padrão',
        precoMin: 140,
        precoMax: 220,
        descricao: 'Telha metálica termoacústica, reforma parcial da estrutura, calhas novas',
      },
      {
        nivel: 'Premium',
        precoMin: 220,
        precoMax: 300,
        descricao: 'Substituição total da estrutura, shingle americano, impermeabilização e isolamento',
      },
    ],
    dicas: [
      'Inspecione o telhado todo ano, antes da temporada de chuvas',
      'Telhas metálicas duram mais e são mais leves, reduzindo carga na estrutura',
      'Limpe as calhas a cada 6 meses para evitar entupimentos e infiltrações',
      'Impermeabilize lajes e calhas com manta asfáltica para maior durabilidade',
    ],
    faq: [
      {
        pergunta: 'Quando devo trocar o telhado inteiro em vez de apenas reparar?',
        resposta: 'Se mais de 30% das telhas estão quebradas ou deslocadas, ou se a estrutura de madeira apresenta podridão ou ataque de cupins, a reforma completa é mais econômica a longo prazo.',
      },
      {
        pergunta: 'Qual telha é mais eficiente termicamente?',
        resposta: 'Telhas metálicas termoacústicas com isolamento interno são as mais eficientes. O shingle americano também tem bom desempenho. Telhas de cerâmica simples transmitem muito calor sem forro e isolamento adequados.',
      },
    ],
  },
];

const IMPACTO_CLASSES: Record<Impacto, string> = {
  baixo: 'bg-green-100 text-green-800',
  medio: 'bg-yellow-100 text-yellow-800',
  alto: 'bg-red-100 text-red-800',
};

const IMPACTO_LABEL: Record<Impacto, string> = {
  baixo: 'Baixo',
  medio: 'Médio',
  alto: 'Alto',
};

function formatPreco(value: number): string {
  return value.toLocaleString('pt-BR');
}

export default function GuiaDetalhePage() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [faqAberta, setFaqAberta] = useState<number | null>(null);

  const guia = GUIAS.find((g) => g.slug === slug);

  if (!guia) {
    return (
      <div
        className="min-h-screen bg-cream flex flex-col items-center justify-center"
        style={{ paddingTop: '103px' }}
      >
        <h1 className="font-display text-3xl font-bold text-navy mb-4">Guia não encontrado</h1>
        <p className="text-navy opacity-60 mb-8">
          O guia que você procura não existe ou foi removido.
        </p>
        <button onClick={() => navigate('/guias')} className="btn-primary">
          <ArrowLeft size={18} /> Ver todos os guias
        </button>
      </div>
    );
  }

  const Icon = ICON_MAP[guia.icon];
  const unidade = guia.unidade ? `/${guia.unidade}` : '';

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="section-navy" style={{ paddingTop: '103px' }}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white opacity-70 mb-6">
            <button onClick={() => navigate('/guias')} className="hover:opacity-100 transition-opacity">
              Guias
            </button>
            <ChevronRight size={14} />
            <span className="opacity-100">{guia.categoria}</span>
            <ChevronRight size={14} />
            <span className="opacity-100">{guia.titulo}</span>
          </nav>

          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center flex-shrink-0">
              {Icon && <Icon size={32} className="text-brand" />}
            </div>
            <div>
              <span className="badge-brand mb-3 inline-block">{guia.categoria}</span>
              <h1 className="font-display text-4xl font-bold text-white mb-3">{guia.titulo}</h1>
              <p className="text-white opacity-75">Atualizado em: {guia.atualizadoEm}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabela de Preços */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-navy mb-4">
            Faixa de Preço por Nível
          </h2>
          <p className="text-navy opacity-60 mb-10">
            Preço médio praticado no mercado brasileiro em 2025.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="text-left px-6 py-4 font-semibold rounded-tl-xl">Nível</th>
                  <th className="text-left px-6 py-4 font-semibold">
                    Faixa de Preço (R${unidade})
                  </th>
                  <th className="text-left px-6 py-4 font-semibold rounded-tr-xl">Descrição</th>
                </tr>
              </thead>
              <tbody>
                {guia.tabela.map((linha, index) => (
                  <tr
                    key={linha.nivel}
                    className={index % 2 === 0 ? 'bg-cream' : 'bg-white'}
                  >
                    <td className="px-6 py-4 font-semibold text-navy">{linha.nivel}</td>
                    <td className="px-6 py-4 text-brand font-bold">
                      R$ {formatPreco(linha.precoMin)} – R$ {formatPreco(linha.precoMax)}
                    </td>
                    <td className="px-6 py-4 text-navy opacity-80 text-sm">{linha.descricao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Fatores de Preço */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-navy mb-4">
            O que afeta o custo?
          </h2>
          <p className="text-navy opacity-60 mb-10">
            Entenda os principais fatores que influenciam o preço final da sua obra.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guia.fatores.map((item) => (
              <div
                key={item.fator}
                className="card p-5 flex items-center justify-between gap-4"
              >
                <span className="text-navy font-medium">{item.fator}</span>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${IMPACTO_CLASSES[item.impacto]}`}
                >
                  {IMPACTO_LABEL[item.impacto]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dicas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-navy mb-10">
            Dicas para Economizar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guia.dicas.map((dica, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle size={20} className="text-brand mt-0.5 flex-shrink-0" />
                <p className="text-navy opacity-80">{dica}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-3xl font-bold text-navy mb-10">
            Perguntas Frequentes
          </h2>
          <div className="max-w-3xl space-y-3">
            {guia.faq.map((item, index) => (
              <div key={index} className="card overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                  onClick={() => setFaqAberta(faqAberta === index ? null : index)}
                >
                  <span className="font-semibold text-navy pr-4">{item.pergunta}</span>
                  <ChevronDown
                    size={20}
                    className={`text-brand flex-shrink-0 transition-transform ${faqAberta === index ? 'rotate-180' : ''}`}
                  />
                </button>
                {faqAberta === index && (
                  <div className="px-6 pb-4">
                    <p className="text-navy opacity-75 leading-relaxed">{item.resposta}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-navy py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            Pronto para solicitar orçamentos?
          </h2>
          <p className="text-white opacity-75 mb-8">
            Encontre profissionais qualificados na sua cidade e receba orçamentos sem compromisso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="btn-primary text-base px-8 py-3"
              onClick={() => navigate('/')}
            >
              Buscar Profissionais
            </button>
            <button
              className="btn-secondary text-base px-8 py-3 border-white text-white hover:bg-white hover:text-brand"
              onClick={() => navigate('/calculadora')}
            >
              Usar Calculadora
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
