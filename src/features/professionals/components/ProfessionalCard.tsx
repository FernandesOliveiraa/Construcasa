import React, { useState } from 'react';
import { Heart, MapPin, ShieldCheck, Star } from 'lucide-react';
import type { Professional } from '@/types';

interface ProfessionalCardProps {
  pro: Professional;
  onClick: (pro: Professional) => void;
  onRequestQuote?: (pro: Professional) => void;
}

const availabilityConfig: Record<
  Professional['availability'],
  { dot: string; label: string }
> = {
  'Disponível':   { dot: 'bg-emerald-500', label: 'Disponível' },
  'Agenda Cheia': { dot: 'bg-rose-400',    label: 'Ocupado' },
  'Consulte':     { dot: 'bg-amber-400',   label: 'A confirmar' },
};

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  pro,
  onClick,
  onRequestQuote: _onRequestQuote,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const reviewCount = pro.reviews.length;
  const avgRating =
    reviewCount > 0
      ? pro.reviews.reduce((acc, r) => acc + r.rating, 0) / reviewCount
      : null;
  const ratingDisplay = avgRating !== null ? avgRating.toFixed(1) : null;

  const avail = availabilityConfig[pro.availability];

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited((prev) => !prev);
  };

  const handleViewProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(pro);
  };

  return (
    <div
      onClick={() => onClick(pro)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(pro)}
      className="group bg-white rounded-xl border border-border overflow-hidden hover:border-brand/40 hover:shadow-lg transition-all duration-200 cursor-pointer"
    >
      {/* ── Photo area (portrait) ── */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={pro.avatar}
          alt={pro.name}
          loading="lazy"
          className="object-cover object-top w-full h-full group-hover:scale-[1.03] transition-transform duration-500"
        />

        {/* Bottom overlay gradient */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(27,43,75,0.6), transparent)' }}
        />

        {/* Bottom-left: availability badge */}
        <span className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/95 rounded-full px-2.5 py-1 text-[11px] font-medium text-slate-700 shadow-sm">
          <span className={`w-1.5 h-1.5 rounded-full ${avail.dot} shrink-0`} />
          {avail.label}
        </span>

        {/* Top-right: favorite button */}
        <button
          onClick={handleFavorite}
          aria-label={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 shadow-sm hover:bg-white transition-colors"
        >
          <Heart
            size={15}
            className={isFavorited ? 'fill-brand text-brand' : 'text-slate-600'}
          />
        </button>
      </div>

      {/* ── Card body ── */}
      <div className="p-4">

        {/* 1. Preço em destaque (primeiro elemento — padrão Angi) */}
        <div className="mb-3">
          <span className="text-xs text-slate-400">a partir de </span>
          <span className="font-display font-bold text-lg text-brand">{pro.hourlyRate}</span>
          <span className="text-xs text-slate-400">/h</span>
        </div>

        {/* 2. Nome + verificado */}
        <div className="flex items-center gap-1.5 mb-1">
          <h3 className="font-display font-semibold text-navy text-sm leading-tight truncate">
            {pro.name}
          </h3>
          {pro.verified && (
            <ShieldCheck
              size={13}
              className="text-emerald-500 flex-shrink-0"
              aria-label="Profissional verificado"
            />
          )}
        </div>

        {/* 3. Rating + localização numa linha */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
          <div className="flex items-center gap-1">
            {ratingDisplay !== null ? (
              <>
                <Star size={11} className="text-amber-400 fill-amber-400" />
                <span className="font-semibold text-slate-600">{ratingDisplay}</span>
                <span>({reviewCount} av.)</span>
              </>
            ) : (
              <span className="italic">Novo profissional</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={10} className="text-brand" />
            <span>{pro.location}</span>
          </div>
        </div>

        {/* 4. Specialty badges (warm neutral) */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {pro.trade.slice(0, 2).map((trade) => (
            <span
              key={trade}
              className="text-[11px] bg-cream text-slate-600 px-2 py-0.5 rounded border border-border"
            >
              {trade}
            </span>
          ))}
        </div>

        {/* 5. CTA único */}
        <button
          onClick={handleViewProfile}
          className="w-full btn-primary rounded-lg py-2.5 text-sm font-semibold"
        >
          Ver perfil e orçar
        </button>
      </div>
    </div>
  );
};

/* ── Skeleton loader ── */
export const ProfessionalCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl overflow-hidden border border-border animate-pulse">
    <div className="aspect-[3/4] bg-cream-muted" />
    <div className="p-4 space-y-3">
      <div className="h-5 bg-cream-muted rounded w-24" />
      <div className="h-4 bg-cream-muted rounded w-32" />
      <div className="flex items-center justify-between">
        <div className="h-3 bg-cream-muted rounded w-20" />
        <div className="h-3 bg-cream-muted rounded w-24" />
      </div>
      <div className="flex gap-1.5">
        <div className="h-5 bg-cream-muted rounded w-16" />
        <div className="h-5 bg-cream-muted rounded w-20" />
      </div>
      <div className="h-9 bg-cream-muted rounded-lg w-full" />
    </div>
  </div>
);
