import { Brand, Movie, Snack, InstagramSubmission, Review, LuckyChit } from '../types';

export const MALL_BRANDS: Brand[] = [
  {
    id: 'miraj-cinemas',
    name: 'Miraj Cinemas',
    category: 'cinema',
    floor: '3rd Floor',
    tagline: 'Multiplex with Dolby Atmos & VIP Recliners',
    logo: '🎬',
    bannerImg: '/assets/aistudio/tcc_96e8618e.jpg',
    rating: 4.8,
    openHours: '09:30 AM - 11:30 PM',
    discountOffer: 'Flat 20% off on Tuesday Morning Shows',
    isPopular: true
  },
  {
    id: 'reliance-smart',
    name: 'Reliance SMART Bazaar',
    category: 'lifestyle',
    floor: 'Lower Ground',
    tagline: 'Groceries, Fresh Fruits, Home Needs at Best Prices',
    logo: '🛒',
    bannerImg: '/assets/aistudio/1656843776665_b8ea28b8.jpg',
    rating: 4.6,
    openHours: '08:00 AM - 10:00 PM',
    discountOffer: 'Buy 1 Get 1 on Festive Sweet Packs',
    isPopular: true
  },
  {
    id: 'pantaloons',
    name: 'Pantaloons',
    category: 'fashion',
    floor: '1st & 2nd Floor',
    tagline: 'Trendy Family Fashion & Ethnic Wear',
    logo: '👗',
    bannerImg: '/assets/aistudio/tcc_96e8618e.jpg',
    rating: 4.7,
    openHours: '10:00 AM - 10:00 PM',
    discountOffer: 'Shop for ₹4999 & Get ₹1000 Voucher Free',
    isPopular: true
  },
  {
    id: 'reliance-digital',
    name: 'Reliance Digital',
    category: 'electronics',
    floor: 'Ground Floor',
    tagline: 'Laptops, Smart TVs, Smartphones & Home Appliances',
    logo: '📱',
    bannerImg: '/assets/aistudio/1656843776665_b8ea28b8.jpg',
    rating: 4.9,
    openHours: '10:30 AM - 10:00 PM',
    discountOffer: 'Up to ₹10,000 Instant Cashback with HDFC/SBI',
    isPopular: true
  },
  {
    id: 'mr-diy',
    name: 'MR. D.I.Y.',
    category: 'lifestyle',
    floor: '2nd Floor',
    tagline: 'Always Low Prices for Home Improvement & Toys',
    logo: '🔧',
    bannerImg: '/assets/aistudio/contact_59441e07.jpg',
    rating: 4.6,
    openHours: '10:00 AM - 09:30 PM',
    discountOffer: 'Special Festive Decor Starting @ ₹49'
  },
  {
    id: 'masti-zone',
    name: 'Masti Zone Game Arcade',
    category: 'entertainment',
    floor: '3rd Floor',
    tagline: 'VR Games, Bowling Alley, Bumper Cars & Soft Play',
    logo: '🎯',
    bannerImg: '/assets/aistudio/contact_59441e07.jpg',
    rating: 4.9,
    openHours: '11:00 AM - 10:30 PM',
    discountOffer: 'Load ₹1000 & Get ₹500 Bonus Game Credits',
    isPopular: true
  },
  {
    id: 'trends',
    name: 'Reliance Trends',
    category: 'fashion',
    floor: 'Ground & 1st Floor',
    tagline: 'Youth & Contemporary High-Street Fashion',
    logo: '👔',
    bannerImg: '/assets/aistudio/tcc_96e8618e.jpg',
    rating: 4.5,
    openHours: '10:00 AM - 10:00 PM',
    discountOffer: 'Flat 50% Off on Selected Festive Collections'
  },
  {
    id: 'kfc',
    name: 'KFC',
    category: 'food',
    floor: '3rd Floor Food Court',
    tagline: 'Finger Lickin\' Good Chicken, Burgers & Krushers',
    logo: '🍗',
    bannerImg: '/assets/aistudio/tcc_96e8618e.jpg',
    rating: 4.6,
    openHours: '11:00 AM - 11:00 PM',
    discountOffer: 'Wednesday Bucket: 12 Pcs for ₹399'
  },
  {
    id: 'metro-shoes',
    name: 'Metro Shoes',
    category: 'fashion',
    floor: 'Ground Floor',
    tagline: 'Premium Footwear, Bags & Accessories',
    logo: '👠',
    bannerImg: '/assets/aistudio/tcc_96e8618e.jpg',
    rating: 4.7,
    openHours: '10:30 AM - 09:30 PM',
    discountOffer: 'Buy 2 Pairs & Get 15% Additional Discount'
  },
  {
    id: 'montaditos-cafe',
    name: '100 Montaditos & Street Cafe',
    category: 'food',
    floor: 'Plaza & Food Court',
    tagline: 'Artisanal Spanish Bites, Coffee & Shakes',
    logo: '☕',
    bannerImg: '/assets/aistudio/tcc_96e8618e.jpg',
    rating: 4.5,
    openHours: '11:00 AM - 10:30 PM',
    discountOffer: 'Combo for 2: 4 Montaditos + 2 Cold Coffees @ ₹299'
  }
];

