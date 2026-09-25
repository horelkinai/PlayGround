import type {
  AdminItem,
  AuditEntry,
  Comment,
  Lang,
  Post,
  Profile,
  Reel,
  Review,
  StoryItem,
} from "./types";

export const CITIES = [
  "Tel Aviv",
  "Rishon LeZion",
  "Haifa",
  "Jerusalem",
  "Netanya",
  "Eilat",
  "Ashkelon",
  "Herzliya",
] as const;

export const CITY_LABEL: Record<Lang, Record<(typeof CITIES)[number], string>> = {
  en: {
    "Tel Aviv": "Tel Aviv",
    "Rishon LeZion": "Rishon LeZion",
    Haifa: "Haifa",
    Jerusalem: "Jerusalem",
    Netanya: "Netanya",
    Eilat: "Eilat",
    Ashkelon: "Ashkelon",
    Herzliya: "Herzliya",
  },
  ru: {
    "Tel Aviv": "Тель-Авив",
    "Rishon LeZion": "Ришон-ле-Цион",
    Haifa: "Хайфа",
    Jerusalem: "Иерусалим",
    Netanya: "Нетания",
    Eilat: "Эйлат",
    Ashkelon: "Ашкелон",
    Herzliya: "Герцлия",
  },
  he: {
    "Tel Aviv": "תל אביב",
    "Rishon LeZion": "ראשון לציון",
    Haifa: "חיפה",
    Jerusalem: "ירושלים",
    Netanya: "נתניה",
    Eilat: "אילת",
    Ashkelon: "אשקלון",
    Herzliya: "הרצליה",
  },
  ar: {
    "Tel Aviv": "تل أبيب",
    "Rishon LeZion": "ريشون لتسيون",
    Haifa: "حيفا",
    Jerusalem: "القدس",
    Netanya: "نتانيا",
    Eilat: "إيلات",
    Ashkelon: "عسقلان",
    Herzliya: "هرتسليا",
  },
};

const L = (en: string, ru: string, he: string, ar: string): Record<Lang, string> => ({
  en,
  ru,
  he,
  ar,
});

