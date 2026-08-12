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
		"mtime": "2026-08-09T11:04:02.774Z",
		"size": 1256,
		"path": "../public/assets/about-B6rMOxHu.js"
	},
	"/assets/app-store-OXDtj3AI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"348d-DbUvRDixfFmvGGFbSgx0nlZnRm4\"",
		"mtime": "2026-08-09T11:04:02.774Z",
		"size": 13453,
		"path": "../public/assets/app-store-OXDtj3AI.js"
	},
	"/assets/auth._role-C4P7HOWz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24a-1Oyz/nrL1QLpbiQykD+Qz44j83s\"",
		"mtime": "2026-08-09T11:04:02.774Z",
		"size": 586,
		"path": "../public/assets/auth._role-C4P7HOWz.js"
	},
	"/assets/auth._role-D3OSjEn5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"339-zcKT4tYDgpFffjrotHYteUKt1hk\"",
		"mtime": "2026-08-09T11:04:02.774Z",
		"size": 825,
		"path": "../public/assets/auth._role-D3OSjEn5.js"
	},
	"/assets/button--d4P5iSD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7cf6-1MeKUeTsKABylcLtaeDLCWByHns\"",
		"mtime": "2026-08-09T11:04:02.774Z",
		"size": 31990,
		"path": "../public/assets/button--d4P5iSD.js"
	},
	"/assets/client-Ctz6Yc_E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"38bad-KsQlC/TLSCr6+6RZkBxO56Skv3Q\"",
		"mtime": "2026-08-09T11:04:02.774Z",
		"size": 232365,
		"path": "../public/assets/client-Ctz6Yc_E.js"
	},
	"/assets/contact-CXUsePnd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"71c-1edsFrBnWArllj/hXonVDZe7/GI\"",
		"mtime": "2026-08-09T11:04:02.774Z",
		"size": 1820,
		"path": "../public/assets/contact-CXUsePnd.js"
	},
	"/assets/ContentPage-B7s1n6h8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24a-4WAxh0GOl5cnXw3NKfO7bNC/950\"",
		"mtime": "2026-08-09T11:04:02.774Z",
		"size": 586,
		"path": "../public/assets/ContentPage-B7s1n6h8.js"
	},
	"/assets/createLucideIcon-BO9cFlkI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d0-Xp204zd2BTTH09XLmsrZAo3fQPM\"",
		"mtime": "2026-08-09T11:04:02.774Z",
		"size": 1232,
		"path": "../public/assets/createLucideIcon-BO9cFlkI.js"
	},
	"/assets/dealer-CM4wtLcQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"50a2-fz3UH+0iZE1LBUOcZSfAL3v/5E0\"",
		"mtime": "2026-08-09T11:04:02.774Z",
		"size": 20642,
		"path": "../public/assets/dealer-CM4wtLcQ.js"
	},
	"/assets/dist-B0T0dcM6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f69-XjBOaJVVONusQbteuojXw1ZbmHA\"",
		"mtime": "2026-08-09T11:04:02.774Z",
		"size": 8041,
		"path": "../public/assets/dist-B0T0dcM6.js"
	},
	"/assets/driver-Bu-t-OQY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a99-6+UsxiPQ3w0kkilWKl2rgsqGJDA\"",
		"mtime": "2026-08-09T11:04:02.774Z",
		"size": 10905,
		"path": "../public/assets/driver-Bu-t-OQY.js"
	},
	"/assets/farmer-BX34fFnW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"df9-jbDKwAL4KdzPBDI44zwkyulvivU\"",
		"mtime": "2026-08-09T11:04:02.774Z",
		"size": 3577,
		"path": "../public/assets/farmer-BX34fFnW.js"
	},
	"/assets/farmer-DaIe6zS3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3264-n+2y7YuGkGB0umqJaMCDMkBWxH4\"",
		"mtime": "2026-08-09T11:04:02.774Z",
		"size": 12900,
		"path": "../public/assets/farmer-DaIe6zS3.js"
	},
	"/assets/feedback-DObfxsLp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"62b-Fsxe3LvMbgVwocHFvtiJIj7roWg\"",
		"mtime": "2026-08-09T11:04:02.774Z",
		"size": 1579,
		"path": "../public/assets/feedback-DObfxsLp.js"
	},
	"/assets/hero-farm-BeMafWbN.jpg": {
		"type": "image/jpeg",
		"etag": "\"6a516-CQwYt+FN1ALwjkYcsMk+OhOvTtQ\"",
		"mtime": "2026-08-09T11:04:02.805Z",
		"size": 435478,
		"path": "../public/assets/hero-farm-BeMafWbN.jpg"
	},
	"/assets/index-C_e_PHWS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5cd3b-4/M99FXKr9Bj5aJQr+g8+YZnRx8\"",
		"mtime": "2026-08-09T11:04:02.758Z",
		"size": 380219,
		"path": "../public/assets/index-C_e_PHWS.js"
	},
	"/assets/indian-rupee-DPZxiLc4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"123-44CTkHHMhPgAGhzpxXhPVB5EPRM\"",
		"mtime": "2026-08-09T11:04:02.774Z",
		"size": 291,
		"path": "../public/assets/indian-rupee-DPZxiLc4.js"
	},
	"/assets/input-BANO7gP1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8154-2IGoUrUupQv/AAvo/92bYzs2fww\"",
		"mtime": "2026-08-09T11:04:02.774Z",
		"size": 33108,
		"path": "../public/assets/input-BANO7gP1.js"
	},
	"/assets/jsx-runtime-BkSabwWG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c1-VkW1xFbt56H2FC99QIi6PTzaFIo\"",
		"mtime": "2026-08-09T11:04:02.774Z",
		"size": 961,
		"path": "../public/assets/jsx-runtime-BkSabwWG.js"
	},
	"/assets/login-B3OwiRcX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a02-HfHo3BbhzMxSZ8kuPRp+ja/9Z88\"",
		"mtime": "2026-08-09T11:04:02.789Z",
		"size": 2562,
		"path": "../public/assets/login-B3OwiRcX.js"
	},
	"/assets/map-pin-DFvnZ_OX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-pYIN4jLMEA0SvL5apecXhWxWxjA\"",
		"mtime": "2026-08-09T11:04:02.789Z",
		"size": 259,
		"path": "../public/assets/map-pin-DFvnZ_OX.js"
	},
	"/assets/phone-Beq85usA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"142-sox77XeaiwNDmWi6IE3XjXFqrtE\"",
		"mtime": "2026-08-09T11:04:02.789Z",
		"size": 322,
		"path": "../public/assets/phone-Beq85usA.js"
	},
	"/assets/preload-helper-CzNaNXT6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1844-Z5ACwZIG7twPYoORKA2WYX5HMAc\"",
		"mtime": "2026-08-09T11:04:02.789Z",
		"size": 6212,
		"path": "../public/assets/preload-helper-CzNaNXT6.js"
	},
	"/assets/privacy-tzKHAwJb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"69a-zWZ1OAKye0PBgOCS7p0LNLbBeFo\"",
		"mtime": "2026-08-09T11:04:02.789Z",
		"size": 1690,
		"path": "../public/assets/privacy-tzKHAwJb.js"
	},
	"/assets/react-dom-ScW3QYYH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2afb-dPwtDLhnyh20ikSm6DrI6zGmigY\"",
		"mtime": "2026-08-09T11:04:02.789Z",
		"size": 11003,
		"path": "../public/assets/react-dom-ScW3QYYH.js"
	},
	"/assets/routes-BwaNF91t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cc3-xCg+jDtSL0fcKbOqFOWBtMOcvyI\"",
		"mtime": "2026-08-09T11:04:02.789Z",
		"size": 7363,
		"path": "../public/assets/routes-BwaNF91t.js"
	},
	"/assets/shared-JMWnSZeD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4aea-Daxu0cX9GLVKOEAz6wn6hxj/QoE\"",
		"mtime": "2026-08-09T11:04:02.789Z",
		"size": 19178,
		"path": "../public/assets/shared-JMWnSZeD.js"
	},
	"/assets/shield-check-CY-qJOs6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-GMczCUff1Ts9Z0rC7ySeq7LZfUg\"",
		"mtime": "2026-08-09T11:04:02.789Z",
		"size": 320,
		"path": "../public/assets/shield-check-CY-qJOs6.js"
	},
	"/assets/signup-Dvdgc-4r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"df7-CBXNhjkdZh0AhNbr9rdeL/2CeEc\"",
		"mtime": "2026-08-09T11:04:02.789Z",
		"size": 3575,
		"path": "../public/assets/signup-Dvdgc-4r.js"
	},
	"/assets/sprout-DUL5W-zt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"287-jW5y6tzY/9sGUhu5bLnExHDz7fw\"",
		"mtime": "2026-08-09T11:04:02.789Z",
		"size": 647,
		"path": "../public/assets/sprout-DUL5W-zt.js"
	},
	"/assets/terms-DDqbg3Dq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7b9-WLRc4NHwpcTUhqn4a9UApwhzpzw\"",
		"mtime": "2026-08-09T11:04:02.789Z",
		"size": 1977,
		"path": "../public/assets/terms-DDqbg3Dq.js"
	},
	"/assets/textarea-DC2YEq33.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"223-G0kN7nrzY1e8kISQAxAJzMZ+9rA\"",
		"mtime": "2026-08-09T11:04:02.789Z",
		"size": 547,
		"path": "../public/assets/textarea-DC2YEq33.js"
	},
	"/assets/styles-C_oqEalc.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1485b-n/ceCXx65fHsy4aUmvijR3PoAGg\"",
		"mtime": "2026-08-09T11:04:02.805Z",
		"size": 84059,
		"path": "../public/assets/styles-C_oqEalc.css"
	},
	"/assets/truck-BEG-di2t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"196-AYspUaRVvdBmAEaZLcjsz2ONeKg\"",
		"mtime": "2026-08-09T11:04:02.789Z",
		"size": 406,
		"path": "../public/assets/truck-BEG-di2t.js"
	},
	"/assets/ui-kit-Ci_MU2-u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"820-z2/wfwh+CSVaafhqogTyGD9nbv8\"",
		"mtime": "2026-08-09T11:04:02.789Z",
		"size": 2080,
		"path": "../public/assets/ui-kit-Ci_MU2-u.js"
	},
	"/assets/useNavigate-Bi2oVLA_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"106-JYvJX+c5HLENPQt2oOmGaJ8DhMw\"",
		"mtime": "2026-08-09T11:04:02.789Z",
		"size": 262,
		"path": "../public/assets/useNavigate-Bi2oVLA_.js"
	},
	"/assets/x-DjWCuyH8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-864hLIMqCSbs6k2inGI2VK77MKw\"",
		"mtime": "2026-08-09T11:04:02.805Z",
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
