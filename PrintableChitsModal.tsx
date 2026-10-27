import React from 'react';
import { LuckyChit, Language } from '../types';
import { Printer, X, Sparkles, Scissors, CheckCircle2 } from 'lucide-react';

interface PrintableChitsModalProps {
  isOpen: boolean;
  onClose: () => void;
  chits: LuckyChit[];
  filterType: 'all' | 'daily' | 'insta';
  language: Language;
}

export const PrintableChitsModal: React.FC<PrintableChitsModalProps> = ({
  isOpen,
  onClose,
  chits,
  filterType,
  language
}) => {
  if (!isOpen) return null;

  const filteredChits = chits.filter((chit) => {
    if (filterType === 'daily') return chit.contestType === 'visit_scratch';
    if (filterType === 'insta') return chit.contestType === 'insta_contest';
    return true;
  });

  const handlePrint = () => {
    window.print();
  };

  const title = filterType === 'daily' 
    ? 'Daily Store Visit Lucky Draw Chits (27/10/2026 - 08/11/2026)' 
    : filterType === 'insta' 
    ? 'Instagram Reel Contest Lucky Draw Chits' 
    : 'All Combined Grand Lucky Draw Chits';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Modal Top Bar (Hidden when printing) */}
        <div className="no-print p-4 sm:p-6 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                OFFICIAL PRINT ENGINE
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                {filteredChits.length} Coupons Ready
              </span>
            </div>
            <h2 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 active:scale-95 transition-all shadow-md cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print All Chits Now</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div id="printable-chits-area" className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 bg-slate-100 dark:bg-slate-950">
          
          {/* Print Letterhead for physical Lucky Draw Box */}
          <div className="text-center border-b-2 border-slate-300 pb-4 space-y-1">
            <img
              src="/assets/aistudio/logo_e14c23ed.png"
              alt="Tapadia City Centre"
              className="h-10 mx-auto object-contain"
            />
            <h1 className="text-xl font-black tracking-tight text-slate-900">
              TAPADIA CITY CENTRE • AMRAVATI
            </h1>
            <p className="text-xs font-bold text-slate-600">
              Badnera Road, Amravati — Official Lucky Draw Coupons for Drum Box
            </p>
            <p className="text-[11px] font-semibold text-rose-600">
              {title} • Generated on 27/10/2026
            </p>
          </div>

          {/* Grid of Individual Lucky Draw Chits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredChits.map((chit, idx) => (
              <div
                key={chit.chitId}
                className="relative bg-white text-slate-900 rounded-xl p-4 border-2 border-dashed border-slate-400 shadow-xs flex flex-col justify-between space-y-3"
                style={{ breakInside: 'avoid' }}
              >
                {/* Perforation Cut Icon */}
                <div className="absolute -top-3 left-6 flex items-center gap-1 bg-white px-2 text-[9px] text-slate-400 font-mono">
                  <Scissors className="w-3 h-3 text-slate-400" />
                  <span>CUT ALONG DOTTED LINE</span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <img
                      src="/assets/aistudio/image_dcb98a6d.png"
                      alt="TCC"
                      className="w-7 h-7 object-contain"
                    />
                    <div>
                      <p className="text-xs font-black tracking-tight text-slate-900">TAPADIA CITY CENTRE</p>
                      <p className="text-[9px] text-slate-500 font-semibold">Amravati Mall Rewards</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono font-black text-rose-600 px-2 py-0.5 rounded bg-rose-50 border border-rose-200">
                      CHIT #{chit.chitId}
                    </span>
                    <p className="text-[8px] font-mono text-slate-400 mt-0.5">SL NO: #{chit.serialNumber}</p>
                  </div>
                </div>

                {/* Participant Details */}
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500">Contest:</span>
                    <span className="font-bold text-slate-900 text-right">{chit.contestTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500">Participant Name:</span>
                    <span className="font-black text-slate-900">{chit.userName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500">Mobile Number:</span>
                    <span className="font-mono font-bold text-slate-900">{chit.userPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500">Timestamp:</span>
                    <span className="text-slate-600 font-mono text-[10px]">{chit.timestamp}</span>
                  </div>
                </div>

                {/* Barcode & Stamp */}
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px]">
                  <div>
                    {/* Simulated SVG Barcode */}
                    <div className="flex items-center gap-0.5 h-6">
                      {Array.from({ length: 32 }).map((_, bIdx) => (
                        <span
                          key={bIdx}
                          className="bg-slate-900 inline-block h-full"
                          style={{
                            width: (bIdx % 3 === 0 ? '3px' : bIdx % 2 === 0 ? '2px' : '1px'),
                            marginRight: (bIdx % 4 === 0 ? '2px' : '1px')
                          }}
                        />
                      ))}
                    </div>
                    <p className="font-mono text-[8px] text-slate-500 mt-0.5 tracking-widest">{chit.barcode}</p>
                  </div>

                  <div className="text-right flex flex-col items-end">
                    <div className="border border-emerald-600 text-emerald-700 font-bold px-2 py-0.5 rounded text-[9px] uppercase tracking-wider">
                      ★ TCC OFFICIAL SEAL ★
                    </div>
                    <p className="text-[8px] text-slate-400 mt-0.5">Drop into Lucky Draw Drum</p>
                  </div>
                </div>

                {/* Perforation circle punches */}
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-950" />
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-950" />
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