export const PROFILES: Profile[] = [
  {
    id: "noa",
    contactPlaceholder: "+972-50-101-0101 (demo)",
    username: "noa",
    name: "Noa",
    gender: "women",
    city: "Tel Aviv",
    district: "Center",
    age: 26,
    height: 172,
    weight: 54,
    languages: ["he", "en", "ru"],
    verified: true,
    verificationStatus: "verified",
    vip: true,
    top: true,
    rating: 4.9,
    ratingCount: 34,
    likes: 1820,
    views: 12400,
    favoriteCount: 410,
    status: "active",
    joined: "2026-08-02",
    photo: "/portraits/noa.jpg",
    gallery: ["/portraits/noa.jpg", "/portraits/lina.jpg", "/portraits/sofia.jpg"],
    about: L(
      "Editorial muse of the directory. Studio work, quiet evenings, Hebrew / English / Russian.",
      "Редакционная муза каталога. Студия, спокойные вечера, иврит / английский / русский.",
      "המוזה העריכתית של המדריך. סטודיו, ערבים שקטים, עברית / אנגלית / רוסית.",
      "الوجه التحريري للدليل. استوديو، أمسيات هادئة، عبرية / إنجليزية / روسية.",
    ),
    params: ["studio", "editorial"],
  },
  {
    id: "lina",
    contactPlaceholder: "+972-50-102-0102 (demo)",
    username: "lina.r",
    name: "Lina",
    gender: "women",
    city: "Rishon LeZion",
    district: "West",
    age: 24,
    height: 168,
    weight: 52,
    languages: ["ru", "he", "en"],
    verified: true,
    verificationStatus: "verified",
    vip: false,
    top: false,
    rating: 4.8,
    ratingCount: 21,
    likes: 940,
    views: 6100,
    favoriteCount: 188,
    status: "active",
    joined: "2026-09-04",
    photo: "/portraits/lina.jpg",
    gallery: ["/portraits/lina.jpg", "/portraits/daria.jpg"],
    about: L(
      "Rooftop light, linen, and long conversations. New to the directory this month.",
      "Свет с крыши, лён и длинные разговоры. Новая в каталоге в этом месяце.",
      "אור גגות, פשתן ושיחות ארוכות. חדשה במדריך החודש.",
      "ضوء الأسطح، كتان وحوارات طويلة. جديدة هذا الشهر.",
    ),
    params: ["rooftop"],
  },
  {
    id: "maya",
    contactPlaceholder: "+972-50-000-0001 (demo)",
    username: "maya.h",
    name: "Maya",
    gender: "women",
    city: "Haifa",
    district: "Carmel",
    age: 28,
    height: 170,
    weight: 56,
    languages: ["he", "ar", "en"],
    verified: true,
    vip: false,
    top: true,
    rating: 4.7,
    ratingCount: 18,
    likes: 720,
    views: 4800,
    favoriteCount: 150,
    status: "active",
    joined: "2026-07-18",
    photo: "/portraits/maya.jpg",
    gallery: ["/portraits/maya.jpg"],
    about: L(
      "Carmel mornings and the bay. Speaks Hebrew, Arabic and English.",
      "Утра на Кармеле и бухта. Иврит, арабский и английский.",
      "בקרים בכרמל והמפרץ. עברית, ערבית ואנגלית.",
      "صباحات الكرمل والخليج. عبرية وعربية وإنجليزية.",
    ),
    params: ["bay"],
  },
  {
    id: "yael",
    contactPlaceholder: "+972-50-104-0104 (demo)",
    username: "yael.j",
    name: "Yael",
    gender: "women",
    city: "Jerusalem",
    district: "Talbiya",
    age: 25,
    height: 165,
    weight: 51,
    languages: ["he", "en"],
    verified: false,
    verificationStatus: "unverified",
    vip: false,
    top: false,
    rating: 4.6,
    ratingCount: 9,
    likes: 310,
    views: 1900,
    favoriteCount: 64,
    status: "paused",
    joined: "2026-06-11",
    photo: "/portraits/yael.jpg",
    gallery: ["/portraits/yael.jpg"],
    about: L(
      "Stone streets, knit layers, museums on quiet days.",
      "Каменные улицы, вязаные слои, музеи в тихие дни.",
      "רחובות אבן, סריגים, מוזיאונים בימים שקטים.",
      "شوارع حجرية، طبقات صوف، متاحف في الأيام الهادئة.",
    ),
    params: ["old-city"],
  },
  {
    id: "daria",
    contactPlaceholder: "+972-50-105-0105 (demo)",
    username: "daria.e",
    name: "Daria",
    gender: "women",
    city: "Eilat",
    age: 23,
    height: 174,
    weight: 55,
    languages: ["ru", "en"],
    verified: false,
    vip: false,
    top: false,
    rating: 4.5,
    ratingCount: 6,
    likes: 210,
    views: 980,
    favoriteCount: 41,
    status: "active",
    joined: "2026-09-16",
    photo: "/portraits/daria.jpg",
    gallery: ["/portraits/daria.jpg"],
    about: L(
      "Desert dusk and the Red Sea. Just joined — still filling the gallery.",
      "Закат в пустыне и Красное море. Только присоединилась.",
      "שקיעה במדבר וים סוף. הצטרפה לאחרונה.",
      "غروب الصحراء والبحر الأحمر. انضمّت حديثاً.",
    ),
    params: ["sea"],
  },
  {
    id: "sofia",
    contactPlaceholder: "+972-50-106-0106 (demo)",
    username: "sofia.n",
    name: "Sofia",
    gender: "women",
    city: "Netanya",
    district: "Promenade",
    age: 27,
    height: 171,
    weight: 57,
    languages: ["ru", "he", "en"],
    verified: true,
    vip: true,
    top: false,
    rating: 4.8,
    ratingCount: 26,
    likes: 1104,
    views: 7300,
    favoriteCount: 265,
    status: "active",
    joined: "2026-05-22",
    photo: "/portraits/sofia.jpg",
    gallery: ["/portraits/sofia.jpg", "/portraits/noa.jpg"],
    about: L(
      "Black turtleneck, sea wind, slow afternoons on the promenade.",
      "Чёрная водолазка, морской ветер, медленные дни на набережной.",
      "גולף שחור, רוח ים, אחר צהריים איטיים בטיילת.",
      "ياقة سوداء، ريح البحر، عصاري هادئة على الكورنيش.",
    ),
    params: ["promenade"],
  },
  {
    id: "rina",
    contactPlaceholder: "+972-50-107-0107 (demo)",
    username: "rina.a",
    name: "Rina",
    gender: "women",
    city: "Ashkelon",
    age: 30,
    height: 167,
    weight: 58,
    languages: ["he", "en"],
    verified: true,
    vip: false,
    top: false,
    rating: 4.7,
    ratingCount: 15,
    likes: 540,
    views: 3200,
    favoriteCount: 97,
    status: "active",
    joined: "2026-04-09",
    photo: "/portraits/rina.jpg",
    gallery: ["/portraits/rina.jpg"],
    about: L(
      "Coast light and a calm schedule. Prefers clear plans.",
      "Свет побережья и спокойный график. Любит понятные планы.",
      "אור החוף ולוח זמנים רגוע. מעדיפה תוכניות ברורות.",
      "ضوء الساحل وجدول هادئ. تفضّل خططاً واضحة.",
    ),
    params: ["coast"],
  },
  {
    id: "adam",
    contactPlaceholder: "+972-50-201-0201 (demo)",
    username: "adam.t",
    name: "Adam",
    gender: "men",
    city: "Tel Aviv",
    district: "Florentin",
    age: 29,
    height: 182,
    weight: 76,
    languages: ["he", "en"],
    verified: true,
    vip: false,
    top: false,
    rating: 4.6,
    ratingCount: 12,
    likes: 430,
    views: 2700,
    favoriteCount: 80,
    status: "active",
    joined: "2026-08-20",
    photo: "/portraits/adam.jpg",
    gallery: ["/portraits/adam.jpg"],
    about: L(
      "Night streets, design work, and a short list of good coffee.",
      "Ночные улицы, дизайн и короткий список хорошего кофе.",
      "רחובות לילה, עיצוב ורשימה קצרה של קפה טוב.",
      "شوارع ليلية، تصميم وقائمة قصيرة من القهوة الجيدة.",
    ),
    params: ["design"],
  },
  {
    id: "omer",
    contactPlaceholder: "+972-50-202-0202 (demo)",
    username: "omer.h",
    name: "Omer",
    gender: "men",
    city: "Haifa",
    district: "Hadar",
    age: 32,
    height: 178,
    weight: 74,
    languages: ["he", "ar", "en"],
    verified: false,
    vip: false,
    top: false,
    rating: 4.4,
    ratingCount: 8,
    likes: 190,
    views: 1400,
    favoriteCount: 33,
    status: "active",
    joined: "2026-07-01",
    photo: "/portraits/omer.jpg",
    gallery: ["/portraits/omer.jpg"],
    about: L(
      "Hillside walks and linen jackets. Hebrew, Arabic, English.",
      "Прогулки по склонам и льняные пиджаки. Иврит, арабский, английский.",
      "טיולים במדרון וז׳קטים מפשתן. עברית, ערבית, אנגלית.",
      "مشايات على المنحدر وسترات كتان. عبرية وعربية وإنجليزية.",
    ),
    params: ["hills"],
  },
  {
    id: "yonatan",
    contactPlaceholder: "+972-50-203-0203 (demo)",
    username: "yonatan.j",
    name: "Yonatan",
    gender: "men",
    city: "Jerusalem",
    age: 26,
    height: 180,
    weight: 73,
    languages: ["he", "en"],
    verified: false,
    vip: false,
    top: false,
    rating: 4.5,
    ratingCount: 5,
    likes: 160,
    views: 870,
    favoriteCount: 22,
    status: "active",
    joined: "2026-09-12",
    photo: "/portraits/yonatan.jpg",
    gallery: ["/portraits/yonatan.jpg"],
    about: L(
      "Evenings in the city, denim, photography on weekends.",
      "Вечера в городе, деним, фотография по выходным.",
      "ערבים בעיר, ג׳ינס, צילום בסופי שבוע.",
      "أمسيات في المدينة، دنيم، تصوير في عطلة الأسبوع.",
    ),
    params: ["photo"],
  },
];

