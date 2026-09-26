import React, { useMemo, useState } from 'react';
import { Link } from './app';
import { useStore, DEFAULT_FILTERS, type Filters } from './store';
import { t, fmtNum, fmtDate } from './i18n';
import { PROFILES, POSTS, REVIEWS, REPORTS, AGENCIES, AUDIT, CITIES, DISTRICTS, type DemoProfile } from './data';
import { AuthNotice, Badges, Field, PostCard, ProfileCard, ReelsStrip, Stars, Logo } from './components';

/* ---------- shared: filters ---------- */
export function applyFilters(f: Filters): DemoProfile[] {
  let r = PROFILES.filter(p => p.type !== 'agency' || true);
  if (f.q) { const q = f.q.toLowerCase(); r = r.filter(p => (p.name + p.username + p.city + p.about).toLowerCase().includes(q)); }
  if (f.city) r = r.filter(p => p.city === f.city);
  if (f.district) r = r.filter(p => p.district === f.district);
  if (f.ageFrom) r = r.filter(p => p.age === 0 || p.age >= Number(f.ageFrom));
  if (f.ageTo) r = r.filter(p => p.age === 0 || p.age <= Number(f.ageTo));
  if (f.heightFrom) r = r.filter(p => p.height === 0 || p.height >= Number(f.heightFrom));
  if (f.heightTo) r = r.filter(p => p.height === 0 || p.height <= Number(f.heightTo));
  if (f.weightFrom) r = r.filter(p => p.weight === 0 || p.weight >= Number(f.weightFrom));
  if (f.weightTo) r = r.filter(p => p.weight === 0 || p.weight <= Number(f.weightTo));
  if (f.language) r = r.filter(p => p.languages.includes(f.language));
  if (f.minRating) r = r.filter(p => p.rating >= Number(f.minRating));
  if (f.profileType) r = r.filter(p => p.type === f.profileType);
  if (f.verifiedOnly) r = r.filter(p => p.verified);
  if (f.vipOnly) r = r.filter(p => p.vip || p.top);
  if (f.activeOnly) r = r.filter(p => !p.paused);
  if (f.agencyOnly) r = r.filter(p => !!p.agency);
  if (f.sort === 'rating') r = [...r].sort((a, b) => b.rating - a.rating);
  else if (f.sort === 'city') r = [...r].sort((a, b) => a.city.localeCompare(b.city));
  else if (f.sort === 'newest') r = [...r].sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false));
  return r;
}

function activeChips(f: Filters): string[] {
  const c: string[] = [];
  if (f.q) c.push(`q:${f.q}`);
  if (f.city) c.push(f.city);
  if (f.district) c.push(f.district);
  if (f.ageFrom || f.ageTo) c.push(`age ${f.ageFrom || '…'}–${f.ageTo || '…'}`);
  if (f.language) c.push(`lang:${f.language}`);
  if (f.minRating) c.push(`★≥${f.minRating}`);
  if (f.verifiedOnly) c.push('Verified');
  if (f.vipOnly) c.push('VIP/TOP');
  if (f.activeOnly) c.push('active');
  if (f.agencyOnly) c.push('agency');
  if (f.profileType) c.push(f.profileType);
  return c;
}

function FilterForm({ mobile }: { mobile?: boolean }) {
  const s = useStore();
  const f = s.filters;
  const set = (p: Partial<Filters>) => s.setFilters({ ...f, ...p });
  void mobile;
  return (
    <div className="grid">
      <Field label="Search"><input className="input" value={f.q} onChange={e => set({ q: e.target.value })} placeholder={t('search', s.lang)} /></Field>
      <div className="row">
        <Field label="City"><select className="select" value={f.city} onChange={e => set({ city: e.target.value })}><option value="">—</option>{CITIES.map(c => <option key={c} value={c}>{c}</option>)}</select></Field>
        <Field label="District"><select className="select" value={f.district} onChange={e => set({ district: e.target.value })}><option value="">—</option>{DISTRICTS.map(c => <option key={c} value={c}>{c}</option>)}</select></Field>
      </div>
      <div className="row">
        <Field label="Age from"><input className="input" inputMode="numeric" value={f.ageFrom} onChange={e => set({ ageFrom: e.target.value })} /></Field>
        <Field label="Age to"><input className="input" inputMode="numeric" value={f.ageTo} onChange={e => set({ ageTo: e.target.value })} /></Field>
      </div>
      <div className="row">
        <Field label="Height from"><input className="input" inputMode="numeric" value={f.heightFrom} onChange={e => set({ heightFrom: e.target.value })} /></Field>
        <Field label="Height to"><input className="input" inputMode="numeric" value={f.heightTo} onChange={e => set({ heightTo: e.target.value })} /></Field>
      </div>
      <div className="row">
        <Field label="Language"><select className="select" value={f.language} onChange={e => set({ language: e.target.value })}><option value="">—</option><option value="ru">ru</option><option value="en">en</option><option value="he">he</option><option value="ar">ar</option></select></Field>
        <Field label="Min rating"><select className="select" value={f.minRating} onChange={e => set({ minRating: e.target.value })}><option value="">—</option><option>3</option><option>4</option><option>4.5</option></select></Field>
      </div>
      <div className="row">
        <Field label="Type"><select className="select" value={f.profileType} onChange={e => set({ profileType: e.target.value })}><option value="">—</option><option value="individual">individual</option><option value="agency-team">agency team</option><option value="agency">agency</option></select></Field>
        <Field label="Sort"><select className="select" value={f.sort} onChange={e => set({ sort: e.target.value as Filters['sort'] })}><option value="recommended">recommended</option><option value="newest">newest</option><option value="rating">rating</option><option value="city">city</option></select></Field>
      </div>
      {(['verifiedOnly', 'vipOnly', 'activeOnly', 'agencyOnly'] as const).map(k => (
        <label key={k} className="row" style={{ gap: 8 }}><input type="checkbox" checked={f[k]} onChange={e => set({ [k]: e.target.checked } as Partial<Filters>)} /> {k}</label>
      ))}
      <div className="row">
        <span className="btn small primary">{t('apply', s.lang)} · {applyFilters(f).length}</span>
        <button className="btn small ghost" onClick={() => s.setFilters(DEFAULT_FILTERS)}>{t('reset', s.lang)}</button>
      </div>
      <div className="row">{activeChips(f).map(c => <span key={c} className="chip"><b>{c}</b></span>)}
        {activeChips(f).length === 0 && <span className="muted" style={{ fontSize: 13 }}>no active filters (demo filters really change results)</span>}</div>
    </div>
  );
}

