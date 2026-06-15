import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  X,
  Plus,
  MapPin,
  Camera,
  User as UserIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Zap,
  Droplets,
  PaintBucket,
  HardHat,
  Trees,
  Layers,
  FileText,
  Star,
} from 'lucide-react';
import { Trade, Professional, User } from '@/types';

interface JoinFormProps {
  onClose: () => void;
  onSubmit: (pro: Professional) => void;
  initialData?: Professional;
  currentUser: User | null;
}

const FALLBACK_CITIES = [
  "São Paulo - SP", "Rio de Janeiro - RJ", "Belo Horizonte - MG", "Brasília - DF",
  "Salvador - BA", "Fortaleza - CE", "Curitiba - PR", "Manaus - AM", "Recife - PE",
  "Porto Alegre - RS", "Goiânia - GO", "Belém - PA", "Guarulhos - SP", "Campinas - SP",
  "São Luís - MA", "São Gonçalo - RJ", "Maceió - AL", "Duque de Caxias - RJ",
  "Natal - RN", "Teresina - PI", "Campo Grande - MS", "São Bernardo do Campo - SP",
  "João Pessoa - PB", "Osasco - SP", "Santo André - SP", "Uberlândia - MG",
];

const TRADE_META: Record<Trade, { icon: React.ElementType; description: string }> = {
  [Trade.PEDREIRO]: { icon: HardHat, description: 'Alvenaria e fundações' },
  [Trade.ELETRICISTA]: { icon: Zap, description: 'Instalações elétricas' },
  [Trade.ENCANADOR]: { icon: Droplets, description: 'Hidráulica e encanamentos' },
  [Trade.PINTOR]: { icon: PaintBucket, description: 'Pintura e acabamento' },
  [Trade.ARQUITETO]: { icon: Layers, description: 'Projetos e design' },
  [Trade.MARCENEIRO]: { icon: Trees, description: 'Móveis e madeira' },
  [Trade.GERAL]: { icon: HardHat, description: 'Serviços gerais' },
};

const EXPERIENCE_OPTIONS = [
  { label: '1-2 anos', value: 1 },
  { label: '3-5 anos', value: 3 },
  { label: '6-10 anos', value: 6 },
  { label: '10+ anos', value: 10 },
];

const STEP_LABELS = ['Perfil Básico', 'Especialidades', 'Portfólio', 'Revisão'];

const MAX_PORTFOLIO_IMAGES = 6;

const inputClass =
  'w-full px-4 py-3 bg-cream border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition text-navy placeholder:text-slate-400';

const labelClass =
  'block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5';

