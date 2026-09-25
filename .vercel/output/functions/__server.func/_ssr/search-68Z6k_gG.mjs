import { i as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime, Z as require_react, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as CITIES, r as useAppStore, s as CITY_LABEL } from "./router-CWqAbG_v.mjs";
import { n as useI18n } from "./use-i18n-DMLbRgsP.mjs";
import { r as SectionTitle } from "./cards-BdeDikRX.mjs";
import { i as Field, r as Chip } from "./ui-xEub4V1l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-68Z6k_gG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SearchPage() {
	const { t, lang } = useI18n();
	const discovery = useAppStore((s) => s.discovery);
	const setDiscovery = useAppStore((s) => s.setDiscovery);
	const isGuest = useAppStore((s) => s.isGuest());
	const [city, setCity] = (0, import_react.useState)("");
	const [ageMin, setAgeMin] = (0, import_react.useState)("18");
	const [ageMax, setAgeMax] = (0, import_react.useState)("45");
	const [verifiedOnly, setVerifiedOnly] = (0, import_react.useState)(false);
	const [vipOnly, setVipOnly] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 px-4 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: t.navSearch || t.search }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: t.searchHint || "Укажите предпочтения — лента и каталог подстроятся под них."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 rounded-xl border border-line bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs tracking-wide text-muted uppercase",
						children: t.discTitle || "Кого ищете?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							["women", t.discWomen],
							["men", t.discMen],
							["all", t.discAll]
						].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: discovery === id,
							onClick: () => setDiscovery(id),
							children: label
						}, id))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-1.5 text-xs text-muted",
							children: t.city || "Город"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							value: city,
							onChange: (e) => setCity(e.target.value),
							placeholder: CITY_LABEL[lang]?.["Tel Aviv"] || "Tel Aviv",
							list: "city-list"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
							id: "city-list",
							children: CITIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: CITY_LABEL[lang]?.[c] ?? c }, c))
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-1.5 text-xs text-muted",
							children: t.ageMin || "Возраст от"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							type: "number",
							min: 18,
							max: 99,
							value: ageMin,
							onChange: (e) => setAgeMin(e.target.value)
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-1.5 text-xs text-muted",
							children: t.ageMax || "до"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							type: "number",
							min: 18,
							max: 99,
							value: ageMax,
							onChange: (e) => setAgeMax(e.target.value)
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: verifiedOnly,
							onClick: () => setVerifiedOnly((v) => !v),
							children: "Verified"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: vipOnly,
							onClick: () => setVipOnly((v) => !v),
							children: "VIP"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-2 pt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/directory",
							className: "block rounded-lg bg-accent py-3 text-center text-sm font-medium text-black",
							children: t.openCatalog || t.navDir
						})
					})
				]
			}),
			isGuest && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-sm text-muted",
				children: t.guestCta || "Зарегистрируйтесь, чтобы пользоваться функциями платформы"
			})
		]
	});
}
//#endregion
export { SearchPage as component };
