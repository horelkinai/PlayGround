import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/cn";
import type { Lang, StoryItem, StoryRailEntry, StoryUserStatus } from "@/lib/types";
import {
  FALLBACK_DURATION_MS,
  firstUnseenIndex,
  isOpenable,
  nextUnseenAuthor,
  storyBackdropStyle,
  storyDuration,
  storyRingClass,
  storyStatusText,
  type StoryStrings,
  type ViewedStories,
} from "@/lib/stories";

/* ------------------------------------------------------------------ *
 * Geometry contract (audit P0-1)
 *
 * Ring 66px -> 2px padding -> 62px inner -> 2px border -> 58px photo.
 * Every box is an explicit integer size, `shrink-0` and `aspect-square`,
 * and the photo is `block` so no inline baseline gap inflates the tile.
 * Measured result: ring 66x66, photo 58x58, no flex squeeze.
 * ------------------------------------------------------------------ */
const RING_PX = 66;

function RingBox({ status, children }: { status: StoryUserStatus; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full p-[2px] aspect-square",
        RING_PX === 66 ? "size-[66px]" : undefined,
        storyRingClass(status),
      )}
    >
      <div className="size-full shrink-0 overflow-hidden rounded-full border-2 border-bg">
        {children}
      </div>
    </div>
  );
}

function PersonGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-3 fill-current">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6z" />
    </svg>
  );
}

function PlusGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 stroke-current stroke-2">
      <path d="M12 5v14M5 12h14" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export interface StoryAvatarProps {
  entry: StoryRailEntry;
  strings: StoryStrings;
  onOpen: (userId: string, trigger: HTMLElement) => void;
}

/**
 * One rail tile. The story itself is a button; the profile stays reachable
 * through a separate, explicit control so the two intents never collide.
 */
export function StoryAvatar({ entry, strings, onOpen }: StoryAvatarProps) {
  const openable = isOpenable(entry.status);
  const statusText = storyStatusText(entry.status, strings, entry.unseenCount);
  const label = entry.isSelf ? strings.storyStateOwn : entry.label;

  return (
    // `relative` matters: the sr-only status text is absolutely positioned, and
    // without a positioned ancestor its box extends the root scroll area,
    // which shows up as phantom horizontal overflow on narrow viewports.
    <div
      className="relative flex w-[70px] shrink-0 flex-col items-center gap-1"
      data-story-tile={entry.userId}
      data-story-status={entry.status}
    >
      <div className="relative shrink-0">
        <button
          type="button"
          data-story-avatar={entry.userId}
          disabled={!openable}
          aria-label={`${label} — ${statusText}`}
          onClick={(e) => {
            if (!openable) return;
            onOpen(entry.userId, e.currentTarget);
          }}
          className={cn(
            "block shrink-0 rounded-full",
            openable ? "hover:opacity-90" : "cursor-default",
          )}
        >
          <RingBox status={entry.status}>
            {entry.photo ? (
              <img
                src={entry.photo}
                alt=""
                draggable={false}
                className="block size-[58px] shrink-0 rounded-full object-cover"
              />
            ) : (
              <span
                className={cn(
                  "grid size-full shrink-0 place-items-center rounded-full",
                  "bg-surface text-muted",
                )}
              >
                <PlusGlyph />
              </span>
            )}
          </RingBox>
        </button>

        {entry.profileHref ? (
          <Link
            to={entry.profileHref}
            data-story-profile={entry.userId}
            aria-label={`${strings.storyViewProfile}: ${entry.label}`}
            className="absolute -end-0.5 -bottom-0.5 grid size-[22px] place-items-center rounded-full border border-bg bg-elevated text-cream transition-colors hover:bg-accent hover:text-accent-fg"
          >
            <PersonGlyph />
          </Link>
        ) : null}
      </div>

      <span
        className={cn(
          "w-full truncate text-center text-[11px]",
          openable ? "text-cream" : "text-subtle",
        )}
      >
        {label}
      </span>
      <span className="sr-only">{statusText}</span>
    </div>
  );
}

export interface StoryRailProps {
  entries: StoryRailEntry[];
  strings: StoryStrings;
  onOpen: (userId: string, trigger: HTMLElement) => void;
  className?: string;
}

export function StoryRail({ entries, strings, onOpen, className }: StoryRailProps) {
  return (
    <section
      className={cn("border-b border-line px-3 py-3", className)}
      aria-label={strings.storyStateNew}
    >
      <div
        data-story-rail
        className="no-scrollbar flex gap-3 overflow-x-auto pb-1"
      >
        {entries.map((entry) => (
          <StoryAvatar
            key={entry.userId}
            entry={entry}
            strings={strings}
            onOpen={onOpen}
          />
        ))}
      </div>
    </section>
  );
}

