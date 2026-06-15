import React, { useId } from 'react';
import {
  ArrowUpDown,
  Wrench,
  Zap,
  Droplets,
  Building2,
  Paintbrush,
  TreePine,
  HardHat,
  ShieldCheck,
} from 'lucide-react';
import type { SearchFiltersState } from '@/types';
import { Trade } from '@/types';

interface SearchFiltersProps {
  filters: SearchFiltersState;
  onChange: (newFilters: SearchFiltersState) => void;
  /** Optional: total count of results to display */
  resultCount?: number;
}

const SORT_OPTIONS: { value: SearchFiltersState['sortBy']; label: string }[] = [
  { value: 'recommended', label: 'Recomendados' },
  { value: 'rating',      label: 'Melhor Avaliados' },
  { value: 'priceAsc',    label: 'Menor Preço' },
  { value: 'priceDesc',   label: 'Maior Preço' },
];

const TRADE_OPTIONS = Object.values(Trade).filter((t) => t !== Trade.GERAL);

const TRADE_ICONS: Record<string, React.ReactNode> = {
  [Trade.PEDREIRO]:    <Building2  size={14} />,
  [Trade.ELETRICISTA]: <Zap        size={14} />,
  [Trade.ENCANADOR]:   <Droplets   size={14} />,
  [Trade.PINTOR]:      <Paintbrush size={14} />,
  [Trade.ARQUITETO]:   <HardHat    size={14} />,
  [Trade.MARCENEIRO]:  <TreePine   size={14} />,
};

const DEFAULT_FILTERS: SearchFiltersState = {
  trade:     '',
  minRating: 0,
  maxPrice:  500,
  sortBy:    'recommended',
};

const isFilterActive = (filters: SearchFiltersState): boolean =>
  filters.trade     !== DEFAULT_FILTERS.trade     ||
  filters.minRating !== DEFAULT_FILTERS.minRating ||
  filters.maxPrice  !== DEFAULT_FILTERS.maxPrice  ||
  filters.sortBy    !== DEFAULT_FILTERS.sortBy;

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onChange,
  resultCount,
}) => {
  const uid    = useId();
  const active = isFilterActive(filters);

  const handleChange = <K extends keyof SearchFiltersState>(
    key: K,
    value: SearchFiltersState[K],
  ) => {
    onChange({ ...filters, [key]: value });
  };

  const clearFilters = () => onChange({ ...DEFAULT_FILTERS });

  return (
    <aside className="bg-white rounded-xl border border-border sticky top-20 divide-y divide-border overflow-hidden">

      {/* ── Header ── */}
      <div className="flex items-center justify-between p-4">
        <h3 className="font-display font-semibold text-navy text-sm">Filtrar resultados</h3>
        {active && (
          <button
            onClick={clearFilters}
            className="text-brand text-xs font-semibold hover:underline transition-colors"
            aria-label="Limpar todos os filtros"
          >
            Limpar tudo
          </button>
        )}
      </div>

      {/* ── Especialidade ── */}
      <fieldset className="p-4">
        <legend className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Especialidade
        </legend>
        <div className="grid grid-cols-2 gap-2">
          {/* "Todas" pill */}
          <button
            onClick={() => handleChange('trade', '')}
            className={`text-xs px-3 py-2 rounded-lg border text-left transition-all ${
              filters.trade === ''
                ? 'border-brand bg-brand-subtle text-brand font-semibold'
                : 'border-border text-slate-600 hover:border-slate-300'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Wrench size={14} />
              Todas
            </span>
          </button>

          {TRADE_OPTIONS.map((trade) => (
            <button
              key={trade}
              onClick={() => handleChange('trade', filters.trade === trade ? '' : trade)}
              className={`text-xs px-3 py-2 rounded-lg border text-left transition-all ${
                filters.trade === trade
                  ? 'border-brand bg-brand-subtle text-brand font-semibold'
                  : 'border-border text-slate-600 hover:border-slate-300'
              }`}
            >
              <span className="flex items-center gap-1.5">
                {TRADE_ICONS[trade] ?? <Wrench size={14} />}
                {trade}
              </span>
            </button>
          ))}
        </div>
      </fieldset>

      {/* ── Avaliação mínima ── */}
      <fieldset className="p-4">
        <legend className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Avaliação Mínima
        </legend>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleChange('minRating', filters.minRating === star ? 0 : star)}
              aria-label={`${star} estrelas`}
              aria-pressed={filters.minRating >= star}
              className="cursor-pointer hover:scale-110 transition-transform duration-100"
            >
              <span
                className={
                  star <= filters.minRating
                    ? 'text-amber-400 text-lg leading-none'
                    : 'text-slate-200 text-lg leading-none'
                }
              >
                ★
              </span>
            </button>
          ))}
          {filters.minRating > 0 && (
            <span className="text-xs text-slate-400 ml-1">
              {filters.minRating}+ estrelas
            </span>
          )}
        </div>
      </fieldset>

      {/* ── Ordenar por ── */}
      <div className="p-4">
        <label
          htmlFor={`${uid}-sort`}
          className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3"
        >
          Ordenar Por
        </label>
        <div className="relative">
          <select
            id={`${uid}-sort`}
            value={filters.sortBy}
            onChange={(e) =>
              handleChange('sortBy', e.target.value as SearchFiltersState['sortBy'])
            }
            className="w-full text-sm border border-border rounded-lg px-3 py-2 text-navy bg-white focus:border-brand focus:outline-none appearance-none cursor-pointer transition-colors"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ArrowUpDown
            size={13}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
        </div>
      </div>

      {/* ── Preço máximo ── */}
      <div className="p-4">
        <label
          htmlFor={`${uid}-price`}
          className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3"
        >
          Preço Máximo / Hora
        </label>
        <input
          id={`${uid}-price`}
          type="range"
          min={50}
          max={500}
          step={10}
          value={filters.maxPrice}
          onChange={(e) => handleChange('maxPrice', Number(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-brand bg-cream-muted"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-2">
          <span>R$ 50</span>
          <span className="font-bold text-navy">
            {filters.maxPrice >= 500 ? 'Sem limite' : `Até R$ ${filters.maxPrice}/h`}
          </span>
          <span>R$ 500</span>
        </div>
      </div>

      {/* ── Result count ── */}
      {resultCount !== undefined && (
        <div className="px-4 py-3 bg-cream">
          <p className="text-xs text-slate-500 text-center">
            <span className="font-semibold text-navy">{resultCount}</span>{' '}
            {resultCount === 1 ? 'profissional encontrado' : 'profissionais encontrados'}
          </p>
        </div>
      )}

      {/* ── Nota de garantia (padrão Angi Happiness Guarantee) ── */}
      <div className="p-4 bg-cream rounded-b-xl">
        <div className="flex items-start gap-2">
          <ShieldCheck size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-slate-500 leading-relaxed">
            <strong className="text-navy">Satisfação garantida.</strong> Não ficou satisfeito? Ajudamos você a resolver.
          </p>
        </div>
      </div>

    </aside>
  );
};
