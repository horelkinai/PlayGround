// Post-build: inline JS + CSS into dist/index.html so the prototype is a single
// self-contained file. Works from any static server AND when opened directly
// from disk (inline module scripts do not need network/CORS).
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const htmlPath = join(dist, 'index.html');
if (!existsSync(htmlPath)) { console.error('dist/index.html missing'); process.exit(1); }

let html = readFileSync(htmlPath, 'utf8');
const assetsDir = join(dist, 'assets');
const files = existsSync(assetsDir) ? readdirSync(assetsDir) : [];

const esc = s => s.replace(/<\/script/gi, '<\\/script').replace(/<!--/g, '<\\!--');

for (const f of files) {
  const p = join(assetsDir, f);
  if (f.endsWith('.css')) {
    const css = readFileSync(p, 'utf8').replace(/<\/style/gi, '<\\/style');
    html = html.replace(new RegExp(`<link[^>]*href="[^"]*${f}"[^>]*>`, 'g'), `<style>${css}</style>`);
  } else if (f.endsWith('.js')) {
    const js = esc(readFileSync(p, 'utf8'));
    html = html.replace(new RegExp(`<script[^>]*src="[^"]*${f}"[^>]*></script>`, 'g'), () => `<script type="module">${js}</script>`);
  }
}

// safety: no leftover external asset references
const leftovers = [...html.matchAll(/(?:src|href)="\.\/assets\/[^"]+"/g)].map(m => m[0]);
if (leftovers.length) {
  console.error('not inlined:', leftovers.join(', '));
  process.exit(1);
}


const noscript = `<noscript><div style="font:16px system-ui;padding:24px">Israel 1+1 prototype requires JavaScript.</div></noscript>`;
html = html.replace('</body>', `${noscript}</body>`);

writeFileSync(htmlPath, html);
const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
console.log(`inlined assets -> dist/index.html (${kb} kB, self-contained)`);
