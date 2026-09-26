import React from 'react';
import { Link, useRoute } from './app';
import { useStore } from './store';
import { t } from './i18n';
import type { DemoProfile, DemoPost } from './data';
import { PROFILES } from './data';

export function Logo({ size = 38 }: { size?: number }) {
  return (
    <span className="brand">
      <span className="brand-mark" style={{ width: size, height: size }} aria-hidden>1+1</span>
      <span>
        <span className="brand-name">Israel 1+1</span><br />
        <span className="brand-sub">social directory · prototype</span>
      </span>
      <img src="data:," alt="Israel 1+1" className="sr" />
    </span>
  );
}

export function Badges({ p }: { p: DemoProfile }) {
  return (
    <span className="row" style={{ gap: 6 }}>
      {p.verified && <span className="badge verified">✓ Verified</span>}
      {p.vip && <span className="badge vip">★ VIP</span>}
      {p.top && <span className="badge top">▲ TOP</span>}
      {p.isNew && <span className="badge gray">NEW</span>}
      {p.agency && <span className="badge gray">◈ {p.agency}</span>}
    </span>
  );
}

export function Stars({ v }: { v: number }) {
  return <span aria-label={`rating ${v}`}>★ {v.toFixed(1)}</span>;
}

export function ProfileCard({ p }: { p: DemoProfile }) {
  const s = useStore();
  const guard = () => { if (s.role === 'guest') { s.setAuthMsg('need-auth'); return false; } return true; };
  return (
    <article className="card" style={{ padding: 12 }}>
      <div className="ph" aria-label={`demo photo ${p.name}`}>demo photo · {p.theme}<br />{p.city} · {p.age > 0 ? p.age : '—'}</div>
      <div style={{ height: 10 }} />
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <strong>{p.name}</strong>
        <button className="btn small ghost" onClick={() => s.toggleFav(p.id, guard)} aria-label="favorite">{s.favs[p.id] ? '♥' : '♡'}</button>
      </div>
      <div className="muted" style={{ fontSize: 13 }}>{p.username} · {p.city}{p.district ? ` · ${p.district}` : ''}</div>
      <div className="muted" style={{ fontSize: 13 }}>{p.age > 0 ? `${p.age} · ${p.height}cm · ${p.weight}kg · ${p.languages.join('/')}` : p.about}</div>
      <div className="row" style={{ marginTop: 6 }}><Stars v={p.rating} /><span className="muted" style={{ fontSize: 12 }}>({p.ratingCount})</span></div>
      <div style={{ height: 6 }} />
      <Badges p={p} />
      <div className="row" style={{ marginTop: 10 }}>
        <Link className="btn small primary" href={`#/profile/${p.id}`}>{t('viewProfile', s.lang)}</Link>
      </div>
    </article>
  );
}

export function PostCard({ post }: { post: DemoPost }) {
  const s = useStore();
  const p = PROFILES.find(x => x.id === post.profileId)!;
  const guard = () => { if (s.role === 'guest') { s.setAuthMsg('need-auth'); return false; } return true; };
  return (
    <article className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div className="row" style={{ padding: '12px 14px 8px' }}>
        <span className="story-ring" style={{ padding: 2 }}><span className="avatar" style={{ width: 36, height: 36, fontSize: 15 }} aria-hidden>{p.name[0]}</span></span>
        <span><strong>{p.name}</strong> <span className="muted">· {p.username}</span><br />
          <span className="muted" style={{ fontSize: 12 }}>{p.city} · {p.languages.join('/')}</span></span>
        <span style={{ marginInlineStart: 'auto' }}><Badges p={p} /></span>
      </div>
      <div className="ph" style={{ borderRadius: 0, borderInline: 'none' }}>{post.kind} · demo {post.theme}</div>
      <div className="post-actions" style={{ padding: '4px 8px 0' }}>
        <button className={'iconbtn' + (s.likes[post.id] ? ' liked' : '')} onClick={() => s.toggleLike(post.id, guard)} aria-label="like">{s.likes[post.id] ? '♥' : '♡'}</button>
        <Link className="iconbtn" href={`#/post/${post.id}`} label="comments">💬</Link>
        <button className="iconbtn" onClick={() => guard() && alert('Demo: link copied (visual mock).')} aria-label="share">↗</button>
        <span style={{ flex: 1 }} />
        <button className={'iconbtn' + (s.favs[p.id] ? ' liked' : '')} onClick={() => s.toggleFav(p.id, guard)} aria-label="save">{s.favs[p.id] ? '♥' : '♡'}</button>
      </div>
      <div style={{ padding: '0 14px 6px' }} className="post-count">{post.likes + (s.likes[post.id] ? 1 : 0)} likes · {post.comments.length} comments</div>
      <p style={{ padding: '0 14px', margin: '6px 0' }}><strong>{p.username}</strong> {post.caption}</p>
      <div className="row" style={{ padding: '0 14px 14px' }}>
        <Link className="btn small ghost" href={`#/post/${post.id}`}>💬 {post.comments.length}</Link>
        <button className="btn small ghost" onClick={() => guard() ? (window.location.hash = `#/report?target=${p.username}`) : undefined}>⚑ Report</button>
        <Link className="btn small" href={`#/profile/${p.id}`}>{t('viewProfile', s.lang)}</Link>
      </div>
    </article>
  );
}

export function AuthNotice() {
  const s = useStore();
  const { route } = useRoute();
  if (s.authMsg == null) return null;
  void route;
  return (
    <div className="notice" role="alert" style={{ marginBottom: 12 }}>
      {t('needAuth', s.lang)}{' '}
      <Link className="btn small primary" href="#/signin">Sign in</Link>{' '}
      <button className="btn small ghost" onClick={() => s.setAuthMsg(null)}>✕</button>
    </div>
  );
}

export function ReelsStrip() {
  const items = PROFILES.slice(0, 8);
  return (
    <div className="strip" aria-label="short video previews">
      {items.map(p => (
        <Link key={p.id} className="story" href={`#/reels?start=${p.id}`}>
          <span className="story-ring"><span className="avatar" aria-hidden>{p.name[0]}</span></span>
          <span>{p.name.split(' ')[0]}</span>
        </Link>
      ))}
    </div>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="grid" style={{ gap: 4 }}><span className="muted" style={{ fontSize: 13 }}>{label}</span>{children}</label>;
}
