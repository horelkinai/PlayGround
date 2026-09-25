import { createFileRoute } from "@tanstack/react-router";
import { ProfileCard, SectionTitle } from "@/components/cards";
import { useAllProfiles } from "@/lib/profiles-catalog";
import { useI18n } from "@/lib/use-i18n";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/_app/favorites")({
  component: FavoritesPage,
});

function FavoritesPage() {
  const { t } = useI18n();
  const favorites = useAppStore((s) => s.favorites);
  const blocked = useAppStore((s) => s.blocked);
  const all = useAllProfiles();
  const list = all.filter((p) => favorites[p.id] && !blocked.includes(p.id));

  return (
    <div className="space-y-4">
      <SectionTitle>{t.navFav}</SectionTitle>
      {list.length === 0 ? (
        <p className="py-16 text-center text-muted">{t.empty}</p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {list.map((p) => (
            <ProfileCard key={p.id} profile={p} variant="grid" />
          ))}
        </div>
      )}
    </div>
  );
}
