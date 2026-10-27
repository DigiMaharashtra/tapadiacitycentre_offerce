import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App.tsx';
import './index.css';

// Automatically register service worker for Android PWA installation and offline caching
registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(<App />);