/* ---------- 1-7 onboarding ---------- */
export function WelcomePage() {
  const s = useStore();
  return (
    <div className="grid">
      <div className="card hero">
        <div>
          <Logo size={52} />
          <h1 style={{ margin: '12px 0 6px' }}>Israel 1+1</h1>
          <p className="muted">Modern social directory: feed, short videos, catalogue, ratings, verified profiles. Clickable prototype with fictional demo data only.</p>
          <div className="row">
            <Link className="btn primary" href="#/age">Continue</Link>
            <Link className="btn ghost" href="#/age">Enter as guest</Link>
          </div>
          <p className="muted" style={{ fontSize: 12 }}>No Instagram assets. Original brand, original components.</p>
        </div>
        <div className="hero-visual" aria-label="brand visual placeholder">
          <div><div style={{ fontSize: 52 }}>◍</div><strong>brand visual</strong><br /><span className="muted">girl illustration placeholder (uploaded asset slot, object-contain)</span><br /><img className="logo-img" alt="Israel 1+1" src="data:," style={{ display: 'none' }} /></div>
        </div>
      </div>
    </div>
  );
}

export function AgePage() {
  const s = useStore();
  return (
    <div className="card grid" style={{ maxWidth: 560, margin: '0 auto' }}>
      <Logo />
      <div className="hero-visual" style={{ minHeight: 160 }}>brand visual · adult-only entry (prototype screen only)</div>
      <h2>18+ · Adult-only notice (prototype)</h2>
      <p className="muted">This demo catalogue is intended for adults. No production age assurance is implemented.</p>
      <div className="row">
        <button className="btn primary" onClick={() => { s.setAgeOk(true); window.location.hash = '#/account-type'; }}>Continue (18+)</button>
        <a className="btn ghost" href="https://example.com">Exit</a>
      </div>
      <div className="row"><Link className="btn small" href="#/rules">Rules</Link><Link className="btn small" href="#/privacy">Privacy</Link></div>
    </div>
  );
}

export function RulesPage() { return <div className="card"><h2>Rules (demo)</h2><p className="muted">No public accusations, no raw phones, reviews moderated, reports private. Fictional prototype rules.</p></div>; }
export function PrivacyPage() { return <div className="card"><h2>Privacy (demo)</h2><p className="muted">Guest sees only public contact placeholders. Private fields, evidence, reporter identity and admin notes are never public.</p><PublicPrivateMatrix /></div>; }

export function AccountTypePage() {
  const s = useStore();
  const pick = (r: 'guest' | 'client' | 'individual' | 'agency') => {
    if (r === 'guest') { s.setRole('guest'); window.location.hash = '#/home'; }
    else { window.location.hash = '#/signin?as=' + r; }
  };
  return (
    <div className="card grid" style={{ maxWidth: 640, margin: '0 auto' }}>
      <h2>Choose account type</h2>
      <div className="grid">
        {([['guest', 'Guest — browse only'], ['client', 'Client — like, comment, follow, rate'], ['individual', 'Individual profile — publish + verification'], ['agency', 'Agency — team + audit log']] as const).map(([k, d]) => (
          <button key={k} className="btn" onClick={() => pick(k)} style={{ justifyContent: 'flex-start' }}><strong>{k}</strong>&nbsp;<span className="muted">{d}</span></button>
        ))}
      </div>
      <RoleMatrix />
    </div>
  );
}

export function SignInPage() {
  const s = useStore();
  const as = new URLSearchParams(window.location.hash.split('?')[1] || '').get('as') || 'client';
  return (
    <div className="card grid" style={{ maxWidth: 520, margin: '0 auto' }}>
      <h2>Sign in (visual mock)</h2>
      <p className="muted">No real OAuth / SMS / backend. Buttons only simulate.</p>
      <button className="btn" onClick={() => alert('Demo: Google sheet mock')}>Continue with Google (mock)</button>
      <Field label="Email (placeholder)"><input className="input" placeholder="demo@example.com" /></Field>
      <Field label="Phone (optional future OTP visual flow)"><input className="input" placeholder="+972-00-000-0000 (demo)" /></Field>
      <Field label="Password / code (placeholder)"><input className="input" type="password" placeholder="••••••" /></Field>
      <button className="btn primary" onClick={() => {
        s.setRole(as === 'agency' ? 'agency' : as === 'individual' ? 'individual' : 'client');
        window.location.hash = as === 'agency' ? '#/onboarding/agency' : as === 'individual' ? '#/onboarding/individual' : '#/onboarding/client';
      }}>Continue → {as} onboarding</button>
      <div className="notice" style={{ fontSize: 13 }}>Phone verification is optional in prototype and never blocks basic client features.</div>
    </div>
  );
}

export function ClientOnboarding() {
  const s = useStore();
  return (
    <div className="card grid" style={{ maxWidth: 560, margin: '0 auto' }}>
      <h2>Client onboarding (mock)</h2>
      <Field label="Public name"><input className="input" placeholder="Demo Guest" /></Field>
      <Field label="Language"><select className="select"><option>ru</option><option>en</option><option>he</option><option>ar</option></select></Field>
      <Field label="City preferences"><select className="select"><option>Tel Aviv</option><option>Haifa</option><option>Jerusalem</option></select></Field>
      <Field label="Interests"><input className="input" placeholder="fashion, travel, art (demo)" /></Field>
      <button className="btn primary" onClick={() => { s.setRole('client'); window.location.hash = '#/home'; }}>Finish → Home</button>
    </div>
  );
}

