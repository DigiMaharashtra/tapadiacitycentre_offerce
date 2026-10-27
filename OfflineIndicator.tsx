import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { Language } from '../types';
import { translations } from '../data/translations';

interface OfflineIndicatorProps {
  lang: Language;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ lang }) => {
  const isOnline = useOnlineStatus();
  const t = translations[lang] || translations.en;

  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 sm:right-auto sm:max-w-md z-50 flex items-center gap-2.5 rounded-2xl bg-amber-600/95 text-white px-4 py-2.5 shadow-2xl backdrop-blur-md border border-amber-400/40 animate-bounce">
      <WifiOff className="w-4 h-4 text-white shrink-0" />
      <span className="text-xs font-semibold">
        {t.offlineBanner || "Offline Mode Active — Cached data is running seamlessly."}
      </span>
    </div>
  );
};