export const MOVIES_LIST: Movie[] = [
  {
    id: 'singham-again',
    title: 'Singham Again',
    titleMr: 'सिंघम अगेन',
    titleHi: 'सिंघम अगेन',
    genre: 'Action / Cop Thriller',
    language: 'Hindi (with English Subtitles)',
    certificate: 'UA 16+',
    duration: '2h 44m',
    rating: 4.8,
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=80',
    banner: '/assets/aistudio/tcc_96e8618e.jpg',
    description: 'Bajirao Singham returns in an epic multi-city mission featuring high-voltage action sequences filmed across the globe.',
    audi: 'Audi 1 (Dolby Atmos 7.1)',
    showtimes: ['10:45 AM', '01:45 PM', '04:50 PM', '08:00 PM', '10:55 PM'],
    priceSilver: 180,
    priceGold: 260,
    priceRecliner: 420
  },
  {
    id: 'bhool-bhulaiyaa-3',
    title: 'Bhool Bhulaiyaa 3',
    titleMr: 'भूल भुलैया ३',
    titleHi: 'भूल भुलैया 3',
    genre: 'Comedy / Horror',
    language: 'Hindi',
    certificate: 'UA 13+',
    duration: '2h 38m',
    rating: 4.7,
    poster: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=500&auto=format&fit=crop&q=80',
    banner: '/assets/aistudio/1656843776665_b8ea28b8.jpg',
    description: 'Rooh Baba enters a sinister royal palace in West Bengal where two vengeful spirits battle for supremacy.',
    audi: 'Audi 2 (Laser 4K)',
    showtimes: ['11:15 AM', '02:30 PM', '05:45 PM', '09:00 PM'],
    priceSilver: 190,
    priceGold: 280,
    priceRecliner: 450
  },
  {
    id: 'chhaava',
    title: 'Chhaava',
    titleMr: 'छावा (छत्रपती संभाजी महाराज)',
    titleHi: 'छावा',
    genre: 'Historical Epic / Drama',
    language: 'Hindi & Marathi',
    certificate: 'UA 16+',
    duration: '2h 55m',
    rating: 4.9,
    poster: 'https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?w=500&auto=format&fit=crop&q=80',
    banner: '/assets/aistudio/images_a55e1b84.jpg',
    description: 'The heroic and indomitable saga of Chhatrapati Sambhaji Maharaj, son of Chhatrapati Shivaji Maharaj.',
    audi: 'Audi 3 (Dolby Atmos Prime)',
    showtimes: ['12:00 PM', '03:15 PM', '06:30 PM', '09:45 PM'],
    priceSilver: 170,
    priceGold: 250,
    priceRecliner: 400
  },
  {
    id: 'dharmaveer-2',
    title: 'Dharmaveer 2',
    titleMr: 'धर्मवीर २ (आनंद दिघे)',
    titleHi: 'धर्मवीर 2',
    genre: 'Biographical / Political Drama',
    language: 'Marathi',
    certificate: 'UA',
    duration: '2h 32m',
    rating: 4.8,
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80',
    banner: '/assets/aistudio/contact_59441e07.jpg',
    description: 'The legacy and grassroots leadership of Anand Dighe saheb that shaped Maharashtra politics.',
    audi: 'Audi 4',
    showtimes: ['01:00 PM', '04:15 PM', '07:30 PM', '10:30 PM'],
    priceSilver: 160,
    priceGold: 230,
    priceRecliner: 380
  }
];