export function StoryProgress({
  count,
  index,
  progress,
  label,
}: {
  count: number;
  index: number;
  progress: number;
  label: string;
}) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={1}
      aria-valuemax={Math.max(count, 1)}
      aria-valuenow={index + 1}
      className="flex shrink-0 gap-1"
    >
      {Array.from({ length: count }).map((_, i) => {
        const fill = i < index ? 1 : i === index ? progress : 0;
        return (
          <div key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/35">
            <div
              className="h-full w-full origin-left rounded-full bg-white"
              style={{ transform: `scaleX(${fill})` }}
            />
          </div>
        );
      })}
    </div>
  );
}

export interface StoryViewerProps {
  open: boolean;
  entries: StoryRailEntry[];
  startUserId: string;
  startIndex: number;
  lang: Lang;
  strings: StoryStrings & {
    storyClose: string;
    storyPaused: string;
    storyProgressLabel: string;
    storyPrevLabel: string;
    storyNextLabel: string;
  };
  viewed: ViewedStories | undefined;
  onViewed: (storyId: string) => void;
  onClose: () => void;
}

export function StoryViewer({
  open,
  entries,
  startUserId,
  startIndex,
  lang,
  strings,
  viewed,
  onViewed,
  onClose,
}: StoryViewerProps) {
  const startUserRef = useRef(startUserId);
  const startIndexRef = useRef(startIndex);
  startUserRef.current = open ? startUserId : startUserRef.current;
  startIndexRef.current = open ? startIndex : startIndexRef.current;

  const [userId, setUserId] = useState<string | null>(null);
  const [storyIndex, setStoryIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const startedAtRef = useRef(0);
  const elapsedRef = useRef(0);
  const heldRef = useRef(false);

  useEffect(() => setMounted(true), []);

  const userIndex = useMemo(
    () => entries.findIndex((e) => e.userId === userId),
    [entries, userId],
  );
  const entry = userIndex >= 0 ? entries[userIndex] : undefined;
  const stories = entry?.stories ?? [];
  const story: StoryItem | undefined = stories[storyIndex];
  const duration = story ? storyDuration(story) : FALLBACK_DURATION_MS;

  /* seed position whenever the viewer opens */
  useEffect(() => {
    if (!open) return;
    setUserId(startUserRef.current);
    setStoryIndex(startIndexRef.current);
    setPaused(false);
    setProgress(0);
    elapsedRef.current = 0;
    restoreRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    // Focus the dialog itself, not the close button: Space on a focused button
    // fires its click, which would close the viewer instead of pausing it.
    const id = window.requestAnimationFrame(() => dialogRef.current?.focus());
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  /* restore focus to whatever opened the viewer */
  useEffect(() => {
    if (open) return;
    const el = restoreRef.current;
    if (el && document.contains(el)) {
      el.focus({ preventScroll: true });
    }
    restoreRef.current = null;
  }, [open]);

  /* lock background scroll while open */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /* pause while the tab is hidden */
  useEffect(() => {
    if (!open) return;
    const onVisibility = () => {
      if (document.visibilityState === "hidden") setPaused(true);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [open]);

  /* mark the current story as seen */
  const storyId = story?.id;
  useEffect(() => {
    if (!open || !storyId) return;
    onViewed(storyId);
  }, [open, storyId, onViewed]);

  const close = useCallback(() => {
    setPaused(false);
    onClose();
  }, [onClose]);

  const goTo = useCallback(
    (nextUserId: string, nextStoryIndex: number) => {
      elapsedRef.current = 0;
      setProgress(0);
      setPaused(false);
      setUserId(nextUserId);
      setStoryIndex(nextStoryIndex);
    },
    [],
  );

  const goNext = useCallback(() => {
    if (!entry) return;
    if (storyIndex < stories.length - 1) {
      goTo(entry.userId, storyIndex + 1);
      return;
    }
    const next = nextUnseenAuthor(entries, entry.userId, viewed);
    if (!next) {
      close();
      return;
    }
    goTo(next.userId, firstUnseenIndex(next.stories, viewed));
  }, [entry, storyIndex, stories.length, entries, viewed, goTo, close]);

  const goPrev = useCallback(() => {
    if (!entry) return;
    if (storyIndex > 0) {
      goTo(entry.userId, storyIndex - 1);
      return;
    }
    if (entries.length < 2) return;
    const prevUserIndex = (userIndex - 1 + entries.length) % entries.length;
    const prevEntry = entries[prevUserIndex];
    if (prevEntry.stories.length === 0) return;
    goTo(prevEntry.userId, prevEntry.stories.length - 1);
  }, [entry, storyIndex, entries, userIndex, goTo]);

  const goNextRef = useRef(goNext);
  goNextRef.current = goNext;

  /* the timer itself.
     `goTo`/the seed effect zero `elapsedRef` synchronously in the same commit
     that changes the story, so this can never start from a stale elapsed time
     of the previous story. Do not add a "reset the clock on story change"
     effect to pair with this one: it would run *after* this one and re-zero
     the progress that was already being reported. */
  useEffect(() => {
    if (!open || paused || !storyId) return;
    startedAtRef.current = performance.now() - elapsedRef.current;
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = Math.max(0, now - startedAtRef.current);
      elapsedRef.current = elapsed;
      if (elapsed >= duration) {
        setProgress(1);
        goNextRef.current();
        return;
      }
      setProgress(elapsed / duration);
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [open, paused, storyId, duration]);

  /* Escape and Space are handled on the document so they still work if focus
     drifts out of the dialog while autoplay advances between authors. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === " " || e.key === "Spacebar") {
        const target = e.target as HTMLElement | null;
        if (target && target.closest("input, textarea, [contenteditable]")) return;
        e.preventDefault();
        setPaused((p) => !p);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("[data-story-control]")) return;
    heldRef.current = true;
    setPaused(true);
  };

  const releasePointer = () => {
    if (!heldRef.current) return;
    heldRef.current = false;
    setPaused((p) => (p ? false : p));
  };

  if (!open || !mounted || !entry || !story) return null;

  const caption = story.caption[lang] ?? story.caption.en;

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${entry.label} — ${strings.storyProgressLabel}`}
      data-story-viewer
      tabIndex={-1}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-0 sm:p-6"
    >
      <div
        data-story-stage
        onPointerDown={onPointerDown}
        onPointerUp={releasePointer}
        onPointerCancel={releasePointer}
        className="relative flex h-full w-full max-w-[440px] select-none flex-col overflow-hidden bg-black sm:h-[min(90vh,880px)] sm:rounded-2xl"
      >
        <div
          className="absolute inset-0"
          style={storyBackdropStyle(story)}
          aria-hidden="true"
        />
        {story.mediaType === "image" && story.mediaUrl ? (
          <img
            key={story.id}
            src={story.mediaUrl}
            alt=""
            draggable={false}
            className="absolute inset-0 size-full object-cover"
          />
        ) : null}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/70"
          aria-hidden="true"
        />

        <div className="pointer-events-none relative z-30 flex flex-col gap-2 p-3">
          <StoryProgress
            count={stories.length}
            index={storyIndex}
            progress={progress}
            label={strings.storyProgressLabel}
          />
          <div className="flex items-center gap-2">
            {entry.photo ? (
              <img
                src={entry.photo}
                alt=""
                className="size-8 shrink-0 rounded-full object-cover"
              />
            ) : null}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">{entry.label}</p>
              <p className="truncate text-[11px] text-white/70">
                {paused ? strings.storyPaused : story.caption[lang] ?? story.caption.en}
              </p>
            </div>
            <button
              type="button"
              data-story-control
              data-story-close
              aria-label={strings.storyClose}
              onClick={close}
              className="pointer-events-auto grid size-9 shrink-0 place-items-center rounded-full bg-white/12 text-white transition-colors hover:bg-white/25"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 stroke-current stroke-2">
                <path d="M6 6l12 12M18 6L6 18" fill="none" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="pointer-events-none relative z-30 mt-auto p-4">
          <p data-story-caption className="text-center text-sm text-white/90">
            {caption}
          </p>
        </div>

        <button
          type="button"
          data-story-control
          data-story-tap="prev"
          aria-label={strings.storyPrevLabel}
          onClick={goPrev}
          className="absolute inset-y-0 left-0 z-20 w-1/3 cursor-w-resize bg-transparent"
          tabIndex={-1}
        />
        <button
          type="button"
          data-story-control
          data-story-tap="next"
          aria-label={strings.storyNextLabel}
          onClick={goNext}
          className="absolute inset-y-0 right-0 z-20 w-1/3 cursor-e-resize bg-transparent"
          tabIndex={-1}
        />
      </div>
    </div>,
    document.body,
  );
}
