import { g as DICT, r as useAppStore, v as isRtl } from "./router-CWqAbG_v.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-i18n-DMLbRgsP.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function useI18n() {
	const lang = useAppStore((s) => s.lang);
	return {
		lang,
		t: DICT[lang],
		rtl: isRtl(lang)
	};
}
//#endregion
export { useI18n as n, cn as t };