export function IndividualOnboarding() {
  const s = useStore();
  return (
    <div className="card grid" style={{ maxWidth: 640, margin: '0 auto' }}>
      <h2>Individual onboarding (mock)</h2>
      <div className="row"><Field label="Public name"><input className="input" /></Field><Field label="Username"><input className="input" placeholder="@demo" /></Field></div>
      <div className="row"><Field label="City"><select className="select">{CITIES.map(c => <option key={c}>{c}</option>)}</select></Field><Field label="District"><select className="select">{DISTRICTS.map(c => <option key={c}>{c}</option>)}</select></Field></div>
      <div className="row"><Field label="Age"><input className="input" inputMode="numeric" /></Field><Field label="Height"><input className="input" /></Field><Field label="Weight"><input className="input" /></Field></div>
      <Field label="Languages"><input className="input" placeholder="ru, en" /></Field>
      <Field label="About"><textarea className="textarea" placeholder="Fictional demo about…" /></Field>
      <Field label="Photos (mock upload)"><input className="input" type="file" multiple /></Field>
      <Field label="Video (mock upload)"><input className="input" type="file" /></Field>
      <Field label="Contact preferences"><select className="select"><option>platform chat only</option><option>chat + call window (verified)</option></select></Field>
      <label className="row"><input type="checkbox" /> Request verification (visual flow)</label>
      <button className="btn primary" onClick={() => { s.setRole('individual'); window.location.hash = '#/me'; }}>Finish → My dashboard</button>
    </div>
  );
}

export function AgencyOnboarding() {
  const s = useStore();
  return (
    <div className="card grid" style={{ maxWidth: 640, margin: '0 auto' }}>
      <h2>Agency onboarding (mock)</h2>
      <Field label="Agency name"><input className="input" placeholder="Demo Studio" /></Field>
      <Field label="Logo (mock)"><input className="input" type="file" /></Field>
      <Field label="Description"><textarea className="textarea" /></Field>
      <Field label="Cities / languages"><input className="input" placeholder="Tel Aviv; ru,en,he" /></Field>
      <Field label="Team profiles"><input className="input" placeholder="@demo1, @demo2" /></Field>
      <Field label="Contact preferences"><input className="input" placeholder="business chat (demo)" /></Field>
      <label className="row"><input type="checkbox" /> Request organization verification</label>
      <button className="btn primary" onClick={() => { s.setRole('agency'); window.location.hash = '#/agency'; }}>Finish → Agency dashboard</button>
    </div>
  );
}

