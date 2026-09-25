import { i as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as LANGS } from "./router-CWqAbG_v.mjs";
import { t as cn } from "./use-i18n-DMLbRgsP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lang-switch-CAAajOcN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LangSwitch({ value, onChange, className }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const current = LANGS.find((l) => l.id === value) ?? LANGS[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setOpen((v) => !v),
			className: "grid size-10 place-items-center rounded-full border border-white/20 bg-black/40 text-[11px] font-semibold tracking-wide text-cream backdrop-blur",
			"aria-label": "Language",
			children: current.id.toUpperCase()
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute end-0 top-12 z-40 min-w-36 overflow-hidden rounded-xl border border-line bg-surface shadow-xl",
			children: LANGS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => {
					onChange(l.id);
					setOpen(false);
				},
				className: cn("flex min-h-10 w-full items-center justify-between px-3 text-sm", value === l.id ? "bg-elevated text-cream" : "text-muted hover:text-fg"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l.native }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px]",
					children: l.id.toUpperCase()
				})]
			}, l.id))
		}) : null]
	});
}
//#endregion
export { LangSwitch as t };
