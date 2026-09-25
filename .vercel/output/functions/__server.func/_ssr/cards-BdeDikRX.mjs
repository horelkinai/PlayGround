import { i as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime, Z as require_react, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Send, c as Phone, f as Heart, l as MessageCircle, v as Bookmark } from "../_libs/lucide-react.mjs";
import { c as NEW_IDS, f as profileById, r as useAppStore, s as CITY_LABEL } from "./router-CWqAbG_v.mjs";
import { n as useI18n, t as cn } from "./use-i18n-DMLbRgsP.mjs";
import { n as RatingMark, t as BadgeRow } from "./badges-C8SDChY0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cards-BdeDikRX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfileCard({ profile, variant = "card" }) {
	const { lang, t } = useI18n();
	useAppStore((s) => !!s.favorites[profile.id]);
	useAppStore((s) => s.toggleFav);
	const city = CITY_LABEL[lang][profile.city] ?? profile.city;
	if (variant === "list") {
		const masked = (() => {
			const last4 = (profile.contactPlaceholder || "").replace(/\D/g, "").slice(-4);
			return last4 ? `+972 •• ••• ${last4}` : null;
		})();
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 rounded-2xl border border-line bg-surface p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/profile/$id",
					params: { id: profile.id },
					className: "shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: profile.photo,
						alt: "",
						className: "size-16 rounded-xl object-cover"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/profile/$id",
						params: { id: profile.id },
						className: "block min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate font-semibold text-cream",
									children: profile.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeRow, {
									lang,
									verified: profile.verified,
									vip: profile.vip,
									top: profile.top
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-0.5 truncate text-[13px] text-muted",
								children: [
									city,
									profile.district ? ` · ${profile.district}` : "",
									" · ",
									profile.age,
									" ",
									t.years,
									" ·",
									" ",
									profile.rating.toFixed(1),
									" ★"
								]
							}),
							masked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 truncate font-mono text-[13px] tracking-wide text-green-400/90",
								children: masked
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 flex-col items-end gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingMark, { value: profile.rating }), profile.contactPlaceholder ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/profile/$id",
						params: { id: profile.id },
						"aria-label": "call",
						className: "grid size-10 place-items-center rounded-full bg-green-500 text-black hover:bg-green-400",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" })
					}) : null]
				})
			]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/profile/$id",
		params: { id: profile.id },
		className: "relative block aspect-square overflow-hidden bg-elevated",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: profile.photo,
				alt: "",
				className: "size-full object-cover"
			}),
			profile.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute end-1.5 top-1.5 rounded-full bg-black/50 px-1.5 py-0.5 text-[10px] text-amber-300",
				children: "✓"
			}),
			NEW_IDS.includes(profile.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute start-1.5 top-1.5 rounded-full bg-accent px-1.5 py-0.5 text-[10px] uppercase text-white",
				children: "new"
			})
		]
	});
}
function PostCard({ post }) {
	const { lang, t } = useI18n();
	const profile = profileById(post.profileId);
	const liked = useAppStore((s) => !!s.likes[post.id]);
	const saved = useAppStore((s) => !!s.savedPosts[post.id]);
	const toggleLike = useAppStore((s) => s.toggleLike);
	const toggleSaved = useAppStore((s) => s.toggleSaved);
	const [expanded, setExpanded] = (0, import_react.useState)(false);
	if (!profile) return null;
	const city = CITY_LABEL[lang][profile.city] ?? profile.city;
	const caption = post.caption[lang];
	const short = caption.length > 90 ? `${caption.slice(0, 90)}…` : caption;
	const isNew = NEW_IDS.includes(profile.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-3 px-3 py-2.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/profile/$id",
					params: { id: profile.id },
					className: "flex min-w-0 flex-1 items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: profile.photo,
						alt: "",
						className: "size-9 rounded-full object-cover ring-1 ring-line"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-sm font-semibold text-cream",
									children: profile.username || profile.name
								}),
								profile.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-amber-400",
									children: "✓"
								}),
								isNew && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-accent px-1.5 py-0.5 text-[9px] uppercase text-white",
									children: t.newBadge || "New"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-[11px] text-muted",
							children: city
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: post.photos[0],
				alt: "",
				className: "aspect-square w-full object-cover",
				onDoubleClick: () => toggleLike(post.id)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1 px-2 pt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						"aria-label": t.like,
						onClick: () => toggleLike(post.id),
						className: "flex h-10 items-center gap-1.5 px-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
							className: cn("size-6", liked ? "fill-red-500 text-red-500" : "text-cream"),
							strokeWidth: 1.75
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold",
							children: post.likes + (liked ? 1 : 0)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/profile/$id",
						params: { id: profile.id },
						"aria-label": t.comment,
						className: "flex h-10 items-center gap-1.5 px-1 text-cream",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
							className: "size-6",
							strokeWidth: 1.75
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm",
							children: post.comments
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": t.share,
						className: "grid size-10 place-items-center text-cream",
						onClick: () => {
							if (navigator.share) navigator.share({
								title: profile.name,
								url: window.location.href
							});
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {
							className: "size-6",
							strokeWidth: 1.75
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": t.savePost,
						onClick: () => toggleSaved(post.id),
						className: "ms-auto grid size-10 place-items-center text-cream",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, {
							className: cn("size-6", saved && "fill-cream"),
							strokeWidth: 1.75
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-1 px-3 pb-3 pt-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-fg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/profile/$id",
							params: { id: profile.id },
							className: "font-semibold text-cream",
							children: profile.username || profile.name
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg/90",
							children: expanded ? caption : short
						}),
						caption.length > 90 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "ms-1 text-muted",
							onClick: () => setExpanded((v) => !v),
							children: expanded ? t.less || "less" : t.loadMore
						})
					]
				})
			})
		]
	});
}
function SectionTitle({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "font-display text-sm tracking-[0.2em] text-muted uppercase",
		children
	});
}
//#endregion
export { ProfileCard as n, SectionTitle as r, PostCard as t };
