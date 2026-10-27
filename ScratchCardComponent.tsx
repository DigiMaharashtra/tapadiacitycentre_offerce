import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ScratchCard } from '../types';
import { fireConfetti } from '../utils/confetti';
import { Trophy, Check, Copy, Car } from 'lucide-react';

interface ScratchCardComponentProps {
  card: ScratchCard;
  onScratchedComplete: (cardId: string) => void;
  language: string;
}

export const ScratchCardComponent: React.FC<ScratchCardComponentProps> = ({
  card,
  onScratchedComplete,
  language
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScratchedLocal, setIsScratchedLocal] = useState(card.isScratched);
  const [scratchPercent, setScratchPercent] = useState(card.isScratched ? 100 : 0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [copied, setCopied] = useState(false);

  const initFoil = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || card.isScratched) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 320;
    const height = rect.height || 180;

    canvas.width = width;
    canvas.height = height;

    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#c7d2fe');
    grad.addColorStop(0.2, '#94a3b8');
    grad.addColorStop(0.5, '#e2e8f0');
    grad.addColorStop(0.8, '#64748b');
    grad.addColorStop(1, '#cbd5e1');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 35; i++) {
      const rx = (Math.sin(i * 99) * 0.5 + 0.5) * width;
      const ry = (Math.cos(i * 33) * 0.5 + 0.5) * height;
      ctx.beginPath();
      ctx.arc(rx, ry, Math.random() * 3 + 1, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.font = 'bold 15px sans-serif';
    ctx.fillStyle = '#1e293b';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ TAPADIA CITY CENTRE ✨', width / 2, height / 2 - 20);
    
    ctx.font = '600 12px sans-serif';
    ctx.fillStyle = '#475569';
    ctx.fillText(
      language === 'mr' ? 'बक्षीस पाहण्यासाठी येथे स्क्रॅच करा 👆' : 'Rub or Scratch with finger to reveal! 👆',
      width / 2,
      height / 2 + 10
    );

    ctx.font = 'bold 10px sans-serif';
    ctx.fillStyle = '#b45309';
    ctx.fillText('27 OCT - 08 NOV 2026 MEGA CARNIVAL', width / 2, height / 2 + 35);
  }, [card.isScratched, language]);

  useEffect(() => {
    initFoil();
  }, [initFoil]);

  const calculateScratch = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isScratchedLocal) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    let transparentPixels = 0;
    const step = 24;
    for (let i = 3; i < data.length; i += step * 4) {
      if (data[i] === 0) {
        transparentPixels++;
      }
    }

    const totalSamples = data.length / (step * 4);
    const percent = Math.round((transparentPixels / totalSamples) * 100);
    setScratchPercent(percent);

    if (percent > 38 && !isScratchedLocal) {
      setIsScratchedLocal(true);
      setScratchPercent(100);
      fireConfetti({ count: 70 });
      onScratchedComplete(card.id);
    }
  }, [isScratchedLocal, card.id, onScratchedComplete]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isScratchedLocal) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    calculateScratch();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(card.couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-sm mx-auto h-48 rounded-2xl overflow-hidden shadow-xl border-2 border-amber-400/40 select-none bg-gradient-to-br from-amber-500 via-rose-500 to-indigo-700 p-1"
    >
      <div className="w-full h-full bg-white dark:bg-slate-900 rounded-xl p-4 flex flex-col justify-between items-center text-center relative overflow-hidden">
        <div className="w-full flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 text-xs font-bold">
            <Trophy className="w-4 h-4" />
            <span>TCC AMRAVATI</span>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
            {card.date}
          </span>
        </div>

        <div className="z-10 my-1">
          {card.iconType === 'car' ? (
            <div className="inline-flex items-center gap-1 text-xs font-black px-2 py-0.5 rounded-md bg-rose-600 text-white mb-1">
              <Car className="w-3.5 h-3.5" />
              TOYOTA HYRYDER SPECIAL
            </div>
          ) : null}
          <h3 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600 bg-clip-text text-transparent">
            {card.rewardValue}
          </h3>
          <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 mt-0.5">
            {card.title}
          </p>
        </div>

        <div className="w-full flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 z-10">
          <div className="text-left">
            <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Coupon Code</p>
            <p className="text-xs font-mono font-bold text-slate-900 dark:text-amber-300 tracking-wider">
              {card.couponCode}
            </p>
          </div>
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 active:scale-95 transition-all cursor-pointer shadow-xs"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-950" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Redeem'}</span>
          </button>
        </div>
      </div>

      {!isScratchedLocal && (
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="scratch-canvas absolute inset-0 w-full h-full rounded-2xl z-20 cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'none' }}
        />
      )}

      {!isScratchedLocal && scratchPercent > 5 && (
        <div className="absolute top-2 right-2 z-30 pointer-events-none">
          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-950/80 text-amber-300 backdrop-blur-xs">
            {scratchPercent}% scratched
          </span>
        </div>
      )}
    </div>
  );
};
