import React, { useState } from 'react';
import { Snack, CartSnackItem, Language, UserProfile } from '../types';
import { SNACKS_MENU } from '../data/mockData';
import { translations } from '../data/translations';
import { fireConfetti } from '../utils/confetti';
import { 
  UtensilsCrossed, Plus, Minus, CheckCircle2, Clock, MapPin, 
  Sparkles, ShoppingBag, ArrowRight, ShieldCheck, Heart
} from 'lucide-react';

interface FoodCourtViewProps {
  language: Language;
  user: UserProfile;
  onOpenAuth: () => void;
}

export const FoodCourtView: React.FC<FoodCourtViewProps> = ({
  language,
  user,
  onOpenAuth
}) => {
  const t = translations[language];

  const [cart, setCart] = useState<CartSnackItem[]>([
    { snack: SNACKS_MENU[0], quantity: 1 },
    { snack: SNACKS_MENU[2], quantity: 1 }
  ]);
  const [selectedAudi, setSelectedAudi] = useState<string>('Audi 1 (Dolby Atmos)');
  const [selectedSeat, setSelectedSeat] = useState<string>('Seat E-5');
  const [deliveryType, setDeliveryType] = useState<'seat' | 'lounge'>('seat');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(1);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'popcorn', label: 'Fresh Popcorn' },
    { id: 'bites', label: 'Hot Bites & Nachos' },
    { id: 'drinks', label: 'Chilled Drinks' }
  ];

  const addToCart = (snack: Snack) => {
    const existing = cart.find((item) => item.snack.id === snack.id);
    if (existing) {
      setCart(cart.map((item) =>
        item.snack.id === snack.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { snack, quantity: 1 }]);
    }
  };

  const removeFromCart = (snackId: string) => {
    const existing = cart.find((item) => item.snack.id === snackId);
    if (!existing) return;
    if (existing.quantity === 1) {
      setCart(cart.filter((item) => item.snack.id !== snackId));
    } else {
      setCart(cart.map((item) =>
        item.snack.id === snackId ? { ...item, quantity: item.quantity - 1 } : item
      ));
    }
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.snack.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    if (!user.isLoggedIn) {
      onOpenAuth();
      return;
    }
    if (cart.length === 0) return;

    setOrderSuccess(true);
    fireConfetti({ count: 60 });

    // Simulate real-time seat delivery progression
    setActiveStep(1);
    setTimeout(() => setActiveStep(2), 2500);
    setTimeout(() => setActiveStep(3), 5000);
  };

  const filteredSnacks = SNACKS_MENU.filter((s) => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 via-amber-500 to-indigo-600 text-white flex items-center justify-center text-3xl shadow-lg shrink-0">
            🍿
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-500 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DIRECT IN-SEAT DELIVERY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {t.seatSnacksTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              {t.seatSnacksDesc}
            </p>
          </div>
        </div>

        {/* Location / Seat Selector Box */}
        <div className="w-full md:w-auto p-3.5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <div className="flex items-center justify-between gap-4 text-xs font-bold text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1.5 text-amber-500">
              <MapPin className="w-4 h-4" />
              {t.selectAudiAndSeat}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <select
              value={selectedAudi}
              onChange={(e) => setSelectedAudi(e.target.value)}
              className="px-2.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="Audi 1 (Dolby Atmos)">Audi 1</option>
              <option value="Audi 2 (Laser 4K)">Audi 2</option>
              <option value="Audi 3 (Prime)">Audi 3</option>
              <option value="Audi 4">Audi 4</option>
              <option value="Food Lounge Table">Food Lounge</option>
            </select>

            <input
              type="text"
              value={selectedSeat}
              onChange={(e) => setSelectedSeat(e.target.value)}
              placeholder="e.g. Seat E-5"
              className="px-2.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Menu & Cart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Snacks List */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Categories Tab Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === c.id
                    ? 'bg-amber-500 text-slate-950 shadow-md scale-102'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Snacks Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredSnacks.map((snack) => {
              const inCart = cart.find((item) => item.snack.id === snack.id);
              const displayName = language === 'mr' && snack.nameMr ? snack.nameMr : snack.name;

              return (
                <div
                  key={snack.id}
                  className="glass-panel rounded-2xl p-4 flex gap-4 items-center justify-between hover:shadow-lg transition-all group"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                    <img
                      src={snack.image}
                      alt={snack.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" title="Veg" />
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {displayName}
                      </h4>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2">
                      {snack.desc}
                    </p>
                    <p className="text-sm font-extrabold text-amber-600 dark:text-amber-400">
                      ₹{snack.price}
                    </p>
                  </div>

                  <div className="shrink-0">
                    {inCart ? (
                      <div className="flex items-center gap-2 bg-amber-500/10 p-1 rounded-xl border border-amber-500/30">
                        <button
                          onClick={() => removeFromCart(snack.id)}
                          className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold hover:bg-amber-600 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-extrabold text-slate-900 dark:text-white px-1">
                          {inCart.quantity}
                        </span>
                        <button
                          onClick={() => addToCart(snack)}
                          className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold hover:bg-amber-600 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(snack)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all shadow-xs cursor-pointer"
                      >
                        {t.addSnack} +
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right: Cart & Live Delivery Tracker */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel rounded-3xl p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-rose-500" />
                <span>{t.snackCart}</span>
              </h3>
              <span className="text-xs font-semibold text-slate-500">
                {cart.length} items
              </span>
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                Your tray is empty. Add hot popcorn or cold beverages!
              </div>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.snack.id} className="flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">{item.snack.name}</p>
                      <p className="text-[10px] text-slate-400">₹{item.snack.price} × {item.quantity}</p>
                    </div>
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      ₹{item.snack.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Direct In-Seat Delivery Fee:</span>
                <span className="text-emerald-500 font-bold">FREE (Festive Offer)</span>
              </div>
              <div className="flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white">
                <span>{t.totalPayable}:</span>
                <span className="text-xl font-black text-amber-600 dark:text-amber-400">
                  ₹{totalAmount}
                </span>
              </div>
            </div>

            {/* Delivery destination summary */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                Delivering to: <span className="text-amber-500 font-bold">{selectedAudi} • {selectedSeat}</span>
              </p>
              <p className="text-[10px] text-slate-400">
                Estimated arrival: 6-8 minutes right into your cinema seat
              </p>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={cart.length === 0}
              className="w-full py-3 rounded-2xl font-bold text-xs bg-gradient-to-r from-rose-500 via-amber-500 to-indigo-600 text-white shadow-xl hover:shadow-2xl active:scale-97 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.orderInstant} (₹{totalAmount})</span>
            </button>

            {/* Live Order Status Animation */}
            {orderSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3 animate-fadeIn">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Order Dispatched to {selectedSeat}!</span>
                </div>

                <div className="space-y-2 text-[11px]">
                  <div className={`flex items-center gap-2 ${activeStep >= 1 ? 'text-emerald-500 font-bold' : 'text-slate-400'}`}>
                    <span className="w-2 h-2 rounded-full bg-current" />
                    <span>1. Kitchen Preparing Fresh Hot Popcorn & Snacks</span>
                  </div>
                  <div className={`flex items-center gap-2 ${activeStep >= 2 ? 'text-emerald-500 font-bold' : 'text-slate-400'}`}>
                    <span className="w-2 h-2 rounded-full bg-current" />
                    <span>2. Delivery Partner Entering {selectedAudi}</span>
                  </div>
                  <div className={`flex items-center gap-2 ${activeStep >= 3 ? 'text-emerald-500 font-bold' : 'text-slate-400'}`}>
                    <span className="w-2 h-2 rounded-full bg-current" />
                    <span>3. Delivered at {selectedSeat}! Enjoy your show!</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
