globalThis.__nitro_main__ = import.meta.url;
import { n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-08-08T15:32:08.679Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"19-yHADZo6lKl+mSNPU9098EiqzPCE\"",
		"mtime": "2026-08-08T15:32:08.679Z",
		"size": 25,
		"path": "../public/robots.txt"
	},
	"/assets/about-B6rMOxHu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e8-e55E76ZqpKrwSDIb71FLDtE7VxM\"",
		"mtime": "2026-08-09T09:20:42.369Z",
		"size": 1256,
		"path": "../public/assets/about-B6rMOxHu.js"
	},
	"/assets/auth._role-CEwhPorJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24a-i4BkqNNJtwA7RTR358XwPadjoyw\"",
		"mtime": "2026-08-09T09:20:42.369Z",
		"size": 586,
		"path": "../public/assets/auth._role-CEwhPorJ.js"
	},
	"/assets/auth._role-Dg-uGzGW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"341-KFSg+aZk0gLe2Ru/Ui4CYv+2OeE\"",
		"mtime": "2026-08-09T09:20:42.369Z",
		"size": 833,
		"path": "../public/assets/auth._role-Dg-uGzGW.js"
	},
	"/assets/button--d4P5iSD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7cf6-1MeKUeTsKABylcLtaeDLCWByHns\"",
		"mtime": "2026-08-09T09:20:42.369Z",
		"size": 31990,
		"path": "../public/assets/button--d4P5iSD.js"
	},
	"/assets/contact-CXUsePnd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"71c-1edsFrBnWArllj/hXonVDZe7/GI\"",
		"mtime": "2026-08-09T09:20:42.369Z",
		"size": 1820,
		"path": "../public/assets/contact-CXUsePnd.js"
	},
	"/assets/app-store-BSc3v_7n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3be64-p/89G8kEAD42M2iKN/nr0uHziRI\"",
		"mtime": "2026-08-09T09:20:42.369Z",
		"size": 245348,
		"path": "../public/assets/app-store-BSc3v_7n.js"
	},
	"/assets/ContentPage-B7s1n6h8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24a-4WAxh0GOl5cnXw3NKfO7bNC/950\"",
		"mtime": "2026-08-09T09:20:42.354Z",
		"size": 586,
		"path": "../public/assets/ContentPage-B7s1n6h8.js"
	},
	"/assets/createLucideIcon-BO9cFlkI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d0-Xp204zd2BTTH09XLmsrZAo3fQPM\"",
		"mtime": "2026-08-09T09:20:42.369Z",
		"size": 1232,
		"path": "../public/assets/createLucideIcon-BO9cFlkI.js"
	},
	"/assets/dealer-DfI-AKbT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"50a7-Q6dlxq27XECLJLU1yoC2zoRrDH0\"",
		"mtime": "2026-08-09T09:20:42.369Z",
		"size": 20647,
		"path": "../public/assets/dealer-DfI-AKbT.js"
	},
	"/assets/dist-B0T0dcM6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f69-XjBOaJVVONusQbteuojXw1ZbmHA\"",
		"mtime": "2026-08-09T09:20:42.369Z",
		"size": 8041,
		"path": "../public/assets/dist-B0T0dcM6.js"
	},
	"/assets/driver-BySa5uZx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a9e-ADnVXxERTK/aXMZQqb5urOkVRk0\"",
		"mtime": "2026-08-09T09:20:42.369Z",
		"size": 10910,
		"path": "../public/assets/driver-BySa5uZx.js"
	},
	"/assets/farmer-C7Q9dNw5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3269-PUFaf3lCvRn43O5KAqFvxggDxZs\"",
		"mtime": "2026-08-09T09:20:42.369Z",
		"size": 12905,
		"path": "../public/assets/farmer-C7Q9dNw5.js"
	},
	"/assets/farmer-CmmRp4pR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dda-4C5S4WCinuxL6ovg2h8ZXSZWgxs\"",
		"mtime": "2026-08-09T09:20:42.369Z",
		"size": 3546,
		"path": "../public/assets/farmer-CmmRp4pR.js"
	},
	"/assets/feedback-DObfxsLp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"62b-Fsxe3LvMbgVwocHFvtiJIj7roWg\"",
		"mtime": "2026-08-09T09:20:42.369Z",
		"size": 1579,
		"path": "../public/assets/feedback-DObfxsLp.js"
	},
	"/assets/indian-rupee-DPZxiLc4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"123-44CTkHHMhPgAGhzpxXhPVB5EPRM\"",
		"mtime": "2026-08-09T09:20:42.369Z",
		"size": 291,
		"path": "../public/assets/indian-rupee-DPZxiLc4.js"
	},
	"/assets/input-BANO7gP1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8154-2IGoUrUupQv/AAvo/92bYzs2fww\"",
		"mtime": "2026-08-09T09:20:42.385Z",
		"size": 33108,
		"path": "../public/assets/input-BANO7gP1.js"
	},
	"/assets/jsx-runtime-BkSabwWG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c1-VkW1xFbt56H2FC99QIi6PTzaFIo\"",
		"mtime": "2026-08-09T09:20:42.385Z",
		"size": 961,
		"path": "../public/assets/jsx-runtime-BkSabwWG.js"
	},
	"/assets/login-DNSttL9s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"934-expkNt8HMhtB8S77WF+nxqXNeCE\"",
		"mtime": "2026-08-09T09:20:42.385Z",
		"size": 2356,
		"path": "../public/assets/login-DNSttL9s.js"
	},
	"/assets/map-pin-DFvnZ_OX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-pYIN4jLMEA0SvL5apecXhWxWxjA\"",
		"mtime": "2026-08-09T09:20:42.385Z",
		"size": 259,
		"path": "../public/assets/map-pin-DFvnZ_OX.js"
	},
	"/assets/index-CUsAdM0e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5cb8a-gIPhSJYyts1X5MyGlq8Vryk6YJc\"",
		"mtime": "2026-08-09T09:20:42.354Z",
		"size": 379786,
		"path": "../public/assets/index-CUsAdM0e.js"
	},
	"/assets/phone-Beq85usA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"142-sox77XeaiwNDmWi6IE3XjXFqrtE\"",
		"mtime": "2026-08-09T09:20:42.385Z",
		"size": 322,
		"path": "../public/assets/phone-Beq85usA.js"
	},
	"/assets/preload-helper-Bzh6w0lj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"183d-l949l6972VTzvo2/KHv3fWmDrdE\"",
		"mtime": "2026-08-09T09:20:42.385Z",
		"size": 6205,
		"path": "../public/assets/preload-helper-Bzh6w0lj.js"
	},
	"/assets/hero-farm-BeMafWbN.jpg": {
		"type": "image/jpeg",
		"etag": "\"6a516-CQwYt+FN1ALwjkYcsMk+OhOvTtQ\"",
		"mtime": "2026-08-09T09:20:42.401Z",
		"size": 435478,
		"path": "../public/assets/hero-farm-BeMafWbN.jpg"
	},
	"/assets/privacy-tzKHAwJb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"69a-zWZ1OAKye0PBgOCS7p0LNLbBeFo\"",
		"mtime": "2026-08-09T09:20:42.385Z",
		"size": 1690,
		"path": "../public/assets/privacy-tzKHAwJb.js"
	},
	"/assets/react-dom-ScW3QYYH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2afb-dPwtDLhnyh20ikSm6DrI6zGmigY\"",
		"mtime": "2026-08-09T09:20:42.385Z",
		"size": 11003,
		"path": "../public/assets/react-dom-ScW3QYYH.js"
	},
	"/assets/routes-D0cPUW8p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ca1-p7KQGbEs7rnAR8ENb9pXzQvr1bI\"",
		"mtime": "2026-08-09T09:20:42.385Z",
		"size": 7329,
		"path": "../public/assets/routes-D0cPUW8p.js"
	},
	"/assets/shared-BB13mtRd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ac8-o3dhGdKomNLN++XGkum29xsNJLM\"",
		"mtime": "2026-08-09T09:20:42.385Z",
		"size": 19144,
		"path": "../public/assets/shared-BB13mtRd.js"
	},
	"/assets/shield-check-CY-qJOs6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-GMczCUff1Ts9Z0rC7ySeq7LZfUg\"",
		"mtime": "2026-08-09T09:20:42.385Z",
		"size": 320,
		"path": "../public/assets/shield-check-CY-qJOs6.js"
	},
	"/assets/sprout-DUL5W-zt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"287-jW5y6tzY/9sGUhu5bLnExHDz7fw\"",
		"mtime": "2026-08-09T09:20:42.385Z",
		"size": 647,
		"path": "../public/assets/sprout-DUL5W-zt.js"
	},
	"/assets/styles-UdJz6UVw.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"147fa-ljgeajdTM8XimdCBJomuxcvlD1A\"",
		"mtime": "2026-08-09T09:20:42.407Z",
		"size": 83962,
		"path": "../public/assets/styles-UdJz6UVw.css"
	},
	"/assets/terms-DDqbg3Dq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7b9-WLRc4NHwpcTUhqn4a9UApwhzpzw\"",
		"mtime": "2026-08-09T09:20:42.401Z",
		"size": 1977,
		"path": "../public/assets/terms-DDqbg3Dq.js"
	},
	"/assets/textarea-DC2YEq33.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"223-G0kN7nrzY1e8kISQAxAJzMZ+9rA\"",
		"mtime": "2026-08-09T09:20:42.401Z",
		"size": 547,
		"path": "../public/assets/textarea-DC2YEq33.js"
	},
	"/assets/truck-BEG-di2t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"196-AYspUaRVvdBmAEaZLcjsz2ONeKg\"",
		"mtime": "2026-08-09T09:20:42.401Z",
		"size": 406,
		"path": "../public/assets/truck-BEG-di2t.js"
	},
	"/assets/ui-kit-Ci_MU2-u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"820-z2/wfwh+CSVaafhqogTyGD9nbv8\"",
		"mtime": "2026-08-09T09:20:42.401Z",
		"size": 2080,
		"path": "../public/assets/ui-kit-Ci_MU2-u.js"
	},
	"/assets/useNavigate-DhLvc8XB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109-E31AJRkHzy0DhboB6OQjDS3gfkk\"",
		"mtime": "2026-08-09T09:20:42.401Z",
		"size": 265,
		"path": "../public/assets/useNavigate-DhLvc8XB.js"
	},
	"/assets/x-DjWCuyH8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-864hLIMqCSbs6k2inGI2VK77MKw\"",
		"mtime": "2026-08-09T09:20:42.401Z",
		"size": 154,
		"path": "../public/assets/x-DjWCuyH8.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region ../node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_C0ebQE = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_C0ebQE
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region ../node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region ../node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region ../node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region ../node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
