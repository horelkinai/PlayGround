import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui";
import { LangSwitch } from "@/components/lang-switch";
import { useI18n } from "@/lib/use-i18n";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  component: WelcomeAgeGate,
});

function WelcomeAgeGate() {
  const { t } = useI18n();
  const ageOk = useAppStore((s) => s.ageOk);
  const onboarded = useAppStore((s) => s.onboarded);
  const lang = useAppStore((s) => s.lang);
  const setLang = useAppStore((s) => s.setLang);
  const passAge = useAppStore((s) => s.passAge);
  const hydrated = useAppStore((s) => s.hydrated);

  if (!hydrated) {
    return (
      <div className="grid min-h-dvh place-items-center bg-black">
        <Logo className="h-20 max-w-[320px] sm:h-28 sm:max-w-[420px]" />
      </div>
    );
  }

  if (ageOk && onboarded) return <Navigate to="/directory" />;
  if (ageOk) return <Navigate to="/onboarding" />;

  return (
    <main className="relative isolate min-h-dvh overflow-hidden">
      <img
        src="/brand/girl.jpg"
        alt=""
        className="absolute inset-0 size-full object-cover object-center"
      />
      {/* Keep the photo readable: dark at the bottom for the copy, open at the top. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 to-transparent" />

      <div className="relative z-10 flex min-h-dvh flex-col">
        <div className="flex items-center justify-end px-4 pt-4">
          <LangSwitch value={lang} onChange={setLang} />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-10 text-center sm:gap-7">
          <Logo className="h-20 max-w-[300px] drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] sm:h-28 sm:max-w-[420px]" />

          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-[0.18em] text-white/85 uppercase sm:text-sm">
              {t.ageNotice}
            </p>
            <h1 className="font-display text-2xl leading-tight text-cream sm:text-3xl">
              {t.tagline}
            </h1>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-white/75">
              {t.ageBody}
            </p>
          </div>

          <div className="mt-1 flex w-full max-w-sm flex-col gap-3">
            <Button onClick={() => passAge()}>{t.continue}</Button>
            <Button variant="line" onClick={() => window.close()}>
              {t.exit}
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/60">
            <Link to="/rules" className="underline-offset-4 hover:text-white hover:underline">
              {t.rules}
            </Link>
            <Link to="/privacy" className="underline-offset-4 hover:text-white hover:underline">
              {t.privacy}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
