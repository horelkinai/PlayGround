import { h as storiesByProfile } from "./router-CWqAbG_v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stories-BGmYuNoC.js
/** Fallback on-screen time when a story declares no durationMs. */
var FALLBACK_DURATION_MS = 5e3;
function storyDuration(story) {
	const ms = story.durationMs;
	return typeof ms === "number" && Number.isFinite(ms) && ms > 0 ? ms : FALLBACK_DURATION_MS;
}
function isStoryViewed(viewed, storyId) {
	return Boolean(viewed && viewed[storyId]);
}
function unseenStoryCount(stories, viewed) {
	return stories.reduce((n, s) => n + (isStoryViewed(viewed, s.id) ? 0 : 1), 0);
}
/**
* Ring state for one author. Depends only on stories + viewed state — profile
* verification/approval is deliberately not an input.
*/
function storyUserStatus(userId, stories, viewed, selfId = "me") {
	if (userId === selfId) return "own";
	if (stories.length === 0) return "empty";
	return unseenStoryCount(stories, viewed) > 0 ? "new" : "seen";
}
function isOpenable(status) {
	return status === "own" || status === "new" || status === "seen";
}
/** Tailwind classes per ring state. */
function storyRingClass(status) {
	switch (status) {
		case "new": return "bg-gradient-to-tr from-amber-400 via-accent to-pink-500";
		case "own": return "bg-gradient-to-tr from-cream/70 via-muted/50 to-line";
		case "seen": return "bg-line";
		case "empty": return "bg-transparent";
	}
}
var STATUS_KEY = {
	new: "storyStateNew",
	seen: "storyStateSeen",
	empty: "storyStateEmpty",
	own: "storyStateOwn"
};
/**
* Accessible text for a rail tile. Status is never carried by colour alone:
* the returned phrase is rendered both in the aria-label and as screen-reader
* text under the avatar.
*/
function storyStatusText(status, strings, unseen) {
	const state = strings[STATUS_KEY[status]];
	if (status === "new" && unseen > 0) return strings.storiesNewCount.replace("{n}", String(unseen));
	return state;
}
/**
* Ordered rail entries: your own story first, then authors, then profiles
* without any story so the empty state is still represented.
* Order of authors: followed, then anyone with unseen stories, then the rest.
*/
function buildStoryRail(options) {
	const { profiles, viewed, follows = {}, selfId = "me", selfLabel, selfPhoto, t, max = 14 } = options;
	const selfStories = storiesByProfile(selfId);
	const entries = [];
	if (selfStories.length > 0) entries.push({
		userId: selfId,
		status: "own",
		stories: selfStories,
		unseenCount: unseenStoryCount(selfStories, viewed),
		label: selfLabel ?? t.storyStateOwn,
		isSelf: true,
		photo: selfPhoto
	});
	const build = (p) => {
		const stories = storiesByProfile(p.id);
		const status = storyUserStatus(p.id, stories, viewed, selfId);
		return {
			userId: p.id,
			status,
			stories,
			unseenCount: unseenStoryCount(stories, viewed),
			label: p.username || p.name,
			profileHref: `/profile/${p.id}`,
			photo: p.photo,
			isSelf: false
		};
	};
	const followed = [];
	const withUnseen = [];
	const rest = [];
	for (const p of profiles) {
		const stories = storiesByProfile(p.id);
		if (follows[p.id]) followed.push(p);
		else if (unseenStoryCount(stories, viewed) > 0) withUnseen.push(p);
		else rest.push(p);
	}
	for (const p of [
		...followed,
		...withUnseen,
		...rest
	]) {
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
function nextUnseenAuthor(entries, currentUserId, viewed) {
	const idx = entries.findIndex((e) => e.userId === currentUserId);
	if (idx === -1) return null;
	const candidates = [...entries.slice(idx + 1), ...entries.slice(0, idx)].filter((e) => !e.isSelf && e.stories.length > 0);
	return candidates.find((e) => unseenStoryCount(e.stories, viewed) > 0) ?? candidates[0] ?? null;
}
/** First unseen story index of an author, so opening jumps to fresh content. */
function firstUnseenIndex(stories, viewed) {
	const i = stories.findIndex((s) => !isStoryViewed(viewed, s.id));
	return i === -1 ? 0 : i;
}
function storyBackdropStyle(story) {
	if (story.mediaType === "gradient" && story.demoGradient) return { background: story.demoGradient };
}
//#endregion
export { nextUnseenAuthor as a, storyRingClass as c, isOpenable as i, storyStatusText as l, buildStoryRail as n, storyBackdropStyle as o, firstUnseenIndex as r, storyDuration as s, FALLBACK_DURATION_MS as t };
