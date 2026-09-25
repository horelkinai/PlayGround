import { i as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime, Z as require_react, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Check, a as Send, c as Phone, f as Heart, h as Copy, i as Share2, l as MessageCircle, p as Flag, r as Star, y as Ban } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { h as storiesByProfile, m as reviewsByProfile, n as Route, p as reelsByProfile, r as useAppStore, s as CITY_LABEL } from "./router-CWqAbG_v.mjs";
import { n as useI18n, t as cn } from "./use-i18n-DMLbRgsP.mjs";
import { n as RatingMark } from "./badges-C8SDChY0.mjs";
import { n as Button, r as Chip, t as Area } from "./ui-xEub4V1l.mjs";
import { n as useProfile } from "./profiles-catalog-DRuSpucF.mjs";
import { c as storyRingClass } from "./stories-BGmYuNoC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile._id-O0z4-Xqt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function maskPhone(phone) {
	const last4 = phone.replace(/\D/g, "").slice(-4);
	if (!last4) return phone;
	return `+972 •• ••• ${last4}`;
}
var DICT = {
	ru: {
		show: "Показать номер",
		hide: "Скрыть",
		copy: "Копировать",
		copied: "Номер скопирован",
		call: "Позвонить",
		wa: "WhatsApp",
		tg: "Telegram",
		hint: "Демо-номер. В проде — только после проверки телефона.",
		guestHint: "Войдите, чтобы увидеть номер.",
		signIn: "Войти"
	},
	en: {
		show: "Show number",
		hide: "Hide",
		copy: "Copy",
		copied: "Number copied",
		call: "Call",
		wa: "WhatsApp",
		tg: "Telegram",
		hint: "Demo number. In production — after phone verification only.",
		guestHint: "Sign in to see the number.",
		signIn: "Sign in"
	},
	he: {
		show: "הצג מספר",
		hide: "הסתר",
		copy: "העתק",
		copied: "המספר הועתק",
		call: "חיוג",
		wa: "WhatsApp",
		tg: "Telegram",
		hint: "מספר דמו. בפרודקשן — רק אחרי אימות טלפון.",
		guestHint: "התחברו כדי לראות את המספר.",
		signIn: "התחברות"
	},
	ar: {
		show: "إظهار الرقم",
		hide: "إخفاء",
		copy: "نسخ",
		copied: "تم نسخ الرقم",
		call: "اتصال",
		wa: "WhatsApp",
		tg: "Telegram",
		hint: "رقم تجريبي. في الإنتاج — بعد توثيق الهاتف فقط.",
		guestHint: "سجّل الدخول لرؤية الرقم.",
		signIn: "تسجيل الدخول"
	}
};
function ContactCard({ phone, profileName, compact }) {
	const lang = useAppStore((s) => s.lang);
	const isGuest = useAppStore((s) => s.isGuest());
	useAppStore((s) => s.phoneVerified);
	const [revealed, setRevealed] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const t = DICT[lang] ?? DICT.ru;
	if (!phone) return null;
	if (isGuest) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3 rounded-xl border border-accent/30 bg-elevated/60 px-3 py-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-9 place-items-center rounded-full bg-accent/15 text-accent",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-sm tracking-wide text-cream",
				children: maskPhone(phone)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-muted",
				children: t.guestHint
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "/onboarding",
			className: "shrink-0 rounded-full bg-cream px-4 py-2 text-xs font-semibold text-black",
			children: t.signIn
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: compact ? "rounded-xl border border-line bg-elevated/60 px-3 py-2" : "rounded-xl border border-line bg-elevated/60 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-center gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-9 shrink-0 place-items-center rounded-full bg-green-500/15 text-green-400",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate font-mono text-[15px] font-semibold tracking-wide text-cream",
						children: revealed ? phone : maskPhone(phone)
					}), !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted",
						children: t.hint
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex shrink-0 items-center gap-1.5",
				children: !revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setRevealed(true),
					className: "rounded-full bg-green-500 px-3.5 py-2 text-xs font-semibold text-black hover:bg-green-400",
					children: t.show
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `tel:${phone.replace(/[^+\d]/g, "")}`,
						"aria-label": t.call,
						className: "grid size-9 place-items-center rounded-full bg-green-500 text-black hover:bg-green-400",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": t.copy,
						onClick: () => {
							navigator.clipboard?.writeText(phone);
							setCopied(true);
							toast.success(t.copied);
							setTimeout(() => setCopied(false), 1500);
						},
						className: "grid size-9 place-items-center rounded-full border border-line text-cream hover:bg-surface",
						children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setRevealed(false),
						className: "hidden rounded-full px-2 py-1 text-[11px] text-muted hover:text-cream sm:block",
						children: t.hide
					})
				] })
			})]
		}), revealed && !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2.5 flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${profileName}! (demo)`)}`,
				target: "_blank",
				rel: "noreferrer",
				className: "flex flex-1 items-center justify-center gap-1.5 rounded-full border border-line py-2 text-xs font-medium text-cream hover:bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-3.5" }), t.wa]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: `https://t.me/share/url?url=${encodeURIComponent("demo")}&text=${encodeURIComponent(`Hi ${profileName}! (demo)`)}`,
				target: "_blank",
				rel: "noreferrer",
				className: "flex flex-1 items-center justify-center gap-1.5 rounded-full border border-line py-2 text-xs font-medium text-cream hover:bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-3.5" }), t.tg]
			})]
		})]
	});
}
function compact(n, lang) {
	if (lang === "ru") {
		if (n >= 1e6) return `${(n / 1e6).toFixed(1).replace(".", ",")} млн`;
		if (n >= 1e3) return `${(n / 1e3).toFixed(1).replace(".", ",")} тыс.`;
	} else {
		if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
		if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
	}
	return String(n);
}
function Stat({ value, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-0.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[15px] leading-none font-semibold text-cream tabular-nums",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[11px] text-muted",
			children: label
		})]
	});
}
/**
* Instagram-style profile header: avatar with the story ring, username, the
* posts/followers/following row, a bio block and the primary actions, followed
* by a tab bar and a square 3-up photo grid.
*/
function InstagramProfile({ profile, onReport, children }) {
	const { t, lang } = useI18n();
	const [tab, setTab] = (0, import_react.useState)("grid");
	const fav = useAppStore((s) => !!s.favorites[profile.id]);
	const follow = useAppStore((s) => !!s.follows[profile.id]);
	const toggleFav = useAppStore((s) => s.toggleFav);
	const toggleFollow = useAppStore((s) => s.toggleFollow);
	const block = useAppStore((s) => s.block);
	const canInteract = useAppStore((s) => s.canInteract());
	const isGuest = useAppStore((s) => s.isGuest());
	const viewed = useAppStore((s) => s.viewedStoryIds);
	const tt = t;
	const cityLabel = CITY_LABEL[lang][profile.city] ?? profile.city;
	const about = profile.about[lang] ?? profile.about.en;
	const stories = storiesByProfile(profile.id);
	const ringClass = (0, import_react.useMemo)(() => {
		if (stories.length === 0) return null;
		const allSeen = stories.every((s) => viewed[s.id]);
		return storyRingClass(allSeen ? "seen" : "new");
	}, [stories, viewed]);
	const tiles = profile.gallery.length ? profile.gallery : [profile.photo];
	const langLabels = profile.languages.map((l) => tt[`lang_${l}`] ?? l.toUpperCase()).join(" · ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "px-3 pt-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-5 sm:gap-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("grid place-items-center rounded-full p-[3px]", ringClass ?? "bg-line"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "size-[84px] overflow-hidden rounded-full bg-elevated sm:size-[104px]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: profile.photo,
										alt: profile.name,
										className: "size-full object-cover",
										loading: "eager"
									})
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
											className: "truncate text-[17px] leading-tight font-semibold text-cream sm:text-xl",
											children: profile.username
										}),
										profile.verified ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											title: tt.verified ?? "Verified",
											className: "grid size-[18px] shrink-0 place-items-center rounded-full bg-accent text-[10px] text-black",
											children: "✓"
										}) : null,
										profile.vip ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-vip/20 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-vip uppercase",
											children: "VIP"
										}) : null
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex items-center gap-2 text-xs text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingMark, {
										value: profile.rating,
										count: profile.ratingCount
									}), ringClass ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-accent",
										children: ["· ", tt.stories ?? "stories"]
									}) : null]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap items-center gap-x-4 gap-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											className: "min-h-8 gap-1.5 px-4 text-xs",
											disabled: isGuest || !canInteract,
											onClick: () => toggleFollow(profile.id),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-3.5" }), follow ? tt.following ?? "Following" : tt.message ?? "Message"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: fav ? "primary" : "line",
											className: "min-h-8 gap-1.5 px-4 text-xs",
											disabled: isGuest || !canInteract,
											onClick: () => toggleFav(profile.id),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("size-3.5", fav && "fill-current") }), fav ? tt.favorited ?? "Saved" : tt.favorite ?? "Save"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-label": tt.share ?? "Share",
											className: "grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-elevated hover:text-cream",
											onClick: () => {
												navigator.clipboard?.writeText(window.location.href);
												toast.success(tt.shareToast ?? "Copied");
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-label": tt.report ?? "Report",
											className: "grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-elevated hover:text-cream",
											disabled: isGuest || !canInteract,
											onClick: onReport,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "size-4" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-label": tt.block ?? "Block",
											className: "grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-elevated hover:text-danger",
											disabled: isGuest || !canInteract,
											onClick: () => {
												block(profile.id);
												toast.success(tt.reportToast ?? "Done");
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "size-4" })
										})
									]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-baseline gap-x-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-semibold text-cream",
									children: profile.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted",
									children: [cityLabel, profile.district ? ` · ${profile.district}` : ""]
								})]
							}),
							profile.params.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1.5",
								children: profile.params.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-elevated px-2.5 py-1 text-[11px] text-cream/85",
									children: tt[`param_${p}`] ?? p
								}, p))
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-prose text-[13px] leading-relaxed whitespace-pre-line text-cream/90",
								children: about
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-subtle",
								children: [
									tt.languages ?? "Languages",
									": ",
									langLabels,
									profile.joined ? ` · ${tt.joinedSince ?? "since"} ${profile.joined.slice(0, 7)}` : ""
								]
							}),
							isGuest ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-full max-w-sm space-y-2 rounded-xl border border-accent/30 bg-elevated/50 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-cream",
									children: tt.registerToUse ?? "Sign in to use the platform features."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/onboarding",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "min-h-9 w-full text-xs",
										children: tt.signIn ?? "Sign in"
									})
								})]
							}) : null
						]
					}),
					profile.contactPlaceholder ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactCard, {
							phone: profile.contactPlaceholder,
							profileName: profile.name
						})
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center justify-around border-y border-line px-3 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						value: String(tiles.length),
						label: tt.posts ?? "posts"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						value: compact(profile.likes, lang),
						label: tt.followers ?? "followers"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						value: String(profile.ratingCount || 0),
						label: tt.following ?? "following"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky top-0 z-10 flex border-b border-line bg-app/95 backdrop-blur",
				children: [
					["grid", tt.gallery ?? "Photos"],
					["reels", tt.navReels ?? "Reels"],
					["reviews", tt.reviews ?? "Reviews"]
				].map(([k, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setTab(k),
					className: cn("flex flex-1 items-center justify-center gap-1.5 border-b-2 py-3 text-[11px] font-semibold tracking-wide uppercase transition-colors", tab === k ? "border-cream text-cream" : "border-transparent text-subtle hover:text-muted"),
					children: [
						k === "grid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5" }) : null,
						k === "reels" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayGlyph, {}) : null,
						k === "reviews" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-3.5" }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: label
						})
					]
				}, k))
			}),
			tab === "grid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 gap-0.5 p-0.5",
				children: tiles.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative aspect-square overflow-hidden bg-elevated",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src,
						alt: "",
						loading: "lazy",
						className: "size-full object-cover transition-transform duration-300 hover:scale-[1.04]"
					}), profile.rating >= 4.7 && i === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "absolute top-1.5 left-1.5 flex items-center gap-0.5 rounded-full bg-black/55 px-1.5 py-0.5 text-[10px] font-medium text-white",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-2.5 fill-current" }), profile.rating.toFixed(1)]
					}) : null]
				}, `${src}-${i}`))
			}) : null,
			tab === "reels" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReelsPane, { profileId: profile.id }) : null,
			tab === "reviews" ? children : null
		]
	});
}
function PlayGlyph() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className: "size-3.5",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 5v14l11-7z" })
	});
}
function ReelsPane({ profileId }) {
	const { t, lang } = useI18n();
	const tt = t;
	const reels = reelsByProfile(profileId);
	if (reels.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "px-3 py-8 text-center text-sm text-muted",
		children: tt.empty ?? "Nothing here yet"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-3 gap-0.5 p-0.5",
		children: reels.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-9/16 overflow-hidden bg-elevated",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: r.photo,
				alt: r.caption?.[lang] ?? "",
				loading: "lazy",
				className: "size-full object-cover"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-1.5 text-[10px] text-white/90",
				children: r.caption?.[lang] ?? ""
			})]
		}, r.id))
	});
}
function ProfilePage() {
	const { id } = Route.useParams();
	const { t } = useI18n();
	const profile = useProfile(id);
	const blocked = useAppStore((s) => s.blocked.includes(id));
	const addReview = useAppStore((s) => s.addReview);
	const addReport = useAppStore((s) => s.addReport);
	const extraReviews = useAppStore((s) => s.extraReviews);
	const canInteract = useAppStore((s) => s.canInteract());
	const [showReview, setShowReview] = (0, import_react.useState)(false);
	const [showReport, setShowReport] = (0, import_react.useState)(false);
	const [rating, setRating] = (0, import_react.useState)(5);
	const [impression, setImpression] = (0, import_react.useState)("professional");
	const [reviewText, setReviewText] = (0, import_react.useState)("");
	const [reportReason, setReportReason] = (0, import_react.useState)("rOther");
	const [reportNote, setReportNote] = (0, import_react.useState)("");
	if (!profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "py-20 text-center text-muted",
		children: t.empty
	});
	if (profile.status === "paused" || blocked) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md space-y-4 py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl text-cream",
				children: t.paused
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: t.pausedHint
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/directory",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "line",
					children: t.navDir
				})
			})
		]
	});
	const reviews = [...reviewsByProfile(id), ...extraReviews.filter((r) => r.profileId === id)];
	const impressions = [
		{
			id: "professional",
			label: t.impProfessional
		},
		{
			id: "punctual",
			label: t.impPunctual
		},
		{
			id: "respectful",
			label: t.impRespectful
		},
		{
			id: "clear",
			label: t.impClear
		},
		{
			id: "would_recommend",
			label: t.impRecommend
		}
	];
	const reportReasons = [
		"rThreats",
		"rBlackmail",
		"rInsults",
		"rPhone",
		"rAddress",
		"rDocs",
		"rPrivate",
		"rDoxxing",
		"rAccusations",
		"rIllegal",
		"rSexual",
		"rOther"
	];
	const reviewsPane = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4 p-3",
		children: [
			canInteract ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => setShowReview(true),
				children: t.writeReview
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-subtle",
				children: t.reviewHint
			}),
			reviews.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: t.empty
			}) : reviews.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl border border-line bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatingMark, { value: r.rating }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-subtle",
							children: r.created
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: r.text || "—"
					}),
					"status" in r && r.status === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-vip",
						children: t.reviewPending
					}),
					r.reply && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 border-t border-line pt-2 text-sm text-muted",
						children: [
							t.ownerReply,
							": ",
							r.reply
						]
					})
				]
			}, r.id))
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstagramProfile, {
			profile,
			onReport: () => setShowReport(true),
			children: reviewsPane
		}),
		showReview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-50 grid place-items-end bg-black/60 p-4 sm:place-items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md space-y-4 rounded-2xl border border-line bg-surface p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-cream",
						children: t.writeReview
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2",
						children: [
							1,
							2,
							3,
							4,
							5
						].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: rating === n,
							onClick: () => setRating(n),
							children: n
						}, n))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: impressions.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: impression === i.id,
							onClick: () => setImpression(i.id),
							children: i.label
						}, i.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						placeholder: t.reviewText,
						value: reviewText,
						onChange: (e) => setReviewText(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "line",
							onClick: () => setShowReview(false),
							children: t.cancel
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => {
								addReview(id, rating, impression, reviewText);
								setShowReview(false);
								setReviewText("");
								toast.success(t.reviewToast);
							},
							children: t.submit
						})]
					})
				]
			})
		}),
		showReport && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-50 grid place-items-end bg-black/60 p-4 sm:place-items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md space-y-4 rounded-2xl border border-line bg-surface p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-cream",
						children: t.reportTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex max-h-40 flex-wrap gap-2 overflow-y-auto",
						children: reportReasons.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: reportReason === r,
							onClick: () => setReportReason(r),
							children: t[r]
						}, r))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						placeholder: t.reportNote,
						value: reportNote,
						onChange: (e) => setReportNote(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "line",
							onClick: () => setShowReport(false),
							children: t.cancel
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => {
								addReport(id, reportReason, reportNote);
								setShowReport(false);
								setReportNote("");
								toast.success(t.reportToast);
							},
							children: t.submit
						})]
					})
				]
			})
		})
	] });
}
//#endregion
export { ProfilePage as component };
