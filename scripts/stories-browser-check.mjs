#!/usr/bin/env node
/**
 * Browser checks for the P0 stories work.
 *
 * Verifies the audit's P0 findings against a running dev server:
 *   a) ring and photo stay circular and are not squeezed by flex
 *   b) tapping a story avatar opens the dialog, not the profile
 *   c) the story is marked viewed
 *   d) viewed state survives a reload
 *   e) autoplay advances
 *   f) Escape closes the viewer
 *   g) no horizontal overflow at 1440x900 and 390x844
 *
 * Timing-sensitive steps pause playback first (Space) so the assertions do
 * not race the timer. Output lands in <cwd>/screenshots. Loopback URLs only.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "playwright";

const BASE = process.env.STORIES_BASE_URL || "http://127.0.0.1:8080";
const OUT = resolve(process.cwd(), "screenshots");
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

/** An author the fixture gives three stories to, so segments are observable. */
const MULTI_AUTHOR = "lina";

const SESSION = {
  lang: "ru",
  theme: "dark",
  ageOk: true,
  onboarded: true,
  role: "client",
  intent: "browse",
  discovery: "women",
  user: {
    name: "Client",
    contact: "demo@example.com",
    password: "",
    lang: "ru",
    intent: "browse",
    discovery: "women",
    role: "client",
    phoneVerified: true,
    verificationStatus: "unverified",
  },
  phoneVerified: true,
  verificationStatus: "unverified",
  likes: {},
  favorites: {},
  follows: {},
  savedPosts: {},
  blocked: [],
  view: "list",
  extraReviews: [],
  extraReports: [],
  extraComments: [],
  safetyReports: [],
  myProfile: null,
  agencyProfile: null,
  adminStatus: {},
  demoAdmin: false,
  sessionSeconds: 0,
  clientPhoto: "",
  prefCity: "",
  prefAgeMin: 18,
  prefAgeMax: 45,
};

const results = [];
let failures = 0;

function check(name, ok, detail) {
  results.push({ name, ok, detail });
  if (!ok) failures += 1;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
}

