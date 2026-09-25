#!/usr/bin/env bash
# Serve the built production app in the foreground on PORT (default 3000).
# Steps: cd to project dir, install deps when needed, build when needed,
# publish deployment-output.json, then run the Nitro/srvx server (foreground).
set -euo pipefail

cd "$(dirname "$0")"
PROJECT_ROOT="$PWD"

PORT="${PORT:-3000}"
export PORT

STATIC_DIR="$PROJECT_ROOT/.vercel/output/static"
SERVER_ENTRY="$PROJECT_ROOT/.vercel/output/functions/__server.func/index.mjs"
OUTPUT_JSON="/home/runner/work/_temp/omgithub-web/deployment-output.json"

/usr/bin/time -p mkdir -p "$(dirname "$OUTPUT_JSON")"

# Install dependencies when node_modules is missing/incomplete or lockfile changed.
NEED_INSTALL=0
if [ ! -d "$PROJECT_ROOT/node_modules" ]; then NEED_INSTALL=1; fi
if [ ! -x "$PROJECT_ROOT/node_modules/.bin/srvx" ]; then NEED_INSTALL=1; fi
if [ ! -f "$PROJECT_ROOT/node_modules/.package-lock.json" ] && [ ! -d "$PROJECT_ROOT/node_modules/vite" ]; then NEED_INSTALL=1; fi
if [ "$PROJECT_ROOT/package-lock.json" -nt "$PROJECT_ROOT/node_modules" ]; then NEED_INSTALL=1; fi
if [ "$NEED_INSTALL" -eq 1 ]; then
  if [ -f "$PROJECT_ROOT/package-lock.json" ]; then
    /usr/bin/time -p npm ci --no-audit --no-fund
  else
    /usr/bin/time -p npm install --no-audit --no-fund
  fi
else
  echo "Dependencies are up to date, skipping install."
fi

# Build when the production output is missing or any source is newer than it.
NEED_BUILD=0
if [ ! -f "$SERVER_ENTRY" ] || [ ! -d "$STATIC_DIR" ]; then
  NEED_BUILD=1
elif [ -n "$(find src public server scripts package.json package-lock.json vite.config.ts -newer "$SERVER_ENTRY" -print -quit 2>/dev/null)" ]; then
  NEED_BUILD=1
fi
if [ "$NEED_BUILD" -eq 1 ]; then
  /usr/bin/time -p npm run build
else
  echo "Build output is up to date, skipping build."
fi

# Publish the built static directory for the deployment controller.
/usr/bin/time -p node -e '
const fs = require("node:fs");
const path = require("node:path");
const project = process.argv[1];
const directory = process.argv[2];
const targets = [process.argv[3]];
if (process.env.OPENCODE_WEB_DIR) targets.push(process.env.OPENCODE_WEB_DIR + "/deployment-output.json");
const payload = JSON.stringify({ project, directory });
for (const target of targets) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, payload);
  console.log("Wrote " + target + ": " + payload);
}
' "$PROJECT_ROOT" "$STATIC_DIR" "$OUTPUT_JSON"

/usr/bin/time -p test -d "$STATIC_DIR"
/usr/bin/time -p test -f "$SERVER_ENTRY"

# Foreground production server (controller runs this script under tmux).
/usr/bin/time -p node "$PROJECT_ROOT/node_modules/srvx/bin/srvx.mjs" --prod --host 0.0.0.0 --port "$PORT" --static "$STATIC_DIR" "$SERVER_ENTRY"
