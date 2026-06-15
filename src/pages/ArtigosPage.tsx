import { useNavigate, useParams } from 'react-router-dom';
import { Clock, User, ChevronRight, ArrowLeft } from 'lucide-react';

interface Artigo {
  id: string;
  slug: string;
  titulo: string;
  excerpt: string;
  categoria: string;
  autor: string;
  dataPublicacao: string;
  tempoLeitura: string;
  imagem: string;
  destaque: boolean;
}

const ARTIGOS: Artigo[] = [
  {
    id: '1',
    slug: 'como-planejar-reforma-apartamento',
    titulo: 'Como Planejar a Reforma do seu Apartamento sem Estresse',
    excerpt: 'Guia completo com checklist, cronograma e dicas de especialistas para uma reforma tranquila.',
    categoria: 'Reforma',
    autor: 'Rafael Mendes',
    dataPublicacao: '22 Mai 2025',
    tempoLeitura: '8 min',
    imagem: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80',
    destaque: true,
  },
  {
    id: '2',
    slug: 'tendencias-design-interiores-2025',
    titulo: '10 Tendências de Design de Interiores para 2025',
    excerpt: 'Do minimalismo japonês ao biofílico, veja o que vai dominar os projetos este ano.',
    categoria: 'Decoração',
    autor: 'Camila Torres',
    dataPublicacao: '18 Mai 2025',
    tempoLeitura: '6 min',
    imagem: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    destaque: true,
  },
  {
    id: '3',
    slug: 'como-contratar-eletricista',
    titulo: 'Como Contratar um Eletricista: 7 Perguntas que Você Precisa Fazer',
    excerpt: 'Antes de fechar contrato, saiba o que perguntar para garantir um serviço seguro e com garantia.',
    categoria: 'Dicas',
    autor: 'Diego Alves',
    dataPublicacao: '14 Mai 2025',
    tempoLeitura: '5 min',
    imagem: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
    destaque: false,
  },
  {
    id: '4',
    slug: 'mercado-reformas-brasil-2025',
    titulo: 'Mercado de Reformas no Brasil Cresce 18% e Deve Atingir R$ 400 Bi',
    excerpt: 'Dados do setor mostram aceleração impulsionada por crédito imobiliário e valorização dos imóveis.',
    categoria: 'Mercado',
    autor: 'Juliana Costa',
    dataPublicacao: '10 Mai 2025',
    tempoLeitura: '4 min',
    imagem: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    destaque: false,
  },
  {
    id: '5',
    slug: 'ia-no-mercado-de-reformas',
    titulo: 'Como a IA Está Transformando o Setor de Reformas',
    excerpt: 'Do orçamento automático ao projeto 3D, conheça as ferramentas que já estão mudando tudo.',
    categoria: 'Tecnologia',
    autor: 'Rafael Mendes',
    dataPublicacao: '05 Mai 2025',
    tempoLeitura: '7 min',
    imagem: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=800&q=80',
    destaque: false,
  },
  {
    id: '6',
    slug: 'dicas-economia-reforma',
    titulo: '12 Maneiras de Economizar na Reforma sem Abrir Mão da Qualidade',
    excerpt: 'Estratégias práticas que profissionais usam e que você pode aplicar na sua próxima obra.',
    categoria: 'Dicas',
    autor: 'Camila Torres',
    dataPublicacao: '01 Mai 2025',
    tempoLeitura: '9 min',
    imagem: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80',
    destaque: false,
  },
];

