import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as BadgeIndianRupee, T as Languages, a as Star, c as ShieldCheck, j as CloudSun, n as Users, o as Sprout, r as Truck, y as MapPinned } from "../_libs/lucide-react.mjs";
import { l as Button, m as useApp, p as roleMeta, r as GlassCard } from "./router-hH4uaiaK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BsP3mW9s.js
var import_jsx_runtime = require_jsx_runtime();
var hero_farm_default = "/assets/hero-farm-BeMafWbN.jpg";
/** Home page: agricultural hero, portal chooser and feature highlights. */
var roleIcons = {
	farmer: Sprout,
	dealer: BadgeIndianRupee,
	driver: Truck
};
function Home() {
	const { t, lang, crops } = useApp();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-3 pt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative mx-auto max-w-6xl overflow-hidden rounded-[2rem]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: hero_farm_default,
						alt: "Farmer harvesting crops at sunrise with a delivery truck on the field road",
						width: 1920,
						height: 1088,
						className: "h-[520px] w-full object-cover sm:h-[600px]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0",
						style: { backgroundImage: "var(--gradient-hero)" },
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 flex items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full px-6 sm:px-12",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "max-w-2xl rise-in",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "glass inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em]",
										children: t("hero.badge")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "mt-5 text-4xl font-black leading-tight text-primary-foreground drop-shadow sm:text-6xl",
										children: t("hero.title")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 max-w-xl text-base text-primary-foreground/90 sm:text-lg",
										children: t("hero.subtitle")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-7 flex flex-wrap gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											size: "lg",
											className: "rounded-full gradient-primary px-7 text-primary-foreground shadow-lg",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/auth/$role",
												params: { role: "farmer" },
												children: t("hero.cta")
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											size: "lg",
											variant: "secondary",
											className: "rounded-full px-7",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/about",
												children: "Learn more"
											})
										})]
									})
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-5 right-5 hidden sm:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
							className: "float-slow w-56 rounded-2xl p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs uppercase tracking-wide text-muted-foreground",
									children: "Live listings"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-3xl font-bold",
									children: crops.length
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "across 6 districts today"
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto mt-14 max-w-6xl px-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-bold sm:text-4xl",
						children: "Three portals, one marketplace"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: "Pick the portal that matches your role. Each has its own login and dashboard."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-5 md:grid-cols-3",
					children: Object.keys(roleMeta).map((role, i) => {
						const Icon = roleIcons[role];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
							className: "rise-in",
							style: { animationDelay: `${i * 90}ms` },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-12 place-items-center rounded-2xl gradient-primary text-primary-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-6" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "mt-4 text-xl font-bold",
									children: [lang === "ta" ? roleMeta[role].labelTa : roleMeta[role].label, " Portal"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: roleMeta[role].blurb
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									className: "mt-5 w-full rounded-full",
									variant: "secondary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/auth/$role",
										params: { role },
										children: ["Continue as ", roleMeta[role].label]
									})
								})
							]
						}, role);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto mt-16 max-w-6xl px-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-center text-3xl font-bold",
					children: "Everything the chain needs"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassCard, {
						className: "rounded-2xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-10 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-semibold",
									children: f.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: f.body
								})]
							})]
						})
					}, f.title))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto mt-16 max-w-6xl px-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassCard, {
					className: "grid gap-6 rounded-3xl p-8 text-center sm:grid-cols-4",
					children: [
						["12,400+", "Farmers onboarded"],
						["3,100+", "Verified dealers"],
						["₹48 Cr", "Traded this season"],
						["4.8/5", "Average rating"]
					].map(([v, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-3xl font-black text-gradient",
						children: v
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: l
					})] }, l))
				})
			})
		]
	});
}
var features = [
	{
		icon: Sprout,
		title: "Crop listings",
		body: "Upload produce with photos, quantity, harvest date and price per kg or ton."
	},
	{
		icon: Truck,
		title: "Transport built in",
		body: "Request a driver from the listing; drivers accept and share live status."
	},
	{
		icon: ShieldCheck,
		title: "Secure payments",
		body: "Escrow-style payment flow with clear paid / pending states for every order."
	},
	{
		icon: CloudSun,
		title: "AI weather alerts",
		body: "Field-level rain and heat warnings before your harvest window."
	},
	{
		icon: MapPinned,
		title: "Location filters",
		body: "Dealers filter by crop, price, quantity and district in one search bar."
	},
	{
		icon: Languages,
		title: "Tamil + English",
		body: "Switch language anytime from the menu — the whole app follows."
	},
	{
		icon: Star,
		title: "Ratings & reviews",
		body: "Every farmer, dealer and driver carries a public trust score."
	},
	{
		icon: Users,
		title: "Direct contact",
		body: "Call or chat between farmer, dealer and driver without middlemen."
	},
	{
		icon: BadgeIndianRupee,
		title: "Price prediction",
		body: "Upcoming: mandi price forecasts so you sell on the best day."
	}
];
//#endregion
export { Home as component };
