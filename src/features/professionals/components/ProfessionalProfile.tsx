import React, { useState } from 'react';
import {
  ArrowLeft, Star, ShieldCheck, MapPin, Briefcase, Clock,
  MessageSquare, FileText, Award, ZoomIn, X, ChevronLeft,
  ChevronRight
} from 'lucide-react';
import type { Professional, User } from '@/types';

interface ProfessionalProfileProps {
  pro: Professional;
  onBack: () => void;
  currentUser: User | null;
  onRequireAuth: () => void;
  onRequestQuote: () => void;
  onStartChat: () => void;
}

export const ProfessionalProfile: React.FC<ProfessionalProfileProps> = ({
  pro,
  onBack,
  currentUser,
  onRequireAuth,
  onRequestQuote,
  onStartChat
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const avgRating = pro.reviews.length > 0
    ? pro.reviews.reduce((sum, r) => sum + r.rating, 0) / pro.reviews.length
    : 0;

  const availabilityColor =
    pro.availability === 'Disponível' ? 'bg-emerald-500' :
    pro.availability === 'Agenda Cheia' ? 'bg-amber-400' : 'bg-red-400';

  const availabilityLabel =
    pro.availability === 'Disponível' ? 'Disponível para novos projetos' :
    pro.availability === 'Agenda Cheia' ? 'Com projetos em andamento' : 'Consulte disponibilidade';

  return (
    <div className="bg-cream min-h-screen">

      {/* ── BANNER HERO ── */}
      <div className="relative bg-navy" style={{ minHeight: 220, paddingTop: '103px' }}>
        {/* Decorative background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, #E85D26 0%, transparent 50%), radial-gradient(circle at 80% 20%, #E85D26 0%, transparent 40%)'
          }}
        />

        {/* Back button */}
        <div className="relative max-w-7xl mx-auto px-6 pt-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Voltar
          </button>
        </div>

        {/* Avatar + basic info — overlaps banner bottom */}
        <div className="relative max-w-7xl mx-auto px-6 pb-0 pt-6 flex items-end gap-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-28 h-28 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-brand to-brand-dark">
              {pro.avatar ? (
                <img src={pro.avatar} alt={pro.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white font-display font-bold text-3xl">
                    {pro.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            {pro.availability === 'Disponível' && (
              <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                Disponível
              </span>
            )}
          </div>

          {/* Name / rating / trades */}
          <div className="pb-4 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-display font-bold text-2xl text-white">{pro.name}</h1>
              {pro.verified && (
                <span className="flex items-center gap-1 bg-emerald-500/20 text-emerald-300 text-xs px-2 py-0.5 rounded-full">
                  <ShieldCheck size={11} />
                  Verificado
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="text-white/60 text-sm">{pro.location}</span>
              {pro.reviews.length > 0 && (
                <div className="flex items-center gap-1">
                  <Star size={13} className="text-amber-400 fill-amber-400" />
                  <span className="text-white font-semibold text-sm">{avgRating.toFixed(1)}</span>
                  <span className="text-white/50 text-xs">({pro.reviews.length} avaliações)</span>
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-2 flex-wrap">
              {pro.trade.slice(0, 3).map(t => (
                <span key={t} className="bg-white/10 text-white/80 text-xs px-2.5 py-1 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Sobre */}
            <div className="bg-white rounded-xl border border-border p-6">
              <h2 className="font-display font-bold text-lg text-navy mb-4">Sobre</h2>
              <p className="text-slate-600 leading-relaxed">{pro.bio}</p>

              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
                <div className="text-center">
                  <div className="font-display font-bold text-2xl text-brand">{pro.yearsExperience}</div>
                  <div className="text-xs text-slate-400 mt-1">anos de experiência</div>
                </div>
                <div className="text-center border-x border-border">
                  <div className="font-display font-bold text-2xl text-brand">{pro.reviews.length}</div>
                  <div className="text-xs text-slate-400 mt-1">avaliações</div>
                </div>
                <div className="text-center">
                  <div className="font-display font-bold text-2xl text-brand">
                    {pro.reviews.length > 0 ? avgRating.toFixed(1) : '—'}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">nota média</div>
                </div>
              </div>
            </div>

            {/* Portfólio */}
            {pro.portfolio && pro.portfolio.length > 0 && (
              <div className="bg-white rounded-xl border border-border p-6">
                <h2 className="font-display font-bold text-lg text-navy mb-4">
                  Portfólio
                  <span className="text-sm font-normal text-slate-400 ml-2">
                    ({pro.portfolio.length} fotos)
                  </span>
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {pro.portfolio.map((photo, idx) => (
                    <button
                      key={idx}
                      onClick={() => setLightboxIndex(idx)}
                      className="aspect-square rounded-xl overflow-hidden bg-cream group relative"
                    >
                      <img
                        src={photo}
                        alt={`Trabalho ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <ZoomIn size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Avaliações */}
            <div className="bg-white rounded-xl border border-border p-6">
              <h2 className="font-display font-bold text-lg text-navy mb-6">Avaliações</h2>

              {pro.reviews.length === 0 ? (
                <div className="text-center py-8">
                  <Star size={32} className="text-slate-200 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm">Nenhuma avaliação ainda.</p>
                </div>
              ) : (
                <>
                  {/* Rating summary */}
                  <div className="flex items-center gap-6 pb-6 mb-6 border-b border-border">
                    <div className="text-center">
                      <div className="font-display font-bold text-5xl text-navy">{avgRating.toFixed(1)}</div>
                      <div className="flex justify-center mt-1 gap-0.5">
                        {[1, 2, 3, 4, 5].map(s => (
                          <Star
                            key={s}
                            size={14}
                            className={s <= Math.round(avgRating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}
                          />
                        ))}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">{pro.reviews.length} avaliações</div>
                    </div>

                    {/* Distribution bars */}
                    <div className="flex-1 space-y-1.5">
                      {[5, 4, 3, 2, 1].map(star => {
                        const count = pro.reviews.filter(r => r.rating === star).length;
                        const pct = pro.reviews.length > 0 ? (count / pro.reviews.length) * 100 : 0;
                        return (
                          <div key={star} className="flex items-center gap-2 text-xs text-slate-500">
                            <span className="w-2 text-right">{star}</span>
                            <Star size={10} className="text-amber-400 fill-amber-400 flex-shrink-0" />
                            <div className="flex-1 h-2 bg-cream rounded-full overflow-hidden">
                              <div
                                className="h-full bg-amber-400 rounded-full transition-all duration-500"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="w-4 text-right">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Review list */}
                  <div className="space-y-5">
                    {pro.reviews.map(review => (
                      <div key={review.id} className="pb-5 border-b border-border last:border-0 last:pb-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                              <span className="text-amber-700 font-semibold text-xs">
                                {review.author.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="font-semibold text-navy text-sm">{review.author}</div>
                              <div className="text-xs text-slate-400">{review.date}</div>
                            </div>
                          </div>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map(s => (
                              <Star
                                key={s}
                                size={12}
                                className={s <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Certificações */}
            {pro.certifications && pro.certifications.length > 0 && (
              <div className="bg-white rounded-xl border border-border p-6">
                <h2 className="font-display font-bold text-lg text-navy mb-4">
                  Certificações e formações
                </h2>
                <div className="space-y-3">
                  {pro.certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
                        <Award size={15} className="text-brand" />
                      </div>
                      <span className="text-slate-700 text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">

              {/* Price + CTAs card */}
              <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
                <div className="mb-5">
                  <span className="text-xs text-slate-400">a partir de</span>
                  <div className="font-display font-bold text-4xl text-brand leading-none mt-1">
                    R$ {pro.hourlyRate}
                  </div>
                  <span className="text-sm text-slate-400">por hora</span>
                </div>

                {/* Availability */}
                <div className="flex items-center gap-2 mb-5 pb-5 border-b border-border">
                  <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${availabilityColor}`} />
                  <span className="text-sm text-slate-600">{availabilityLabel}</span>
                </div>

                {/* CTA buttons */}
                <div className="space-y-3">
                  <button
                    onClick={currentUser ? onRequestQuote : onRequireAuth}
                    className="w-full btn-primary rounded-xl py-3.5 text-base font-semibold flex items-center justify-center gap-2"
                  >
                    <FileText size={18} />
                    Solicitar Orçamento
                  </button>
                  <button
                    onClick={currentUser ? onStartChat : onRequireAuth}
                    className="w-full btn-secondary rounded-xl py-3.5 text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={16} />
                    Enviar Mensagem
                  </button>
                </div>

                <p className="text-center text-xs text-slate-400 mt-4">
                  Solicitar orçamento é gratuito e sem compromisso
                </p>
              </div>

              {/* Info card */}
              <div className="bg-white rounded-xl border border-border p-5">
                <h3 className="font-display font-semibold text-navy text-sm mb-4">Informações</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin size={15} className="text-brand flex-shrink-0" />
                    <span className="text-slate-600">{pro.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Briefcase size={15} className="text-brand flex-shrink-0" />
                    <span className="text-slate-600">{pro.yearsExperience} anos de experiência</span>
                  </div>
                  {pro.verified && (
                    <div className="flex items-center gap-3 text-sm">
                      <ShieldCheck size={15} className="text-emerald-500 flex-shrink-0" />
                      <span className="text-slate-600">Perfil verificado pelo ConstruCasa</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-sm">
                    <Clock size={15} className="text-brand flex-shrink-0" />
                    <span className="text-slate-600">Responde em até 2 horas</span>
                  </div>
                </div>
              </div>

              {/* Guarantee card */}
              <div className="bg-cream rounded-xl border border-border p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-navy text-xs mb-0.5">Satisfação garantida</div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Não ficou satisfeito? Nossa equipe resolve. Contrate com tranquilidade.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── MOBILE CTA BAR ── */}
      <div
        className="fixed bottom-0 inset-x-0 bg-white border-t border-border px-4 py-3 flex gap-3 lg:hidden z-40"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <button
          onClick={currentUser ? onStartChat : onRequireAuth}
          className="flex-1 btn-secondary rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2"
        >
          <MessageSquare size={15} />
          Mensagem
        </button>
        <button
          onClick={currentUser ? onRequestQuote : onRequireAuth}
          className="flex-1 btn-primary rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2"
        >
          <FileText size={15} />
          Solicitar Orçamento
        </button>
      </div>

      {/* Spacer for mobile CTA bar */}
      <div className="h-20 lg:hidden" />

      {/* ── LIGHTBOX ── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white"
            onClick={() => setLightboxIndex(null)}
          >
            <X size={24} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
            onClick={e => {
              e.stopPropagation();
              setLightboxIndex(i => (i !== null && i > 0 ? i - 1 : i));
            }}
          >
            <ChevronLeft size={32} />
          </button>
          <img
            src={pro.portfolio[lightboxIndex]}
            alt="Portfólio"
            className="max-h-[80vh] max-w-full rounded-xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
            onClick={e => {
              e.stopPropagation();
              setLightboxIndex(i => (i !== null && i < pro.portfolio.length - 1 ? i + 1 : i));
            }}
          >
            <ChevronRight size={32} />
          </button>
          <div className="absolute bottom-4 text-white/50 text-sm">
            {lightboxIndex + 1} / {pro.portfolio.length}
          </div>
        </div>
      )}

    </div>
  );
};
