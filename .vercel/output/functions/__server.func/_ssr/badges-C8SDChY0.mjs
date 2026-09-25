import { T as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as BadgeCheck, m as Crown, r as Star } from "../_libs/lucide-react.mjs";
import { g as DICT } from "./router-CWqAbG_v.mjs";
import { t as cn } from "./use-i18n-DMLbRgsP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badges-C8SDChY0.js
var import_jsx_runtime = require_jsx_runtime();
function VerifiedBadge({ lang, className }) {
	const t = DICT[lang];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1 rounded-full bg-verified/15 px-2 py-0.5 text-[11px] font-medium text-verified", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "size-3.5" }), t.verified]
	});
}
function VipBadge({ lang, className }) {
	const t = DICT[lang];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1 rounded-full bg-vip/15 px-2 py-0.5 text-[11px] font-medium text-vip", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "size-3.5" }), t.vip]
	});
}
function TopBadge({ lang, className }) {
	const t = DICT[lang];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-medium text-accent", className),
		children: t.top
	});
}
function RatingMark({ value, count, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1 text-sm tabular-nums text-cream", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5 fill-vip text-vip" }),
			value.toFixed(1),
			typeof count === "number" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-muted",
				children: ["· ", count]
			}) : null
		]
	});
}
function BadgeRow({ lang, verified, vip, top }) {
	if (!verified && !vip && !top) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap gap-1",
		children: [
			verified ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, { lang }) : null,
			vip ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VipBadge, { lang }) : null,
			top ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBadge, { lang }) : null
		]
	});
}
//#endregion
export { RatingMark as n, BadgeRow as t };
