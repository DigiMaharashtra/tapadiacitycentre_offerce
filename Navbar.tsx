import React from 'react';
import { Language, UserProfile } from '../types';
import { translations } from '../data/translations';
import { Sun, Moon, Globe, Shield, User, LogOut, Sparkles, Smartphone } from 'lucide-react';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  user: UserProfile;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenAdmin: () => void;
  onOpenAndroidInstall: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  setLanguage,
  isDark,
  setIsDark,
  user,
  onOpenAuth,
  onLogout,
  onOpenAdmin,
  onOpenAndroidInstall,
  activeTab,
  setActiveTab
}) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600 text-white text-xs font-medium py-1 px-4 text-center flex items-center justify-center gap-2 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-200" />
        <span>
          {language === 'mr'
            ? '🎉 भव्य फेस्टिव्ह महोत्सव: २७ ऑक्टोबर ते ०८ नोव्हेंबर २०२६ - टोयोटा हायरायडर आणि दररोज स्क्रॅच गिफ्ट्स!'
            : language === 'hi'
            ? '🎉 भव्य फेस्टिव्ह ऑफर: 27 अक्टूबर से 08 नवंबर 2026 - टोयोटा हाइराइडर और दैनिक स्क्रैच गिफ्ट्स!'
            : '🎉 Grand Festive Carnival: 27 Oct - 08 Nov 2026 — Win Toyota Hyryder & Daily Scratch Rewards!'}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => setActiveTab('brands')}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="relative">
              {/* TCC Horizontal Logo (275x66 ratio) */}
              <img 
                src="/assets/aistudio/logo_e14c23ed.png" 
                alt="Tapadia City Centre" 
                className="h-9 sm:h-11 w-auto object-contain dark:brightness-110 drop-shadow-sm transition-transform group-hover:scale-102"
              />
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-[11px] font-bold tracking-wider uppercase text-amber-600 dark:text-amber-400">
                {t.mallCity}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {t.badneraRoad}
              </span>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 font-medium text-sm">
            {[
              { id: 'brands', label: t.navBrands },
              { id: 'movies', label: t.navMovies },
              { id: 'snacks', label: t.navSnacks },
              { id: 'rewards', label: t.navRewards, highlight: true },
              { id: 'camera', label: t.navCamera },
              { id: 'about', label: t.navAbout },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3.5 py-2 rounded-xl transition-all duration-200 relative ${
                  activeTab === item.id
                    ? 'text-amber-600 dark:text-amber-400 font-bold bg-amber-500/10'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                {item.label}
                {item.highlight && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
                        {/* Android App Button */}
            <button
              onClick={onOpenAndroidInstall}
              title="Install Android App / Download APK"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600/15 hover:bg-emerald-600/25 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
              <span className="hidden md:inline">Android App</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping hidden sm:block"></span>
            </button>

{/* Language Selector */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs font-semibold rounded-lg transition-all ${
                  language === 'en'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('mr')}
                className={`px-2 py-1 text-xs font-semibold rounded-lg transition-all ${
                  language === 'mr'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                }`}
              >
                मरा
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-1 text-xs font-semibold rounded-lg transition-all ${
                  language === 'hi'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                }`}
              >
                हिं
              </button>
            </div>

            {/* Day / Night View Switch */}
            <button
              onClick={() => setIsDark(!isDark)}
              aria-label="Toggle Day or Night View"
              title={isDark ? "Switch to Day View" : "Switch to Night View"}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-xs cursor-pointer ${
                isDark
                  ? 'bg-slate-900 border-amber-500/40 text-amber-300 hover:bg-slate-800 hover:border-amber-400'
                  : 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100 hover:border-amber-400'
              }`}
            >
              {isDark ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                  <span className="hidden sm:inline">{t.nightView}</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
                  <span className="hidden sm:inline">{t.dayView}</span>
                </>
              )}
            </button>

            {/* Admin Portal Quick Access */}
            <button
              onClick={onOpenAdmin}
              title="Admin Portal (TCCAdmin)"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 dark:bg-slate-800 text-white hover:bg-indigo-600 dark:hover:bg-indigo-600 transition-all shadow-xs"
            >
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              <span>{t.navAdmin}</span>
            </button>

            {/* User Profile or Login */}
            {user.isLoggedIn ? (
              <div className="flex items-center gap-2 pl-1">
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-full bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 hover:border-amber-400 transition-all text-left"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-amber-500"
                  />
                  <div className="hidden sm:block text-xs leading-tight">
                    <p className="font-semibold text-slate-900 dark:text-slate-100 max-w-[90px] truncate">
                      {user.name.split(' ')[0]}
                    </p>
                    <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                      {user.scratchCardsWon.length} {language === 'mr' ? 'रिवॉर्ड्स' : 'Gifts'}
                    </p>
                  </div>
                </button>
                <button
                  onClick={onLogout}
                  title={t.logout}
                  className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white shadow-md hover:shadow-lg transition-all active:scale-97 cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>{t.loginGoogle}</span>
              </button>
            )}

          </div>
        </div>
      </div>
    </header>
  );
};
