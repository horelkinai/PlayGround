import { i as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useAppStore, u as PROFILES } from "./router-CWqAbG_v.mjs";
import { n as useI18n } from "./use-i18n-DMLbRgsP.mjs";
import { r as SectionTitle } from "./cards-BdeDikRX.mjs";
import { i as Field, n as Button, r as Chip } from "./ui-xEub4V1l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blocked-BSH8XHF_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TrustSafetyPage() {
	const { t } = useI18n();
	const role = useAppStore((s) => s.role);
	const blocked = useAppStore((s) => s.blocked);
	const unblock = useAppStore((s) => s.unblock);
	const safetyReports = useAppStore((s) => s.safetyReports);
	const addSafetyReport = useAppStore((s) => s.addSafetyReport);
	const visibleReports = useAppStore((s) => s.demoAdmin) ? safetyReports : safetyReports.filter((r) => r.reporterId === "me");
	const list = PROFILES.filter((p) => blocked.includes(p.id));
	const canAccessTrust = useAppStore((s) => s.canAccessTrustSafety());
	const verificationStatus = useAppStore((s) => s.verificationStatus);
	const canReport = canAccessTrust;
	const [showForm, setShowForm] = (0, import_react.useState)(false);
	const [targetLabel, setTargetLabel] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("harassment");
	const [period, setPeriod] = (0, import_react.useState)("");
	const [explanation, setExplanation] = (0, import_react.useState)("");
	const [evidenceNote, setEvidenceNote] = (0, import_react.useState)("");
	const [consent, setConsent] = (0, import_react.useState)(false);
	function submitReport() {
		if (!targetLabel.trim() || !explanation.trim() || !consent) return;
		addSafetyReport({
			reporterRole: role,
			reporterId: "me",
			targetLabel: targetLabel.trim(),
			category,
			period: period || "not specified",
			explanation: explanation.trim(),
			evidenceNote: evidenceNote || "placeholder — no real files"
		});
		setShowForm(false);
		setTargetLabel("");
		setExplanation("");
		setEvidenceNote("");
		setConsent(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: t.trustSafety || t.navBlocked || "Trust & Safety" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: t.safetyHint || "Private demo channel. No public blacklist. No raw numbers shown."
			})] }),
			!canReport && (role === "individual" || role === "agency") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-line bg-surface p-4 text-sm text-muted",
				children: [
					"Trust & Safety доступен после статуса Verified. Текущий статус: ",
					verificationStatus,
					". Запросите верификацию в разделе «Мой профиль»."
				]
			}),
			!canReport && role !== "individual" && role !== "agency" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-line bg-surface p-4 text-sm text-muted",
				children: "Закрытый раздел Trust & Safety доступен только проверенным профилям и агентствам."
			}),
			canReport && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm tracking-wide text-muted uppercase",
							children: t.safetyTitle || "Private Safety Reports"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "line",
							onClick: () => setShowForm((v) => !v),
							children: showForm ? t.cancel : t.submit
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-amber-400/90",
						children: t.falseReportWarning || "False reports are prohibited and may lead to account restrictions."
					}),
					showForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3 rounded-xl border border-line bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								placeholder: "Client / user label (fictional)",
								value: targetLabel,
								onChange: (e) => setTargetLabel(e.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									"harassment",
									"threats",
									"fraud",
									"privacy",
									"other"
								].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									active: category === c,
									onClick: () => setCategory(c),
									children: c
								}, c))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								placeholder: "Incident period (e.g. Sep 2026)",
								value: period,
								onChange: (e) => setPeriod(e.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								placeholder: "Explanation",
								value: explanation,
								onChange: (e) => setExplanation(e.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								placeholder: "Evidence note (placeholder only — no real upload)",
								value: evidenceNote,
								onChange: (e) => setEvidenceNote(e.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-start gap-3 text-sm text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: consent,
									onChange: (e) => setConsent(e.target.checked),
									className: "mt-1 size-4 accent-[var(--color-accent)]"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "I confirm this is a private safety report and consent to demo processing." })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: submitReport,
								disabled: !consent || !targetLabel || !explanation,
								children: t.submit
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: visibleReports.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-6 text-center text-sm text-muted",
							children: t.empty
						}) : visibleReports.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-xl border border-line bg-surface p-4 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: r.targetLabel
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
										active: true,
										children: r.status
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-muted",
									children: [
										r.category,
										" · ",
										r.period,
										" · ",
										r.created
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2",
									children: r.explanation
								}),
								r.adminNote && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-xs text-subtle",
									children: ["Admin: ", r.adminNote]
								})
							]
						}, r.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm tracking-wide text-muted uppercase",
						children: t.blockedTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: t.blockedHint
					}),
					list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-8 text-center text-muted",
						children: t.empty
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 rounded-xl border border-line bg-surface p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: p.photo,
									alt: "",
									className: "size-12 rounded-lg object-cover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: p.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: ["@", p.username]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "line",
									onClick: () => unblock(p.id),
									children: t.unblock
								})
							]
						}, p.id))
					})
				]
			})
		]
	});
}
//#endregion
export { TrustSafetyPage as component };