export const POSTS: Post[] = [
  {
    id: "p1",
    profileId: "noa",
    photos: ["/portraits/noa.jpg"],
    caption: L("Studio notes.", "Студийные заметки.", "הערות סטודיו.", "ملاحظات الاستوديو."),
    likes: 142,
    comments: 31,
    created: "2026-09-20",
  },
  {
    id: "p2",
    profileId: "lina",
    photos: ["/portraits/lina.jpg"],
    caption: L("Golden hour up top.", "Золотой час наверху.", "שעת הזהב למעלה.", "الساعة الذهبية فوق."),
    likes: 88,
    comments: 12,
    created: "2026-09-19",
  },
  {
    id: "p3",
    profileId: "sofia",
    photos: ["/portraits/sofia.jpg"],
    caption: L("Wind off the water.", "Ветер с воды.", "רוח מהמים.", "ريح من الماء."),
    likes: 121,
    comments: 18,
    created: "2026-09-18",
  },
  {
    id: "p4",
    profileId: "maya",
    photos: ["/portraits/maya.jpg"],
    caption: L("Bay in the back.", "Бухта на фоне.", "המפרץ מאחור.", "الخليج في الخلف."),
    likes: 64,
    comments: 7,
    created: "2026-09-17",
  },
  {
    id: "p5",
    profileId: "adam",
    photos: ["/portraits/adam.jpg"],
    caption: L("After eleven.", "После одиннадцати.", "אחרי אחת עשרה.", "بعد الحادية عشرة."),
    likes: 41,
    comments: 4,
    created: "2026-09-16",
  },
  {
    id: "p6",
    profileId: "rina",
    photos: ["/portraits/rina.jpg"],
    caption: L("Coast light.", "Свет побережья.", "אור החוף.", "ضوء الساحل."),
    likes: 53,
    comments: 6,
    created: "2026-09-15",
  },
];

