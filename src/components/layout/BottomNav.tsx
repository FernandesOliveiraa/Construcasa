import React from 'react';
import { House, Search, MessageSquare, LayoutDashboard, User } from 'lucide-react';
import type { User as UserType } from '@/types';

interface BottomNavProps {
  activeView: string;
  onNavigate: (view: string) => void;
  currentUser: UserType | null;
  onOpenAuth: () => void;
  messageBadge?: number;
}

interface TabConfig {
  id: string;
  label: string;
  icon: React.FC<{ size?: number; className?: string }>;
  requiresAuth: boolean;
  badge?: boolean;
}

const tabs: TabConfig[] = [
  { id: 'home', label: 'Início', icon: House, requiresAuth: false },
  { id: 'search', label: 'Buscar', icon: Search, requiresAuth: false },
  { id: 'messages', label: 'Mensagens', icon: MessageSquare, requiresAuth: true, badge: true },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, requiresAuth: true },
  { id: 'profile', label: 'Perfil', icon: User, requiresAuth: false },
];

export const BottomNav: React.FC<BottomNavProps> = ({
  activeView,
  onNavigate,
  currentUser,
  onOpenAuth,
  messageBadge,
}) => {
  const handleTab = (tab: TabConfig) => {
    if (tab.requiresAuth && !currentUser) {
      onOpenAuth();
      return;
    }
    if (tab.id === 'profile' && !currentUser) {
      onOpenAuth();
      return;
    }
    onNavigate(tab.id);
  };

  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-border"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            activeView === tab.id ||
            (tab.id === 'dashboard' && activeView === 'dashboard') ||
            (tab.id === 'profile' && activeView === 'profile');
          const badgeCount = tab.badge ? messageBadge : undefined;

          return (
            <button
              key={tab.id}
              onClick={() => handleTab(tab)}
              className="flex flex-col items-center gap-0.5 px-4 py-2 relative"
              aria-label={tab.label}
            >
              {/* Active indicator: orange line on top */}
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-brand rounded-full" />
              )}

              {/* Icon */}
              <Icon
                size={22}
                className={isActive ? 'text-brand' : 'text-slate-400'}
              />

              {/* Label */}
              <span
                className={`text-[10px] font-medium ${
                  isActive ? 'text-brand' : 'text-slate-400'
                }`}
              >
                {tab.label}
              </span>

              {/* Notification badge */}
              {badgeCount !== undefined && badgeCount > 0 && (
                <span className="absolute top-1 right-3 w-4 h-4 bg-brand text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {badgeCount > 9 ? '9+' : badgeCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
