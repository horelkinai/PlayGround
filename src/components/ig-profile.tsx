import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Ban, Flag, Heart, MessageCircle, Share2, Star } from "lucide-react";
import { RatingMark } from "@/components/badges";
import { ContactCard } from "@/components/contact-card";
import { Button } from "@/components/ui";
import { CITY_LABEL, reelsByProfile, storiesByProfile } from "@/lib/demo-data";
import { storyRingClass } from "@/lib/stories";
import { useI18n } from "@/lib/use-i18n";
import { useAppStore } from "@/lib/store";
import type { Profile } from "@/lib/types";
import { cn } from "@/lib/cn";

type Tab = "grid" | "reels" | "reviews";

function compact(n: number, lang: string): string {
  if (lang === "ru") {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(".", ",")} млн`;
    if (n >= 1000) return `${(n / 1000).toFixed(1).replace(".", ",")} тыс.`;
  } else {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  }
  return String(n);
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-[15px] leading-none font-semibold text-cream tabular-nums">{value}</span>
      <span className="text-[11px] text-muted">{label}</span>
    </div>
  );
}

/**
 * Instagram-style profile header: avatar with the story ring, username, the
 * posts/followers/following row, a bio block and the primary actions, followed
 * by a tab bar and a square 3-up photo grid.
 */
export function InstagramProfile({
  profile,
  onReport,
  children,
}: {
  profile: Profile;
  onReport: () => void;
  /** reviews pane, rendered by the route so it can own the review form */
  children?: React.ReactNode;
}) {
  const { t, lang } = useI18n();
  const [tab, setTab] = useState<Tab>("grid");
  const fav = useAppStore((s) => !!s.favorites[profile.id]);
  const follow = useAppStore((s) => !!s.follows[profile.id]);
  const toggleFav = useAppStore((s) => s.toggleFav);
  const toggleFollow = useAppStore((s) => s.toggleFollow);
  const block = useAppStore((s) => s.block);
  const canInteract = useAppStore((s) => s.canInteract());
  const isGuest = useAppStore((s) => s.isGuest());
  const viewed = useAppStore((s) => s.viewedStoryIds);

  const tt = t as Record<string, string>;
  const cityLabel =
    CITY_LABEL[lang][profile.city as keyof (typeof CITY_LABEL)["en"]] ?? profile.city;
  const about = profile.about[lang] ?? profile.about.en;

  // Instagram only draws the ring for accounts that actually have stories.
  const stories = storiesByProfile(profile.id);
  const ringClass = useMemo(() => {
    if (stories.length === 0) return null;
    const allSeen = stories.every((s) => viewed[s.id]);
    return storyRingClass(allSeen ? "seen" : "new");
  }, [stories, viewed]);

  const tiles = profile.gallery.length ? profile.gallery : [profile.photo];
  const langLabels = profile.languages
    .map((l) => tt[`lang_${l}`] ?? l.toUpperCase())
    .join(" · ");

  return (
    <div className="pb-6">
      <header className="px-3 pt-3">
        <div className="flex items-start gap-5 sm:gap-8">
          <div className="shrink-0">
            <div
              className={cn(
                "grid place-items-center rounded-full p-[3px]",
                ringClass ?? "bg-line",
              )}
            >
              <div className="size-[84px] overflow-hidden rounded-full bg-elevated sm:size-[104px]">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="size-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="truncate text-[17px] leading-tight font-semibold text-cream sm:text-xl">
                {profile.username}
              </h1>
              {profile.verified ? (
                <span
                  title={tt.verified ?? "Verified"}
                  className="grid size-[18px] shrink-0 place-items-center rounded-full bg-accent text-[10px] text-black"
                >
                  ✓
                </span>
              ) : null}
              {profile.vip ? (
                <span className="rounded-full bg-vip/20 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-vip uppercase">
                  VIP
                </span>
              ) : null}
            </div>

            <div className="mt-1 flex items-center gap-2 text-xs text-muted">
              <RatingMark value={profile.rating} count={profile.ratingCount} />
              {ringClass ? (
                <span className="text-accent">· {tt.stories ?? "stories"}</span>
              ) : null}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <Button
                className="min-h-8 gap-1.5 px-4 text-xs"
                disabled={isGuest || !canInteract}
                onClick={() => toggleFollow(profile.id)}
              >
                <MessageCircle className="size-3.5" />
                {follow ? (tt.following ?? "Following") : (tt.message ?? "Message")}
              </Button>
              <Button
                variant={fav ? "primary" : "line"}
                className="min-h-8 gap-1.5 px-4 text-xs"
                disabled={isGuest || !canInteract}
                onClick={() => toggleFav(profile.id)}
              >
                <Heart className={cn("size-3.5", fav && "fill-current")} />
                {fav ? (tt.favorited ?? "Saved") : (tt.favorite ?? "Save")}
              </Button>
              <button
                type="button"
                aria-label={tt.share ?? "Share"}
                className="grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-elevated hover:text-cream"
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  toast.success(tt.shareToast ?? "Copied");
                }}
              >
                <Share2 className="size-4" />
              </button>
              <button
                type="button"
                aria-label={tt.report ?? "Report"}
                className="grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-elevated hover:text-cream"
                disabled={isGuest || !canInteract}
                onClick={onReport}
              >
                <Flag className="size-4" />
              </button>
              <button
                type="button"
                aria-label={tt.block ?? "Block"}
                className="grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-elevated hover:text-danger"
                disabled={isGuest || !canInteract}
                onClick={() => {
                  block(profile.id);
                  toast.success(tt.reportToast ?? "Done");
                }}
              >
                <Ban className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* bio */}
        <div className="mt-4 space-y-2">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-sm font-semibold text-cream">{profile.name}</span>
            <span className="text-xs text-muted">
              {cityLabel}
              {profile.district ? ` · ${profile.district}` : ""}
            </span>
          </div>

          {profile.params.length ? (
            <div className="flex flex-wrap gap-1.5">
              {profile.params.map((p) => (
                <span
                  key={p}
                  className="rounded-full bg-elevated px-2.5 py-1 text-[11px] text-cream/85"
                >
                  {tt[`param_${p}`] ?? p}
                </span>
              ))}
            </div>
          ) : null}

          <p className="max-w-prose text-[13px] leading-relaxed whitespace-pre-line text-cream/90">
            {about}
          </p>

          <p className="text-[11px] text-subtle">
            {tt.languages ?? "Languages"}: {langLabels}
            {profile.joined ? ` · ${tt.joinedSince ?? "since"} ${profile.joined.slice(0, 7)}` : ""}
          </p>

          {isGuest ? (
            <div className="w-full max-w-sm space-y-2 rounded-xl border border-accent/30 bg-elevated/50 p-3">
              <p className="text-xs text-cream">
                {tt.registerToUse ?? "Sign in to use the platform features."}
              </p>
              <Link to="/onboarding">
                <Button className="min-h-9 w-full text-xs">
                  {tt.signIn ?? "Sign in"}
                </Button>
              </Link>
            </div>
          ) : null}
        </div>

        {profile.contactPlaceholder ? (
          <div className="mt-3">
            <ContactCard phone={profile.contactPlaceholder} profileName={profile.name} />
          </div>
        ) : null}
      </header>

      {/* stats row, Instagram order: posts / followers / following */}
      <div className="mt-4 flex items-center justify-around border-y border-line px-3 py-3">
        <Stat value={String(tiles.length)} label={tt.posts ?? "posts"} />
        <Stat value={compact(profile.likes, lang)} label={tt.followers ?? "followers"} />
        <Stat value={String(profile.ratingCount || 0)} label={tt.following ?? "following"} />
      </div>

      {/* tab bar */}
      <div className="sticky top-0 z-10 flex border-b border-line bg-app/95 backdrop-blur">
        {(
          [
            ["grid", tt.gallery ?? "Photos"],
            ["reels", tt.navReels ?? "Reels"],
            ["reviews", tt.reviews ?? "Reviews"],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            type="button"
            onClick={() => setTab(k)}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 border-b-2 py-3 text-[11px] font-semibold tracking-wide uppercase transition-colors",
              tab === k
                ? "border-cream text-cream"
                : "border-transparent text-subtle hover:text-muted",
            )}
          >
            {k === "grid" ? <Star className="size-3.5" /> : null}
            {k === "reels" ? <PlayGlyph /> : null}
            {k === "reviews" ? <Heart className="size-3.5" /> : null}
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {tab === "grid" ? (
        <div className="grid grid-cols-3 gap-0.5 p-0.5">
          {tiles.map((src, i) => (
            <div key={`${src}-${i}`} className="relative aspect-square overflow-hidden bg-elevated">
              <img
                src={src}
                alt=""
                loading="lazy"
                className="size-full object-cover transition-transform duration-300 hover:scale-[1.04]"
              />
              {profile.rating >= 4.7 && i === 0 ? (
                <span className="absolute top-1.5 left-1.5 flex items-center gap-0.5 rounded-full bg-black/55 px-1.5 py-0.5 text-[10px] font-medium text-white">
                  <Star className="size-2.5 fill-current" />
                  {profile.rating.toFixed(1)}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      {tab === "reels" ? <ReelsPane profileId={profile.id} /> : null}
      {tab === "reviews" ? children : null}
    </div>
  );
}

function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function ReelsPane({ profileId }: { profileId: string }) {
  const { t, lang } = useI18n();
  const tt = t as Record<string, string>;
  const reels = reelsByProfile(profileId);
  if (reels.length === 0) {
    return (
      <div className="px-3 py-8 text-center text-sm text-muted">
        {tt.empty ?? "Nothing here yet"}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-3 gap-0.5 p-0.5">
      {reels.map((r) => (
        <div key={r.id} className="relative aspect-9/16 overflow-hidden bg-elevated">
          <img
            src={r.photo}
            alt={r.caption?.[lang] ?? ""}
            loading="lazy"
            className="size-full object-cover"
          />
          <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-1.5 text-[10px] text-white/90">
            {r.caption?.[lang] ?? ""}
          </span>
        </div>
      ))}
    </div>
  );
}
