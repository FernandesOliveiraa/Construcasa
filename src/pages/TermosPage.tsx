export default function TermosPage() {
  const sections = [
    { id: 'secao1', title: '1. Aceitação dos Termos' },
    { id: 'secao2', title: '2. Descrição do Serviço' },
    { id: 'secao3', title: '3. Cadastro e Conta' },
    { id: 'secao4', title: '4. Responsabilidades do Cliente' },
    { id: 'secao5', title: '5. Responsabilidades do Profissional' },
    { id: 'secao6', title: '6. Pagamentos e Taxas' },
    { id: 'secao7', title: '7. Avaliações e Comentários' },
    { id: 'secao8', title: '8. Propriedade Intelectual' },
    { id: 'secao9', title: '9. Limitação de Responsabilidade' },
    { id: 'secao10', title: '10. Rescisão' },
    { id: 'secao11', title: '11. Legislação Aplicável' },
    { id: 'secao12', title: '12. Contato' },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="section-navy" style={{ paddingTop: '103px', paddingBottom: '80px' }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="badge-brand mb-6 inline-block">Documentos Legais</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Termos de Uso
          </h1>
          <p className="text-white/60 text-sm">Última atualização: 1º de janeiro de 2025</p>
        </div>
      </section>

      {/* Sidebar + Conteúdo */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="lg:grid lg:grid-cols-4 gap-12">
            {/* Sidebar */}
            <aside className="lg:col-span-1 mb-10 lg:mb-0">
              <div className="sticky top-28">
                <p className="text-xs font-semibold text-navy/40 uppercase tracking-widest mb-4">Seções</p>
                <nav className="flex flex-col gap-1">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="text-sm text-navy/70 hover:text-brand transition-colors py-1 leading-snug"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Conteúdo */}
            <div className="lg:col-span-3 flex flex-col gap-12">
              <div id="secao1">
                <h2 className="text-2xl font-display font-bold text-navy mb-4">1. Aceitação dos Termos</h2>
                <p className="text-navy/70 leading-relaxed mb-3">
                  Ao acessar ou utilizar a plataforma ConstruCasa, você concorda em ficar vinculado a estes Termos de Uso e a todas as políticas e diretrizes incorporadas a este documento por referência. Se você não concordar com alguma parte destes termos, não poderá acessar ou utilizar nossos serviços.
                </p>
                <p className="text-navy/70 leading-relaxed mb-3">
                  Estes termos constituem um acordo legalmente vinculante entre você e a ConstruCasa Tecnologia Ltda., empresa brasileira regularmente constituída. Ao criar uma conta, clicar em "Aceito" ou simplesmente ao navegar pela plataforma, você manifesta seu consentimento livre, informado e inequívoco com estes termos.
                </p>
                <p className="text-navy/70 leading-relaxed">
                  Reservamo-nos o direito de alterar estes Termos de Uso a qualquer momento, mediante notificação prévia de 15 dias por e-mail ou por aviso proeminente na plataforma. O uso continuado dos serviços após a vigência das alterações constitui aceitação dos novos termos.
                </p>
              </div>

              <div id="secao2">
                <h2 className="text-2xl font-display font-bold text-navy mb-4">2. Descrição do Serviço</h2>
                <p className="text-navy/70 leading-relaxed mb-3">
                  O ConstruCasa é uma plataforma de marketplace digital que conecta pessoas físicas e jurídicas que necessitam de serviços de construção, reforma e manutenção a profissionais autônomos e empresas especializadas. Nossa plataforma facilita a descoberta, contratação e avaliação de serviços no setor da construção civil.
                </p>
                <p className="text-navy/70 leading-relaxed mb-3">
                  Atuamos exclusivamente como intermediários tecnológicos entre clientes e profissionais, disponibilizando ferramentas de busca, comunicação, solicitação de orçamentos e avaliação. Não somos parte dos contratos de prestação de serviços celebrados entre clientes e profissionais, tampouco empregadores dos profissionais cadastrados.
                </p>
                <p className="text-navy/70 leading-relaxed">
                  Nossos serviços incluem, mas não se limitam a: busca e filtragem de profissionais, sistema de mensagens, solicitação de orçamentos, avaliações e comentários, perfis profissionais com portfólio, e um programa de garantia de satisfação. Podemos adicionar, modificar ou remover funcionalidades a qualquer momento, com ou sem aviso prévio.
                </p>
              </div>

              <div id="secao3">
                <h2 className="text-2xl font-display font-bold text-navy mb-4">3. Cadastro e Conta</h2>
                <p className="text-navy/70 leading-relaxed mb-3">
                  Para utilizar as funcionalidades completas da plataforma, você deve criar uma conta e ter no mínimo 18 anos de idade. Ao se cadastrar, você declara e garante que possui capacidade legal plena para celebrar contratos e que todas as informações fornecidas são verdadeiras, precisas, atuais e completas.
                </p>
                <p className="text-navy/70 leading-relaxed mb-3">
                  Você é o único responsável por manter a confidencialidade de suas credenciais de acesso (e-mail e senha) e por todas as atividades realizadas em sua conta. Em caso de uso não autorizado ou suspeita de violação de segurança, você deve nos notificar imediatamente pelo e-mail suporte@construcasa.com.br.
                </p>
                <p className="text-navy/70 leading-relaxed">
                  Cada pessoa pode manter apenas uma conta pessoal ativa na plataforma. É proibido criar contas em nome de terceiros sem autorização expressa, utilizar informações falsas ou de terceiros no cadastro, ou tentar contornar uma suspensão ou banimento criando nova conta.
                </p>
              </div>

              <div id="secao4">
                <h2 className="text-2xl font-display font-bold text-navy mb-4">4. Responsabilidades do Cliente</h2>
                <p className="text-navy/70 leading-relaxed mb-3">
                  Como cliente, você se compromete a utilizar a plataforma exclusivamente para fins lícitos e de acordo com estes Termos de Uso. É vedado solicitar orçamentos sem real intenção de contratação, divulgar informações falsas ou enganosas sobre o escopo dos serviços, ou tentar negociar fora da plataforma para burlar as taxas de serviço.
                </p>
                <p className="text-navy/70 leading-relaxed mb-3">
                  Você se compromete a cumprir os compromissos agendados com os profissionais ou, em caso de cancelamento, a fazê-lo com antecedência mínima de 24 horas. Cancelamentos recorrentes sem justificativa podem resultar em restrição de acesso à plataforma.
                </p>
                <p className="text-navy/70 leading-relaxed">
                  As avaliações e comentários publicados por você devem refletir sua experiência genuína com o profissional. É proibido publicar avaliações falsas, difamatórias, discriminatórias ou que contenham informações pessoais de terceiros. O ConstruCasa poderá remover conteúdo que viole estas diretrizes sem aviso prévio.
                </p>
              </div>

              <div id="secao5">
                <h2 className="text-2xl font-display font-bold text-navy mb-4">5. Responsabilidades do Profissional</h2>
                <p className="text-navy/70 leading-relaxed mb-3">
                  Profissionais cadastrados na plataforma devem manter seu perfil e portfólio atualizados, com informações verdadeiras sobre suas qualificações, certificações, área de atuação e disponibilidade. A inclusão de trabalhos que não foram realizados pelo profissional é estritamente proibida e constitui causa de suspensão imediata.
                </p>
                <p className="text-navy/70 leading-relaxed mb-3">
                  Ao enviar um orçamento, o profissional se compromete a cumprir os valores, prazos e especificações nele descritos. Alterações substanciais no orçamento após a aceitação pelo cliente requerem acordo expresso de ambas as partes e devem ser documentadas na plataforma. O descumprimento reiterado de orçamentos pode resultar no cancelamento da conta.
                </p>
                <p className="text-navy/70 leading-relaxed">
                  O profissional é o único responsável pela qualidade, segurança e legalidade dos serviços prestados, incluindo a obtenção de licenças, alvarás e seguros necessários. O ConstruCasa não supervisiona, dirige nem controla a execução dos serviços, e não assume qualquer responsabilidade por danos, acidentes ou irregularidades decorrentes da prestação dos serviços.
                </p>
              </div>

              <div id="secao6">
                <h2 className="text-2xl font-display font-bold text-navy mb-4">6. Pagamentos e Taxas</h2>
                <p className="text-navy/70 leading-relaxed mb-3">
                  O ConstruCasa oferece planos de assinatura para profissionais que desejam maior visibilidade e acesso a recursos premium. Os valores dos planos são exibidos na página de preços e podem ser alterados com aviso prévio de 30 dias. Profissionais nos planos pagos têm acesso a um número ilimitado de orçamentos e aparecem em posição privilegiada nos resultados de busca.
                </p>
                <p className="text-navy/70 leading-relaxed mb-3">
                  O processamento de pagamentos é realizado por parceiros especializados e certificados pelo PCI-DSS. Não armazenamos dados de cartão de crédito em nossos servidores. Em caso de estorno ou disputa de pagamento, aplicam-se as políticas do processador de pagamentos e da bandeira do cartão utilizado.
                </p>
                <p className="text-navy/70 leading-relaxed">
                  Assinaturas são renovadas automaticamente ao final de cada período, salvo cancelamento pelo profissional com antecedência mínima de 3 dias úteis antes da data de renovação. Não realizamos reembolsos pro-rata por cancelamentos no meio do ciclo de faturamento, exceto nos casos previstos pelo Código de Defesa do Consumidor.
                </p>
              </div>

              <div id="secao7">
                <h2 className="text-2xl font-display font-bold text-navy mb-4">7. Avaliações e Comentários</h2>
                <p className="text-navy/70 leading-relaxed mb-3">
                  O sistema de avaliações do ConstruCasa é baseado em experiências reais de clientes que efetivamente contrataram profissionais pela plataforma. Apenas usuários com serviços concluídos podem publicar avaliações, garantindo a autenticidade do sistema. Avaliações não passam por moderação prévia, mas são monitoradas continuamente.
                </p>
                <p className="text-navy/70 leading-relaxed mb-3">
                  É expressamente proibido solicitar, oferecer ou aceitar qualquer forma de compensação em troca de avaliações positivas. Também é vedado publicar avaliações de si mesmo, de familiares ou de concorrentes. A detecção de manipulação de avaliações resultará na remoção imediata das avaliações fraudulentas e poderá implicar suspensão ou banimento das partes envolvidas.
                </p>
                <p className="text-navy/70 leading-relaxed">
                  Profissionais podem responder publicamente às avaliações recebidas, desde que as respostas sejam respeitosas e não contenham informações pessoais do cliente. O ConstruCasa se reserva o direito de remover avaliações ou respostas que violem estas diretrizes ou que sejam consideradas abusivas, discriminatórias ou difamatórias.
                </p>
              </div>

              <div id="secao8">
                <h2 className="text-2xl font-display font-bold text-navy mb-4">8. Propriedade Intelectual</h2>
                <p className="text-navy/70 leading-relaxed mb-3">
                  Todo o conteúdo disponível na plataforma ConstruCasa — incluindo textos, imagens, logotipos, ícones, interfaces, código-fonte, marcas e outros elementos — é de propriedade exclusiva da ConstruCasa Tecnologia Ltda. ou de seus licenciadores, e está protegido pelas leis brasileiras e internacionais de propriedade intelectual.
                </p>
                <p className="text-navy/70 leading-relaxed mb-3">
                  É concedida ao usuário uma licença limitada, não exclusiva, não transferível e revogável para acessar e utilizar a plataforma para fins pessoais e não comerciais. Esta licença não inclui o direito de reproduzir, distribuir, modificar, criar obras derivadas, exibir publicamente ou explorar comercialmente qualquer conteúdo da plataforma sem nossa autorização expressa por escrito.
                </p>
                <p className="text-navy/70 leading-relaxed">
                  Ao publicar conteúdo na plataforma (fotos de portfólio, descrições de serviços, avaliações), você concede ao ConstruCasa uma licença mundial, não exclusiva, gratuita e sublicenciável para usar, reproduzir, modificar, exibir e distribuir esse conteúdo para fins de operação e promoção da plataforma.
                </p>
              </div>

              <div id="secao9">
                <h2 className="text-2xl font-display font-bold text-navy mb-4">9. Limitação de Responsabilidade</h2>
                <p className="text-navy/70 leading-relaxed mb-3">
                  O ConstruCasa atua exclusivamente como intermediário tecnológico e não é parte dos contratos celebrados entre clientes e profissionais. Não nos responsabilizamos pela qualidade, segurança, legalidade ou adequação dos serviços prestados pelos profissionais, nem pelas obrigações assumidas por qualquer das partes nos contratos de prestação de serviços.
                </p>
                <p className="text-navy/70 leading-relaxed mb-3">
                  Na máxima extensão permitida pela legislação aplicável, o ConstruCasa não será responsável por danos indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo perda de lucros, dados ou oportunidades de negócio, decorrentes do uso ou da impossibilidade de uso da plataforma ou dos serviços nela intermediados.
                </p>
                <p className="text-navy/70 leading-relaxed">
                  Nossa responsabilidade total perante qualquer usuário, em decorrência de qualquer causa relacionada a estes termos ou ao uso da plataforma, será limitada ao valor pago pelo usuário ao ConstruCasa nos 12 meses anteriores ao evento que gerou a responsabilidade, ou ao valor de R$ 500,00 (quinhentos reais), o que for maior.
                </p>
              </div>

              <div id="secao10">
                <h2 className="text-2xl font-display font-bold text-navy mb-4">10. Rescisão</h2>
                <p className="text-navy/70 leading-relaxed mb-3">
                  Você pode encerrar sua conta a qualquer momento, acessando as configurações da sua conta e solicitando o cancelamento. O encerramento não isenta você de obrigações já assumidas perante outros usuários da plataforma, como serviços contratados em andamento ou pagamentos pendentes.
                </p>
                <p className="text-navy/70 leading-relaxed mb-3">
                  O ConstruCasa pode suspender ou encerrar sua conta, a qualquer momento e sem aviso prévio, em caso de violação destes Termos de Uso, comportamento fraudulento, uso abusivo da plataforma, ou por determinação judicial ou de autoridade competente. Nos casos de encerramento por violação, não haverá direito a reembolso de valores eventualmente pagos.
                </p>
                <p className="text-navy/70 leading-relaxed">
                  Após o encerramento da conta, seus dados pessoais serão tratados conforme nossa Política de Privacidade. Conteúdos públicos, como avaliações publicadas, podem permanecer na plataforma após o encerramento da conta, pois fazem parte do histórico de outros usuários.
                </p>
              </div>

              <div id="secao11">
                <h2 className="text-2xl font-display font-bold text-navy mb-4">11. Legislação Aplicável</h2>
                <p className="text-navy/70 leading-relaxed mb-3">
                  Estes Termos de Uso são regidos e interpretados de acordo com as leis da República Federativa do Brasil, incluindo, sem limitação, o Código Civil, o Código de Defesa do Consumidor (Lei nº 8.078/1990), o Marco Civil da Internet (Lei nº 12.965/2014) e a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
                </p>
                <p className="text-navy/70 leading-relaxed mb-3">
                  Qualquer disputa, controvérsia ou reclamação decorrente ou relacionada a estes Termos de Uso, ou à utilização da plataforma, será submetida à tentativa de resolução amigável pelo prazo de 30 dias. Não sendo possível a solução amigável, as partes elegem o foro da Comarca de São Paulo, Estado de São Paulo, com exclusão de qualquer outro, por mais privilegiado que seja.
                </p>
                <p className="text-navy/70 leading-relaxed">
                  A eventual invalidade ou inexequibilidade de qualquer disposição destes Termos não afetará a validade ou exequibilidade das demais disposições, que permanecerão em pleno vigor e efeito.
                </p>
              </div>

              <div id="secao12">
                <h2 className="text-2xl font-display font-bold text-navy mb-4">12. Contato</h2>
                <p className="text-navy/70 leading-relaxed mb-3">
                  Para dúvidas, reclamações ou solicitações relacionadas a estes Termos de Uso, entre em contato com nosso departamento jurídico pelo e-mail{' '}
                  <a href="mailto:juridico@construcasa.com.br" className="text-brand hover:underline">
                    juridico@construcasa.com.br
                  </a>
                  . Nossa equipe se compromete a responder no prazo de até 10 dias úteis.
                </p>
                <p className="text-navy/70 leading-relaxed mb-3">
                  Para questões de suporte geral, acesse nosso Central de Ajuda ou entre em contato pelo e-mail suporte@construcasa.com.br. Para questões relacionadas à privacidade e proteção de dados, consulte nossa Política de Privacidade e entre em contato pelo e-mail privacidade@construcasa.com.br.
                </p>
                <p className="text-navy/70 leading-relaxed">
                  ConstruCasa Tecnologia Ltda. — CNPJ 00.000.000/0001-00 — Rua das Construções, 1500, São Paulo/SP — CEP 01310-100.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