export const COMMENTS: Comment[] = [
  { id: "c1", postId: "p1", author: "Maya", text: "Quiet frame.", created: "2026-09-20" },
  { id: "c2", postId: "p1", author: "Adam", text: "Light is perfect.", created: "2026-09-20" },
  { id: "c3", postId: "p2", author: "Sofia", text: "That hour never misses.", created: "2026-09-19" },
];

export const REELS: Reel[] = [
  {
    id: "r1",
    profileId: "noa",
    photo: "/portraits/noa.jpg",
    caption: L("Dark studio.", "Тёмная студия.", "סטודיו כהה.", "استوديو داكن."),
    likes: 220,
    comments: 19,
  },
  {
    id: "r2",
    profileId: "lina",
    photo: "/portraits/lina.jpg",
    caption: L("Roof.", "Крыша.", "גג.", "سطح."),
    likes: 140,
    comments: 8,
  },
  {
    id: "r3",
    profileId: "sofia",
    photo: "/portraits/sofia.jpg",
    caption: L("Promenade.", "Набережная.", "טיילת.", "كورنيش."),
    likes: 175,
    comments: 11,
  },
  {
    id: "r4",
    profileId: "daria",
    photo: "/portraits/daria.jpg",
    caption: L("Dusk.", "Сумерки.", "דמדומים.", "غسق."),
    likes: 90,
    comments: 5,
  },
  {
    id: "r5",
    profileId: "maya",
    photo: "/portraits/maya.jpg",
    caption: L("Carmel.", "Кармель.", "כרמל.", "الكرمل."),
    likes: 101,
    comments: 6,
  },
  {
    id: "r6",
    profileId: "adam",
    photo: "/portraits/adam.jpg",
    caption: L("Night walk.", "Ночная прогулка.", "הליכת לילה.", "مشية ليلية."),
    likes: 70,
    comments: 3,
  },
];

