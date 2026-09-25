import { i as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime, Z as require_react, d as require_react_dom, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as storiesByProfile, l as POSTS, r as useAppStore, u as PROFILES } from "./router-CWqAbG_v.mjs";
import { n as useI18n, t as cn } from "./use-i18n-DMLbRgsP.mjs";
import { t as PostCard } from "./cards-BdeDikRX.mjs";
import { a as nextUnseenAuthor, c as storyRingClass, i as isOpenable, l as storyStatusText, n as buildStoryRail, o as storyBackdropStyle, r as firstUnseenIndex, s as storyDuration, t as FALLBACK_DURATION_MS } from "./stories-BGmYuNoC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/home-CpO3SpnM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
function RingBox({ status, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("relative shrink-0 overflow-hidden rounded-full p-[2px] aspect-square", "size-[66px]", storyRingClass(status)),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "size-full shrink-0 overflow-hidden rounded-full border-2 border-bg",
			children
		})
	});
}
function PersonGlyph() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		className: "size-3 fill-current",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "8",
			r: "4"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 20c0-4 3.6-6 8-6s8 2 8 6z" })]
	});
}
function PlusGlyph() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		className: "size-6 stroke-current stroke-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M12 5v14M5 12h14",
			fill: "none",
			strokeLinecap: "round"
		})
	});
}
/**
* One rail tile. The story itself is a button; the profile stays reachable
* through a separate, explicit control so the two intents never collide.
*/
function StoryAvatar({ entry, strings, onOpen }) {
	const openable = isOpenable(entry.status);
	const statusText = storyStatusText(entry.status, strings, entry.unseenCount);
	const label = entry.isSelf ? strings.storyStateOwn : entry.label;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex w-[70px] shrink-0 flex-col items-center gap-1",
		"data-story-tile": entry.userId,
		"data-story-status": entry.status,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"data-story-avatar": entry.userId,
					disabled: !openable,
					"aria-label": `${label} — ${statusText}`,
					onClick: (e) => {
						if (!openable) return;
						onOpen(entry.userId, e.currentTarget);
					},
					className: cn("block shrink-0 rounded-full", openable ? "hover:opacity-90" : "cursor-default"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RingBox, {
						status: entry.status,
						children: entry.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: entry.photo,
							alt: "",
							draggable: false,
							className: "block size-[58px] shrink-0 rounded-full object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("grid size-full shrink-0 place-items-center rounded-full", "bg-surface text-muted"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlusGlyph, {})
						})
					})
				}), entry.profileHref ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: entry.profileHref,
					"data-story-profile": entry.userId,
					"aria-label": `${strings.storyViewProfile}: ${entry.label}`,
					className: "absolute -end-0.5 -bottom-0.5 grid size-[22px] place-items-center rounded-full border border-bg bg-elevated text-cream transition-colors hover:bg-accent hover:text-accent-fg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonGlyph, {})
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("w-full truncate text-center text-[11px]", openable ? "text-cream" : "text-subtle"),
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: statusText
			})
		]
	});
}
function StoryRail({ entries, strings, onOpen, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: cn("border-b border-line px-3 py-3", className),
		"aria-label": strings.storyStateNew,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-story-rail": true,
			className: "no-scrollbar flex gap-3 overflow-x-auto pb-1",
			children: entries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryAvatar, {
				entry,
				strings,
				onOpen
			}, entry.userId))
		})
	});
}
function StoryProgress({ count, index, progress, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "progressbar",
		"aria-label": label,
		"aria-valuemin": 1,
		"aria-valuemax": Math.max(count, 1),
		"aria-valuenow": index + 1,
		className: "flex shrink-0 gap-1",
		children: Array.from({ length: count }).map((_, i) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-[3px] flex-1 overflow-hidden rounded-full bg-white/35",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full w-full origin-left rounded-full bg-white",
					style: { transform: `scaleX(${i < index ? 1 : i === index ? progress : 0})` }
				})
			}, i);
		})
	});
}
function StoryViewer({ open, entries, startUserId, startIndex, lang, strings, viewed, onViewed, onClose }) {
	const startUserRef = (0, import_react.useRef)(startUserId);
	const startIndexRef = (0, import_react.useRef)(startIndex);
	startUserRef.current = open ? startUserId : startUserRef.current;
	startIndexRef.current = open ? startIndex : startIndexRef.current;
	const [userId, setUserId] = (0, import_react.useState)(null);
	const [storyIndex, setStoryIndex] = (0, import_react.useState)(0);
	const [paused, setPaused] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const dialogRef = (0, import_react.useRef)(null);
	const restoreRef = (0, import_react.useRef)(null);
	const startedAtRef = (0, import_react.useRef)(0);
	const elapsedRef = (0, import_react.useRef)(0);
	const heldRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	const userIndex = (0, import_react.useMemo)(() => entries.findIndex((e) => e.userId === userId), [entries, userId]);
	const entry = userIndex >= 0 ? entries[userIndex] : void 0;
	const stories = entry?.stories ?? [];
	const story = stories[storyIndex];
	const duration = story ? storyDuration(story) : FALLBACK_DURATION_MS;
	(0, import_react.useEffect)(() => {
		if (!open) return;
		setUserId(startUserRef.current);
		setStoryIndex(startIndexRef.current);
		setPaused(false);
		setProgress(0);
		elapsedRef.current = 0;
		restoreRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
		const id = window.requestAnimationFrame(() => dialogRef.current?.focus());
		return () => window.cancelAnimationFrame(id);
	}, [open]);
	(0, import_react.useEffect)(() => {
		if (open) return;
		const el = restoreRef.current;
		if (el && document.contains(el)) el.focus({ preventScroll: true });
		restoreRef.current = null;
	}, [open]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, [open]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onVisibility = () => {
			if (document.visibilityState === "hidden") setPaused(true);
		};
		document.addEventListener("visibilitychange", onVisibility);
		return () => document.removeEventListener("visibilitychange", onVisibility);
	}, [open]);
	const storyId = story?.id;
	(0, import_react.useEffect)(() => {
		if (!open || !storyId) return;
		onViewed(storyId);
	}, [
		open,
		storyId,
		onViewed
	]);
	const close = (0, import_react.useCallback)(() => {
		setPaused(false);
		onClose();
	}, [onClose]);
	const goTo = (0, import_react.useCallback)((nextUserId, nextStoryIndex) => {
		elapsedRef.current = 0;
		setProgress(0);
		setPaused(false);
		setUserId(nextUserId);
		setStoryIndex(nextStoryIndex);
	}, []);
	const goNext = (0, import_react.useCallback)(() => {
		if (!entry) return;
		if (storyIndex < stories.length - 1) {
			goTo(entry.userId, storyIndex + 1);
			return;
		}
		const next = nextUnseenAuthor(entries, entry.userId, viewed);
		if (!next) {
			close();
			return;
		}
		goTo(next.userId, firstUnseenIndex(next.stories, viewed));
	}, [
		entry,
		storyIndex,
		stories.length,
		entries,
		viewed,
		goTo,
		close
	]);
	const goPrev = (0, import_react.useCallback)(() => {
		if (!entry) return;
		if (storyIndex > 0) {
			goTo(entry.userId, storyIndex - 1);
			return;
		}
		if (entries.length < 2) return;
		const prevEntry = entries[(userIndex - 1 + entries.length) % entries.length];
		if (prevEntry.stories.length === 0) return;
		goTo(prevEntry.userId, prevEntry.stories.length - 1);
	}, [
		entry,
		storyIndex,
		entries,
		userIndex,
		goTo
	]);
	const goNextRef = (0, import_react.useRef)(goNext);
	goNextRef.current = goNext;
	(0, import_react.useEffect)(() => {
		if (!open || paused || !storyId) return;
		startedAtRef.current = performance.now() - elapsedRef.current;
		let raf = 0;
		const tick = (now) => {
			const elapsed = Math.max(0, now - startedAtRef.current);
			elapsedRef.current = elapsed;
			if (elapsed >= duration) {
				setProgress(1);
				goNextRef.current();
				return;
			}
			setProgress(elapsed / duration);
			raf = window.requestAnimationFrame(tick);
		};
		raf = window.requestAnimationFrame(tick);
		return () => window.cancelAnimationFrame(raf);
	}, [
		open,
		paused,
		storyId,
		duration
	]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") {
				e.preventDefault();
				close();
			} else if (e.key === " " || e.key === "Spacebar") {
				const target = e.target;
				if (target && target.closest("input, textarea, [contenteditable]")) return;
				e.preventDefault();
				setPaused((p) => !p);
			}
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open, close]);
	const onPointerDown = (e) => {
		if (e.target.closest("[data-story-control]")) return;
		heldRef.current = true;
		setPaused(true);
	};
	const releasePointer = () => {
		if (!heldRef.current) return;
		heldRef.current = false;
		setPaused((p) => p ? false : p);
	};
	if (!open || !mounted || !entry || !story) return null;
	const caption = story.caption[lang] ?? story.caption.en;
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: dialogRef,
		role: "dialog",
		"aria-modal": "true",
		"aria-label": `${entry.label} — ${strings.storyProgressLabel}`,
		"data-story-viewer": true,
		tabIndex: -1,
		className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-0 sm:p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"data-story-stage": true,
			onPointerDown,
			onPointerUp: releasePointer,
			onPointerCancel: releasePointer,
			className: "relative flex h-full w-full max-w-[440px] select-none flex-col overflow-hidden bg-black sm:h-[min(90vh,880px)] sm:rounded-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0",
					style: storyBackdropStyle(story),
					"aria-hidden": "true"
				}),
				story.mediaType === "image" && story.mediaUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: story.mediaUrl,
					alt: "",
					draggable: false,
					className: "absolute inset-0 size-full object-cover"
				}, story.id) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/70",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pointer-events-none relative z-30 flex flex-col gap-2 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryProgress, {
						count: stories.length,
						index: storyIndex,
						progress,
						label: strings.storyProgressLabel
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							entry.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: entry.photo,
								alt: "",
								className: "size-8 shrink-0 rounded-full object-cover"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-semibold text-white",
									children: entry.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-[11px] text-white/70",
									children: paused ? strings.storyPaused : story.caption[lang] ?? story.caption.en
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"data-story-control": true,
								"data-story-close": true,
								"aria-label": strings.storyClose,
								onClick: close,
								className: "pointer-events-auto grid size-9 shrink-0 place-items-center rounded-full bg-white/12 text-white transition-colors hover:bg-white/25",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									viewBox: "0 0 24 24",
									"aria-hidden": "true",
									className: "size-5 stroke-current stroke-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M6 6l12 12M18 6L6 18",
										fill: "none",
										strokeLinecap: "round"
									})
								})
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none relative z-30 mt-auto p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						"data-story-caption": true,
						className: "text-center text-sm text-white/90",
						children: caption
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"data-story-control": true,
					"data-story-tap": "prev",
					"aria-label": strings.storyPrevLabel,
					onClick: goPrev,
					className: "absolute inset-y-0 left-0 z-20 w-1/3 cursor-w-resize bg-transparent",
					tabIndex: -1
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"data-story-control": true,
					"data-story-tap": "next",
					"aria-label": strings.storyNextLabel,
					onClick: goNext,
					className: "absolute inset-y-0 right-0 z-20 w-1/3 cursor-e-resize bg-transparent",
					tabIndex: -1
				})
			]
		})
	}), document.body);
}
function HomePage() {
	const { t, lang } = useI18n();
	const blocked = useAppStore((s) => s.blocked);
	const follows = useAppStore((s) => s.follows);
	const viewedStoryIds = useAppStore((s) => s.viewedStoryIds);
	const clientPhoto = useAppStore((s) => s.clientPhoto);
	const markStoryViewed = useAppStore((s) => s.markStoryViewed);
	const [viewer, setViewer] = (0, import_react.useState)(null);
	const visible = PROFILES.filter((p) => {
		if (blocked.includes(p.id)) return false;
		if (p.gender !== "women") return false;
		return true;
	});
	const feedPosts = POSTS.filter((post) => visible.some((p) => p.id === post.profileId)).slice(0, 12);
	const storyStrings = (0, import_react.useMemo)(() => ({
		storyStateNew: t.storyStateNew,
		storyStateSeen: t.storyStateSeen,
		storyStateEmpty: t.storyStateEmpty,
		storyStateOwn: t.storyStateOwn,
		storiesNewCount: t.storiesNewCount,
		storyOpenLabel: t.storyOpenLabel,
		storyViewProfile: t.storyViewProfile
	}), [t]);
	const openViewer = (0, import_react.useCallback)((userId) => {
		setViewer({
			userId,
			index: firstUnseenIndex(storiesByProfile(userId), viewedStoryIds)
		});
	}, [viewedStoryIds]);
	const railEntries = (0, import_react.useMemo)(() => buildStoryRail({
		profiles: visible,
		viewed: viewedStoryIds,
		follows,
		selfPhoto: clientPhoto || void 0,
		t: storyStrings
	}), [
		visible,
		viewedStoryIds,
		follows,
		clientPhoto,
		storyStrings
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryRail, {
				entries: railEntries,
				strings: storyStrings,
				onOpen: openViewer
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-3 py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/directory",
					className: "flex items-center justify-between gap-3 rounded-2xl border border-green-500/25 bg-gradient-to-r from-green-500/15 via-surface to-surface px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold text-cream",
						children: lang === "ru" ? "Каталог с номерами" : lang === "he" ? "מדריך עם מספרים" : "Directory with numbers"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 text-xs text-muted",
						children: [
							visible.length,
							" ",
							lang === "ru" ? "анкет · звонок в 1 тап" : "profiles · 1-tap call"
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 rounded-full bg-green-500 px-4 py-2 text-xs font-semibold text-black",
						children: lang === "ru" ? "Открыть" : "Open"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "divide-y divide-line",
				children: feedPosts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-4 py-12 text-center text-sm text-muted",
					children: t.feed
				}) : feedPosts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, { post }, post.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryViewer, {
				open: viewer !== null,
				entries: railEntries,
				startUserId: viewer?.userId ?? railEntries[0]?.userId ?? "me",
				startIndex: viewer?.index ?? 0,
				lang,
				strings: {
					...storyStrings,
					storyClose: t.storyClose,
					storyPaused: t.storyPaused,
					storyProgressLabel: t.storyProgressLabel,
					storyPrevLabel: t.storyPrevLabel,
					storyNextLabel: t.storyNextLabel
				},
				viewed: viewedStoryIds,
				onViewed: markStoryViewed,
				onClose: () => setViewer(null)
			})
		]
	});
}
//#endregion
export { HomePage as component };