/* ---------- matrices ---------- */
export function RoleMatrix() {
  const rows: [string, string, string, string, string][] = [
    ['Browse/search/view', '✓', '✓', '✓', '✓'],
    ['like/comment/fav/follow/rate', '— (prompt)', '✓', '—', '—'],
    ['submit review/report', '—', '✓ moderated', 'own reports', 'own reports'],
    ['publish posts/shorts', '—', '—', '✓ per verification', '✓ per verification'],
    ['Trust&Safety private', '—', '—', 'verified only', 'verified only'],
    ['admin panel', '—', '—', '—', '— (separate service role)'],
  ];
  return (
    <div><h3>Role matrix (demo)</h3>
      <table className="table"><thead><tr><th>Capability</th><th>Guest</th><th>Client</th><th>Individual</th><th>Agency</th></tr></thead>
        <tbody>{rows.map(r => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody></table></div>
  );
}
export function PublicPrivateMatrix() {
  return (
    <div><h3>Public / private fields</h3>
      <table className="table"><thead><tr><th>Field</th><th>Public</th></tr></thead><tbody>
        {[['name/username/city/district(if allowed)/age/height/weight/languages', 'public'], ['rating/badges/agency affiliation', 'public'], ['public contact placeholders', 'public'], ['raw phone', 'NEVER public (demo-hidden)'], ['evidence/reporter/admin notes', 'private only'], ['pause reason', 'private (public: “Профиль временно недоступен.”)']].map(r => <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td></tr>)}
      </tbody></table></div>
  );
}

/* ---------- 8-13 feed ---------- */
export function HomePage() {
  const s = useStore();
  const [tab, setTab] = useState(s.feedTab);
  const posts = useMemo(() => {
    if (tab === 'following') return POSTS.filter(p => s.follows[p.profileId]).slice(0, 6);
    if (tab === 'latest') return [...POSTS].reverse().slice(0, 8);
    return POSTS.slice(0, 8);
  }, [tab, s.follows]);
  return (
    <div className="grid">
      <AuthNotice />
      <div className="card"><h3>Previews</h3><ReelsStrip /></div>
      <div className="card">
        <div className="tabs">
          {([['forYou', t('forYou', s.lang)], ['following', t('following', s.lang)], ['latest', t('latest', s.lang)]] as const).map(([k, l]) => (
            <button key={k} className={'tab' + (tab === k ? ' active' : '')} onClick={() => { setTab(k); s.setFeedTab(k); }}>{l}</button>
          ))}
        </div>
        <div className="grid">
          {tab === 'following' && posts.length === 0 && <div className="empty">No follows yet (demo). Follow profiles to fill this tab.<br /><Link className="btn small" href="#/directory">Open directory</Link></div>}
          {posts.map(p => <PostCard key={p.id} post={p} />)}
        </div>
      </div>
      <div className="grid cards-3">{PROFILES.slice(0, 3).map(p => <ProfileCard key={p.id} p={p} />)}</div>
    </div>
  );
}

export function ExplorePage() {
  return (
    <div className="grid">
      <AuthNotice />
      <div className="card"><h2>Explore (demo)</h2><ReelsStrip /></div>
      <div className="grid cards-3">{PROFILES.map(p => <ProfileCard key={p.id} p={p} />)}</div>
    </div>
  );
}

export function DirectoryPage() {
  const s = useStore();
  const [view, setView] = useState<'cards' | 'grid' | 'list' | 'feed'>('cards');
  const [drawer, setDrawer] = useState(false);
  const res = useMemo(() => applyFilters(s.filters), [s.filters]);
  return (
    <div className="grid">
      <AuthNotice />
      <div className="card grid">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <h2 style={{ margin: 0 }}>Directory · {res.length} results</h2>
          <div className="row">
            <button className="btn small" onClick={() => setDrawer(v => !v)}>Filters {drawer ? '▲' : '▼'}</button>
            {(['cards', 'grid', 'list', 'feed'] as const).map(v => <button key={v} className={'tab' + (view === v ? ' active' : '')} onClick={() => setView(v)}>{v}</button>)}
          </div>
        </div>
        {drawer && <div className="drawer"><FilterForm mobile /></div>}
        <details><summary className="muted">Desktop sidebar filters (also in Search page)</summary><FilterForm /></details>
        {view === 'list' ? (
          <div className="grid">{res.map(p => (
            <div key={p.id} className="card row" style={{ justifyContent: 'space-between' }}>
              <span className="row"><span className="avatar">{p.name[0]}</span><span><strong>{p.name}</strong> <span className="muted">{p.username} · {p.city}</span><br /><Stars v={p.rating} /> <span className="muted">({p.ratingCount})</span></span></span>
              <span className="row"><Badges p={p} /><Link className="btn small primary" href={`#/profile/${p.id}`}>Open</Link></span>
            </div>
          ))}</div>
        ) : view === 'feed' ? (
          <div className="grid">{POSTS.filter(p => res.some(r => r.id === p.profileId)).slice(0, 6).map(p => <PostCard key={p.id} post={p} />)}</div>
        ) : (
          <div className="grid cards-3">{res.map(p => <ProfileCard key={p.id} p={p} />)}</div>
        )}
        {res.length === 0 && <div className="empty">No results (demo no-result state). <button className="btn small" onClick={() => s.setFilters(DEFAULT_FILTERS)}>Reset</button></div>}
      </div>
    </div>
  );
}

export function SearchPage() {
  const s = useStore();
  const res = useMemo(() => applyFilters(s.filters), [s.filters]);
  return (
    <div className="grid">
      <div className="card"><h2>Search &amp; filters · {res.length}</h2><FilterForm /></div>
      <div className="grid cards-3">{res.map(p => <ProfileCard key={p.id} p={p} />)}</div>
      {res.length === 0 && <div className="card empty">Nothing found — try widening age/city (demo empty state).</div>}
    </div>
  );
}

export function NewPage() {
  const items = PROFILES.filter(p => p.isNew);
  return (
    <div className="grid">
      <div className="card"><h2>{'New profiles'} (demo)</h2><p className="muted">Fictional newest demo profiles.</p></div>
      <div className="grid cards-3">{items.map(p => <ProfileCard key={p.id} p={p} />)}</div>
    </div>
  );
}

export function NewRail() {
  const s = useStore();
  return (
    <div className="grid">{PROFILES.filter(p => p.isNew).slice(0, 3).map(p => (
      <div key={p.id} className="row" style={{ justifyContent: 'space-between' }}>
        <span className="row"><span className="avatar">{p.name[0]}</span><span><strong>{p.name}</strong><br /><span className="muted" style={{ fontSize: 12 }}>{p.city} · ★{p.rating}</span></span></span>
        <Link className="btn small" href={`#/profile/${p.id}`}>{t('viewProfile', s.lang)}</Link>
      </div>
    ))}</div>
  );
}

export function ReelsPage({ start }: { start?: string }) {
  const s = useStore();
  const vids = useMemo(() => { const arr = [...PROFILES]; const i = arr.findIndex(p => p.id === start); if (i > 0) return [...arr.slice(i), ...arr.slice(0, i)]; return arr; }, [start]);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const p = vids[idx % vids.length];
  const guard = () => { if (s.role === 'guest') { s.setAuthMsg('need-auth'); return false; } return true; };
  return (
    <div className="grid">
      <AuthNotice />
      <div className="viewer">
        <div style={{ textAlign: 'center', color: '#fff' }}>
          <div style={{ fontSize: 64 }}>{playing ? '▶' : '⏸'}</div>
          <h2 style={{ margin: '8px 0' }}>{p.name} · {p.theme}</h2>
          <p className="muted">demo short video · safe theme: {p.theme} · {muted ? 'muted' : 'sound on'} (visual mock, no real video file)</p>
          <div className="row" style={{ justifyContent: 'center' }}>
            <button className="btn small" onClick={() => setPlaying(v => !v)}>{playing ? 'Pause' : 'Play'}</button>
            <button className="btn small" onClick={() => setMuted(v => !v)}>{muted ? 'Unmute' : 'Mute'}</button>
            <button className="btn small" onClick={() => setIdx(i => (i + 1) % vids.length)}>Next →</button>
          </div>
        </div>
        <div className="viewer-actions">
          <button className="fab" onClick={() => s.toggleLike(p.id + '-reel', guard)} title="like">{s.likes[p.id + '-reel'] ? '♥' : '♡'}</button>
          <button className="fab" onClick={() => guard() && alert('Demo comments sheet (mock).')} title="comment">💬</button>
          <button className="fab" onClick={() => s.toggleFav(p.id, guard)} title="save">{s.favs[p.id] ? '♥' : '☆'}</button>
          <a className="fab" style={{ display: 'grid', placeItems: 'center', textDecoration: 'none' }} href={`#/profile/${p.id}`} title="profile">👤</a>
        </div>
      </div>
      <div className="row">
        <Link className="btn small primary" href={`#/profile/${p.id}`}>{t('viewProfile', s.lang)}</Link>
        <Link className="btn small ghost" href="#/reels">All shorts</Link>
        <span className="muted">{idx + 1} / {vids.length}</span>
      </div>
      <ReelsStrip />
    </div>
  );
}

/* ---------- 14-18 profile ---------- */
export function ProfilePage({ id }: { id: string }) {
  const s = useStore();
  const p = PROFILES.find(x => x.id === id) ?? PROFILES[0];
  const [tab, setTab] = useState<'posts' | 'shorts' | 'about' | 'reviews'>('posts');
  const guard = () => { if (s.role === 'guest') { s.setAuthMsg('need-auth'); return false; } return true; };
  if (p.paused) { window.setTimeout(() => { if (window.location.hash.startsWith('#/profile/')) window.location.hash = '#/paused'; }, 0); }
  const posts = POSTS.filter(x => x.profileId === p.id);
  const reviews = REVIEWS.filter(r => r.profileId === p.id && r.status === 'published');
  return (
    <div className="grid">
      <AuthNotice />
      <div className="card">
        <div className="cover" />
        <div className="row" style={{ marginTop: -30, alignItems: 'flex-end' }}>
          <span className="avatar lg">{p.name[0]}</span>
          <span><h2 style={{ margin: 0 }}>{p.name}</h2><span className="muted">{p.username} · {p.city}{p.district ? ` · ${p.district}` : ''} · {p.languages.join('/')}</span></span>
        </div>
        <div style={{ height: 8 }} /><Badges p={p} />
        <div className="row" style={{ marginTop: 8 }}>
          <span><Stars v={p.rating} /> <span className="muted">({fmtNum(p.ratingCount, s.lang)})</span></span>
          <span className="muted">♥ {fmtNum(p.likes, s.lang)} · 👁 {fmtNum(p.views, s.lang)} · ➕ {fmtNum(p.followers + (s.follows[p.id] ? 1 : 0), s.lang)}</span>
          {p.verified && <span className="muted" style={{ fontSize: 12 }}>{t('verifiedNote', s.lang)} {t('verifiedSub', s.lang)}</span>}
        </div>
        <div className="row" style={{ marginTop: 10, position: 'sticky' } as never}>
          <button className="btn small primary" onClick={() => s.toggleFollow(p.id, guard)}>{s.follows[p.id] ? 'Following ✓' : 'Follow'}</button>
          <button className="btn small" onClick={() => s.toggleFav(p.id, guard)}>{s.favs[p.id] ? '♥ Saved' : '♡ Favorite'}</button>
          <Link className="btn small" href={`#/rating/${p.id}`}>★ Rate</Link>
          <Link className="btn small ghost" href={`#/report?target=${p.username}`}>⚑ Report</Link>
        </div>
      </div>
      <div className="card">
        <div className="tabs">{(['posts', 'shorts', 'about', 'reviews'] as const).map(k => <button key={k} className={'tab' + (tab === k ? ' active' : '')} onClick={() => setTab(k)}>{k}</button>)}</div>
        {tab === 'posts' && <div className="grid">{posts.map(x => <PostCard key={x.id} post={x} />)}</div>}
        {tab === 'shorts' && <div className="grid"><ReelsStrip /><Link className="btn small primary" href={`#/reels?start=${p.id}`}>Open in viewer</Link></div>}
        {tab === 'about' && (
          <div className="grid">
            <div className="row"><span className="chip">age <b>{p.age || '—'}</b></span><span className="chip">height <b>{p.height || '—'}</b></span><span className="chip">weight <b>{p.weight || '—'}</b></span><span className="chip">city <b>{p.city}</b></span>{p.district && <span className="chip">district <b>{p.district}</b></span>}</div>
            <p>{p.about}</p>
            <h3>Permitted contacts</h3>
            {p.contacts.filter(c => s.role !== 'guest' ? true : c.isPublic).map(c => <div key={c.label} className="notice">{c.label}: <b>{c.isPublic ? c.value : 'demo-hidden (private)'}</b></div>)}
            {s.role === 'guest' && <div className="notice">Guest sees only public placeholders. Raw private phone is never shown.</div>}
            {!p.verified && <div className="notice">Unverified demo limits: max 3 photos · 1 video · limited publishing · reduced discovery. <Link href="#/verification/how">How to get verified</Link></div>}
          </div>
        )}
        {tab === 'reviews' && (
          <div className="grid">
            {reviews.map(r => <div key={r.id} className="notice">★{r.score} · {fmtDate(r.date, s.lang)}<br />{r.text}<br /><span className="muted" style={{ fontSize: 12 }}>fictional demo review · reviewer identity hidden</span></div>)}
            {reviews.length === 0 && <div className="empty">No published reviews yet (demo).</div>}
            <div className="row"><Link className="btn small primary" href={`#/review/new?target=${p.username}`}>Write review</Link><Link className="btn small" href="#/review/status">My review status</Link></div>
          </div>
        )}
      </div>
    </div>
  );
}

export function PostPage({ id }: { id: string }) {
  const post = POSTS.find(p => p.id === id) ?? POSTS[0];
  return <div className="grid"><Link className="btn small ghost" href="#/home">← Home</Link><PostCard post={post} />
    <div className="card"><h3>Comments (demo)</h3>{post.comments.map((c, i) => <div key={i} className="notice" style={{ marginBottom: 8 }}><strong>{c.user}</strong><br />{c.text}</div>)}
      <CommentBox /></div></div>;
}

function CommentBox() {
  const s = useStore();
  const [v, setV] = useState('');
  return (
    <div className="row">
      <input className="input" value={v} onChange={e => setV(e.target.value)} placeholder="Write a comment (demo)…" />
      <button className="btn small primary" onClick={() => { if (s.role === 'guest') { s.setAuthMsg('need-auth'); return; } alert('Demo: comment queued for moderation (mock).'); setV(''); }}>Send</button>
    </div>
  );
}

export function PausedPage() {
  return <div className="card empty" style={{ maxWidth: 560, margin: '0 auto' }}><h2>{'Профиль временно недоступен.'}</h2><p>Private pause reason is never shown. (Demo paused-profile state.)</p><Link className="btn small" href="#/directory">Back to directory</Link></div>;
}

export function FavoritesPage() {
  const s = useStore();
  const items = PROFILES.filter(p => s.favs[p.id]);
  return (
    <div className="grid"><AuthNotice />
      <div className="card"><h2>{t('favorites', s.lang)} · {items.length}</h2>
        {s.role === 'guest' && <div className="notice">{t('needAuth', s.lang)}</div>}</div>
      {items.length === 0 ? <div className="card empty">Nothing saved yet — tap ♡ on any profile (selected empty state with brand accent ◍).</div> :
        <div className="grid cards-3">{items.map(p => <ProfileCard key={p.id} p={p} />)}</div>}
    </div>
  );
}

/* ---------- 18-22 ratings/reviews/reports ---------- */
export function RatingPage({ id }: { id: string }) {
  const s = useStore();
  const p = PROFILES.find(x => x.id === id) ?? PROFILES[0];
  const cur = s.ratings[p.id] ?? 0;
  return (
    <div className="card grid" style={{ maxWidth: 520, margin: '0 auto' }}>
      <h2>Rate {p.name} (1–5)</h2>
      <p className="muted">One active rating per user/profile (demo). No self-rating (profile owners cannot rate themselves).</p>
      <div className="row">{[1, 2, 3, 4, 5].map(v => <button key={v} className={'btn' + (cur === v ? ' primary' : '')} onClick={() => {
        if (s.role === 'guest') { s.setAuthMsg('need-auth'); return; }
        s.setRating(p.id, v);
      }}>★{v}</button>)}</div>
      {cur > 0 && <div className="notice">Your active demo rating: ★{cur}. Submitting again replaces it (visual mock).</div>}
      <Link className="btn small" href={`#/review/new?target=${p.username}`}>Continue → write moderated review</Link>
    </div>
  );
}

export function ReviewFormPage({ target }: { target?: string }) {
  const s = useStore();
  const [text, setText] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <div className="card grid" style={{ maxWidth: 560, margin: '0 auto' }}>
      <h2>Review {target || ''} (moderated demo)</h2>
      <p className="muted">Prototype limit: max one new text review per day. Reviews are moderated; accusations are never published unmoderated.</p>
      <Field label="Score"><select className="select"><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select></Field>
      <Field label="Text"><textarea className="textarea" value={text} onChange={e => setText(e.target.value)} placeholder="Fictional demo feedback…" /></Field>
      {!sent ? <button className="btn primary" onClick={() => {
        if (s.role === 'guest') { s.setAuthMsg('need-auth'); return; }
        const last = Number(localStorage.getItem('i11.lastReview') || 0);
        if (Date.now() - last < 24 * 3600 * 1000) { alert('Demo limit: one review per day (mock).'); return; }
        localStorage.setItem('i11.lastReview', String(Date.now()));
        setSent(true);
      }}>Submit for moderation</button> :
        <div className="notice">Submitted → status: <b>pending moderation</b>. <Link href="#/review/status">Track status</Link></div>}
    </div>
  );
}

export function ReviewStatusPage() {
  return (
    <div className="card grid" style={{ maxWidth: 640, margin: '0 auto' }}>
      <h2>My reviews (demo)</h2>
      <table className="table"><thead><tr><th>ID</th><th>Profile</th><th>Status</th><th>Date</th></tr></thead><tbody>
        {REVIEWS.map(r => <tr key={r.id}><td>{r.id}</td><td>{r.profileId}</td><td>{r.status}</td><td>{r.date}</td></tr>)}
      </tbody></table>
      <p className="muted">States: pending → published / rejected, plus appeal state (see Appeals).</p>
      <Link className="btn small" href="#/appeals">Appeals</Link>
    </div>
  );
}

export function ReportPage({ target }: { target?: string }) {
  const s = useStore();
  const [done, setDone] = useState(false);
  return (
    <div className="card grid" style={{ maxWidth: 560, margin: '0 auto' }}>
      <h2>Report (private demo)</h2>
      <p className="muted">Reports are private. Never shown in public UI. Visual mock only.</p>
      <Field label="Target"><input className="input" defaultValue={target || '@demo'} /></Field>
      <Field label="Category"><select className="select"><option>Spam</option><option>Content issue</option><option>Safety concern</option><option>Other</option></select></Field>
      <Field label="Date / period"><input className="input" placeholder="approx. (demo)" /></Field>
      <Field label="Explanation"><textarea className="textarea" placeholder="Fictional demo explanation…" /></Field>
      <Field label="Evidence placeholder (no real upload)"><input className="input" type="file" /></Field>
      <label className="row"><input type="checkbox" /> Consent confirmation (demo)</label>
      {!done ? <button className="btn primary" onClick={() => { if (s.role === 'guest') { s.setAuthMsg('need-auth'); return; } setDone(true); }}>Submit → status tracking</button> :
        <div className="notice">Status: <b>submitted</b> → under review. Track in <Link href="#/trust">Trust &amp; Safety</Link>.</div>}
    </div>
  );
}

export function TrustPage() {
  const s = useStore();
  if (s.role === 'guest' || s.role === 'client') return <div className="card"><h2>Trust &amp; Safety (private)</h2><div className="notice">Available to verified individual profiles, verified agencies and admin (demo). {t('needAuth', s.lang)}</div><RoleMatrix /></div>;
  return (
    <div className="grid">
      <div className="card"><h2>Private Trust &amp; Safety (visual demo)</h2><p className="muted">No public blacklist, no public phones, no public evidence. Restricted preview placeholders only.</p></div>
      <div className="card"><h3>My reports</h3>
        <table className="table"><thead><tr><th>ID</th><th>Target</th><th>Category</th><th>Status</th><th>Date</th></tr></thead><tbody>
          {REPORTS.map(r => <tr key={r.id}><td>{r.id}</td><td>{r.target}</td><td>{r.category}</td><td>{r.status}</td><td>{r.date}</td></tr>)}
        </tbody></table>
        <div className="row"><Link className="btn small primary" href="#/report">New report</Link><span className="muted" style={{ fontSize: 12 }}>evidence: [restricted placeholder] · reporter identity hidden</span></div>
      </div>
    </div>
  );
}

/* ---------- verification ---------- */
export function VerificationPage() {
  return (
    <div className="grid" style={{ maxWidth: 720, margin: '0 auto' }}>
      <div className="card"><h2>Verification (demo)</h2>
        <p><strong>Фото проверены администрацией.</strong></p>
        <p className="muted">Материалы прошли проверку по правилам платформы на момент публикации.</p>
        <p className="muted">Statuses: unverified → submitted → under review → needs changes → verified / rejected / suspended. Visual support flow only — no real WhatsApp/Telegram/OAuth/storage.</p>
        <div className="row"><Link className="btn small primary" href="#/verification/how">How to get verified</Link></div></div>
      <div className="card"><h3>Demo limits</h3>
        <table className="table"><thead><tr><th></th><th>Unverified</th><th>Verified</th></tr></thead><tbody>
          <tr><td>Photos</td><td>max 3</td><td>expanded</td></tr>
          <tr><td>Video</td><td>max 1</td><td>expanded</td></tr>
          <tr><td>Publishing</td><td>limited</td><td>expanded</td></tr>
          <tr><td>Contacts</td><td>limited</td><td>approved options</td></tr>
          <tr><td>Discovery</td><td>reduced</td><td>boosted + badge</td></tr>
        </tbody></table></div>
    </div>
  );
}
export function HowVerifiedPage() {
  return (
    <div className="card grid" style={{ maxWidth: 640, margin: '0 auto' }}>
      <h2>How to get verified (visual flow)</h2>
      <ol><li>Complete profile (city, age, photos).</li><li>Submit request (mock button).</li><li>Admin review (see Moderation demo).</li><li>Needs changes → resubmit, or Verified badge.</li></ol>
      <button className="btn primary" onClick={() => alert('Demo: verification request submitted (mock).')}>Request verification (mock)</button>
      <p className="muted">No real uploads, no external messengers connected.</p>
    </div>
  );
}

/* ---------- dashboards + admin ---------- */
export function AgencyDash() {
  const s = useStore();
  if (s.role !== 'agency' && s.role !== 'admin') return <div className="card"><h2>Agency dashboard</h2><div className="notice">Demo: switch role to Agency to view. Current: {s.role}.</div></div>;
  return (
    <div className="grid">
      <div className="card"><h2>Agency dashboard (demo)</h2><p className="muted">Team links, publications per verification, audit-style record. No automatic access to private data.</p>
        <h3>Team</h3>{AGENCIES[0].team.map(id => { const p = PROFILES.find(x => x.id === id)!; return <div key={id} className="row" style={{ justifyContent: 'space-between' }}><span>{p.name} {p.username}</span><Link className="btn small" href={`#/profile/${id}`}>Open</Link></div>; })}</div>
      <div className="card"><h3>Audit log (visual)</h3><table className="table"><thead><tr><th>Actor</th><th>Date</th><th>Action</th><th>Prev</th><th>New</th></tr></thead><tbody>
        {AUDIT.map((a, i) => <tr key={i}><td>{a.actor}</td><td>{a.date}</td><td>{a.action}</td><td>{a.prev}</td><td>{a.next}</td></tr>)}</tbody></table></div>
    </div>
  );
}

export function IndividualDash() {
  const s = useStore();
  if (s.role !== 'individual' && s.role !== 'admin') return <div className="card"><h2>My dashboard</h2><div className="notice">Demo: switch role to Individual. Current: {s.role}.</div></div>;
  return (
    <div className="grid">
      <div className="card"><h2>Individual dashboard (demo)</h2><p className="muted">Edit public info, media per verification status, pause/resume, contacts, verification request.</p>
        <div className="row"><button className="btn small" onClick={() => alert('Demo: paused (mock). Public sees “Профиль временно недоступен.”')}>Pause profile</button><button className="btn small" onClick={() => alert('Demo: resumed (mock).')}>Resume</button><Link className="btn small primary" href="#/verification/how">Request verification</Link></div></div>
      <div className="card"><h3>Media limits (demo)</h3><p className="muted">Unverified: 3 photos / 1 video. Verified: expanded. Publishing follows verification status.</p></div>
    </div>
  );
}

function needAdmin(s: ReturnType<typeof useStore>) {
  return s.role === 'admin';
}

export function AdminDash() {
  const s = useStore();
  if (!needAdmin(s)) return <div className="card"><h2>Admin (service role)</h2><div className="notice">Separate service role — not granted by changing Guest/Client/Individual/Agency. Switch demo role to <b>admin</b> to preview. Current: {s.role}.</div></div>;
  const q = [
    ['Profiles pending', 4, '#/moderation'], ['Photos pending', 12, '#/moderation'], ['Posts pending', 7, '#/moderation'],
    ['Reviews pending', REVIEWS.filter(r => r.status === 'pending').length, '#/moderation'], ['Reports open', REPORTS.length, '#/trust'], ['Appeals', 2, '#/appeals'],
  ];
  return (
    <div className="grid">
      <div className="card"><h2>Admin dashboard (visual prototype)</h2><div className="grid cards-3">{q.map(([l, n, h]) => <div key={l as string} className="notice"><strong>{l}</strong><br /><span style={{ fontSize: 28 }}>{n as number}</span><br /><Link className="btn small" href={h as string}>Open</Link></div>)}</div></div>
      <div className="card"><h3>Audit log</h3><table className="table"><thead><tr><th>Actor</th><th>Date</th><th>Action</th><th>Prev</th><th>New</th></tr></thead><tbody>{AUDIT.map((a, i) => <tr key={i}><td>{a.actor}</td><td>{a.date}</td><td>{a.action}</td><td>{a.prev}</td><td>{a.next}</td></tr>)}</tbody></table></div>
    </div>
  );
}

export function ModerationPage() {
  const s = useStore();
  if (!needAdmin(s)) return <div className="card"><div className="notice">Admin only (demo). Current role: {s.role}.</div></div>;
  const [log, setLog] = useState<string[]>([]);
  const act = (m: string) => setLog(l => [`${new Date().toLocaleTimeString()} ${m}`, ...l]);
  return (
    <div className="grid">
      <div className="card"><h2>Moderation queue (visual)</h2><p className="muted">Profiles · photos · posts · short videos · reviews · verification · agencies · support tickets. Restricted preview placeholders.</p>
        <div className="grid">
          {PROFILES.slice(0, 4).map(p => <div key={p.id} className="row" style={{ justifyContent: 'space-between' }}><span className="row"><span className="avatar">{p.name[0]}</span><span><strong>{p.name}</strong> <span className="muted">{p.username} · [photo preview placeholder]</span></span></span><span className="row"><button className="btn small primary" onClick={() => act(`approve ${p.username}`)}>Approve</button><button className="btn small" onClick={() => act(`clarify ${p.username}`)}>Clarify</button><button className="btn small ghost" onClick={() => act(`reject ${p.username}`)}>Reject</button></span></div>)}
        </div></div>
      <div className="card"><h3>Action log (demo audit)</h3>{log.length === 0 ? <span className="muted">No actions yet.</span> : log.map((l, i) => <div key={i} className="muted">{l}</div>)}</div>
    </div>
  );
}

export function AppealsPage() {
  const s = useStore();
  return (
    <div className="card grid" style={{ maxWidth: 640, margin: '0 auto' }}>
      <h2>Appeals (demo)</h2>
      <table className="table"><thead><tr><th>ID</th><th>Subject</th><th>Status</th></tr></thead><tbody>
        <tr><td>APL-01</td><td>Review rejection (demo)</td><td>appealed</td></tr>
        <tr><td>APL-02</td><td>Report closure (demo)</td><td>under review</td></tr>
      </tbody></table>
      <div className="row"><button className="btn small primary" onClick={() => { if (s.role === 'guest') { s.setAuthMsg('need-auth'); return; } alert('Demo: appeal submitted (mock).'); }}>Submit appeal (mock)</button></div>
      <AuthNotice />
    </div>
  );
}

export function SupportPage() {
  const s = useStore();
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <div className="card grid" style={{ maxWidth: 560, margin: '0 auto' }}>
      <h2>Support (demo inbox)</h2>
      <Field label="Topic"><select className="select"><option>General</option><option>Verification</option><option>Safety</option><option>Agency</option></select></Field>
      <Field label="Message"><textarea className="textarea" value={msg} onChange={e => setMsg(e.target.value)} placeholder="Demo message…" /></Field>
      {!sent ? <button className="btn primary" onClick={() => { if (s.role === 'guest') { s.setAuthMsg('need-auth'); return; } setSent(true); }}>Send ticket (mock)</button> :
        <div className="notice">Ticket <b>SUP- demo-001</b> created (visual mock). Status: open.</div>}
      <AuthNotice />
    </div>
  );
}