export const SNACKS_MENU: Snack[] = [
  {
    id: 'butter-popcorn-lg',
    name: 'Golden Butter Popcorn (Jumbo Tub)',
    nameMr: 'गोल्डन बटर पॉपकॉर्न (जम्बो टब)',
    nameHi: 'गोल्डन बटर पॉपकॉर्न (जम्बो टब)',
    category: 'popcorn',
    price: 240,
    image: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=500&auto=format&fit=crop&q=80',
    desc: 'Crispy warm corn kernels tossed in real salted butter. Delivered piping hot to your seat.',
    isVeg: true,
    rating: 4.9
  },
  {
    id: 'caramel-crunch-popcorn',
    name: 'Artisan Caramel Popcorn',
    nameMr: 'कॅरॅमल क्रंच पॉपकॉर्न',
    nameHi: 'कैरमल क्रंच पॉपकॉर्न',
    category: 'popcorn',
    price: 270,
    image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=500&auto=format&fit=crop&q=80',
    desc: 'Slow-cooked golden caramel glaze over giant mushroom corn kernels.',
    isVeg: true,
    rating: 4.8
  },
  {
    id: 'cheesy-nachos',
    name: 'Mexican Cheesy Nachos + Jalapeños',
    nameMr: 'मेक्सिकन चिझी नाचोज + साल्सा',
    nameHi: 'मैक्सिकन चीजी नाचोज + सालसा',
    category: 'bites',
    price: 220,
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=500&auto=format&fit=crop&q=80',
    desc: 'Crunchy corn tortilla chips with warm molten cheddar cheese dip and tangy salsa.',
    isVeg: true,
    rating: 4.7
  },
  {
    id: 'masala-samosa-trio',
    name: 'Crispy Amravati Masala Samosa (2 Pcs)',
    nameMr: 'अमरावती गरमागरम समोसा (२ नग)',
    nameHi: 'अमरावती मसाला समोसा (2 नग)',
    category: 'bites',
    price: 110,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&auto=format&fit=crop&q=80',
    desc: 'Flaky crust packed with spiced potatoes and peas, served with mint and tamarind chutney.',
    isVeg: true,
    rating: 4.9
  },
  {
    id: 'paneer-tikka-wrap',
    name: 'Paneer Tikka Roll / Wrap',
    nameMr: 'पनीर टिक्का रोल',
    nameHi: 'पनीर टिक्का रोल',
    category: 'bites',
    price: 180,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=500&auto=format&fit=crop&q=80',
    desc: 'Charcoal-grilled cottage cheese wrapped in roomali paratha with tandoori mayo.',
    isVeg: true,
    rating: 4.6
  },
  {
    id: 'coke-fountain-lg',
    name: 'Chilled Coca-Cola (Large 650ml)',
    nameMr: 'थंडगार कोका-कोला (लार्ज)',
    nameHi: 'ठंडा कोका-कोला (लार्ज)',
    category: 'drinks',
    price: 130,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=80',
    desc: 'Served chilled with ice crystals in a recyclable spill-proof cup.',
    isVeg: true,
    rating: 4.8
  },
  {
    id: 'cold-coffee-thick',
    name: 'Café Hazelnut Cold Coffee',
    nameMr: 'हेझलनट कोल्ड कॉफी',
    nameHi: 'हेजलनट कोल्ड कॉफी',
    category: 'drinks',
    price: 160,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&auto=format&fit=crop&q=80',
    desc: 'Creamy cold brew espresso blended with premium hazelnut cream and chocolate drizzle.',
    isVeg: true,
    rating: 4.9
  }
];

