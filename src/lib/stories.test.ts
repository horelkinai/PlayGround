import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  FALLBACK_DURATION_MS,
  buildStoryRail,
  firstUnseenIndex,
  isOpenable,
  isStoryViewed,
  nextUnseenAuthor,
  storyDuration,
  storyRingClass,
  storyStatusText,
  storyUserStatus,
  unseenStoryCount,
  type StoryStrings,
  type ViewedStories,
} from "./stories.ts";
import { DEMO_VIEWED_STORY_IDS, STORIES, storiesByProfile } from "./demo-data.ts";
import type { Profile, StoryItem } from "./types.ts";

const T: StoryStrings = {
  storyStateNew: "New stories",
  storyStateSeen: "All stories viewed",
  storyStateEmpty: "No stories",
  storyStateOwn: "Your story",
  storiesNewCount: "{n} new",
  storyOpenLabel: "Open story",
  storyViewProfile: "Open profile",
};

function fakeStory(id: string, authorId: string, durationMs?: number): StoryItem {
  return {
    id,
    authorId,
    mediaType: "gradient",
    demoGradient: "linear-gradient(0deg, #000, #fff)",
    caption: { en: id, ru: id, he: id, ar: id },
    createdAt: "2026-09-25T00:00:00.000Z",
    ...(durationMs === undefined ? {} : { durationMs }),
  };
}

function fakeProfile(id: string): Profile {
  return {
    id,
    username: id,
    name: id,
    gender: "women",
    city: "Tel Aviv",
    age: 28,
    height: 168,
    weight: 58,
    languages: ["ru"],
    verified: false,
    vip: false,
    top: false,
    rating: 4.5,
    ratingCount: 3,
    likes: 1,
    views: 1,
    favoriteCount: 0,
    status: "active",
    joined: "2026-01-01",
    photo: `/portraits/${id}.jpg`,
    gallery: [],
    about: { en: "", ru: "", he: "", ar: "" },
    params: [],
  };
}

describe("storyDuration", () => {
  it("uses the declared duration", () => {
    assert.equal(storyDuration(fakeStory("a", "u", 7000)), 7000);
  });

  it("falls back to 5000ms when durationMs is absent", () => {
    assert.equal(storyDuration(fakeStory("a", "u")), FALLBACK_DURATION_MS);
  });

  it("falls back for non-positive or non-finite durations", () => {
    assert.equal(storyDuration(fakeStory("a", "u", 0)), FALLBACK_DURATION_MS);
    assert.equal(storyDuration(fakeStory("a", "u", -5)), FALLBACK_DURATION_MS);
    assert.equal(
      storyDuration(fakeStory("a", "u", Number.NaN)),
      FALLBACK_DURATION_MS,
    );
  });
});

describe("viewed state", () => {
  const viewed: ViewedStories = { s1: "2026-09-25T00:00:00.000Z" };

  it("isStoryViewed tolerates a missing map", () => {
    assert.equal(isStoryViewed(undefined, "s1"), false);
  });

  it("isStoryViewed reports stored ids", () => {
    assert.equal(isStoryViewed(viewed, "s1"), true);
    assert.equal(isStoryViewed(viewed, "s2"), false);
  });

  it("unseenStoryCount counts only unviewed stories", () => {
    const stories = [fakeStory("s1", "u"), fakeStory("s2", "u"), fakeStory("s3", "u")];
    assert.equal(unseenStoryCount(stories, viewed), 2);
    assert.equal(unseenStoryCount(stories, {}), 3);
  });
});

