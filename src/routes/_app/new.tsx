import { createFileRoute } from "@tanstack/react-router";
import { ProfileCard, SectionTitle } from "@/components/cards";
import { NEW_IDS, profileById } from "@/lib/demo-data";
import { useI18n } from "@/lib/use-i18n";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/_app/new")({
  component: NewPage,
});

function NewPage() {
  const { t } = useI18n();
  const blocked = useAppStore((s) => s.blocked);
  const profiles = NEW_IDS.map((id) => profileById(id)).filter(
    (p): p is NonNullable<typeof p> => !!p && !blocked.includes(p.id),
  );

  return (
    <div className="space-y-4">
      <SectionTitle>{t.newProfiles}</SectionTitle>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {profiles.map((p) => (
          <ProfileCard key={p.id} profile={p} variant="grid" />
        ))}
      </div>
    </div>
  );
}
