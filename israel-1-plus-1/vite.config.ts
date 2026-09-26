import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // no external CDN / font / image requests: prototype must work offline
    assetsInlineLimit: 8192
  },
  server: { port: 3002, host: true, allowedHosts: true },
  // allow the public preview tunnel host (e.g. *.trycloudflare.com);
  // CLI flags in start.sh (--port/--host) still take precedence
  preview: { port: 3000, host: true, allowedHosts: true }
});
