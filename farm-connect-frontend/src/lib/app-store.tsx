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
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type Role = "farmer" | "dealer" | "driver";
export type Lang = "en" | "ta";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
const AUTH_TOKEN_KEY = "agrilink-auth-token";

type BackendUser = {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  role: Role;
};

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  location: string;
  avatar: string;
}

type CropRow = {
  id: string;
  name: string;
  name_ta: string;
  quantity: number;
  unit: "kg" | "ton";
  price: number;
  harvest_date: string;
  location: string;
  farmer_id: string;
  farmer: string;
  phone: string;
  rating: number;
  image: string;
  status: "available" | "sold";
  created_at: string;
};

type OrderRow = {
  id: string;
  crop_id: string;
  crop: string;
  buyer_id: string | null;
  buyer: string;
  seller_id: string | null;
  seller: string;
  quantity: string;
  amount: number;
  payment: "paid" | "pending" | "escrow";
  delivery: "preparing" | "in-transit" | "delivered";
  date: string;
  created_at: string;
};

type TransportRequestRow = {
  id: string;
  crop_id: string;
  crop: string;
  from: string;
  to: string;
  distance_km: number;
  weight: string;
  payout: number;
  status: "open" | "accepted" | "rejected" | "delivered";
  farmer_id: string | null;
  dealer_id: string | null;
  driver_id: string | null;
  farmer_phone: string;
  dealer_phone: string;
  created_at: string;
};

function mapCrop(row: CropRow): Crop {
  return {
    id: row.id,
    name: row.name,
    nameTa: row.name_ta,
    quantity: row.quantity,
    unit: row.unit,
    price: row.price,
    harvestDate: row.harvest_date,
    location: row.location,
    farmer: row.farmer,
    farmerId: row.farmer_id,
    phone: row.phone,
    rating: row.rating,
    image: row.image,
    status: row.status,
  };
}

function mapOrder(row: OrderRow): Order {
  return {
    id: row.id,
    crop: row.crop,
    buyer: row.buyer,
    seller: row.seller,
    quantity: row.quantity,
    amount: row.amount,
    payment: row.payment,
    delivery: row.delivery,
    date: row.date,
  };
}

function mapRequest(row: TransportRequestRow): TransportRequest {
  return {
    id: row.id,
    crop: row.crop,
    from: row.from,
    to: row.to,
    distanceKm: row.distance_km,
    weight: row.weight,
    payout: row.payout,
    status: row.status,
    farmerPhone: row.farmer_phone,
    dealerPhone: row.dealer_phone,
  };
}

function dedupeById<T extends { id: string }>(items: T[]) {
  const seen = new Map<string, T>();
  for (const it of items) {
    if (!seen.has(it.id)) seen.set(it.id, it);
  }
  return Array.from(seen.values());
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
  farmerId: string;
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

function isRole(value: unknown): value is Role {
  return value === "farmer" || value === "dealer" || value === "driver";
}

function inferRoleFromEmail(email: string): Role {
  const normalized = email.trim().toLowerCase();
  if (normalized.includes("dealer")) return "dealer";
  if (normalized.includes("driver")) return "driver";
  return "farmer";
}

function mapBackendUser(user: BackendUser): SessionUser {
  return {
    id: user.id,
    name: user.fullName,
    email: user.email,
    phone: user.mobile,
    role: user.role,
    location: "Thanjavur, Tamil Nadu",
    avatar: user.fullName.slice(0, 2).toUpperCase(),
  };
}

async function fetchBackendUser(token: string): Promise<SessionUser | null> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) return null;

    const body = await response.json();
    if (!body?.user) return null;
    const user = body.user as BackendUser;
    if (typeof user.id !== "string" || !user.fullName || !user.email || !user.role) return null;
    return mapBackendUser(user);
  } catch {
    return null;
  }
}

async function attemptBackendLogin(email: string, password: string): Promise<{ user: SessionUser; token: string }> {
  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      const message = body?.error || "Unable to login with backend auth.";
      throw new Error(message);
    }

    const body = await response.json();
    if (!body?.user || !body?.token) {
      throw new Error("Invalid backend auth response.");
    }

    const user = body.user as BackendUser;
    if (typeof user.id !== "string" || !user.fullName || !user.email || !user.role) {
      throw new Error("Invalid user returned from backend auth.");
    }

    return { user: mapBackendUser(user), token: body.token };
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Backend auth failed.");
  }
}

