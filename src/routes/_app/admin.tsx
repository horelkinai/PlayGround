import { createFileRoute } from "@tanstack/react-router";
import { SectionTitle } from "@/components/cards";
import { Button, Chip } from "@/components/ui";
import { ADMIN_QUEUE, AUDIT } from "@/lib/demo-data";
import type { SafetyReportStatus } from "@/lib/types";
import { useI18n } from "@/lib/use-i18n";
import { useAppStore } from "@/lib/store";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/admin")({
  component: AdminPage,
});

function AdminPage() {
  const { t } = useI18n();
  const adminStatus = useAppStore((s) => s.adminStatus);
  const setAdmin = useAppStore((s) => s.setAdmin);
  const safetyReports = useAppStore((s) => s.safetyReports);
  const updateSafetyReportStatus = useAppStore((s) => s.updateSafetyReportStatus);
  const demoAdmin = useAppStore((s) => s.demoAdmin);

  if (!demoAdmin) {
    return (
      <div className="mx-auto max-w-md space-y-4 py-16 text-center">
        <h1 className="font-display text-2xl text-cream">Admin (demo)</h1>
        <p className="text-sm text-muted">
          Admin access is separate from account role. Enable &quot;Demo admin&quot; in Settings to open the prototype queue.
        </p>
        <Link to="/settings" className="text-accent underline">Open Settings</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <SectionTitle>{t.navAdmin}</SectionTitle>

      <section className="space-y-3">
        <h3 className="text-sm tracking-wide text-muted uppercase">{t.pending}</h3>
        <ul className="space-y-2">
          {ADMIN_QUEUE.map((item) => {
            const status = adminStatus[item.id] ?? item.status;
            return (
              <li
                key={item.id}
                className="rounded-xl border border-line bg-surface p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted">
                      {item.subtitle} · {item.kind} · {item.created}
                    </p>
                  </div>
                  <Chip active={status === "pending"}>
                    {status === "pending"
                      ? t.pending
                      : status === "approved"
                        ? t.approved
                        : t.rejected}
                  </Chip>
                </div>
                {status === "pending" && (
                  <div className="mt-3 flex gap-2">
                    <Button onClick={() => setAdmin(item.id, "approved")}>{t.approve}</Button>
                    <Button variant="danger" onClick={() => setAdmin(item.id, "rejected")}>
                      {t.reject}
                    </Button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>


      <section className="space-y-3">
        <h3 className="text-sm tracking-wide text-muted uppercase">Safety reports queue</h3>
        <p className="text-xs text-muted">Restricted preview only. No public exposure of evidence or reporter identity.</p>
        <ul className="space-y-2">
          {safetyReports.length === 0 ? (
            <li className="py-6 text-center text-sm text-muted">No safety reports</li>
          ) : (
            safetyReports.map((r) => (
              <li key={r.id} className="rounded-xl border border-line bg-surface p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{r.targetLabel}</p>
                    <p className="text-sm text-muted">
                      {r.category} · {r.period} · {r.status} · {r.created}
                    </p>
                    <p className="mt-1 text-sm">{r.explanation}</p>
                    <p className="mt-1 text-xs text-subtle">Evidence: {r.evidenceNote}</p>
                  </div>
                  <Chip active={r.status === "submitted" || r.status === "under_review"}>
                    {r.status}
                  </Chip>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button onClick={() => updateSafetyReportStatus(r.id, "under_review")}>Review</Button>
                  <Button variant="line" onClick={() => updateSafetyReportStatus(r.id, "needs_clarification", "Need more context")}>Clarify</Button>
                  <Button onClick={() => updateSafetyReportStatus(r.id, "action_taken", "Action recorded")}>Action</Button>
                  <Button variant="danger" onClick={() => updateSafetyReportStatus(r.id, "closed")}>Close</Button>
                  <Button variant="ghost" onClick={() => updateSafetyReportStatus(r.id, "appealed")}>Appeal</Button>
                </div>
              </li>
            ))
          )}
        </ul>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm tracking-wide text-muted uppercase">Audit</h3>
        <ul className="space-y-2">
          {AUDIT.map((a) => (
            <li key={a.id} className="rounded-lg border border-line bg-surface p-3 text-sm">
              <p className="text-muted">
                {a.timestamp} · {a.actor}
              </p>
              <p>
                {a.target}: {a.previous} → {a.next}
              </p>
              <p className="text-subtle">
                {a.reason}
                {a.note ? ` · ${a.note}` : ""}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
