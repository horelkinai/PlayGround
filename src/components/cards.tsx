import { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { BadgeRow, RatingMark } from "@/components/badges";
import { cn } from "@/lib/cn";
import { CITY_LABEL, NEW_IDS, profileById } from "@/lib/demo-data";
import { useI18n } from "@/lib/use-i18n";
import { useAppStore } from "@/lib/store";
import type { Post, Profile } from "@/lib/types";

export function ProfileCard({
  profile,
  variant = "card",
}: {
  profile: Profile;
  variant?: "card" | "grid" | "list";
}) {
  const { lang, t } = useI18n();
  const fav = useAppStore((s) => !!s.favorites[profile.id]);
  const toggleFav = useAppStore((s) => s.toggleFav);
  const city =
    CITY_LABEL[lang][profile.city as keyof (typeof CITY_LABEL)["en"]] ?? profile.city;

  if (variant === "list") {
    const masked = (() => {
      const digits = (profile.contactPlaceholder || "").replace(/\D/g, "");
      const last4 = digits.slice(-4);
      return last4 ? `+972 •• ••• ${last4}` : null;
    })();
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-3">
        <Link to="/profile/$id" params={{ id: profile.id }} className="shrink-0">
          <img
            src={profile.photo}
            alt=""
            className="size-16 rounded-xl object-cover"
          />
        </Link>
        <div className="min-w-0 flex-1">
          <Link to="/profile/$id" params={{ id: profile.id }} className="block min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="truncate font-semibold text-cream">{profile.name}</span>
              <BadgeRow lang={lang} verified={profile.verified} vip={profile.vip} top={profile.top} />
            </div>
            <p className="mt-0.5 truncate text-[13px] text-muted">
              {city}
              {profile.district ? ` · ${profile.district}` : ""} · {profile.age} {t.years} ·{" "}
              {profile.rating.toFixed(1)} ★
            </p>
            {masked && (
              <p className="mt-0.5 truncate font-mono text-[13px] tracking-wide text-green-400/90">
                {masked}
              </p>
            )}
          </Link>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <RatingMark value={profile.rating} />
          {profile.contactPlaceholder ? (
            <Link
              to="/profile/$id"
              params={{ id: profile.id }}
              aria-label="call"
              className="grid size-10 place-items-center rounded-full bg-green-500 text-black hover:bg-green-400"
            >
              <Phone className="size-4" />
            </Link>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <Link
      to="/profile/$id"
      params={{ id: profile.id }}
      className="relative block aspect-square overflow-hidden bg-elevated"
    >
      <img src={profile.photo} alt="" className="size-full object-cover" />
      {profile.verified && (
        <span className="absolute end-1.5 top-1.5 rounded-full bg-black/50 px-1.5 py-0.5 text-[10px] text-amber-300">
          ✓
        </span>
      )}
      {NEW_IDS.includes(profile.id) && (
        <span className="absolute start-1.5 top-1.5 rounded-full bg-accent px-1.5 py-0.5 text-[10px] uppercase text-white">
          new
        </span>
      )}
    </Link>
  );
}

export function PostCard({ post }: { post: Post }) {
  const { lang, t } = useI18n();
  const profile = profileById(post.profileId);
  const liked = useAppStore((s) => !!s.likes[post.id]);
  const saved = useAppStore((s) => !!s.savedPosts[post.id]);
  const toggleLike = useAppStore((s) => s.toggleLike);
  const toggleSaved = useAppStore((s) => s.toggleSaved);
  const [expanded, setExpanded] = useState(false);
  if (!profile) return null;
  const city =
    CITY_LABEL[lang][profile.city as keyof (typeof CITY_LABEL)["en"]] ?? profile.city;
  const caption = post.caption[lang];
  const short = caption.length > 90 ? `${caption.slice(0, 90)}…` : caption;
  const isNew = NEW_IDS.includes(profile.id);

  return (
    <article className="bg-bg">
      <div className="flex items-center gap-3 px-3 py-2.5">
        <Link
          to="/profile/$id"
          params={{ id: profile.id }}
          className="flex min-w-0 flex-1 items-center gap-3"
        >
          <img
            src={profile.photo}
            alt=""
            className="size-9 rounded-full object-cover ring-1 ring-line"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="truncate text-sm font-semibold text-cream">
                {profile.username || profile.name}
              </span>
              {profile.verified && <span className="text-[10px] text-amber-400">✓</span>}
              {isNew && (
                <span className="rounded-full bg-accent px-1.5 py-0.5 text-[9px] uppercase text-white">
                  {(t as Record<string, string>).newBadge || "New"}
                </span>
              )}
            </div>
            <p className="truncate text-[11px] text-muted">{city}</p>
          </div>
        </Link>
      </div>

      <img
        src={post.photos[0]}
        alt=""
        className="aspect-square w-full object-cover"
        onDoubleClick={() => toggleLike(post.id)}
      />

      <div className="flex items-center gap-1 px-2 pt-2">
        <button
          type="button"
          aria-label={t.like}
          onClick={() => toggleLike(post.id)}
          className="flex h-10 items-center gap-1.5 px-1"
        >
          <Heart
            className={cn("size-6", liked ? "fill-red-500 text-red-500" : "text-cream")}
            strokeWidth={1.75}
          />
          <span className="text-sm font-semibold">{post.likes + (liked ? 1 : 0)}</span>
        </button>
        <Link
          to="/profile/$id"
          params={{ id: profile.id }}
          aria-label={t.comment}
          className="flex h-10 items-center gap-1.5 px-1 text-cream"
        >
          <MessageCircle className="size-6" strokeWidth={1.75} />
          <span className="text-sm">{post.comments}</span>
        </Link>
        <button
          type="button"
          aria-label={t.share}
          className="grid size-10 place-items-center text-cream"
          onClick={() => {
            if (navigator.share) {
              void navigator.share({ title: profile.name, url: window.location.href });
            }
          }}
        >
          <Send className="size-6" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          aria-label={t.savePost}
          onClick={() => toggleSaved(post.id)}
          className="ms-auto grid size-10 place-items-center text-cream"
        >
          <Bookmark className={cn("size-6", saved && "fill-cream")} strokeWidth={1.75} />
        </button>
      </div>

      <div className="space-y-1 px-3 pb-3 pt-1">
        <p className="text-sm text-fg">
          <Link
            to="/profile/$id"
            params={{ id: profile.id }}
            className="font-semibold text-cream"
          >
            {profile.username || profile.name}
          </Link>{" "}
          <span className="text-fg/90">{expanded ? caption : short}</span>
          {caption.length > 90 && (
            <button
              type="button"
              className="ms-1 text-muted"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? (t as Record<string, string>).less || "less" : t.loadMore}
            </button>
          )}
        </p>
      </div>
    </article>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-sm tracking-[0.2em] text-muted uppercase">{children}</h2>
  );
}
