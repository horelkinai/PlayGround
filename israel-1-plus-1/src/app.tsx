import React, { useEffect, useState } from 'react';
import { useStore, type Role } from './store';
import { LANGS, t } from './i18n';
import { Logo } from './components';
import * as P from './pages';

export function Link({ href, children, className, style, label }: { href: string; children: React.ReactNode; className?: string; style?: React.CSSProperties; label?: string }) {
  return <a href={href} className={className} style={style} aria-label={label}>{children}</a>;
}

export function useRoute() {
  const [hash, setHash] = useState(() => window.location.hash || '#/welcome');
  useEffect(() => {
    const fn = () => setHash(window.location.hash || '#/welcome');
    window.addEventListener('hashchange', fn);
    return () => window.removeEventListener('hashchange', fn);
  }, []);
  const clean = hash.replace(/^#/, '');
  const [path, qs] = clean.split('?');
  const query = Object.fromEntries(new URLSearchParams(qs || '').entries());
  return { route: clean, path, query };
}

const NAV: { href: string; key: string }[] = [
  { href: '#/home', key: 'home' },
  { href: '#/explore', key: 'explore' },
  { href: '#/directory', key: 'directory' },
  { href: '#/reels', key: 'reels' },
  { href: '#/favorites', key: 'favorites' },
];

export function App() {
  const s = useStore();
  const { route, path, query } = useRoute();
  const rtl = LANGS.find(l => l.code === s.lang)?.rtl;

  useEffect(() => {
    document.documentElement.lang = s.lang;
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
  }, [s.lang, rtl]);

  // theme/lang demo via query (?theme=light&lang=he) — re-run on ANY route change
  useEffect(() => {
    if (query.theme === 'light' || query.theme === 'dark') s.setTheme(query.theme);
    if (query.lang && ['ru', 'en', 'he', 'ar'].includes(query.lang)) s.setLang(query.lang as never);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  // age gate: force to welcome/age unless passed (but allow those pages)
  const openPages = ['/welcome', '/age', '/account-type', '/signin', '/rules', '/privacy'];
  const needsGate = !s.ageOk && !openPages.some(p => path.startsWith(p)) && path !== '/' && path !== '';
  useEffect(() => { if (needsGate) window.location.hash = '#/welcome'; }, [needsGate, path]);

  let page: React.ReactNode = <P.HomePage />;
  if (path === '/' || path === '') page = <P.WelcomePage />;
  else if (path === '/welcome') page = <P.WelcomePage />;
  else if (path === '/age') page = <P.AgePage />;
  else if (path === '/rules') page = <P.RulesPage />;
  else if (path === '/privacy') page = <P.PrivacyPage />;
  else if (path === '/account-type') page = <P.AccountTypePage />;
  else if (path === '/signin') page = <P.SignInPage />;
  else if (path === '/onboarding/client') page = <P.ClientOnboarding />;
  else if (path === '/onboarding/individual') page = <P.IndividualOnboarding />;
  else if (path === '/onboarding/agency') page = <P.AgencyOnboarding />;
  else if (path === '/home') page = <P.HomePage />;
  else if (path === '/explore') page = <P.ExplorePage />;
  else if (path === '/directory') page = <P.DirectoryPage />;
  else if (path === '/search') page = <P.SearchPage />;
  else if (path === '/new') page = <P.NewPage />;
  else if (path === '/reels') page = <P.ReelsPage start={query.start} />;
  else if (path.startsWith('/profile/')) page = <P.ProfilePage id={path.split('/')[2]} />;
  else if (path.startsWith('/post/')) page = <P.PostPage id={path.split('/')[2]} />;
  else if (path === '/paused') page = <P.PausedPage />;
  else if (path === '/favorites') page = <P.FavoritesPage />;
  else if (path === '/support') page = <P.SupportPage />;
  else if (path.startsWith('/rating/')) page = <P.RatingPage id={path.split('/')[2]} />;
  else if (path === '/review/new') page = <P.ReviewFormPage target={query.target} />;
  else if (path === '/review/status') page = <P.ReviewStatusPage />;
  else if (path === '/report') page = <P.ReportPage target={query.target} />;
  else if (path === '/trust') page = <P.TrustPage />;
  else if (path === '/verification') page = <P.VerificationPage />;
  else if (path === '/verification/how') page = <P.HowVerifiedPage />;
  else if (path === '/agency') page = <P.AgencyDash />;
  else if (path === '/me') page = <P.IndividualDash />;
  else if (path === '/admin') page = <P.AdminDash />;
  else if (path === '/moderation') page = <P.ModerationPage />;
  else if (path === '/appeals') page = <P.AppealsPage />;
  else if (path === '/settings') page = <P.SettingsPage />;
  else page = <P.NotFound />;

  const roleLabel: Record<Role, string> = { guest: 'Guest', client: 'Client', individual: 'Individual', agency: 'Agency', admin: 'Admin (service)' };

  return (
    <div className="app">
      <header className="topbar">
        <a href="#/home" aria-label="Israel 1+1 home"><Logo /></a>
        <nav className="desktop" aria-label="primary">
          {NAV.map(n => (
            <a key={n.href} href={n.href} className={'navlink' + (('#' + path) === n.href.replace('#', '') || ('#' + path) === n.href ? ' active' : '')}>{t(n.key, s.lang)}</a>
          ))}
          <a href="#/support" className="navlink">{t('support', s.lang)}</a>
          <a href="#/settings" className="navlink">{t('settings', s.lang)}</a>
        </nav>
        <div className="row" style={{ marginInlineStart: 'auto', gap: 6 }}>
          <select className="select" style={{ width: 'auto', minHeight: 36 }} value={s.lang} onChange={e => s.setLang(e.target.value as never)} aria-label="language">
            {LANGS.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
          </select>
          <select className="select" style={{ width: 'auto', minHeight: 36 }} value={s.role} onChange={e => s.setRole(e.target.value as Role)} aria-label="role (demo switcher)" title="Demo role switcher">
            {(['guest', 'client', 'individual', 'agency', 'admin'] as Role[]).map(r => <option key={r} value={r}>{roleLabel[r]}</option>)}
          </select>
        </div>
      </header>

      <div className="layout">
        <aside className="rail-left">
          <div className="card grid">
            <Logo />
            <nav className="grid">
              {NAV.map(n => <a key={n.href} href={n.href} className="navlink">{t(n.key, s.lang)}</a>)}
              <a href="#/new" className="navlink">{t('newProfiles', s.lang)}</a>
              <a href="#/trust" className="navlink">Trust &amp; Safety (private demo)</a>
              <a href="#/verification" className="navlink">Verification</a>
              <a href="#/agency" className="navlink">Agency</a>
              <a href="#/me" className="navlink">My dashboard</a>
              <a href="#/admin" className="navlink">{t('admin', s.lang)}</a>
            </nav>
            <div className="notice" style={{ fontSize: 12 }}>Prototype · fictional demo data only. No real backend, no real personal data.</div>
          </div>
        </aside>
        <main>{page}</main>
        <aside className="rail-right">
          <div className="grid">
            <div className="card"><h3>{t('newProfiles', s.lang)}</h3><P.NewRail /></div>
            <div className="card"><h3>{t('support', s.lang)}</h3><p className="muted" style={{ fontSize: 13 }}>Demo support inbox. Visual mock only.</p><a className="btn small" href="#/support">Open support</a></div>
            <div className="card"><h3>Safety</h3><p className="muted" style={{ fontSize: 13 }}>Private Trust &amp; Safety demo. Never public.</p><a className="btn small" href="#/trust">Open Trust &amp; Safety</a></div>
          </div>
        </aside>
      </div>

      <nav className="bottomnav" aria-label="mobile"><div className="in">
        <a href="#/home">⌂<br />{t('home', s.lang)}</a>
        <a href="#/directory">▦<br />{t('directory', s.lang)}</a>
        <a href="#/reels">▶<br />{t('reels', s.lang)}</a>
        <a href="#/favorites">♡<br />{t('favorites', s.lang)}</a>
        <a href="#/settings">⚙<br />{t('settings', s.lang)}</a>
      </div></nav>

      <footer className="footer">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Logo size={28} /> © 2026 Israel 1+1 · clickable prototype · fictional data</span>
          <span><a href="#/rules">Rules</a> · <a href="#/privacy">Privacy</a> · <a href="#/verification/how">How to get verified</a> · theme:{s.theme} · lang:{s.lang}{rtl ? ' · RTL' : ''}</span>
        </div>
      </footer>
    </div>
  );
}
