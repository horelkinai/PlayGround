export type Lang = "ru" | "he" | "ar" | "en";
export type Gender = "women" | "men";
export type Intent = "browse" | "create" | "both";
export type Discovery = "women" | "men" | "all";
export type ViewMode = "cards" | "grid" | "list";
export type ProfileStatus = "active" | "paused";
export type ReviewStatus =
  | "submitted"
  | "pending"
  | "approved"
  | "rejected"
  | "needs_clarification"
  | "hidden";
export type AdminStatus = "pending" | "approved" | "rejected";

export type Role = "guest" | "client" | "individual" | "agency";

export type VerificationStatus =
  | "unverified"
  | "submitted"
  | "under_review"
  | "verified"
  | "rejected"
  | "needs_changes"
  | "suspended";

export type SafetyReportStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "needs_clarification"
  | "action_taken"
  | "closed"
  | "appealed";

export type Impression =
  | "professional"
  | "punctual"
  | "respectful"
  | "clear"
  | "would_recommend";

export interface Profile {
  id: string;
  username: string;
  name: string;
  gender: Gender;
  city: string;
  district?: string;
  age: number;
  height: number;
  weight: number;
  languages: Lang[];
  verified: boolean;
  verificationStatus?: VerificationStatus;
  vip: boolean;
  top: boolean;
  rating: number;
  ratingCount: number;
  likes: number;
  views: number;
  favoriteCount: number;
  status: ProfileStatus;
  joined: string;
  photo: string;
  gallery: string[];
  about: Record<Lang, string>;
  params: string[];
  agencyId?: string;
  agencyName?: string;
  /** demo only — never real numbers */
  contactPlaceholder?: string;
  maxPhotos?: number;
  maxVideos?: number;
}

export interface Agency {
  id: string;
  name: string;
  logo?: string;
  description: Record<Lang, string>;
  city: string;
  languages: Lang[];
  verificationStatus: VerificationStatus;
  teamIds: string[];
  contactPlaceholder?: string;
}

export interface Post {
  id: string;
  profileId: string;
  photos: string[];
  caption: Record<Lang, string>;
  likes: number;
  comments: number;
  created: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  text: string;
  created: string;
}

export interface Reel {
  id: string;
  profileId: string;
  photo: string;
  caption: Record<Lang, string>;
  likes: number;
  comments: number;
}

/**
 * Stories are ephemeral status media. Local demo only: `mediaUrl` always points
 * at a bundled asset under /public, never at a remote host.
 */
export type StoryMediaType = "image" | "gradient";

export interface StoryItem {
  id: string;
  /** Profile id, or the current-user id for your own story. */
  authorId: string;
  mediaType: StoryMediaType;
  /** Bundled local asset path. Set when mediaType is "image". */
  mediaUrl?: string;
  /** CSS gradient used when no photo is needed. Set when mediaType is "gradient". */
  demoGradient?: string;
  caption: Record<Lang, string>;
  /** ISO timestamp — demo data is generated relative to load, so stories expire logically. */
  createdAt: string;
  /** How long the story stays on screen. Falls back to 5000ms when absent. */
  durationMs?: number;
}

/**
 * Ring state for one author. Derived purely from stories + viewed state, never
 * from profile verification/approval.
 * - own:   the current user
 * - new:   has at least one unseen story
 * - seen:  has stories, all of them viewed
 * - empty: has no stories at all
 */
export type StoryUserStatus = "own" | "new" | "seen" | "empty";

export interface StoryRailEntry {
  userId: string;
  status: StoryUserStatus;
  stories: StoryItem[];
  unseenCount: number;
  /** Label shown under the avatar. */
  label: string;
  /** Link to the profile, kept separate from the story trigger. */
  profileHref?: string;
  /** Avatar image, when the author is a real profile. */
  photo?: string;
  /** True when the author is the current user. */
  isSelf: boolean;
}

export interface Review {
  id: string;
  profileId: string;
  rating: number;
  impression: Impression;
  text: string;
  status: ReviewStatus;
  created: string;
  reply?: string;
}

export interface Report {
  id: string;
  targetType: "profile" | "post" | "review" | "reel";
  targetId: string;
  reason: string;
  note: string;
  status: AdminStatus;
  created: string;
}

/** Private safety report — only for individual/agency + admin. Never public. */
export interface SafetyReport {
  id: string;
  reporterRole: "individual" | "agency";
  reporterId: string;
  targetLabel: string;
  category: string;
  period: string;
  explanation: string;
  evidenceNote: string;
  status: SafetyReportStatus;
  created: string;
  updated?: string;
  adminNote?: string;
}

export interface AdminItem {
  id: string;
  kind:
    | "profile"
    | "photo"
    | "post"
    | "reel"
    | "review"
    | "report"
    | "verified"
    | "vip"
    | "appeal"
    | "safety";
  title: string;
  subtitle: string;
  status: AdminStatus;
  created: string;
}

export interface AuditEntry {
  id: string;
  actor: string;
  timestamp: string;
  target: string;
  previous: string;
  next: string;
  reason: string;
  note: string;
}

export interface DemoUser {
  name: string;
  contact: string;
  password: string;
  lang: Lang;
  intent: Intent;
  discovery: Discovery;
  role: Role;
  phoneVerified: boolean;
  verificationStatus: VerificationStatus;
  agencyId?: string;
}
