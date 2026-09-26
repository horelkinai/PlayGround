#!/usr/bin/env bash
# Israel 1+1 custom start: serve israel-1-plus-1/dist in the FOREGROUND on $PORT.
# Writes $OPENCODE_WEB_DIR/deployment-output.json for the controller.
set -euo pipefail
cd "$(dirname "$0")/israel-1-plus-1"
APP_DIR="$PWD"
PROJECT_ROOT="$(dirname "$PWD")"
PORT="${PORT:-3000}"
export PORT
WEB_DIR="${OPENCODE_WEB_DIR:-/home/runner/work/_temp/omgithub-web}"
/usr/bin/time -p test -f "$APP_DIR/package.json"
/usr/bin/time -p mkdir -p "$WEB_DIR"
/usr/bin/time -p test -d "$APP_DIR/src"
/usr/bin/time -p bash -c 'if [ ! -x "$0/node_modules/.bin/vite" ]; then npm --prefix "$0" install --no-audit --no-fund; fi' "$APP_DIR"
/usr/bin/time -p bash -c 'need=0; [ -f "$0/dist/index.html" ] || need=1; if [ "$need" = 0 ] && [ -d "$0/src" ] && [ -n "$(find "$0/src" -newer "$0/dist/index.html" -print -quit 2>/dev/null)" ]; then need=1; fi; if [ "$need" = 1 ]; then npm --prefix "$0" run build; else echo "dist up to date, skipping build"; fi' "$APP_DIR"
/usr/bin/time -p test -f "$APP_DIR/dist/index.html"
/usr/bin/time -p env "PROJECT_ROOT=$PROJECT_ROOT" "APP_DIR=$APP_DIR" "WEB_DIR=$WEB_DIR" node -e 'const fs=require("fs"),p=require("path");fs.writeFileSync(p.join(process.env.WEB_DIR,"deployment-output.json"),JSON.stringify({project:process.env.PROJECT_ROOT,directory:p.join(process.env.APP_DIR,"dist")}));console.log("deployment-output.json written");'
exec /usr/bin/time -p ./node_modules/.bin/vite preview --port "$PORT" --strictPort --host 0.0.0.0
