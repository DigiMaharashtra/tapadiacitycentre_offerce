import React, { useRef, useState, useEffect } from 'react';
import { Language, UserProfile } from '../types';
import { translations } from '../data/translations';
import { fireConfetti } from '../utils/confetti';
import { Camera, RefreshCw, Download, Sparkles, Snowflake, Share2, Upload, AlertCircle } from 'lucide-react';

interface WinterPhotoBoothProps {
  language: Language;
  user: UserProfile;
  onShareToContest: (dataUrl: string) => void;
}

export const WinterPhotoBooth: React.FC<WinterPhotoBoothProps> = ({
  language,
  onShareToContest
}) => {
  const t = translations[language];
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'snow' | 'golden' | 'carnival'>('carnival');
  const [cameraError, setCameraError] = useState<string | null>(null);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
        audio: false
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
    } catch (err: any) {
      setCameraError('Camera access unavailable. You can upload a photo to apply winter frames!');
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const drawFestiveOverlay = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const grad = ctx.createRadialGradient(width / 2, height / 2, width * 0.35, width / 2, height / 2, width * 0.7);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
    grad.addColorStop(1, 'rgba(56, 189, 248, 0.4)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    for (let i = 0; i < 50; i++) {
      const sx = (Math.sin(i * 47) * 0.5 + 0.5) * width;
      const sy = (Math.cos(i * 83) * 0.5 + 0.5) * height;
      ctx.beginPath();
      ctx.arc(sx, sy, Math.random() * 4 + 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
    ctx.fillRect(0, 0, width, 50);
    ctx.font = 'bold 18px sans-serif';
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('❄️ TAPADIA CITY CENTRE ❄️', 20, 32);

    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(0, height - 55, width, 55);
    ctx.textAlign = 'left';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('📍 Badnera Road, Amravati', 20, height - 22);

    ctx.textAlign = 'right';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#ec4899';
    ctx.fillText('Official Contest Photo #TCCWinter2026', width - 20, height - 22);
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, width, height);
    ctx.restore();

    drawFestiveOverlay(ctx, width, height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setCapturedImage(dataUrl);
    fireConfetti({ count: 50 });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        drawFestiveOverlay(ctx, img.width, img.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        setCapturedImage(dataUrl);
        fireConfetti({ count: 50 });
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-400 via-indigo-500 to-rose-500 text-white flex items-center justify-center text-3xl shadow-lg shrink-0">
            📸
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-500 text-xs font-bold">
              <Snowflake className="w-3.5 h-3.5" />
              <span>AMRAVATI WINTER BOOTH</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {t.winterCamTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              {t.winterCamDesc}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveFilter('carnival')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold ${activeFilter === 'carnival' ? 'bg-rose-500 text-white' : 'text-slate-500'}`}
          >
            🎡 Carnival
          </button>
          <button
            onClick={() => setActiveFilter('snow')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold ${activeFilter === 'snow' ? 'bg-sky-500 text-white' : 'text-slate-500'}`}
          >
            ❄️ Snow
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
        {capturedImage ? (
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/50 bg-black">
              <img src={capturedImage} alt="Winter Selfie" className="w-full h-auto object-contain max-h-[440px] mx-auto" />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setCapturedImage(null)}
                className="flex-1 py-3 rounded-xl font-bold text-xs bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t.retake}</span>
              </button>
              <a
                href={capturedImage}
                download="TCC_Winter_Selfie.jpg"
                className="flex-1 py-3 rounded-xl font-bold text-xs bg-amber-500 text-slate-950 flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.savePhoto}</span>
              </a>
              <button
                onClick={() => onShareToContest(capturedImage)}
                className="flex-1 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-rose-500 to-indigo-600 text-white flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{t.shareToInsta}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700 bg-black min-h-[300px] flex items-center justify-center">
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-auto object-cover transform -scale-x-100 max-h-[420px]" />
              {cameraError && (
                <div className="absolute inset-0 bg-slate-900/90 p-6 flex flex-col items-center justify-center text-center space-y-3">
                  <AlertCircle className="w-10 h-10 text-amber-500" />
                  <p className="text-xs text-slate-300 max-w-sm">{cameraError}</p>
                  <label className="cursor-pointer px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Mall Photo</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              )}
            </div>
            <canvas ref={canvasRef} className="hidden" />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleCapture}
                className="w-full sm:w-auto px-10 py-3.5 rounded-2xl font-black text-sm bg-gradient-to-r from-sky-400 via-rose-500 to-amber-500 text-white shadow-xl active:scale-95 flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" />
                <span>{t.takePhoto}</span>
              </button>
              <label className="cursor-pointer px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" />
                <span>Upload Photo</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
