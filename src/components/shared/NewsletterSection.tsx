import React, { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <div className="bg-amber-50 py-16 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display font-bold text-3xl text-navy mb-3">
          Conhecimento não tem preço —<br />
          <span className="text-brand">nossos guias são gratuitos.</span>
        </h2>
        <p className="text-slate-500 mb-8">
          Receba estimativas de custo e dicas de especialistas direto no seu email.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu email"
            required
            className="flex-1 px-4 py-3 rounded-lg border border-border bg-white text-navy placeholder-slate-400 text-sm focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
          <button
            type="submit"
            className="btn-primary rounded-lg px-6 py-3 text-sm whitespace-nowrap"
          >
            Quero receber
          </button>
        </form>

        <p className="text-xs text-slate-400 mt-4">Sem spam. Cancele quando quiser.</p>
      </div>
    </div>
  );
}
