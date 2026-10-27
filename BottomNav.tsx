import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Building2, Film, UtensilsCrossed, Gift, Camera, Info, ShieldAlert, Smartphone } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  onOpenAdmin: () => void;
  onOpenAndroidInstall?: () => void;
  unscratchedCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  language,
  onOpenAdmin,
  onOpenAndroidInstall,
  unscratchedCount = 0
}) => {
  const t = translations[language];

  const navItems = [
    { id: 'brands', label: t.navBrands, icon: Building2 },
    { id: 'movies', label: t.navMovies, icon: Film },
    { id: 'rewards', label: t.navRewards, icon: Gift, special: true },
    { id: 'snacks', label: t.navSnacks, icon: UtensilsCrossed },
    { id: 'camera', label: t.navCamera, icon: Camera },
    { id: 'about', label: t.navAbout, icon: Info },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden pb-safe">
      <div className="glass-nav border-t border-slate-200/80 dark:border-slate-800/80 px-2 py-1.5 flex items-center justify-around shadow-2xl backdrop-blur-2xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (item.special) {
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="relative -top-3 flex flex-col items-center group focus:outline-none"
              >
                <div className={`w-13 h-13 rounded-2xl flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
                  isActive
                    ? 'bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 text-white shadow-rose-500/30 ring-2 ring-white dark:ring-slate-900'
                    : 'bg-gradient-to-tr from-amber-500 to-rose-500 text-white shadow-amber-500/25'
                }`}>
                  <Icon className="w-6 h-6 animate-bounce" />
                </div>
                <span className="text-[10px] font-bold mt-1 text-rose-600 dark:text-rose-400">
                  {item.label}
                </span>
                {unscratchedCount > 0 && (
                  <span className="absolute top-0 right-0 bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full shadow-md animate-pulse">
                    {unscratchedCount}
                  </span>
                )}
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                isActive
                  ? 'text-amber-600 dark:text-amber-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[10px] mt-0.5 max-w-[58px] truncate tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}

                {onOpenAndroidInstall && (
          <button
            onClick={onOpenAndroidInstall}
            className="flex flex-col items-center justify-center py-1 px-1.5 text-emerald-500 hover:text-emerald-400"
            title="Install Android App"
          >
            <Smartphone className="w-4 h-4 animate-pulse" />
            <span className="text-[9px] mt-0.5 font-bold">Android</span>
          </button>
        )}

{/* Quick Admin Icon on mobile */}
        <button
          onClick={onOpenAdmin}
          className="flex flex-col items-center justify-center py-1 px-1.5 text-slate-400 hover:text-indigo-400"
          title="Admin"
        >
          <ShieldAlert className="w-4 h-4" />
          <span className="text-[9px] mt-0.5">Admin</span>
        </button>
      </div>
    </nav>
  );
};
