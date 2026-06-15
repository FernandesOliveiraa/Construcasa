import { useState } from 'react';
import type { ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';
import { User as UserIcon, Bell, Eye, Lock, ChevronRight } from 'lucide-react';
import type { User } from '@/types';

export interface ConfiguracoesPageProps {
  currentUser: User | null;
  onUpdateUser?: (data: Partial<User>) => Promise<void>;
}

/* ─── Toggle Switch (CSS puro, sem lib) ──────────────────────────────────── */
interface ToggleSwitchProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

function ToggleSwitch({ id, checked, onChange, label, description }: ToggleSwitchProps) {
  return (
    <label htmlFor={id} className="flex items-center justify-between gap-4 cursor-pointer py-3">
      <div>
        <span className="font-medium text-navy text-sm">{label}</span>
        {description && <p className="text-xs text-navy/50 mt-0.5">{description}</p>}
      </div>
      <div className="relative flex-shrink-0">
        <input
          id={id}
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={`w-11 h-6 rounded-full transition-colors duration-200 ${checked ? 'bg-brand' : 'bg-border'}`}
        >
          <div
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`}
          />
        </div>
      </div>
    </label>
  );
}

/* ─── Sidebar tab button ─────────────────────────────────────────────────── */
type TabKey = 'perfil' | 'notificacoes' | 'privacidade' | 'seguranca';

interface TabButtonProps {
  id: TabKey;
  label: string;
  Icon: ComponentType<{ size?: number; className?: string }>;
  active: boolean;
  onClick: (id: TabKey) => void;
}

function TabButton({ id, label, Icon, active, onClick }: TabButtonProps) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors text-left ${
        active ? 'bg-brand text-white' : 'text-navy hover:bg-white'
      }`}
    >
      <Icon size={18} />
      {label}
      {!active && <ChevronRight size={14} className="ml-auto text-navy/30" />}
    </button>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export function ConfiguracoesPage({ currentUser, onUpdateUser }: ConfiguracoesPageProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>('perfil');

  /* Perfil */
  const [form, setForm] = useState({
    name: currentUser?.name ?? '',
    email: currentUser?.email ?? '',
    phone: currentUser?.phone ?? '',
    location: currentUser?.location ?? '',
  });
  const [savingPerfil, setSavingPerfil] = useState(false);
  const [savedPerfil, setSavedPerfil] = useState(false);

  /* Notificações */
  const [notifs, setNotifs] = useState({
    emailOrcamentos: true,
    emailMensagens: true,
    emailNewsletter: false,
    pushOrcamentos: true,
    pushMensagens: true,
  });

  /* Privacidade */
  const [privacidade, setPrivacidade] = useState({
    perfilPublico: true,
    mostrarTelefone: false,
    indexarBuscas: true,
  });

  /* Segurança */
  const [showSenhaForm, setShowSenhaForm] = useState(false);
  const [senhaForm, setSenhaForm] = useState({ atual: '', nova: '', confirmar: '' });

  const sessoesMock = [
    { id: 's1', dispositivo: 'Chrome · São Paulo', atual: true },
    { id: 's2', dispositivo: 'App Mobile · São Paulo', atual: false },
  ];

  async function handleSavePerfil() {
    setSavingPerfil(true);
    await onUpdateUser?.(form);
    setSavingPerfil(false);
    setSavedPerfil(true);
    setTimeout(() => setSavedPerfil(false), 3000);
  }

  const initials = (currentUser?.name ?? 'U')
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();


  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="section-navy" style={{ paddingTop: '103px', minHeight: '200px' }}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-white mb-2">Configurações</h1>
          <p className="text-white/70">Gerencie sua conta e preferências</p>
        </div>
      </section>

      {/* Sem usuário */}
      {!currentUser ? (
        <section className="py-24 bg-cream">
          <div className="max-w-md mx-auto px-6 text-center">
            <div className="card p-10">
              <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center mx-auto mb-5">
                <Lock size={32} className="text-navy/30" />
              </div>
              <h2 className="text-xl font-bold text-navy mb-2">Acesso restrito</h2>
              <p className="text-navy/60 text-sm mb-6">Faça login para acessar as configurações da sua conta.</p>
              <button className="btn-primary w-full" onClick={() => navigate('/')}>
                Entrar
              </button>
            </div>
          </div>
        </section>
      ) : (
        /* Conteúdo principal */
        <section className="py-16 bg-cream">
          <div className="max-w-7xl mx-auto px-6 flex gap-8 items-start">
            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 space-y-1 sticky top-[calc(103px+1.5rem)]">
              <TabButton id="perfil" label="Perfil" Icon={UserIcon} active={activeTab === 'perfil'} onClick={(id) => setActiveTab(id)} />
              <TabButton id="notificacoes" label="Notificações" Icon={Bell} active={activeTab === 'notificacoes'} onClick={(id) => setActiveTab(id)} />
              <TabButton id="privacidade" label="Privacidade" Icon={Eye} active={activeTab === 'privacidade'} onClick={(id) => setActiveTab(id)} />
              <TabButton id="seguranca" label="Segurança" Icon={Lock} active={activeTab === 'seguranca'} onClick={(id) => setActiveTab(id)} />
            </aside>

            {/* Painel de conteúdo */}
            <div className="flex-1 min-w-0">

              {/* ── Aba Perfil ─────────────────────────────────────────── */}
              {activeTab === 'perfil' && (
                <div className="card p-8">
                  <h2 className="text-xl font-bold text-navy mb-6">Informações do Perfil</h2>

                  {/* Avatar */}
                  <div className="flex items-center gap-5 mb-8">
                    {currentUser.avatar ? (
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-border"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-brand flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                        {initials}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-navy">{currentUser.name}</p>
                      <p className="text-sm text-navy/50 capitalize">{currentUser.type === 'client' ? 'Cliente' : 'Profissional'}</p>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1.5">Nome completo</label>
                      <input
                        type="text"
                        className="input-base"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1.5">
                        Email
                        <span className="ml-2 text-xs font-normal text-navy/40" title="Para alterar o email entre em contato com o suporte">
                          (não editável — contate o suporte para alterar)
                        </span>
                      </label>
                      <input
                        type="email"
                        className="input-base opacity-60 cursor-not-allowed"
                        value={form.email}
                        disabled
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1.5">Telefone</label>
                      <input
                        type="tel"
                        className="input-base"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="(11) 99999-0000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-navy mb-1.5">Cidade / Estado</label>
                      <input
                        type="text"
                        className="input-base"
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        placeholder="Ex: São Paulo, SP"
                      />
                    </div>

                    <button
                      className="btn-primary w-full py-3 mt-2"
                      onClick={handleSavePerfil}
                      disabled={savingPerfil}
                    >
                      {savingPerfil ? 'Salvando...' : savedPerfil ? '✓ Salvo!' : 'Salvar Alterações'}
                    </button>
                  </div>
                </div>
              )}

              {/* ── Aba Notificações ───────────────────────────────────── */}
              {activeTab === 'notificacoes' && (
                <div className="card p-8">
                  <h2 className="text-xl font-bold text-navy mb-6">Preferências de Notificação</h2>

                  <div className="mb-6">
                    <h3 className="text-xs font-semibold text-navy/50 uppercase tracking-wider mb-1">Email</h3>
                    <div className="divide-y divide-border">
                      <ToggleSwitch
                        id="emailOrcamentos"
                        checked={notifs.emailOrcamentos}
                        onChange={(v) => setNotifs({ ...notifs, emailOrcamentos: v })}
                        label="Novos orçamentos"
                        description="Receba um email quando um profissional enviar uma proposta"
                      />
                      <ToggleSwitch
                        id="emailMensagens"
                        checked={notifs.emailMensagens}
                        onChange={(v) => setNotifs({ ...notifs, emailMensagens: v })}
                        label="Novas mensagens"
                        description="Seja notificado de mensagens no chat"
                      />
                      <ToggleSwitch
                        id="emailNewsletter"
                        checked={notifs.emailNewsletter}
                        onChange={(v) => setNotifs({ ...notifs, emailNewsletter: v })}
                        label="Newsletter"
                        description="Dicas de construção e novidades da plataforma"
                      />
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xs font-semibold text-navy/50 uppercase tracking-wider mb-1">Push</h3>
                    <div className="divide-y divide-border">
                      <ToggleSwitch
                        id="pushOrcamentos"
                        checked={notifs.pushOrcamentos}
                        onChange={(v) => setNotifs({ ...notifs, pushOrcamentos: v })}
                        label="Novos orçamentos"
                        description="Notificação push em tempo real"
                      />
                      <ToggleSwitch
                        id="pushMensagens"
                        checked={notifs.pushMensagens}
                        onChange={(v) => setNotifs({ ...notifs, pushMensagens: v })}
                        label="Novas mensagens"
                        description="Alerta de mensagens instantâneas"
                      />
                    </div>
                  </div>

                  <button className="btn-primary">Salvar Preferências</button>
                </div>
              )}

              {/* ── Aba Privacidade ────────────────────────────────────── */}
              {activeTab === 'privacidade' && (
                <div className="card p-8">
                  <h2 className="text-xl font-bold text-navy mb-6">Configurações de Privacidade</h2>

                  <div className="divide-y divide-border mb-8">
                    <ToggleSwitch
                      id="perfilPublico"
                      checked={privacidade.perfilPublico}
                      onChange={(v) => setPrivacidade({ ...privacidade, perfilPublico: v })}
                      label="Perfil público"
                      description="Permite que clientes encontrem e visualizem seu perfil"
                    />
                    <ToggleSwitch
                      id="mostrarTelefone"
                      checked={privacidade.mostrarTelefone}
                      onChange={(v) => setPrivacidade({ ...privacidade, mostrarTelefone: v })}
                      label="Mostrar telefone"
                      description="Exibe seu número de telefone no perfil público (apenas profissionais)"
                    />
                    <ToggleSwitch
                      id="indexarBuscas"
                      checked={privacidade.indexarBuscas}
                      onChange={(v) => setPrivacidade({ ...privacidade, indexarBuscas: v })}
                      label="Indexar em buscas"
                      description="Aparecer nos resultados de busca da plataforma"
                    />
                  </div>

                  <button className="btn-primary">Salvar Privacidade</button>
                </div>
              )}

              {/* ── Aba Segurança ──────────────────────────────────────── */}
              {activeTab === 'seguranca' && (
                <div className="space-y-6">
                  {/* Alterar senha */}
                  <div className="card p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-navy">Alterar Senha</h2>
                      <button
                        className="btn-ghost text-sm"
                        onClick={() => setShowSenhaForm(!showSenhaForm)}
                      >
                        {showSenhaForm ? 'Cancelar' : 'Alterar'}
                      </button>
                    </div>

                    {!showSenhaForm ? (
                      <p className="text-navy/60 text-sm">
                        Use uma senha forte com letras, números e símbolos para proteger sua conta.
                      </p>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-navy mb-1.5">Senha atual</label>
                          <input
                            type="password"
                            className="input-base"
                            value={senhaForm.atual}
                            onChange={(e) => setSenhaForm({ ...senhaForm, atual: e.target.value })}
                            placeholder="••••••••"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-navy mb-1.5">Nova senha</label>
                          <input
                            type="password"
                            className="input-base"
                            value={senhaForm.nova}
                            onChange={(e) => setSenhaForm({ ...senhaForm, nova: e.target.value })}
                            placeholder="••••••••"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-navy mb-1.5">Confirmar nova senha</label>
                          <input
                            type="password"
                            className="input-base"
                            value={senhaForm.confirmar}
                            onChange={(e) => setSenhaForm({ ...senhaForm, confirmar: e.target.value })}
                            placeholder="••••••••"
                          />
                        </div>
                        <button className="btn-primary">Salvar nova senha</button>
                      </div>
                    )}
                  </div>

                  {/* Sessões ativas */}
                  <div className="card p-8">
                    <h2 className="text-xl font-bold text-navy mb-4">Sessões Ativas</h2>
                    <div className="space-y-3">
                      {sessoesMock.map((sessao) => (
                        <div
                          key={sessao.id}
                          className="flex items-center justify-between py-3 border-b border-border last:border-0"
                        >
                          <div>
                            <p className="font-medium text-navy text-sm">{sessao.dispositivo}</p>
                            {sessao.atual && (
                              <span className="badge badge-success text-xs mt-1">Sessão atual</span>
                            )}
                          </div>
                          {!sessao.atual && (
                            <button className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors">
                              Encerrar
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Excluir conta */}
                  <div className="card p-8 border-red-200">
                    <h2 className="text-xl font-bold text-navy mb-2">Excluir Conta</h2>
                    <p className="text-navy/60 text-sm mb-5">
                      Esta ação é permanente e irreversível. Todos os seus dados, histórico de orçamentos e avaliações serão apagados definitivamente.
                    </p>
                    <button className="px-5 py-2.5 rounded-lg border-2 border-red-400 text-red-500 font-semibold text-sm hover:bg-red-50 transition-colors">
                      Excluir minha conta
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default ConfiguracoesPage;
