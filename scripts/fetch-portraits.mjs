/**
 * Downloads commercially-usable portrait photos from the Openverse API into
 * public/portraits/generated and records per-image license/attribution.
 *
 * Why Openverse: it needs no API key (Unsplash/Pexels/Pixabay need one and
 * Unsplash review can take days), it is a search index over Creative Commons
 * works, and it returns license metadata for every hit, so we can restrict
 * ourselves to licenses that are both commercial and modification-allowed.
 *
 * The /thumb/ endpoint is used rather than the original file: the proxy
 * resizes to 600x848 (~50 KB) which is what a profile card needs, and keeps
 * public/ from ballooning.
 *
 *   node scripts/fetch-portraits.mjs [--count=200] [--out=public/portraits/generated]
 */
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

const API = "https://api.openverse.org/v1/images/";
const UA = "israel-directory-demo/1.0 (profile image fetcher)";

const arg = (name, fallback) => {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
};

const COUNT = Number(arg("count", "200"));
const OUT_DIR = resolve(process.cwd(), arg("out", "public/portraits/generated"));
const CREDITS = resolve(OUT_DIR, "CREDITS.json");
const PAGE_SIZE = 20;
const TILE = 400;

/* Kept deliberately plain: stock-style adult portraiture that is common in the
   CC corpus. Nothing explicit, nothing sourced from adult sites. */
const QUERIES = [
  "woman portrait",
  "portrait woman studio",
  "fashion model portrait",
  "elegant woman portrait",
  "woman headshot",
  "smiling woman portrait",
  "female portrait photography",
  "woman profile picture",
  "glamour portrait woman",
  "young woman portrait",
  "woman face portrait",
  "studio photography model",
  "portrait photography woman light",
  "woman portrait outdoor",
  "model agency portrait",
];

async function getJson(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function collect() {
  const seen = new Set();
  const hits = [];
  for (const q of QUERIES) {
    if (hits.length >= COUNT * 2) break; // enough candidates to survive dedupe+bad downloads
    for (let page = 1; page <= 3 && hits.length < COUNT * 2; page++) {
      const url = `${API}?q=${encodeURIComponent(q)}&license_type=commercial,modification&page_size=${PAGE_SIZE}&page=${page}&mature=false`;
      let data;
      try {
        data = await getJson(url);
      } catch (err) {
        console.warn(`  ! ${q} p${page}: ${err.message}`);
        await sleep(1500);
        continue;
      }
      for (const r of data.results ?? []) {
        if (!r?.id || seen.has(r.id)) continue;
        // people photos only; skip anything that smells like non-portrait media
        if (r.filetype && !/^image\/(jpeg|jpg|png|webp)$/i.test(r.filetype)) continue;
        seen.add(r.id);
        hits.push(r);
      }
      await sleep(400);
    }
    console.log(`  ${q}: ${hits.length} candidates`);
  }
  return hits;
}

async function download(r, i) {
  const name = `p${String(i).padStart(3, "0")}.webp`;
  const res = await fetch(r.thumbnail, { headers: { "User-Agent": UA } });
  if (!res.ok) return null;
  const raw = Buffer.from(await res.arrayBuffer());
  // Guard against error pages and tiny placeholders being saved as portraits.
  if (raw.length < 8_000) return null;
  if (raw[0] !== 0xff || raw[1] !== 0xd8) return null; // JPEG SOI

  // One 400x400 WebP per image serves both the avatar slot and the profile
  // grid: ~20 KB instead of ~50 KB for the 600x848 proxy JPEG.
  const buf = await sharp(raw)
    .resize(TILE, TILE, { fit: "cover", position: "attention" })
    .webp({ quality: 72 })
    .toBuffer();
  await writeFile(resolve(OUT_DIR, name), buf);
  return {
    file: `/portraits/generated/${name}`,
    bytes: buf.length,
    title: r.title ?? null,
    creator: r.creator ?? null,
    license: r.license ?? null,
    license_version: r.license_version ?? null,
    license_url: r.license_url ?? null,
    provider: r.provider ?? null,
    source_page: r.foreign_landing_url ?? null,
    original: r.url ?? null,
    openverse_id: r.id,
  };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Collecting Openverse candidates (commercial + modifiable)…`);
  const hits = await collect();
  console.log(`Candidates: ${hits.length}`);

  const kept = [];
  for (const r of hits) {
    if (kept.length >= COUNT) break;
    try {
      const rec = await download(r, kept.length + 1);
      if (rec) {
        kept.push(rec);
        if (kept.length % 20 === 0) console.log(`  saved ${kept.length}/${COUNT}`);
      }
    } catch (err) {
      console.warn(`  ! download failed: ${err.message}`);
    }
  }

  await writeFile(
    CREDITS,
    JSON.stringify(
      {
        note:
          "Photos fetched from the Openverse API restricted to licenses that are both " +
          "commercial and modification-allowed (CC0 / PDM / CC-BY / CC-BY-SA). Attribution " +
          "below is required for CC-BY and CC-BY-SA works; keep this file with the dataset.",
        source: "https://api.openverse.org/v1/images/",
        filter: "license_type=commercial,modification&mature=false",
        fetched: new Date().toISOString(),
        count: kept.length,
        images: kept,
      },
      null,
      2,
    ),
  );

  const total = kept.reduce((n, k) => n + k.bytes, 0);
  console.log(`\nSaved ${kept.length} portraits -> ${OUT_DIR}`);
  console.log(`Total ${(total / 1_048_576).toFixed(1)} MB, credits -> ${CREDITS}`);
}

main();
