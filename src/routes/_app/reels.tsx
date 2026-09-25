import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, MessageCircle } from "lucide-react";
import { REELS, NEW_IDS, profileById } from "@/lib/demo-data";
import { useI18n } from "@/lib/use-i18n";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/_app/reels")({
  component: ReelsPage,
});

function ReelsPage() {
  const { lang, t } = useI18n();
  const blocked = useAppStore((s) => s.blocked);
  const likes = useAppStore((s) => s.likes);
  const favorites = useAppStore((s) => s.favorites);
  const toggleLike = useAppStore((s) => s.toggleLike);

  const items = REELS.filter((r) => {
    if (blocked.includes(r.profileId)) return false;
    const p = profileById(r.profileId);
    if (!p || p.gender !== "women") return false;
    if (!(p.verified || p.vip)) return false;
    return true;
  }).sort((a, b) => {
    const fa = favorites[a.profileId] ? 1 : 0;
    const fb = favorites[b.profileId] ? 1 : 0;
    return fb - fa;
  });

  return (
    <div className="h-[calc(100dvh-7.5rem)] snap-y snap-mandatory overflow-y-auto bg-black lg:h-[calc(100dvh-2rem)]">
      {items.map((reel) => {
        const profile = profileById(reel.profileId);
        if (!profile) return null;
        const liked = !!likes[reel.id];
        const isNew = NEW_IDS.includes(profile.id);
        return (
          <article
            key={reel.id}
            className="relative h-full w-full snap-start overflow-hidden bg-black"
          >
            <img src={reel.photo} alt="" className="size-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pb-6">
              <div className="flex items-end justify-between gap-3">
                <Link to="/profile/$id" params={{ id: profile.id }} className="min-w-0">
                  <div className="flex items-center gap-2">
                    <img src={profile.photo} alt="" className="size-9 rounded-full object-cover" />
                    <span className="font-semibold text-white">{profile.name}</span>
                    {profile.verified ? <span className="text-amber-300">✓</span> : null}
                    {isNew ? (
                      <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] uppercase text-white">
                        {(t as Record<string, string>).newBadge || "New"}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-white/85">{reel.caption[lang]}</p>
                </Link>
                <div className="flex flex-col items-center gap-3 text-white">
                  <button type="button" onClick={() => toggleLike(reel.id)} className="grid place-items-center">
                    <Heart className={cn("size-8", liked && "fill-red-500 text-red-500")} />
                    <span className="text-xs">{reel.likes + (liked ? 1 : 0)}</span>
                  </button>
                  <div className="grid place-items-center">
                    <MessageCircle className="size-8" />
                    <span className="text-xs">{reel.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
