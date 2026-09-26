// Israel 1+1 — fictional demo data only. No real persons, phones or emails.
export type ProfileType = 'individual' | 'agency-team' | 'agency';
export type VerifyStatus = 'unverified' | 'submitted' | 'under review' | 'needs changes' | 'verified' | 'rejected' | 'suspended';

export interface DemoProfile {
  id: string;
  name: string;
  username: string;
  city: string;
  district?: string;
  age: number;
  height: number;
  weight: number;
  languages: string[];
  rating: number;
  ratingCount: number;
  verified: boolean;
  vip?: boolean;
  top?: boolean;
  isNew?: boolean;
  paused?: boolean;
  agency?: string;
  type: ProfileType;
  about: string;
  contacts: { label: string; value: string; isPublic: boolean }[];
  tags: string[];
  followers: number;
  likes: number;
  views: number;
  theme: string;
}

export const CITIES = ['Tel Aviv', 'Haifa', 'Jerusalem', 'Eilat', 'Netanya', 'Ashdod', 'Beersheba', 'Herzliya'];
export const DISTRICTS = ['Center', 'North', 'Old City', 'Beach area', 'Marina', 'Downtown'];
export const LANGS = ['ru', 'en', 'he', 'ar'];

export const PROFILES: DemoProfile[] = [
  { id: 'p1', name: 'Maya L.', username: '@maya_l', city: 'Tel Aviv', district: 'Center', age: 24, height: 168, weight: 55, languages: ['ru', 'en'], rating: 4.8, ratingCount: 132, verified: true, vip: true, isNew: false, agency: 'Sunrise Studio', type: 'agency-team', about: 'Fashion and city lifestyle. Demo fictional profile.', contacts: [{ label: 'Platform chat', value: 'demo-chat:m richest', isPublic: true }, { label: 'Phone', value: 'demo-hidden', isPublic: false }], tags: ['fashion', 'lifestyle'], followers: 12400, likes: 45200, views: 210000, theme: 'fashion' },
  { id: 'p2', name: 'Noa S.', username: '@noa_s', city: 'Haifa', district: 'Downtown', age: 27, height: 172, weight: 60, languages: ['he', 'en'], rating: 4.6, ratingCount: 89, verified: true, top: true, isNew: true, type: 'individual', about: 'Travel and sea stories. Fictional demo text.', contacts: [{ label: 'Platform chat', value: 'demo-chat:noa', isPublic: true }], tags: ['travel', 'city'], followers: 8300, likes: 21000, views: 98000, theme: 'travel' },
  { id: 'p3', name: 'Ariana K.', username: '@ariana_k', city: 'Eilat', district: 'Beach area', age: 22, height: 165, weight: 52, languages: ['ru', 'he'], rating: 4.2, ratingCount: 41, verified: false, isNew: true, type: 'individual', about: 'Music and daily routine. Demo only.', contacts: [{ label: 'Platform chat', value: 'demo-chat:ariana', isPublic: true }], tags: ['music', 'daily'], followers: 1200, likes: 3400, views: 15000, theme: 'music' },
  { id: 'p4', name: 'Dana M.', username: '@dana_m', city: 'Jerusalem', district: 'Old City', age: 29, height: 170, weight: 58, languages: ['en', 'he', 'ar'], rating: 4.9, ratingCount: 210, verified: true, vip: true, top: true, type: 'individual', about: 'Art and photography walks. Fictional.', contacts: [{ label: 'Platform chat', value: 'demo-chat:dana', isPublic: true }], tags: ['art', 'city'], followers: 18900, likes: 67000, views: 320000, theme: 'art' },
  { id: 'p5', name: 'Lina R.', username: '@lina_r', city: 'Netanya', district: 'Marina', age: 25, height: 169, weight: 56, languages: ['ru', 'en', 'he'], rating: 3.9, ratingCount: 27, verified: false, paused: false, type: 'individual', about: 'Hobbies and handmade. Demo profile.', contacts: [{ label: 'Platform chat', value: 'demo-chat:lina', isPublic: true }], tags: ['hobbies'], followers: 640, likes: 1500, views: 8000, theme: 'hobbies' },
  { id: 'p6', name: 'Tamar B.', username: '@tamar_b', city: 'Ashdod', age: 31, height: 174, weight: 62, languages: ['he'], rating: 4.4, ratingCount: 58, verified: true, type: 'individual', about: 'Paused demo profile example.', contacts: [{ label: 'Platform chat', value: 'demo-chat:tamar', isPublic: true }], tags: ['lifestyle'], followers: 2100, likes: 5600, views: 22000, theme: 'lifestyle', paused: true },
  { id: 'p7', name: 'Sunrise Studio', username: '@sunrise_studio', city: 'Tel Aviv', age: 0, height: 0, weight: 0, languages: ['ru', 'en', 'he'], rating: 4.7, ratingCount: 96, verified: true, type: 'agency', about: 'Fictional demo agency. Cities: Tel Aviv, Haifa.', contacts: [{ label: 'Business chat', value: 'demo-chat:sunrise', isPublic: true }], tags: ['agency'], followers: 5400, likes: 12000, views: 88000, theme: 'city' },
  { id: 'p8', name: 'Sofia D.', username: '@sofia_d', city: 'Herzliya', district: 'Marina', age: 26, height: 171, weight: 57, languages: ['ru', 'en'], rating: 4.5, ratingCount: 73, verified: true, isNew: true, agency: 'Sunrise Studio', type: 'agency-team', about: 'Dance and routine. Fictional demo.', contacts: [{ label: 'Platform chat', value: 'demo-chat:sofia', isPublic: true }], tags: ['music', 'daily'], followers: 4600, likes: 13400, views: 54000, theme: 'daily routine' },
  { id: 'p9', name: 'Yael K.', username: '@yael_k', city: 'Beersheba', district: 'North', age: 28, height: 167, weight: 59, languages: ['he', 'ar'], rating: 4.1, ratingCount: 33, verified: false, type: 'individual', about: 'City guides and food. Demo only.', contacts: [{ label: 'Platform chat', value: 'demo-chat:yael', isPublic: true }], tags: ['city', 'travel'], followers: 980, likes: 2700, views: 12000, theme: 'city' },
  { id: 'p10', name: 'Nika V.', username: '@nika_v', city: 'Tel Aviv', district: 'Center', age: 23, height: 166, weight: 53, languages: ['ru', 'en'], rating: 4.3, ratingCount: 49, verified: true, isNew: true, type: 'individual', about: 'Style shots and reels. Fictional.', contacts: [{ label: 'Platform chat', value: 'demo-chat:nika', isPublic: true }], tags: ['fashion'], followers: 3200, likes: 9800, views: 41000, theme: 'fashion' },
];