const CONTEUDO_POR_SLUG: Record<string, string[]> = {
  'como-planejar-reforma-apartamento': [
    'Reformar um apartamento é um projeto que envolve planejamento cuidadoso, coordenação de múltiplos profissionais e gestão de expectativas. Antes de bater o primeiro martelo, é fundamental entender o escopo completo da obra e definir prioridades claras.',
    'O primeiro passo é fazer um levantamento detalhado de tudo que precisa ser feito. Divida as obras em categorias: hidráulica, elétrica, alvenaria, revestimentos e acabamentos. Essa divisão facilita a obtenção de orçamentos e o acompanhamento do progresso.',
    'O cronograma realista é o segredo de uma reforma sem estresse. Considere que obras sempre atrasam — adicione uma folga de 20% ao prazo estimado. Defina marcos intermediários para acompanhar se o ritmo está adequado.',
    'O orçamento deve incluir os custos de materiais, mão de obra e uma reserva de contingência de pelo menos 15%. Imprevistos são comuns em reformas: tubulações antigas, estrutura comprometida ou problemas elétricos podem surgir durante a obra.',
    'A escolha dos profissionais é crucial. Solicite pelo menos três orçamentos, verifique referências e prefira profissionais com registro no CREA ou no conselho de sua área. Contratos escritos são obrigatórios — nunca inicie uma obra apenas com acordos verbais.',
    'Durante a execução, faça visitas regulares à obra. Fotografe o progresso para ter registro e compare com o planejamento. Problemas identificados cedo são mais baratos de corrigir.',
    'Ao final, faça uma vistoria detalhada antes de efetuar o pagamento final. Teste torneiras, interruptores, tomadas e verifique acabamentos. Uma reforma bem executada valoriza o imóvel e proporciona mais qualidade de vida.',
  ],
  'tendencias-design-interiores-2025': [
    'O design de interiores em 2025 está marcado por uma busca profunda por autenticidade e conexão com a natureza. As tendências deste ano refletem o desejo crescente de criar espaços que promovam bem-estar e identidade pessoal.',
    'O minimalismo japonês, ou "ma", continua influenciando projetos ao redor do mundo. A ideia central é que o vazio também tem valor — espaços com menos objetos proporcionam mais clareza mental e funcionalidade.',
    'O design biofílico ganhou ainda mais força. Paredes verdes, jardins internos, materiais naturais como madeira crua e pedras brutas estão presentes em projetos residenciais e comerciais. A pesquisa mostra que ambientes com elementos naturais reduzem o estresse.',
    'As paletas de cores de 2025 apostam em tons terrosos: terracota, ocre, caramelo e verde-musgo. Essas cores criam ambientes acolhedores e atemporais, em contraste com o branco puro que dominou a última década.',
    'A marcenaria sob medida está em alta, mas com um twist: peças que mistura funções, como estantes que também servem como divisórias de ambiente ou bancadas que integram espaço de trabalho e lazer.',
    'Tecidos naturais como linho, algodão e veludo retornam em grande estilo. Cortinas pesadas, tapetes de fibras naturais e almofadas texturizadas adicionam profundidade e conforto aos espaços.',
    'A iluminação inteligente transformou a forma de projetar ambientes. Sistemas que adaptam a temperatura de cor ao longo do dia melhoram o humor e a produtividade dos moradores.',
  ],
  'como-contratar-eletricista': [
    'Contratar um eletricista exige mais do que comparar preços. A instalação elétrica de uma residência é um sistema crítico de segurança — erros podem causar curtos-circuitos, incêndios e acidentes graves.',
    'A primeira pergunta essencial é: o profissional tem registro no CREA (Conselho Regional de Engenharia e Agronomia) ou é técnico habilitado pelo CFT? Apenas profissionais registrados podem emitir laudos elétricos válidos.',
    'Pergunte sobre experiência específica com projetos semelhantes ao seu. Uma instalação elétrica para um apartamento residencial é diferente de uma instalação trifásica para um galpão industrial. A especialização importa.',
    'Solicite referências de clientes anteriores e, se possível, visite uma obra já finalizada. Isso permite avaliar a qualidade do acabamento, organização do quadro de distribuição e organização geral do trabalho.',
    'O orçamento deve ser detalhado por itens: quantidade de pontos elétricos, tipo de fio utilizado, disjuntores, eletrodutos e mão de obra. Orçamentos vagos são sinal de alerta.',
    'Pergunte sobre garantia do serviço. Profissionais sérios oferecem garantia mínima de 90 dias nos serviços executados e respondem por vícios ocultos que surjam posteriormente.',
    'Por fim, exija nota fiscal ou recibo detalhado. Além de garantir seus direitos como consumidor, o documento comprova o serviço realizado, o que pode ser importante para seguros ou futuras reformas.',
  ],
};

const CONTEUDO_GENERICO = [
  'Este tema é fundamental para qualquer pessoa que esteja planejando uma obra ou reforma. Com as informações certas, é possível tomar decisões mais seguras e economizar recursos.',
  'O mercado de construção civil passou por grandes transformações nos últimos anos. Novas tecnologias e materiais oferecem opções mais eficientes, duráveis e sustentáveis para projetos de todos os tamanhos.',
  'A escolha de profissionais qualificados é sempre o ponto de partida. Verifique registros, peça referências e compare orçamentos antes de fechar qualquer contrato.',
  'O planejamento financeiro é essencial. Mantenha uma reserva de contingência e evite realizar obras sem um orçamento detalhado e aprovado previamente.',
  'Acompanhe o progresso da obra regularmente e documente tudo com fotos. Comunicação clara com os profissionais contratados evita mal-entendidos e retrabalho.',
];