export const REVIEWS: Review[] = [
  {
    id: "rv1",
    profileId: "noa",
    rating: 5,
    impression: "professional",
    text: "Clear, calm, on time.",
    status: "approved",
    created: "2026-09-10",
    reply: "Thank you.",
  },
  {
    id: "rv2",
    profileId: "noa",
    rating: 5,
    impression: "respectful",
    text: "Straightforward conversation.",
    status: "approved",
    created: "2026-09-02",
  },
  {
    id: "rv3",
    profileId: "sofia",
    rating: 5,
    impression: "punctual",
    text: "Arrived exactly as planned.",
    status: "approved",
    created: "2026-08-28",
  },
  {
    id: "rv4",
    profileId: "lina",
    rating: 4,
    impression: "clear",
    text: "Good communication.",
    status: "approved",
    created: "2026-09-08",
  },
  {
    id: "rv5",
    profileId: "maya",
    rating: 5,
    impression: "would_recommend",
    text: "Would recommend the profile.",
    status: "pending",
    created: "2026-09-21",
  },
  {
    id: "rv6",
    profileId: "adam",
    rating: 2,
    impression: "professional",
    text: "Needs clarification on dates.",
    status: "needs_clarification",
    created: "2026-09-18",
  },
];

export const ADMIN_QUEUE: AdminItem[] = [
  {
    id: "aq1",
    kind: "profile",
    title: "Daria · Eilat",
    subtitle: "New profile",
    status: "pending",
    created: "2026-09-16",
  },
  {
    id: "aq2",
    kind: "photo",
    title: "Yonatan gallery #2",
    subtitle: "Photo moderation",
    status: "pending",
    created: "2026-09-18",
  },
  {
    id: "aq3",
    kind: "post",
    title: "Maya · Bay in the back",
    subtitle: "Post",
    status: "approved",
    created: "2026-09-17",
  },
  {
    id: "aq4",
    kind: "review",
    title: "Review on Maya",
    subtitle: "Pending moderation",
    status: "pending",
    created: "2026-09-21",
  },
  {
    id: "aq5",
    kind: "report",
    title: "Report · phone number in comment",
    subtitle: "Hidden pending review",
    status: "pending",
    created: "2026-09-20",
  },
  {
    id: "aq6",
    kind: "verified",
    title: "Omer · Verified request",
    subtitle: "Badge",
    status: "pending",
    created: "2026-09-14",
  },
  {
    id: "aq7",
    kind: "vip",
    title: "Lina · VIP request",
    subtitle: "Badge",
    status: "pending",
    created: "2026-09-19",
  },
  {
    id: "aq8",
    kind: "appeal",
    title: "Yael · pause appeal",
    subtitle: "Owner appeal",
    status: "pending",
    created: "2026-09-15",
  },
];

export const AUDIT: AuditEntry[] = [
  {
    id: "au1",
    actor: "mod.ira",
    timestamp: "2026-09-21 14:12",
    target: "Review rv5",
    previous: "submitted",
    next: "pending",
    reason: "Queue",
    note: "Auto-route",
  },
  {
    id: "au2",
    actor: "mod.ira",
    timestamp: "2026-09-20 11:04",
    target: "Noa badges",
    previous: "verified",
    next: "verified+vip+top",
    reason: "Heritage account",
    note: "Manual",
  },
  {
    id: "au3",
    actor: "mod.lev",
    timestamp: "2026-09-18 09:40",
    target: "Yael status",
    previous: "active",
    next: "paused",
    reason: "Owner request",
    note: "No public reason",
  },
];

