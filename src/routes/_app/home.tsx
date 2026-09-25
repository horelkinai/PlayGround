import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import { PostCard } from "@/components/cards";
import { StoryRail, StoryViewer } from "@/components/stories";
import { POSTS, PROFILES, storiesByProfile } from "@/lib/demo-data";
import { useI18n } from "@/lib/use-i18n";
import { useAppStore } from "@/lib/store";
import { buildStoryRail, firstUnseenIndex, type StoryStrings } from "@/lib/stories";

export const Route = createFileRoute("/_app/home")({
  component: HomePage,
});

function HomePage() {
  const { t, lang } = useI18n();
  const blocked = useAppStore((s) => s.blocked);
  const follows = useAppStore((s) => s.follows);
  const viewedStoryIds = useAppStore((s) => s.viewedStoryIds);
  const clientPhoto = useAppStore((s) => s.clientPhoto);
  const markStoryViewed = useAppStore((s) => s.markStoryViewed);

  const [viewer, setViewer] = useState<{ userId: string; index: number } | null>(null);

  const visible = PROFILES.filter((p) => {
    if (blocked.includes(p.id)) return false;
    if (p.gender !== "women") return false;
    return true;
  });

  const feedPosts = POSTS.filter((post) => visible.some((p) => p.id === post.profileId)).slice(
    0,
    12,
  );

  const storyStrings = useMemo<StoryStrings>(
    () => ({
      storyStateNew: t.storyStateNew,
      storyStateSeen: t.storyStateSeen,
      storyStateEmpty: t.storyStateEmpty,
      storyStateOwn: t.storyStateOwn,
      storiesNewCount: t.storiesNewCount,
      storyOpenLabel: t.storyOpenLabel,
      storyViewProfile: t.storyViewProfile,
    }),
    [t],
  );

  const openViewer = useCallback(
    (userId: string) => {
      setViewer({ userId, index: firstUnseenIndex(storiesByProfile(userId), viewedStoryIds) });
    },
    [viewedStoryIds],
  );

  const railEntries = useMemo(
    () => buildStoryRail({ profiles: visible, viewed: viewedStoryIds, follows, selfPhoto: clientPhoto || undefined, t: storyStrings }),
    [visible, viewedStoryIds, follows, clientPhoto, storyStrings],
  );

  return (
    <div className="space-y-0">
      <StoryRail
        entries={railEntries}
        strings={storyStrings}
        onOpen={openViewer}
      />

      {/* Solo bridge: feed -> catalog with numbers */}
      <div className="px-3 py-3">
        <Link
          to="/directory"
          className="flex items-center justify-between gap-3 rounded-2xl border border-green-500/25 bg-gradient-to-r from-green-500/15 via-surface to-surface px-4 py-3"
        >
          <div>
            <p className="text-sm font-semibold text-cream">
              {lang === "ru"
                ? "Каталог с номерами"
                : lang === "he"
                  ? "מדריך עם מספרים"
                  : "Directory with numbers"}
            </p>
            <p className="mt-0.5 text-xs text-muted">
              {visible.length}{" "}
              {lang === "ru" ? "анкет · звонок в 1 тап" : "profiles · 1-tap call"}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-green-500 px-4 py-2 text-xs font-semibold text-black">
            {lang === "ru" ? "Открыть" : "Open"}
          </span>
        </Link>
      </div>

      {/* Feed — posts only */}
      <section className="divide-y divide-line">
        {feedPosts.length === 0 ? (
          <p className="px-4 py-12 text-center text-sm text-muted">{t.feed}</p>
        ) : (
          feedPosts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </section>

      <StoryViewer
        open={viewer !== null}
        entries={railEntries}
        startUserId={viewer?.userId ?? railEntries[0]?.userId ?? "me"}
        startIndex={viewer?.index ?? 0}
        lang={lang}
        strings={{
          ...storyStrings,
          storyClose: t.storyClose,
          storyPaused: t.storyPaused,
          storyProgressLabel: t.storyProgressLabel,
          storyPrevLabel: t.storyPrevLabel,
          storyNextLabel: t.storyNextLabel,
        }}
        viewed={viewedStoryIds}
        onViewed={markStoryViewed}
        onClose={() => setViewer(null)}
      />
    </div>
  );
}
