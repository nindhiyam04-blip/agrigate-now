/**
 * AgriLink global app store.
 * Holds demo (client-side) state: session, language, theme, crops,
 * orders, transport requests and notifications. No backend — this is a
 * fully interactive UI prototype persisted in localStorage.
 */
/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Role = "farmer" | "dealer" | "driver";
export type Lang = "en" | "ta";

export interface SessionUser {
  name: string;
  email: string;
  phone: string;
  role: Role;
  location: string;
  avatar: string;
}

export interface Crop {
  id: string;
  name: string;
  nameTa: string;
  quantity: number;
  unit: "kg" | "ton";
  price: number;
  harvestDate: string;
  location: string;
  farmer: string;
  phone: string;
  rating: number;
  image: string;
  status: "available" | "sold";
}

export interface Order {
  id: string;
  crop: string;
  buyer: string;
  seller: string;
  quantity: string;
  amount: number;
  payment: "paid" | "pending" | "escrow";
  delivery: "preparing" | "in-transit" | "delivered";
  date: string;
}

export interface TransportRequest {
  id: string;
  crop: string;
  from: string;
  to: string;
  distanceKm: number;
  weight: string;
  payout: number;
  status: "open" | "accepted" | "rejected" | "delivered";
  farmerPhone: string;
  dealerPhone: string;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const CROP_IMAGES = [
  "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=70",
];

const seedCrops: Crop[] = [
  {
    id: "c1",
    name: "Paddy (Ponni Rice)",
    nameTa: "பொன்னி நெல்",
    quantity: 12,
    unit: "ton",
    price: 28,
    harvestDate: "2026-07-12",
    location: "Thanjavur, TN",
    farmer: "Murugan S.",
    phone: "+91 98400 11223",
    rating: 4.8,
    image: CROP_IMAGES[0],
    status: "available",
  },
  {
    id: "c2",
    name: "Tomato",
    nameTa: "தக்காளி",
    quantity: 850,
    unit: "kg",
    price: 22,
    harvestDate: "2026-07-20",
    location: "Hosur, TN",
    farmer: "Lakshmi R.",
    phone: "+91 90031 55480",
    rating: 4.6,
    image: CROP_IMAGES[1],
    status: "available",
  },
  {
    id: "c3",
    name: "Banana (Nendran)",
    nameTa: "நேந்திரன் வாழை",
    quantity: 2400,
    unit: "kg",
    price: 34,
    harvestDate: "2026-07-18",
    location: "Theni, TN",
    farmer: "Arun K.",
    phone: "+91 88254 77109",
    rating: 4.9,
    image: CROP_IMAGES[2],
    status: "available",
  },
  {
    id: "c4",
    name: "Groundnut",
    nameTa: "நிலக்கடலை",
    quantity: 6,
    unit: "ton",
    price: 62,
    harvestDate: "2026-08-02",
    location: "Tiruvannamalai, TN",
    farmer: "Selvi M.",
    phone: "+91 99529 30012",
    rating: 4.4,
    image: CROP_IMAGES[3],
    status: "available",
  },
  {
    id: "c5",
    name: "Sugarcane",
    nameTa: "கரும்பு",
    quantity: 18,
    unit: "ton",
    price: 3.2,
    harvestDate: "2026-07-28",
    location: "Erode, TN",
    farmer: "Bala P.",
    phone: "+91 93441 20087",
    rating: 4.2,
    image: CROP_IMAGES[4],
    status: "available",
  },
  {
    id: "c6",
    name: "Onion (Small)",
    nameTa: "சின்ன வெங்காயம்",
    quantity: 1200,
    unit: "kg",
    price: 48,
    harvestDate: "2026-07-15",
    location: "Perambalur, TN",
    farmer: "Kavitha N.",
    phone: "+91 87540 66321",
    rating: 4.7,
    image: CROP_IMAGES[5],
    status: "available",
  },
];

const seedOrders: Order[] = [
  {
    id: "ORD-2291",
    crop: "Tomato",
    buyer: "Green Valley Traders",
    seller: "Lakshmi R.",
    quantity: "400 kg",
    amount: 8800,
    payment: "paid",
    delivery: "delivered",
    date: "2026-07-18",
  },
  {
    id: "ORD-2304",
    crop: "Paddy (Ponni Rice)",
    buyer: "Sri Annapoorna Mills",
    seller: "Murugan S.",
    quantity: "4 ton",
    amount: 112000,
    payment: "escrow",
    delivery: "in-transit",
    date: "2026-07-22",
  },
  {
    id: "ORD-2311",
    crop: "Banana (Nendran)",
    buyer: "FreshCart Wholesale",
    seller: "Arun K.",
    quantity: "900 kg",
    amount: 30600,
    payment: "pending",
    delivery: "preparing",
    date: "2026-07-25",
  },
];

const seedRequests: TransportRequest[] = [
  {
    id: "TR-501",
    crop: "Paddy (Ponni Rice)",
    from: "Thanjavur",
    to: "Trichy Mandi",
    distanceKm: 58,
    weight: "4 ton",
    payout: 4200,
    status: "open",
    farmerPhone: "+91 98400 11223",
    dealerPhone: "+91 90876 33221",
  },
  {
    id: "TR-502",
    crop: "Tomato",
    from: "Hosur",
    to: "Bengaluru Market",
    distanceKm: 42,
    weight: "800 kg",
    payout: 2100,
    status: "open",
    farmerPhone: "+91 90031 55480",
    dealerPhone: "+91 90876 33221",
  },
  {
    id: "TR-498",
    crop: "Onion (Small)",
    from: "Perambalur",
    to: "Chennai Koyambedu",
    distanceKm: 268,
    weight: "1.2 ton",
    payout: 9800,
    status: "delivered",
    farmerPhone: "+91 87540 66321",
    dealerPhone: "+91 90876 33221",
  },
];

const seedNotifications: AppNotification[] = [
  {
    id: "n1",
    title: "Payment released",
    body: "₹8,800 for ORD-2291 has been credited to your account.",
    time: "2h ago",
    read: false,
  },
  {
    id: "n2",
    title: "New transport request",
    body: "TR-502 Hosur → Bengaluru Market, 800 kg.",
    time: "5h ago",
    read: false,
  },
  {
    id: "n3",
    title: "Weather alert",
    body: "Light showers expected in Thanjavur on Tue. Cover harvested stock.",
    time: "1d ago",
    read: true,
  },
];

/** Minimal EN/TA dictionary for the multi-language toggle. */
const dict: Record<string, { en: string; ta: string }> = {
  "nav.about": { en: "About Us", ta: "எங்களை பற்றி" },
  "nav.feedback": { en: "Feedback", ta: "கருத்து" },
  "nav.contact": { en: "Contact Us", ta: "தொடர்பு கொள்ள" },
  "nav.privacy": { en: "Privacy Policy", ta: "தனியுரிமைக் கொள்கை" },
  "nav.terms": { en: "Terms and Conditions", ta: "விதிமுறைகள்" },
  "nav.logout": { en: "Logout", ta: "வெளியேறு" },
  "nav.home": { en: "Home", ta: "முகப்பு" },
  "nav.menu": { en: "Menu", ta: "பட்டி" },
  "common.login": { en: "Login", ta: "உள்நுழை" },
  "common.dashboard": { en: "Dashboard", ta: "டாஷ்போர்டு" },
  "common.farmer": { en: "Farmer", ta: "விவசாயி" },
  "common.dealer": { en: "Dealer", ta: "வியாபாரி" },
  "common.driver": { en: "Driver", ta: "ஓட்டுநர்" },
  "common.notifications": { en: "Notifications", ta: "அறிவிப்புகள்" },
  "common.profile": { en: "Profile", ta: "சுயவிவரம்" },
  "common.save": { en: "Save", ta: "சேமி" },
  "common.call": { en: "Call", ta: "அழை" },
  "common.chat": { en: "Chat", ta: "அரட்டை" },
  "hero.badge": { en: "Farm to Dealer Marketplace", ta: "பண்ணை முதல் வியாபாரி வரை" },
  "hero.title": {
    en: "Sell your harvest at a fair price.",
    ta: "உங்கள் அறுவடையை நியாயமான விலைக்கு விற்கவும்.",
  },
  "hero.subtitle": {
    en: "AgriLink connects farmers, dealers and drivers in one trusted marketplace — listings, secure payments and transport in a single flow.",
    ta: "AgriLink விவசாயிகள், வியாபாரிகள் மற்றும் ஓட்டுநர்களை ஒரே நம்பகமான சந்தையில் இணைக்கிறது.",
  },
  "hero.cta": { en: "Choose your portal", ta: "உங்கள் போர்ட்டலை தேர்ந்தெடுக்கவும்" },
};

interface AppState {
  user: SessionUser | null;
  login: (role: Role, name?: string) => void;
  logout: () => void;
  updateProfile: (patch: Partial<SessionUser>) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dark: boolean;
  toggleDark: () => void;
  crops: Crop[];
  addCrop: (c: Omit<Crop, "id" | "rating" | "status">) => void;
  orders: Order[];
  buyCrop: (crop: Crop) => void;
  requests: TransportRequest[];
  setRequestStatus: (id: string, status: TransportRequest["status"]) => void;
  addRequest: (r: Omit<TransportRequest, "id" | "status">) => void;
  notifications: AppNotification[];
  pushNotification: (title: string, body: string) => void;
  markAllRead: () => void;
}

const AppContext = createContext<AppState | null>(null);

const STORAGE_KEY = "agrilink-state-v1";

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [lang, setLang] = useState<Lang>("en");
  const [dark, setDark] = useState(false);
  const [crops, setCrops] = useState<Crop[]>(seedCrops);
  const [orders, setOrders] = useState<Order[]>(seedOrders);
  const [requests, setRequests] = useState<TransportRequest[]>(seedRequests);
  const [notifications, setNotifications] = useState<AppNotification[]>(seedNotifications);