export const INITIAL_INSTA_SUBMISSIONS: InstagramSubmission[] = [
  {
    id: 'sub-1',
    userId: 'user-amr-101',
    userName: 'Rohan Deshmukh',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    reelUrl: 'https://www.instagram.com/reel/C-tccAmravatiReel1',
    handle: '@rohan_vlogs_amravati',
    caption: 'Diwali shopping at Pantaloons & evening vibes at Tapadia City Centre! #TCCAmravati #DiwaliDhamaka',
    submittedAt: '2026-10-27 11:20 AM',
    likes: 1420,
    comments: 184,
    isLocked: true,
    ticketId: 'TCC-INSTA-8841',
    verified: true,
    status: 'active'
  },
  {
    id: 'sub-2',
    userId: 'user-amr-102',
    userName: 'Pooja Kulkarni',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    reelUrl: 'https://www.instagram.com/reel/C-tccAmravatiReel2',
    handle: '@pooja_k_lifestyle',
    caption: 'Best movie experience at Miraj Cinemas TCC! Recliner seats are next level! 🍿🎬',
    submittedAt: '2026-10-27 02:45 PM',
    likes: 980,
    comments: 112,
    isLocked: true,
    ticketId: 'TCC-INSTA-8842',
    verified: true,
    status: 'active'
  },
  {
    id: 'sub-3',
    userId: 'user-amr-103',
    userName: 'Sameer Sheikh',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
    reelUrl: 'https://www.instagram.com/reel/C-tccAmravatiReel3',
    handle: '@sameer_amravati_gaming',
    caption: 'Bowling strike at Masti Zone arcade in Tapadia City Centre! Who wants to challenge me? 🎳🔥',
    submittedAt: '2026-10-27 04:10 PM',
    likes: 745,
    comments: 89,
    isLocked: true,
    ticketId: 'TCC-INSTA-8843',
    verified: true,
    status: 'active'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    userName: 'Dr. Nikhil Belsare',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    date: '25 Oct 2026',
    storeTag: 'Miraj Cinemas & Food Court',
    comment: 'The pride of Amravati! Very well maintained, top international and national brands, and Miraj Cinemas has amazing sound quality. Ample basement parking makes it hassle free.',
    likes: 38,
    isApproved: true
  },
  {
    id: 'rev-2',
    userName: 'Sneha Thakare',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    date: '26 Oct 2026',
    storeTag: 'Reliance SMART & Pantaloons',
    comment: 'Great festive atmosphere! We shop here every weekend. The scratch cards contest for Diwali is such a fun initiative. Got a ₹500 voucher on our first visit!',
    likes: 24,
    isApproved: true
  },
  {
    id: 'rev-3',
    userName: 'Amol Wankhede',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    date: '27 Oct 2026',
    storeTag: 'Masti Zone',
    comment: 'Kids love the bowling alley and VR zone. The staff is polite, hygiene is top notch. Definitely 5 stars for Amravati.',
    likes: 19,
    isApproved: true
  }
];

