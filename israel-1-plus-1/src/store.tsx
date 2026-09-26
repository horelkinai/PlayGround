import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Lang } from './i18n';

export type Role = 'guest' | 'client' | 'individual' | 'agency' | 'admin';
export type Theme = 'dark' | 'light';

export interface Filters {
  q: string; city: string; district: string;
  ageFrom: string; ageTo: string; heightFrom: string; heightTo: string; weightFrom: string; weightTo: string;
  language: string; minRating: string; profileType: string;
  verifiedOnly: boolean; vipOnly: boolean; activeOnly: boolean; agencyOnly: boolean;
  sort: 'recommended' | 'newest' | 'rating' | 'city';
}

export const DEFAULT_FILTERS: Filters = {
  q: '', city: '', district: '', ageFrom: '', ageTo: '', heightFrom: '', heightTo: '',
  weightFrom: '', weightTo: '', language: '', minRating: '', profileType: '',
  verifiedOnly: false, vipOnly: false, activeOnly: false, agencyOnly: false, sort: 'recommended',
};

interface AppState {
  role: Role; setRole: (r: Role) => void;
  lang: Lang; setLang: (l: Lang) => void;
  theme: Theme; setTheme: (t: Theme) => void;
  ageOk: boolean; setAgeOk: (b: boolean) => void;
  likes: Record<string, boolean>; toggleLike: (id: string, needsAuth: () => boolean) => void;
  favs: Record<string, boolean>; toggleFav: (id: string, needsAuth: () => boolean) => void;
  follows: Record<string, boolean>; toggleFollow: (id: string, needsAuth: () => boolean) => void;
  ratings: Record<string, number>; setRating: (id: string, v: number) => void;
  filters: Filters; setFilters: (f: Filters) => void;
  authMsg: string | null; setAuthMsg: (m: string | null) => void;
  feedTab: string; setFeedTab: (s: string) => void;
}

const Ctx = createContext<AppState | null>(null);

function load<T>(k: string, fb: T): T {
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) as T : fb; } catch { return fb; }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>(() => load('i11.role', 'guest' as Role));
  const [lang, setLang] = useState<Lang>(() => load('i11.lang', 'ru' as Lang));
  const [theme, setTheme] = useState<Theme>(() => load('i11.theme', 'light' as Theme));
  const [ageOk, setAgeOk] = useState(() => load('i11.age', false));
  const [likes, setLikes] = useState<Record<string, boolean>>(() => load('i11.likes', {}));
  const [favs, setFavs] = useState<Record<string, boolean>>(() => load('i11.favs', {}));
  const [follows, setFollows] = useState<Record<string, boolean>>(() => load('i11.follows', {}));
  const [ratings, setRatings] = useState<Record<string, number>>(() => load('i11.ratings', {}));
  const [filters, setFilters] = useState<Filters>(() => load('i11.filters', DEFAULT_FILTERS));
  const [authMsg, setAuthMsg] = useState<string | null>(null);
  const [feedTab, setFeedTab] = useState('forYou');

  useEffect(() => { localStorage.setItem('i11.role', JSON.stringify(role)); }, [role]);
  useEffect(() => { localStorage.setItem('i11.lang', JSON.stringify(lang)); }, [lang]);
  useEffect(() => { localStorage.setItem('i11.theme', JSON.stringify(theme)); document.documentElement.dataset.theme = theme; }, [theme]);
  useEffect(() => { localStorage.setItem('i11.age', JSON.stringify(ageOk)); }, [ageOk]);
  useEffect(() => { localStorage.setItem('i11.likes', JSON.stringify(likes)); }, [likes]);
  useEffect(() => { localStorage.setItem('i11.favs', JSON.stringify(favs)); }, [favs]);
  useEffect(() => { localStorage.setItem('i11.follows', JSON.stringify(follows)); }, [follows]);
  useEffect(() => { localStorage.setItem('i11.ratings', JSON.stringify(ratings)); }, [ratings]);
  useEffect(() => { localStorage.setItem('i11.filters', JSON.stringify(filters)); }, [filters]);
  useEffect(() => { document.documentElement.dataset.theme = theme; }, []);

  const val = useMemo<AppState>(() => ({
    role, setRole, lang, setLang, theme, setTheme, ageOk, setAgeOk,
    likes, toggleLike: (id, needsAuth) => { if (!needsAuth()) return; setLikes(p => ({ ...p, [id]: !p[id] })); },
    favs, toggleFav: (id, needsAuth) => { if (!needsAuth()) return; setFavs(p => ({ ...p, [id]: !p[id] })); },
    follows, toggleFollow: (id, needsAuth) => { if (!needsAuth()) return; setFollows(p => ({ ...p, [id]: !p[id] })); },
    ratings, setRating: (id, v) => setRatings(p => ({ ...p, [id]: v })),
    filters, setFilters, authMsg, setAuthMsg, feedTab, setFeedTab,
  }), [role, lang, theme, ageOk, likes, favs, follows, ratings, filters, authMsg, feedTab]);

  return <Ctx.Provider value={val}>{children}</Ctx.Provider>;
}

export function useStore(): AppState {
  const s = useContext(Ctx);
  if (!s) throw new Error('no store');
  return s;
}

export function useGuard() {
  const { role, setAuthMsg } = useStore();
  return () => {
    if (role === 'guest') { setAuthMsg('need-auth'); return false; }
    return true;
  };
}
