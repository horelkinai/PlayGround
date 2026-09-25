import { T as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as NEW_IDS, f as profileById, r as useAppStore } from "./router-CWqAbG_v.mjs";
import { n as useI18n } from "./use-i18n-DMLbRgsP.mjs";
import { n as ProfileCard, r as SectionTitle } from "./cards-BdeDikRX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/new-DzHqwuni.js
var import_jsx_runtime = require_jsx_runtime();
function NewPage() {
	const { t } = useI18n();
	const blocked = useAppStore((s) => s.blocked);
	const profiles = NEW_IDS.map((id) => profileById(id)).filter((p) => !!p && !blocked.includes(p.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: t.newProfiles }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4",
			children: profiles.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileCard, {
				profile: p,
				variant: "grid"
			}, p.id))
		})]
	});
}
//#endregion
export { NewPage as component };
