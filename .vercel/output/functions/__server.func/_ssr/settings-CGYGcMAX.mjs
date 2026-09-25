import { T as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useAppStore } from "./router-CWqAbG_v.mjs";
import { n as useI18n } from "./use-i18n-DMLbRgsP.mjs";
import { r as SectionTitle } from "./cards-BdeDikRX.mjs";
import { n as Button, r as Chip } from "./ui-xEub4V1l.mjs";
import { t as LangSwitch } from "./lang-switch-CAAajOcN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-CGYGcMAX.js
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const { t } = useI18n();
	const lang = useAppStore((s) => s.lang);
	const theme = useAppStore((s) => s.theme);
	const discovery = useAppStore((s) => s.discovery);
	const setLang = useAppStore((s) => s.setLang);
	const setTheme = useAppStore((s) => s.setTheme);
	const resetDemo = useAppStore((s) => s.resetDemo);
	const persist = useAppStore((s) => s.persist);
	const role = useAppStore((s) => s.role);
	const phoneVerified = useAppStore((s) => s.phoneVerified);
	const verificationStatus = useAppStore((s) => s.verificationStatus);
	const demoAdmin = useAppStore((s) => s.demoAdmin);
	const setDemoAdmin = useAppStore((s) => s.setDemoAdmin);
	const setPhoneVerified = useAppStore((s) => s.setPhoneVerified);
	function setDiscovery(d) {
		useAppStore.setState({ discovery: d });
		persist();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: t.settingsTitle }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-line bg-surface p-3 text-sm space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Role: ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-cream",
							children: role
						}),
						" · Phone: ",
						phoneVerified ? "verified" : "no",
						" · Status: ",
						verificationStatus
					] }),
					role === "client" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: phoneVerified,
							onChange: (e) => setPhoneVerified(e.target.checked),
							className: "size-4 accent-[var(--color-accent)]"
						}), "Phone verified (demo toggle)"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: demoAdmin,
							onChange: (e) => setDemoAdmin(e.target.checked),
							className: "size-4 accent-[var(--color-accent)]"
						}), "Demo admin access (separate from account role)"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm text-muted",
					children: t.language
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangSwitch, {
					value: lang,
					onChange: setLang
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm text-muted",
					children: t.theme
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: theme === "dark",
						onClick: () => setTheme("dark"),
						children: t.dark
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: theme === "light",
						onClick: () => setTheme("light"),
						children: t.light
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm text-muted",
					children: t.discoveryPref
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
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3 border-t border-line pt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-subtle",
					children: t.demo
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "danger",
					onClick: () => {
						resetDemo();
						window.location.href = "/";
					},
					children: "Reset demo"
				})]
			})
		]
	});
}
//#endregion
export { SettingsPage as component };
