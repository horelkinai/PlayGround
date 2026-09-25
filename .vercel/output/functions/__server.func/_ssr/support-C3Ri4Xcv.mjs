import { i as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useI18n } from "./use-i18n-DMLbRgsP.mjs";
import { r as SectionTitle } from "./cards-BdeDikRX.mjs";
import { n as Button, t as Area } from "./ui-xEub4V1l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/support-C3Ri4Xcv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SupportPage() {
	const { t } = useI18n();
	const [msg, setMsg] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: t.supportTitle }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "leading-relaxed text-muted",
				children: t.supportBody
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
				placeholder: t.supportForm,
				value: msg,
				onChange: (e) => setMsg(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => {
					if (!msg.trim()) return;
					setMsg("");
					toast.success(t.supportToast);
				},
				children: t.submit
			})
		]
	});
}
//#endregion
export { SupportPage as component };
