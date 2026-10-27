import React, { useState, useEffect } from 'react';
import { 
  Language, UserProfile, InstagramSubmission, Review, LuckyChit, CinemaBooking, ScratchCard 
} from './types';
import { 
  INITIAL_INSTA_SUBMISSIONS, INITIAL_REVIEWS, INITIAL_LUCKY_CHITS, SCRATCH_REWARDS_POOL 
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { AuthModal } from './components/AuthModal';
import { BrandsView } from './components/BrandsView';
import { CinemaView } from './components/CinemaView';
import { FoodCourtView } from './components/FoodCourtView';
import { ContestsView } from './components/ContestsView';
import { WinterPhotoBooth } from './components/WinterPhotoBooth';
import { AboutReviewsView } from './components/AboutReviewsView';
import { AdminPortal } from './components/AdminPortal';
import { PrintableChitsModal } from './components/PrintableChitsModal';
import { BarcodeScannerModal } from './components/BarcodeScannerModal';
import { AndroidInstallModal } from './components/AndroidInstallModal';
import { OfflineIndicator } from './components/OfflineIndicator';

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('tcc_theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('tcc_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('tcc_theme', 'light');
    }
  }, [isDark]);

  // Language state (default English, switchable to Marathi or Hindi)
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('tcc_lang') as Language;
    return saved && ['en', 'mr', 'hi'].includes(saved) ? saved : 'en';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('tcc_lang', lang);
  };

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<string>('brands');

  // Customer Profile state
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('tcc_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    // Default initial guest/customer
    return {
      id: 'usr-101',
      name: 'Balkurashna Tapase',
      email: 'balkurashnatapase@gmail.com',
      phone: '+91 98223 45678',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      isLoggedIn: true,
      totalVisits: 3,
      visitSteps: 3,
      visitHistory: [
        {
          id: 'step-101',
          stepNumber: 3,
          date: '27/10/2026',
          timestamp: '10:05 AM',
          barcodeToken: 'TCC-VISIT-0B92A',
          location: 'Main Mall Entrance (Badnera Rd)',
          rewardEarned: 'FLAT ₹500 OFF',
          chitId: 'TCC-SCR-10499'
        }
      ],
      lastVisitDate: '26/10/2026',
      walletBalance: 750,
      scratchCardsWon: [
        {
          id: 'scr-welcome-1',
          date: '27/10/2026',
          title: '₹500 Pantaloons Shopping Voucher',
          rewardValue: 'FLAT ₹500 OFF',
          couponCode: 'TCC-PAN-500-8841',
          isScratched: false,
          unlockedAt: '10:00 AM',
          iconType: 'shopping'
        }
      ],
      luckyDrawChits: [
        {
          chitId: 'TCC-SCR-10499',
          contestType: 'visit_scratch',
          contestTitle: 'Daily Store Visit Lucky Draw (Toyota Hyryder)',
          userName: 'Balkurashna Tapase',
          userPhone: '+91 98223 45678',
          userEmail: 'balkurashnatapase@gmail.com',
          timestamp: '2026-10-27 10:05 AM',
          barcode: 'TCC10499HYRYDER',
          serialNumber: 1009
        }
      ],
      instagramSubmissions: []
    };
  });

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => {
      const next = { ...prev, ...updated };
      localStorage.setItem('tcc_user', JSON.stringify(next));
      return next;
    });
  };

  const handleLogout = () => {
    handleUpdateUser({
      isLoggedIn: false,
      name: 'Guest Shopper',
      email: '',
      phone: '+91 98000 00000'
    });
  };

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isBarcodeScannerOpen, setIsBarcodeScannerOpen] = useState(false);
  const [isAndroidModalOpen, setIsAndroidModalOpen] = useState(false);
  const [printFilterType, setPrintFilterType] = useState<'all' | 'daily' | 'insta'>('all');

  // Instagram submissions
  const [instaSubmissions, setInstaSubmissions] = useState<InstagramSubmission[]>(() => {
    const saved = localStorage.getItem('tcc_insta');
    return saved ? JSON.parse(saved) : INITIAL_INSTA_SUBMISSIONS;
  });

  const handleAddInstaSubmission = (newSub: InstagramSubmission) => {
    setInstaSubmissions((prev) => {
      const next = [newSub, ...prev];
      localStorage.setItem('tcc_insta', JSON.stringify(next));
      return next;
    });
  };

  // Lucky Draw Chits Pool
  const [luckyChits, setLuckyChits] = useState<LuckyChit[]>(() => {
    const saved = localStorage.getItem('tcc_chits');
    return saved ? JSON.parse(saved) : INITIAL_LUCKY_CHITS;
  });

  useEffect(() => {
    localStorage.setItem('tcc_chits', JSON.stringify(luckyChits));
  }, [luckyChits]);

  // Keep user lucky chits synced to all lucky chits
  useEffect(() => {
    if (user.luckyDrawChits && user.luckyDrawChits.length > 0) {
      setLuckyChits((prev) => {
        const existingIds = new Set(prev.map((c) => c.chitId));
        const toAdd = user.luckyDrawChits.filter((c) => !existingIds.has(c.chitId));
        if (toAdd.length > 0) {
          return [...toAdd, ...prev];
        }
        return prev;
      });
    }
  }, [user.luckyDrawChits]);

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('tcc_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const handleAddReview = (newRev: Review) => {
    setReviews((prev) => {
      const next = [newRev, ...prev];
      localStorage.setItem('tcc_reviews', JSON.stringify(next));
      return next;
    });
  };

  const handleApproveReview = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isApproved: true } : r))
    );
  };

  const handleDeleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  // Cinema Booking confirmation handler
  const handleBookingConfirmed = (booking: CinemaBooking) => {
    // Generate an automatic grand lucky draw chit for movie bookings too!
    const chitId = `TCC-CINEMA-${Math.floor(1000 + Math.random() * 9000)}`;
    const newChit: LuckyChit = {
      chitId,
      contestType: 'cinema_booking',
      contestTitle: `Miraj Cinemas Movie Pass (${booking.movieTitle})`,
      userName: booking.userName,
      userPhone: booking.userPhone,
      userEmail: user.email,
      timestamp: `${booking.date} ${booking.showtime}`,
      barcode: `${chitId}CINEMA`,
      serialNumber: 3000 + (luckyChits.length + 1)
    };

    handleUpdateUser({
      luckyDrawChits: [newChit, ...user.luckyDrawChits]
    });
  };

  const handleOpenPrintModal = (type: 'all' | 'daily' | 'insta') => {
    setPrintFilterType(type);
    setIsPrintModalOpen(true);
  };

  const unscratchedCount = user.scratchCardsWon.filter((c) => !c.isScratched).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Top Navbar */}
      <Navbar
        language={language}
        setLanguage={handleSetLanguage}
        isDark={isDark}
        setIsDark={setIsDark}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onOpenAdmin={() => setActiveTab('admin')}
        onOpenAndroidInstall={() => setIsAndroidModalOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 lg:pb-12">
        {activeTab === 'brands' && (
          <BrandsView
            language={language}
            isDark={isDark}
            onToggleDark={() => setIsDark(!isDark)}
            onGoToCinema={() => setActiveTab('movies')}
            onGoToSnacks={() => setActiveTab('snacks')}
            onOpenAndroidInstall={() => setIsAndroidModalOpen(true)}
          />
        )}

        {activeTab === 'movies' && (
          <CinemaView
            language={language}
            user={user}
            onBookingConfirmed={handleBookingConfirmed}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {activeTab === 'snacks' && (
          <FoodCourtView
            language={language}
            user={user}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {activeTab === 'rewards' && (
          <ContestsView
            language={language}
            user={user}
            onUpdateUser={handleUpdateUser}
            instaSubmissions={instaSubmissions}
            onAddInstaSubmission={handleAddInstaSubmission}
            onOpenAuth={() => setIsAuthOpen(true)}
            onViewPrintableChits={handleOpenPrintModal}
            onOpenBarcodeScanner={() => setIsBarcodeScannerOpen(true)}
          />
        )}

        {activeTab === 'camera' && (
          <WinterPhotoBooth
            language={language}
            user={user}
            onShareToContest={(photoUrl) => {
              setActiveTab('rewards');
            }}
          />
        )}

        {activeTab === 'about' && (
          <AboutReviewsView
            language={language}
            user={user}
            reviews={reviews}
            onAddReview={handleAddReview}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {activeTab === 'admin' && (
          <AdminPortal
            language={language}
            onClose={() => setActiveTab('brands')}
            instaSubmissions={instaSubmissions}
            reviews={reviews}
            luckyChits={luckyChits}
            onApproveReview={handleApproveReview}
            onDeleteReview={handleDeleteReview}
            onOpenPrintModal={handleOpenPrintModal}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        onOpenAdmin={() => setActiveTab('admin')}
        unscratchedCount={unscratchedCount}
        onOpenAndroidInstall={() => setIsAndroidModalOpen(true)}
      />

      {/* Auth / Profile Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        language={language}
        user={user}
        onSaveProfile={handleUpdateUser}
      />

      {/* Printable Lucky Draw Chits Modal */}
      <PrintableChitsModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        chits={luckyChits}
        filterType={printFilterType}
        language={language}
      />

      {/* 60-Second Dynamic Barcode Scanner Modal */}
      <BarcodeScannerModal
        isOpen={isBarcodeScannerOpen}
        onClose={() => setIsBarcodeScannerOpen(false)}
        language={language}
        user={user}
        onStepAdded={handleUpdateUser}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Android App Install & APK Modal */}
      <AndroidInstallModal
        isOpen={isAndroidModalOpen}
        onClose={() => setIsAndroidModalOpen(false)}
        lang={language}
      />

      {/* PWA Offline Indicator */}
      <OfflineIndicator lang={language} />
    </div>
  );
}
