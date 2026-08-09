import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as IndianRupee, M as Check, b as MapPin, d as Route, f as Phone, r as Truck, t as X } from "../_libs/lucide-react.mjs";
import { a as SectionTitle, c as Input, f as currency, i as Pill, l as Button, m as useApp, n as Field, r as GlassCard, s as StatCard, u as cn } from "./router-hH4uaiaK.mjs";
import { a as Tabs, c as TabsTrigger, i as SignInGate, n as ProfileTab, o as TabsContent, r as ReviewList, s as TabsList, t as DashboardHeader } from "./shared-OhXcvmg0.mjs";
import { n as Root, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/driver-DEXDkFdQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
		className: "h-full w-full flex-1 bg-primary transition-all",
		style: { transform: `translateX(-${100 - (value || 0)}%)` }
	})
}));
Progress.displayName = Root.displayName;
/** Driver dashboard: transport requests, vehicle, earnings and live status. */
function DriverDashboard() {
	const { user, requests, setRequestStatus, pushNotification } = useApp();
	if (!user || user.role !== "driver") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInGate, { role: "driver" });
	const open = requests.filter((r) => r.status === "open");
	const accepted = requests.filter((r) => r.status === "accepted");
	const history = requests.filter((r) => r.status === "delivered" || r.status === "rejected");
	const earnings = requests.filter((r) => r.status === "delivered").reduce((s, r) => s + r.payout, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl space-y-6 px-4 pt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, { subtitle: "Driver portal · TN 45 BX 8821" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Open requests",
						value: String(open.length),
						hint: "within 60 km",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Active trips",
						value: String(accepted.length),
						hint: "in progress",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Earnings",
						value: currency(earnings),
						hint: "settled payouts",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Completion",
						value: "98%",
						hint: "last 50 trips",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "requests",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "flex h-auto w-full flex-wrap justify-start gap-1 rounded-2xl p-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "requests",
								className: "rounded-xl",
								children: "Requests"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "live",
								className: "rounded-xl",
								children: "Live delivery"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "vehicle",
								className: "rounded-xl",
								children: "Vehicle"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "earnings",
								className: "rounded-xl",
								children: "Earnings"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "history",
								className: "rounded-xl",
								children: "History"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "profile",
								className: "rounded-xl",
								children: "Profile"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "requests",
						className: "mt-5 space-y-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
							className: "rounded-3xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
								title: "Transportation requests",
								subtitle: "Accept or reject loads posted by farmers and dealers."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [open.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 rounded-2xl bg-muted/50 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "truncate font-semibold",
												children: [
													r.crop,
													" · ",
													r.weight
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "flex items-center gap-1 truncate text-sm text-muted-foreground",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3" }),
													" ",
													r.from,
													" → ",
													r.to,
													" · ",
													r.distanceKm,
													" km"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-2 flex gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
													tone: "success",
													children: currency(r.payout)
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
													tone: "muted",
													children: r.id
												})]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex shrink-0 flex-wrap gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "sm",
												variant: "secondary",
												className: "rounded-full",
												onClick: () => toast(`Calling farmer ${r.farmerPhone}`),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), " Farmer"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "sm",
												variant: "secondary",
												className: "rounded-full",
												onClick: () => toast(`Calling dealer ${r.dealerPhone}`),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), " Dealer"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "sm",
												className: "rounded-full gradient-primary text-primary-foreground",
												onClick: () => {
													setRequestStatus(r.id, "accepted");
													pushNotification("Delivery accepted", `${r.id} ${r.from} → ${r.to}`);
													toast.success("Request accepted");
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), " Accept"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "sm",
												variant: "ghost",
												className: "rounded-full text-destructive",
												onClick: () => {
													setRequestStatus(r.id, "rejected");
													toast("Request rejected");
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), " Reject"]
											})
										]
									})]
								}, r.id)), open.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "No open requests right now."
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewList, {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "live",
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
							className: "rounded-3xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
								title: "Live delivery status",
								subtitle: accepted[0] ? `${accepted[0].id} · ${accepted[0].from} → ${accepted[0].to}` : "Accept a request to start a trip."
							}), accepted.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
									value: 64,
									className: "h-3 rounded-full"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex justify-between text-sm text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: accepted[0].from }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "64% · ETA 42 min" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: accepted[0].to })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "rounded-full gradient-primary text-primary-foreground",
										onClick: () => {
											setRequestStatus(accepted[0].id, "delivered");
											toast.success("Marked as delivered");
										},
										children: "Mark delivered"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "secondary",
										className: "rounded-full",
										onClick: () => toast("Location shared with farmer and dealer"),
										children: "Share live location"
									})]
								})
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "No active trip."
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "vehicle",
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
							className: "rounded-3xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
									title: "Vehicle details",
									subtitle: "Keep documents current to receive high-value loads."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Vehicle type",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												className: "rounded-xl",
												defaultValue: "Tata 407 — Open body"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Registration number",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												className: "rounded-xl",
												defaultValue: "TN 45 BX 8821"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Capacity",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												className: "rounded-xl",
												defaultValue: "4 ton"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Licence number",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												className: "rounded-xl",
												defaultValue: "TN45 20180012345"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Insurance valid till",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												className: "rounded-xl",
												type: "date",
												defaultValue: "2027-03-31"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Service area",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												className: "rounded-xl",
												defaultValue: "Thanjavur · Trichy · Madurai"
											})
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "mt-5 rounded-full gradient-primary text-primary-foreground",
									onClick: () => toast.success("Vehicle details saved"),
									children: "Save vehicle details"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "earnings",
						className: "mt-5 grid gap-5 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
							className: "rounded-3xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
								title: "Earnings dashboard",
								subtitle: "Weekly payouts, settled every Monday."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-end gap-3",
								children: [
									42,
									68,
									55,
									80,
									72,
									95,
									61
								].map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mx-auto w-full rounded-t-xl gradient-primary",
										style: { height: `${v * 1.6}px` }
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs text-muted-foreground",
										children: [
											"M",
											"T",
											"W",
											"T",
											"F",
											"S",
											"S"
										][i]
									})]
								}, i))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
							className: "rounded-3xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-semibold",
								children: "Payout summary"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 space-y-3 text-sm",
								children: [
									["This week", currency(14200)],
									["This month", currency(58400)],
									["Pending settlement", currency(4200)],
									["Lifetime", currency(742500)]
								].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex justify-between rounded-2xl bg-muted/50 px-4 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: k
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: v
									})]
								}, k))
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "history",
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
							className: "rounded-3xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { title: "Delivery history" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [history.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-3 rounded-2xl bg-muted/50 p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "truncate font-semibold",
											children: [
												r.crop,
												" · ",
												r.weight
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "truncate text-sm text-muted-foreground",
											children: [
												r.from,
												" → ",
												r.to,
												" · ",
												r.distanceKm,
												" km"
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex shrink-0 gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
											tone: r.status === "delivered" ? "success" : "muted",
											children: r.status
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
											tone: "muted",
											children: currency(r.payout)
										})]
									})]
								}, r.id)), history.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "No completed trips yet."
								})]
							})]
						})
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
export { DriverDashboard as component };