function createSessionUser(user: User): SessionUser {
  const metadata =
    typeof user.user_metadata === "object" && user.user_metadata !== null
      ? (user.user_metadata as Record<string, unknown>)
      : {};
  const role = isRole(metadata.role) ? metadata.role : inferRoleFromEmail(user.email ?? "");
  const name =
    typeof metadata.fullName === "string" && metadata.fullName.trim()
      ? metadata.fullName.trim()
      : defaultNames[role];

  return {
    id: user.id,
    name,
    email: user.email ?? `${role}@agrilink.demo`,
    phone: typeof metadata.phone === "string" ? metadata.phone : "+91 98400 11223",
    role,
    location: typeof metadata.location === "string" ? metadata.location : "Thanjavur, Tamil Nadu",
    avatar: name.slice(0, 2).toUpperCase(),
  };
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
  login: (email: string, password: string, role?: Role) => Promise<Role>;
  logout: () => Promise<void>;
  updateProfile: (patch: Partial<SessionUser>) => Promise<void>;
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dark: boolean;
  toggleDark: () => void;
  crops: Crop[];
  addCrop: (c: Omit<Crop, "id" | "rating" | "status">) => Promise<void>;
  orders: Order[];
  buyCrop: (crop: Crop) => Promise<void>;
  requests: TransportRequest[];
  setRequestStatus: (id: string, status: TransportRequest["status"]) => Promise<void>;
  addRequest: (r: Omit<TransportRequest, "id" | "status">) => Promise<void>;
  notifications: AppNotification[];
  pushNotification: (title: string, body: string) => void;
  markAllRead: () => void;
}

const AppContext = createContext<AppState | null>(null);

