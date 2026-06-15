import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft, Upload, X, Image as ImageIcon, Calendar, MapPin,
  Check, Paintbrush, Wrench, Zap, Layers, HardHat, ChevronRight, ChevronLeft,
} from 'lucide-react';
import { Professional, QuoteRequest } from '@/types';

interface QuoteRequestFormProps {
  pro: Professional;
  onBack: () => void;
  onSubmit: (data: Omit<QuoteRequest, 'id' | 'status' | 'createdAt' | 'clientId' | 'clientName' | 'proId' | 'proName' | 'proAvatar'>) => void;
}

const FALLBACK_CITIES = [
  'São Paulo - SP', 'Rio de Janeiro - RJ', 'Belo Horizonte - MG', 'Brasília - DF',
  'Salvador - BA', 'Fortaleza - CE', 'Curitiba - PR', 'Manaus - AM', 'Recife - PE',
];

type ServiceCategory = { label: string; icon: React.ReactNode };

const SERVICE_CATEGORIES: ServiceCategory[] = [
  { label: 'Pintura', icon: <Paintbrush size={20} /> },
  { label: 'Hidráulica', icon: <Wrench size={20} /> },
  { label: 'Elétrica', icon: <Zap size={20} /> },
  { label: 'Alvenaria', icon: <Layers size={20} /> },
  { label: 'Reforma Geral', icon: <HardHat size={20} /> },
];

type UrgencyOption = 'Normal' | 'Urgente' | 'Pode esperar';
const URGENCY_OPTIONS: UrgencyOption[] = ['Normal', 'Urgente', 'Pode esperar'];

type PropertyType = 'Casa' | 'Apartamento' | 'Comercial';
const PROPERTY_TYPES: PropertyType[] = ['Casa', 'Apartamento', 'Comercial'];

const TOTAL_STEPS = 3;

const STEP_LABELS = ['Serviço', 'Detalhes', 'Confirmar'];