export interface DemoPost {
  id: string;
  profileId: string;
  kind: 'photo' | 'video' | 'carousel';
  caption: string;
  likes: number;
  comments: { user: string; text: string }[];
  theme: string;
}

export const POSTS: DemoPost[] = PROFILES.slice(0, 8).flatMap((p, i) => ([
  { id: `${p.id}-post1`, profileId: p.id, kind: (i % 3 === 0 ? 'video' : i % 3 === 1 ? 'carousel' : 'photo') as DemoPost['kind'], caption: `Demo post about ${p.theme}. Fictional, non-sensitive. #${p.tags[0] ?? 'demo'}`, likes: 100 + i * 37, comments: [{ user: '@demo_guest', text: 'Nice demo post!' }, { user: '@demo_fan', text: 'Love this theme.' }], theme: p.theme },
  { id: `${p.id}-post2`, profileId: p.id, kind: 'photo', caption: `Second demo story from ${p.city}. Fictional content.`, likes: 40 + i * 11, comments: [{ user: '@demo_user', text: 'Great colors!' }], theme: p.theme },
]));

export interface DemoReview { id: string; profileId: string; score: number; text: string; status: 'published' | 'pending' | 'rejected'; date: string; }
export const REVIEWS: DemoReview[] = [
  { id: 'r1', profileId: 'p1', score: 5, text: 'Very professional demo communication.', status: 'published', date: '2026-08-02' },
  { id: 'r2', profileId: 'p1', score: 4, text: 'Nice demo gallery and quick replies.', status: 'published', date: '2026-08-20' },
  { id: 'r3', profileId: 'p2', score: 5, text: 'Fictional review for prototype only.', status: 'pending', date: '2026-09-10' },
];

export interface DemoReport { id: string; target: string; category: string; status: 'draft' | 'submitted' | 'under review' | 'needs clarification' | 'action taken' | 'closed' | 'appealed'; date: string; }
export const REPORTS: DemoReport[] = [
  { id: 'REP-101', target: '@ariana_k', category: 'Spam', status: 'under review', date: '2026-09-12' },
  { id: 'REP-102', target: '@lina_r', category: 'Content issue', status: 'needs clarification', date: '2026-09-18' },
];

export const AGENCIES = [
  { id: 'a1', name: 'Sunrise Studio', city: 'Tel Aviv', verified: true, team: ['p1', 'p8'] },
  { id: 'a2', name: 'Carmel Collective', city: 'Haifa', verified: false, team: ['p2'] },
];

export const AUDIT = [
  { actor: 'agency-manager (demo)', date: '2026-09-20 14:02', action: 'update contact preference', prev: 'chat only', next: 'chat + call window' },
  { actor: 'agency-manager (demo)', date: '2026-09-21 10:15', action: 'link team profile', prev: '—', next: '@sofia_d' },
];