  // Hydrate after mount to avoid SSR mismatch.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed.user) setUser(parsed.user);
      if (parsed.lang) setLang(parsed.lang);
      if (typeof parsed.dark === "boolean") setDark(parsed.dark);
      if (parsed.crops) setCrops(parsed.crops);
      if (parsed.orders) setOrders(parsed.orders);
      if (parsed.requests) setRequests(parsed.requests);
    } catch {
      /* ignore corrupt state */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ user, lang, dark, crops, orders, requests }),
    );
  }, [user, lang, dark, crops, orders, requests]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const t = useCallback((key: string) => dict[key]?.[lang] ?? key, [lang]);

  const pushNotification = useCallback((title: string, body: string) => {
    setNotifications((prev) => [
      { id: crypto.randomUUID(), title, body, time: "just now", read: false },
      ...prev,
    ]);
  }, []);

  const value = useMemo<AppState>(
    () => ({
      user,
      login: (role, name) =>
        setUser({
          name: name?.trim() || defaultNames[role],
          email: `${role}@agrilink.demo`,
          phone: "+91 98400 11223",
          role,
          location: "Thanjavur, Tamil Nadu",
          avatar: defaultNames[role].slice(0, 2).toUpperCase(),
        }),
      logout: () => setUser(null),
      updateProfile: (patch) => setUser((u) => (u ? { ...u, ...patch } : u)),
      lang,
      setLang,
      t,
      dark,
      toggleDark: () => setDark((d) => !d),
      crops,
      addCrop: (c) =>
        setCrops((prev) => [
          { ...c, id: crypto.randomUUID(), rating: 5, status: "available" },
          ...prev,
        ]),
      orders,
      buyCrop: (crop) =>
        setOrders((prev) => [
          {
            id: `ORD-${Math.floor(1000 + Math.random() * 8999)}`,
            crop: crop.name,
            buyer: user?.name ?? "Dealer",
            seller: crop.farmer,
            quantity: `${crop.quantity} ${crop.unit}`,
            amount: Math.round(crop.quantity * crop.price),
            payment: "escrow",
            delivery: "preparing",
            date: new Date().toISOString().slice(0, 10),
          },
          ...prev,
        ]),
      requests,
      setRequestStatus: (id, status) =>
        setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r))),
      addRequest: (r) =>
        setRequests((prev) => [
          { ...r, id: `TR-${Math.floor(100 + Math.random() * 899)}`, status: "open" },
          ...prev,
        ]),
      notifications,
      pushNotification,
      markAllRead: () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true }))),
    }),
    [user, lang, t, dark, crops, orders, requests, notifications, pushNotification],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

const defaultNames: Record<Role, string> = {
  farmer: "Murugan S.",
  dealer: "Green Valley Traders",
  driver: "Ravi Kumar",
};

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

export const roleMeta: Record<Role, { label: string; labelTa: string; blurb: string }> = {
  farmer: {
    label: "Farmer",
    labelTa: "விவசாயி",
    blurb: "List crops, track orders and request transport.",
  },
  dealer: {
    label: "Dealer",
    labelTa: "வியாபாரி",
    blurb: "Browse produce, buy in bulk and book drivers.",
  },
  driver: {
    label: "Driver",
    labelTa: "ஓட்டுநர்",
    blurb: "Accept deliveries, track routes and earnings.",
  },
};

export const currency = (n: number) =>
  `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
