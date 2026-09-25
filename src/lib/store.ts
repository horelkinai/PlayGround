import { create } from "zustand";
import { DEMO_VIEWED_STORY_IDS, storiesByProfile } from "./demo-data";
import type {
  DemoUser,
  Discovery,
  Impression,
  Intent,
  Lang,
  Role,
  SafetyReport,
  SafetyReportStatus,
  VerificationStatus,
  ViewMode,
} from "./types";

const KEY = "i11-store-v3";

export interface AppState {
  hydrated: boolean;
  lang: Lang;
  theme: "dark" | "light";
  ageOk: boolean;
  onboarded: boolean;
  role: Role;
  intent: Intent;
  discovery: Discovery;
  user: DemoUser | null;
  phoneVerified: boolean;
  verificationStatus: VerificationStatus;
  likes: Record<string, boolean>;
  favorites: Record<string, boolean>;
  follows: Record<string, boolean>;
  savedPosts: Record<string, boolean>;
  /** storyId -> ISO timestamp of the last view. Survives reloads. */
  viewedStoryIds: Record<string, string>;
  blocked: string[];
  view: ViewMode;
  extraReviews: {
    id: string;
    profileId: string;
    rating: number;
    impression: Impression;
    text: string;
    status: "pending";
    created: string;
    reply?: string;
  }[];
  extraReports: { id: string; targetId: string; reason: string; note: string }[];
  extraComments: { id: string; postId: string; author: string; text: string }[];
  safetyReports: SafetyReport[];
  myProfile: {
    name: string;
    username: string;
    city: string;
    district?: string;
    age: number;
    height: number;
    weight: number;
    about: string;
    languages: Lang[];
  } | null;
  agencyProfile: {
    name: string;
    city: string;
    description: string;
    teamIds: string[];
  } | null;
  adminStatus: Record<string, "pending" | "approved" | "rejected">;
  demoAdmin: boolean;
  sessionSeconds: number;
  clientPhoto: string;
  prefCity: string;
  prefAgeMin: number;
  prefAgeMax: number;
  limits: {
    unverifiedMaxPhotos: number;
    unverifiedMaxVideos: number;
    verifiedMaxPhotos: number;
    verifiedMaxVideos: number;
  };
  hydrate: () => void;
  persist: () => void;
  setLang: (lang: Lang) => void;
  setTheme: (theme: "dark" | "light") => void;
  passAge: () => void;
  setRole: (role: Role) => void;
  setDiscovery: (d: Discovery) => void;
  finishOnboarding: (user: DemoUser) => void;
  setPhoneVerified: (v: boolean) => void;
  setVerificationStatus: (s: VerificationStatus) => void;
  toggleLike: (id: string) => void;
  toggleFav: (id: string) => void;
  toggleFollow: (id: string) => void;
  toggleSaved: (id: string) => void;
  markStoryViewed: (storyId: string) => void;
  markUserStoriesViewed: (userId: string) => void;
  isStoryViewed: (storyId: string) => boolean;
  /** Demo/development only: clears every viewed story. */
  resetStoryViews: () => void;
  block: (id: string) => void;
  unblock: (id: string) => void;
  setView: (v: ViewMode) => void;
  addReview: (profileId: string, rating: number, impression: Impression, text: string) => void;
  addReport: (targetId: string, reason: string, note: string) => void;
  addComment: (postId: string, text: string) => void;
  addSafetyReport: (r: Omit<SafetyReport, "id" | "created" | "status">) => void;
  updateSafetyReportStatus: (id: string, status: SafetyReportStatus, adminNote?: string) => void;
  setMyProfile: (p: AppState["myProfile"]) => void;
  setAgencyProfile: (p: AppState["agencyProfile"]) => void;
  setAdmin: (id: string, s: "pending" | "approved" | "rejected") => void;
  setDemoAdmin: (v: boolean) => void;
  addSessionSeconds: (n: number) => void;
  setClientPhoto: (url: string) => void;
  setPrefs: (p: { prefCity?: string; prefAgeMin?: number; prefAgeMax?: number }) => void;
  canInteract: () => boolean;
  canSeeContacts: () => boolean;
  canAccessTrustSafety: () => boolean;
  isGuest: () => boolean;
  resetDemo: () => void;
}

type Snapshot = Pick<
  AppState,
  | "lang"
  | "theme"
  | "ageOk"
  | "onboarded"
  | "role"
  | "intent"
  | "discovery"
  | "user"
  | "phoneVerified"
  | "verificationStatus"
  | "likes"
  | "favorites"
  | "follows"
  | "savedPosts"
  | "viewedStoryIds"
  | "blocked"
  | "view"
  | "extraReviews"
  | "extraReports"
  | "extraComments"
  | "safetyReports"
  | "myProfile"
  | "agencyProfile"
  | "adminStatus"
  | "demoAdmin"
  | "limits"
  | "sessionSeconds"
  | "clientPhoto"
  | "prefCity"
  | "prefAgeMin"
  | "prefAgeMax"
>;

