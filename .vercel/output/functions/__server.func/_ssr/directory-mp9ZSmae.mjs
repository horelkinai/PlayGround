import { i as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as CITIES, r as useAppStore, s as CITY_LABEL } from "./router-CWqAbG_v.mjs";
import { n as useI18n } from "./use-i18n-DMLbRgsP.mjs";
import { n as ProfileCard, r as SectionTitle } from "./cards-BdeDikRX.mjs";
import { r as Chip } from "./ui-xEub4V1l.mjs";
import { t as useAllProfiles } from "./profiles-catalog-DRuSpucF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/directory-mp9ZSmae.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DirectoryPage() {
	const { t, lang } = useI18n();
	const blocked = useAppStore((s) => s.blocked);
	const view = useAppStore((s) => s.view === "cards" ? "grid" : s.view);
	const setView = useAppStore((s) => s.setView);
	const [city, setCity] = (0, import_react.useState)("");
	const [cityOpen, setCityOpen] = (0, import_react.useState)(false);
	const [minRating, setMinRating] = (0, import_react.useState)(0);
	const [activeOnly, setActiveOnly] = (0, import_react.useState)(true);
	const women = useAllProfiles().filter((p) => p.gender === "women");
	const filtered = (0, import_react.useMemo)(() => {
		return women.filter((p) => {
			if (blocked.includes(p.id)) return false;
			if (activeOnly && p.status !== "active") return false;
			if (city && p.city !== city) return false;
			if (p.rating < minRating) return false;
			return true;
		});
	}, [
		blocked,
		activeOnly,
		city,
		minRating,
		women
	]);
	const gridClass = view === "list" ? "grid gap-2.5 px-3 pb-4" : "grid grid-cols-3 gap-0.5 pb-4";
	const tt = t;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3 px-3 pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: tt.totalGirls || "Всего девушек" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1.5 text-xl font-semibold text-cream",
						children: lang === "ru" ? "Каталог с номерами" : lang === "he" ? "מדריך עם מספרים" : lang === "ar" ? "دليل مع أرقام" : "Directory with numbers"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							filtered.length,
							" / ",
							women.length,
							" ",
							tt.registeredAccounts || "зарегистрированных анкет",
							" · ",
							lang === "ru" ? "нажми на трубку, чтобы открыть анкету и номер" : "tap the phone to open profile & number"
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1",
					children: ["grid", "list"].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: view === v,
						onClick: () => setView(v),
						children: t[v]
					}, v))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-3 space-y-3 rounded-xl border border-line bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setCityOpen((v) => !v),
					className: "flex min-h-11 w-full items-center justify-between rounded-lg border border-line px-3 text-sm text-cream",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: city ? CITY_LABEL[lang][city] ?? city : t.allCities }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: cityOpen ? "▴" : "▾"
					})]
				}), cityOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: !city,
						onClick: () => {
							setCity("");
							setCityOpen(false);
						},
						children: t.allCities
					}), CITIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: city === c,
						onClick: () => {
							setCity(c);
							setCityOpen(false);
						},
						children: CITY_LABEL[lang][c]
					}, c))]
				}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-muted",
						children: [t.minRating, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: minRating,
							onChange: (e) => setMinRating(Number(e.target.value)),
							className: "rounded-lg border border-line bg-bg px-2 py-1 text-fg",
							children: [
								0,
								3,
								4,
								4.5
							].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: n,
								children: n === 0 ? "—" : `${n}+`
							}, n))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: activeOnly,
							onChange: (e) => setActiveOnly(e.target.checked),
							className: "accent-[var(--color-accent)]"
						}), t.activeOnly]
					})]
				})]
			}),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-12 text-center text-muted",
				children: t.empty
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: gridClass,
				children: filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileCard, {
					profile: p,
					variant: view
				}, p.id))
			})
		]
	});
}
//#endregion
export { DirectoryPage as component };
