import { T as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useAppStore } from "./router-CWqAbG_v.mjs";
import { n as useI18n } from "./use-i18n-DMLbRgsP.mjs";
import { n as ProfileCard, r as SectionTitle } from "./cards-BdeDikRX.mjs";
import { t as useAllProfiles } from "./profiles-catalog-DRuSpucF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/favorites-BdKiFJRI.js
var import_jsx_runtime = require_jsx_runtime();
function FavoritesPage() {
	const { t } = useI18n();
	const favorites = useAppStore((s) => s.favorites);
	const blocked = useAppStore((s) => s.blocked);
	const list = useAllProfiles().filter((p) => favorites[p.id] && !blocked.includes(p.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: t.navFav }), list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "py-16 text-center text-muted",
			children: t.empty
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4",
			children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileCard, {
				profile: p,
				variant: "grid"
			}, p.id))
		})]
	});
}
//#endregion
export { FavoritesPage as component };
