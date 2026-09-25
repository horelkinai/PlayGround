/**
 * Generates the demo profile catalogue into src/data/profiles.generated.json.
 *
 * Deterministic (seeded PRNG) so re-runs are stable and diffs stay small.
 * Photos come from public/portraits/generated, fetched by fetch-portraits.mjs
 * under licenses that are both commercial and modification-allowed; the
 * per-image attribution lives in public/portraits/generated/CREDITS.json.
 *
 *   node scripts/generate-profiles.mjs [--count=200] [--seed=20260925]
 */
import { readdir, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const arg = (n, d) => {
  const hit = process.argv.find((a) => a.startsWith(`--${n}=`));
  return hit ? hit.slice(n.length + 3) : d;
};

const COUNT = Number(arg("count", "200"));
const SEED = Number(arg("seed", "20260925"));
const PHOTO_DIR = resolve(process.cwd(), "public/portraits/generated");
const OUT = resolve(process.cwd(), "src/data/profiles.generated.json");

/* mulberry32 — small, fast, and stable across Node versions */
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = rng(SEED);
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const int = (lo, hi) => lo + Math.floor(rand() * (hi - lo + 1));
const chance = (p) => rand() < p;
const sample = (arr, n) => {
  const copy = [...arr];
  const out = [];
  while (out.length < n && copy.length) out.push(...copy.splice(Math.floor(rand() * copy.length), 1));
  return out;
};

const FIRST = ["Noa","Lina","Maya","Sofia","Yael","Dana","Adi","Tamar","Michal","Shira","Omer","Guy","Idan","Amit","Neta","Shani","Moran","Gali","Efrat","Tali","Rotem","Hila","Anat","Yuval","Ariel","Barak","Tomer","Gal","Danaa","Keren","Pnina","Sivan","Mayaa","Riki","Eden","Liora","Gaya"];
const LAST = ["Levi","Cohen","Mizrahi","Peretz","Biton","Avraham","Dahan","Katz","Seraya","Fischer","Malka","Barak","Shapiro","Amir","David","Haddad","Levina","Azoulay","Coheni","Malki","Ohana","Sivan","Bar","Tal","Ronen","Vaknin","Gur","Einhorn","Margalit","Shimoni","Turgeman"];
const CITIES = [
  ["Tel Aviv", ["Florentin","Neve Tzedek","Ramat Gan","Jaffa","Shorish","Lev HaYarkon","Bnei Brak","Givatayim"]],
  ["Jerusalem", ["Neve Zion","Bakaa","Katamon","Malha","Talbiya","Ein Kerem","French Hill"]],
  ["Haifa", ["German Colony","Carmel","Lower Carmel","Bat Galim","Den Aviv"]],
  ["Netanya", ["Poleg","Ir Polin","Kiryat Aryeh"]],
  ["Rishon LeZion", ["Mada","HaRishonim"]],
  ["Herzliya", ["Herzliya Pituah","Dolgon"]],
  ["Ashkelon", ["Old City","Afikim"]],
  ["Eilat", ["Taba"]],
];

const ABOUT_EN = [
  "Studio and editorial shoots, quiet evenings, good conversation.",
  "Verified studio work. Coffee, galleries, long walks by the sea.",
  "I like: honest conversation, live music, breakfast that lasts.",
  "Editorial background. Available for shoots and social evenings.",
  "Warm, direct, no games. I answer messages myself.",
  "Model and dancer. Travel light, speak four languages.",
  "I take my time choosing who I meet. Mutual respect comes first.",
  "Fitness coach by day, studio model on weekends.",
  "Photography is my hobby; I bring my own references.",
  "New to the platform, not new to the camera.",
];
const ABOUT_RU = [
  "Студийные и редакционные съёмки, спокойные вечера, живые разговоры.",
  "Проверенная студийная работа. Кофе, галереи, долгие прогулки у моря.",
  "Нравятся: честный разговор, живая музыка, завтраки на несколько часов.",
  "Редакционная съёмка в прошлом. Открыта для студий и светских вечеров.",
  "Тёплая, прямая, без игр. Отвечаю на сообщения сама.",
  "Модель и танцовщица. Легко путешествую, говорю на четырёх языках.",
  "Я не спешу с выбором, с кем встречаюсь. Взаимное уважение — прежде всего.",
  "Тренер по фитнесу, по выходным — модель в студии.",
  "Фотография — моё хобби, референсы приношу свои.",
  "Новичок на площадке, но не новичок в кадре.",
];
const ABOUT_HE = [
  "סטודיו וצילומי אופנה, ערבים רגועים, שיחה טובה.",
  "עבודת סטודיו מאומתת. קפה, גלריות, הליכות ארוכות ליד הים.",
  "אוהבת: שיחה כנה, מוזיקה חיה, ארוחת בוקר ארוכה.",
  "רקע בצילום אופנה. פתוחה לסטודיו ולערבים חברתיים.",
  "חמה, ישירה, בלי משחקים. עונה להודעות בעצמי.",
  "דוגמנית ורקדנית. נודדת בקלות, מדברת ארב שפות.",
  "לוקחת את הזמן לבחור למי אני נפגשת. כבוד הדדי לפני הכול.",
  "מאמנת כושר ביום, דוגמנית בסוף השבוע.",
  "צילום התחביב שלי, ואני מביאה הפניות משלי.",
  "חדשה לפלטפורמה, לא חדשה במצלמה.",
];
const ABOUT_AR = [
  "جلسات استوديو وتصوير أزياء، وأمسيات هادئة ودردشة جميلة.",
  "عمل استوديو موثّق. قهوة ومعارض ومشاVES طويلة على البحر.",
  "أعجبني: حديث صادق، موسيقى حي��ة، وفطور طويل.",
  "خلفية في تصوير الأزياء. متاحة للتصوير والسهرات.",
  "دافئة وصريحة وبلا ألعاب. أرد على الرسائل بنفسي.",
  "موديل وراقصة. أسافر بخفة وأتحدث أربع لغات.",
  "آخذ وقتي في اختيار من أستقبل. الاحترام المتبادل أولاً.",
  "مدربة لياقة في النهار، موديل في عطلة نهاية الأسبوع.",
  "التصوير هوايتي، وأحضر مراجعي بنفسي.",
  "جديدة على المنصة، لست جديدة أمام الكاميرا.",
];

const PARAMS = ["Incall","Outcall","Hotel","Dinner","Events","Shoots","Fitness","Travel","Glamour","Casual","Evening","Weekend"];
const LANGS = ["ru","he","en","ar"];

function makeAbout(i) {
  const en = ABOUT_EN[i % ABOUT_EN.length];
  return {
    en,
    ru: ABOUT_RU[i % ABOUT_RU.length],
    he: ABOUT_HE[i % ABOUT_HE.length],
    ar: ABOUT_AR[i % ABOUT_AR.length],
  };
}

async function main() {
  const files = (await readdir(PHOTO_DIR)).filter((f) => f.endsWith(".webp")).sort();
  if (files.length < COUNT) {
    throw new Error(`need >= ${COUNT} photos, found ${files.length}. Run fetch-portraits.mjs first.`);
  }
  const used = new Set();
  const nextPhoto = () => {
    let f = pick(files);
    let guard = 0;
    while (used.has(f) && guard++ < files.length * 2) f = pick(files);
    used.add(f);
    return `/portraits/generated/${f}`;
  };

  const profiles = [];
  for (let i = 0; i < COUNT; i++) {
    const first = FIRST[i % FIRST.length];
    const last = LAST[(i * 7 + 3) % LAST.length];
    const [city, districts] = CITIES[i % CITIES.length];
    const username = `${first.toLowerCase()}_${last.toLowerCase().replace(/[^a-z]/g, "")}${100 + i}`;
    const gallery = [nextPhoto(), nextPhoto(), nextPhoto()];
    const ratingCount = int(4, 180);
    const verified = chance(0.62);
    const langs = sample(LANGS, int(1, 3));
    const joinedYear = 2024 + int(0, 2);
    const joinedMonth = int(1, 12);
    const joinedDay = int(1, 28);

    profiles.push({
      id: `g${String(i).padStart(3, "0")}`,
      contactPlaceholder: `+972-5${int(0, 9)}-${int(100, 999)}-${int(1000, 9999)} (demo)`,
      username,
      name: `${first} ${last}`,
      gender: "women",
      city,
      district: pick(districts),
      age: int(21, 44),
      height: int(158, 181),
      weight: int(48, 72),
      languages: langs,
      verified,
      verificationStatus: verified ? "verified" : chance(0.5) ? "under_review" : "submitted",
      vip: chance(0.22),
      top: chance(0.18),
      rating: Number((3.9 + rand() * 1.1).toFixed(1)),
      ratingCount,
      likes: int(40, 9800),
      views: int(300, 90000),
      favoriteCount: int(0, 900),
      status: chance(0.95) ? "active" : "paused",
      joined: `${joinedYear}-${String(joinedMonth).padStart(2, "0")}-${String(joinedDay).padStart(2, "0")}`,
      photo: gallery[0],
      gallery,
      about: makeAbout(i),
      params: sample(PARAMS, int(2, 4)),
      isDemoGenerated: true,
    });
  }

  await mkdir(resolve(process.cwd(), "src/data"), { recursive: true });
  await writeFile(OUT, JSON.stringify(profiles, null, 1));

  const langDist = {};
  for (const p of profiles) for (const l of p.languages) langDist[l] = (langDist[l] || 0) + 1;
  console.log(`Generated ${profiles.length} profiles -> ${OUT}`);
  console.log(`unique photos used: ${used.size} / ${files.length}`);
  console.log(`languages: ${JSON.stringify(langDist)}`);
  console.log(`cities: ${JSON.stringify(profiles.reduce((m, p) => ((m[p.city] = (m[p.city] || 0) + 1), m), {}))}`);
}

main();
