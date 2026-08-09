import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, r as Slot } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as supabase } from "./client-BqNAchjS.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { i as router_exports } from "./router-33aU10592.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-store-Bq_Krb9D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* AgriLink global app store.
* Holds demo (client-side) state: session, language, theme, crops,
* orders, transport requests and notifications. No backend — this is a
* fully interactive UI prototype persisted in localStorage.
*/
var BACKEND_URL = "http://localhost:4000";
var AUTH_TOKEN_KEY = "agrilink-auth-token";
function mapCrop(row) {
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
		status: row.status
	};
}
function mapOrder(row) {
	return {
		id: row.id,
		crop: row.crop,
		buyer: row.buyer,
		seller: row.seller,
		quantity: row.quantity,
		amount: row.amount,
		payment: row.payment,
		delivery: row.delivery,
		date: row.date
	};
}
function mapRequest(row) {
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
		dealerPhone: row.dealer_phone
	};
}
function isRole(value) {
	return value === "farmer" || value === "dealer" || value === "driver";
}
function inferRoleFromEmail(email) {
	const normalized = email.trim().toLowerCase();
	if (normalized.includes("dealer")) return "dealer";
	if (normalized.includes("driver")) return "driver";
	return "farmer";
}
function mapBackendUser(user) {
	return {
		id: user.id,
		name: user.fullName,
		email: user.email,
		phone: user.mobile,
		role: user.role,
		location: "Thanjavur, Tamil Nadu",
		avatar: user.fullName.slice(0, 2).toUpperCase()
	};
}
async function fetchBackendUser(token) {
	try {
		const response = await fetch(`${BACKEND_URL}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
		if (!response.ok) return null;
		const body = await response.json();
		if (!body?.user) return null;
		const user = body.user;
		if (typeof user.id !== "string" || !user.fullName || !user.email || !user.role) return null;
		return mapBackendUser(user);
	} catch {
		return null;
	}
}
async function attemptBackendLogin(email, password) {
	try {
		const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				email,
				password
			})
		});
		if (!response.ok) {
			const message = (await response.json().catch(() => null))?.error || "Unable to login with backend auth.";
			throw new Error(message);
		}
		const body = await response.json();
		if (!body?.user || !body?.token) throw new Error("Invalid backend auth response.");
		const user = body.user;
		if (typeof user.id !== "string" || !user.fullName || !user.email || !user.role) throw new Error("Invalid user returned from backend auth.");
		return {
			user: mapBackendUser(user),
			token: body.token
		};
	} catch (error) {
		if (error instanceof Error) throw error;
		throw new Error("Backend auth failed.");
	}
}
function createSessionUser(user) {
	const metadata = typeof user.user_metadata === "object" && user.user_metadata !== null ? user.user_metadata : {};
	const role = isRole(metadata.role) ? metadata.role : inferRoleFromEmail(user.email ?? "");
	const name = typeof metadata.fullName === "string" && metadata.fullName.trim() ? metadata.fullName.trim() : defaultNames[role];
	return {
		id: user.id,
		name,
		email: user.email ?? `${role}@agrilink.demo`,
		phone: typeof metadata.phone === "string" ? metadata.phone : "+91 98400 11223",
		role,
		location: typeof metadata.location === "string" ? metadata.location : "Thanjavur, Tamil Nadu",
		avatar: name.slice(0, 2).toUpperCase()
	};
}
var CROP_IMAGES = [
	"https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=70",
	"https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=70",
	"https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=70",
	"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=70",
	"https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=70",
	"https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=800&q=70"
];
var seedCrops = [
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
		status: "available"
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
		status: "available"
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
		status: "available"
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
		status: "available"
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
		status: "available"
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
		status: "available"
	}
];
var seedOrders = [
	{
		id: "ORD-2291",
		crop: "Tomato",
		buyer: "Green Valley Traders",
		seller: "Lakshmi R.",
		quantity: "400 kg",
		amount: 8800,
		payment: "paid",
		delivery: "delivered",
		date: "2026-07-18"
	},
	{
		id: "ORD-2304",
		crop: "Paddy (Ponni Rice)",
		buyer: "Sri Annapoorna Mills",
		seller: "Murugan S.",
		quantity: "4 ton",
		amount: 112e3,
		payment: "escrow",
		delivery: "in-transit",
		date: "2026-07-22"
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
		date: "2026-07-25"
	}
];
var seedRequests = [
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
		dealerPhone: "+91 90876 33221"
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
		dealerPhone: "+91 90876 33221"
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
		dealerPhone: "+91 90876 33221"
	}
];
var seedNotifications = [
	{
		id: "n1",
		title: "Payment released",
		body: "₹8,800 for ORD-2291 has been credited to your account.",
		time: "2h ago",
		read: false
	},
	{
		id: "n2",
		title: "New transport request",
		body: "TR-502 Hosur → Bengaluru Market, 800 kg.",
		time: "5h ago",
		read: false
	},
	{
		id: "n3",
		title: "Weather alert",
		body: "Light showers expected in Thanjavur on Tue. Cover harvested stock.",
		time: "1d ago",
		read: true
	}
];
/** Minimal EN/TA dictionary for the multi-language toggle. */
var dict = {
	"nav.about": {
		en: "About Us",
		ta: "எங்களை பற்றி"
	},
	"nav.feedback": {
		en: "Feedback",
		ta: "கருத்து"
	},
	"nav.contact": {
		en: "Contact Us",
		ta: "தொடர்பு கொள்ள"
	},
	"nav.privacy": {
		en: "Privacy Policy",
		ta: "தனியுரிமைக் கொள்கை"
	},
	"nav.terms": {
		en: "Terms and Conditions",
		ta: "விதிமுறைகள்"
	},
	"nav.logout": {
		en: "Logout",
		ta: "வெளியேறு"
	},
	"nav.home": {
		en: "Home",
		ta: "முகப்பு"
	},
	"nav.menu": {
		en: "Menu",
		ta: "பட்டி"
	},
	"common.login": {
		en: "Login",
		ta: "உள்நுழை"
	},
	"common.dashboard": {
		en: "Dashboard",
		ta: "டாஷ்போர்டு"
	},
	"common.farmer": {
		en: "Farmer",
		ta: "விவசாயி"
	},
	"common.dealer": {
		en: "Dealer",
		ta: "வியாபாரி"
	},
	"common.driver": {
		en: "Driver",
		ta: "ஓட்டுநர்"
	},
	"common.notifications": {
		en: "Notifications",
		ta: "அறிவிப்புகள்"
	},
	"common.profile": {
		en: "Profile",
		ta: "சுயவிவரம்"
	},
	"common.save": {
		en: "Save",
		ta: "சேமி"
	},
	"common.call": {
		en: "Call",
		ta: "அழை"
	},
	"common.chat": {
		en: "Chat",
		ta: "அரட்டை"
	},
	"hero.badge": {
		en: "Farm to Dealer Marketplace",
		ta: "பண்ணை முதல் வியாபாரி வரை"
	},
	"hero.title": {
		en: "Sell your harvest at a fair price.",
		ta: "உங்கள் அறுவடையை நியாயமான விலைக்கு விற்கவும்."
	},
	"hero.subtitle": {
		en: "AgriLink connects farmers, dealers and drivers in one trusted marketplace — listings, secure payments and transport in a single flow.",
		ta: "AgriLink விவசாயிகள், வியாபாரிகள் மற்றும் ஓட்டுநர்களை ஒரே நம்பகமான சந்தையில் இணைக்கிறது."
	},
	"hero.cta": {
		en: "Choose your portal",
		ta: "உங்கள் போர்ட்டலை தேர்ந்தெடுக்கவும்"
	}
};
var AppContext = (0, import_react.createContext)(null);
var STORAGE_KEY = "agrilink-state-v1";
function AppProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [authLoaded, setAuthLoaded] = (0, import_react.useState)(typeof window === "undefined");
	const [token, setToken] = (0, import_react.useState)(null);
	const [lang, setLang] = (0, import_react.useState)("en");
	const [dark, setDark] = (0, import_react.useState)(false);
	const [crops, setCrops] = (0, import_react.useState)([]);
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [requests, setRequests] = (0, import_react.useState)([]);
	const [notifications, setNotifications] = (0, import_react.useState)(seedNotifications);
	const loadAppData = (0, import_react.useCallback)(async () => {
		try {
			const [cropRes, orderRes, requestRes] = await Promise.all([
				supabase.from("crops").select("*").order("created_at", { ascending: false }),
				supabase.from("orders").select("*").order("created_at", { ascending: false }),
				supabase.from("transport_requests").select("*").order("created_at", { ascending: false })
			]);
			if (cropRes.error) console.warn("Unable to load crops from Supabase:", cropRes.error.message);
			if (orderRes.error) console.warn("Unable to load orders from Supabase:", orderRes.error.message);
			if (requestRes.error) console.warn("Unable to load requests from Supabase:", requestRes.error.message);
			setCrops(cropRes.data ? cropRes.data.map(mapCrop) : seedCrops);
			setOrders(orderRes.data ? orderRes.data.map(mapOrder) : seedOrders);
			setRequests(requestRes.data ? requestRes.data.map(mapRequest) : seedRequests);
		} catch (error) {
			console.warn("Failed to fetch backend app data", error);
			setCrops(seedCrops);
			setOrders(seedOrders);
			setRequests(seedRequests);
		}
	}, []);
	(0, import_react.useEffect)(() => {
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
				const { data: { session } } = await supabase.auth.getSession();
				if (session?.user) setUser(createSessionUser(session.user));
			} finally {
				setAuthLoaded(true);
			}
		};
		initAuth();
		loadAppData();
		const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
			if (session?.user) setUser(createSessionUser(session.user));
			else setUser(null);
			loadAppData();
		});
		return () => authListener.subscription.unsubscribe();
	}, [loadAppData]);
	(0, import_react.useEffect)(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify({
			lang,
			dark
		}));
	}, [lang, dark]);
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.toggle("dark", dark);
	}, [dark]);
	const t = (0, import_react.useCallback)((key) => dict[key]?.[lang] ?? key, [lang]);
	const pushNotification = (0, import_react.useCallback)((title, body) => {
		setNotifications((prev) => [{
			id: crypto.randomUUID(),
			title,
			body,
			time: "just now",
			read: false
		}, ...prev]);
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		user,
		login: async (email, password, role) => {
			const trimmedEmail = email.trim();
			try {
				const backendResult = await attemptBackendLogin(trimmedEmail, password);
				const finalRole = role ?? backendResult.user.role;
				setUser(backendResult.user);
				setToken(backendResult.token);
				if (typeof window !== "undefined") localStorage.setItem(AUTH_TOKEN_KEY, backendResult.token);
				await loadAppData();
				return finalRole;
			} catch (backendError) {
				const { data, error } = await supabase.auth.signInWithPassword({
					email: trimmedEmail,
					password
				});
				if (error) throw backendError instanceof Error && backendError.message ? backendError : error;
				if (!data.user) throw new Error("Unable to sign in");
				const metadata = typeof data.user.user_metadata === "object" && data.user.user_metadata !== null ? data.user.user_metadata : {};
				const metadataRole = isRole(metadata.role);
				const finalRole = role ?? (metadataRole ? metadata.role : void 0) ?? inferRoleFromEmail(trimmedEmail);
				if (!metadataRole || metadata.role !== finalRole) await supabase.auth.updateUser({ data: {
					...metadata,
					role: finalRole
				} });
				const sessionUser = createSessionUser({
					...data.user,
					user_metadata: {
						...metadata,
						role: finalRole
					}
				});
				setUser(sessionUser);
				setToken(null);
				if (typeof window !== "undefined") localStorage.removeItem(AUTH_TOKEN_KEY);
				await loadAppData();
				return finalRole;
			}
		},
		logout: async () => {
			if (typeof window !== "undefined") localStorage.removeItem(AUTH_TOKEN_KEY);
			setToken(null);
			await supabase.auth.signOut().catch(() => void 0);
			setUser(null);
		},
		updateProfile: async (patch) => {
			if (!user) return;
			const { data, error } = await supabase.auth.updateUser({ data: {
				fullName: patch.name,
				phone: patch.phone,
				location: patch.location
			} });
			if (error) {
				console.warn("Unable to update profile", error.message);
				return;
			}
			if (data.user) setUser(createSessionUser(data.user));
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
				status: "available"
			};
			const { data, error } = await supabase.from("crops").insert(payload).select("*").single();
			if (error || !data) throw error ?? /* @__PURE__ */ new Error("Failed to add crop");
			setCrops((prev) => [mapCrop(data), ...prev]);
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
				date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
			};
			const { data, error } = await supabase.from("orders").insert(orderPayload).select("*").single();
			if (error || !data) throw error ?? /* @__PURE__ */ new Error("Failed to place order");
			setOrders((prev) => [mapOrder(data), ...prev]);
			await supabase.from("crops").update({ status: "sold" }).eq("id", crop.id);
			setCrops((prev) => prev.map((item) => item.id === crop.id ? {
				...item,
				status: "sold"
			} : item));
		},
		requests,
		setRequestStatus: async (id, status) => {
			const { data, error } = await supabase.from("transport_requests").update({ status }).eq("id", id).select("*").single();
			if (error || !data) throw error ?? /* @__PURE__ */ new Error("Failed to update request");
			setRequests((prev) => prev.map((r) => r.id === id ? mapRequest(data) : r));
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
				dealer_phone: r.dealerPhone
			};
			const { data, error } = await supabase.from("transport_requests").insert(payload).select("*").single();
			if (error || !data) throw error ?? /* @__PURE__ */ new Error("Failed to add request");
			setRequests((prev) => [mapRequest(data), ...prev]);
		},
		notifications,
		pushNotification,
		markAllRead: () => setNotifications((prev) => prev.map((n) => ({
			...n,
			read: true
		})))
	}), [
		user,
		lang,
		t,
		dark,
		crops,
		orders,
		requests,
		notifications,
		pushNotification
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppContext.Provider, {
		value,
		children
	});
}
var defaultNames = {
	farmer: "Murugan S.",
	dealer: "Green Valley Traders",
	driver: "Ravi Kumar"
};
function useApp() {
	const ctx = (0, import_react.useContext)(AppContext);
	if (!ctx) throw new Error("useApp must be used inside AppProvider");
	return ctx;
}
var roleMeta = {
	farmer: {
		label: "Farmer",
		labelTa: "விவசாயி",
		blurb: "List crops, track orders and request transport."
	},
	dealer: {
		label: "Dealer",
		labelTa: "வியாபாரி",
		blurb: "Browse produce, buy in bulk and book drivers."
	},
	driver: {
		label: "Driver",
		labelTa: "ஓட்டுநர்",
		blurb: "Accept deliveries, track routes and earnings."
	}
};
var currency = (n) => `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/button-DRsC1qZi.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/input-DicJzR9-.js
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/ui-kit-F_EZAtEK.js
function GlassCard({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("glass lift rounded-3xl p-5", className),
		...props,
		children
	});
}
function SectionTitle({ title, subtitle, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "truncate text-xl font-semibold sm:text-2xl",
				children: title
			}), subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: subtitle
			}) : null]
		}), action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shrink-0",
			children: action
		}) : null]
	});
}
function StatCard({ label, value, hint, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassCard, {
		className: "rise-in",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-xs font-medium uppercase tracking-wide text-muted-foreground",
						children: label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-2xl font-bold",
						children: value
					}),
					hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: hint
					}) : null
				]
			}), icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-10 shrink-0 place-items-center rounded-2xl gradient-primary text-primary-foreground",
				children: icon
			}) : null]
		})
	});
}
function Pill({ children, tone = "muted" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", {
			muted: "bg-muted text-muted-foreground",
			success: "bg-success/15 text-success",
			warning: "bg-warning/20 text-harvest-foreground",
			sky: "bg-sky/20 text-sky",
			primary: "bg-primary/15 text-primary"
		}[tone]),
		children
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-medium text-foreground",
			children: label
		}), children]
	});
}
function Stars({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "text-xs font-semibold text-harvest",
		children: ["★".repeat(Math.round(value)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-muted-foreground",
			children: [" ", value.toFixed(1)]
		})]
	});
}
//#endregion
export { SectionTitle as a, Input as c, AppProvider as d, currency as f, Pill as i, Button as l, useApp as m, Field as n, Stars as o, roleMeta as p, GlassCard as r, StatCard as s, router_exports as t, cn as u };
