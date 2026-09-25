import { i as __toESM } from "../_runtime.mjs";
import { Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as profileById, u as PROFILES } from "./router-CWqAbG_v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profiles-catalog-DRuSpucF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* The generated catalogue (200 profiles, built by scripts/generate-profiles.mjs)
* lives in its own JSON file and is pulled in with a dynamic import, so the
* ~230 KB of data is a separate chunk instead of main-bundle weight for every
* visitor. It is merged with the hand-written demo profiles at read time.
*
* Swapping in real data later means replacing the JSON and the photo files —
* no call site changes.
*/
var cached = null;
var inflight = null;
function loadGenerated() {
	if (cached) return Promise.resolve(cached);
	inflight ??= import("./profiles.generated-By5VNlw-.mjs").then((mod) => {
		const list = mod.default ?? mod;
		cached = Array.isArray(list) ? list : [];
		return cached;
	});
	return inflight;
}
/** Hand-written demo profiles plus whatever has finished loading. */
function useAllProfiles() {
	const [extra, setExtra] = (0, import_react.useState)(cached ?? []);
	(0, import_react.useEffect)(() => {
		if (cached) return;
		let alive = true;
		loadGenerated().then((list) => {
			if (alive) setExtra(list);
		});
		return () => {
			alive = false;
		};
	}, []);
	return extra.length ? [...PROFILES, ...extra] : PROFILES;
}
/** Resolves a profile by id across both the hand-written and generated sets. */
function useProfile(id) {
	return useAllProfiles().find((p) => p.id === id) ?? profileById(id);
}
//#endregion
export { useProfile as n, useAllProfiles as t };
