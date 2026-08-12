import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as ContentPage } from "./ContentPage-IqTtvFf4.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as Input, l as Button, n as Field } from "./router-bMbA0rfW.mjs";
import { t as Textarea } from "./textarea-DBn9CRiI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/feedback-x_eeMlFD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Feedback() {
	const [stars, setStars] = (0, import_react.useState)(5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContentPage, {
		eyebrow: "Feedback",
		title: "Tell us how AgriLink is working for you",
		intro: "Every review is read by the product team.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-sm font-medium text-foreground",
					children: "Your rating"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1 text-3xl",
					children: [
						1,
						2,
						3,
						4,
						5
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setStars(n),
						"aria-label": `${n} stars`,
						className: "transition-transform hover:scale-110",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: n <= stars ? "text-harvest" : "text-muted-foreground/40",
							children: "★"
						})
					}, n))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "rounded-xl",
							placeholder: "Your name"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Role",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "rounded-xl",
							placeholder: "Farmer / Dealer / Driver"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Your feedback",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						className: "min-h-32 rounded-xl",
						placeholder: "What should we improve?"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "rounded-full gradient-primary text-primary-foreground",
					onClick: () => toast.success("Thanks — feedback submitted"),
					children: "Submit feedback"
				})
			]
		})
	});
}
//#endregion
export { Feedback as component };