export function SettingsPage() {
  const s = useStore();
  return (
    <div className="card grid" style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>Settings · themes · i18n/RTL</h2>
      <Field label="Language"><select className="select" value={s.lang} onChange={e => s.setLang(e.target.value as never)}><option value="ru">Русский</option><option value="en">English</option><option value="he">עברית (RTL)</option><option value="ar">العربية (RTL)</option></select></Field>
      <Field label="Theme"><select className="select" value={s.theme} onChange={e => s.setTheme(e.target.value as never)}><option value="dark">Dark theme (midnight)</option><option value="light">Light theme</option></select></Field>
      <Field label="Role (demo switcher)"><select className="select" value={s.role} onChange={e => s.setRole(e.target.value as never)}><option value="guest">Guest</option><option value="client">Client</option><option value="individual">Individual</option><option value="agency">Agency</option><option value="admin">Admin (service)</option></select></Field>
      <div className="row">
        <Link className="btn small" href="#/settings?lang=he">Hebrew RTL demo</Link>
        <Link className="btn small" href="#/settings?lang=ar">Arabic RTL demo</Link>
        <Link className="btn small" href="#/settings?theme=light">Light demo</Link>
        <Link className="btn small" href="#/settings?theme=dark">Dark demo</Link>
      </div>
      <div className="row"><span className="chip">320px</span><span className="chip">375px</span><span className="chip">768px</span><span className="chip">1024px</span><span className="chip">1440px</span></div>
      <p className="muted" style={{ fontSize: 13 }}>Logical CSS + dir=rtl for he/ar. Long-translation test: «Зарегистрируйтесь, чтобы пользоваться функциями платформы.» / «הירשמו כדי להשתמש בתכונות.» Dates/numbers via Intl.</p>
      <button className="btn small ghost" onClick={() => { localStorage.clear(); location.reload(); }}>Reset demo storage</button>
      <RoleMatrix /><PublicPrivateMatrix />
    </div>
  );
}

export function NotFound() {
  return <div className="card empty"><h2>Unknown route (demo)</h2><Link className="btn small primary" href="#/home">Go home</Link></div>;
}