export function profileById(id: string) {
  return PROFILES.find((p) => p.id === id);
}

export function postsByProfile(id: string) {
  return POSTS.filter((p) => p.profileId === id);
}

export function reelsByProfile(id: string) {
  return REELS.filter((r) => r.profileId === id);
}

export function reviewsByProfile(id: string) {
  return REVIEWS.filter((r) => r.profileId === id);
}

export function commentsByPost(id: string) {
  return COMMENTS.filter((c) => c.postId === id);
}

export const NEW_IDS = ["daria", "lina", "yonatan"];
export const POPULAR_IDS = ["noa", "sofia", "maya", "adam"];
export const REC_IDS = ["lina", "rina", "omer", "sofia"];

/* ------------------------------------------------------------------ *
 * Stories / statuses
 *
 * Local demo only. `mediaUrl` points at bundled /public assets and
 * `demoGradient` is an inline CSS gradient — nothing is fetched from a
 * remote host and no real user data is involved.
 *
 * Fixture coverage: a single-story author, a multi-story author, two
 * fully-viewed authors (see DEMO_VIEWED_STORY_IDS), an author with no
 * stories at all, and the current user.
 * ------------------------------------------------------------------ */

/** Id used for the current user's own story. */
export const STORY_SELF_ID = "me";

/** Default on-screen time for a story that does not declare durationMs. */
export const STORY_DEFAULT_DURATION_MS = 5000;

