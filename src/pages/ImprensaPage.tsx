import { Download, Mail, Phone, MapPin } from 'lucide-react';

const coverageItems = [
  {
    id: crypto.randomUUID(),
    outlet: 'Folha de S.Paulo',
    headline: 'ConstruCasa levanta R$ 15M para expandir marketplace de reformas',
    date: 'Março 2025',
    url: '#',
  },
  {
    id: crypto.randomUUID(),
    outlet: 'Exame',
    headline: 'Startup brasileira quer ser o Airbnb dos profissionais de construção',
    date: 'Janeiro 2025',
    url: '#',
  },
  {
    id: crypto.randomUUID(),
    outlet: 'Veja',
    headline: 'Como o ConstruCasa está mudando o setor de reformas no Brasil',
    date: 'Novembro 2024',
    url: '#',
  },
];

const pressReleases = [
  {
    id: crypto.randomUUID(),
    title: 'ConstruCasa atinge marca de 12.000 profissionais cadastrados',
    date: '15 Abr 2025',
    category: 'Crescimento',
  },
  {
    id: crypto.randomUUID(),
    title: 'Parceria com CREA-SP garante verificação técnica de engenheiros',
    date: '02 Mar 2025',
    category: 'Parceria',
  },
  {
    id: crypto.randomUUID(),
    title: 'Lançamento do sistema de avaliação com IA',
    date: '20 Jan 2025',
    category: 'Produto',
  },
  {
    id: crypto.randomUUID(),
    title: 'ConstruCasa expande para o Nordeste',
    date: '05 Dez 2024',
    category: 'Expansão',
  },
  {
    id: crypto.randomUUID(),
    title: 'Série A de R$ 15 milhões liderada por fundo nacional',
    date: '10 Out 2024',
    category: 'Investimento',
  },
];

const kitItems = [
  { id: crypto.randomUUID(), label: 'Logos e Identidade Visual' },
  { id: crypto.randomUUID(), label: 'Fotos dos Fundadores' },
  { id: crypto.randomUUID(), label: 'Ficha Técnica da Empresa' },
];

export default function ImprensaPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="section-navy" style={{ paddingTop: '103px', paddingBottom: '80px' }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="badge-brand mb-6 inline-block">Sala de Imprensa</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
            ConstruCasa na Mídia
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Materiais, comunicados e informações para jornalistas e profissionais de comunicação. Tudo o que você precisa para cobrir nossa história.
          </p>
        </div>
      </section>

      {/* Na Imprensa */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-navy mb-12">Cobertura da Mídia</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {coverageItems.map((item) => (
              <div key={item.id} className="card p-8 flex flex-col gap-4">
                <p className="text-navy/50 font-bold text-sm uppercase tracking-wider">{item.outlet}</p>
                <h3 className="text-navy font-display font-semibold text-lg leading-snug">{item.headline}</h3>
                <p className="text-navy/50 text-sm">{item.date}</p>
                <a
                  href={item.url}
                  className="text-brand font-medium text-sm hover:underline mt-auto"
                >
                  Ler reportagem →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-navy mb-12">Comunicados Oficiais</h2>
          <div className="flex flex-col gap-4">
            {pressReleases.map((pr) => (
              <div key={pr.id} className="card p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className="badge-brand self-start">{pr.category}</span>
                  <p className="text-navy font-medium">{pr.title}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-navy/50 text-sm">{pr.date}</span>
                  <a href="#" className="btn-ghost text-sm">
                    Ver PDF →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kit de Imprensa */}
      <section className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">Kit de Imprensa</h2>
          <p className="text-white/70 mb-10 max-w-xl mx-auto">
            Baixe nossos materiais oficiais para uso editorial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {kitItems.map((item) => (
              <button key={item.id} className="btn-secondary flex items-center gap-2">
                <Download className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contato de Imprensa */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mx-auto card p-10 flex flex-col gap-6">
            <h2 className="text-2xl font-display font-bold text-navy">Contato de Imprensa</h2>
            <p className="text-navy/70">Para entrevistas, dados e materiais exclusivos, entre em contato diretamente com nossa assessoria.</p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <p className="text-navy font-semibold">Ana Luiza Ferreira</p>
                  <p className="text-navy/60 text-sm">Assessoria de Imprensa</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-brand" />
                </div>
                <a href="mailto:imprensa@construcasa.com.br" className="text-navy hover:text-brand transition-colors">
                  imprensa@construcasa.com.br
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-brand" />
                </div>
                <a href="tel:+551130004567" className="text-navy hover:text-brand transition-colors">
                  +55 (11) 3000-4567
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
