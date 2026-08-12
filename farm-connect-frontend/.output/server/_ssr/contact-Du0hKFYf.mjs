import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as ContentPage } from "./ContentPage-IqTtvFf4.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { b as MapPin, f as Phone, x as Mail } from "../_libs/lucide-react.mjs";
import { c as Input, l as Button, n as Field } from "./router-bMbA0rfW.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-Du0hKFYf.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContentPage, {
	eyebrow: "Contact us",
	title: "We answer in Tamil and English",
	intro: "Support desk open 7:00 am – 9:00 pm, all days.",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-3",
			children: [
				{
					icon: Phone,
					label: "Helpline",
					value: "1800 200 4567"
				},
				{
					icon: Mail,
					label: "Email",
					value: "support@agrilink.in"
				},
				{
					icon: MapPin,
					label: "Office",
					value: "Anna Salai, Chennai 600002"
				}
			].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-muted/50 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.icon, { className: "size-5 text-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs uppercase tracking-wide",
						children: c.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-foreground",
						children: c.value
					})
				]
			}, c.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Name",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "rounded-xl",
					placeholder: "Your name"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Mobile",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "rounded-xl",
					placeholder: "+91 98400 00000"
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Message",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				className: "min-h-32 rounded-xl",
				placeholder: "How can we help?"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "rounded-full gradient-primary text-primary-foreground",
			onClick: () => toast.success("Message sent — we'll call you back"),
			children: "Send message"
		})
	]
});
//#endregion
export { SplitComponent as component };
