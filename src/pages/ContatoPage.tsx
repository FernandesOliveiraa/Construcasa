import { useState, type ChangeEvent, type FormEvent } from 'react';
import { MapPin, Clock, Mail, Phone, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type AssuntoOption = 'suporte' | 'parceria' | 'imprensa' | 'feedback' | 'outros';

interface FormState {
  nome: string;
  email: string;
  assunto: AssuntoOption;
  mensagem: string;
}

const contactInfo = [
  {
    icon: MapPin,
    label: 'Endereço',
    value: 'Av. Brigadeiro Faria Lima, 3.477, São Paulo, SP',
  },
  {
    icon: Clock,
    label: 'Horário',
    value: 'Seg–Sex das 9h às 18h',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'suporte@construcasa.com.br',
    href: 'mailto:suporte@construcasa.com.br',
  },
  {
    icon: Phone,
    label: 'Telefone',
    value: '+55 (11) 3000-4567',
    href: 'tel:+551130004567',
  },
];

export default function ContatoPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    nome: '',
    email: '',
    assunto: 'suporte',
    mensagem: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="section-navy" style={{ paddingTop: '103px', paddingBottom: '80px' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Fale com a Gente</h1>
            <p className="text-white/70 text-lg">Nossa equipe responde em até 24 horas úteis.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {['Suporte', 'Parcerias', 'Imprensa'].map((item) => (
              <div key={item} className="card bg-white/10 border-white/20 px-6 py-3 text-center">
                <span className="text-white font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conteúdo principal */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            {/* Formulário */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm border border-border p-8">
                {submitted ? (
                  <div className="flex flex-col items-center gap-4 py-10 text-center">
                    <CheckCircle className="w-14 h-14 text-brand" />
                    <h2 className="text-2xl font-display font-bold text-navy">Mensagem enviada!</h2>
                    <p className="text-navy/70 max-w-sm">
                      Recebemos sua mensagem e nossa equipe entrará em contato em até 24 horas úteis.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({ nome: '', email: '', assunto: 'suporte', mensagem: '' });
                      }}
                      className="btn-ghost mt-2"
                    >
                      Enviar outra mensagem
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <h2 className="text-2xl font-display font-bold text-navy mb-2">Envie sua mensagem</h2>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="nome" className="text-sm font-medium text-navy">
                        Nome completo
                      </label>
                      <input
                        id="nome"
                        name="nome"
                        type="text"
                        required
                        placeholder="Seu nome"
                        value={form.nome}
                        onChange={handleChange}
                        className="input-base"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-sm font-medium text-navy">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="seu@email.com"
                        value={form.email}
                        onChange={handleChange}
                        className="input-base"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="assunto" className="text-sm font-medium text-navy">
                        Assunto
                      </label>
                      <select
                        id="assunto"
                        name="assunto"
                        value={form.assunto}
                        onChange={handleChange}
                        className="input-base"
                      >
                        <option value="suporte">Suporte ao Cliente</option>
                        <option value="parceria">Parceria Comercial</option>
                        <option value="imprensa">Imprensa</option>
                        <option value="feedback">Feedback</option>
                        <option value="outros">Outros</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="mensagem" className="text-sm font-medium text-navy">
                        Mensagem
                      </label>
                      <textarea
                        id="mensagem"
                        name="mensagem"
                        required
                        rows={5}
                        placeholder="Descreva como podemos ajudar..."
                        value={form.mensagem}
                        onChange={handleChange}
                        className="input-base resize-none"
                      />
                    </div>

                    <button type="submit" className="btn-primary self-start">
                      Enviar mensagem
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Info de contato */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-border p-8 flex flex-col gap-6">
                <h2 className="text-xl font-display font-bold text-navy">Informações de Contato</h2>
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                      <info.icon className="w-5 h-5 text-brand" />
                    </div>
                    <div>
                      <p className="text-navy/50 text-xs font-medium uppercase tracking-wider mb-0.5">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} className="text-navy hover:text-brand transition-colors text-sm">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-navy text-sm">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-border p-8 flex flex-col gap-4">
                <h3 className="font-display font-semibold text-navy">Links úteis</h3>
                <button
                  onClick={() => navigate('/faq')}
                  className="text-brand hover:underline text-sm text-left"
                >
                  Confira nossas perguntas frequentes →
                </button>
                <button
                  onClick={() => navigate('/imprensa')}
                  className="text-brand hover:underline text-sm text-left"
                >
                  Assessoria de Imprensa →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
