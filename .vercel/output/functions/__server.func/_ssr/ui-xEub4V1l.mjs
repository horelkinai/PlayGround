import { T as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./use-i18n-DMLbRgsP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-xEub4V1l.js
var import_jsx_runtime = require_jsx_runtime();
function Button({ className, variant = "primary", ...props }) {
	const styles = {
		primary: "bg-accent text-accent-fg hover:bg-accent/90",
		ghost: "bg-elevated text-fg hover:bg-surface",
		line: "border border-line bg-transparent text-fg hover:bg-elevated",
		danger: "bg-accent/20 text-accent hover:bg-accent/30"
	}[variant];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-opacity duration-150 disabled:opacity-50", styles, className),
		...props
	});
}
function Field({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("min-h-11 w-full rounded-lg border border-line bg-surface px-4 text-sm text-fg placeholder:text-subtle", className),
		...props
	});
}
function Area({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-28 w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-fg placeholder:text-subtle", className),
		...props
	});
}
function Chip({ active, className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: cn("min-h-10 rounded-full border px-4 text-sm", active ? "border-cream bg-cream text-bg" : "border-line bg-transparent text-muted hover:text-fg", className),
		...props
	});
}
//#endregion
export { Field as i, Button as n, Chip as r, Area as t };