export const QuoteRequestForm: React.FC<QuoteRequestFormProps> = ({ pro, onBack, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 — Service
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState<UrgencyOption>('Normal');

  // Step 2 — Details
  const [area, setArea] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType>('Casa');
  const [location, setLocation] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [images, setImages] = useState<string[]>([]);

  // Step 3 — Confirmation
  const [observations, setObservations] = useState('');
  const [confirmedContact, setConfirmedContact] = useState(false);

  // City autocomplete
  const [allCities, setAllCities] = useState<string[]>([]);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchCities = async () => {
      setIsLoadingCities(true);
      try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios');
        if (!response.ok) throw new Error();
        const data = await response.json();
        const formatted = data.map(
          (city: { nome: string; microrregiao?: { mesorregiao?: { UF?: { sigla?: string } } } }) =>
            `${city.nome} - ${city?.microrregiao?.mesorregiao?.UF?.sigla || 'BR'}`
        );
        setAllCities(formatted);
      } catch {
        setAllCities(FALLBACK_CITIES);
      } finally {
        setIsLoadingCities(false);
      }
    };
    fetchCities();

    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
    if (value.length > 1) {
      const filtered = allCities
        .filter(city => city.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 6);
      setFilteredCities(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file as Blob));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
    else onBack();
  };

  const handleSubmit = () => {
    onSubmit({
      title: selectedCategory || 'Serviço não especificado',
      description,
      location,
      preferredDate,
      images,
    });
  };

  const isStep1Valid = selectedCategory !== '' && description.trim().length >= 10;
  const isStep2Valid = location.trim() !== '' && preferredDate !== '';
  const isStep3Valid = confirmedContact;

  const canProceed =
    (currentStep === 1 && isStep1Valid) ||
    (currentStep === 2 && isStep2Valid) ||
    (currentStep === 3 && isStep3Valid);

  const progressPercent = ((currentStep - 1) / (TOTAL_STEPS - 1)) * 100;

  return (
    <div className="min-h-screen bg-cream pb-24">

      {/* Top header */}
      <div className="bg-navy text-white">
        {/* Progress bar */}
        <div className="h-1 bg-white/20">
          <div
            className="h-full bg-brand rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="container mx-auto px-4 max-w-3xl py-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4 text-sm font-medium"
          >
            <ArrowLeft size={18} />
            {currentStep === 1 ? 'Voltar para o perfil' : 'Passo anterior'}
          </button>
          <h1 className="text-2xl font-bold font-display">Solicitar Orçamento</h1>
          <p className="text-white/50 mt-1 text-sm">
            Para <span className="text-brand font-semibold">{pro.name}</span>
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-3xl mt-6">

        {/* Step indicators */}
        <div className="flex items-center justify-between mb-6 px-2">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
            const step = i + 1;
            const isCompleted = step < currentStep;
            const isActive = step === currentStep;

            return (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      isCompleted
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : isActive
                        ? 'bg-brand text-white shadow-lg shadow-brand/30'
                        : 'bg-white border-2 border-[--color-border] text-slate-400'
                    }`}
                  >
                    {isCompleted ? <Check size={16} /> : step}
                  </div>
                  <span
                    className={`text-[10px] font-semibold ${
                      isActive ? 'text-brand' : isCompleted ? 'text-emerald-600' : 'text-slate-400'
                    }`}
                  >
                    {STEP_LABELS[i]}
                  </span>
                </div>
                {i < TOTAL_STEPS - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-3 rounded-full transition-colors ${
                      step < currentStep ? 'bg-emerald-400' : 'bg-[--color-border]'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Step panels */}
        <div className="bg-white rounded-2xl shadow-sm border border-[--color-border] p-6 md:p-8">

          {/* ── STEP 1: Serviço ── */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <h2 className="text-lg font-bold text-navy font-display mb-1">Qual tipo de serviço?</h2>
                <p className="text-slate-500 text-sm">Selecione a categoria mais adequada</p>
              </div>

              {/* Category cards */}
              <div className="flex flex-wrap gap-3">
                {SERVICE_CATEGORIES.map(cat => (
                  <button
                    key={cat.label}
                    type="button"
                    onClick={() => setSelectedCategory(cat.label)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 font-semibold text-sm transition-all ${
                      selectedCategory === cat.label
                        ? 'border-brand bg-brand-subtle text-brand shadow-sm'
                        : 'border-[--color-border] text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {cat.icon}
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Descrição do serviço <span className="text-brand">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Descreva com detalhes o que precisa ser feito, materiais, dimensões..."
                  className="w-full border border-[--color-border] rounded-xl p-3.5 text-sm focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all resize-none min-h-[100px]"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
                <p className="text-[11px] text-slate-400 mt-1">Mínimo de 10 caracteres</p>
              </div>

              {/* Urgency pills */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Urgência</label>
                <div className="flex gap-2 flex-wrap">
                  {URGENCY_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setUrgency(opt)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                        urgency === opt
                          ? 'border-brand bg-brand-subtle text-brand'
                          : 'border-[--color-border] text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2: Detalhes ── */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <h2 className="text-lg font-bold text-navy font-display mb-1">Detalhes do local</h2>
                <p className="text-slate-500 text-sm">Informe o local e as características do serviço</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Area */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Área aproximada</label>
                  <div className="relative flex items-center">
                    <input
                      type="number"
                      placeholder="Ex: 30"
                      className="w-full border border-[--color-border] rounded-xl p-3.5 pr-12 text-sm focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                      value={area}
                      onChange={e => setArea(e.target.value)}
                    />
                    <span className="absolute right-4 text-sm text-slate-400 font-medium">m²</span>
                  </div>
                </div>

                {/* Property type */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tipo de imóvel</label>
                  <div className="flex gap-2">
                    {PROPERTY_TYPES.map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setPropertyType(type)}
                        className={`flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                          propertyType === type
                            ? 'border-brand bg-brand-subtle text-brand'
                            : 'border-[--color-border] text-slate-500 hover:border-slate-300'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location autocomplete */}
                <div className="relative" ref={wrapperRef}>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Local do serviço <span className="text-brand">*</span>
                  </label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      required
                      type="text"
                      placeholder="Cidade - UF"
                      className="w-full pl-10 pr-4 py-3.5 border border-[--color-border] rounded-xl text-sm focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                      value={location}
                      onChange={handleLocationChange}
                      onFocus={() => location.length > 1 && setShowSuggestions(true)}
                    />
                    {isLoadingCities && (
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                        <span className="w-4 h-4 border-2 border-brand border-t-transparent rounded-full animate-spin block" />
                      </div>
                    )}
                  </div>
                  {showSuggestions && filteredCities.length > 0 && (
                    <ul className="absolute z-[100] left-0 right-0 mt-1 bg-white border border-[--color-border] rounded-xl shadow-xl max-h-48 overflow-y-auto">
                      {filteredCities.map((city, idx) => (
                        <li
                          key={idx}
                          onClick={() => { setLocation(city); setShowSuggestions(false); }}
                          className="px-4 py-2.5 hover:bg-brand-subtle cursor-pointer text-sm text-slate-700 border-b border-slate-50 last:border-0 transition-colors"
                        >
                          {city}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Data desejada <span className="text-brand">*</span>
                  </label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="date"
                      required
                      className="w-full pl-10 pr-4 py-3.5 border border-[--color-border] rounded-xl text-sm focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                      value={preferredDate}
                      onChange={e => setPreferredDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Photos */}
              <div className="pt-2">
                <div className="flex items-center gap-2 mb-3">
                  <ImageIcon size={18} className="text-slate-400" />
                  <h3 className="text-sm font-bold text-slate-700">Fotos do local (opcional)</h3>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-[--color-border]">
                      <img src={img} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1.5 right-1.5 bg-red-500 text-white p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square border-2 border-dashed border-[--color-border] rounded-xl flex flex-col items-center justify-center text-slate-400 hover:bg-brand-subtle hover:border-brand hover:text-brand transition-all cursor-pointer"
                  >
                    <Upload size={22} className="mb-1" />
                    <span className="text-[10px] font-bold">Adicionar</span>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                    multiple
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 3: Confirmação ── */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <h2 className="text-lg font-bold text-navy font-display mb-1">Confirme sua solicitação</h2>
                <p className="text-slate-500 text-sm">Revise os dados antes de enviar</p>
              </div>

              {/* Summary card */}
              <div className="bg-cream border border-[--color-border] rounded-2xl p-5 space-y-3">
                {[
                  { label: 'Profissional', value: pro.name },
                  { label: 'Serviço', value: selectedCategory || '—' },
                  { label: 'Urgência', value: urgency },
                  { label: 'Imóvel', value: `${propertyType}${area ? ` · ${area} m²` : ''}` },
                  { label: 'Local', value: location || '—' },
                  { label: 'Data', value: preferredDate || '—' },
                ].map(({ label, value }, idx) => (
                  <React.Fragment key={label}>
                    {idx > 0 && <div className="h-px bg-[--color-border]" />}
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</span>
                      <span className="text-sm font-semibold text-slate-800 text-right">{value}</span>
                    </div>
                  </React.Fragment>
                ))}
                {description && (
                  <>
                    <div className="h-px bg-[--color-border]" />
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Descrição</span>
                      <p className="text-sm text-slate-700 leading-relaxed line-clamp-3">{description}</p>
                    </div>
                  </>
                )}
                {images.length > 0 && (
                  <>
                    <div className="h-px bg-[--color-border]" />
                    <div className="flex items-center gap-2">
                      <ImageIcon size={14} className="text-slate-400" />
                      <span className="text-sm text-slate-600 font-medium">{images.length} foto{images.length > 1 ? 's' : ''} anexada{images.length > 1 ? 's' : ''}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Observations */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Observações extras (opcional)</label>
                <textarea
                  rows={3}
                  placeholder="Alguma informação adicional que queira passar ao profissional..."
                  className="w-full border border-[--color-border] rounded-xl p-3.5 text-sm focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all resize-none"
                  value={observations}
                  onChange={e => setObservations(e.target.value)}
                />
              </div>

              {/* Confirm checkbox */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={confirmedContact}
                    onChange={e => setConfirmedContact(e.target.checked)}
                  />
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                      confirmedContact ? 'border-brand bg-brand' : 'border-slate-300 bg-white group-hover:border-brand/50'
                    }`}
                  >
                    {confirmedContact && <Check size={12} className="text-white" strokeWidth={3} />}
                  </div>
                </div>
                <span className="text-sm text-slate-600 leading-snug">
                  Confirmo que as informações estão corretas e que desejo ser contatado pelo profissional para discutir o orçamento.
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Navigation — sticky bottom */}
        <div className="bg-white border-t border-[--color-border] p-4 sticky bottom-0 flex justify-between mt-4 rounded-b-2xl shadow-lg">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 px-5 py-2.5 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl transition-colors text-sm"
          >
            <ChevronLeft size={16} />
            {currentStep === 1 ? 'Cancelar' : 'Voltar'}
          </button>

          {currentStep < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed}
              className="btn-primary flex items-center gap-2 px-6 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0 text-sm"
            >
              Próximo
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canProceed}
              className="btn-primary flex items-center gap-2 px-6 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0 text-sm"
            >
              Enviar Solicitação
              <Check size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
