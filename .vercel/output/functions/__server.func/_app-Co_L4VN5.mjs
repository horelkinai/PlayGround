import { i as __toESM } from "./_runtime.mjs";
import { S as Navigate, T as require_jsx_runtime, Z as require_react, _ as Outlet, m as useRouterState, x as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { d as House, f as Heart, g as Clapperboard, o as Search, s as Plus, t as User, u as LayoutGrid } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { r as useAppStore } from "./_ssr/router-CWqAbG_v.mjs";
import { n as useI18n, t as cn } from "./_ssr/use-i18n-DMLbRgsP.mjs";
import { t as Logo } from "./_ssr/logo-DBidGl-8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-Co_L4VN5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function primaryNav(_role) {
	return [
		{
			to: "/directory",
			key: "navDir",
			icon: LayoutGrid
		},
		{
			to: "/home",
			key: "navHome",
			icon: House
		},
		{
			to: "/reels",
			key: "navReels",
			icon: Clapperboard
		},
		{
			to: "/search",
			key: "navSearch",
			icon: Search
		},
		{
			to: "/me",
			key: "navMe",
			icon: User
		}
	];
}
function AppShell() {
	const ageOk = useAppStore((s) => s.ageOk);
	const onboarded = useAppStore((s) => s.onboarded);
	if (!ageOk) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	if (!onboarded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/onboarding" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShellFrame, {});
}
function ShellFrame() {
	const { t } = useI18n();
	const path = useRouterState({ select: (s) => s.location.pathname });
	const role = useAppStore((s) => s.role);
	const isGuest = useAppStore((s) => s.isGuest());
	const addSessionSeconds = useAppStore((s) => s.addSessionSeconds);
	const canPublish = role === "individual" || role === "agency";
	const primary = (0, import_react.useMemo)(() => primaryNav(role), [role]);
	const notifTo = isGuest ? "/onboarding" : "/favorites";
	(0, import_react.useEffect)(() => {
		if (role !== "client") return;
		const id = window.setInterval(() => addSessionSeconds(1), 1e3);
		return () => window.clearInterval(id);
	}, [role, addSessionSeconds]);
	function onPublish() {
		if (canPublish) return;
		toast.message(t.publishBlocked || "Публикации доступны только анкетам individual и агентствам. Все аккаунты строго проверяются от мошенников.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 start-0 z-30 hidden w-56 flex-col border-e border-line bg-surface p-4 lg:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/directory",
						className: "mb-8 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex flex-1 flex-col gap-1",
						children: [primary.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm", path.startsWith(item.to) ? "bg-elevated text-cream" : "text-muted hover:text-fg"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), t[item.key] || item.key]
						}, item.to + item.key)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: notifTo,
							className: cn("flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm", path.startsWith("/favorites") ? "bg-elevated text-cream" : "text-muted hover:text-fg"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-4" }), t.navFav || "Favorites"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs text-subtle",
						children: t.demo
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:ps-56",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-20 grid grid-cols-3 items-center border-b border-line bg-bg/95 px-3 py-2.5 backdrop-blur lg:hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-start",
							children: canPublish ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/me",
								className: "grid size-10 place-items-center rounded-full text-cream",
								"aria-label": t.createPost || "Publish",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
									className: "size-6",
									strokeWidth: 1.75
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: onPublish,
								className: "grid size-10 place-items-center rounded-full text-muted",
								"aria-label": t.createPost || "Publish",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
									className: "size-6 opacity-40",
									strokeWidth: 1.75
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/directory",
								className: "block",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { compact: true })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: notifTo,
								className: "grid size-10 place-items-center rounded-full text-cream",
								"aria-label": t.navFav || "Notifications",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
									className: "size-6",
									strokeWidth: 1.75
								})
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: cn("mx-auto px-0 pb-20 pt-0 lg:px-4 lg:pb-10 lg:pt-4", path.startsWith("/reels") ? "max-w-none" : "max-w-lg lg:max-w-5xl"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 flex border-t border-line bg-surface/95 backdrop-blur lg:hidden",
				children: primary.map((item) => {
					const active = item.to === "/directory" ? path.startsWith("/directory") : path.startsWith(item.to);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: cn("flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[10px]", active ? "text-cream" : "text-muted"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
							className: cn("size-6", active && "stroke-[2.25]"),
							strokeWidth: active ? 2.25 : 1.75
						})
					}, item.to + item.key);
				})
			})
		]
	});
}
var SplitComponent = AppShell;
//#endregion
export { SplitComponent as component };
