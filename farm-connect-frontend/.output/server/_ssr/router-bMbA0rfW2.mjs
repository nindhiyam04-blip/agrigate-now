import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as DialogOverlay, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useNavigate, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { C as Leaf, E as Info, P as Bell, S as LogOut, c as ShieldCheck, g as MessageSquareHeart, h as Moon, i as Sun, p as PhoneCall, r as Truck, t as X, u as ScrollText, v as Menu, w as LayoutDashboard } from "../_libs/lucide-react.mjs";
import { i as Trigger, n as Portal, r as Root2, t as Content2 } from "../_libs/@radix-ui/react-popover+[...].mjs";
import { c as Input, d as AppProvider, l as Button, m as useApp, n as Field, p as roleMeta, u as cn } from "./router-bMbA0rfW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-bMbA0rfW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var styles_default = "/assets/styles-C_oqEalc.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
var Popover = Root2;
var PopoverTrigger = Trigger;
var PopoverContent = import_react.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	align,
	sideOffset,
	className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)", className),
	...props
}) }));
PopoverContent.displayName = Content2.displayName;
/**
* AppShell — glass header (logo left / app name center / hamburger right),
* slide-out navigation menu, notifications, dark mode + language toggles
* and the shared footer.
*/
function AppShell({ children }) {
	const { user, logout, t, lang, setLang, dark, toggleDark, notifications, markAllRead } = useApp();
	const [open, setOpen] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const unread = notifications.filter((n) => !n.read).length;
	const menuItems = [
		{
			to: "/about",
			label: t("nav.about"),
			icon: Info
		},
		{
			to: "/feedback",
			label: t("nav.feedback"),
			icon: MessageSquareHeart
		},
		{
			to: "/contact",
			label: t("nav.contact"),
			icon: PhoneCall
		},
		{
			to: "/privacy",
			label: t("nav.privacy"),
			icon: ShieldCheck
		},
		{
			to: "/terms",
			label: t("nav.terms"),
			icon: ScrollText
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-50 px-3 pt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass mx-auto grid max-w-6xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-full px-3 py-2 sm:px-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "flex min-w-0 items-center gap-2",
							"aria-label": "AgriLink home",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-10 shrink-0 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "size-5" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "min-w-0 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block truncate font-display text-lg font-bold tracking-tight sm:text-xl",
								children: ["Agri", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gradient",
									children: "Link"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:block",
								children: t("hero.badge")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									size: "icon",
									className: "relative rounded-full",
									"aria-label": t("common.notifications"),
									onClick: markAllRead,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-5" }), unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive" })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
								align: "end",
								className: "w-80 rounded-2xl p-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "border-b px-4 py-3 text-sm font-semibold",
									children: t("common.notifications")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "max-h-80 divide-y overflow-auto",
									children: notifications.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "px-4 py-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-medium",
												children: n.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: n.body
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-[11px] text-muted-foreground",
												children: n.time
											})
										]
									}, n.id))
								})]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
								open,
								onOpenChange: setOpen,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										className: "rounded-full",
										"aria-label": "Open menu",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-6" })
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
									className: "glass w-[300px] border-l-0 sm:w-[340px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
											className: "font-display text-xl",
											children: t("nav.menu")
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
											className: "mt-2 flex flex-col gap-1 px-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuLink, {
													to: "/",
													icon: Leaf,
													label: t("nav.home"),
													onNavigate: () => setOpen(false)
												}),
												user && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuLink, {
													to: `/${user.role}`,
													icon: LayoutDashboard,
													label: t("common.dashboard"),
													onNavigate: () => setOpen(false)
												}),
												menuItems.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuLink, {
													to: m.to,
													icon: m.icon,
													label: m.label,
													onNavigate: () => setOpen(false)
												}, m.to)),
												user && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: () => {
														logout();
														setOpen(false);
														navigate({ to: "/" });
													},
													className: "mt-2 flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium text-destructive transition-colors hover:bg-destructive/10",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), t("nav.logout")]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-6 space-y-3 px-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between rounded-2xl bg-muted/60 px-3 py-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-sm font-medium",
														children: "Dark mode"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														variant: "secondary",
														size: "icon",
														className: "rounded-full",
														onClick: toggleDark,
														children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" })
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between rounded-2xl bg-muted/60 px-3 py-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-sm font-medium",
														children: "Language"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex gap-1",
														children: ["en", "ta"].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => setLang(l),
															className: cn("rounded-full px-3 py-1 text-xs font-semibold transition-colors", lang === l ? "gradient-primary text-primary-foreground" : "bg-background text-muted-foreground"),
															children: l === "en" ? "EN" : "தமிழ்"
														}, l))
													})]
												}),
												!user && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													className: "w-full rounded-full gradient-primary text-primary-foreground",
													onClick: () => {
														setOpen(false);
														navigate({
															to: "/auth/$role",
															params: { role: "farmer" }
														});
													},
													children: t("common.login")
												})
											]
										})
									]
								})]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "mt-16 border-t bg-card/40 py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-4 px-5 text-sm text-muted-foreground sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "© 2026 AgriLink — Farm to Dealer Marketplace. Built for Indian agri supply chains." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacy",
								className: "hover:text-primary",
								children: t("nav.privacy")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/terms",
								className: "hover:text-primary",
								children: t("nav.terms")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								className: "hover:text-primary",
								children: t("nav.contact")
							})
						]
					})]
				})
			})
		]
	});
}
function MenuLink({ to, icon: Icon, label, onNavigate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		onClick: onNavigate,
		className: "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), label]
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$14 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "AgriLink — Farm to Dealer Marketplace" },
			{
				name: "description",
				content: "AgriLink connects farmers, dealers and drivers: crop listings, secure payments and transport in one marketplace."
			},
			{
				name: "author",
				content: "AgriLink"
			},
			{
				property: "og:title",
				content: "AgriLink — Farm to Dealer Marketplace"
			},
			{
				property: "og:description",
				content: "Sell crops, buy produce in bulk and book transport in one trusted marketplace."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700;9..144,900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$14.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			position: "top-center",
			richColors: true
		})] })
	});
}
/** Home page: agricultural hero, portal chooser and feature highlights. */
var $$splitComponentImporter$11 = () => import("./routes-DW6Tqp-8.mjs");
var Route$13 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "AgriLink — Farm to Dealer Marketplace" },
		{
			name: "description",
			content: "Farmers list crops, dealers buy in bulk and drivers deliver. Secure payments, live tracking and Tamil + English support."
		},
		{
			property: "og:title",
			content: "AgriLink — Farm to Dealer Marketplace"
		},
		{
			property: "og:description",
			content: "Sell your harvest at a fair price. One marketplace for farmers, dealers and drivers."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./about-DAAMAQsz.mjs");
var Route$12 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About AgriLink — Farm to Dealer Marketplace" },
		{
			name: "description",
			content: "Why AgriLink exists: fair prices for farmers, reliable supply for dealers, steady work for drivers."
		},
		{
			property: "og:title",
			content: "About AgriLink"
		},
		{
			property: "og:description",
			content: "A three-sided agri marketplace built for Indian supply chains."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./contact-Du0hKFYf.mjs");
var Route$11 = createFileRoute("/contact")({
	head: () => ({ meta: [
		{ title: "Contact AgriLink — Support for farmers, dealers and drivers" },
		{
			name: "description",
			content: "Reach the AgriLink support desk by phone, email or the contact form."
		},
		{
			property: "og:title",
			content: "Contact AgriLink"
		},
		{
			property: "og:description",
			content: "Support in Tamil and English, 7 am to 9 pm."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
/** Dealer dashboard: browse & filter crops, buy, book drivers, track delivery. */
var $$splitComponentImporter$8 = () => import("./dealer-DXn8td6t.mjs");
var Route$10 = createFileRoute("/dealer")({
	head: () => ({ meta: [
		{ title: "Dealer Dashboard — AgriLink" },
		{
			name: "description",
			content: "Browse and filter crops, buy in bulk, book drivers and track deliveries."
		},
		{
			property: "og:title",
			content: "Dealer Dashboard — AgriLink"
		},
		{
			property: "og:description",
			content: "Source produce directly from verified farmers."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
/** Driver dashboard: transport requests, vehicle, earnings and live status. */
var $$splitComponentImporter$7 = () => import("./driver-Dp14q4sV.mjs");
var Route$9 = createFileRoute("/driver")({
	head: () => ({ meta: [
		{ title: "Driver Dashboard — AgriLink" },
		{
			name: "description",
			content: "Accept transport requests, manage vehicle details, track earnings and delivery status."
		},
		{
			property: "og:title",
			content: "Driver Dashboard — AgriLink"
		},
		{
			property: "og:description",
			content: "Find loads near you and get paid per delivery."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
/** Farmer dashboard: list crops, orders, payments, transport, weather & AI. */
var $$splitComponentImporter$6 = () => import("./farmer-CG4Ge0rG.mjs");
var Route$8 = createFileRoute("/farmer")({
	head: () => ({ meta: [
		{ title: "Farmer Dashboard — AgriLink" },
		{
			name: "description",
			content: "Upload crops, track orders and payments, request transport and view weather alerts."
		},
		{
			property: "og:title",
			content: "Farmer Dashboard — AgriLink"
		},
		{
			property: "og:description",
			content: "Manage your listings, orders and transport in one place."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
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
var $$splitComponentImporter$5 = () => import("./feedback-x_eeMlFD.mjs");
var Route$7 = createFileRoute("/feedback")({
	head: () => ({ meta: [
		{ title: "Feedback — AgriLink" },
		{
			name: "description",
			content: "Tell the AgriLink team what works, what breaks and what you need next."
		},
		{
			property: "og:title",
			content: "Feedback — AgriLink"
		},
		{
			property: "og:description",
			content: "Share your experience and rate the marketplace."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./login-D5OaxDWt.mjs");
var Route$6 = createFileRoute("/login")({
	head: () => ({ meta: [
		{ title: "Login — AgriLink" },
		{
			name: "description",
			content: "Sign in to AgriLink and access your portal."
		},
		{
			property: "og:title",
			content: "AgriLink Login"
		},
		{
			property: "og:description",
			content: "Secure login for farmer, dealer, and driver portals."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./privacy-B_Sn9W95.mjs");
var Route$5 = createFileRoute("/privacy")({
	head: () => ({ meta: [
		{ title: "Privacy Policy — AgriLink" },
		{
			name: "description",
			content: "How AgriLink collects, uses and protects farmer, dealer and driver data."
		},
		{
			property: "og:title",
			content: "Privacy Policy — AgriLink"
		},
		{
			property: "og:description",
			content: "Our data practices in plain language."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./signup-BU5bJbEA.mjs");
var Route$4 = createFileRoute("/signup")({
	head: () => ({ meta: [{ title: "Sign Up — AgriLink" }, {
		name: "description",
		content: "Create your AgriLink account."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var BASE_URL = "";
var Route$3 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
		...[
			{
				path: "/",
				changefreq: "weekly",
				priority: "1.0"
			},
			{
				path: "/auth/farmer",
				changefreq: "monthly",
				priority: "0.8"
			},
			{
				path: "/auth/dealer",
				changefreq: "monthly",
				priority: "0.8"
			},
			{
				path: "/auth/driver",
				changefreq: "monthly",
				priority: "0.8"
			},
			{
				path: "/farmer",
				changefreq: "weekly",
				priority: "0.6"
			},
			{
				path: "/dealer",
				changefreq: "weekly",
				priority: "0.6"
			},
			{
				path: "/driver",
				changefreq: "weekly",
				priority: "0.6"
			},
			{
				path: "/about",
				changefreq: "yearly",
				priority: "0.5"
			},
			{
				path: "/feedback",
				changefreq: "yearly",
				priority: "0.4"
			},
			{
				path: "/contact",
				changefreq: "yearly",
				priority: "0.5"
			},
			{
				path: "/privacy",
				changefreq: "yearly",
				priority: "0.3"
			},
			{
				path: "/terms",
				changefreq: "yearly",
				priority: "0.3"
			}
		].map((e) => [
			`  <url>`,
			`    <loc>${BASE_URL}${e.path}</loc>`,
			e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
			e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
			e.priority ? `    <priority>${e.priority}</priority>` : null,
			`  </url>`
		].filter(Boolean).join("\n")),
		`</urlset>`
	].join("\n");
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$1 = () => import("./terms-nQB6Y4U2.mjs");
var Route$2 = createFileRoute("/terms")({
	head: () => ({ meta: [
		{ title: "Terms and Conditions — AgriLink" },
		{
			name: "description",
			content: "Rules for using the AgriLink farm to dealer marketplace."
		},
		{
			property: "og:title",
			content: "Terms and Conditions — AgriLink"
		},
		{
			property: "og:description",
			content: "Listing, purchase, transport and payment terms."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./auth._role-BfXc4Spj.mjs");
var Route$1 = createFileRoute("/auth/$role")({
	head: ({ params }) => {
		const label = roleMeta[params.role ?? "farmer"]?.label ?? "Portal";
		return { meta: [
			{ title: `${label} Login — AgriLink` },
			{
				name: "description",
				content: `Use the central login page to access the ${label} portal.`
			},
			{
				property: "og:title",
				content: `${label} Login — AgriLink`
			},
			{
				property: "og:description",
				content: `This portal is handled through the central login flow.`
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$13.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$14
	}),
	AboutRoute: Route$12.update({
		id: "/about",
		path: "/about",
		getParentRoute: () => Route$14
	}),
	ContactRoute: Route$11.update({
		id: "/contact",
		path: "/contact",
		getParentRoute: () => Route$14
	}),
	DealerRoute: Route$10.update({
		id: "/dealer",
		path: "/dealer",
		getParentRoute: () => Route$14
	}),
	DriverRoute: Route$9.update({
		id: "/driver",
		path: "/driver",
		getParentRoute: () => Route$14
	}),
	FarmerRoute: Route$8.update({
		id: "/farmer",
		path: "/farmer",
		getParentRoute: () => Route$14
	}),
	FeedbackRoute: Route$7.update({
		id: "/feedback",
		path: "/feedback",
		getParentRoute: () => Route$14
	}),
	LoginRoute: Route$6.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$14
	}),
	PrivacyRoute: Route$5.update({
		id: "/privacy",
		path: "/privacy",
		getParentRoute: () => Route$14
	}),
	SignupRoute: Route$4.update({
		id: "/signup",
		path: "/signup",
		getParentRoute: () => Route$14
	}),
	SitemapDotxmlRoute: Route$3.update({
		id: "/sitemap.xml",
		path: "/sitemap.xml",
		getParentRoute: () => Route$14
	}),
	TermsRoute: Route$2.update({
		id: "/terms",
		path: "/terms",
		getParentRoute: () => Route$14
	}),
	AuthRoleRoute: Route$1.update({
		id: "/auth/$role",
		path: "/auth/$role",
		getParentRoute: () => Route$14
	})
};
var routeTree = Route$14._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { router_exports as i, TransportForm as n, getRouter as r, Route$1 as t };
