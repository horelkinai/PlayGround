import type { CSSProperties } from "react";
import type {
  Lang,
  Profile,
  StoryItem,
  StoryRailEntry,
  StoryUserStatus,
} from "./types.ts";
// Explicit .ts specifiers keep this module directly loadable by the
// node --experimental-strip-types test runner, which does not resolve
// extensionless ESM imports.
import { STORY_SELF_ID, storiesByProfile } from "./demo-data.ts";

/** Fallback on-screen time when a story declares no durationMs. */
export const FALLBACK_DURATION_MS = 5000;

/** storyId -> ISO timestamp of the last view. */
export type ViewedStories = Record<string, string>;

export function storyDuration(story: StoryItem): number {
  const ms = story.durationMs;
  return typeof ms === "number" && Number.isFinite(ms) && ms > 0 ? ms : FALLBACK_DURATION_MS;
}

export function isStoryViewed(
  viewed: ViewedStories | undefined,
  storyId: string,
): boolean {
  return Boolean(viewed && viewed[storyId]);
}

export function unseenStoryCount(
  stories: StoryItem[],
  viewed: ViewedStories | undefined,
): number {
  return stories.reduce((n, s) => n + (isStoryViewed(viewed, s.id) ? 0 : 1), 0);
}

/**
 * Ring state for one author. Depends only on stories + viewed state — profile
 * verification/approval is deliberately not an input.
 */
export function storyUserStatus(
  userId: string,
  stories: StoryItem[],
  viewed: ViewedStories | undefined,
  selfId: string = STORY_SELF_ID,
): StoryUserStatus {
  if (userId === selfId) return "own";
  if (stories.length === 0) return "empty";
  return unseenStoryCount(stories, viewed) > 0 ? "new" : "seen";
}

export function isOpenable(status: StoryUserStatus): boolean {
  return status === "own" || status === "new" || status === "seen";
}

/** Tailwind classes per ring state. */
export function storyRingClass(status: StoryUserStatus): string {
  switch (status) {
    case "new":
      return "bg-gradient-to-tr from-amber-400 via-accent to-pink-500";
    case "own":
      return "bg-gradient-to-tr from-cream/70 via-muted/50 to-line";
    case "seen":
      return "bg-line";
    case "empty":
      return "bg-transparent";
  }
}

const STATUS_KEY: Record<StoryUserStatus, keyof StoryStrings> = {
  new: "storyStateNew",
  seen: "storyStateSeen",
  empty: "storyStateEmpty",
  own: "storyStateOwn",
};

export interface StoryStrings {
  storyStateNew: string;
  storyStateSeen: string;
  storyStateEmpty: string;
  storyStateOwn: string;
  storiesNewCount: string;
  storyOpenLabel: string;
  storyViewProfile: string;
}

/**
 * Accessible text for a rail tile. Status is never carried by colour alone:
 * the returned phrase is rendered both in the aria-label and as screen-reader
 * text under the avatar.
 */
export function storyStatusText(
  status: StoryUserStatus,
  strings: StoryStrings,
  unseen: number,
): string {
  const state = strings[STATUS_KEY[status]];
  if (status === "new" && unseen > 0) {
    return strings.storiesNewCount.replace("{n}", String(unseen));
  }
  return state;
}

export interface BuildRailOptions {
  /** Profiles already filtered for the rail (blocked/hidden removed). */
  profiles: Profile[];
  viewed: ViewedStories | undefined;
  follows?: Record<string, boolean>;
  selfId?: string;
  selfLabel?: string;
  selfPhoto?: string;
  t: StoryStrings;
  max?: number;
}

/**
 * Ordered rail entries: your own story first, then authors, then profiles
 * without any story so the empty state is still represented.
 * Order of authors: followed, then anyone with unseen stories, then the rest.
 */
export function buildStoryRail(options: BuildRailOptions): StoryRailEntry[] {
  const {
    profiles,
    viewed,
    follows = {},
    selfId = STORY_SELF_ID,
    selfLabel,
    selfPhoto,
    t,
    max = 14,
  } = options;

  const selfStories = storiesByProfile(selfId);
  const entries: StoryRailEntry[] = [];

  if (selfStories.length > 0) {
    entries.push({
      userId: selfId,
      status: "own",
      stories: selfStories,
      unseenCount: unseenStoryCount(selfStories, viewed),
      label: selfLabel ?? t.storyStateOwn,
      isSelf: true,
      photo: selfPhoto,
    });
  }

  const build = (p: Profile): StoryRailEntry => {    const stories = storiesByProfile(p.id);
    const status = storyUserStatus(p.id, stories, viewed, selfId);
    return {
      userId: p.id,
      status,
      stories,
      unseenCount: unseenStoryCount(stories, viewed),
      label: p.username || p.name,
      profileHref: `/profile/${p.id}`,
      photo: p.photo,
      isSelf: false,
    };
  };

  const followed: Profile[] = [];
  const withUnseen: Profile[] = [];
  const rest: Profile[] = [];
  for (const p of profiles) {
    const stories = storiesByProfile(p.id);
    if (follows[p.id]) followed.push(p);
    else if (unseenStoryCount(stories, viewed) > 0) withUnseen.push(p);
    else rest.push(p);
  }

  for (const p of [...followed, ...withUnseen, ...rest]) {
    if (entries.length >= max) break;
    entries.push(build(p));
  }

  return entries;
}

/**
 * Next author to show after the last story of `currentUserId`, preferring
 * authors with unseen stories and staying in rail order. Returns null when
 * there is nobody left to advance to. Your own story is never an advance
 * target — the viewer does not jump back to yourself at the end of the rail.
 */
export function nextUnseenAuthor(
  entries: StoryRailEntry[],
  currentUserId: string,
  viewed: ViewedStories | undefined,
): StoryRailEntry | null {
  const idx = entries.findIndex((e) => e.userId === currentUserId);
  if (idx === -1) return null;
  const candidates = [...entries.slice(idx + 1), ...entries.slice(0, idx)].filter(
    (e) => !e.isSelf && e.stories.length > 0,
  );
  return (
    candidates.find((e) => unseenStoryCount(e.stories, viewed) > 0) ?? candidates[0] ?? null
  );
}

/** First unseen story index of an author, so opening jumps to fresh content. */
export function firstUnseenIndex(
  stories: StoryItem[],
  viewed: ViewedStories | undefined,
): number {
  const i = stories.findIndex((s) => !isStoryViewed(viewed, s.id));
  return i === -1 ? 0 : i;
}

export function storyBackdropClass(story: StoryItem): string {
  if (story.mediaType === "gradient" && story.demoGradient) return "";
  return "bg-elevated";
}

export function storyBackdropStyle(story: StoryItem): CSSProperties | undefined {
  if (story.mediaType === "gradient" && story.demoGradient) {
    return { background: story.demoGradient };
  }
  return undefined;
}

export function describeStoryMedia(story: StoryItem, lang: Lang): string {
  return story.caption[lang] ?? story.caption.en;
}
