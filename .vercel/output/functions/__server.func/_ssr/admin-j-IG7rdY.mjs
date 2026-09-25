import { T as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as AUDIT, i as ADMIN_QUEUE, r as useAppStore } from "./router-CWqAbG_v.mjs";
import { n as useI18n } from "./use-i18n-DMLbRgsP.mjs";
import { r as SectionTitle } from "./cards-BdeDikRX.mjs";
import { n as Button, r as Chip } from "./ui-xEub4V1l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-j-IG7rdY.js
var import_jsx_runtime = require_jsx_runtime();
function AdminPage() {
	const { t } = useI18n();
	const adminStatus = useAppStore((s) => s.adminStatus);
	const setAdmin = useAppStore((s) => s.setAdmin);
	const safetyReports = useAppStore((s) => s.safetyReports);
	const updateSafetyReportStatus = useAppStore((s) => s.updateSafetyReportStatus);
	if (!useAppStore((s) => s.demoAdmin)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md space-y-4 py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl text-cream",
				children: "Admin (demo)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Admin access is separate from account role. Enable \"Demo admin\" in Settings to open the prototype queue."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/settings",
				className: "text-accent underline",
				children: "Open Settings"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: t.navAdmin }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm tracking-wide text-muted uppercase",
					children: t.pending
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: ADMIN_QUEUE.map((item) => {
						const status = adminStatus[item.id] ?? item.status;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-xl border border-line bg-surface p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: item.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted",
									children: [
										item.subtitle,
										" · ",
										item.kind,
										" · ",
										item.created
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									active: status === "pending",
									children: status === "pending" ? t.pending : status === "approved" ? t.approved : t.rejected
								})]
							}), status === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => setAdmin(item.id, "approved"),
									children: t.approve
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "danger",
									onClick: () => setAdmin(item.id, "rejected"),
									children: t.reject
								})]
							})]
						}, item.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm tracking-wide text-muted uppercase",
						children: "Safety reports queue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Restricted preview only. No public exposure of evidence or reporter identity."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: safetyReports.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "py-6 text-center text-sm text-muted",
							children: "No safety reports"
						}) : safetyReports.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-xl border border-line bg-surface p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: r.targetLabel
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-muted",
										children: [
											r.category,
											" · ",
											r.period,
											" · ",
											r.status,
											" · ",
											r.created
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm",
										children: r.explanation
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-subtle",
										children: ["Evidence: ", r.evidenceNote]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									active: r.status === "submitted" || r.status === "under_review",
									children: r.status
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										onClick: () => updateSafetyReportStatus(r.id, "under_review"),
										children: "Review"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "line",
										onClick: () => updateSafetyReportStatus(r.id, "needs_clarification", "Need more context"),
										children: "Clarify"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										onClick: () => updateSafetyReportStatus(r.id, "action_taken", "Action recorded"),
										children: "Action"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "danger",
										onClick: () => updateSafetyReportStatus(r.id, "closed"),
										children: "Close"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										onClick: () => updateSafetyReportStatus(r.id, "appealed"),
										children: "Appeal"
									})
								]
							})]
						}, r.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm tracking-wide text-muted uppercase",
					children: "Audit"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: AUDIT.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-lg border border-line bg-surface p-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-muted",
								children: [
									a.timestamp,
									" · ",
									a.actor
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								a.target,
								": ",
								a.previous,
								" → ",
								a.next
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-subtle",
								children: [a.reason, a.note ? ` · ${a.note}` : ""]
							})
						]
					}, a.id))
				})]
			})
		]
	});
}
//#endregion
export { AdminPage as component };
