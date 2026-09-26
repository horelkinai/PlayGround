import React from 'react';
import { createRoot } from 'react-dom/client';
import { StoreProvider } from './store';
import { App } from './app';
import './styles.css';

const el = document.getElementById('root');

function bootFail(err: unknown) {
  const msg = err instanceof Error ? err.message : String(err);
  if (el) {
    el.innerHTML =
      '<div style="font:15px system-ui;padding:24px;max-width:640px;margin:0 auto">' +
      '<h2 style="margin:0 0 8px">Israel 1+1 — prototype failed to start</h2>' +
      '<p style="color:#8a8178">Rebuild: <code>npm install &amp;&amp; npm run build</code></p>' +
      `<pre style="white-space:pre-wrap;color:#cf4444">${msg.replace(/</g, '&lt;')}</pre></div>`;
  }
}

if (!el) {
  bootFail('no #root element');
} else {
  try {
    createRoot(el).render(
      <React.StrictMode>
        <StoreProvider><App /></StoreProvider>
      </React.StrictMode>
    );
  } catch (e) {
    bootFail(e);
  }
  addEventListener('error', e => console.error('[i11] runtime error', e.message));
  addEventListener('unhandledrejection', e => console.error('[i11] rejection', String(e.reason)));
}
