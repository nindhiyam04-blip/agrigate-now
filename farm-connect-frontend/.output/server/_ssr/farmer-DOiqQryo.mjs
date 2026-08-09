import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as IndianRupee, N as ChartLine, O as ImagePlus, _ as MessageCircle, f as Phone, j as CloudSun, m as PackageCheck, o as Sprout, r as Truck } from "../_libs/lucide-react.mjs";
import { a as SectionTitle, c as Input, f as currency, i as Pill, l as Button, m as useApp, n as Field, r as GlassCard, s as StatCard } from "./router-33aU1059.mjs";
import { a as Tabs, c as TabsTrigger, i as SignInGate, n as ProfileTab, o as TabsContent, r as ReviewList, s as TabsList, t as DashboardHeader } from "./shared-w6NLDxWT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/farmer-DOiqQryo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Farmer dashboard: list crops, orders, payments, transport, weather & AI. */
function FarmerDashboard() {
	const { user, crops, orders, addCrop, addRequest, pushNotification } = useApp();
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		quantity: "",
		unit: "kg",
		price: "",
		harvestDate: "",
		location: "",
		image: ""
	});
	if (!user || user.role !== "farmer") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInGate, { role: "farmer" });
	const myCrops = crops;
	const earnings = orders.filter((o) => o.payment === "paid").reduce((s, o) => s + o.amount, 0);
	const submit = () => {
		if (!form.name || !form.quantity || !form.price) {
			toast.error("Crop name, quantity and price are required");
			return;
		}
		addCrop({
			name: form.name,
			nameTa: form.name,
			quantity: Number(form.quantity),
			unit: form.unit,
			price: Number(form.price),
			harvestDate: form.harvestDate || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
			location: form.location || user.location,
			farmer: user.name,
			phone: user.phone,
			image: form.image || "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=800&q=70"
		});
		pushNotification("Crop listed", `${form.name} is now visible to dealers.`);
		toast.success("Crop listed for sale");
		setForm({
			name: "",
			quantity: "",
			unit: "kg",
			price: "",
			harvestDate: "",
			location: "",
			image: ""
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl space-y-6 px-4 pt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardHeader, { subtitle: "Farmer portal · Thanjavur cluster" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Active listings",
						value: String(myCrops.length),
						hint: "visible to dealers",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Open orders",
						value: String(orders.length),
						hint: "this season",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageCheck, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Earnings",
						value: currency(earnings),
						hint: "settled payments",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Transport",
						value: "2 active",
						hint: "drivers assigned",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "upload",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "flex h-auto w-full flex-wrap justify-start gap-1 rounded-2xl p-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "upload",
								className: "rounded-xl",
								children: "Upload crop"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "listings",
								className: "rounded-xl",
								children: "My listings"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "orders",
								className: "rounded-xl",
								children: "Orders & payments"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "transport",
								className: "rounded-xl",
								children: "Transport"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "insights",
								className: "rounded-xl",
								children: "Weather & AI"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "profile",
								className: "rounded-xl",
								children: "Profile"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "upload",
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
							className: "rounded-3xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
									title: "Upload crops for sale",
									subtitle: "Dealers see your listing instantly."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Crop name",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												className: "rounded-xl",
												value: form.name,
												onChange: (e) => setForm({
													...form,
													name: e.target.value
												}),
												placeholder: "e.g. Tomato"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Quantity",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													className: "rounded-xl",
													inputMode: "numeric",
													value: form.quantity,
													onChange: (e) => setForm({
														...form,
														quantity: e.target.value
													}),
													placeholder: "500"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex shrink-0 overflow-hidden rounded-xl border",
													children: ["kg", "ton"].map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => setForm({
															...form,
															unit: u
														}),
														className: `px-3 text-sm font-semibold transition-colors ${form.unit === u ? "gradient-primary text-primary-foreground" : "text-muted-foreground"}`,
														children: u
													}, u))
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: `Price per ${form.unit} (₹)`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												className: "rounded-xl",
												inputMode: "decimal",
												value: form.price,
												onChange: (e) => setForm({
													...form,
													price: e.target.value
												}),
												placeholder: "24"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Harvest date",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												className: "rounded-xl",
												type: "date",
												value: form.harvestDate,
												onChange: (e) => setForm({
													...form,
													harvestDate: e.target.value
												})
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Farm location",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												className: "rounded-xl",
												value: form.location,
												onChange: (e) => setForm({
													...form,
													location: e.target.value
												}),
												placeholder: "Village, District"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Crop image URL",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												className: "rounded-xl",
												value: form.image,
												onChange: (e) => setForm({
													...form,
													image: e.target.value
												}),
												placeholder: "Paste image link"
											})
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed p-6 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-5" }),
										"Upload crop images (drag & drop or browse)",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "file",
											accept: "image/*",
											className: "hidden",
											onChange: (e) => {
												const file = e.target.files?.[0];
												if (file) {
													setForm({
														...form,
														image: URL.createObjectURL(file)
													});
													toast.success(`${file.name} attached`);
												}
											}
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "mt-5 rounded-full gradient-primary text-primary-foreground",
									onClick: submit,
									children: "Publish listing"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "listings",
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
							children: myCrops.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
								className: "overflow-hidden rounded-3xl p-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: c.image,
									alt: c.name,
									loading: "lazy",
									className: "h-40 w-full object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "min-w-0 truncate font-semibold",
												children: c.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
												tone: c.status === "available" ? "success" : "muted",
												children: c.status
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 text-sm text-muted-foreground",
											children: [
												c.quantity,
												" ",
												c.unit,
												" · ",
												currency(c.price),
												"/",
												c.unit
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground",
											children: [
												"Harvest ",
												c.harvestDate,
												" · ",
												c.location
											]
										})
									]
								})]
							}, c.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "orders",
						className: "mt-5 space-y-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
							className: "rounded-3xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
								title: "View orders",
								subtitle: "Chat or call the dealer and follow payment status."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3",
								children: orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 rounded-2xl bg-muted/50 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "truncate font-semibold",
												children: [
													o.crop,
													" · ",
													o.quantity
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "truncate text-sm text-muted-foreground",
												children: [
													o.buyer,
													" · ",
													o.id,
													" · ",
													o.date
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-2 flex flex-wrap gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pill, {
														tone: o.payment === "paid" ? "success" : o.payment === "escrow" ? "sky" : "warning",
														children: ["Payment: ", o.payment]
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
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex shrink-0 gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											variant: "secondary",
											className: "rounded-full",
											onClick: () => toast("Opening chat with " + o.buyer),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }), " Chat"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											variant: "secondary",
											className: "rounded-full",
											onClick: () => toast("Calling " + o.buyer),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), " Call"]
										})]
									})]
								}, o.id))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewList, {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "transport",
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
							className: "rounded-3xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
								title: "Transportation request",
								subtitle: "Post a load and nearby drivers will accept it."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransportForm, { onSubmit: (payload) => {
								addRequest({
									...payload,
									farmerPhone: user.phone,
									dealerPhone: "+91 90876 33221"
								});
								pushNotification("Transport requested", `${payload.crop}: ${payload.from} → ${payload.to}`);
								toast.success("Transport request posted");
							} })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
						value: "insights",
						className: "mt-5 grid gap-5 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
							className: "rounded-3xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid size-11 place-items-center rounded-2xl gradient-harvest text-harvest-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudSun, { className: "size-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-lg font-semibold",
										children: "AI Weather Alert"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Thanjavur · next 5 days"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 rounded-2xl bg-warning/15 p-4 text-sm",
									children: "Moderate showers (18 mm) expected Tuesday evening. Move harvested paddy under cover and delay spraying by 48 hours."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 grid grid-cols-5 gap-2 text-center text-xs",
									children: [
										[
											"Mon",
											"34°",
											"☀️"
										],
										[
											"Tue",
											"29°",
											"🌧️"
										],
										[
											"Wed",
											"30°",
											"⛅"
										],
										[
											"Thu",
											"33°",
											"☀️"
										],
										[
											"Fri",
											"32°",
											"⛅"
										]
									].map(([d, temp, ic]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl bg-muted/60 py-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-semibold",
												children: d
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-lg",
												children: ic
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-muted-foreground",
												children: temp
											})
										]
									}, d))
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
							className: "rounded-3xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid size-11 place-items-center rounded-2xl gradient-primary text-primary-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLine, { className: "size-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-lg font-semibold",
										children: "Crop Price Prediction"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
										tone: "sky",
										children: "Future feature"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-sm text-muted-foreground",
									children: "Forecasts from mandi history, rainfall and arrivals will tell you the best week to sell."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-4 space-y-2 text-sm",
									children: [
										[
											"Tomato",
											"₹22 → ₹26 /kg",
											"+18% in 2 weeks"
										],
										[
											"Paddy",
											"₹28 → ₹27 /kg",
											"-3% in 2 weeks"
										],
										[
											"Onion",
											"₹48 → ₹55 /kg",
											"+14% in 3 weeks"
										]
									].map(([crop, range, delta]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center justify-between rounded-2xl bg-muted/50 px-4 py-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: crop
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: range
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
												tone: delta.startsWith("+") ? "success" : "warning",
												children: delta
											})
										]
									}, crop))
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
function TransportForm({ onSubmit }) {
	const [f, setF] = (0, import_react.useState)({
		crop: "",
		from: "",
		to: "",
		distanceKm: "",
		weight: "",
		payout: ""
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Crop",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "rounded-xl",
					value: f.crop,
					onChange: (e) => setF({
						...f,
						crop: e.target.value
					}),
					placeholder: "Tomato"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Pickup",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "rounded-xl",
					value: f.from,
					onChange: (e) => setF({
						...f,
						from: e.target.value
					}),
					placeholder: "Hosur"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Drop",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "rounded-xl",
					value: f.to,
					onChange: (e) => setF({
						...f,
						to: e.target.value
					}),
					placeholder: "Koyambedu"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Distance (km)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "rounded-xl",
					inputMode: "numeric",
					value: f.distanceKm,
					onChange: (e) => setF({
						...f,
						distanceKm: e.target.value
					}),
					placeholder: "120"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Weight",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "rounded-xl",
					value: f.weight,
					onChange: (e) => setF({
						...f,
						weight: e.target.value
					}),
					placeholder: "800 kg"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Offered payout (₹)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "rounded-xl",
					inputMode: "numeric",
					value: f.payout,
					onChange: (e) => setF({
						...f,
						payout: e.target.value
					}),
					placeholder: "3500"
				})
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		className: "mt-5 rounded-full gradient-primary text-primary-foreground",
		onClick: () => {
			if (!f.crop || !f.from || !f.to) {
				toast.error("Crop, pickup and drop are required");
				return;
			}
			onSubmit({
				crop: f.crop,
				from: f.from,
				to: f.to,
				distanceKm: Number(f.distanceKm) || 50,
				weight: f.weight || "500 kg",
				payout: Number(f.payout) || 2500
			});
			setF({
				crop: "",
				from: "",
				to: "",
				distanceKm: "",
				weight: "",
				payout: ""
			});
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-4" }), " Request driver"]
	})] });
}
//#endregion
export { TransportForm, FarmerDashboard as component };
