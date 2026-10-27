import React, { useState } from 'react';
import { UserProfile, Language, InstagramSubmission, ScratchCard, LuckyChit } from '../types';
import { translations } from '../data/translations';
import { ScratchCardComponent } from './ScratchCardComponent';
import { SCRATCH_REWARDS_POOL } from '../data/mockData';
import { fireConfetti } from '../utils/confetti';
import { 
  Sparkles, Gift, Instagram, Lock, CheckCircle2, Trophy, Clock, 
  MapPin, Heart, MessageCircle, AlertCircle, Ticket, Share2, ArrowRight,
  Flame, Award, Scan, Footprints
} from 'lucide-react';

interface ContestsViewProps {
  language: Language;
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  instaSubmissions: InstagramSubmission[];
  onAddInstaSubmission: (sub: InstagramSubmission) => void;
  onOpenAuth: () => void;
  onViewPrintableChits: (type: 'all' | 'daily' | 'insta') => void;
  onOpenBarcodeScanner: () => void;
}

export const ContestsView: React.FC<ContestsViewProps> = ({
  language,
  user,
  onUpdateUser,
  instaSubmissions,
  onAddInstaSubmission,
  onOpenAuth,
  onViewPrintableChits,
  onOpenBarcodeScanner
}) => {
  const t = translations[language];
  const [activeContestTab, setActiveContestTab] = useState<'contest1' | 'contest2' | 'mywallet'>('contest1');

  // Instagram submission form state
  const [reelUrl, setReelUrl] = useState('');
  const [handle, setHandle] = useState('');
  const [caption, setCaption] = useState('');
  const [lockConfirmation, setLockConfirmation] = useState(false);
  const [justLockedId, setJustLockedId] = useState<string | null>(null);

  // Check-in date simulation (defaults to today's date 27/10/2026)
  const todayStr = '27/10/2026';
  const hasCheckedInToday = user.lastVisitDate === todayStr;

  const handleDailyCheckIn = () => {
    if (!user.isLoggedIn) {
      onOpenAuth();
      return;
    }

    if (hasCheckedInToday) return;

    // Pick a random reward from the pool
    const randomReward = SCRATCH_REWARDS_POOL[Math.floor(Math.random() * SCRATCH_REWARDS_POOL.length)];
    const cardId = `scr-${Date.now()}`;
    const newCard: ScratchCard = {
      id: cardId,
      date: todayStr,
      title: randomReward.title,
      rewardValue: randomReward.value,
      couponCode: `${randomReward.code}-${Math.floor(1000 + Math.random() * 9000)}`,
      isScratched: false,
      unlockedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      iconType: randomReward.icon
    };

    // Also issue a Lucky Draw Chit for the Toyota Hyryder!
    const chitId = `TCC-SCR-${Math.floor(10000 + Math.random() * 90000)}`;
    const newChit: LuckyChit = {
      chitId,
      contestType: 'visit_scratch',
      contestTitle: 'Daily Store Visit Lucky Draw (Toyota Hyryder)',
      userName: user.name,
      userPhone: user.phone || '+91 98223 00000',
      userEmail: user.email,
      timestamp: `${todayStr} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      barcode: `${chitId}TCCMALL`,
      serialNumber: 1000 + (user.luckyDrawChits.length + 1)
    };

    onUpdateUser({
      totalVisits: (user.totalVisits || 0) + 1,
      lastVisitDate: todayStr,
      scratchCardsWon: [newCard, ...user.scratchCardsWon],
      luckyDrawChits: [newChit, ...user.luckyDrawChits]
    });

    fireConfetti({ count: 50 });
  };

  const handleScratchComplete = (cardId: string) => {
    const updatedCards = user.scratchCardsWon.map((c) =>
      c.id === cardId ? { ...c, isScratched: true } : c
    );
    onUpdateUser({ scratchCardsWon: updatedCards });
  };

  const handleLockInstaEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.isLoggedIn) {
      onOpenAuth();
      return;
    }

    if (!reelUrl.trim()) return;

    const chitTicket = `TCC-INSTA-${Math.floor(7000 + Math.random() * 2999)}`;
    const newSub: InstagramSubmission = {
      id: `insta-${Date.now()}`,
      userId: user.id || 'usr-guest',
      userName: user.name,
      userAvatar: user.avatar,
      reelUrl: reelUrl.trim(),
      handle: handle.trim().startsWith('@') ? handle.trim() : `@${handle.trim() || 'tcc_creator'}`,
      caption: caption.trim() || 'Diwali Celebrations at Tapadia City Centre Amravati!',
      submittedAt: `${todayStr} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      likes: Math.floor(400 + Math.random() * 800),
      comments: Math.floor(40 + Math.random() * 120),
      isLocked: true,
      ticketId: chitTicket,
      verified: true,
      status: 'active'
    };

    // Also issue official Lucky Draw Chit for Instagram Contest!
    const newChit: LuckyChit = {
      chitId: chitTicket,
      contestType: 'insta_contest',
      contestTitle: 'Instagram Reel Contest (Mega Tech Hamper & Electronics)',
      userName: user.name,
      userPhone: user.phone || '+91 98223 00000',
      userEmail: user.email,
      timestamp: newSub.submittedAt,
      barcode: `${chitTicket}REEL`,
      serialNumber: 2000 + (instaSubmissions.length + 1)
    };

    onAddInstaSubmission(newSub);
    onUpdateUser({
      instagramSubmissions: [newSub, ...(user.instagramSubmissions || [])],
      luckyDrawChits: [newChit, ...user.luckyDrawChits]
    });

    setJustLockedId(chitTicket);
    setReelUrl('');
    setCaption('');
    setLockConfirmation(false);
    fireConfetti({ count: 90 });
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* Grand Festival Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-500/30 bg-slate-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Left Hero Content */}
          <div className="p-6 sm:p-10 lg:col-span-7 z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 text-white text-xs font-black tracking-wide shadow-md">
              <Flame className="w-4 h-4 animate-bounce" />
              <span>{t.contestPeriod}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              {t.contestHeroTitle}
            </h1>
            
            <p className="text-sm sm:text-base text-amber-200 font-medium max-w-xl">
              {t.contestHeroSub}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>
                  {language === 'mr' ? 'कालावधी: २७ ऑक्टोबर - ०८ नोव्हेंबर २०२६' : 'Active: 27 Oct - 08 Nov 2026'}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>Tapadia City Centre, Badnera Rd</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveContestTab('contest1')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeContestTab === 'contest1'
                    ? 'bg-amber-500 text-slate-950 shadow-lg scale-102'
                    : 'bg-white/15 text-white hover:bg-white/25'
                }`}
              >
                1. {language === 'mr' ? 'डेली व्हिजिट स्क्रॅच' : 'Daily Visit Scratch'}
              </button>
              <button
                onClick={() => setActiveContestTab('contest2')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeContestTab === 'contest2'
                    ? 'bg-rose-500 text-white shadow-lg scale-102'
                    : 'bg-white/15 text-white hover:bg-white/25'
                }`}
              >
                2. {language === 'mr' ? 'इन्स्टाग्राम रील स्पर्धा' : 'Instagram Reel Contest'}
              </button>
              <button
                onClick={() => setActiveContestTab('mywallet')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeContestTab === 'mywallet'
                    ? 'bg-indigo-600 text-white shadow-lg scale-102'
                    : 'bg-white/15 text-white hover:bg-white/25'
                }`}
              >
                🎟️ {t.myRewards} ({user.scratchCardsWon.length + user.luckyDrawChits.length})
              </button>
            </div>
          </div>

          {/* Right Banner Image */}
          <div className="lg:col-span-5 h-64 lg:h-full relative overflow-hidden flex items-center justify-center p-4">
            <img 
              src="/assets/aistudio/images_a55e1b84.jpg" 
              alt="Roshan Diwali Tapadia City Centre" 
              className="w-full h-full object-cover rounded-2xl shadow-xl transform lg:scale-105 transition-transform hover:scale-110"
            />
          </div>

        </div>
      </div>

      {/* CONTEST 1: Daily Store Visit & Scratch Card (27/10/2026 - 08/11/2026) */}
      {activeContestTab === 'contest1' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  <Gift className="w-4 h-4" />
                  <span>27/10/2026 TO 08/11/2026 DAILY REWARD</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {t.contest1Title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
                  {t.contest1Desc}
                </p>
              </div>

            </div>

            {/* Visit Step Counter Dashboard */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-rose-500/5 to-indigo-500/10 border-2 border-amber-500/30 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-md">
                    <Footprints className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                        {t.stepCounterTitle}
                      </span>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-500 text-white">
                        ACTIVE 27/10 - 08/11
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                      {user.visitSteps || user.totalVisits || 1} {t.stepsRecorded}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Scan 60-Sec Barcode Button */}
                  <button
                    onClick={onOpenBarcodeScanner}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-black text-xs sm:text-sm bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white shadow-xl hover:shadow-2xl active:scale-95 transition-all cursor-pointer"
                  >
                    <Scan className="w-4 h-4 animate-pulse" />
                    <span>{t.scanBarcodeBtn}</span>
                  </button>

                  {!hasCheckedInToday && (
                    <button
                      onClick={handleDailyCheckIn}
                      className="px-4 py-3 rounded-2xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-amber-500 text-slate-800 dark:text-white transition-all cursor-pointer"
                    >
                      <span>1-Tap Check-in</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Milestone Step Progress Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-slate-600 dark:text-slate-300">
                    Step Milestone Progress
                  </span>
                  <span className="text-amber-600 dark:text-amber-400 font-mono">
                    {Math.min(user.visitSteps || 1, 10)} / 10 Steps
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(((user.visitSteps || 1) / 10) * 100, 100)}%` }}
                  />
                </div>
                
                <div className="grid grid-cols-4 gap-1 text-[10px] pt-1 text-slate-500 font-semibold text-center">
                  <div className={(user.visitSteps || 1) >= 1 ? 'text-amber-600 dark:text-amber-400 font-bold' : ''}>
                    ✓ Step 1: Starter
                  </div>
                  <div className={(user.visitSteps || 1) >= 3 ? 'text-amber-600 dark:text-amber-400 font-bold' : ''}>
                    {(user.visitSteps || 1) >= 3 ? '✓ ' : ''}Step 3: ₹500 Vchr
                  </div>
                  <div className={(user.visitSteps || 1) >= 5 ? 'text-amber-600 dark:text-amber-400 font-bold' : ''}>
                    {(user.visitSteps || 1) >= 5 ? '✓ ' : ''}Step 5: Movie Pass
                  </div>
                  <div className={(user.visitSteps || 1) >= 10 ? 'text-rose-500 font-black' : ''}>
                    Step 10: Toyota Mega Chit
                  </div>
                </div>
              </div>
            </div>

            {/* Scratch Card Section */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                {language === 'mr' ? 'आजचे स्क्रॅच कार्ड' : 'Today\'s Guaranteed Scratch Card'}
              </h3>

              {user.scratchCardsWon.length === 0 ? (
                <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl max-w-md mx-auto space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <Gift className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">
                    {language === 'mr' ? 'अद्याप कोणतेही कार्ड नाही' : 'No Scratch Card Yet Today'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {language === 'mr' 
                      ? 'वर दिलेल्या "आज मॉलमध्ये चेक-इन करा" बटनावर क्लिक करा आणि आपले बक्षीस अनलॉक करा!'
                      : 'Click the "Check-in Today at Mall" button above to unlock today\'s big scratch gift!'}
                  </p>
                  <button
                    onClick={handleDailyCheckIn}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.checkInBtn}</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {user.scratchCardsWon.map((card) => (
                    <div key={card.id} className="space-y-2">
                      <ScratchCardComponent
                        card={card}
                        onScratchedComplete={handleScratchComplete}
                        language={language}
                      />
                      <p className="text-[11px] text-center text-slate-500 font-medium">
                        {card.isScratched ? (
                          <span className="text-emerald-500 font-semibold">✓ {t.scratchedWon}</span>
                        ) : (
                          <span>👆 {t.scratchCardPrompt}</span>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Visit Streak & Lucky Draw info */}
            <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-950/20 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-sm">
                  {user.totalVisits || 1}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-amber-200">
                    {language === 'mr' ? 'एकूण मॉल भेटींची संख्या' : 'Total Mall Visits Recorded'}
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    {language === 'mr' 
                      ? 'जितक्या जास्त वेळा भेट द्याल, तितक्या जास्त टोयोटा लकी ड्रॉ चिट्स मिळतील!'
                      : 'More visits = More Lucky Draw chits in the grand drum!'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveContestTab('mywallet')}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>View My Lucky Chits</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONTEST 2: Instagram Reel / Video Contest */}
      {activeContestTab === 'contest2' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
            
            <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                <Instagram className="w-4 h-4" />
                <span>OFFICIAL INSTAGRAM REEL CONTEST</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {t.contest2Title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
                {t.contest2Desc}
              </p>
            </div>

            {/* Submission Form */}
            <div className="bg-gradient-to-br from-rose-500/5 via-amber-500/5 to-indigo-500/5 rounded-2xl p-5 sm:p-6 border border-rose-500/20">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <Instagram className="w-4 h-4 text-rose-500" />
                <span>{language === 'mr' ? 'आपली रील लिंक जोडा आणि लॉक करा' : 'Paste Your Reel Link & Lock Entry'}</span>
              </h3>

              {justLockedId && (
                <div className="mb-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <div>
                      <p className="font-bold">{t.entryLocked}</p>
                      <p className="text-[10px] text-slate-500">Chit Ticket ID: <span className="font-mono font-bold">{justLockedId}</span> has been entered into the Grand Lucky Draw drum!</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setJustLockedId(null)} 
                    className="text-xs underline font-semibold cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              <form onSubmit={handleLockInstaEntry} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t.pasteInstaLink} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="url"
                      required
                      value={reelUrl}
                      onChange={(e) => setReelUrl(e.target.value)}
                      placeholder={t.instaPlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t.yourInstaHandle} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      placeholder="@your_instagram_handle"
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.videoCaption}
                  </label>
                  <input
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="e.g. Shopping at Reliance Digital & Miraj Cinemas evening vibes! #TCCAmravati"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{t.contestEndsNotice}</span>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white shadow-md hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>{t.lockEntryBtn}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Community Reels Feed / Leaderboard */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>{language === 'mr' ? 'सध्याच्या टॉप रील एन्ट्रीज' : 'Current Top Trending Reels'}</span>
                </h3>
                <span className="text-xs text-slate-500">
                  {instaSubmissions.length} {language === 'mr' ? 'नोंदी' : 'Locked Submissions'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {instaSubmissions.map((sub, index) => (
                  <div
                    key={sub.id}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all space-y-3 relative overflow-hidden"
                  >
                    {/* Locked Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={sub.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&auto=format&fit=crop&q=80'}
                          alt={sub.userName}
                          className="w-8 h-8 rounded-full object-cover border border-rose-500"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[120px]">
                            {sub.userName}
                          </p>
                          <p className="text-[10px] text-rose-500 font-semibold font-mono">
                            {sub.handle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                        <Lock className="w-3 h-3" />
                        <span>LOCKED</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                      {sub.caption}
                    </p>

                    {/* Stats & Chit Ticket */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-rose-500 font-bold text-[11px]">
                          <Heart className="w-3.5 h-3.5 fill-rose-500" />
                          {sub.likes.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-bold text-[11px]">
                          <MessageCircle className="w-3.5 h-3.5" />
                          {sub.comments}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-md">
                        {sub.ticketId}
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MY WALLET & LUCKY DRAW CHITS */}
      {activeContestTab === 'mywallet' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {t.myRewards}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {language === 'mr'
                    ? 'आपण जिंकलेली सर्व स्क्रॅच गिफ्ट्स आणि लकी ड्रॉ तिकिटे'
                    : 'All scratch coupons, movie tickets, and registered lucky draw slips'}
                </p>
              </div>

              {/* Print My Chits */}
              <button
                onClick={() => onViewPrintableChits('all')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white hover:bg-indigo-600 text-xs font-bold transition-all shadow-xs"
              >
                <Ticket className="w-4 h-4 text-amber-400" />
                <span>{language === 'mr' ? 'माझ्या लकी ड्रॉ स्लिप्स प्रिंट करा' : 'Print My Lucky Draw Slips'}</span>
              </button>
            </div>

            {/* Chits List */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                {language === 'mr' ? 'माझ्या अधिकृत लकी ड्रॉ चिट्स' : 'My Official Lucky Draw Chits'} ({user.luckyDrawChits.length})
              </h3>

              {user.luckyDrawChits.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  No lucky draw chits yet. Check-in daily or post a reel to get chits!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {user.luckyDrawChits.map((chit) => (
                    <div
                      key={chit.chitId}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-dashed border-amber-400/50 shadow-sm relative space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                          {chit.contestType === 'visit_scratch' ? 'STORE VISIT CHIT' : 'INSTA REEL CHIT'}
                        </span>
                        <span className="text-xs font-mono font-black text-rose-500">
                          #{chit.chitId}
                        </span>
                      </div>

                      <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                        {chit.contestTitle}
                      </p>

                      <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5 pt-1 border-t border-slate-100 dark:border-slate-700">
                        <p><span className="font-semibold text-slate-700 dark:text-slate-300">Shopper:</span> {chit.userName}</p>
                        <p><span className="font-semibold text-slate-700 dark:text-slate-300">Phone:</span> {chit.userPhone}</p>
                        <p className="text-[9px] font-mono text-slate-400">Barcode: {chit.barcode}</p>
                      </div>

                      {/* Perforation visual notches */}
                      <div className="absolute -left-2 top-1/2 w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-900" />
                      <div className="absolute -right-2 top-1/2 w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-900" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Scratch Cards won */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                {language === 'mr' ? 'जिंकलेली स्क्रॅच बक्षीसे' : 'Scratch Gifts Won'} ({user.scratchCardsWon.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {user.scratchCardsWon.map((card) => (
                  <div key={card.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{card.rewardValue}</p>
                      <p className="text-[10px] text-slate-500">{card.title}</p>
                      <p className="text-[9px] font-mono text-amber-500 font-bold mt-1">CODE: {card.couponCode}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