describe("storyUserStatus", () => {
  it("new when at least one story is unseen", () => {
    const stories = [fakeStory("s1", "u"), fakeStory("s2", "u")];
    assert.equal(storyUserStatus("u", stories, { s1: "x" }), "new");
  });

  it("seen when stories exist but all are viewed", () => {
    const stories = [fakeStory("s1", "u"), fakeStory("s2", "u")];
    assert.equal(storyUserStatus("u", stories, { s1: "x", s2: "x" }), "seen");
  });

  it("empty when there are no stories", () => {
    assert.equal(storyUserStatus("u", [], {}), "empty");
  });

  it("own wins over every other state for the current user", () => {
    assert.equal(storyUserStatus("me", [], {}, "me"), "own");
    assert.equal(storyUserStatus("me", [fakeStory("s1", "me")], {}, "me"), "own");
  });

  it("does not depend on profile verification", () => {
    const stories = [fakeStory("s1", "u")];
    // `u` may be verified or not; the ring must not care.
    const verified = { ...fakeProfile("u"), verified: true };
    assert.equal(storyUserStatus(verified.id, stories, {}), "new");
    assert.equal(storyUserStatus(verified.id, stories, { s1: "x" }), "seen");
  });
});

describe("isOpenable", () => {
  it("opens for own/new/seen and never for empty", () => {
    assert.equal(isOpenable("own"), true);
    assert.equal(isOpenable("new"), true);
    assert.equal(isOpenable("seen"), true);
    assert.equal(isOpenable("empty"), false);
  });
});

describe("storyRingClass", () => {
  it("gives a gradient only to new, neutral to seen, none to empty", () => {
    assert.match(storyRingClass("new"), /gradient/);
    assert.equal(storyRingClass("seen"), "bg-line");
    assert.equal(storyRingClass("empty"), "bg-transparent");
    assert.match(storyRingClass("own"), /gradient/);
  });
});

describe("storyStatusText", () => {
  it("includes the unseen count so colour is never the only signal", () => {
    assert.equal(storyStatusText("new", T, 3), "3 new");
  });

  it("names the state for every status", () => {
    assert.equal(storyStatusText("seen", T, 0), T.storyStateSeen);
    assert.equal(storyStatusText("empty", T, 0), T.storyStateEmpty);
    assert.equal(storyStatusText("own", T, 2), T.storyStateOwn);
  });
});

describe("firstUnseenIndex", () => {
  it("jumps to the first unseen story", () => {
    const stories = [fakeStory("s1", "u"), fakeStory("s2", "u"), fakeStory("s3", "u")];
    assert.equal(firstUnseenIndex(stories, { s1: "x" }), 1);
  });

  it("falls back to 0 when everything is viewed", () => {
    const stories = [fakeStory("s1", "u")];
    assert.equal(firstUnseenIndex(stories, { s1: "x" }), 0);
  });
});

describe("buildStoryRail", () => {
  it("puts your own story first", () => {
    const entries = buildStoryRail({
      profiles: [fakeProfile("ana")],
      viewed: {},
      t: T,
      selfLabel: "You",
    });
    assert.equal(entries[0].userId, "me");
    assert.equal(entries[0].status, "own");
  });

  it("labels your own tile and marks it self", () => {
    const entries = buildStoryRail({
      profiles: [fakeProfile("ana")],
      viewed: {},
      t: T,
      selfLabel: "Me",
    });
    const self = entries[0];
    assert.equal(self.isSelf, true);
    assert.equal(self.label, "Me");
    assert.equal(self.profileHref, undefined, "own tile has no profile link");
  });

  it("keeps authors with no stories, flagged empty", () => {
    const entries = buildStoryRail({
      profiles: [fakeProfile("ana")],
      viewed: {},
      t: T,
    });
    const ana = entries.find((e) => e.userId === "ana");
    assert.ok(ana);
    assert.equal(ana.status, "empty");
    assert.equal(ana.unseenCount, 0);
    assert.equal(isOpenable(ana.status), false);
  });

  it("exposes a separate profile href so the story button is not the profile link", () => {
    const entries = buildStoryRail({
      profiles: [fakeProfile("lina")],
      viewed: {},
      t: T,
    });
    const lina = entries.find((e) => e.userId === "lina");
    assert.equal(lina?.profileHref, "/profile/lina");
  });

  it("orders followed authors before authors with unseen stories", () => {
    const entries = buildStoryRail({
      profiles: [fakeProfile("lina"), fakeProfile("noa")],
      viewed: {},
      follows: { lina: true },
      t: T,
    });
    const authors = entries.filter((e) => !e.isSelf).map((e) => e.userId);
    assert.ok(authors.indexOf("lina") < authors.indexOf("noa"));
  });

  it("honours max", () => {
    const profiles = ["a", "b", "c", "d", "e"].map(fakeProfile);
    const entries = buildStoryRail({ profiles, viewed: {}, t: T, max: 3 });
    assert.equal(entries.length, 3);
  });
});