export const JoinForm: React.FC<JoinFormProps> = ({ onClose, onSubmit, initialData, currentUser }) => {
  const [step, setStep] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const isEditing = !!initialData;

  const [formData, setFormData] = useState({
    name: initialData?.name ?? '',
    phone: '',
    location: initialData?.location ?? '',
    bio: initialData?.bio ?? '',
    trades: (initialData?.trade ?? []) as Trade[],
    yearsExperience: initialData?.yearsExperience ?? 0,
    hourlyRateValue: initialData?.hourlyRateValue ?? 0,
    avatar: initialData?.avatar ?? 'https://picsum.photos/seed/newuser/200/200',
    portfolio: (initialData?.portfolio ?? []) as string[],
    certificationInput: '',
    certifications: (initialData?.certifications ?? []) as string[],
  });

  // City autocomplete state
  const [allCities, setAllCities] = useState<string[]>([]);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const portfolioInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchCities = async () => {
      setIsLoadingCities(true);
      try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios');
        if (!response.ok) throw new Error('Falha na API');
        const data = await response.json();
        const formattedCities = data.map(
          (city: { nome: string; microrregiao?: { mesorregiao?: { UF?: { sigla?: string } } } }) =>
            `${city.nome} - ${city?.microrregiao?.mesorregiao?.UF?.sigla ?? 'BR'}`,
        );
        setAllCities(formattedCities);
      } catch {
        setAllCities(FALLBACK_CITIES);
      } finally {
        setIsLoadingCities(false);
      }
    };

    fetchCities();

    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocationChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData(prev => ({ ...prev, location: value }));
      if (value.length > 1) {
        const filtered = allCities
          .filter(city => city.toLowerCase().includes(value.toLowerCase()))
          .slice(0, 8);
        setFilteredCities(filtered);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    },
    [allCities],
  );

  const handleSelectCity = useCallback((city: string) => {
    setFormData(prev => ({ ...prev, location: city }));
    setShowSuggestions(false);
  }, []);

  const handleToggleTrade = useCallback((trade: Trade) => {
    setFormData(prev => {
      const exists = prev.trades.includes(trade);
      return {
        ...prev,
        trades: exists ? prev.trades.filter(t => t !== trade) : [...prev.trades, trade],
      };
    });
  }, []);

  const handlePortfolioUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileList: File[] = Array.from(e.target.files) as File[];
      const newImages = fileList.map(file => URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        portfolio: [...prev.portfolio, ...newImages].slice(0, MAX_PORTFOLIO_IMAGES),
      }));
    }
  }, []);

  const handleAddCert = useCallback(() => {
    if (formData.certificationInput.trim()) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, prev.certificationInput.trim()],
        certificationInput: '',
      }));
    }
  }, [formData.certificationInput]);

  const handleRemoveCert = useCallback((idx: number) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== idx),
    }));
  }, []);

  const handleRemovePortfolioImage = useCallback((idx: number) => {
    setFormData(prev => ({
      ...prev,
      portfolio: prev.portfolio.filter((_, i) => i !== idx),
    }));
  }, []);

  const handleAvatarChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, avatar: imageUrl }));
    }
  }, []);

  const handleExperienceSelect = useCallback((value: number) => {
    setFormData(prev => ({ ...prev, yearsExperience: value }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (formData.trades.length === 0) {
        alert('Por favor, selecione pelo menos uma especialidade.');
        return;
      }
      const newPro: Professional = {
        id: initialData?.id ?? (currentUser?.id ?? crypto.randomUUID()),
        name: formData.name,
        trade: formData.trades,
        location: formData.location,
        bio: formData.bio,
        yearsExperience: formData.yearsExperience,
        hourlyRate: `R$ ${formData.hourlyRateValue}`,
        hourlyRateValue: formData.hourlyRateValue,
        verified: initialData?.verified ?? false,
        availability: initialData?.availability ?? 'Disponível',
        avatar: formData.avatar,
        portfolio: formData.portfolio.length > 0 ? formData.portfolio : ['https://picsum.photos/seed/w1/400/300'],
        certifications: formData.certifications,
        reviews: initialData?.reviews ?? [],
      };
      onSubmit(newPro);
    },
    [formData, initialData, currentUser, onSubmit],
  );

  const canProceed = useMemo(() => {
    if (step === 1) return formData.name.trim() !== '' && formData.location.trim() !== '';
    if (step === 2) return formData.trades.length > 0;
    return true;
  }, [step, formData.name, formData.location, formData.trades.length]);

  const progressPercent = useMemo(
    () => ((step - 1) / (STEP_LABELS.length - 1)) * 100,
    [step],
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-cream w-full max-w-2xl rounded-3xl shadow-xl relative flex flex-col my-8 overflow-hidden">

        {/* ── Header ── */}
        <div className="bg-white px-6 py-5 border-b border-border flex items-start justify-between">
          <div>
            <h2 className="font-display font-bold text-xl text-navy">
              {isEditing ? 'Editar Perfil' : 'Criar Perfil Profissional'}
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Passo {step} de {STEP_LABELS.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-cream transition-colors text-slate-400 hover:text-slate-600"
          >
            <X size={22} />
          </button>
        </div>

        {/* ── Progress ── */}
        <div className="bg-white px-6 pb-5">
          {/* Step labels */}
          <div className="flex justify-between mb-2">
            {STEP_LABELS.map((label, idx) => (
              <span
                key={label}
                className={`text-[10px] font-semibold ${
                  idx + 1 === step
                    ? 'text-brand'
                    : idx + 1 < step
                    ? 'text-green-500'
                    : 'text-slate-400'
                }`}
              >
                {label}
              </span>
            ))}
          </div>
          <div className="h-1 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-brand rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* ── Form body ── */}
        <div className="p-6 flex-1">

          {/* ── Passo 1: Perfil Básico ── */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              {/* Avatar upload */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="relative group w-20 h-20 rounded-full border-2 border-dashed border-border hover:border-brand transition-colors flex items-center justify-center overflow-hidden bg-white"
                  aria-label="Alterar foto de perfil"
                >
                  {formData.avatar ? (
                    <img
                      src={formData.avatar}
                      alt="Foto de perfil"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <UserIcon size={32} className="text-slate-300" />
                  )}
                  <div className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={20} />
                    <span className="text-[10px] font-medium mt-0.5">Alterar</span>
                  </div>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </div>
              <p className="text-center text-xs text-slate-400 -mt-2">Clique para alterar foto</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={labelClass}>Nome Completo *</label>
                  <input
                    required
                    type="text"
                    placeholder="Ex: João da Silva"
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className={inputClass}
                  />
                </div>

                <div className="sm:col-span-2" ref={wrapperRef}>
                  <label className={labelClass}>Cidade / Estado *</label>
                  <div className="relative">
                    <MapPin
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                    <input
                      required
                      type="text"
                      placeholder={
                        isLoadingCities
                          ? 'Carregando cidades...'
                          : 'Digite para buscar (Ex: São Paulo - SP)'
                      }
                      value={formData.location}
                      onChange={handleLocationChange}
                      onFocus={() => formData.location.length > 1 && setShowSuggestions(true)}
                      className={`${inputClass} pl-9`}
                    />
                    {isLoadingCities && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                    )}
                    {showSuggestions && filteredCities.length > 0 && (
                      <ul className="absolute z-50 left-0 right-0 mt-1 bg-white border border-border rounded-xl shadow-xl max-h-52 overflow-y-auto animate-fade-in">
                        {filteredCities.map((city, idx) => (
                          <li
                            key={idx}
                            onClick={() => handleSelectCity(city)}
                            className="px-4 py-3 hover:bg-brand-subtle cursor-pointer text-sm text-navy flex items-center gap-2 border-b border-border last:border-0 transition-colors"
                          >
                            <MapPin size={13} className="text-brand flex-shrink-0" />
                            {city}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Telefone</label>
                  <input
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Valor Hora (R$)</label>
                  <input
                    required
                    type="number"
                    min="0"
                    placeholder="100"
                    value={formData.hourlyRateValue || ''}
                    onChange={e =>
                      setFormData(prev => ({ ...prev, hourlyRateValue: Number(e.target.value) }))
                    }
                    className={inputClass}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass}>Experiência</label>
                  <div className="flex flex-wrap gap-2">
                    {EXPERIENCE_OPTIONS.map(opt => {
                      const isSelected = formData.yearsExperience === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleExperienceSelect(opt.value)}
                          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                            isSelected
                              ? 'bg-brand-subtle border-brand text-brand'
                              : 'bg-white border-border text-slate-500 hover:border-brand/50'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Passo 2: Especialidades ── */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-semibold text-navy mb-1">Selecione suas especialidades *</h3>
                <p className="text-slate-400 text-xs mb-4">
                  Selecione todas que se aplicam ao seu trabalho.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {Object.values(Trade)
                    .filter(t => t !== Trade.GERAL)
                    .map(trade => {
                      const { icon: Icon, description } = TRADE_META[trade];
                      const isSelected = formData.trades.includes(trade);
                      return (
                        <button
                          key={trade}
                          type="button"
                          onClick={() => handleToggleTrade(trade)}
                          className={`relative flex flex-col items-start gap-2 p-4 rounded-2xl border-2 text-left transition-all ${
                            isSelected
                              ? 'border-brand bg-brand-subtle text-brand'
                              : 'border-border bg-white text-slate-600 hover:border-brand/40 hover:bg-brand-subtle/50'
                          }`}
                        >
                          <Icon size={32} />
                          <div>
                            <p className="font-bold text-sm">{trade}</p>
                            <p className="text-[11px] opacity-70 mt-0.5">{description}</p>
                          </div>
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-5 h-5 bg-brand rounded-full flex items-center justify-center">
                              <Check size={11} className="text-white" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                </div>
              </div>

              <div>
                <label className={labelClass}>Sobre você (Bio)</label>
                <textarea
                  required
                  placeholder="Descreva seus serviços, especialidades e diferenciais..."
                  value={formData.bio}
                  onChange={e => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  className={`${inputClass} min-h-[120px] rounded-xl resize-none`}
                />
              </div>
            </div>
          )}

          {/* ── Passo 3: Portfólio ── */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-semibold text-navy mb-1">Fotos de trabalhos anteriores</h3>
                <p className="text-slate-400 text-xs mb-4">
                  Adicione até {MAX_PORTFOLIO_IMAGES} fotos. Clique nos quadrados vazios para adicionar.
                </p>

                <div className="grid grid-cols-3 gap-3">
                  {Array.from({ length: MAX_PORTFOLIO_IMAGES }).map((_, idx) => {
                    const url = formData.portfolio[idx];
                    return url ? (
                      <div
                        key={idx}
                        className="aspect-square rounded-xl overflow-hidden relative group"
                      >
                        <img
                          src={url}
                          alt={`Trabalho ${idx + 1}`}
                          className="object-cover w-full h-full"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemovePortfolioImage(idx)}
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-black/60 rounded-full p-1 transition-opacity"
                          aria-label="Remover imagem"
                        >
                          <X size={12} className="text-white" />
                        </button>
                      </div>
                    ) : (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => portfolioInputRef.current?.click()}
                        className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-brand flex items-center justify-center cursor-pointer transition-colors"
                        aria-label="Adicionar imagem ao portfólio"
                      >
                        <Plus size={24} className="text-slate-300" />
                      </button>
                    );
                  })}
                </div>
                <input
                  type="file"
                  ref={portfolioInputRef}
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handlePortfolioUpload}
                />
              </div>

              {/* Certifications */}
              <div>
                <label className={labelClass}>Certificações e Cursos</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Ex: NR-10, Curso de Hidráulica..."
                    value={formData.certificationInput}
                    onChange={e =>
                      setFormData(prev => ({ ...prev, certificationInput: e.target.value }))
                    }
                    onKeyDown={e =>
                      e.key === 'Enter' && (e.preventDefault(), handleAddCert())
                    }
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={handleAddCert}
                    className="flex-shrink-0 w-12 bg-brand-subtle hover:bg-brand hover:text-white text-brand border border-brand/30 rounded-xl flex items-center justify-center transition-colors"
                    aria-label="Adicionar certificação"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.certifications.map((cert, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-100 px-3 py-1.5 rounded-xl text-xs font-semibold"
                    >
                      <FileText size={11} />
                      {cert}
                      <button
                        type="button"
                        onClick={() => handleRemoveCert(idx)}
                        className="hover:text-red-500 transition-colors ml-0.5"
                        aria-label={`Remover ${cert}`}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ── Passo 4: Revisão ── */}
          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-semibold text-navy">Revise seu perfil antes de publicar</h3>

              {/* Mini ProfessionalCard preview */}
              <div className="bg-white border border-border rounded-2xl p-5 flex gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-cream border border-border flex-shrink-0 flex items-center justify-center">
                  <img
                    src={formData.avatar}
                    alt={formData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-display font-bold text-navy">
                        {formData.name || 'Seu Nome'}
                      </h4>
                      <p className="text-slate-500 text-xs flex items-center gap-1 mt-0.5">
                        <MapPin size={11} className="text-brand" />
                        {formData.location || 'Sua Cidade'}
                      </p>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} size={11} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {formData.trades.map(t => (
                      <span
                        key={t}
                        className="bg-brand-subtle text-brand text-[11px] font-bold px-2 py-0.5 rounded-lg"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {formData.bio && (
                    <p className="text-slate-500 text-xs mt-2 line-clamp-2">{formData.bio}</p>
                  )}

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-brand font-bold text-sm">
                      {formData.hourlyRateValue > 0
                        ? `R$ ${formData.hourlyRateValue}/h`
                        : 'A combinar'}
                    </span>
                    <span className="text-slate-400 text-xs">
                      {formData.yearsExperience > 0
                        ? `${formData.yearsExperience} anos exp.`
                        : ''}
                    </span>
                  </div>
                </div>
              </div>

              {/* Summary stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white border border-border rounded-xl p-3 text-center">
                  <p className="font-display font-bold text-xl text-navy">
                    {formData.trades.length}
                  </p>
                  <p className="text-slate-500 text-xs">Especialidades</p>
                </div>
                <div className="bg-white border border-border rounded-xl p-3 text-center">
                  <p className="font-display font-bold text-xl text-navy">
                    {formData.portfolio.length}
                  </p>
                  <p className="text-slate-500 text-xs">Fotos</p>
                </div>
                <div className="bg-white border border-border rounded-xl p-3 text-center">
                  <p className="font-display font-bold text-xl text-navy">
                    {formData.certifications.length}
                  </p>
                  <p className="text-slate-500 text-xs">Certificações</p>
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div
                  onClick={() => setTermsAccepted(prev => !prev)}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                    termsAccepted
                      ? 'bg-brand border-brand'
                      : 'border-border group-hover:border-brand'
                  }`}
                >
                  {termsAccepted && <Check size={12} className="text-white" />}
                </div>
                <span className="text-slate-600 text-sm leading-relaxed">
                  Eu concordo com os{' '}
                  <span className="text-brand font-semibold underline cursor-pointer">
                    Termos de Uso
                  </span>{' '}
                  e a{' '}
                  <span className="text-brand font-semibold underline cursor-pointer">
                    Política de Privacidade
                  </span>{' '}
                  da ConstruCasa.
                </span>
              </label>

              {/* Final submit button */}
              <button
                onClick={handleSubmit}
                disabled={!termsAccepted}
                className="btn-primary w-full py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check size={18} />
                {isEditing ? 'Salvar Alterações' : 'Criar meu Perfil'}
              </button>
            </div>
          )}
        </div>

        {/* ── Sticky footer navigation ── */}
        {step < STEP_LABELS.length && (
          <div className="bg-white border-t border-border p-4 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(s => s - 1)}
                className="flex items-center gap-2 text-slate-600 font-semibold px-5 py-2.5 rounded-xl hover:bg-cream transition-colors text-sm"
              >
                <ChevronLeft size={16} />
                Voltar
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={() => setStep(s => s + 1)}
              disabled={!canProceed}
              className="flex items-center gap-2 bg-brand hover:bg-brand-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-xl shadow-sm transition-all text-sm"
            >
              Próximo
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {step === STEP_LABELS.length && (
          <div className="bg-white border-t border-border p-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep(s => s - 1)}
              className="flex items-center gap-2 text-slate-600 font-semibold px-5 py-2.5 rounded-xl hover:bg-cream transition-colors text-sm"
            >
              <ChevronLeft size={16} />
              Voltar
            </button>
            <div />
          </div>
        )}
      </div>
    </div>
  );
};