function ArticleDetail({ artigo }: { artigo: Artigo }) {
  const navigate = useNavigate();
  const paragrafoConteudo = CONTEUDO_POR_SLUG[artigo.slug] ?? CONTEUDO_GENERICO;
  const relacionados = ARTIGOS.filter((a) => a.slug !== artigo.slug).slice(0, 3);
  const categorias = [...new Set(ARTIGOS.map((a) => a.categoria))];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero com imagem */}
      <div className="relative" style={{ height: '420px', paddingTop: '103px' }}>
        <img
          src={artigo.imagem}
          alt={artigo.titulo}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy opacity-70" />
        <div className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-6 pb-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white opacity-70 mb-4">
            <button onClick={() => navigate('/blog')} className="hover:opacity-100 transition-opacity">
              Blog
            </button>
            <ChevronRight size={14} />
            <button onClick={() => navigate('/blog')} className="hover:opacity-100 transition-opacity">
              {artigo.categoria}
            </button>
            <ChevronRight size={14} />
            <span className="opacity-100 line-clamp-1">{artigo.titulo}</span>
          </nav>
          <span className="badge-brand mb-3 self-start">{artigo.categoria}</span>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-white max-w-3xl leading-tight mb-4">
            {artigo.titulo}
          </h1>
          <div className="flex items-center gap-6 text-white opacity-75 text-sm">
            <span className="flex items-center gap-2">
              <User size={15} /> {artigo.autor}
            </span>
            <span>{artigo.dataPublicacao}</span>
            <span className="flex items-center gap-2">
              <Clock size={15} /> {artigo.tempoLeitura} de leitura
            </span>
          </div>
        </div>
      </div>

      {/* Conteúdo + Sidebar */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Conteúdo principal */}
          <article className="lg:col-span-2">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-brand font-semibold mb-8 hover:gap-3 transition-all"
            >
              <ArrowLeft size={18} /> Voltar
            </button>
            <div className="prose prose-lg max-w-none">
              {paragrafoConteudo.map((paragrafo, index) => (
                <p key={index} className="text-navy leading-relaxed mb-6 text-base">
                  {paragrafo}
                </p>
              ))}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Artigos relacionados */}
            <div className="card p-6">
              <h3 className="font-display text-lg font-bold text-navy mb-5">
                Artigos relacionados
              </h3>
              <div className="space-y-5">
                {relacionados.map((rel) => (
                  <div
                    key={rel.id}
                    className="flex gap-3 cursor-pointer group"
                    onClick={() => navigate(`/artigos/${rel.slug}`)}
                  >
                    <img
                      src={rel.imagem}
                      alt={rel.titulo}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div>
                      <span className="badge-brand text-xs mb-1 inline-block">{rel.categoria}</span>
                      <p className="text-sm font-semibold text-navy group-hover:text-brand transition-colors leading-snug line-clamp-2">
                        {rel.titulo}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categorias */}
            <div className="card p-6">
              <h3 className="font-display text-lg font-bold text-navy mb-4">Categorias</h3>
              <div className="space-y-2">
                {categorias.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => navigate('/blog')}
                    className="flex items-center justify-between w-full text-sm text-navy hover:text-brand transition-colors py-1"
                  >
                    <span>{cat}</span>
                    <ChevronRight size={14} />
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function ArtigosPage() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug?: string }>();

  if (slug) {
    const artigo = ARTIGOS.find((a) => a.slug === slug);

    if (!artigo) {
      return (
        <div className="min-h-screen bg-cream flex flex-col items-center justify-center" style={{ paddingTop: '103px' }}>
          <h1 className="font-display text-3xl font-bold text-navy mb-4">Artigo não encontrado</h1>
          <p className="text-navy opacity-60 mb-8">
            O artigo que você procura não existe ou foi removido.
          </p>
          <button onClick={() => navigate('/blog')} className="btn-primary">
            <ArrowLeft size={18} /> Voltar ao Blog
          </button>
        </div>
      );
    }

    return <ArticleDetail artigo={artigo} />;
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="section-navy" style={{ paddingTop: '103px' }}>
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="font-display text-5xl font-bold text-white mb-4">
            Artigos &amp; Dicas Técnicas
          </h1>
          <p className="text-lg text-white opacity-75 max-w-xl mx-auto">
            Conteúdo educativo criado por especialistas em construção.
          </p>
        </div>
      </section>

      {/* Grid de artigos */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ARTIGOS.map((artigo) => (
              <div
                key={artigo.id}
                className="card overflow-hidden cursor-pointer"
                onClick={() => navigate(`/artigos/${artigo.slug}`)}
              >
                <img
                  src={artigo.imagem}
                  alt={artigo.titulo}
                  className="w-full object-cover"
                  style={{ height: '200px' }}
                />
                <div className="p-6 flex flex-col h-full">
                  <span className="badge-brand text-xs mb-3 self-start">{artigo.categoria}</span>
                  <h3 className="font-display text-lg font-bold text-navy mb-2 leading-tight">
                    {artigo.titulo}
                  </h3>
                  <p className="text-navy opacity-70 text-sm mb-4 flex-1">{artigo.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-navy opacity-60 mb-4">
                    <span className="flex items-center gap-1">
                      <User size={12} /> {artigo.autor}
                    </span>
                    <span>{artigo.dataPublicacao}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {artigo.tempoLeitura}
                    </span>
                  </div>
                  <button
                    className="btn-ghost px-0 self-start"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/artigos/${artigo.slug}`);
                    }}
                  >
                    Ler <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
