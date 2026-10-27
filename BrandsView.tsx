import React, { useState } from 'react';
import { Brand, Language } from '../types';
import { MALL_BRANDS } from '../data/mockData';
import { translations } from '../data/translations';
import { 
  Building2, Tag, Clock, Star, MapPin, Sparkles, Filter, Search, 
  ExternalLink, ShoppingBag, Film, Utensils, Smartphone, ShoppingCart
} from 'lucide-react';

interface BrandsViewProps {
  language: Language;
  isDark: boolean;
  onToggleDark: () => void;
  onSelectBrand?: (brand: Brand) => void;
  onGoToCinema: () => void;
  onGoToSnacks: () => void;
  onOpenAndroidInstall?: () => void;
}

export const BrandsView: React.FC<BrandsViewProps> = ({
  language,
  isDark,
  onToggleDark,
  onGoToCinema,
  onGoToSnacks,
  onOpenAndroidInstall
}) => {
  const t = translations[language];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFloor, setSelectedFloor] = useState<string>('all');

  const categories = [
    { id: 'all', label: t.allCategories, icon: Building2 },
    { id: 'fashion', label: t.catFashion, icon: ShoppingBag },
    { id: 'cinema', label: t.catCinema, icon: Film },
    { id: 'food', label: t.catFood, icon: Utensils },
    { id: 'electronics', label: t.catElectronics, icon: Smartphone },
    { id: 'lifestyle', label: 'Hypermarket & Home', icon: ShoppingCart },
  ];

  const filteredBrands = MALL_BRANDS.filter((brand) => {
    const matchesCat = selectedCategory === 'all' || brand.category === selectedCategory;
    const matchesFloor = selectedFloor === 'all' || brand.floor.toLowerCase().includes(selectedFloor.toLowerCase());
    const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          brand.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          brand.discountOffer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesFloor && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* Visual Header with dynamic Day / Night view of Tapadia City Centre */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 min-h-[240px] sm:min-h-[300px] flex items-end transition-all duration-700">
        <img
          key={isDark ? 'night-view' : 'day-view'}
          src={isDark ? '/assets/aistudio/contact_59441e07.jpg' : '/assets/aistudio/tcc_96e8618e.jpg'}
          alt={isDark ? 'Tapadia City Centre Mall Night View' : 'Tapadia City Centre Mall Day View'}
          className="absolute inset-0 w-full h-full object-cover opacity-85 transition-opacity duration-700 animate-fadeIn"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        
        {/* Top Right Day / Night View Switch Controls right on the Mall photo */}
        <div className="absolute top-4 right-4 z-20 flex items-center bg-black/60 backdrop-blur-md p-1 rounded-2xl border border-white/20 shadow-xl">
          <button
            onClick={() => { if (isDark) onToggleDark(); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              !isDark
                ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>☀️</span>
            <span>{t.dayView}</span>
          </button>
          <button
            onClick={() => { if (!isDark) onToggleDark(); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isDark
                ? 'bg-gradient-to-r from-indigo-500 to-rose-500 text-white shadow-md font-black'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <span>🌙</span>
            <span>{t.nightView}</span>
          </button>
        </div>

        <div className="relative z-10 p-6 sm:p-8 w-full max-w-4xl space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Badnera Road, Amravati</span>
            </span>

            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border ${
              isDark
                ? 'bg-indigo-900/60 text-indigo-200 border-indigo-400/40'
                : 'bg-amber-500/40 text-amber-100 border-amber-300/40'
            }`}>
              <span>{isDark ? '🌙 TCC Night Illumination' : '☀️ TCC Daytime View'}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.exploreBrands}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 max-w-2xl font-normal leading-relaxed">
            {language === 'mr'
              ? 'अमरावतीच्या सर्वात मोठ्या मॉलमध्ये ६०+ अग्रगण्य राष्ट्रीय व आंतरराष्ट्रीय ब्रँड्स, मिराज सिनेमाज् आणि फूड कोर्ट एकाच छताखाली!'
              : 'Amravati\'s biggest mall featuring 60+ top retail brands, Miraj Cinemas 4K multiplex, and multi-cuisine Food Court under one roof.'}
          </p>
        </div>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 shadow-sm space-y-3.5">
        
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'mr' ? 'ब्रँड, स्टोअर किंवा ऑफर शोधा...' : 'Search brand, store or festive offer...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 dark:text-white"
            />
          </div>

          {/* Quick Floor filter dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-slate-500">{t.locateStore}:</span>
            <select
              value={selectedFloor}
              onChange={(e) => setSelectedFloor(e.target.value)}
              className="px-3 py-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="all">All Floors</option>
              <option value="Lower Ground">Lower Ground (SMART)</option>
              <option value="Ground">Ground Floor</option>
              <option value="1st">1st Floor</option>
              <option value="2nd">2nd Floor</option>
              <option value="3rd">3rd Floor (Cinema & Food)</option>
            </select>
          </div>
        </div>

        {/* Categories Tab Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow-md scale-102 font-bold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Brands Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBrands.map((brand) => (
          <div
            key={brand.id}
            className="group glass-panel rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between border border-slate-200/80 dark:border-slate-800/80"
          >
            {/* Store Top Preview */}
            <div className="relative h-40 overflow-hidden bg-slate-900">
              <img
                src={brand.bannerImg}
                alt={brand.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              
              {/* Floor badge & Rating */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-black/60 text-white backdrop-blur-md border border-white/10 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  {brand.floor}
                </span>

                <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-amber-500 text-slate-950 flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 fill-slate-950" />
                  {brand.rating}
                </span>
              </div>

              {/* Brand Logo & Name overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-white text-slate-950 flex items-center justify-center text-xl shadow-lg border border-slate-200 shrink-0">
                  {brand.logo}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors drop-shadow-sm">
                    {brand.name}
                  </h3>
                  <p className="text-[11px] text-slate-300 truncate max-w-[200px]">
                    {brand.tagline}
                  </p>
                </div>
              </div>
            </div>

            {/* Store Body Details */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              
              {/* Festive offer callout */}
              <div className="p-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-950/20 border border-amber-500/20 flex items-center gap-2 text-xs">
                <Tag className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="font-semibold text-amber-900 dark:text-amber-200 truncate">
                  {brand.discountOffer}
                </span>
              </div>

              {/* Timings */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {brand.openHours}
                </span>
                <span className="text-emerald-500 font-semibold">Open Today</span>
              </div>

              {/* Action Buttons based on category */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                {brand.id === 'miraj-cinemas' ? (
                  <button
                    onClick={onGoToCinema}
                    className="w-full py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-rose-500 text-white hover:from-amber-600 hover:to-rose-600 shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Film className="w-3.5 h-3.5" />
                    <span>{t.bookTickets}</span>
                  </button>
                ) : brand.category === 'food' ? (
                  <button
                    onClick={onGoToSnacks}
                    className="w-full py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-rose-500 to-indigo-600 text-white hover:from-rose-600 hover:to-indigo-600 shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Utensils className="w-3.5 h-3.5" />
                    <span>{t.seatSnacksTitle}</span>
                  </button>
                ) : (
                  <div className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-center">
                    Visit {brand.floor} for Festive Sale
                  </div>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
