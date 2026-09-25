import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui";
import { useI18n } from "@/lib/use-i18n";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  const { t } = useI18n();
  return (
    <main className="mx-auto max-w-lg space-y-6 px-6 py-10">
      <Logo />
      <h1 className="font-display text-3xl tracking-wide text-cream">{t.privacyTitle}</h1>
      <p className="leading-relaxed text-muted">{t.privacyBody}</p>
      <Link to="/">
        <Button variant="line">{t.back}</Button>
      </Link>
    </main>
  );
}
