import { T as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useI18n } from "./use-i18n-DMLbRgsP.mjs";
import { t as Logo } from "./logo-DBidGl-8.mjs";
import { n as Button } from "./ui-xEub4V1l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-DMsIkjZt.js
var import_jsx_runtime = require_jsx_runtime();
function PrivacyPage() {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-lg space-y-6 px-6 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-wide text-cream",
				children: t.privacyTitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "leading-relaxed text-muted",
				children: t.privacyBody
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "line",
					children: t.back
				})
			})
		]
	});
}
//#endregion
export { PrivacyPage as component };
