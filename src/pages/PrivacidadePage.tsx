import { ShieldCheck, UserCog, Lock } from 'lucide-react';

const highlights = [
  {
    icon: ShieldCheck,
    title: 'Não vendemos seus dados',
    description: 'Seus dados pessoais jamais serão vendidos ou cedidos a terceiros para fins comerciais.',
  },
  {
    icon: UserCog,
    title: 'Você controla seus dados',
    description: 'Acesse, corrija, exporte ou solicite a exclusão dos seus dados a qualquer momento.',
  },
  {
    icon: Lock,
    title: 'Criptografia ponta-a-ponta',
    description: 'Toda comunicação entre você e nossa plataforma é protegida por TLS e criptografia de dados em repouso.',
  },
];

const sections = [
  { id: 'sec1', title: '1. Quem Somos' },
  { id: 'sec2', title: '2. Dados que Coletamos' },
  { id: 'sec3', title: '3. Como Usamos seus Dados' },
  { id: 'sec4', title: '4. Base Legal (LGPD)' },
  { id: 'sec5', title: '5. Compartilhamento de Dados' },
  { id: 'sec6', title: '6. Cookies e Tecnologias Similares' },
  { id: 'sec7', title: '7. Seus Direitos (LGPD)' },
  { id: 'sec8', title: '8. Segurança dos Dados' },
  { id: 'sec9', title: '9. Retenção de Dados' },
  { id: 'sec10', title: '10. Menores de Idade' },
  { id: 'sec11', title: '11. Alterações desta Política' },
  { id: 'sec12', title: '12. Como Exercer seus Direitos' },
];

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="section-navy" style={{ paddingTop: '103px', paddingBottom: '80px' }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="badge-brand mb-6 inline-block">Documentos Legais</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Política de Privacidade
          </h1>
          <p className="text-white/60 text-sm mb-3">Última atualização: 1º de janeiro de 2025</p>
          <p className="text-white/70 text-base max-w-xl mx-auto">
            Estamos em conformidade com a LGPD (Lei 13.709/2018) e comprometidos com a proteção dos seus dados pessoais.
          </p>
        </div>
      </section>

      {/* Destaques de privacidade */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item) => (
              <div key={item.title} className="card p-8 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-brand" />
                </div>
                <h3 className="text-lg font-display font-semibold text-navy">{item.title}</h3>
                <p className="text-navy/70 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
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
              <div id="sec1">
                <h2 className="text-2xl font-display font-bold text-navy mb-4">1. Quem Somos</h2>
                <p className="text-navy/70 leading-relaxed mb-3">
                  A ConstruCasa Tecnologia Ltda. (CNPJ 00.000.000/0001-00), com sede em São Paulo/SP, é a controladora dos dados pessoais coletados e tratados por meio da plataforma ConstruCasa. Nos termos da Lei Geral de Proteção de Dados (LGPD), somos responsáveis pelas decisões sobre o tratamento dos seus dados.
                </p>
                <p className="text-navy/70 leading-relaxed mb-3">
                  Nossa plataforma conecta clientes que precisam de serviços de construção e reforma a profissionais qualificados. Para prestar esse serviço, coletamos e tratamos dados pessoais de clientes e profissionais cadastrados, sempre com base em fundamentos legais previstos na LGPD.
                </p>
                <p className="text-navy/70 leading-relaxed">
                  Esta Política de Privacidade descreve quais dados coletamos, como os utilizamos, com quem os compartilhamos e quais são seus direitos como titular dos dados. Caso tenha dúvidas, nosso Encarregado de Proteção de Dados (DPO) pode ser contatado em privacidade@construcasa.com.br.
                </p>
              </div>

              <div id="sec2">
                <h2 className="text-2xl font-display font-bold text-navy mb-4">2. Dados que Coletamos</h2>
                <p className="text-navy/70 leading-relaxed mb-3">
                  <strong className="text-navy">Dados de cadastro:</strong> nome completo, endereço de e-mail, número de telefone, CPF (para profissionais), endereço, foto de perfil e, para profissionais, informações sobre qualificações, certificações e portfólio de trabalhos.
                </p>
                <p className="text-navy/70 leading-relaxed mb-3">
                  <strong className="text-navy">Dados de uso:</strong> informações sobre como você interage com a plataforma, incluindo páginas visitadas, buscas realizadas, orçamentos solicitados ou enviados, avaliações publicadas, e mensagens trocadas com outros usuários (armazenadas de forma segura).
                </p>
                <p className="text-navy/70 leading-relaxed mb-3">
                  <strong className="text-navy">Dados de dispositivo e conexão:</strong> endereço IP, tipo de navegador, sistema operacional, identificadores de dispositivo e dados de localização aproximada (cidade/estado), coletados automaticamente quando você acessa nossa plataforma.
                </p>
                <p className="text-navy/70 leading-relaxed">
                  <strong className="text-navy">Dados de pagamento:</strong> para profissionais com planos pagos, coletamos informações de faturamento (como últimos 4 dígitos do cartão e data de validade). Dados completos do cartão são processados diretamente pelo nosso parceiro de pagamentos e não são armazenados em nossos servidores.
                </p>
              </div>

              <div id="sec3">
                <h2 className="text-2xl font-display font-bold text-navy mb-4">3. Como Usamos seus Dados</h2>
                <p className="text-navy/70 leading-relaxed mb-3">
                  <strong className="text-navy">Prestação do serviço:</strong> utilizamos seus dados para criar e gerenciar sua conta, conectar clientes a profissionais, processar solicitações de orçamento, gerenciar avaliações e manter o sistema de mensagens da plataforma.
                </p>
                <p className="text-navy/70 leading-relaxed mb-3">
                  <strong className="text-navy">Comunicações:</strong> enviamos e-mails transacionais (confirmações, notificações de mensagens, alertas de orçamento) e, com seu consentimento, comunicações de marketing sobre novidades, promoções e funcionalidades da plataforma. Você pode cancelar comunicações de marketing a qualquer momento.
                </p>
                <p className="text-navy/70 leading-relaxed mb-3">
                  <strong className="text-navy">Melhoria da plataforma:</strong> analisamos dados de uso de forma agregada e anonimizada para entender como a plataforma é utilizada, identificar problemas técnicos, desenvolver novas funcionalidades e personalizar a experiência do usuário.
                </p>
                <p className="text-navy/70 leading-relaxed">
                  <strong className="text-navy">Obrigações legais:</strong> podemos utilizar seus dados para cumprir obrigações legais, responder a solicitações de autoridades competentes, exercer ou defender direitos em processos judiciais, administrativos ou arbitrais.
                </p>
              </div>

              <div id="sec4">
                <h2 className="text-2xl font-display font-bold text-navy mb-4">4. Base Legal (LGPD)</h2>
                <p className="text-navy/70 leading-relaxed mb-3">
                  <strong className="text-navy">Execução de contrato (art. 7º, V, LGPD):</strong> o tratamento de dados necessário para criar sua conta, prestar os serviços da plataforma e executar as funcionalidades contratadas é baseado na execução do contrato de prestação de serviços que você celebra ao aceitar nossos Termos de Uso.
                </p>
                <p className="text-navy/70 leading-relaxed mb-3">
                  <strong className="text-navy">Consentimento (art. 7º, I, LGPD):</strong> para o envio de comunicações de marketing, uso de cookies não essenciais e compartilhamento de dados para fins publicitários, solicitamos seu consentimento explícito, que pode ser revogado a qualquer momento sem prejuízo para o uso dos demais serviços.
                </p>
                <p className="text-navy/70 leading-relaxed mb-3">
                  <strong className="text-navy">Interesse legítimo (art. 7º, IX, LGPD):</strong> utilizamos dados para fins de segurança da plataforma, prevenção de fraudes, melhoria de serviços e análises internas, desde que não prevaleçam sobre seus direitos e liberdades fundamentais.
                </p>
                <p className="text-navy/70 leading-relaxed">
                  <strong className="text-navy">Obrigação legal (art. 7º, II, LGPD):</strong> alguns tratamentos de dados são necessários para cumprirmos obrigações legais como a guarda de registros de acesso exigida pelo Marco Civil da Internet (Lei 12.965/2014).
                </p>
              </div>

              <div id="sec5">
                <h2 className="text-2xl font-display font-bold text-navy mb-4">5. Compartilhamento de Dados</h2>
                <p className="text-navy/70 leading-relaxed mb-3">
                  <strong className="text-navy">Entre clientes e profissionais:</strong> quando um cliente solicita um orçamento, compartilhamos as informações necessárias (nome, descrição do serviço, localização aproximada) com o profissional selecionado. Da mesma forma, o perfil público do profissional (nome, especialidades, avaliações, portfólio) é visível para os clientes.
                </p>
                <p className="text-navy/70 leading-relaxed mb-3">
                  <strong className="text-navy">Fornecedores de serviços:</strong> compartilhamos dados com empresas que nos prestam serviços essenciais, como processamento de pagamentos, hospedagem em nuvem, envio de e-mails e análise de dados. Esses fornecedores são contratualmente obrigados a proteger seus dados e a utilizá-los apenas para as finalidades autorizadas.
                </p>
                <p className="text-navy/70 leading-relaxed mb-3">
                  <strong className="text-navy">Autoridades públicas:</strong> podemos compartilhar dados quando exigido por lei, ordem judicial, ou para proteger os direitos, propriedade ou segurança do ConstruCasa, de nossos usuários ou do público em geral.
                </p>
                <p className="text-navy/70 leading-relaxed">
                  <strong className="text-navy">O que não fazemos:</strong> não vendemos, alugamos ou cedemos seus dados pessoais a terceiros para fins comerciais. Não compartilhamos seus dados com anunciantes sem seu consentimento explícito. Não realizamos transferências internacionais de dados sem as salvaguardas adequadas previstas na LGPD.
                </p>
              </div>

              <div id="sec6">
                <h2 className="text-2xl font-display font-bold text-navy mb-4">6. Cookies e Tecnologias Similares</h2>
                <p className="text-navy/70 leading-relaxed mb-3">
                  Utilizamos cookies e tecnologias similares para manter você conectado, lembrar suas preferências, entender como você usa nossa plataforma e personalizar sua experiência. Os cookies podem ser de sessão (excluídos ao fechar o navegador) ou persistentes (mantidos por um período determinado).
                </p>
                <p className="text-navy/70 leading-relaxed mb-3">
                  <strong className="text-navy">Cookies essenciais:</strong> necessários para o funcionamento básico da plataforma, como manter sua sessão autenticada. Não podem ser desativados sem comprometer o uso da plataforma.
                </p>
                <p className="text-navy/70 leading-relaxed mb-3">
                  <strong className="text-navy">Cookies analíticos:</strong> utilizados para entender como os usuários interagem com a plataforma e identificar melhorias. Podem ser desativados sem impacto nas funcionalidades principais.
                </p>
                <p className="text-navy/70 leading-relaxed">
                  Você pode gerenciar ou desativar cookies nas configurações do seu navegador. Note que desativar alguns cookies pode afetar a funcionalidade da plataforma. Para saber mais sobre como gerenciar cookies em cada navegador, consulte a documentação do seu navegador.
                </p>
              </div>

              <div id="sec7">
                <h2 className="text-2xl font-display font-bold text-navy mb-4">7. Seus Direitos (LGPD)</h2>
                <p className="text-navy/70 leading-relaxed mb-3">
                  A LGPD garante a você os seguintes direitos em relação aos seus dados pessoais: <strong className="text-navy">acesso</strong> — obter confirmação de que tratamos seus dados e uma cópia deles; <strong className="text-navy">correção</strong> — solicitar a atualização de dados incompletos, inexatos ou desatualizados; <strong className="text-navy">eliminação</strong> — solicitar a exclusão de dados tratados com base em consentimento.
                </p>
                <p className="text-navy/70 leading-relaxed mb-3">
                  Você também tem direito à <strong className="text-navy">portabilidade</strong> — receber seus dados em formato estruturado e interoperável; <strong className="text-navy">informação</strong> — saber com quem compartilhamos seus dados; <strong className="text-navy">revogação do consentimento</strong> — retirar seu consentimento a qualquer momento, sem que isso afete a legalidade do tratamento realizado anteriormente.
                </p>
                <p className="text-navy/70 leading-relaxed">
                  Para exercer qualquer um desses direitos, entre em contato pelo e-mail privacidade@construcasa.com.br. Atenderemos sua solicitação no prazo de até 15 dias corridos. Em alguns casos, poderemos solicitar verificação de identidade antes de processar sua solicitação. Você também tem o direito de peticionar à Autoridade Nacional de Proteção de Dados (ANPD) em caso de tratamento inadequado.
                </p>
              </div>

              <div id="sec8">
                <h2 className="text-2xl font-display font-bold text-navy mb-4">8. Segurança dos Dados</h2>
                <p className="text-navy/70 leading-relaxed mb-3">
                  Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra acesso não autorizado, perda, destruição, alteração ou divulgação indevida. Nossas principais medidas de segurança incluem criptografia TLS em todas as comunicações, criptografia de dados sensíveis em repouso e controle de acesso baseado em perfil de usuário.
                </p>
                <p className="text-navy/70 leading-relaxed mb-3">
                  Realizamos avaliações periódicas de segurança, incluindo testes de penetração e auditorias de segurança conduzidas por especialistas independentes. Todos os nossos colaboradores com acesso a dados pessoais são treinados em boas práticas de segurança e privacidade e estão sujeitos a obrigações de confidencialidade.
                </p>
                <p className="text-navy/70 leading-relaxed">
                  Em caso de incidente de segurança que possa resultar em risco ou dano relevante aos titulares de dados, nos comprometemos a notificar a ANPD e os titulares afetados no prazo previsto na LGPD, fornecendo informações sobre a natureza do incidente e as medidas tomadas para mitigar seus efeitos.
                </p>
              </div>

              <div id="sec9">
                <h2 className="text-2xl font-display font-bold text-navy mb-4">9. Retenção de Dados</h2>
                <p className="text-navy/70 leading-relaxed mb-3">
                  Mantemos seus dados pessoais pelo tempo necessário para cumprir as finalidades para as quais foram coletados, incluindo o cumprimento de obrigações legais, resolução de disputas e aplicação de nossos acordos. O período de retenção varia conforme o tipo de dado e a finalidade do tratamento.
                </p>
                <p className="text-navy/70 leading-relaxed mb-3">
                  Dados de conta ativa são mantidos enquanto sua conta estiver ativa. Após o encerramento da conta, dados necessários para o cumprimento de obrigações legais (como registros fiscais e de acesso) são mantidos pelos prazos legalmente exigidos — em geral, 5 anos para dados fiscais e 1 ano para registros de acesso, conforme o Marco Civil da Internet.
                </p>
                <p className="text-navy/70 leading-relaxed">
                  Dados tratados exclusivamente com base em consentimento são eliminados quando o consentimento é revogado, salvo se houver outra base legal que justifique a manutenção. Após o cumprimento dos prazos de retenção, os dados são eliminados de forma segura ou anonimizados de maneira irreversível.
                </p>
              </div>

              <div id="sec10">
                <h2 className="text-2xl font-display font-bold text-navy mb-4">10. Menores de Idade</h2>
                <p className="text-navy/70 leading-relaxed mb-3">
                  Os serviços do ConstruCasa são destinados exclusivamente a pessoas com 18 anos ou mais. Não coletamos intencionalmente dados pessoais de menores de 18 anos. Ao criar uma conta, você declara ter atingido a maioridade civil.
                </p>
                <p className="text-navy/70 leading-relaxed mb-3">
                  Caso tenhamos coletado inadvertidamente dados de um menor de 18 anos, pedimos que o responsável legal entre em contato conosco imediatamente pelo e-mail privacidade@construcasa.com.br para que possamos eliminar esses dados de forma segura.
                </p>
                <p className="text-navy/70 leading-relaxed">
                  Implementamos controles razoáveis para verificar a idade dos usuários durante o cadastro, mas não podemos garantir que menores de idade não utilizem informações falsas para acessar a plataforma. Caso identifique uso da plataforma por menores, por favor nos notifique.
                </p>
              </div>

              <div id="sec11">
                <h2 className="text-2xl font-display font-bold text-navy mb-4">11. Alterações desta Política</h2>
                <p className="text-navy/70 leading-relaxed mb-3">
                  Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas de tratamento de dados, novas funcionalidades da plataforma, alterações na legislação aplicável ou por outros motivos operacionais, legais ou regulatórios.
                </p>
                <p className="text-navy/70 leading-relaxed mb-3">
                  Quando realizarmos alterações materiais nesta política, notificaremos você com antecedência mínima de 15 dias, por e-mail cadastrado ou por aviso proeminente na plataforma. A data da "Última atualização" no início deste documento indica quando a política foi revisada pela última vez.
                </p>
                <p className="text-navy/70 leading-relaxed">
                  O uso continuado dos serviços após a vigência das alterações constitui sua aceitação da política revisada. Caso não concorde com as alterações, você pode encerrar sua conta antes que elas entrem em vigor.
                </p>
              </div>

              <div id="sec12">
                <h2 className="text-2xl font-display font-bold text-navy mb-4">12. Como Exercer seus Direitos</h2>
                <p className="text-navy/70 leading-relaxed mb-3">
                  Para exercer qualquer dos seus direitos previstos na LGPD, entre em contato com nosso Encarregado de Proteção de Dados (DPO) pelo e-mail{' '}
                  <a href="mailto:privacidade@construcasa.com.br" className="text-brand hover:underline">
                    privacidade@construcasa.com.br
                  </a>
                  . Identifique-se com nome completo, e-mail cadastrado e descreva sua solicitação de forma clara.
                </p>
                <p className="text-navy/70 leading-relaxed mb-3">
                  Comprometemo-nos a responder no prazo de até 15 dias corridos a partir do recebimento da solicitação. Em casos de solicitações complexas, podemos prorrogar esse prazo por mais 15 dias, mediante comunicação prévia e justificada. Poderemos solicitar documentos para verificar sua identidade antes de processar a solicitação.
                </p>
                <p className="text-navy/70 leading-relaxed">
                  Se não estiver satisfeito com a resposta recebida, você tem o direito de apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD), acessando o portal gov.br/anpd.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
