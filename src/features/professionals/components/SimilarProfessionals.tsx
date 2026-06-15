import { useMemo } from 'react';
import { ShieldCheck, MapPin, Star } from 'lucide-react';
import type { Professional } from '@/types';
import { MOCK_PROFESSIONALS } from '@/constants/professionals';

interface SimilarProfessionalsProps {
  currentPro: Professional;
  allPros: Professional[];
  onSelectPro: (pro: Professional) => void;
}

export function SimilarProfessionals({ currentPro, allPros, onSelectPro }: SimilarProfessionalsProps) {
  const source = allPros.length > 0 ? allPros : MOCK_PROFESSIONALS;

  const similarPros = useMemo(() => {
    return source
      .filter(
        (p) =>
          p.id !== currentPro.id &&
          p.trade.some((t) => currentPro.trade.includes(t))
      )
      .slice(0, 3);
  }, [source, currentPro]);

  if (similarPros.length === 0) return null;

  return (
    <section className="bg-white border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display font-bold text-2xl text-navy mb-6">
          Profissionais similares
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarPros.map((pro) => (
            <button
              key={pro.id}
              onClick={() => onSelectPro(pro)}
              className="text-left bg-white rounded-xl border border-border overflow-hidden hover:border-brand/40 hover:shadow-lg transition-all duration-200 group"
            >
              <div className="flex items-center gap-4 p-4">
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-brand to-brand-dark">
                  {pro.avatar ? (
                    <img
                      src={pro.avatar}
                      alt={pro.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white font-display font-bold text-xl">
                        {pro.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-semibold text-navy text-sm truncate">
                      {pro.name}
                    </span>
                    {pro.verified && (
                      <ShieldCheck size={12} className="text-emerald-500 flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <MapPin size={10} className="text-brand" />
                    <span className="truncate">{pro.location}</span>
                  </div>
                  {pro.reviews.length > 0 && (
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={10} className="text-amber-400 fill-amber-400" />
                      <span className="text-xs font-semibold text-slate-600">
                        {(
                          pro.reviews.reduce((s, r) => s + r.rating, 0) /
                          pro.reviews.length
                        ).toFixed(1)}
                      </span>
                      <span className="text-xs text-slate-400">
                        ({pro.reviews.length})
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="font-display font-bold text-brand text-sm">
                    {pro.hourlyRate}
                  </div>
                  <div className="text-[10px] text-slate-400">/hora</div>
                </div>
              </div>

              <div className="px-4 pb-4 flex flex-wrap gap-1.5">
                {pro.trade.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="text-[11px] bg-cream border border-border text-slate-600 px-2 py-0.5 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
