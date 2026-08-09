import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$1 } from "./router-hH4uaiaK2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth._role-C_7gOI7L.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var roles = [
	"farmer",
	"dealer",
	"driver"
];
function AuthPage() {
	const { role } = Route$1.useParams();
	const navigate = useNavigate();
	const activeRole = roles.includes(role) ? role : "farmer";
	(0, import_react.useEffect)(() => {
		navigate({
			to: "/login",
			search: { role: activeRole },
			replace: true
		});
	}, [navigate, activeRole]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-3xl px-5 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-center text-sm text-muted-foreground",
			children: "Redirecting to the login page…"
		})
	});
}
//#endregion
export { AuthPage as component };
