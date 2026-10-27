import React, { useState } from 'react';
import { Movie, CinemaBooking, Language, UserProfile, Snack } from '../types';
import { MOVIES_LIST, SNACKS_MENU } from '../data/mockData';
import { translations } from '../data/translations';
import { fireConfetti } from '../utils/confetti';
import { 
  Film, Clock, Calendar, Star, CheckCircle2, Ticket, Sparkles, 
  ChevronRight, ArrowLeft, Utensils, QrCode, Printer
} from 'lucide-react';

interface CinemaViewProps {
  language: Language;
  user: UserProfile;
  onBookingConfirmed: (booking: CinemaBooking) => void;
  onOpenAuth: () => void;
}

export const CinemaView: React.FC<CinemaViewProps> = ({
  language,
  user,
  onBookingConfirmed,
  onOpenAuth
}) => {
  const t = translations[language];

  const [selectedMovie, setSelectedMovie] = useState<Movie>(MOVIES_LIST[0]);
  const [selectedShowtime, setSelectedShowtime] = useState<string>(MOVIES_LIST[0].showtimes[1]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>(['E-5', 'E-6']);
  const [currentStep, setCurrentStep] = useState<'movie' | 'seats' | 'ticket'>('movie');
  const [completedBooking, setCompletedBooking] = useState<CinemaBooking | null>(null);

  // Generate interactive seat grid (Rows A through F, columns 1 through 10)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const toggleSeat = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      if (selectedSeats.length >= 6) return;
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const getSeatTier = (row: string): 'recliner' | 'gold' | 'silver' => {
    if (row === 'F') return 'recliner';
    if (row === 'D' || row === 'E') return 'gold';
    return 'silver';
  };

  const calculateTotal = () => {
    return selectedSeats.reduce((acc, seatId) => {
      const row = seatId.split('-')[0];
      const tier = getSeatTier(row);
      if (tier === 'recliner') return acc + selectedMovie.priceRecliner;
      if (tier === 'gold') return acc + selectedMovie.priceGold;
      return acc + selectedMovie.priceSilver;
    }, 0);
  };

  const handleConfirmBooking = () => {
    if (!user.isLoggedIn) {
      onOpenAuth();
      return;
    }

    if (selectedSeats.length === 0) return;

    const bookingCode = `MIRAJ-TCC-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking: CinemaBooking = {
      id: `bk-${Date.now()}`,
      bookingCode,
      movieId: selectedMovie.id,
      movieTitle: selectedMovie.title,
      audi: selectedMovie.audi,
      showtime: selectedShowtime,
      date: 'Today, 27 Oct 2026',
      seats: selectedSeats,
      snacks: [],
      totalAmount: calculateTotal(),
      userName: user.name,
      userPhone: user.phone,
      seatDelivery: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      qrCodeText: `TCC-MIRAJ|${bookingCode}|${selectedSeats.join(',')}`
    };

    setCompletedBooking(newBooking);
    onBookingConfirmed(newBooking);
    setCurrentStep('ticket');
    fireConfetti({ count: 80 });
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* Multiplex Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-600 text-white flex items-center justify-center text-3xl shadow-lg shrink-0">
            🎬
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                TAPADIA CITY CENTRE • 3RD FLOOR
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500">
                DOLBY ATMOS
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {t.bookTickets}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t.bookTicketsDesc}
            </p>
          </div>
        </div>

        {currentStep === 'seats' && (
          <button
            onClick={() => setCurrentStep('movie')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors self-start md:self-center"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Change Movie</span>
          </button>
        )}
      </div>

      {/* STEP 1: Movie Picker */}
      {currentStep === 'movie' && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Film className="w-5 h-5 text-amber-500" />
            <span>{t.nowShowing}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOVIES_LIST.map((movie) => {
              const isSelected = selectedMovie.id === movie.id;
              const displayTitle = language === 'mr' && movie.titleMr ? movie.titleMr : movie.title;

              return (
                <div
                  key={movie.id}
                  onClick={() => {
                    setSelectedMovie(movie);
                    setSelectedShowtime(movie.showtimes[0]);
                  }}
                  className={`group glass-panel rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between border-2 ${
                    isSelected
                      ? 'border-amber-500 shadow-xl ring-2 ring-amber-500/20'
                      : 'border-transparent hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
                  }`}
                >
                  <div className="relative h-64 overflow-hidden bg-slate-900">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-md">
                        {movie.certificate}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-slate-950" />
                        {movie.rating}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-[11px] font-semibold text-amber-400">
                        {movie.genre}
                      </p>
                      <h3 className="text-base font-extrabold text-white leading-tight">
                        {displayTitle}
                      </h3>
                      <p className="text-[10px] text-slate-300 mt-0.5">
                        {movie.duration} • {movie.language}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {language === 'mr' ? 'शो टाईम्स निवडा' : 'Select Showtime'}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {movie.showtimes.map((st) => (
                          <button
                            key={st}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMovie(movie);
                              setSelectedShowtime(st);
                            }}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                              isSelected && selectedShowtime === st
                                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMovie(movie);
                        setCurrentStep('seats');
                      }}
                      className="w-full py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-rose-600 text-white hover:from-amber-600 hover:to-rose-600 shadow-md active:scale-98 transition-all flex items-center justify-center gap-1"
                    >
                      <span>{t.selectSeats}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 2: Interactive Seat Picker & Booking Summary */}
      {currentStep === 'seats' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Interactive Audi layout */}
            <div className="lg:col-span-8 glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {selectedMovie.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedMovie.audi} • {selectedShowtime} • Today 27 Oct 2026
                  </p>
                </div>

                {/* Tier legend */}
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1 text-slate-500">
                    <span className="w-3.5 h-3.5 rounded bg-slate-200 dark:bg-slate-700" />
                    {t.silverTier} (₹{selectedMovie.priceSilver})
                  </span>
                  <span className="flex items-center gap-1 text-amber-500 font-semibold">
                    <span className="w-3.5 h-3.5 rounded bg-amber-500/40 border border-amber-500" />
                    {t.goldTier} (₹{selectedMovie.priceGold})
                  </span>
                  <span className="flex items-center gap-1 text-rose-500 font-bold">
                    <span className="w-3.5 h-3.5 rounded bg-rose-500" />
                    {t.reclinerTier} (₹{selectedMovie.priceRecliner})
                  </span>
                </div>
              </div>

              {/* Curved Cinema Screen Bar */}
              <div className="py-4 text-center">
                <div className="w-3/4 mx-auto h-2 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full shadow-[0_8px_20px_rgba(245,158,11,0.5)]" />
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">
                  {t.screenSide}
                </p>
              </div>

              {/* Seat Matrix */}
              <div className="space-y-3 max-w-lg mx-auto py-2">
                {rows.map((row) => {
                  const tier = getSeatTier(row);
                  return (
                    <div key={row} className="flex items-center justify-center gap-1.5 sm:gap-2">
                      <span className="w-4 text-xs font-bold text-slate-400 text-center">
                        {row}
                      </span>

                      <div className="flex items-center gap-1 sm:gap-1.5">
                        {columns.map((col) => {
                          const seatId = `${row}-${col}`;
                          const isSelected = selectedSeats.includes(seatId);
                          const isBooked = (row === 'C' && col === 5) || (row === 'D' && col === 4);

                          let seatColor = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-400 border border-slate-200 dark:border-slate-700';
                          if (tier === 'recliner') seatColor = 'border-rose-500/60 bg-rose-500/10 text-rose-600 dark:text-rose-300 font-semibold';
                          if (tier === 'gold') seatColor = 'border-amber-500/60 bg-amber-500/10 text-amber-700 dark:text-amber-300';
                          if (isSelected) seatColor = 'bg-gradient-to-tr from-amber-500 to-rose-600 text-white font-bold shadow-md scale-105 border-transparent';
                          if (isBooked) seatColor = 'bg-slate-300 dark:bg-slate-800/40 text-slate-400 cursor-not-allowed opacity-40';

                          return (
                            <button
                              key={seatId}
                              disabled={isBooked}
                              onClick={() => toggleSeat(seatId)}
                              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[10px] flex items-center justify-center transition-all cursor-pointer ${seatColor}`}
                              title={`${seatId} (${tier.toUpperCase()})`}
                            >
                              {col}
                            </button>
                          );
                        })}
                      </div>

                      <span className="w-4 text-xs font-bold text-slate-400 text-center">
                        {row}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span>
                  {language === 'mr'
                    ? 'थिएटर सीटवर थेट गरमागरम स्नॅक्स मागवण्याची सोय उपलब्ध आहे!'
                    : 'Instant popcorn and snacks delivery is available directly to your seat!'}
                </span>
              </div>
            </div>

            {/* Right: Checkout & Ticket Summary Panel */}
            <div className="lg:col-span-4 glass-panel rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
                  {language === 'mr' ? 'तिकीट सारांश' : 'Booking Summary'}
                </h3>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.audi}:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{selectedMovie.audi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Showtime:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{selectedShowtime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.selectedSeats}:</span>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                      {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Seats:</span>
                    <span className="font-bold">{selectedSeats.length} Tickets</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{t.totalPayable}:</span>
                  <span className="text-2xl font-black text-amber-600 dark:text-amber-400">
                    ₹{calculateTotal()}
                  </span>
                </div>

                {/* Free Lucky Draw Chit Banner */}
                <div className="p-3 rounded-xl bg-gradient-to-r from-rose-500/10 to-amber-500/10 border border-rose-500/30 text-xs text-rose-700 dark:text-rose-300 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Bonus Toyota Lucky Chit Included!</span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    This booking automatically enters you into the Grand Festive Draw.
                  </p>
                </div>
              </div>

              <button
                onClick={handleConfirmBooking}
                disabled={selectedSeats.length === 0}
                className="w-full py-3.5 rounded-2xl font-extrabold text-sm bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white shadow-xl hover:shadow-2xl active:scale-97 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{t.confirmBooking} (₹{calculateTotal()})</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* STEP 3: Confirmed Ticket Pass */}
      {currentStep === 'ticket' && completedBooking && (
        <div className="max-w-md mx-auto space-y-6">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-500/40 bg-white dark:bg-slate-900 p-6 space-y-6">
            
            {/* Top Brand Banner */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <img
                  src="/assets/aistudio/image_dcb98a6d.png"
                  alt="TCC"
                  className="w-9 h-9 object-contain"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Miraj Cinemas</h4>
                  <p className="text-[10px] text-amber-500 font-semibold">Tapadia City Centre, Amravati</p>
                </div>
              </div>
              <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                CONFIRMED PASS
              </span>
            </div>

            {/* Movie Info */}
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{selectedMovie.audi}</p>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">{completedBooking.movieTitle}</h3>
              <p className="text-xs text-slate-500 font-medium">
                {completedBooking.date} • {completedBooking.showtime}
              </p>
            </div>

            {/* Seats Grid highlight */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Seats Booked</p>
                <p className="text-lg font-black text-amber-600 dark:text-amber-400">
                  {completedBooking.seats.join(', ')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Amount Paid</p>
                <p className="text-lg font-black text-slate-900 dark:text-white">
                  ₹{completedBooking.totalAmount}
                </p>
              </div>
            </div>

            {/* QR / Barcode */}
            <div className="text-center py-2 space-y-2">
              <div className="w-24 h-24 mx-auto p-2 bg-white rounded-xl shadow-md border border-slate-200 flex items-center justify-center">
                <QrCode className="w-20 h-20 text-slate-900" />
              </div>
              <p className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 tracking-wider">
                {completedBooking.bookingCode}
              </p>
              <p className="text-[10px] text-slate-400 max-w-xs mx-auto">
                {t.showAtCounter}
              </p>
            </div>

            {/* Perforations */}
            <div className="relative border-t-2 border-dashed border-slate-200 dark:border-slate-700 pt-4 flex items-center justify-between text-xs text-slate-500">
              <div className="absolute -left-8 -top-3 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-950" />
              <div className="absolute -right-8 -top-3 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-950" />
              <span>Guest: {completedBooking.userName}</span>
              <span>Phone: {completedBooking.userPhone}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Ticket</span>
              </button>
              <button
                onClick={() => setCurrentStep('movie')}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Book Another Show</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
