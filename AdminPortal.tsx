import React, { useState, useEffect } from 'react';
import { InstagramSubmission, Review, LuckyChit, Language } from '../types';
import { DAILY_FOOTFALL_STATS } from '../data/mockData';
import { translations } from '../data/translations';
import { fireConfetti } from '../utils/confetti';
import { getActive60SecBarcodeToken } from '../utils/barcodeGenerator';
import { 
  ShieldCheck, Lock, Users, Printer, Trophy, Shuffle, 
  BarChart3, Heart, MessageCircle, ExternalLink, Trash2, CheckCircle2, 
  AlertTriangle, MessageSquare, QrCode, Clock, RefreshCw, Maximize2, 
  Scan, Sparkles, MapPin, Check
} from 'lucide-react';

interface AdminPortalProps {
  language: Language;
  onClose: () => void;
  instaSubmissions: InstagramSubmission[];
  reviews: Review[];
  luckyChits: LuckyChit[];
  onApproveReview: (id: string) => void;
  onDeleteReview: (id: string) => void;
  onOpenPrintModal: (type: 'all' | 'daily' | 'insta') => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  language,
  onClose,
  instaSubmissions,
  reviews,
  luckyChits,
  onApproveReview,
  onDeleteReview,
  onOpenPrintModal
}) => {
  const t = translations[language];

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [authError, setAuthError] = useState('');

  const [adminTab, setAdminTab] = useState<'barcodegen' | 'analytics' | 'contest1' | 'contest2' | 'luckydraw' | 'reviews'>('barcodegen');
  const [isSpinning, setIsSpinning] = useState(false);
  const [winnerChit, setWinnerChit] = useState<LuckyChit | null>(null);
  const [winnerContestType, setWinnerContestType] = useState<'all' | 'daily' | 'insta'>('all');

  // Dynamic 60-Second Barcode state
  const [selectedCheckpoint, setSelectedCheckpoint] = useState('Main Mall Entrance (Badnera Rd)');
  const [barcodeData, setBarcodeData] = useState(() => getActive60SecBarcodeToken(selectedCheckpoint));
  const [isFullscreenKiosk, setIsFullscreenKiosk] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);

  // Auto-refresh barcode every second to track 60-second window
  useEffect(() => {
    const timer = setInterval(() => {
      setBarcodeData(getActive60SecBarcodeToken(selectedCheckpoint));
    }, 1000);
    return () => clearInterval(timer);
  }, [selectedCheckpoint]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminId.trim() === 'TCCAdmin' && adminPass.trim() === 'Admin@123') {
      setIsAdminLoggedIn(true);
      setAuthError('');
      fireConfetti({ count: 40 });
    } else {
      setAuthError('Invalid Admin ID or Password. Expected TCCAdmin / Admin@123');
    }
  };

  const handleSpinLuckyDraw = () => {
    if (luckyChits.length === 0) return;
    setIsSpinning(true);
    setWinnerChit(null);

    const pool = luckyChits.filter((c) => {
      if (winnerContestType === 'daily') return c.contestType === 'visit_scratch';
      if (winnerContestType === 'insta') return c.contestType === 'insta_contest';
      return true;
    });

    const chosenPool = pool.length > 0 ? pool : luckyChits;
    let iterations = 0;
    const maxIterations = 20;

    const interval = setInterval(() => {
      setWinnerChit(chosenPool[Math.floor(Math.random() * chosenPool.length)]);
      iterations++;
      if (iterations >= maxIterations) {
        clearInterval(interval);
        setIsSpinning(false);
        setWinnerChit(chosenPool[Math.floor(Math.random() * chosenPool.length)]);
        fireConfetti({ count: 120 });
      }
    }, 100);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(barcodeData.code);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto my-8 glass-panel rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-fadeIn">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-900 to-rose-900 text-amber-400 flex items-center justify-center text-2xl shadow-xl border border-amber-500/30">
            <ShieldCheck className="w-8 h-8 text-amber-400" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {t.adminLogin}
          </h2>
          <p className="text-xs text-slate-500">
            Tapadia City Centre Mall Operations & Contest Management
          </p>
        </div>

        {authError && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {t.adminIdLabel}
            </label>
            <input
              type="text"
              required
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              placeholder="TCCAdmin"
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {t.adminPassLabel}
            </label>
            <input
              type="password"
              required
              value={adminPass}
              onChange={(e) => setAdminPass(e.target.value)}
              placeholder="Admin@123"
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
            />
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <button
              type="button"
              onClick={() => { setAdminId('TCCAdmin'); setAdminPass('Admin@123'); }}
              className="text-amber-600 dark:text-amber-400 font-bold hover:underline cursor-pointer"
            >
              Auto-fill (TCCAdmin / Admin@123)
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-slate-900 via-indigo-900 to-rose-900 hover:from-slate-800 text-white shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Lock className="w-4 h-4 text-amber-400" />
            <span>{t.loginAsAdmin}</span>
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* Top Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-b-2 border-indigo-500/30">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-900 to-rose-900 text-amber-400 flex items-center justify-center text-3xl shadow-xl shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                ACTIVE ADMIN SESSION: TCCAdmin
              </span>
              <span className="text-xs text-slate-400 font-semibold">Amravati Mall Operations</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {t.adminPortal}
            </h1>
            <p className="text-xs text-slate-500">
              60-Sec Checkpoint Barcodes, Daily Footfall, Instagram Contest & Lucky Draw Engine
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onOpenPrintModal('all')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{t.printAllChits} ({luckyChits.length})</span>
          </button>
          <button
            onClick={() => setIsAdminLoggedIn(false)}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-500 transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'barcodegen', label: '⚡ 60-Sec Barcode Generator', icon: QrCode, badge: `${barcodeData.expiresInSeconds}s` },
          { id: 'analytics', label: t.footfallAnalytics, icon: BarChart3 },
          { id: 'contest1', label: `${t.contest1Title} (Daily Chits)`, icon: Users },
          { id: 'contest2', label: `${t.contest2Title} (Likes & Comments)`, icon: Heart },
          { id: 'luckydraw', label: '🎡 Live Lucky Draw Drum & Spinner', icon: Trophy },
          { id: 'reviews', label: t.moderateReviews, icon: MessageSquare },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = adminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 rounded-t-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'border-b-2 border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-500/5'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 font-black animate-pulse">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* SECTION 0: 60-Second Dynamic Barcode Generator (Requested Feature) */}
      {adminTab === 'barcodegen' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  <span>60-SECOND ROTATING CHECKPOINT BARCODE</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {t.adminBarcodeTitle}
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xl">
                  {t.adminBarcodeDesc}
                </p>
              </div>

              {/* Checkpoint selector */}
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <select
                  value={selectedCheckpoint}
                  onChange={(e) => setSelectedCheckpoint(e.target.value)}
                  className="px-3 py-2 text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="Main Mall Entrance (Badnera Rd)">Main Entrance (Badnera Rd)</option>
                  <option value="Central Atrium Step Counter">Central Atrium Checkpoint</option>
                  <option value="Miraj Cinemas Gate (3rd Floor)">Miraj Cinemas Gate (3rd Floor)</option>
                  <option value="Food Court Checkpoint (3rd Floor)">Food Court (3rd Floor)</option>
                </select>
              </div>
            </div>

            {/* Live Barcode Display Terminal */}
            <div className={`p-6 sm:p-10 rounded-3xl text-center space-y-6 border-2 transition-all ${
              isFullscreenKiosk 
                ? 'fixed inset-0 z-50 bg-slate-950 flex flex-col justify-center items-center m-0 rounded-none' 
                : 'bg-white dark:bg-slate-900 border-amber-400/40 shadow-xl'
            }`}>
              
              {/* Mall Brand header on kiosk */}
              <div className="space-y-1">
                <img
                  src="/assets/aistudio/logo_e14c23ed.png"
                  alt="TCC"
                  className="h-10 mx-auto object-contain"
                />
                <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-wider uppercase">
                  TAPADIA CITY CENTRE • CONTEST CHECK-IN
                </h2>
                <p className="text-xs text-amber-500 font-bold">
                  📍 {selectedCheckpoint}
                </p>
              </div>

              {/* High-Contrast Scannable Barcode & QR Block */}
              <div className="max-w-md mx-auto p-6 rounded-2xl bg-white text-slate-950 border-4 border-slate-900 shadow-2xl space-y-4">
                
                {/* SVG Barcode Stripes */}
                <div className="space-y-1 py-2">
                  <div className="flex items-center justify-center gap-1 h-20 w-full overflow-hidden px-4">
                    {Array.from({ length: 48 }).map((_, bIdx) => {
                      const isThick = (bIdx * 7) % 5 === 0;
                      const isMedium = (bIdx * 3) % 4 === 0;
                      return (
                        <span
                          key={bIdx}
                          className="bg-black inline-block h-full transition-all duration-300"
                          style={{
                            width: isThick ? '5px' : isMedium ? '3px' : '1.5px',
                            marginRight: (bIdx % 3 === 0 ? '3px' : '1.5px')
                          }}
                        />
                      );
                    })}
                  </div>
                  <p className="font-mono text-base font-black tracking-[0.25em] text-slate-950">
                    {barcodeData.code}
                  </p>
                </div>

                <div className="text-[11px] font-semibold text-slate-600 border-t border-slate-200 pt-2 flex items-center justify-between">
                  <span>Scan to add +1 Visit Step</span>
                  <span className="font-mono text-slate-400">{barcodeData.token}</span>
                </div>
              </div>

              {/* 60-Second Circular Countdown Ring */}
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-200 dark:text-slate-800"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-amber-500 transition-all duration-1000 ease-linear"
                      strokeDasharray={`${(barcodeData.expiresInSeconds / 60) * 100}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-900 dark:text-white">
                    <span className="text-xl font-black font-mono leading-none">
                      {barcodeData.expiresInSeconds}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-slate-400">sec</span>
                  </div>
                </div>

                <p className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
                  <span>Auto-rotating every 60 seconds • Valid till 08/11/2026</span>
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleCopyCode}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  {copiedToken ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Scan className="w-3.5 h-3.5" />}
                  <span>{copiedToken ? 'Token Copied!' : 'Copy Active Barcode Code'}</span>
                </button>

                <button
                  onClick={() => setIsFullscreenKiosk(!isFullscreenKiosk)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>{isFullscreenKiosk ? 'Exit Fullscreen' : 'Project to Mall Entrance Display'}</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* SECTION 1: Daily Footfall Analytics */}
      {adminTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-5 rounded-2xl space-y-1">
              <p className="text-xs font-semibold text-slate-500">Today's Footfall (27/10)</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">9,850</p>
              <p className="text-[10px] text-emerald-500 font-bold">+18% vs Last Tuesday</p>
            </div>
            <div className="glass-panel p-5 rounded-2xl space-y-1">
              <p className="text-xs font-semibold text-slate-500">Total Contest Entries</p>
              <p className="text-2xl font-black text-amber-500">{luckyChits.length * 140 + 870}</p>
              <p className="text-[10px] text-slate-400">Between 27/10 & 08/11</p>
            </div>
            <div className="glass-panel p-5 rounded-2xl space-y-1">
              <p className="text-xs font-semibold text-slate-500">Instagram Reel Views</p>
              <p className="text-2xl font-black text-rose-500">48,200+</p>
              <p className="text-[10px] text-rose-400">#TCCAmravati trending</p>
            </div>
            <div className="glass-panel p-5 rounded-2xl space-y-1">
              <p className="text-xs font-semibold text-slate-500">Lucky Draw Drum Pool</p>
              <p className="text-2xl font-black text-indigo-500">{luckyChits.length}</p>
              <p className="text-[10px] text-indigo-400">Ready for instant print</p>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-amber-500" />
              <span>Daily Footfall Trend (Amravati Mall Entrances)</span>
            </h3>
            <div className="space-y-3 pt-2">
              {DAILY_FOOTFALL_STATS.map((item) => {
                const widthPercent = (item.visitors / 20000) * 100;
                return (
                  <div key={item.day} className="space-y-1 text-xs">
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-700 dark:text-slate-300">{item.day}</span>
                      <span className="font-mono text-slate-900 dark:text-white">
                        {item.visitors.toLocaleString()} Shoppers • {item.contestEntries} Contest Check-ins
                      </span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full"
                        style={{ width: `${widthPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: Contest 1 Daily Visitors Chits */}
      {adminTab === 'contest1' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Contest 1: Daily Store Visitors & Scratch Cards (27/10/2026 - 08/11/2026)
              </h3>
              <p className="text-xs text-slate-500">
                Daily visitors claim guaranteed scratch coupons & receive official Toyota Hyryder Lucky Draw slips
              </p>
            </div>
            <button
              onClick={() => onOpenPrintModal('daily')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-amber-500 text-slate-950 hover:bg-amber-400 active:scale-95 transition-all shadow-md cursor-pointer shrink-0"
            >
              <Printer className="w-4 h-4" />
              <span>{t.printDailyChits}</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase font-semibold text-[10px]">
                  <th className="py-2.5 px-3">Chit ID</th>
                  <th className="py-2.5 px-3">Participant Name</th>
                  <th className="py-2.5 px-3">Phone</th>
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Barcode Serial</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {luckyChits.filter((c) => c.contestType === 'visit_scratch').map((chit) => (
                  <tr key={chit.chitId} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-mono font-bold text-rose-500">{chit.chitId}</td>
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">{chit.userName}</td>
                    <td className="py-3 px-3 font-mono">{chit.userPhone}</td>
                    <td className="py-3 px-3 text-slate-500">{chit.timestamp}</td>
                    <td className="py-3 px-3 font-mono text-[10px] text-slate-400">{chit.barcode}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-[10px]">
                        In Drum
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 3: Contest 2 Instagram Reels */}
      {adminTab === 'contest2' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Contest 2: Instagram Reel Submissions & Live Engagement
              </h3>
              <p className="text-xs text-slate-500">
                Review locked Instagram links, real-time like/comment tallies, and print Instagram Lucky Draw slips
              </p>
            </div>
            <button
              onClick={() => onOpenPrintModal('insta')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-rose-600 text-white hover:bg-rose-500 active:scale-95 transition-all shadow-md cursor-pointer shrink-0"
            >
              <Printer className="w-4 h-4" />
              <span>{t.printInstaChits}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {instaSubmissions.map((sub, idx) => (
              <div key={sub.id} className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-xs">
                      #{idx + 1}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{sub.userName}</p>
                      <p className="text-[10px] text-rose-500 font-mono font-semibold">{sub.handle}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">
                    {sub.isLocked ? 'Locked & Verified' : 'Draft'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300">"{sub.caption}"</p>
                <a href={sub.reelUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] text-indigo-500 hover:underline flex items-center gap-1 font-mono truncate">
                  <ExternalLink className="w-3 h-3 shrink-0" />
                  <span>{sub.reelUrl}</span>
                </a>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/60 flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-rose-500">
                    <Heart className="w-4 h-4 fill-rose-500" />
                    {sub.likes.toLocaleString()} Likes
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                    <MessageCircle className="w-4 h-4" />
                    {sub.comments} Comments
                  </span>
                </div>

                <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-700">
                  <span>Chit: <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{sub.ticketId}</span></span>
                  <span>{sub.submittedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: Live Lucky Draw Spinner */}
      {adminTab === 'luckydraw' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-10 text-center space-y-6">
          <div className="max-w-xl mx-auto space-y-2">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-600 text-white flex items-center justify-center text-3xl shadow-xl">
              🏆
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              {t.liveDrawWinner}
            </h3>
            <p className="text-xs text-slate-500">
              Pick an official live winner from the combined pool of all physical and digital chits!
            </p>
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setWinnerContestType('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold ${winnerContestType === 'all' ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}
            >
              All Combined ({luckyChits.length} Chits)
            </button>
            <button
              onClick={() => setWinnerContestType('daily')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold ${winnerContestType === 'daily' ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}
            >
              Daily Store Visitors Only
            </button>
            <button
              onClick={() => setWinnerContestType('insta')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold ${winnerContestType === 'insta' ? 'bg-amber-500 text-slate-950' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}
            >
              Instagram Creators Only
            </button>
          </div>

          <div className="max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-indigo-500/10 border-2 border-amber-500/40 shadow-xl space-y-3 min-h-[160px] flex flex-col justify-center items-center">
            {winnerChit ? (
              <div className={`space-y-2 ${isSpinning ? 'opacity-70 scale-95' : 'animate-bounce'}`}>
                <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-rose-600 text-white">
                  {isSpinning ? 'Spinning Drum...' : '🎉 OFFICIAL WINNER CHIT! 🎉'}
                </span>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white">
                  {winnerChit.userName}
                </h4>
                <p className="text-sm font-mono font-bold text-amber-600 dark:text-amber-400">
                  Chit #{winnerChit.chitId} • {winnerChit.userPhone}
                </p>
                <p className="text-xs text-slate-500">{winnerChit.contestTitle}</p>
              </div>
            ) : (
              <div className="text-slate-400 space-y-1">
                <p className="text-sm font-bold">Lucky Draw Drum is Loaded</p>
                <p className="text-xs">Press button below to spin and draw live winner</p>
              </div>
            )}
          </div>

          <button
            onClick={handleSpinLuckyDraw}
            disabled={isSpinning}
            className="px-8 py-3.5 rounded-2xl font-black text-sm bg-gradient-to-r from-amber-500 via-rose-600 to-indigo-600 text-white shadow-xl active:scale-95 flex items-center justify-center gap-2 mx-auto cursor-pointer disabled:opacity-50"
          >
            <Shuffle className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>{isSpinning ? 'Spinning Drum...' : t.spinLuckyWheel}</span>
          </button>
        </div>
      )}

      {/* SECTION 5: Customer Reviews Control */}
      {adminTab === 'reviews' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {t.moderateReviews} ({reviews.length})
          </h3>
          <div className="space-y-3">
            {reviews.map((rev) => (
              <div key={rev.id} className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-xs text-slate-900 dark:text-white">{rev.userName}</p>
                    <span className="text-[10px] text-amber-500">★ {rev.rating}/5</span>
                    <span className="text-[10px] text-slate-400">({rev.storeTag})</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{rev.comment}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {!rev.isApproved ? (
                    <button
                      onClick={() => onApproveReview(rev.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 text-white flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t.approve}</span>
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-500 font-bold px-2 py-1 bg-emerald-500/10 rounded-lg">Approved</span>
                  )}
                  <button
                    onClick={() => onDeleteReview(rev.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
