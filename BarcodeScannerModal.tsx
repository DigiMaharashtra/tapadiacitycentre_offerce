import React, { useRef, useState, useEffect } from 'react';
import { Language, UserProfile, VisitStepRecord, ScratchCard, LuckyChit } from '../types';
import { translations } from '../data/translations';
import { getActive60SecBarcodeToken, verifyBarcodeToken } from '../utils/barcodeGenerator';
import { SCRATCH_REWARDS_POOL } from '../data/mockData';
import { fireConfetti } from '../utils/confetti';
import { 
  Scan, X, CheckCircle2, AlertTriangle, Sparkles, Camera, 
  Clock, ArrowRight, ShieldCheck, Trophy, Ticket, Footprints
} from 'lucide-react';

interface BarcodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  user: UserProfile;
  onStepAdded: (updatedUser: Partial<UserProfile>) => void;
  onOpenAuth: () => void;
}

export const BarcodeScannerModal: React.FC<BarcodeScannerModalProps> = ({
  isOpen,
  onClose,
  language,
  user,
  onStepAdded,
  onOpenAuth
}) => {
  const t = translations[language];

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [manualCode, setManualCode] = useState('');
  const [scanStatus, setScanStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [newEarnedStep, setNewEarnedStep] = useState<VisitStepRecord | null>(null);

  // Live timer for current 60s window
  const [activeToken, setActiveToken] = useState(getActive60SecBarcodeToken());

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setActiveToken(getActive60SecBarcodeToken());
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  // Start webcam for scanning view
  useEffect(() => {
    if (!isOpen) {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
      setScanStatus('idle');
      return;
    }

    let isMounted = true;
    navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'environment' } })
      .then((mediaStream) => {
        if (isMounted) {
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
            videoRef.current.play();
          }
        }
      })
      .catch(() => {
        // Fallback gracefully to manual code or 1-click simulation
      });

    return () => {
      isMounted = false;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleProcessBarcode = (codeToVerify: string) => {
    if (!user.isLoggedIn) {
      onOpenAuth();
      return;
    }

    const verification = verifyBarcodeToken(codeToVerify);
    if (!verification.isValid) {
      setScanStatus('error');
      setErrorMessage(verification.reason || 'Invalid or expired 60-second barcode. Please scan the current code from the mall screen.');
      return;
    }

    // Successfully verified!
    const todayStr = '27/10/2026';
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const nextStepNumber = (user.visitSteps || 0) + 1;
    
    // Pick random scratch reward
    const reward = SCRATCH_REWARDS_POOL[Math.floor(Math.random() * SCRATCH_REWARDS_POOL.length)];
    const newCardId = `scr-step-${Date.now()}`;
    const newScratchCard: ScratchCard = {
      id: newCardId,
      date: todayStr,
      title: `${reward.title} (Step #${nextStepNumber} Reward)`,
      rewardValue: reward.value,
      couponCode: `${reward.code}-${Math.floor(1000 + Math.random() * 9000)}`,
      isScratched: false,
      unlockedAt: timeStr,
      iconType: reward.icon
    };

    // Generate Lucky Draw Chit
    const chitId = `TCC-STEP-${Math.floor(10000 + Math.random() * 90000)}`;
    const newChit: LuckyChit = {
      chitId,
      contestType: 'visit_scratch',
      contestTitle: `Daily Store Visit Step #${nextStepNumber} (Toyota Hyryder)`,
      userName: user.name,
      userPhone: user.phone || '+91 98223 00000',
      userEmail: user.email,
      timestamp: `${todayStr} ${timeStr}`,
      barcode: `${chitId}HYRYDER`,
      serialNumber: 1000 + (user.luckyDrawChits.length + 1)
    };

    const newRecord: VisitStepRecord = {
      id: `step-${Date.now()}`,
      stepNumber: nextStepNumber,
      date: todayStr,
      timestamp: timeStr,
      barcodeToken: codeToVerify.trim(),
      location: activeToken.checkpoint || 'Main Mall Entrance',
      rewardEarned: reward.value,
      chitId
    };

    setNewEarnedStep(newRecord);
    setScanStatus('success');

    onStepAdded({
      visitSteps: nextStepNumber,
      totalVisits: (user.totalVisits || 0) + 1,
      lastVisitDate: todayStr,
      visitHistory: [newRecord, ...(user.visitHistory || [])],
      scratchCardsWon: [newScratchCard, ...user.scratchCardsWon],
      luckyDrawChits: [newChit, ...user.luckyDrawChits]
    });

    fireConfetti({ count: 90 });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white flex items-center justify-center shadow-md">
              <Scan className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                {t.scanBarcodeBtn}
              </h3>
              <p className="text-[11px] text-slate-500">
                TCC Amravati • 60-Second Dynamic Entrance Checkpoint
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5">
          
          {scanStatus === 'success' && newEarnedStep ? (
            /* Success State */
            <div className="py-4 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  STEP #{newEarnedStep.stepNumber} RECORDED!
                </span>
                <h4 className="text-xl font-black text-slate-900 dark:text-white mt-2">
                  {t.scanSuccessTitle}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
                  {t.scanSuccessSub}
                </p>
              </div>

              {/* Reward preview pill */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-left space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-amber-700 dark:text-amber-300">New Scratch Card Unlocked:</span>
                  <span className="font-extrabold text-rose-500">{newEarnedStep.rewardEarned}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Toyota Lucky Draw Chit:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">#{newEarnedStep.chitId}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setScanStatus('idle')}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Scan Another Checkpoint
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  View My Rewards
                </button>
              </div>
            </div>
          ) : (
            /* Scanner Active State */
            <div className="space-y-4">
              
              {/* Camera Scanner Viewfinder */}
              <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden bg-black flex items-center justify-center border-2 border-slate-700 shadow-inner">
                {stream ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-6 space-y-2 text-slate-400">
                    <Camera className="w-10 h-10 mx-auto text-amber-500/60" />
                    <p className="text-xs font-semibold text-slate-300">
                      Align the mall entrance barcode within the viewfinder
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Or use the instant 1-tap checkpoint scanner below
                    </p>
                  </div>
                )}

                {/* Laser scan line animation */}
                <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
                  <div className="w-full h-0.5 bg-rose-500 shadow-[0_0_12px_#f43f5e] animate-pulse" />
                  
                  {/* Corner viewfinder brackets */}
                  <div className="flex justify-between">
                    <div className="w-6 h-6 border-t-2 border-l-2 border-amber-400 rounded-tl-lg" />
                    <div className="w-6 h-6 border-t-2 border-r-2 border-amber-400 rounded-tr-lg" />
                  </div>
                  <div className="flex justify-between">
                    <div className="w-6 h-6 border-b-2 border-l-2 border-amber-400 rounded-bl-lg" />
                    <div className="w-6 h-6 border-b-2 border-r-2 border-amber-400 rounded-br-lg" />
                  </div>
                </div>

                {/* Live 60-Sec Remaining Pill */}
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-amber-400 flex items-center gap-1.5 border border-amber-400/30">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>Admin Barcode refreshes in {activeToken.expiresInSeconds}s</span>
                </div>
              </div>

              {scanStatus === 'error' && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2 animate-shake">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Instant 1-Tap Simulation Button */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => handleProcessBarcode(activeToken.code)}
                  className="w-full py-3 rounded-2xl font-bold text-xs bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 hover:from-amber-600 hover:to-rose-600 text-white shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Scan className="w-4 h-4" />
                  <span>Simulate Instant Scan at {activeToken.checkpoint}</span>
                </button>
                <p className="text-[10px] text-center text-slate-400">
                  Active 60s Token: <span className="font-mono font-bold text-amber-500">{activeToken.code}</span> ({activeToken.expiresInSeconds}s valid)
                </p>
              </div>

              {/* Manual Input Fallback */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[11px] font-semibold text-slate-500 mb-1.5">
                  Or enter 60-second barcode code manually:
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    placeholder="e.g. TCC-VISIT-XXXXX"
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    onClick={() => handleProcessBarcode(manualCode)}
                    disabled={!manualCode.trim()}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 disabled:opacity-40 cursor-pointer"
                  >
                    Verify
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