/**
 * Stories pre-marked as viewed on a fresh install so the rail demonstrates
 * the new / seen / empty / own states. A returning visitor whose saved payload
 * predates this key keeps the value from `empty` via the spread in `read()`.
 */
function demoViewedBaseline(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const id of DEMO_VIEWED_STORY_IDS) out[id] = "2026-09-25T00:00:00.000Z";
  return out;
}

const empty: Snapshot = {
  lang: "ru",
  theme: "dark",
  ageOk: false,
  onboarded: false,
  role: "guest",
  intent: "browse",
  discovery: "all",
  user: null,
  phoneVerified: false,
  verificationStatus: "unverified",
  likes: {},
  favorites: {},
  follows: {},
  savedPosts: {},
  viewedStoryIds: demoViewedBaseline(),
  blocked: [],
  view: "list",
  extraReviews: [],
  extraReports: [],
  extraComments: [],
  safetyReports: [],
  myProfile: null,
  agencyProfile: null,
  adminStatus: {},
  demoAdmin: false,
  sessionSeconds: 0,
  clientPhoto: "",
  prefCity: "",
  prefAgeMin: 18,
  prefAgeMax: 45,
  limits: {
    unverifiedMaxPhotos: 3,
    unverifiedMaxVideos: 1,
    verifiedMaxPhotos: 20,
    verifiedMaxVideos: 10,
  },
};

function read(): Snapshot {
  if (typeof localStorage === "undefined") return empty;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<Snapshot> | null;
    if (!parsed || typeof parsed !== "object") return empty;
    return {
      ...empty,
      ...parsed,
      // Payloads written before this key existed — or hand-edited ones — must
      // not leave the map null, or every ring lookup would throw.
      viewedStoryIds:
        parsed.viewedStoryIds && typeof parsed.viewedStoryIds === "object"
          ? parsed.viewedStoryIds
          : empty.viewedStoryIds,
    };
  } catch {
    return empty;
  }
}

