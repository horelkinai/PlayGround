import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionTitle } from "@/components/cards";
import { Button, Field, Chip } from "@/components/ui";
import { PROFILES } from "@/lib/demo-data";
import { useI18n } from "@/lib/use-i18n";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/_app/blocked")({
  component: TrustSafetyPage,
});

function TrustSafetyPage() {
  const { t } = useI18n();
  const role = useAppStore((s) => s.role);
  const blocked = useAppStore((s) => s.blocked);
  const unblock = useAppStore((s) => s.unblock);
  const safetyReports = useAppStore((s) => s.safetyReports);
  const addSafetyReport = useAppStore((s) => s.addSafetyReport);
  const demoAdmin = useAppStore((s) => s.demoAdmin);
  // non-admin sees only own reports (reporterId === "me")
  const visibleReports = demoAdmin
    ? safetyReports
    : safetyReports.filter((r) => r.reporterId === "me");
  const list = PROFILES.filter((p) => blocked.includes(p.id));

  const canAccessTrust = useAppStore((s) => s.canAccessTrustSafety());
  const verificationStatus = useAppStore((s) => s.verificationStatus);
  const canReport = canAccessTrust;

  const [showForm, setShowForm] = useState(false);
  const [targetLabel, setTargetLabel] = useState("");
  const [category, setCategory] = useState("harassment");
  const [period, setPeriod] = useState("");
  const [explanation, setExplanation] = useState("");
  const [evidenceNote, setEvidenceNote] = useState("");
  const [consent, setConsent] = useState(false);

  function submitReport() {
    if (!targetLabel.trim() || !explanation.trim() || !consent) return;
    addSafetyReport({
      reporterRole: role as "individual" | "agency",
      reporterId: "me",
      targetLabel: targetLabel.trim(),
      category,
      period: period || "not specified",
      explanation: explanation.trim(),
      evidenceNote: evidenceNote || "placeholder — no real files",
    });
    setShowForm(false);
    setTargetLabel("");
    setExplanation("");
    setEvidenceNote("");
    setConsent(false);
  }

  return (
    <div className="space-y-8">
      <div>
        <SectionTitle>{(t as any).trustSafety || t.navBlocked || "Trust & Safety"}</SectionTitle>
        <p className="mt-1 text-sm text-muted">
          {(t as any).safetyHint ||
            "Private demo channel. No public blacklist. No raw numbers shown."}
        </p>
      </div>

      {!canReport && (role === "individual" || role === "agency") && (
        <div className="rounded-xl border border-line bg-surface p-4 text-sm text-muted">
          Trust &amp; Safety доступен после статуса Verified. Текущий статус: {verificationStatus}.
          Запросите верификацию в разделе «Мой профиль».
        </div>
      )}
      {!canReport && role !== "individual" && role !== "agency" && (
        <div className="rounded-xl border border-line bg-surface p-4 text-sm text-muted">
          Закрытый раздел Trust &amp; Safety доступен только проверенным профилям и агентствам.
        </div>
      )}
      {canReport && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm tracking-wide text-muted uppercase">
              {(t as any).safetyTitle || "Private Safety Reports"}
            </h3>
            <Button variant="line" onClick={() => setShowForm((v) => !v)}>
              {showForm ? t.cancel : t.submit}
            </Button>
          </div>
          <p className="text-xs text-amber-400/90">
            {(t as any).falseReportWarning ||
              "False reports are prohibited and may lead to account restrictions."}
          </p>

          {showForm && (
            <div className="space-y-3 rounded-xl border border-line bg-surface p-4">
              <Field
                placeholder="Client / user label (fictional)"
                value={targetLabel}
                onChange={(e) => setTargetLabel(e.target.value)}
              />
              <div className="flex flex-wrap gap-2">
                {["harassment", "threats", "fraud", "privacy", "other"].map((c) => (
                  <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
                    {c}
                  </Chip>
                ))}
              </div>
              <Field
                placeholder="Incident period (e.g. Sep 2026)"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              />
              <Field
                placeholder="Explanation"
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
              />
              <Field
                placeholder="Evidence note (placeholder only — no real upload)"
                value={evidenceNote}
                onChange={(e) => setEvidenceNote(e.target.value)}
              />
              <label className="flex items-start gap-3 text-sm text-muted">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 size-4 accent-[var(--color-accent)]"
                />
                <span>I confirm this is a private safety report and consent to demo processing.</span>
              </label>
              <Button onClick={submitReport} disabled={!consent || !targetLabel || !explanation}>
                {t.submit}
              </Button>
            </div>
          )}

          <ul className="space-y-2">
            {visibleReports.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted">{t.empty}</p>
            ) : (
              visibleReports.map((r) => (
                <li
                  key={r.id}
                  className="rounded-xl border border-line bg-surface p-4 text-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium">{r.targetLabel}</p>
                    <Chip active>{r.status}</Chip>
                  </div>
                  <p className="mt-1 text-muted">
                    {r.category} · {r.period} · {r.created}
                  </p>
                  <p className="mt-2">{r.explanation}</p>
                  {r.adminNote && (
                    <p className="mt-2 text-xs text-subtle">Admin: {r.adminNote}</p>
                  )}
                </li>
              ))
            )}
          </ul>
        </section>
      )}

      <section className="space-y-3">
        <h3 className="text-sm tracking-wide text-muted uppercase">{t.blockedTitle}</h3>
        <p className="text-sm text-muted">{t.blockedHint}</p>
        {list.length === 0 ? (
          <p className="py-8 text-center text-muted">{t.empty}</p>
        ) : (
          <ul className="space-y-2">
            {list.map((p) => (
              <li
                key={p.id}
                className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3"
              >
                <img src={p.photo} alt="" className="size-12 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-muted">@{p.username}</p>
                </div>
                <Button variant="line" onClick={() => unblock(p.id)}>
                  {t.unblock}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
