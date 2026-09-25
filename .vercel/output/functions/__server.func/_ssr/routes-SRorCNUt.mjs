import { S as Navigate, T as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useAppStore } from "./router-CWqAbG_v.mjs";
import { n as useI18n } from "./use-i18n-DMLbRgsP.mjs";
import { t as Logo } from "./logo-DBidGl-8.mjs";
import { n as Button } from "./ui-xEub4V1l.mjs";
import { t as LangSwitch } from "./lang-switch-CAAajOcN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-SRorCNUt.js
var import_jsx_runtime = require_jsx_runtime();
function WelcomeAgeGate() {
	const { t } = useI18n();
	const ageOk = useAppStore((s) => s.ageOk);
	const onboarded = useAppStore((s) => s.onboarded);
	const lang = useAppStore((s) => s.lang);
	const setLang = useAppStore((s) => s.setLang);
	const passAge = useAppStore((s) => s.passAge);
	if (!useAppStore((s) => s.hydrated)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center bg-black",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "h-20 max-w-[320px] sm:h-28 sm:max-w-[420px]" })
	});
	if (ageOk && onboarded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/directory" });
	if (ageOk) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/onboarding" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative isolate min-h-dvh overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/brand/girl.jpg",
				alt: "",
				className: "absolute inset-0 size-full object-cover object-center"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex min-h-dvh flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-end px-4 pt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangSwitch, {
						value: lang,
						onChange: setLang
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-col items-center justify-center gap-6 px-6 py-10 text-center sm:gap-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { className: "h-20 max-w-[300px] drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] sm:h-28 sm:max-w-[420px]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold tracking-[0.18em] text-white/85 uppercase sm:text-sm",
									children: t.ageNotice
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display text-2xl leading-tight text-cream sm:text-3xl",
									children: t.tagline
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mx-auto max-w-md text-sm leading-relaxed text-white/75",
									children: t.ageBody
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex w-full max-w-sm flex-col gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => passAge(),
								children: t.continue
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "line",
								onClick: () => window.close(),
								children: t.exit
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap justify-center gap-4 text-sm text-white/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/rules",
								className: "underline-offset-4 hover:text-white hover:underline",
								children: t.rules
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacy",
								className: "underline-offset-4 hover:text-white hover:underline",
								children: t.privacy
							})]
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { WelcomeAgeGate as component };