export const useAppStore = create<AppState>((set, get) => ({
  ...empty,
  hydrated: false,
  hydrate: () => {
    const data = read();
    set({ ...data, hydrated: true });
  },
  persist: () => {
    if (typeof localStorage === "undefined") return;
    const s = get();
    const snap: Snapshot = {
      lang: s.lang,
      theme: s.theme,
      ageOk: s.ageOk,
      onboarded: s.onboarded,
      role: s.role,
      intent: s.intent,
      discovery: s.discovery,
      user: s.user,
      phoneVerified: s.phoneVerified,
      verificationStatus: s.verificationStatus,
      likes: s.likes,
      favorites: s.favorites,
      follows: s.follows,
      savedPosts: s.savedPosts,
      viewedStoryIds: s.viewedStoryIds,
      blocked: s.blocked,
      view: s.view,
      extraReviews: s.extraReviews,
      extraReports: s.extraReports,
      extraComments: s.extraComments,
      safetyReports: s.safetyReports,
      myProfile: s.myProfile,
      agencyProfile: s.agencyProfile,
      adminStatus: s.adminStatus,
      demoAdmin: s.demoAdmin,
      limits: s.limits,
      sessionSeconds: s.sessionSeconds,
      clientPhoto: s.clientPhoto,
      prefCity: s.prefCity,
      prefAgeMin: s.prefAgeMin,
      prefAgeMax: s.prefAgeMax,
    };
    try {
      localStorage.setItem(KEY, JSON.stringify(snap));
    } catch {
      /* ignore */
    }
  },
  setLang: (lang) => {
    set({ lang });
    get().persist();
  },
  setTheme: (theme) => {
    set({ theme });
    get().persist();
  },
  passAge: () => {
    set({ ageOk: true });
    get().persist();
  },
  setRole: (role) => {
    set({ role });
    get().persist();
  },
  setDiscovery: (discovery) => {
    set({ discovery });
    get().persist();
  },
  finishOnboarding: (user) => {
    set({
      onboarded: true,
      user,
      lang: user.lang,
      intent: user.intent,
      discovery: user.discovery,
      role: user.role,
      phoneVerified: user.phoneVerified,
      verificationStatus: user.verificationStatus,
    });
    get().persist();
  },
  setPhoneVerified: (phoneVerified) => {
    set({ phoneVerified });
    get().persist();
  },
  setVerificationStatus: (verificationStatus) => {
    set({ verificationStatus });
    get().persist();
  },
  toggleLike: (id) => {
    if (!get().canInteract()) return;
    const likes = { ...get().likes, [id]: !get().likes[id] };
    set({ likes });
    get().persist();
  },
  toggleFav: (id) => {
    if (!get().canInteract()) return;
    const favorites = { ...get().favorites, [id]: !get().favorites[id] };
    set({ favorites });
    get().persist();
  },
  toggleFollow: (id) => {
    if (!get().canInteract()) return;
    const follows = { ...get().follows, [id]: !get().follows[id] };
    set({ follows });
    get().persist();
  },
  toggleSaved: (id) => {
    if (!get().canInteract()) return;
    const savedPosts = { ...get().savedPosts, [id]: !get().savedPosts[id] };
    set({ savedPosts });
    get().persist();
  },
  // Viewing a story is passive, so it is not gated by canInteract(): guests
  // still watch stories, they just cannot like or comment.
  markStoryViewed: (storyId) => {
    if (get().viewedStoryIds[storyId]) return;
    const viewedStoryIds = {
      ...get().viewedStoryIds,
      [storyId]: new Date().toISOString(),
    };
    set({ viewedStoryIds });
    get().persist();
  },
  markUserStoriesViewed: (userId) => {
    const pending = storiesByProfile(userId).filter((s) => !get().viewedStoryIds[s.id]);
    if (pending.length === 0) return;
    const now = new Date().toISOString();
    const viewedStoryIds = { ...get().viewedStoryIds };
    for (const s of pending) viewedStoryIds[s.id] = now;
    set({ viewedStoryIds });
    get().persist();
  },
  isStoryViewed: (storyId) => Boolean(get().viewedStoryIds[storyId]),
  resetStoryViews: () => {
    set({ viewedStoryIds: {} });
    get().persist();
  },
  block: (id) => {
    const blocked = Array.from(new Set([...get().blocked, id]));
    set({ blocked });
    get().persist();
  },
  unblock: (id) => {
    set({ blocked: get().blocked.filter((x) => x !== id) });
    get().persist();
  },
  setView: (view) => {
    set({ view });
    get().persist();
  },
  addReview: (profileId, rating, impression, text) => {
    if (!get().canInteract()) return;
    const extraReviews = [
      ...get().extraReviews,
      {
        id: `ur-${Date.now()}`,
        profileId,
        rating,
        impression,
        text,
        status: "pending" as const,
        created: new Date().toISOString().slice(0, 10),
      },
    ];
    set({ extraReviews });
    get().persist();
  },
  addReport: (targetId, reason, note) => {
    if (!get().canInteract()) return;
    const extraReports = [
      ...get().extraReports,
      { id: `rp-${Date.now()}`, targetId, reason, note },
    ];
    set({ extraReports });
    get().persist();
  },
  addComment: (postId, text) => {
    if (!get().canInteract()) return;
    const extraComments = [
      ...get().extraComments,
      {
        id: `cm-${Date.now()}`,
        postId,
        author: get().user?.name || "You",
        text,
      },
    ];
    set({ extraComments });
    get().persist();
  },
  addSafetyReport: (r) => {
    const role = get().role;
    if (role !== "individual" && role !== "agency") return;
    const safetyReports = [
      ...get().safetyReports,
      {
        ...r,
        id: `sr-${Date.now()}`,
        status: "submitted" as SafetyReportStatus,
        created: new Date().toISOString().slice(0, 10),
      },
    ];
    set({ safetyReports });
    get().persist();
  },
  updateSafetyReportStatus: (id, status, adminNote) => {
    const safetyReports = get().safetyReports.map((r) =>
      r.id === id
        ? {
            ...r,
            status,
            adminNote: adminNote ?? r.adminNote,
            updated: new Date().toISOString().slice(0, 10),
          }
        : r,
    );
    set({ safetyReports });
    get().persist();
  },
  setMyProfile: (myProfile) => {
    set({ myProfile });
    get().persist();
  },
  setAgencyProfile: (agencyProfile) => {
    set({ agencyProfile });
    get().persist();
  },
  setAdmin: (id, s) => {
    const adminStatus = { ...get().adminStatus, [id]: s };
    set({ adminStatus });
    get().persist();
  },
  setDemoAdmin: (demoAdmin) => {
    set({ demoAdmin });
    get().persist();
  },
  addSessionSeconds: (n) => {
    set({ sessionSeconds: get().sessionSeconds + n });
    get().persist();
  },
  setClientPhoto: (clientPhoto) => {
    set({ clientPhoto });
    get().persist();
  },
  setPrefs: (p) => {
    set({
      prefCity: p.prefCity ?? get().prefCity,
      prefAgeMin: p.prefAgeMin ?? get().prefAgeMin,
      prefAgeMax: p.prefAgeMax ?? get().prefAgeMax,
    });
    get().persist();
  },
  canInteract: () => {
    // Guest: no likes/comments/fav/rate/review/report
    // Client: interactions allowed without mandatory phone at start
    // Individual / Agency: allowed when onboarded
    const { role, onboarded } = get();
    if (!onboarded || role === "guest") return false;
    return role === "client" || role === "individual" || role === "agency";
  },
  canSeeContacts: () => {
    // Per updated structure: guests MAY see allowed public contact methods
    return true;
  },
  canAccessTrustSafety: () => {
    // Only verified individual / agency + demo admin
    const { role, verificationStatus, demoAdmin, onboarded } = get();
    if (demoAdmin) return true;
    if (!onboarded) return false;
    if (role !== "individual" && role !== "agency") return false;
    return verificationStatus === "verified";
  },
  isGuest: () => get().role === "guest" || !get().onboarded,
  resetDemo: () => {
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
    set({ ...empty, hydrated: true });
  },
}));
