export type Language = 'en' | 'mr' | 'hi';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  isLoggedIn: boolean;
  totalVisits: number;
  visitSteps: number;
  visitHistory: VisitStepRecord[];
  lastVisitDate?: string;
  walletBalance: number;
  scratchCardsWon: ScratchCard[];
  luckyDrawChits: LuckyChit[];
  instagramSubmissions: InstagramSubmission[];
}

export interface Brand {
  id: string;
  name: string;
  category: 'fashion' | 'cinema' | 'food' | 'electronics' | 'entertainment' | 'lifestyle';
  floor: string;
  tagline: string;
  logo: string;
  bannerImg: string;
  rating: number;
  openHours: string;
  discountOffer: string;
  isPopular?: boolean;
}

export interface Movie {
  id: string;
  title: string;
  titleMr?: string;
  titleHi?: string;
  genre: string;
  language: string;
  certificate: string;
  duration: string;
  rating: number;
  poster: string;
  banner: string;
  description: string;
  audi: string;
  showtimes: string[];
  priceSilver: number;
  priceGold: number;
  priceRecliner: number;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  tier: 'silver' | 'gold' | 'recliner';
  price: number;
  isBooked?: boolean;
  isSelected?: boolean;
}

export interface Snack {
  id: string;
  name: string;
  nameMr: string;
  nameHi: string;
  category: 'popcorn' | 'combos' | 'drinks' | 'bites';
  price: number;
  image: string;
  desc: string;
  isVeg: boolean;
  rating: number;
}

export interface CartSnackItem {
  snack: Snack;
  quantity: number;
}

export interface CinemaBooking {
  id: string;
  bookingCode: string;
  movieId: string;
  movieTitle: string;
  audi: string;
  showtime: string;
  date: string;
  seats: string[];
  snacks: CartSnackItem[];
  totalAmount: number;
  userName: string;
  userPhone: string;
  seatDelivery: boolean;
  timestamp: string;
  qrCodeText: string;
}

export interface ScratchCard {
  id: string;
  date: string;
  title: string;
  rewardValue: string;
  couponCode: string;
  isScratched: boolean;
  unlockedAt: string;
  iconType: 'voucher' | 'ticket' | 'snack' | 'shopping' | 'car';
}

export interface InstagramSubmission {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  reelUrl: string;
  handle: string;
  caption: string;
  submittedAt: string;
  likes: number;
  comments: number;
  isLocked: boolean;
  ticketId: string;
  verified: boolean;
  status: 'active' | 'winner' | 'runner_up';
}

export interface LuckyChit {
  chitId: string;
  contestType: 'visit_scratch' | 'insta_contest' | 'cinema_booking';
  contestTitle: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  timestamp: string;
  barcode: string;
  serialNumber: number;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  storeTag?: string;
  comment: string;
  likes: number;
  isApproved: boolean;
}

export interface CapturedPhoto {
  id: string;
  dataUrl: string;
  filter: string;
  sticker: string;
  caption: string;
  timestamp: string;
}

export interface VisitStepRecord {
  id: string;
  stepNumber: number;
  date: string;
  timestamp: string;
  barcodeToken: string;
  location: string;
  rewardEarned: string;
  chitId: string;
}

export interface DynamicBarcodeToken {
  code: string;
  token: string;
  checkpoint: string;
  generatedAt: number;
  expiresInSeconds: number;
  seed: string;
}