describe("nextUnseenAuthor", () => {
  it("advances to the next author with unseen stories", () => {
    const entries = buildStoryRail({
      profiles: [fakeProfile("lina"), fakeProfile("noa"), fakeProfile("maya")],
      viewed: {},
      t: T,
    });
    // lina: 3 stories unseen, noa: 1, maya: fully pre-viewed
    const next = nextUnseenAuthor(entries, "lina", { "s-maya-1": "x" });
    assert.equal(next?.userId, "noa");
  });

  it("returns null when there is nobody left", () => {
    const entries = buildStoryRail({ profiles: [fakeProfile("maya")], viewed: {}, t: T });
    assert.equal(nextUnseenAuthor(entries, "maya", { "s-maya-1": "x" }), null);
  });

  it("skips authors with no stories", () => {
    const entries = buildStoryRail({
      profiles: [fakeProfile("sofia"), fakeProfile("lina")],
      viewed: {},
      t: T,
    });
    const next = nextUnseenAuthor(entries, "sofia", {});
    assert.equal(next?.userId, "lina");
  });

  it("returns null for an unknown author", () => {
    const entries = buildStoryRail({ profiles: [fakeProfile("lina")], viewed: {}, t: T });
    assert.equal(nextUnseenAuthor(entries, "nobody", {}), null);
  });
});

describe("demo fixture", () => {
  it("has unique story ids", () => {
    const ids = STORIES.map((s) => s.id);
    assert.equal(new Set(ids).size, ids.length);
  });

  it("covers single, multiple, pre-viewed, empty and self cases", () => {
    const byAuthor = new Map<string, number>();
    for (const s of STORIES) byAuthor.set(s.authorId, (byAuthor.get(s.authorId) ?? 0) + 1);
    assert.ok([...byAuthor.values()].some((n) => n === 1), "expected a single-story author");
    assert.ok([...byAuthor.values()].some((n) => n > 1), "expected a multi-story author");
    assert.ok(byAuthor.has("me"), "expected the current user to have a story");

    // at least one author fully pre-viewed, and at least one fully unseen
    const allSeen: string[] = [];
    const allUnseen: string[] = [];
    for (const [author, count] of byAuthor) {
      const stories = storiesByProfile(author);
      const seen = stories.filter((s) => DEMO_VIEWED_STORY_IDS.includes(s.id)).length;
      if (seen === count) allSeen.push(author);
      if (seen === 0) allUnseen.push(author);
    }
    assert.ok(allSeen.length >= 2, `expected fully-viewed authors, got ${allSeen}`);
    assert.ok(allUnseen.length >= 2, `expected fully-unseen authors, got ${allUnseen}`);
  });

  it("uses only local media paths or gradients", () => {
    for (const s of STORIES) {
      if (s.mediaType === "image") {
        assert.ok(s.mediaUrl, `${s.id} is an image story without mediaUrl`);
        assert.ok(
          s.mediaUrl.startsWith("/") && !/^https?:/i.test(s.mediaUrl),
          `${s.id} must not reference a remote host`,
        );
      } else {
        assert.ok(s.demoGradient, `${s.id} is a gradient story without demoGradient`);
      }
    }
  });

  it("keeps every caption translated", () => {
    for (const s of STORIES) {
      for (const lang of ["en", "ru", "he", "ar"] as const) {
        assert.ok(s.caption[lang]?.trim(), `${s.id} is missing the ${lang} caption`);
      }
    }
  });
});