export const INITIAL_LUCKY_CHITS: LuckyChit[] = [
  {
    chitId: 'TCC-SCR-10491',
    contestType: 'visit_scratch',
    contestTitle: 'Daily Store Visit Lucky Draw (Toyota Hyryder)',
    userName: 'Aniket Raut',
    userPhone: '+91 98223 41021',
    userEmail: 'aniket.raut@gmail.com',
    timestamp: '2026-10-27 10:14 AM',
    barcode: 'TCC10491HYRYDER',
    serialNumber: 1001
  },
  {
    chitId: 'TCC-SCR-10492',
    contestType: 'visit_scratch',
    contestTitle: 'Daily Store Visit Lucky Draw (Toyota Hyryder)',
    userName: 'Madhuri Patil',
    userPhone: '+91 94231 87654',
    userEmail: 'madhuri.p@yahoo.com',
    timestamp: '2026-10-27 11:30 AM',
    barcode: 'TCC10492HYRYDER',
    serialNumber: 1002
  },
  {
    chitId: 'TCC-INSTA-8841',
    contestType: 'insta_contest',
    contestTitle: 'Instagram Reel Contest (Mega Tech Hamper)',
    userName: 'Rohan Deshmukh',
    userPhone: '+91 97654 32109',
    userEmail: 'rohan.desh@gmail.com',
    timestamp: '2026-10-27 11:20 AM',
    barcode: 'TCC8841INSTA',
    serialNumber: 2001
  },
  {
    chitId: 'TCC-SCR-10493',
    contestType: 'visit_scratch',
    contestTitle: 'Daily Store Visit Lucky Draw (Toyota Hyryder)',
    userName: 'Sunil Agrawal',
    userPhone: '+91 98901 12345',
    userEmail: 'sunil.agrawal@gmail.com',
    timestamp: '2026-10-27 01:15 PM',
    barcode: 'TCC10493HYRYDER',
    serialNumber: 1003
  },
  {
    chitId: 'TCC-INSTA-8842',
    contestType: 'insta_contest',
    contestTitle: 'Instagram Reel Contest (Mega Tech Hamper)',
    userName: 'Pooja Kulkarni',
    userPhone: '+91 99701 44556',
    userEmail: 'pooja.kulkarni@gmail.com',
    timestamp: '2026-10-27 02:45 PM',
    barcode: 'TCC8842INSTA',
    serialNumber: 2002
  }
];

export const SCRATCH_REWARDS_POOL = [
  { title: '₹500 Pantaloons Shopping Voucher', value: 'FLAT ₹500 OFF', code: 'TCC-PAN-500', icon: 'shopping' as const },
  { title: 'Free Movie Ticket @ Miraj Cinemas', value: '1 FREE TICKET', code: 'TCC-MIR-FREE', icon: 'ticket' as const },
  { title: 'Jumbo Caramel Popcorn Tub Free', value: 'FREE POPCORN', code: 'TCC-POP-FREE', icon: 'snack' as const },
  { title: '₹1000 Reliance Digital Electronics Voucher', value: '₹1,000 DISCOUNT', code: 'TCC-DIGI-1K', icon: 'voucher' as const },
  { title: 'Grand Toyota Hyryder Lucky Draw Ticket', value: 'GOLDEN CHIT ENTRY', code: 'TCC-TOYOTA-LUCKY', icon: 'car' as const },
  { title: '50% Off Game Card @ Masti Zone', value: '50% BONUS PLAY', code: 'TCC-MASTI-50', icon: 'voucher' as const }
];

export const DAILY_FOOTFALL_STATS = [
  { day: 'Mon 20/10', visitors: 6420, contestEntries: 410 },
  { day: 'Tue 21/10', visitors: 6890, contestEntries: 460 },
  { day: 'Wed 22/10', visitors: 7120, contestEntries: 520 },
  { day: 'Thu 23/10', visitors: 8340, contestEntries: 640 },
  { day: 'Fri 24/10', visitors: 11200, contestEntries: 980 },
  { day: 'Sat 25/10', visitors: 16800, contestEntries: 1420 },
  { day: 'Sun 26/10', visitors: 19400, contestEntries: 1890 },
  { day: 'Today (27/10)', visitors: 9850, contestEntries: 870 }
];
