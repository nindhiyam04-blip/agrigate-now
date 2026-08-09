import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as CreditCard, b as MapPin, f as Phone, k as Crown, l as Search, r as Truck, s as ShoppingCart } from "../_libs/lucide-react.mjs";
import { a as SectionTitle, c as Input, f as currency, i as Pill, l as Button, m as useApp, n as Field, o as Stars, r as GlassCard, s as StatCard, u as cn } from "./router-33aU1059.mjs";
import { n as TransportForm } from "./router-33aU10592.mjs";
import { a as Tabs, c as TabsTrigger, i as SignInGate, n as ProfileTab, o as TabsContent, r as ReviewList, s as TabsList, t as DashboardHeader } from "./shared-w6NLDxWT.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dealer-CB1SdFr7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })]
}));
Slider.displayName = Slider$1.displayName;
/** Dealer dashboard: browse & filter crops, buy, book drivers, track delivery. */
function DealerDashboard() {
	const { user, crops, orders, buyCrop, addRequest, pushNotification, lang } = useApp();
	const [q, setQ] = (0, import_react.useState)("");
	const [maxPrice, setMaxPrice] = (0, import_react.useState)(100);
	const [minQty, setMinQty] = (0, import_react.useState)("");
	const [place, setPlace] = (0, import_react.useState)("");
	const filtered = (0, import_react.useMemo)(() => crops.filter((c) => (c.name + c.nameTa).toLowerCase().includes(q.toLowerCase()) && c.price <= maxPrice && (!minQty || c.quantity >= Number(minQty)) && c.location.toLowerCase().includes(place.toLowerCase())), [
		crops,
		q,
		maxPrice,
		minQty,
		place
	]);
	if (!user || user.role !== "dealer") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInGate, { role: "dealer" });
	const spend = orders.reduce((s, o) => s + o.amount, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl space-y-6 px-4 pt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, { subtitle: "Dealer portal · Wholesale sourcing" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Available lots",
						value: String(crops.length),
						hint: "matching your region",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Orders",
						value: String(orders.length),
						hint: "this season",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Spend",
						value: currency(spend),
						hint: "gross procurement",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Plan",
						value: "Growth",
						hint: "renews 12 Aug 2026",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "size-5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "browse",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "flex h-auto w-full flex-wrap justify-start gap-1 rounded-2xl p-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "browse",
								className: "rounded-xl",
								children: "Browse crops"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "orders",
								className: "rounded-xl",
								children: "Order history"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "drivers",
								className: "rounded-xl",
								children: "Book driver"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "tracking",
								className: "rounded-xl",
								children: "Delivery tracking"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "billing",
								className: "rounded-xl",
								children: "Plans & payments"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "profile",
								className: "rounded-xl",
								children: "Profile"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "browse",
						className: "mt-5 space-y-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassCard, {
							className: "rounded-3xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 lg:grid-cols-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Search crop",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												className: "rounded-xl pl-9",
												value: q,
												onChange: (e) => setQ(e.target.value),
												placeholder: "Tomato, paddy…"
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Location",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											className: "rounded-xl",
											value: place,
											onChange: (e) => setPlace(e.target.value),
											placeholder: "District"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Min quantity",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											className: "rounded-xl",
											inputMode: "numeric",
											value: minQty,
											onChange: (e) => setMinQty(e.target.value),
											placeholder: "500"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: `Max price ₹${maxPrice}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
											value: [maxPrice],
											min: 1,
											max: 100,
											step: 1,
											onValueChange: ([v]) => setMaxPrice(v),
											className: "mt-4"
										})
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
							children: [filtered.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
								className: "overflow-hidden rounded-3xl p-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: c.image,
									alt: c.name,
									loading: "lazy",
									className: "h-40 w-full object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "min-w-0 truncate font-semibold",
												children: lang === "ta" ? c.nameTa : c.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, { value: c.rating })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm text-muted-foreground",
											children: [
												c.quantity,
												" ",
												c.unit,
												" ·",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-semibold text-foreground",
													children: [
														currency(c.price),
														"/",
														c.unit
													]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "flex items-center gap-1 text-xs text-muted-foreground",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3" }),
												" ",
												c.location,
												" · ",
												c.farmer
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2 pt-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												className: "flex-1 rounded-full gradient-primary text-primary-foreground",
												onClick: () => {
													buyCrop(c);
													pushNotification("Order placed", `${c.name} from ${c.farmer}.`);
													toast.success(`Order placed for ${c.name}`);
												},
												children: "Buy now"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												variant: "secondary",
												className: "rounded-full",
												onClick: () => toast(`Calling ${c.farmer} · ${c.phone}`),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" })
											})]
										})
									]
								})]
							}, c.id)), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlassCard, {
								className: "rounded-3xl text-center text-sm text-muted-foreground",
								children: "No crops match these filters."
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "orders",
						className: "mt-5 space-y-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
							className: "rounded-3xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
								title: "Order history",
								subtitle: "Every purchase with payment and delivery state."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3",
								children: orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2 rounded-2xl bg-muted/50 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "truncate font-semibold",
											children: [
												o.crop,
												" · ",
												o.quantity
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "truncate text-sm text-muted-foreground",
											children: [
												o.seller,
												" · ",
												o.id,
												" · ",
												o.date
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
												tone: o.payment === "paid" ? "success" : o.payment === "escrow" ? "sky" : "warning",
												children: o.payment
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
												tone: o.delivery === "delivered" ? "success" : "primary",
												children: o.delivery
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
												tone: "muted",
												children: currency(o.amount)
											})
										]
									})]
								}, o.id))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewList, {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "drivers",
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
							className: "rounded-3xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
								title: "Book a driver",
								subtitle: "Post a load; verified drivers nearby can accept it."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransportForm, { onSubmit: (p) => {
								addRequest({
									...p,
									farmerPhone: "+91 98400 11223",
									dealerPhone: user.phone
								});
								pushNotification("Driver requested", `${p.crop}: ${p.from} → ${p.to}`);
								toast.success("Request sent to nearby drivers");
							} })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "tracking",
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
							className: "rounded-3xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
									title: "Delivery tracking",
									subtitle: "ORD-2304 · Thanjavur → Trichy Mandi"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
									className: "relative space-y-6 border-l-2 border-dashed pl-6",
									children: [
										[
											"Order confirmed",
											"22 Jul, 09:12",
											true
										],
										[
											"Driver assigned — Ravi Kumar (TN 45 BX 8821)",
											"22 Jul, 10:40",
											true
										],
										[
											"Loaded at farm",
											"22 Jul, 12:05",
											true
										],
										[
											"In transit — 26 km remaining",
											"Live",
											true
										],
										[
											"Delivered at Trichy Mandi",
											"Expected 14:30",
											false
										]
									].map(([label, time, done]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "relative",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute -left-[31px] top-1 size-4 rounded-full border-2 ${done ? "gradient-primary border-transparent" : "bg-background"}` }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-medium",
												children: label
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: time
											})
										]
									}, label))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "secondary",
									className: "mt-6 rounded-full",
									onClick: () => toast("Calling driver Ravi Kumar"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-4" }), " Call driver"]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "billing",
						className: "mt-5 space-y-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4 md:grid-cols-3",
							children: [
								{
									name: "Starter",
									price: "₹0",
									perks: [
										"10 listings/month",
										"Basic filters",
										"Email support"
									]
								},
								{
									name: "Growth",
									price: "₹1,499/mo",
									perks: [
										"Unlimited browsing",
										"Priority driver booking",
										"Escrow payments"
									],
									featured: true
								},
								{
									name: "Enterprise",
									price: "₹4,999/mo",
									perks: [
										"Multi-buyer accounts",
										"Dedicated manager",
										"API & bulk export"
									]
								}
							].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
								className: `rounded-3xl ${p.featured ? "ring-2 ring-primary" : ""}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-lg font-bold",
											children: p.name
										}), p.featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
											tone: "primary",
											children: "Current"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-2xl font-black text-gradient",
										children: p.price
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-4 space-y-2 text-sm text-muted-foreground",
										children: p.perks.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["• ", x] }, x))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "mt-5 w-full rounded-full",
										variant: p.featured ? "default" : "secondary",
										onClick: () => toast.success(`${p.name} plan selected`),
										children: p.featured ? "Manage plan" : "Choose plan"
									})
								]
							}, p.name))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
							className: "rounded-3xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
									title: "Secure payment",
									subtitle: "256-bit encrypted · UPI, cards and net banking"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Card number",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												className: "rounded-xl",
												placeholder: "4242 4242 4242 4242",
												inputMode: "numeric"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Name on card",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												className: "rounded-xl",
												placeholder: "Green Valley Traders"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Expiry",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												className: "rounded-xl",
												placeholder: "08/29"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "CVV",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												className: "rounded-xl",
												placeholder: "•••",
												type: "password"
											})
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									className: "mt-5 rounded-full gradient-primary text-primary-foreground",
									onClick: () => toast.success("Payment method saved securely"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "size-4" }), " Save payment method"]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "profile",
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileTab, {})
					})
				]
			})
		]
	});
}
//#endregion
export { DealerDashboard as component };
