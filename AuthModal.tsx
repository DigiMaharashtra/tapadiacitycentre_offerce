import React, { useState } from 'react';
import { UserProfile, Language } from '../types';
import { translations } from '../data/translations';
import { X, CheckCircle2, Phone, Mail, User, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  user: UserProfile;
  onSaveProfile: (updated: Partial<UserProfile>) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  language,
  user,
  onSaveProfile
}) => {
  const t = translations[language];
  const [name, setName] = useState(user.name || 'Balkurashna Tapase');
  const [email, setEmail] = useState(user.email || 'balkurashnatapase@gmail.com');
  const [phone, setPhone] = useState(user.phone || '+91 98230 45678');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleGoogleQuickLogin = (selectedName: string, selectedEmail: string, selectedAvatar: string) => {
    onSaveProfile({
      name: selectedName,
      email: selectedEmail,
      phone: phone || '+91 98230 45678',
      avatar: selectedAvatar,
      isLoggedIn: true
    });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 900);
  };

  const handleManualSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      name,
      email,
      phone,
      isLoggedIn: true
    });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Decorative corner glows */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 p-0.5 shadow-lg shadow-rose-500/20">
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center p-2">
              <img 
                src="/assets/aistudio/image_dcb98a6d.png" 
                alt="TCC Logo" 
                className="w-12 h-12 object-contain"
              />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {user.isLoggedIn ? (language === 'mr' ? 'ग्राहक प्रोफाइल' : 'Shopper Profile') : t.loginGoogle}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
            {t.loginSubtitle}
          </p>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <p className="text-base font-bold text-slate-900 dark:text-white">
              {language === 'mr' ? 'यशस्वीरित्या लॉगिन झाले!' : language === 'hi' ? 'सफलतापूर्वक लॉगिन हो गया!' : 'Successfully Connected!'}
            </p>
            <p className="text-xs text-slate-500">
              {language === 'mr' ? 'तपाडिया सिटी सेंटरमध्ये स्वागत आहे!' : 'Welcome to Tapadia City Centre!'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            
            {/* Quick 1-Click Google Sign In */}
            {!user.isLoggedIn && (
              <div className="space-y-2.5">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">
                  {language === 'mr' ? 'एक क्लिकमध्ये Google लॉगिन' : 'One-Click Instant Sign In'}
                </p>

                {/* Google user option 1 (from prompt email) */}
                <button
                  type="button"
                  onClick={() => handleGoogleQuickLogin(
                    'Balkurashna Tapase',
                    'balkurashnatapase@gmail.com',
                    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'
                  )}
                  className="w-full flex items-center justify-between p-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-400 bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-500/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    {/* Google standard colorful G logo */}
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-xs">
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.79-2.1-6.74-4.93H1.28v3.13C3.25 21.3 7.31 24 12 24z"/>
                        <path fill="#FBBC05" d="M5.26 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.6H1.28C.46 8.23 0 10.06 0 12s.46 3.77 1.28 5.4l3.98-3.13z"/>
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.28 6.6l3.98 3.13c.95-2.83 3.62-4.98 6.74-4.98z"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                        Continue as Balkurashna
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        balkurashnatapase@gmail.com
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
                    Connect →
                  </span>
                </button>

                {/* Google user option 2 */}
                <button
                  type="button"
                  onClick={() => handleGoogleQuickLogin(
                    'Amravati Shopper',
                    'shopper.tcc@gmail.com',
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80'
                  )}
                  className="w-full flex items-center justify-between p-3 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-amber-500 bg-white dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold text-xs">
                      AS
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                        Use Another Google Account
                      </p>
                      <p className="text-[10px] text-slate-400">
                        shopper.tcc@gmail.com
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            )}

            {/* Custom details / Lucky Draw mobile number */}
            <form onSubmit={handleManualSave} className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'mr' ? 'पूर्ण नाव' : 'Full Name'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.yourPhone} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98223 XXXXX"
                    required
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 dark:text-white"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {language === 'mr' ? 'लकी ड्रॉ चिट्सवर व एसएमएस तिकीटसाठी हा नंबर वापरला जाईल.' : 'This phone number will be printed on your Lucky Draw Chits & Cinema passes.'}
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white shadow-md hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{user.isLoggedIn ? t.updateProfile : (language === 'mr' ? 'लॉगिन करा व बक्षीस मिळवा' : 'Save & Claim Free Rewards')}</span>
              </button>
            </form>

          </div>
        )}

      </div>
    </div>
  );
};