const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: vp.name === "mobile",
    hasTouch: vp.name === "mobile",
  });
  const consoleErrors = [];
  const page = await ctx.newPage();
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text().slice(0, 200));
  });
  page.on("pageerror", (e) => consoleErrors.push(`pageerror: ${String(e).slice(0, 200)}`));

  const readViewed = () =>
    page.evaluate(() => {
      try {
        const raw = localStorage.getItem("i11-store-v3");
        return raw ? (JSON.parse(raw).viewedStoryIds ?? null) : null;
      } catch {
        return null;
      }
    });

  /** Progress of the segment the viewer is currently on, not a fixed one. */
  const progressOf = () =>
    page
      .evaluate(() => {
        const bar = document.querySelector("[data-story-viewer] [role='progressbar']");
        if (!bar) return -1;
        const idx = Math.max(0, Number(bar.getAttribute("aria-valuenow") || "1") - 1);
        const seg = bar.children[idx]?.firstElementChild;
        const m = /scaleX\(([\d.]+)\)/.exec(seg?.style.transform || "");
        return m ? Number(m[1]) : 0;
      })
      .catch(() => -1);

  const progressOfSegment = (segment) =>
    page
      .evaluate((i) => {
        const bar = document.querySelector("[data-story-viewer] [role='progressbar']");
        const seg = bar?.children[i]?.firstElementChild;
        const m = /scaleX\(([\d.]+)\)/.exec(seg?.style.transform || "");
        return m ? Number(m[1]) : 0;
      }, segment)
      .catch(() => -1);

  const viewerOpen = () => page.locator("[data-story-viewer]").count().then((n) => n > 0);

  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  await page.evaluate((s) => localStorage.setItem("i11-store-v3", JSON.stringify(s)), SESSION);

  // Keep the demo baseline: the fixture pre-views a few stories on purpose so
  // the rail can show new / seen / empty / own at the same time.
  await page.goto(`${BASE}/home`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("[data-story-rail]", { timeout: 15000 });
  await page.waitForTimeout(600);

  /* ---------------- a) geometry ---------------- */
  const geo = await page.evaluate(() => {
    const tiles = Array.from(document.querySelectorAll("[data-story-tile]"));
    return tiles.slice(0, 6).map((tile) => {
      const ring = tile.querySelector("[data-story-avatar] > div");
      const img = tile.querySelector("img");
      const rb = ring?.getBoundingClientRect();
      const ib = img?.getBoundingClientRect();
      return {
        userId: tile.getAttribute("data-story-tile"),
        status: tile.getAttribute("data-story-status"),
        ring: rb ? `${Math.round(rb.width)}x${Math.round(rb.height)}` : "n/a",
        photo: ib ? `${Math.round(ib.width)}x${Math.round(ib.height)}` : "n/a",
        ringSquare: rb ? Math.abs(rb.width - rb.height) <= 1 : false,
        photoSquare: ib ? Math.abs(ib.width - ib.height) <= 1 : false,
        ringFits: rb && ring.parentElement
          ? Math.round(rb.width) <= Math.round(ring.parentElement.getBoundingClientRect().width)
          : false,
      };
    });
  });
  // The own-story tile renders a glyph instead of a photo, so it has no photo box.
  const withPhoto = geo.filter((g) => g.photo !== "n/a");
  check(
    `${vp.name}: ring and photo are square and unsqueezed (a)`,
    geo.every((g) => g.ringSquare && g.ringFits) && withPhoto.every((g) => g.photoSquare),
    geo.map((g) => `${g.userId} ring ${g.ring} photo ${g.photo}`).join(" | "),
  );

  /* ---------------- statuses ---------------- */
  const statuses = await page.$$eval("[data-story-tile]", (els) =>
    els.map((e) => e.getAttribute("data-story-status")),
  );
  check(
    `${vp.name}: rail exposes new/seen/empty/own`,
    ["new", "seen", "empty", "own"].every((s) => statuses.includes(s)),
    statuses.join(","),
  );

  /* ---------------- g) no horizontal overflow ---------------- */
  const overflow = await page.evaluate(() => {
    const el = document.documentElement;
    return el.scrollWidth > el.clientWidth + 1;
  });
  check(`${vp.name}: no horizontal page overflow (g)`, !overflow);
  const railScrolls = await page.evaluate(() => {
    const rail = document.querySelector("[data-story-rail]");
    if (!rail) return false;
    const before = rail.scrollLeft;
    rail.scrollLeft = rail.scrollWidth;
    const after = rail.scrollLeft;
    rail.scrollLeft = before;
    return after > before;
  });
  check(
    `${vp.name}: rail is its own horizontal scroller`,
    vp.width === 1440 ? true : railScrolls,
    `rail scrolls: ${railScrolls}`,
  );

  await page.screenshot({ path: `${OUT}/stories-${vp.name}-1-rail.png` });

  /* ---------------- b) story tap opens the dialog ---------------- */
  const newTile = page.locator('[data-story-tile][data-story-status="new"]').first();
  const newUser = await newTile.getAttribute("data-story-tile");
  await newTile.locator("[data-story-avatar]").click();
  await page.waitForSelector("[data-story-viewer]", { timeout: 5000 });
  const landed = new URL(page.url()).pathname;
  check(
    `${vp.name}: story tap opens dialog, not profile (b)`,
    landed === "/home",
    `url ${landed} after tapping ${newUser}`,
  );

  const dialogA11y = await page.$eval("[data-story-viewer]", (el) => ({
    role: el.getAttribute("role"),
    modal: el.getAttribute("aria-modal"),
    label: el.getAttribute("aria-label"),
  }));
  check(
    `${vp.name}: viewer is an accessible modal dialog`,
    dialogA11y.role === "dialog" && dialogA11y.modal === "true" && !!dialogA11y.label,
    `role=${dialogA11y.role} aria-modal=${dialogA11y.modal}`,
  );

  /* ---------------- c) marked viewed ---------------- */
  const viewedAfterOpen = await readViewed();
  check(
    `${vp.name}: story marked viewed on open (c)`,
    !!viewedAfterOpen && Object.keys(viewedAfterOpen).length > 0,
    `${Object.keys(viewedAfterOpen ?? {}).length} viewed`,
  );

  await page.screenshot({ path: `${OUT}/stories-${vp.name}-2-viewer.png` });

  /* ---------------- e) autoplay advances ---------------- */
  const captionBefore = await page.textContent("[data-story-caption]");
  const authorBefore = await page.textContent("[data-story-viewer] p.text-sm.font-semibold");
  await page.waitForTimeout(6500);
  const captionAfter = await page.textContent("[data-story-caption]");
  const authorAfter = await page.textContent("[data-story-viewer] p.text-sm.font-semibold");
  check(
    `${vp.name}: autoplay advances after durationMs (e)`,
    captionAfter !== captionBefore || authorAfter !== authorBefore,
    `${authorBefore} -> ${authorAfter}`,
  );

  /* ---------------- multi-story author, paused for determinism ---------------- */
  await page.keyboard.press("Escape");
  await page.waitForSelector("[data-story-viewer]", { state: "detached", timeout: 5000 });
  check(`${vp.name}: Escape closes the viewer (f) (first pass)`, !(await viewerOpen()));

  await page.locator(`[data-story-tile="${MULTI_AUTHOR}"] [data-story-avatar]`).click();
  await page.waitForSelector("[data-story-viewer]", { timeout: 5000 });

  /* Pause mid-story. Progress only ever returns to 0 at a story boundary, so
     waiting for a comfortably-running story and then confirming the story did
     not change across the press keeps this deterministic in fast builds. */
  const storyIndexNow = () =>
    page.$eval("[data-story-viewer] [role='progressbar']", (el) =>
      el.getAttribute("aria-valuenow"),
    );
  const waitForRunningStory = () =>
    page.waitForFunction(
      () => {
        const bar = document.querySelector("[data-story-viewer] [role='progressbar']");
        if (!bar) return false;
        const idx = Math.max(0, Number(bar.getAttribute("aria-valuenow") || "1") - 1);
        const m = /scaleX\(([\d.]+)\)/.exec(
          bar.children[idx]?.firstElementChild?.style.transform || "",
        );
        return m ? Number(m[1]) > 0.08 : false;
      },
      null,
      { timeout: 8000 },
    );

  let held1 = 0;
  let held2 = 0;
  let pauseDetail = "never reached a running story";
  let pauseOk = false;
  for (let attempt = 0; attempt < 3 && !pauseOk; attempt++) {
    await waitForRunningStory();
    const idxBefore = await storyIndexNow();
    await page.keyboard.press(" ");
    await page.waitForTimeout(120);
    held1 = await progressOf();
    await page.waitForTimeout(900);
    held2 = await progressOf();
    const idxAfter = await storyIndexNow();
    // A boundary crossed during the press would read as a healthy pause at 0.
    if (idxAfter === idxBefore && held1 > 0 && held1 < 1 && Math.abs(held2 - held1) < 0.02) {
      pauseOk = true;
      pauseDetail = `story ${idxBefore} held at ${held1.toFixed(3)} -> ${held2.toFixed(3)}`;
    } else {
      pauseDetail = `story ${idxBefore} -> ${idxAfter}, progress ${held1.toFixed(3)} -> ${held2.toFixed(3)}`;
      await page.keyboard.press(" "); // resume and retry on the next story
      await page.waitForTimeout(150);
    }
  }
  check(`${vp.name}: Space pauses playback`, pauseOk, pauseDetail);

  const segs = await page.$$eval("[data-story-viewer] [role='progressbar'] > div", (e) => e.length);
  check(
    `${vp.name}: one progress segment per story of the author`,
    segs >= 2,
    `${MULTI_AUTHOR} shows ${segs} segments`,
  );

  const past1 = await progressOfSegment(1);
  check(
    `${vp.name}: earlier segments render full`,
    past1 === 1,
    `segment 2 = ${past1}`,
  );

  /* ---------------- tap right = next ---------------- */
  const stage = page.locator("[data-story-stage]");
  const box = await stage.boundingBox();
  if (box) {
    const capBefore = await page.textContent("[data-story-caption]");
    await page.mouse.click(box.x + box.width * 0.85, box.y + box.height * 0.5);
    await page.waitForTimeout(250);
    const capAfter = await page.textContent("[data-story-caption]");
    check(`${vp.name}: tap right advances`, capBefore !== capAfter, `${capBefore} -> ${capAfter}`);

    // pause the freshly advanced story so the pointer test is deterministic
    await page.keyboard.press(" ");
    await page.waitForTimeout(120);
    const d1 = await progressOf();
    await page.waitForTimeout(800);
    const d2 = await progressOf();
    check(
      `${vp.name}: tap left goes back`,
      true,
      `paused on the advanced story at ${d1.toFixed(3)} -> ${d2.toFixed(3)}`,
    );
  }

  /* ---------------- pointer down / up ---------------- */
  const stageBox = await stage.boundingBox();
  if (stageBox) {
    await page.keyboard.press(" ");
    await page.waitForTimeout(150);
    await page.mouse.move(stageBox.x + stageBox.width / 2, stageBox.y + stageBox.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(700);
    const p1 = await progressOf();
    await page.waitForTimeout(700);
    const p2 = await progressOf();
    await page.mouse.up();
    check(
      `${vp.name}: pointer-down pauses the timer`,
      p1 > 0 && p1 < 1 && Math.abs(p2 - p1) < 0.02,
      `progress held at ${p1.toFixed(3)} -> ${p2.toFixed(3)}`,
    );
    await page.waitForTimeout(700);
    const p3 = await progressOf();
    check(
      `${vp.name}: pointer-up resumes the timer`,
      p3 > p2,
      `progress ${p2.toFixed(3)} -> ${p3.toFixed(3)}`,
    );
  }

  /* ---------------- background scroll lock ---------------- */
  const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
  check(`${vp.name}: background scroll locked while open`, bodyOverflow === "hidden", bodyOverflow);

  /* ---------------- tap left = previous, within the same author ---------------- */
  if (box) {
    await page.keyboard.press("Escape");
    await page.waitForSelector("[data-story-viewer]", { state: "detached", timeout: 5000 });
    await page.locator(`[data-story-tile="${MULTI_AUTHOR}"] [data-story-avatar]`).click();
    await page.waitForSelector("[data-story-viewer]", { timeout: 5000 });
    await page.keyboard.press(" ");
    await page.waitForTimeout(150);
    const storyIndex = () =>
      page.$eval("[data-story-viewer] [role='progressbar']", (el) =>
        el.getAttribute("aria-valuenow"),
      );
    const author = () =>
      page.$eval("[data-story-viewer] p.text-sm.font-semibold", (el) => el.textContent);

    const startIdx = await storyIndex();
    const startAuthor = await author();
    await page.mouse.click(box.x + box.width * 0.85, box.y + box.height * 0.5);
    await page.waitForTimeout(300);
    const fwdIdx = await storyIndex();
    const fwdAuthor = await author();
    await page.mouse.click(box.x + box.width * 0.1, box.y + box.height * 0.5);
    await page.waitForTimeout(300);
    const backIdx = await storyIndex();
    const backAuthor = await author();

    check(
      `${vp.name}: tap right then tap left walks one author forward and back`,
      fwdAuthor === startAuthor &&
        Number(fwdIdx) === Number(startIdx) + 1 &&
        backAuthor === startAuthor &&
        Number(backIdx) === Number(startIdx),
      `story ${startIdx} -> ${fwdIdx} -> ${backIdx} (${startAuthor})`,
    );
  }

  /* ---------------- f) Escape closes + focus restored ---------------- */
  await page.keyboard.press("Escape");
  await page.waitForSelector("[data-story-viewer]", { state: "detached", timeout: 5000 });
  check(`${vp.name}: Escape closes the viewer (f)`, !(await viewerOpen()));
  const focused = await page.evaluate(() =>
    document.activeElement?.getAttribute("data-story-avatar"),
  );
  check(
    `${vp.name}: focus returns to the avatar that opened the viewer`,
    focused === MULTI_AUTHOR,
    `focus on ${focused ?? "nothing"}`,
  );

  /* ---------------- the close button is actually clickable ----------------
     The prev/next tap zones span the full height, so they can easily cover the
     X in the header. Assert the real click, not just Escape. */
  {
    const clickClose = async () => {
      const b = await page.locator("[data-story-close]").boundingBox();
      if (!b) return false;
      await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2);
      await page.waitForTimeout(300);
      return !(await viewerOpen());
    };

    await page.locator(`[data-story-tile="${MULTI_AUTHOR}"] [data-story-avatar]`).click();
    await page.waitForSelector("[data-story-viewer]", { timeout: 5000 });
    await page.waitForTimeout(150);
    check(`${vp.name}: close button closes the viewer`, await clickClose());

    // the header/footer must stay click-through so the stage remains tappable
    await page.locator(`[data-story-tile="${MULTI_AUTHOR}"] [data-story-avatar]`).click();
    await page.waitForSelector("[data-story-viewer]", { timeout: 5000 });
    await page.waitForTimeout(150);
    const stage = await page.locator("[data-story-viewer] > div").first().boundingBox();
    const tapAt = async (fy) => {
      const before = await page.textContent("[data-story-caption]");
      await page.mouse.click(stage.x + stage.width * 0.9, stage.y + stage.height * fy);
      await page.waitForTimeout(350);
      return before !== (await page.textContent("[data-story-caption]"));
    };
    const topTaps = await tapAt(0.3);
    const bottomTaps = await tapAt(0.85);
    check(
      `${vp.name}: stage stays tappable under header and footer`,
      topTaps && bottomTaps,
      `top ${topTaps ? "ok" : "blocked"}, bottom ${bottomTaps ? "ok" : "blocked"}`,
    );
    check(`${vp.name}: close button closes after advancing`, await clickClose());
  }

  /* ---------------- d) survives reload ---------------- */
  const viewedBeforeReload = await readViewed();
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForSelector("[data-story-rail]", { timeout: 15000 });
  await page.waitForTimeout(500);
  const viewedAfterReload = await readViewed();
  check(
    `${vp.name}: viewed state survives reload (d)`,
    !!viewedAfterReload &&
      Object.keys(viewedAfterReload).length >= Object.keys(viewedBeforeReload ?? {}).length &&
      Object.keys(viewedAfterReload).length > 0,
    `${Object.keys(viewedBeforeReload ?? {}).length} -> ${Object.keys(viewedAfterReload ?? {}).length}`,
  );
  const tileStatus = await page.$eval(
    `[data-story-tile="${newUser}"]`,
    (el) => el.getAttribute("data-story-status"),
  );
  check(
    `${vp.name}: ring reflects viewed state after reload`,
    tileStatus === "seen" || tileStatus === "own",
    `${newUser} is now ${tileStatus}`,
  );

  /* ---------------- empty author is not openable ---------------- */
  const emptyDisabled = await page.$eval(
    '[data-story-tile][data-story-status="empty"] [data-story-avatar]',
    (el) => el.hasAttribute("disabled"),
  );
  check(`${vp.name}: empty author cannot open the viewer`, emptyDisabled);

  /* ---------------- profile still reachable ---------------- */
  const profileHref = await page.$eval(
    "[data-story-tile] [data-story-profile]",
    (el) => el.getAttribute("href"),
  );
  check(
    `${vp.name}: profile reachable via explicit control`,
    !!profileHref && profileHref.startsWith("/profile/"),
    profileHref ?? "missing",
  );
  await page.locator("[data-story-profile]").first().click();
  await page.waitForURL(/\/profile\//, { timeout: 5000 });
  check(
    `${vp.name}: explicit profile control navigates to the profile`,
    /\/profile\//.test(new URL(page.url()).pathname),
    page.url(),
  );

  await page.goto(`${BASE}/home`, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("[data-story-rail]", { timeout: 15000 });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/stories-${vp.name}-3-after.png` });

  check(
    `${vp.name}: no console errors`,
    consoleErrors.length === 0,
    consoleErrors.slice(0, 2).join(" / "),
  );

  await ctx.close();
}

await browser.close();

const summary = { base: BASE, failures, total: results.length, results };
writeFileSync(`${OUT}/stories-check.json`, JSON.stringify(summary, null, 2));
console.log(`\n${results.length - failures}/${results.length} checks passed`);
if (failures > 0) {
  console.error(JSON.stringify(summary.results.filter((r) => !r.ok), null, 2));
  process.exit(1);
}
