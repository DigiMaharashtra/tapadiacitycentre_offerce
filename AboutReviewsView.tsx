import React, { useState } from 'react';
import { Review, Language, UserProfile } from '../types';
import { translations } from '../data/translations';
import { 
  Building, Star, MapPin, Clock, Phone, Mail, MessageSquare, 
  ThumbsUp, Send, CheckCircle2, ShieldCheck, Heart
} from 'lucide-react';

interface AboutReviewsViewProps {
  language: Language;
  user: UserProfile;
  reviews: Review[];
  onAddReview: (review: Review) => void;
  onOpenAuth: () => void;
}

export const AboutReviewsView: React.FC<AboutReviewsViewProps> = ({
  language,
  user,
  reviews,
  onAddReview,
  onOpenAuth
}) => {
  const t = translations[language];

  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [storeTag, setStoreTag] = useState<string>('Tapadia City Centre Mall');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.isLoggedIn) {
      onOpenAuth();
      return;
    }
    if (!comment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      userName: user.name,
      userAvatar: user.avatar,
      rating,
      date: 'Today, 27 Oct 2026',
      storeTag,
      comment: comment.trim(),
      likes: 1,
      isApproved: true // approved for demo
    };

    onAddReview(newRev);
    setComment('');
    setSubmittedMessage(true);
    setTimeout(() => setSubmittedMessage(false), 3000);
  };

  const approvedReviews = reviews.filter((r) => r.isApproved);

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* Mall Hero Showcase */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold">
              <Building className="w-3.5 h-3.5" />
              <span>AMRAVATI'S BIGGEST DESTINATION</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.aboutMall}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.aboutMallDesc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{t.mallAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{t.timings}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Customer Desk: +91 721 266 8800</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>support@tapadiacitycentre.com</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <img
              src="/assets/aistudio/1656843776665_b8ea28b8.jpg"
              alt="TCC Architecture"
              className="w-full h-36 sm:h-44 object-cover rounded-2xl shadow-md hover:scale-102 transition-transform"
            />
            <img
              src="/assets/aistudio/contact_59441e07.jpg"
              alt="TCC Night View"
              className="w-full h-36 sm:h-44 object-cover rounded-2xl shadow-md hover:scale-102 transition-transform"
            />
          </div>

        </div>
      </div>

      {/* Customer Reviews & Submission */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Reviews Feed */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-500" />
              <span>{t.customerReviews}</span>
            </h2>
            <span className="text-xs text-slate-500">
              {approvedReviews.length} {language === 'mr' ? 'अभिप्राय' : 'Verified Reviews'}
            </span>
          </div>

          <div className="space-y-4">
            {approvedReviews.map((rev) => (
              <div
                key={rev.id}
                className="glass-panel rounded-2xl p-4 sm:p-5 space-y-3 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80'}
                      alt={rev.userName}
                      className="w-9 h-9 rounded-full object-cover border border-amber-500"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {rev.userName}
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        {rev.date} • {rev.storeTag}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400' : 'text-slate-300 dark:text-slate-700'}`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {rev.comment}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-rose-500 font-semibold">
                    <Heart className="w-3.5 h-3.5 fill-rose-500" />
                    {rev.likes} found helpful
                  </span>
                  <span className="text-emerald-500 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Shopper
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Review Form */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel rounded-3xl p-6 sm:p-7 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {t.writeReview}
            </h3>

            {submittedMessage && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  {language === 'mr' ? 'आपला अभिप्राय यशस्वीरित्या पाठवला गेला आहे!' : 'Thank you! Your review has been submitted.'}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star className={`w-6 h-6 ${star <= rating ? 'fill-amber-400' : 'text-slate-300 dark:text-slate-700'}`} />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 ml-2">
                    {rating} / 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Store / Section Visited
                </label>
                <select
                  value={storeTag}
                  onChange={(e) => setStoreTag(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="Tapadia City Centre Mall">General Mall Experience</option>
                  <option value="Miraj Cinemas">Miraj Cinemas (3rd Floor)</option>
                  <option value="Reliance SMART">Reliance SMART Bazaar</option>
                  <option value="Pantaloons">Pantaloons Fashion</option>
                  <option value="Reliance Digital">Reliance Digital</option>
                  <option value="Masti Zone">Masti Zone Game Arcade</option>
                  <option value="Food Court">TCC Food Court</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Your Feedback / Experience
                </label>
                <textarea
                  rows={4}
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share details of your shopping, cinema or dining experience at Tapadia City Centre..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-md hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t.submitReview}</span>
              </button>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
};
