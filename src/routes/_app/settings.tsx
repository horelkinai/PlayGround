import { createFileRoute } from "@tanstack/react-router";
import { SectionTitle } from "@/components/cards";
import { Button, Chip } from "@/components/ui";
import { LangSwitch } from "@/components/lang-switch";
import { useI18n } from "@/lib/use-i18n";
import { useAppStore } from "@/lib/store";
import type { Discovery } from "@/lib/types";

export const Route = createFileRoute("/_app/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { t } = useI18n();
  const lang = useAppStore((s) => s.lang);
  const theme = useAppStore((s) => s.theme);
  const discovery = useAppStore((s) => s.discovery);
  const setLang = useAppStore((s) => s.setLang);
  const setTheme = useAppStore((s) => s.setTheme);
  const resetDemo = useAppStore((s) => s.resetDemo);
  // discovery is stored via finishOnboarding; allow override by mutating store
  const persist = useAppStore((s) => s.persist);
  const role = useAppStore((s) => s.role);
  const phoneVerified = useAppStore((s) => s.phoneVerified);
  const verificationStatus = useAppStore((s) => s.verificationStatus);
  const demoAdmin = useAppStore((s) => s.demoAdmin);
  const setDemoAdmin = useAppStore((s) => s.setDemoAdmin);
  const setPhoneVerified = useAppStore((s) => s.setPhoneVerified);

  function setDiscovery(d: Discovery) {
    useAppStore.setState({ discovery: d });
    persist();
  }

  return (
    <div className="mx-auto max-w-lg space-y-8">
      <SectionTitle>{t.settingsTitle}</SectionTitle>
      <div className="rounded-xl border border-line bg-surface p-3 text-sm space-y-2">
        <p>Role: <span className="text-cream">{role}</span> · Phone: {phoneVerified ? "verified" : "no"} · Status: {verificationStatus}</p>
        {role === "client" && (
          <label className="flex items-center gap-2 text-muted">
            <input
              type="checkbox"
              checked={phoneVerified}
              onChange={(e) => setPhoneVerified(e.target.checked)}
              className="size-4 accent-[var(--color-accent)]"
            />
            Phone verified (demo toggle)
          </label>
        )}
        <label className="flex items-center gap-2 text-muted">
          <input
            type="checkbox"
            checked={demoAdmin}
            onChange={(e) => setDemoAdmin(e.target.checked)}
            className="size-4 accent-[var(--color-accent)]"
          />
          Demo admin access (separate from account role)
        </label>
      </div>

      <section className="space-y-3">
        <h3 className="text-sm text-muted">{t.language}</h3>
        <LangSwitch value={lang} onChange={setLang} />
      </section>

      <section className="space-y-3">
        <h3 className="text-sm text-muted">{t.theme}</h3>
        <div className="flex gap-2">
          <Chip active={theme === "dark"} onClick={() => setTheme("dark")}>
            {t.dark}
          </Chip>
          <Chip active={theme === "light"} onClick={() => setTheme("light")}>
            {t.light}
          </Chip>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm text-muted">{t.discoveryPref}</h3>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["women", t.discWomen],
              ["men", t.discMen],
              ["all", t.discAll],
            ] as const
          ).map(([id, label]) => (
            <Chip key={id} active={discovery === id} onClick={() => setDiscovery(id)}>
              {label}
            </Chip>
          ))}
        </div>
      </section>

      <section className="space-y-3 border-t border-line pt-6">
        <p className="text-xs text-subtle">{t.demo}</p>
        <Button
          variant="danger"
          onClick={() => {
            resetDemo();
            window.location.href = "/";
          }}
        >
          Reset demo
        </Button>
      </section>
    </div>
  );
}
