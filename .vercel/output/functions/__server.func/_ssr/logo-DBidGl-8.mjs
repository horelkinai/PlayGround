import { T as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./use-i18n-DMLbRgsP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/logo-DBidGl-8.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Primary brand mark: white script "Israel 1+1" + Israeli flag.
* compact — smaller height for mobile header.
* textFallback — pure text if image unavailable.
*/
function Logo({ className, compact = false, textFallback = false }) {
	if (textFallback) {
		if (compact) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("font-display text-lg tracking-wide text-cream", className),
			children: "1+1"
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("flex items-end gap-2", className),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "leading-none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-[0.7rem] tracking-[0.35em] text-cream/80",
					children: "ISRAEL"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-4xl leading-none tracking-wide text-cream",
					children: "1+1"
				})]
			})
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/brand/logo-israel-1plus1.png",
		alt: "Israel 1+1",
		className: cn("w-auto object-contain object-center", compact ? "h-8 max-w-[160px]" : "h-10 max-w-[220px] sm:h-11 sm:max-w-[260px]", className)
	});
}
//#endregion
export { Logo as t };