const STORAGE_KEY = "agrilink-state-v1";

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [authLoaded, setAuthLoaded] = useState(typeof window === "undefined");
  const [token, setToken] = useState<string | null>(null);
  const [lang, setLang] = useState<Lang>("en");
  const [dark, setDark] = useState(false);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [requests, setRequests] = useState<TransportRequest[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>(seedNotifications);

  const loadAppData = useCallback(async () => {
    try {
      const [cropRes, orderRes, requestRes] = await Promise.all([
        supabase.from<CropRow>("crops").select("*").order("created_at", { ascending: false }),
        supabase.from<OrderRow>("orders").select("*").order("created_at", { ascending: false }),
        supabase.from<TransportRequestRow>("transport_requests").select("*").order("created_at", { ascending: false }),
      ]);

      const isSchemaMissing = (error: unknown) => {
        if (!error || typeof error !== "object") return false;
        return (
          ("status" in error && (error as any).status === 404) ||
          ("message" in error && typeof (error as any).message === "string" && (error as any).message.includes("schema cache"))
        );
      };

      if (cropRes.error) {
        if (isSchemaMissing(cropRes.error)) {
          console.warn("Supabase crops table is missing; using seeded data.");
        } else {
          console.warn("Unable to load crops from Supabase:", cropRes.error.message);
        }
      }
      if (orderRes.error) {
        if (isSchemaMissing(orderRes.error)) {
          console.warn("Supabase orders table is missing; using seeded data.");
        } else {
          console.warn("Unable to load orders from Supabase:", orderRes.error.message);
        }
      }
      if (requestRes.error) {
        if (isSchemaMissing(requestRes.error)) {
          console.warn("Supabase transport_requests table is missing; using seeded data.");
        } else {
          console.warn("Unable to load requests from Supabase:", requestRes.error.message);
        }
      }

      setCrops(dedupeById(cropRes.data ? cropRes.data.map(mapCrop) : seedCrops));
      setOrders(dedupeById(orderRes.data ? orderRes.data.map(mapOrder) : seedOrders));
      setRequests(dedupeById(requestRes.data ? requestRes.data.map(mapRequest) : seedRequests));
    } catch (error) {
      console.warn("Failed to fetch backend app data", error);
      setCrops(dedupeById(seedCrops));
      setOrders(dedupeById(seedOrders));
      setRequests(dedupeById(seedRequests));
    }
  }, []);

  // Hydrate application state after mount. Keep auth in sync with Supabase.
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof window !== "undefined") {
          const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
          if (storedToken) {
            const backendUser = await fetchBackendUser(storedToken);
            if (backendUser) {
              setUser(backendUser);
              setToken(storedToken);
              return;
            }
          }
        }

        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(createSessionUser(session.user));
        }
      } finally {
        setAuthLoaded(true);
      }
    };

    initAuth();
    void loadAppData();

    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(createSessionUser(session.user));
      } else {
        setUser(null);
      }
      void loadAppData();
    });

    return () => authListener.subscription.unsubscribe();
  }, [loadAppData]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ lang, dark }),
    );
  }, [lang, dark]);

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
      login: async (email, password, role) => {
        const trimmedEmail = email.trim();

        try {
          const backendResult = await attemptBackendLogin(trimmedEmail, password);
          const finalRole = role ?? backendResult.user.role;
          setUser(backendResult.user);
          setToken(backendResult.token);
          if (typeof window !== "undefined") {
            localStorage.setItem(AUTH_TOKEN_KEY, backendResult.token);
          }
          await loadAppData();
          return finalRole;
        } catch (backendError) {
          // If backend auth fails, fall back to Supabase auth.
          const { data, error } = await supabase.auth.signInWithPassword({
            email: trimmedEmail,
            password,
          });

          if (error) {
            throw backendError instanceof Error && backendError.message
              ? backendError
              : error;
          }
          if (!data.user) throw new Error("Unable to sign in");

          const metadata =
            typeof data.user.user_metadata === "object" && data.user.user_metadata !== null
              ? (data.user.user_metadata as Record<string, unknown>)
              : {};

          const metadataRole = isRole(metadata.role);
          const selectedRole = role ?? (metadataRole ? (metadata.role as Role) : undefined);
          const finalRole = selectedRole ?? inferRoleFromEmail(trimmedEmail);

          if (!metadataRole || metadata.role !== finalRole) {
            await supabase.auth.updateUser({
              data: { ...metadata, role: finalRole },
            });
          }

          const sessionUser = createSessionUser({
            ...data.user,
            user_metadata: { ...metadata, role: finalRole },
          });

          setUser(sessionUser);
          setToken(null);
          if (typeof window !== "undefined") {
            localStorage.removeItem(AUTH_TOKEN_KEY);
          }
          await loadAppData();
          return finalRole;
        }
      },
      logout: async () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem(AUTH_TOKEN_KEY);
        }
        setToken(null);
        await supabase.auth.signOut().catch(() => undefined);
        setUser(null);
      },
      updateProfile: async (patch) => {
        if (!user) return;
        const { data, error } = await supabase.auth.updateUser({
          data: {
            fullName: patch.name,
            phone: patch.phone,
            location: patch.location,
          },
        });
        if (error) {
          console.warn("Unable to update profile", error.message);
          return;
        }
        if (data.user) {
          setUser(createSessionUser(data.user));
        }
      },
      lang,
      setLang,
      t,
      dark,
      toggleDark: () => setDark((d) => !d),
      crops,
      addCrop: async (c) => {
        if (!user) throw new Error("Not authenticated");
        const payload = {
          name: c.name,
          name_ta: c.nameTa,
          quantity: c.quantity,
          unit: c.unit,
          price: c.price,
          harvest_date: c.harvestDate,
          location: c.location,
          farmer_id: user.id,
          farmer: user.name,
          phone: user.phone,
          rating: 5,
          image: c.image,
          status: "available",
        };
        const { data, error } = await supabase.from<CropRow>("crops").insert(payload).select("*").single();
        if (error || !data) {
          throw error ?? new Error("Failed to add crop");
        }
        setCrops((prev) => dedupeById([mapCrop(data), ...prev]));
      },
      orders,
      buyCrop: async (crop) => {
        if (!user) throw new Error("Not authenticated");
        const orderPayload = {
          crop_id: crop.id,
          crop: crop.name,
          buyer_id: user.id,
          buyer: user.name,
          seller_id: crop.farmerId ?? null,
          seller: crop.farmer,
          quantity: `${crop.quantity} ${crop.unit}`,
          amount: Math.round(crop.quantity * crop.price),
          payment: "escrow",
          delivery: "preparing",
          date: new Date().toISOString().slice(0, 10),
        };
        const { data, error } = await supabase.from<OrderRow>("orders").insert(orderPayload).select("*").single();
        if (error || !data) {
          throw error ?? new Error("Failed to place order");
        }
        setOrders((prev) => dedupeById([mapOrder(data), ...prev]));
        await supabase
          .from<CropRow>("crops")
          .update({ status: "sold" })
          .eq("id", crop.id);
        setCrops((prev) => prev.map((item) => (item.id === crop.id ? { ...item, status: "sold" } : item)));
      },
      requests,
      setRequestStatus: async (id, status) => {
        const { data, error } = await supabase
          .from<TransportRequestRow>("transport_requests")
          .update({ status })
          .eq("id", id)
          .select("*")
          .single();
        if (error || !data) {
          throw error ?? new Error("Failed to update request");
        }
        setRequests((prev) => prev.map((r) => (r.id === id ? mapRequest(data) : r)));
      },
      addRequest: async (r) => {
        if (!user) throw new Error("Not authenticated");
        const payload = {
          crop_id: `crop-${crypto.randomUUID()}`,
          crop: r.crop,
          from: r.from,
          to: r.to,
          distance_km: r.distanceKm,
          weight: r.weight,
          payout: r.payout,
          status: "open",
          farmer_id: user.id,
          dealer_id: null,
          driver_id: null,
          farmer_phone: r.farmerPhone,
          dealer_phone: r.dealerPhone,
        };
        const { data, error } = await supabase
          .from<TransportRequestRow>("transport_requests")
          .insert(payload)
          .select("*")
          .single();
        if (error || !data) {
          throw error ?? new Error("Failed to add request");
        }
        setRequests((prev) => dedupeById([mapRequest(data), ...prev]));
      },
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
