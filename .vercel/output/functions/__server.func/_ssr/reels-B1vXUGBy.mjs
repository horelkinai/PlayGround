import { T as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as Heart, l as MessageCircle } from "../_libs/lucide-react.mjs";
import { c as NEW_IDS, d as REELS, f as profileById, r as useAppStore } from "./router-CWqAbG_v.mjs";
import { n as useI18n, t as cn } from "./use-i18n-DMLbRgsP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reels-B1vXUGBy.js
var import_jsx_runtime = require_jsx_runtime();
function ReelsPage() {
	const { lang, t } = useI18n();
	const blocked = useAppStore((s) => s.blocked);
	const likes = useAppStore((s) => s.likes);
	const favorites = useAppStore((s) => s.favorites);
	const toggleLike = useAppStore((s) => s.toggleLike);
	const items = REELS.filter((r) => {
		if (blocked.includes(r.profileId)) return false;
		const p = profileById(r.profileId);
		if (!p || p.gender !== "women") return false;
		if (!(p.verified || p.vip)) return false;
		return true;
	}).sort((a, b) => {
		const fa = favorites[a.profileId] ? 1 : 0;
		return (favorites[b.profileId] ? 1 : 0) - fa;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-[calc(100dvh-7.5rem)] snap-y snap-mandatory overflow-y-auto bg-black lg:h-[calc(100dvh-2rem)]",
		children: items.map((reel) => {
			const profile = profileById(reel.profileId);
			if (!profile) return null;
			const liked = !!likes[reel.id];
			const isNew = NEW_IDS.includes(profile.id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "relative h-full w-full snap-start overflow-hidden bg-black",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: reel.photo,
					alt: "",
					className: "size-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/profile/$id",
							params: { id: profile.id },
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: profile.photo,
										alt: "",
										className: "size-9 rounded-full object-cover"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-white",
										children: profile.name
									}),
									profile.verified ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-amber-300",
										children: "✓"
									}) : null,
									isNew ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-accent px-2 py-0.5 text-[10px] uppercase text-white",
										children: t.newBadge || "New"
									}) : null
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 line-clamp-2 text-sm text-white/85",
								children: reel.caption[lang]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-3 text-white",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => toggleLike(reel.id),
								className: "grid place-items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("size-8", liked && "fill-red-500 text-red-500") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs",
									children: reel.likes + (liked ? 1 : 0)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid place-items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-8" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs",
									children: reel.comments
								})]
							})]
						})]
					})
				})]
			}, reel.id);
		})
	});
}
//#endregion
export { ReelsPage as component };