export const STORIES: StoryItem[] = [
  {
    id: "s-noa-1",
    authorId: "noa",
    mediaType: "image",
    mediaUrl: "/portraits/noa.jpg",
    caption: {
      en: "New studio setup, finally sorted.",
      ru: "Новая студия — наконец-то готова.",
      he: "סטודיו חדש, הסתדר סוף סוף.",
      ar: "استوديو جديد، جاهز أخيرًا.",
    },
    createdAt: "2026-09-24T18:10:00.000Z",
    durationMs: 5000,
  },
  {
    id: "s-lina-1",
    authorId: "lina",
    mediaType: "image",
    mediaUrl: "/portraits/lina.jpg",
    caption: {
      en: "Coffee and a short break between calls.",
      ru: "Кофе и короткий перерыв между звонками.",
      he: "קפה והפסקה קצרה בין שיחות.",
      ar: "قهوة واستراحة قصيرة بين المكالمات.",
    },
    createdAt: "2026-09-24T16:40:00.000Z",
    durationMs: 6000,
  },
  {
    id: "s-lina-2",
    authorId: "lina",
    mediaType: "gradient",
    demoGradient: "linear-gradient(155deg, #c1121f 0%, #4a1620 48%, #0b0b0d 100%)",
    caption: {
      en: "Tonight: open slots for tomorrow.",
      ru: "Сегодня: есть окна на завтра.",
      he: "הערב: פתחו חלונות למחר.",
      ar: "مساءً: مواعيد مفتوحة للغد.",
    },
    createdAt: "2026-09-24T16:44:00.000Z",
    durationMs: 5000,
  },
  {
    id: "s-lina-3",
    authorId: "lina",
    mediaType: "image",
    mediaUrl: "/portraits/lina.jpg",
    caption: {
      en: "Listing update — photos from the terrace.",
      ru: "Обновила объявление — фото с террасы.",
      he: "עדכון לרשומה — תמונות מהמרפסת.",
      ar: "تحديث الإعلان — صور من الشرفة.",
    },
    createdAt: "2026-09-24T16:47:00.000Z",
    durationMs: 5500,
  },
  {
    id: "s-maya-1",
    authorId: "maya",
    mediaType: "image",
    mediaUrl: "/portraits/maya.jpg",
    caption: {
      en: "Morning run done, day started right.",
      ru: "Утренняя пробежка — день начался правильно.",
      he: "ריצה בבוקר, היום התחיל נכון.",
      ar: "الجري الصباحي، بدأ اليوم بشكل صحيح.",
    },
    createdAt: "2026-09-24T06:20:00.000Z",
    durationMs: 5000,
  },
  {
    id: "s-rina-1",
    authorId: "rina",
    mediaType: "image",
    mediaUrl: "/portraits/rina.jpg",
    caption: {
      en: "Signed two new clients this week.",
      ru: "На этой неделе — два новых клиента.",
      he: "חתמתי על שני לקוחות חדשים השבוע.",
      ar: "وقّعت على عميلين جديدين هذا الأسبوع.",
    },
    createdAt: "2026-09-25T07:05:00.000Z",
    durationMs: 5000,
  },
  {
    id: "s-rina-2",
    authorId: "rina",
    mediaType: "gradient",
    demoGradient: "linear-gradient(200deg, #2a9d8f 0%, #16302e 45%, #0b0b0d 100%)",
    caption: {
      en: "Grateful for the busy calendar.",
      ru: "Благодарна за загруженное расписание.",
      he: "אסירת תודה ליומן העמוס.",
      ar: "شكرًا على اليوم المزدحم.",
    },
    createdAt: "2026-09-25T07:08:00.000Z",
    durationMs: 5000,
  },
  {
    id: "s-yael-1",
    authorId: "yael",
    mediaType: "image",
    mediaUrl: "/portraits/yael.jpg",
    caption: {
      en: "Quiet evening, good book.",
      ru: "Тихий вечер, хорошая книга.",
      he: "ערב שקט, ספר טוב.",
      ar: "أمسية هادئة وكتاب جيد.",
    },
    createdAt: "2026-09-24T21:30:00.000Z",
    durationMs: 5000,
  },
  {
    id: "s-daria-1",
    authorId: "daria",
    mediaType: "image",
    mediaUrl: "/portraits/daria.jpg",
    caption: {
      en: "Just moved, still unpacking.",
      ru: "Переехала, ещё разбираю вещи.",
      he: "סתם עברתי, עוד מפרקים.",
      ar: "انتقلت للتو، ما زلت أفك الغرف.",
    },
    createdAt: "2026-09-25T09:15:00.000Z",
    durationMs: 5000,
  },
  {
    id: "s-self-1",
    authorId: STORY_SELF_ID,
    mediaType: "gradient",
    demoGradient: "linear-gradient(145deg, #c9a227 0%, #3a2f10 50%, #0b0b0d 100%)",
    caption: {
      en: "Open to new introductions.",
      ru: "Открыта к новым знакомствам.",
      he: "פתוחה להכרויות חדשות.",
      ar: "مفتوحة لتعريفات جديدة.",
    },
    createdAt: "2026-09-25T08:00:00.000Z",
    durationMs: 5000,
  },
  {
    id: "s-self-2",
    authorId: STORY_SELF_ID,
    mediaType: "gradient",
    demoGradient: "linear-gradient(215deg, #efe6d6 0%, #6a6459 40%, #141417 100%)",
    caption: {
      en: "Available for a call this evening.",
      ru: "Свободна для звонка сегодня вечером.",
      he: "פנויה לשיחה הערב.",
      ar: "متاحة لمكالمة هذا المساء.",
    },
    createdAt: "2026-09-25T08:03:00.000Z",
    durationMs: 5000,
  },
];

/**
 * Stories treated as already viewed on a fresh install, so the rail shows
 * the new / seen / empty / own states instead of everything being "new".
 */
export const DEMO_VIEWED_STORY_IDS = ["s-lina-1", "s-maya-1", "s-yael-1"];

export function storiesByProfile(id: string): StoryItem[] {
  return STORIES.filter((s) => s.authorId === id);
}

/** Distinct author ids that actually have stories, in first-posted order. */
export function storyAuthorIds(): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of STORIES) {
    if (seen.has(s.authorId)) continue;
    seen.add(s.authorId);
    out.push(s.authorId);
  }
  return out;
}

export function storyById(id: string): StoryItem | undefined {
  return STORIES.find((s) => s.id === id);
}
