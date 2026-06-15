import { useState, useCallback, type FormEvent } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (name: string, email: string, password: string, type: 'client' | 'professional') => Promise<void>;
  authError: string | null;
}

type AuthMode = 'login' | 'register';

export function AuthModal({ isOpen, onClose, onLogin, onRegister, authError }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'client' | 'professional'>('client');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = useCallback(() => {
    setName('');
    setEmail('');
    setPassword('');
    setUserType('client');
    setShowPassword(false);
    setIsLoading(false);
  }, []);

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const switchMode = (newMode: AuthMode) => {
    resetForm();
    setMode(newMode);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (mode === 'login') {
        await onLogin(email, password);
      } else {
        await onRegister(name, email, password, userType);
      }
      resetForm();
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
          <div>
            <h2 className="text-xl font-bold text-navy">
              {mode === 'login' ? 'Entrar na conta' : 'Criar conta'}
            </h2>
            <p className="text-sm text-neutral-500 mt-0.5">
              {mode === 'login' ? 'Acesse o marketplace ConstruCasa' : 'Junte-se à comunidade ConstruCasa'}
            </p>
          </div>
          <button onClick={handleClose} className="p-2 rounded-full hover:bg-neutral-100 transition-colors">
            <X size={20} className="text-neutral-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          {/* Error */}
          {authError && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
              <AlertCircle size={16} className="shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* Nome (só no cadastro) */}
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Nome completo</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Seu nome completo"
                  className="w-full pl-9 pr-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">E-mail</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
                className="w-full pl-9 pr-4 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
              />
            </div>
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Senha</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Mínimo 6 caracteres"
                className="w-full pl-9 pr-10 py-2.5 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Tipo de conta (só no cadastro) */}
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Tipo de conta</label>
              <div className="grid grid-cols-2 gap-3">
                {(['client', 'professional'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setUserType(type)}
                    className={`py-2.5 px-4 rounded-lg border-2 text-sm font-medium transition-all ${
                      userType === type
                        ? 'border-brand bg-brand/5 text-brand'
                        : 'border-neutral-200 text-neutral-600 hover:border-brand/50'
                    }`}
                  >
                    {type === 'client' ? 'Cliente' : 'Profissional'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand text-white py-3 rounded-xl font-semibold hover:bg-brand/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading
              ? 'Aguarde...'
              : mode === 'login' ? 'Entrar' : 'Criar conta'}
          </button>

          {/* Switch mode */}
          <p className="text-center text-sm text-neutral-500">
            {mode === 'login' ? (
              <>
                Não tem conta?{' '}
                <button type="button" onClick={() => switchMode('register')} className="text-brand font-medium hover:underline">
                  Cadastre-se
                </button>
              </>
            ) : (
              <>
                Já tem conta?{' '}
                <button type="button" onClick={() => switchMode('login')} className="text-brand font-medium hover:underline">
                  Entrar
                </button>
              </>
            )}
          </p>

          {/* Demo hint */}
          <div className="bg-neutral-50 rounded-lg px-4 py-3 text-xs text-neutral-500 text-center">
            <strong>Contas de demonstração:</strong><br />
            Cliente: <code>cliente@demo.com</code> / <code>demo123456</code><br />
            Profissional: <code>profissional@demo.com</code> / <code>demo123456</code>
          </div>
        </form>
      </div>
    </div>
  );
}
