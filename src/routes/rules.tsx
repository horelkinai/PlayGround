import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui";
import { useI18n } from "@/lib/use-i18n";

export const Route = createFileRoute("/rules")({
  component: RulesPage,
});

function RulesPage() {
  const { t } = useI18n();
  return (
    <main className="mx-auto max-w-lg space-y-6 px-6 py-10">
      <Logo />
      <h1 className="font-display text-3xl tracking-wide text-cream">{t.rulesTitle}</h1>
      <p className="leading-relaxed text-muted">{t.rulesBody}</p>
      <Link to="/">
        <Button variant="line">{t.back}</Button>
      </Link>
    </main>
  );
}
