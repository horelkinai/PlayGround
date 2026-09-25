import { i as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as CITIES, r as useAppStore, s as CITY_LABEL } from "./router-CWqAbG_v.mjs";
import { n as useI18n } from "./use-i18n-DMLbRgsP.mjs";
import { r as SectionTitle } from "./cards-BdeDikRX.mjs";
import { i as Field, n as Button, r as Chip, t as Area } from "./ui-xEub4V1l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/me-DiRrQrzb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function formatTime(sec) {
	const h = Math.floor(sec / 3600);
	const m = Math.floor(sec % 3600 / 60);
	if (h > 0) return `${h}h ${m}m`;
	return `${m}m ${sec % 60}s`;
}
function MePage() {
	const { t, lang } = useI18n();
	const user = useAppStore((s) => s.user);
	const myProfile = useAppStore((s) => s.myProfile);
	const setMyProfile = useAppStore((s) => s.setMyProfile);
	const role = useAppStore((s) => s.role);
	const sessionSeconds = useAppStore((s) => s.sessionSeconds);
	const clientPhoto = useAppStore((s) => s.clientPhoto);
	const setClientPhoto = useAppStore((s) => s.setClientPhoto);
	const prefCity = useAppStore((s) => s.prefCity);
	const prefAgeMin = useAppStore((s) => s.prefAgeMin);
	const prefAgeMax = useAppStore((s) => s.prefAgeMax);
	const setPrefs = useAppStore((s) => s.setPrefs);
	const [name, setName] = (0, import_react.useState)(myProfile?.name || user?.name || "");
	const [username, setUsername] = (0, import_react.useState)(myProfile?.username || "");
	const [city, setCity] = (0, import_react.useState)(myProfile?.city || "Tel Aviv");
	const [age, setAge] = (0, import_react.useState)(String(myProfile?.age || 25));
	const [about, setAbout] = (0, import_react.useState)(myProfile?.about || "");
	function save() {
		setMyProfile({
			name: name.trim() || "User",
			username: username.trim() || "user",
			city,
			age: Number(age) || 25,
			height: myProfile?.height || 170,
			weight: myProfile?.weight || 70,
			about,
			languages: [lang]
		});
		toast.success(t.sent);
	}
	const loyalty = sessionSeconds > 18e3 ? "VIP client" : sessionSeconds > 1800 ? "Active client" : "New client";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg space-y-6 px-3 pt-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: t.navMe }),
			role === "client" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-line bg-surface p-4 space-y-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-cream",
						children: loyalty
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted",
						children: [
							t.timeOnSite || "Time on site",
							": ",
							formatTime(sessionSeconds)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-subtle",
						children: t.loyaltyHint || "Чем больше времени на платформе, тем выше статус клиента."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 rounded-xl border border-line bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: role === "client" ? t.clientProfileHint || "Заполните анкету о себе и загрузите фото." : t.regHint
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-2 overflow-hidden rounded-xl border border-line bg-elevated",
							children: clientPhoto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: clientPhoto,
								alt: "",
								className: "aspect-square w-full object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid aspect-square place-items-center text-sm text-muted",
								children: "Photo"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: "image/*",
							className: "text-sm",
							onChange: (e) => {
								const file = e.target.files?.[0];
								if (!file) return;
								const reader = new FileReader();
								reader.onload = () => setClientPhoto(String(reader.result || ""));
								reader.readAsDataURL(file);
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						placeholder: "Name",
						value: name,
						onChange: (e) => setName(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						placeholder: "username",
						value: username,
						onChange: (e) => setUsername(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						type: "number",
						placeholder: t.age,
						value: age,
						onChange: (e) => setAge(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						placeholder: t.about,
						value: about,
						onChange: (e) => setAbout(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: save,
						children: t.save
					})
				]
			}),
			role === "client" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 rounded-xl border border-line bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-medium text-cream",
						children: t.preferences || "Preferences"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: t.prefHint || "Какие анкеты вас интересуют"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: !prefCity,
							onClick: () => setPrefs({ prefCity: "" }),
							children: t.allCities
						}), CITIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: prefCity === c,
							onClick: () => setPrefs({ prefCity: c }),
							children: CITY_LABEL[lang][c]
						}, c))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							type: "number",
							placeholder: "Age from",
							value: String(prefAgeMin),
							onChange: (e) => setPrefs({ prefAgeMin: Number(e.target.value) || 18 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							type: "number",
							placeholder: "Age to",
							value: String(prefAgeMax),
							onChange: (e) => setPrefs({ prefAgeMax: Number(e.target.value) || 45 })
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { MePage as component };
