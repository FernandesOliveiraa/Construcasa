import React, { useState } from 'react';
import { X, Star, User } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, text: string) => void;
  proName: string;
  proAvatar?: string;
}

const RATING_LABELS = {
  1: 'Muito Insatisfeito',
  2: 'Insatisfeito',
  3: 'Neutro',
  4: 'Satisfeito',
  5: 'Excelente!'
};

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSubmit, proName, proAvatar }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Por favor, selecione uma nota de 1 a 5 estrelas.");
      return;
    }
    onSubmit(rating, comment);
    // Reset form
    setRating(0);
    setComment('');
  };

  const currentRating = hoverRating || rating;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fade-in relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-slate-100 rounded-full"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            {proAvatar ? (
              <img
                src={proAvatar}
                alt={proName}
                className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-slate-100 shadow-sm"
              />
            ) : (
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <User size={40} />
              </div>
            )}
            <h2 className="text-2xl font-bold text-slate-900">Avaliar Serviço</h2>
            <p className="text-slate-500 mt-2">
              Como foi sua experiência com <span className="font-semibold text-slate-800">{proName}</span>?
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Star Rating */}
            <div className="flex flex-col items-center gap-2 mb-8">
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110 focus:outline-none p-1"
                  >
                    <Star
                      size={36}
                      className={`${
                        star <= currentRating
                          ? "fill-orange-400 text-orange-400"
                          : "text-slate-200"
                      } transition-colors duration-200`}
                    />
                  </button>
                ))}
              </div>
              <p className={`text-sm font-medium h-5 transition-opacity ${currentRating > 0 ? 'text-orange-600 opacity-100' : 'opacity-0'}`}>
                {RATING_LABELS[currentRating as keyof typeof RATING_LABELS]}
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-2">Seu Comentário</label>
              <textarea
                required
                rows={4}
                className="w-full border border-slate-200 bg-slate-50 rounded-xl p-4 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all resize-none text-slate-700"
                placeholder="Conte-nos detalhes sobre a qualidade do serviço, pontualidade e comunicação..."
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={rating === 0}
              className={`w-full font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 ${
                rating > 0
                  ? 'bg-slate-900 hover:bg-slate-800 text-white transform hover:-translate-y-0.5'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Star size={18} className={rating > 0 ? "fill-orange-400 text-orange-400" : ""} />
              Enviar Avaliação
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
