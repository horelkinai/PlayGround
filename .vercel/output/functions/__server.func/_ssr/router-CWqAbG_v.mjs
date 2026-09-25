import { i as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime, Z as require_react, _ as Outlet, b as createRootRoute, f as Scripts, g as createRouter, p as HeadContent, v as lazyRouteComponent, w as useRouter, y as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TriangleAlert } from "../_libs/lucide-react.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CWqAbG_v.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var LANGS = [
	{
		id: "ru",
		label: "Russian",
		native: "Русский",
		dir: "ltr"
	},
	{
		id: "he",
		label: "Hebrew",
		native: "עברית",
		dir: "rtl"
	},
	{
		id: "ar",
		label: "Arabic",
		native: "العربية",
		dir: "rtl"
	},
	{
		id: "en",
		label: "English",
		native: "English",
		dir: "ltr"
	}
];
function isRtl(lang) {
	return lang === "he" || lang === "ar";
}
var DICT = {
	en: {
		brand: "Israel 1+1",
		tagline: "Professional social directory",
		ageNotice: "This platform is for adults 18 and over.",
		ageBody: "By continuing you confirm that you are at least 18 years old and agree to the Rules and Privacy notice.",
		continue: "Continue",
		exit: "Exit",
		rules: "Rules",
		privacy: "Privacy",
		back: "Back",
		next: "Next",
		save: "Save",
		cancel: "Cancel",
		close: "Close",
		search: "Search",
		submit: "Submit",
		sent: "Submitted",
		demo: "Demo prototype — fictional profiles, no real contacts.",
		exitTitle: "18+ only",
		exitBody: "You need to be 18 or older to use Israel 1+1.",
		intentTitle: "How do you want to use the platform?",
		intentBrowse: "I am looking for profiles",
		intentCreate: "I want to create a profile",
		intentBoth: "Both",
		discTitle: "Who do you want to discover?",
		discWomen: "Women",
		discMen: "Men",
		discAll: "All available profiles",
		regTitle: "Create an account",
		regHint: "Demo only — nothing is sent to a server.",
		emailPhone: "Email or phone",
		password: "Password",
		language: "Language",
		consent: "I agree to the Rules and Privacy notice",
		nextTitle: "Where to next?",
		goHome: "Open Home",
		goDir: "Open Directory",
		createLater: "Create profile later",
		createNow: "Create profile now",
		navHome: "Home",
		navDir: "Catalog",
		navSearch: "Search",
		navNew: "New",
		navReels: "Reels",
		navFav: "Favorites",
		navMe: "My profile",
		navSupport: "Support",
		navBlocked: "Trust & Safety",
		navSettings: "Settings",
		navAdmin: "Admin",
		more: "More",
		reelsStrip: "Reels",
		newProfiles: "New profiles",
		recommended: "Recommended",
		feed: "Feed",
		likesLabel: "likes",
		yourStory: "You",
		storyStateNew: "New stories",
		storyStateSeen: "All stories viewed",
		storyStateEmpty: "No stories",
		storyStateOwn: "Your story",
		storiesNewCount: "{n} new",
		storyOpenLabel: "Open story",
		storyViewProfile: "Open profile",
		storyClose: "Close story",
		storyPaused: "Paused",
		storyProgressLabel: "Story progress",
		storyPrevLabel: "Previous story",
		storyNextLabel: "Next story",
		createPost: "New post",
		searchHint: "Set preferences for feed and catalog.",
		openCatalog: "Open catalog",
		guestCta: "Sign in to use platform features",
		popular: "Popular",
		safety: "Support & safety",
		viewProfile: "View profile",
		like: "Like",
		comment: "Comment",
		comments: "Comments",
		savePost: "Save",
		share: "Share",
		report: "Report",
		follow: "Follow",
		following: "Following",
		favorite: "Favorite",
		favorited: "Saved",
		verified: "Verified",
		vip: "VIP",
		top: "TOP",
		rating: "Rating",
		reviews: "Reviews",
		posts: "Posts",
		about: "About",
		age: "Age",
		height: "Height",
		weight: "Weight",
		city: "City",
		district: "District",
		languages: "Languages",
		cm: "cm",
		kg: "kg",
		years: "y.",
		filters: "Filters",
		reset: "Reset",
		apply: "Apply",
		minRating: "Minimum rating",
		activeOnly: "Active profiles only",
		cards: "Cards",
		grid: "Grid",
		list: "List",
		empty: "Nothing here yet.",
		paused: "Profile temporarily unavailable",
		pausedHint: "This profile is hidden while it is under review or paused by the owner.",
		writeReview: "Write a review",
		reviewHint: "Reviews are public only after moderation.",
		impression: "Impression",
		impProfessional: "Professional",
		impPunctual: "Punctual",
		impRespectful: "Respectful",
		impClear: "Clear communication",
		impRecommend: "Would recommend",
		reviewText: "Optional text",
		reviewPending: "Pending moderation",
		reviewApproved: "Approved",
		reviewRejected: "Not published",
		reviewClarify: "Needs clarification",
		ownerReply: "Owner reply",
		reportTitle: "Report",
		reportReason: "Reason",
		reportNote: "Private note to moderation",
		rThreats: "Threats",
		rBlackmail: "Blackmail",
		rInsults: "Insults",
		rPhone: "Phone numbers",
		rAddress: "Addresses",
		rDocs: "Documents",
		rPrivate: "Private messages",
		rDoxxing: "Doxxing",
		rAccusations: "Unsupported accusations",
		rIllegal: "Illegal content",
		rSexual: "Identifying sexual details",
		rOther: "Other",
		copied: "Link copied",
		supportTitle: "Support",
		supportBody: "Administration moderates content, reviews reports and applies platform rules. We do not claim to guarantee the safety of every person.",
		supportForm: "Message (demo)",
		blockedTitle: "Blocked profiles",
		blockedHint: "Blocked people are hidden from your feed and directory.",
		unblock: "Unblock",
		settingsTitle: "Settings",
		theme: "Appearance",
		dark: "Dark",
		light: "Light",
		discoveryPref: "Discovery",
		signOut: "Reset demo session",
		createProfile: "Create profile",
		publicName: "Public name",
		username: "Username",
		description: "Description",
		myProfileHint: "Demo profile is stored only on this device.",
		notCreated: "You have not created a public profile yet.",
		adminDash: "Dashboard",
		adminQueue: "Profile queue",
		adminPhoto: "Photo moderation",
		adminPosts: "Posts & reels",
		adminReviews: "Review queue",
		adminReports: "Reports",
		adminAppeals: "Appeals",
		adminSupport: "Support inbox",
		adminVerified: "Verified",
		adminVip: "VIP / TOP",
		adminAudit: "Audit log",
		actor: "Actor",
		timestamp: "Time",
		previous: "Previous",
		newStatus: "New status",
		reason: "Reason",
		note: "Note",
		approve: "Approve",
		reject: "Reject",
		hide: "Hide",
		pending: "Pending",
		approved: "Approved",
		rejected: "Rejected",
		rulesTitle: "Platform rules",
		rulesBody: "Israel 1+1 is a professional social directory for adults. No illegal content, no doxxing, no threats, no unpublished private data (phone, exact address, documents). Reviews are moderated. Only approved reviews are public. Owners cannot silently delete a legitimate review. Online status is not shown.",
		privacyTitle: "Privacy",
		privacyBody: "This prototype stores preferences in your browser only. It does not connect a database, payments, KYC, or a live phone directory. Production age assurance is a separate compliance workstream. Public fields: name, city, district if allowed, age, height, weight, languages, rating, badges. Never shown by default: phone, exact address, staff fields, moderation reasons, reviewer or viewer identities.",
		allCities: "All cities",
		results: "profiles",
		writeComment: "Write a comment",
		noComments: "No comments yet.",
		shareToast: "Share link copied (demo).",
		reportToast: "Report sent to moderation.",
		reviewToast: "Review submitted for moderation.",
		supportToast: "Message recorded in the demo inbox.",
		required: "Required",
		women: "Women",
		men: "Men",
		views: "views",
		likes: "likes",
		favs: "favorites",
		roleTitle: "How will you use the platform?",
		roleHint: "Choose access type. Guest can browse limited content without an account.",
		roleGuest: "Guest — browse limited profiles",
		roleClient: "Client — full browse, contacts after phone verify",
		roleIndividual: "Individual profile — create & manage my profile",
		roleAgency: "Agency — manage team profiles",
		continueAsGuest: "Continue as Guest",
		signInTitle: "Sign in",
		continueGoogle: "Continue with Google",
		or: "or",
		phoneTitle: "Phone verification",
		phoneHint: "Demo only — enter any number. No SMS is sent.",
		sendCode: "Send code",
		otpTitle: "Enter code",
		otpHint: "Demo: any 4+ digits works. Use 0000 to see invalid state.",
		otpInvalid: "Invalid code",
		otpRateLimit: "Too many attempts. Try again later.",
		resend: "Resend code",
		resendIn: "Resend in",
		verify: "Verify",
		setupIndividual: "Create your profile",
		setupHint: "Public fields only. Verification can be requested later.",
		unverifiedLimits: "Unverified: max 3 photos, 1 video (demo limits).",
		setupAgency: "Agency setup",
		agencyName: "Agency name",
		agencyDesc: "Description",
		agencyTeamHint: "Team members can be linked after creation (demo).",
		createAgency: "Create agency",
		guestContactCta: "Sign in or verify your phone to see available contact methods.",
		registerToUse: "Register to use platform features.",
		signIn: "Sign in",
		contactLabel: "Contact",
		navAgency: "Agency",
		trustSafety: "Trust & Safety",
		verifiedByAdmin: "Photos reviewed by administration",
		verifiedSupport: "Materials passed platform review rules at the time of publication.",
		safetyTitle: "Private Safety Reports",
		safetyHint: "Private demo channel. No public blacklist. No raw numbers shown.",
		falseReportWarning: "False reports are prohibited and may lead to account restrictions.",
		name: "Name",
		loadMore: "Show more",
		inDev: "In development",
		totalGirls: "All girls",
		registeredAccounts: "registered profiles",
		publishBlocked: "Publishing is only for individual and agency profiles. All accounts are strictly checked against fraud.",
		newBadge: "New",
		less: "less",
		timeOnSite: "Time on site",
		loyaltyHint: "The more time on the platform, the stronger the client status.",
		clientProfileHint: "Fill in your details and upload a photo.",
		preferences: "Preferences",
		prefHint: "Which profiles you are interested in",
		followers: "followers",
		message: "Message",
		gallery: "Photos",
		joinedSince: "since",
		block: "Block",
		param_Incall: "Incall",
		param_Outcall: "Outcall",
		param_Hotel: "Hotel",
		param_Dinner: "Dinner",
		param_Events: "Events",
		param_Shoots: "Shoots",
		param_Fitness: "Fitness",
		param_Travel: "Travel",
		param_Glamour: "Glamour",
		param_Casual: "Casual",
		param_Evening: "Evening",
		param_Weekend: "Weekend",
		lang_ru: "Russian",
		lang_he: "Hebrew",
		lang_en: "English",
		lang_ar: "Arabic"
	},
	ru: {
		brand: "Israel 1+1",
		tagline: "Профессиональный социальный каталог",
		ageNotice: "Платформа только для совершеннолетних 18+.",
		ageBody: "Продолжая, вы подтверждаете, что вам есть 18 лет, и принимаете Правила и Политику конфиденциальности.",
		continue: "Продолжить",
		exit: "Выйти",
		rules: "Правила",
		privacy: "Конфиденциальность",
		back: "Назад",
		next: "Далее",
		save: "Сохранить",
		cancel: "Отмена",
		close: "Закрыть",
		search: "Поиск",
		submit: "Отправить",
		sent: "Отправлено",
		demo: "Демо-прототип — вымышленные анкеты, без реальных контактов.",
		exitTitle: "Только 18+",
		exitBody: "Пользоваться Israel 1+1 можно только с 18 лет.",
		intentTitle: "Как вы хотите пользоваться платформой?",
		intentBrowse: "Ищу анкеты",
		intentCreate: "Хочу создать анкету",
		intentBoth: "И то и другое",
		discTitle: "Кого показывать?",
		discWomen: "Женщины",
		discMen: "Мужчины",
		discAll: "Все доступные анкеты",
		regTitle: "Регистрация",
		regHint: "Только демо — на сервер ничего не уходит.",
		emailPhone: "Почта или телефон",
		password: "Пароль",
		language: "Язык",
		consent: "Согласен с Правилами и Политикой конфиденциальности",
		nextTitle: "Куда дальше?",
		goHome: "На главную",
		goDir: "В каталог",
		createLater: "Создать анкету позже",
		createNow: "Создать анкету сейчас",
		navHome: "Главная",
		navDir: "Каталог",
		navSearch: "Поиск",
		navNew: "Новые",
		navReels: "Reels",
		navFav: "Избранное",
		navMe: "Моя анкета",
		navSupport: "Поддержка",
		navBlocked: "Безопасность",
		navSettings: "Настройки",
		navAdmin: "Админ",
		more: "Ещё",
		reelsStrip: "Reels",
		newProfiles: "Новые анкеты",
		recommended: "Рекомендации",
		feed: "Лента",
		likesLabel: "отметок «нравится»",
		yourStory: "Вы",
		storyStateNew: "Новые истории",
		storyStateSeen: "Все истории просмотрены",
		storyStateEmpty: "Нет историй",
		storyStateOwn: "Ваша история",
		storiesNewCount: "новых: {n}",
		storyOpenLabel: "Открыть историю",
		storyViewProfile: "Открыть профиль",
		storyClose: "Закрыть историю",
		storyPaused: "Пауза",
		storyProgressLabel: "Прогресс истории",
		storyPrevLabel: "Предыдущая история",
		storyNextLabel: "Следующая история",
		createPost: "Публикация",
		searchHint: "Укажите предпочтения — лента и каталог подстроятся.",
		openCatalog: "Открыть каталог",
		guestCta: "Зарегистрируйтесь, чтобы пользоваться функциями платформы",
		popular: "Популярные",
		safety: "Поддержка и безопасность",
		viewProfile: "Открыть анкету",
		like: "Нравится",
		comment: "Комментарий",
		comments: "Комментарии",
		savePost: "Сохранить",
		share: "Поделиться",
		report: "Жалоба",
		follow: "Подписка",
		following: "Вы подписаны",
		favorite: "В избранное",
		favorited: "В избранном",
		verified: "Verified",
		vip: "VIP",
		top: "TOP",
		rating: "Рейтинг",
		reviews: "Отзывы",
		posts: "Посты",
		about: "О себе",
		age: "Возраст",
		height: "Рост",
		weight: "Вес",
		city: "Город",
		district: "Район",
		languages: "Языки",
		cm: "см",
		kg: "кг",
		years: "лет",
		filters: "Фильтры",
		reset: "Сбросить",
		apply: "Применить",
		minRating: "Минимальный рейтинг",
		activeOnly: "Только активные",
		cards: "Карточки",
		grid: "Сетка",
		list: "Список",
		empty: "Пока пусто.",
		paused: "Анкета временно недоступна",
		pausedHint: "Профиль скрыт на время проверки или паузы владельца.",
		writeReview: "Оставить отзыв",
		reviewHint: "Отзыв станет публичным только после модерации.",
		impression: "Впечатление",
		impProfessional: "Профессионально",
		impPunctual: "Пунктуально",
		impRespectful: "Уважительно",
		impClear: "Понятная коммуникация",
		impRecommend: "Рекомендую",
		reviewText: "Текст по желанию",
		reviewPending: "На модерации",
		reviewApproved: "Опубликован",
		reviewRejected: "Не опубликован",
		reviewClarify: "Нужны уточнения",
		ownerReply: "Ответ владельца",
		reportTitle: "Жалоба",
		reportReason: "Причина",
		reportNote: "Приватная заметка модерации",
		rThreats: "Угрозы",
		rBlackmail: "Шантаж",
		rInsults: "Оскорбления",
		rPhone: "Номера телефонов",
		rAddress: "Адреса",
		rDocs: "Документы",
		rPrivate: "Личная переписка",
		rDoxxing: "Раскрытие личности",
		rAccusations: "Необоснованные обвинения",
		rIllegal: "Незаконный контент",
		rSexual: "Идентифицирующие интимные детали",
		rOther: "Другое",
		copied: "Ссылка скопирована",
		supportTitle: "Поддержка",
		supportBody: "Администрация модерирует контент, рассматривает жалобы и применяет правила платформы. Мы не утверждаем, что гарантируем безопасность каждого человека.",
		supportForm: "Сообщение (демо)",
		blockedTitle: "Заблокированные",
		blockedHint: "Заблокированные анкеты скрыты из ленты и каталога.",
		unblock: "Разблокировать",
		settingsTitle: "Настройки",
		theme: "Оформление",
		dark: "Тёмная",
		light: "Светлая",
		discoveryPref: "Кого показывать",
		signOut: "Сбросить демо-сессию",
		createProfile: "Создать анкету",
		publicName: "Публичное имя",
		username: "Имя пользователя",
		description: "Описание",
		myProfileHint: "Демо-анкета хранится только на этом устройстве.",
		notCreated: "Публичной анкеты ещё нет.",
		adminDash: "Сводка",
		adminQueue: "Очередь анкет",
		adminPhoto: "Модерация фото",
		adminPosts: "Посты и reels",
		adminReviews: "Очередь отзывов",
		adminReports: "Жалобы",
		adminAppeals: "Апелляции",
		adminSupport: "Входящие",
		adminVerified: "Verified",
		adminVip: "VIP / TOP",
		adminAudit: "Журнал",
		actor: "Кто",
		timestamp: "Время",
		previous: "Было",
		newStatus: "Стало",
		reason: "Причина",
		note: "Заметка",
		approve: "Одобрить",
		reject: "Отклонить",
		hide: "Скрыть",
		pending: "Ожидает",
		approved: "Одобрено",
		rejected: "Отклонено",
		rulesTitle: "Правила платформы",
		rulesBody: "Israel 1+1 — профессиональный социальный каталог для взрослых. Запрещены незаконный контент, доксинг, угрозы и публикация приватных данных (телефон, точный адрес, документы). Отзывы модерируются. Публичны только одобренные. Владелец не может тихо удалить законный отзыв. Онлайн-статус не показывается.",
		privacyTitle: "Конфиденциальность",
		privacyBody: "Прототип хранит настройки только в браузере. Нет базы данных, платежей, KYC и живого телефонного каталога. Проверка возраста в проде — отдельный compliance-поток. Публичные поля: имя, город, район если разрешён, возраст, рост, вес, языки, рейтинг, значки. По умолчанию скрыты: телефон, точный адрес, служебные поля, причины модерации, личности авторов отзывов и зрителей.",
		allCities: "Все города",
		results: "анкет",
		writeComment: "Написать комментарий",
		noComments: "Комментариев пока нет.",
		shareToast: "Ссылка скопирована (демо).",
		reportToast: "Жалоба отправлена на модерацию.",
		reviewToast: "Отзыв отправлен на модерацию.",
		supportToast: "Сообщение записано в демо-входящие.",
		required: "Обязательно",
		women: "Женщины",
		men: "Мужчины",
		views: "просмотров",
		likes: "лайков",
		favs: "в избранном",
		roleTitle: "Как вы хотите использовать платформу?",
		roleHint: "Выберите тип доступа. Гость может просматривать ограниченный контент без аккаунта.",
		roleGuest: "Гость — ограниченный просмотр анкет",
		roleClient: "Клиент — полный доступ, контакты после проверки телефона",
		roleIndividual: "Индивидуальный профиль — создать и вести анкету",
		roleAgency: "Агентство — управление командными профилями",
		continueAsGuest: "Продолжить как гость",
		signInTitle: "Вход",
		continueGoogle: "Продолжить с Google",
		or: "или",
		phoneTitle: "Подтверждение телефона",
		phoneHint: "Только демо — введите любой номер. SMS не отправляется.",
		sendCode: "Отправить код",
		otpTitle: "Введите код",
		otpHint: "Демо: любые 4+ цифры. 0000 — ошибка.",
		otpInvalid: "Неверный код",
		otpRateLimit: "Слишком много попыток. Попробуйте позже.",
		resend: "Отправить снова",
		resendIn: "Повтор через",
		verify: "Подтвердить",
		setupIndividual: "Создайте профиль",
		setupHint: "Только публичные поля. Верификацию можно запросить позже.",
		unverifiedLimits: "Без верификации: макс. 3 фото, 1 видео (демо-лимиты).",
		setupAgency: "Настройка агентства",
		agencyName: "Название агентства",
		agencyDesc: "Описание",
		agencyTeamHint: "Участников команды можно привязать после создания (демо).",
		createAgency: "Создать агентство",
		guestContactCta: "Войдите или подтвердите номер, чтобы увидеть доступные способы связи.",
		registerToUse: "Зарегистрируйтесь, чтобы пользоваться функциями платформы.",
		signIn: "Войти",
		contactLabel: "Контакт",
		navAgency: "Агентство",
		trustSafety: "Trust & Safety",
		verifiedByAdmin: "Фото проверены администрацией",
		verifiedSupport: "Материалы прошли проверку по правилам платформы на момент публикации.",
		safetyTitle: "Приватные отчёты безопасности",
		safetyHint: "Приватный демо-канал. Без публичного чёрного списка. Номера не показываются.",
		falseReportWarning: "Ложные жалобы запрещены и могут привести к ограничениям.",
		name: "Имя",
		loadMore: "Показать ещё",
		inDev: "В разработке",
		totalGirls: "Всего девушек",
		registeredAccounts: "зарегистрированных анкет",
		publishBlocked: "Публикации доступны только анкетам individual и агентствам. Все аккаунты строго проверяются от мошенников.",
		newBadge: "Новый",
		less: "свернуть",
		timeOnSite: "Время на сайте",
		loyaltyHint: "Чем больше времени на платформе, тем выше статус клиента.",
		clientProfileHint: "Заполните анкету о себе и загрузите фото.",
		preferences: "Предпочтения",
		prefHint: "Какими анкетами вы интересуетесь",
		followers: "подписчиков",
		message: "Написать",
		gallery: "Фото",
		joinedSince: "на сайте с",
		block: "Блокировать",
		param_Incall: "Встреча у неё",
		param_Outcall: "Выезд",
		param_Hotel: "Отель",
		param_Dinner: "Ужин",
		param_Events: "Мероприятия",
		param_Shoots: "Съёмки",
		param_Fitness: "Фитнес",
		param_Travel: "Путешествия",
		param_Glamour: "Гламур",
		param_Casual: "Повседневный",
		param_Evening: "Вечер",
		param_Weekend: "Выходные",
		lang_ru: "Русский",
		lang_he: "Иврит",
		lang_en: "Английский",
		lang_ar: "Арабский"
	},
	he: {
		brand: "Israel 1+1",
		tagline: "מדריך חברתי מקצועי",
		ageNotice: "הפלטפורמה מיועדת לבגירים בני 18 ומעלה.",
		ageBody: "בהמשך אתם מאשרים שגילכם 18 לפחות ומסכימים לכללים ולמדיניות הפרטיות.",
		continue: "המשך",
		exit: "יציאה",
		rules: "כללים",
		privacy: "פרטיות",
		back: "חזרה",
		next: "הבא",
		save: "שמירה",
		cancel: "ביטול",
		close: "סגירה",
		search: "חיפוש",
		submit: "שליחה",
		sent: "נשלח",
		demo: "אב-טיפוס — פרופילים בדויים, ללא פרטי קשר אמיתיים.",
		exitTitle: "18+ בלבד",
		exitBody: "יש להיות בני 18 לפחות כדי להשתמש ב-Israel 1+1.",
		intentTitle: "איך תרצו להשתמש בפלטפורמה?",
		intentBrowse: "אני מחפש/ת פרופילים",
		intentCreate: "אני רוצה ליצור פרופיל",
		intentBoth: "שניהם",
		discTitle: "את מי לגלות?",
		discWomen: "נשים",
		discMen: "גברים",
		discAll: "כל הפרופילים הזמינים",
		regTitle: "יצירת חשבון",
		regHint: "דמו בלבד — שום דבר לא נשלח לשרת.",
		emailPhone: "אימייל או טלפון",
		password: "סיסמה",
		language: "שפה",
		consent: "אני מסכים/ה לכללים ולמדיניות הפרטיות",
		nextTitle: "לאן עכשיו?",
		goHome: "לדף הבית",
		goDir: "למדריך",
		createLater: "ליצור פרופיל אחר כך",
		createNow: "ליצור פרופיל עכשיו",
		navHome: "בית",
		navDir: "מדריך",
		navSearch: "חיפוש",
		navNew: "חדשים",
		navReels: "Reels",
		navFav: "מועדפים",
		navMe: "הפרופיל שלי",
		navSupport: "תמיכה",
		navBlocked: "אמון ובטיחות",
		navSettings: "הגדרות",
		navAdmin: "ניהול",
		more: "עוד",
		reelsStrip: "Reels",
		newProfiles: "פרופילים חדשים",
		recommended: "מומלצים",
		feed: "פיד",
		popular: "פופולריים",
		safety: "תמיכה ובטיחות",
		viewProfile: "צפייה בפרופיל",
		like: "לייק",
		comment: "תגובה",
		comments: "תגובות",
		savePost: "שמירה",
		share: "שיתוף",
		report: "דיווח",
		follow: "מעקב",
		following: "במעקב",
		favorite: "מועדף",
		favorited: "נשמר",
		verified: "מאומת",
		vip: "VIP",
		top: "TOP",
		rating: "דירוג",
		reviews: "ביקורות",
		posts: "פוסטים",
		about: "אודות",
		age: "גיל",
		height: "גובה",
		weight: "משקל",
		city: "עיר",
		district: "אזור",
		languages: "שפות",
		cm: "ס״מ",
		kg: "ק״ג",
		years: "",
		filters: "סינון",
		reset: "איפוס",
		apply: "החלה",
		minRating: "דירוג מינימלי",
		activeOnly: "פרופילים פעילים בלבד",
		cards: "כרטיסים",
		grid: "רשת",
		list: "רשימה",
		empty: "אין מה להציג.",
		paused: "הפרופיל אינו זמין כרגע",
		pausedHint: "הפרופיל מוסתר בזמן בדיקה או השהיה על ידי הבעלים.",
		writeReview: "כתיבת ביקורת",
		reviewHint: "ביקורות מתפרסמות רק לאחר פיקוח.",
		impression: "רושם",
		impProfessional: "מקצועי",
		impPunctual: "דייקן",
		impRespectful: "מכבד",
		impClear: "תקשורת ברורה",
		impRecommend: "מומלץ",
		reviewText: "טקסט אופציונלי",
		reviewPending: "ממתין לפיקוח",
		reviewApproved: "אושר",
		reviewRejected: "לא פורסם",
		reviewClarify: "נדרש הבהרה",
		ownerReply: "תגובת הבעלים",
		reportTitle: "דיווח",
		reportReason: "סיבה",
		reportNote: "הערה פרטית לפיקוח",
		rThreats: "איומים",
		rBlackmail: "סחיטה",
		rInsults: "עלבון",
		rPhone: "מספרי טלפון",
		rAddress: "כתובות",
		rDocs: "מסמכים",
		rPrivate: "הודעות פרטיות",
		rDoxxing: "חשיפת זהות",
		rAccusations: "האשמות לא מבוססות",
		rIllegal: "תוכן לא חוקי",
		rSexual: "פרטים אינטימיים מזהים",
		rOther: "אחר",
		copied: "הקישור הועתק",
		supportTitle: "תמיכה",
		supportBody: "ההנהלה מפקחת על תוכן, בוחנת דיווחים ומיישמת את כללי הפלטפורמה. אין טענה שאנחנו מבטיחים את בטיחותו של כל אדם.",
		supportForm: "הודעה (דמו)",
		blockedTitle: "פרופילים חסומים",
		blockedHint: "פרופילים חסומים מוסתרים מהפיד ומהמדריך.",
		unblock: "ביטול חסימה",
		settingsTitle: "הגדרות",
		theme: "מראה",
		dark: "כהה",
		light: "בהיר",
		discoveryPref: "גילוי",
		signOut: "איפוס סשן הדמו",
		createProfile: "יצירת פרופיל",
		publicName: "שם ציבורי",
		username: "שם משתמש",
		description: "תיאור",
		myProfileHint: "פרופיל הדמו נשמר במכשיר זה בלבד.",
		notCreated: "עדיין לא יצרתם פרופיל ציבורי.",
		adminDash: "לוח בקרה",
		adminQueue: "תור פרופילים",
		adminPhoto: "פיקוח תמונות",
		adminPosts: "פוסטים ו-Reels",
		adminReviews: "תור ביקורות",
		adminReports: "דיווחים",
		adminAppeals: "ערעורים",
		adminSupport: "פניות",
		adminVerified: "מאומת",
		adminVip: "VIP / TOP",
		adminAudit: "יומן",
		actor: "גורם",
		timestamp: "זמן",
		previous: "קודם",
		newStatus: "חדש",
		reason: "סיבה",
		note: "הערה",
		approve: "אישור",
		reject: "דחייה",
		hide: "הסתרה",
		pending: "ממתין",
		approved: "אושר",
		rejected: "נדחה",
		rulesTitle: "כללי הפלטפורמה",
		rulesBody: "Israel 1+1 הוא מדריך חברתי מקצועי למבוגרים. אסור תוכן לא חוקי, חשיפת זהות, איומים ונתונים פרטיים (טלפון, כתובת מדויקת, מסמכים). ביקורות מפוקחות. רק ביקורות מאושרות ציבוריות. הבעלים לא יכול למחוק ביקורת לגיטימית בשקט. אין סטטוס מקוון.",
		privacyTitle: "פרטיות",
		privacyBody: "האב-טיפוס שומר העדפות בדפדפן בלבד. אין מסד נתונים, תשלומים, KYC או ספר טלפונים חי. אימות גיל בייצור הוא תהליך ציות נפרד. שדות ציבוריים: שם, עיר, אזור אם מותר, גיל, גובה, משקל, שפות, דירוג, תגים. לא מוצגים כברירת מחדל: טלפון, כתובת מדויקת, שדות צוות, סיבות פיקוח, זהויות מבקרים.",
		allCities: "כל הערים",
		results: "פרופילים",
		writeComment: "כתבו תגובה",
		noComments: "אין תגובות עדיין.",
		shareToast: "קישור הועתק (דמו).",
		reportToast: "הדיווח נשלח לפיקוח.",
		reviewToast: "הביקורת נשלחה לפיקוח.",
		supportToast: "ההודעה נשמרה בתיבת הדמו.",
		required: "חובה",
		women: "נשים",
		men: "גברים",
		views: "צפיות",
		likes: "לייקים",
		favs: "מועדפים",
		loadMore: "הצג עוד",
		inDev: "בפיתוח",
		totalGirls: "כל הבנות",
		registeredAccounts: "פרופילים רשומים",
		publishBlocked: "Publishing is only for individual and agency profiles. All accounts are strictly checked against fraud.",
		newBadge: "חדש",
		storyStateNew: "סיפורים חדשים",
		storyStateSeen: "כל הסיפורים נצפו",
		storyStateEmpty: "אין סיפורים",
		storyStateOwn: "הסיפור שלך",
		storiesNewCount: "{n} חדשים",
		storyOpenLabel: "פתיחת סיפור",
		storyViewProfile: "פתיחת פרופיל",
		storyClose: "סגירת סיפור",
		storyPaused: "מושהה",
		storyProgressLabel: "התקדמות הסיפור",
		storyPrevLabel: "הסיפור הקודם",
		storyNextLabel: "הסיפור הבא",
		less: "פחות",
		timeOnSite: "זמן באתר",
		loyaltyHint: "The more time on the platform, the stronger the client status.",
		clientProfileHint: "Fill in your details and upload a photo.",
		preferences: "העדפות",
		prefHint: "Which profiles you are interested in",
		followers: "עוקבים",
		message: "שליחת הודעה",
		gallery: "תמונות",
		joinedSince: "באתר מאז",
		block: "חסימה",
		param_Incall: "במקום",
		param_Outcall: "ניידת",
		param_Hotel: "מלון",
		param_Dinner: "ארוחת ערב",
		param_Events: "אירועים",
		param_Shoots: "צילומים",
		param_Fitness: "כושר",
		param_Travel: "נסיעות",
		param_Glamour: "גלאם",
		param_Casual: "יומיומי",
		param_Evening: "ערב",
		param_Weekend: "סוף שבוע",
		lang_ru: "רוסית",
		lang_he: "עברית",
		lang_en: "אנגלית",
		lang_ar: "ערבית"
	},
	ar: {
		brand: "Israel 1+1",
		tagline: "دليل اجتماعي مهني",
		ageNotice: "المنصة للبالغين 18 عاماً فأكثر.",
		ageBody: "بالمتابعة تؤكد أن عمرك 18 على الأقل وتوافق على القواعد والخصوصية.",
		continue: "متابعة",
		exit: "خروج",
		rules: "القواعد",
		privacy: "الخصوصية",
		back: "رجوع",
		next: "التالي",
		save: "حفظ",
		cancel: "إلغاء",
		close: "إغلاق",
		search: "بحث",
		submit: "إرسال",
		sent: "تم الإرسال",
		demo: "نموذج تجريبي — ملفات وهمية بدون بيانات تواصل حقيقية.",
		exitTitle: "18+ فقط",
		exitBody: "يجب أن يكون عمرك 18 أو أكثر لاستخدام Israel 1+1.",
		intentTitle: "كيف تريد استخدام المنصة؟",
		intentBrowse: "أبحث عن ملفات",
		intentCreate: "أريد إنشاء ملف",
		intentBoth: "كلاهما",
		discTitle: "من تريد اكتشافه؟",
		discWomen: "نساء",
		discMen: "رجال",
		discAll: "كل الملفات المتاحة",
		regTitle: "إنشاء حساب",
		regHint: "تجريبي فقط — لا يُرسل شيء إلى خادم.",
		emailPhone: "بريد أو هاتف",
		password: "كلمة المرور",
		language: "اللغة",
		consent: "أوافق على القواعد وإشعار الخصوصية",
		nextTitle: "إلى أين بعد ذلك؟",
		goHome: "الصفحة الرئيسية",
		goDir: "الدليل",
		createLater: "إنشاء الملف لاحقاً",
		createNow: "إنشاء الملف الآن",
		navHome: "الرئيسية",
		navDir: "الدليل",
		navSearch: "بحث",
		navNew: "جديد",
		navReels: "Reels",
		navFav: "المفضلة",
		navMe: "ملفي",
		navSupport: "الدعم",
		navBlocked: "الثقة والسلامة",
		navSettings: "الإعدادات",
		navAdmin: "الإدارة",
		more: "المزيد",
		reelsStrip: "Reels",
		newProfiles: "ملفات جديدة",
		recommended: "مقترحة",
		feed: "الخلاصة",
		popular: "الأشهر",
		safety: "الدعم والسلامة",
		viewProfile: "عرض الملف",
		like: "إعجاب",
		comment: "تعليق",
		comments: "تعليقات",
		savePost: "حفظ",
		share: "مشاركة",
		report: "إبلاغ",
		follow: "متابعة",
		following: "تتابع",
		favorite: "مفضلة",
		favorited: "محفوظ",
		verified: "موثّق",
		vip: "VIP",
		top: "TOP",
		rating: "التقييم",
		reviews: "المراجعات",
		posts: "المنشورات",
		about: "نبذة",
		age: "العمر",
		height: "الطول",
		weight: "الوزن",
		city: "المدينة",
		district: "المنطقة",
		languages: "اللغات",
		cm: "سم",
		kg: "كغ",
		years: "",
		filters: "تصفية",
		reset: "إعادة ضبط",
		apply: "تطبيق",
		minRating: "أدنى تقييم",
		activeOnly: "الملفات النشطة فقط",
		cards: "بطاقات",
		grid: "شبكة",
		list: "قائمة",
		empty: "لا يوجد شيء بعد.",
		paused: "الملف غير متاح مؤقتاً",
		pausedHint: "الملف مخفي أثناء المراجعة أو الإيقاف من المالك.",
		writeReview: "كتابة مراجعة",
		reviewHint: "تُنشر المراجعات بعد الإشراف فقط.",
		impression: "الانطباع",
		impProfessional: "مهني",
		impPunctual: "دقيق في المواعيد",
		impRespectful: "محترم",
		impClear: "تواصل واضح",
		impRecommend: "أنصح به",
		reviewText: "نص اختياري",
		reviewPending: "قيد الإشراف",
		reviewApproved: "مقبول",
		reviewRejected: "غير منشور",
		reviewClarify: "يحتاج توضيحاً",
		ownerReply: "رد المالك",
		reportTitle: "إبلاغ",
		reportReason: "السبب",
		reportNote: "ملاحظة خاصة للإشراف",
		rThreats: "تهديدات",
		rBlackmail: "ابتزاز",
		rInsults: "إهانات",
		rPhone: "أرقام هواتف",
		rAddress: "عناوين",
		rDocs: "وثائق",
		rPrivate: "رسائل خاصة",
		rDoxxing: "كشف الهوية",
		rAccusations: "اتهامات بلا دليل",
		rIllegal: "محتوى غير قانوني",
		rSexual: "تفاصيل حميمة كاشفة",
		rOther: "أخرى",
		copied: "تم نسخ الرابط",
		supportTitle: "الدعم",
		supportBody: "الإدارة تشرف على المحتوى وتراجع البلاغات وتطبّق قواعد المنصة. لا ندّعي ضمان سلامة كل شخص.",
		supportForm: "رسالة (تجريبي)",
		blockedTitle: "ملفات محظورة",
		blockedHint: "الملفات المحظورة مخفية من الخلاصة والدليل.",
		unblock: "إلغاء الحظر",
		settingsTitle: "الإعدادات",
		theme: "المظهر",
		dark: "داكن",
		light: "فاتح",
		discoveryPref: "الاكتشاف",
		signOut: "إعادة ضبط الجلسة التجريبية",
		createProfile: "إنشاء ملف",
		publicName: "الاسم العلني",
		username: "اسم المستخدم",
		description: "الوصف",
		myProfileHint: "الملف التجريبي يُحفظ على هذا الجهاز فقط.",
		notCreated: "لم تُنشئ ملفاً علنياً بعد.",
		adminDash: "لوحة",
		adminQueue: "طابور الملفات",
		adminPhoto: "إشراف الصور",
		adminPosts: "المنشورات والـ Reels",
		adminReviews: "طابور المراجعات",
		adminReports: "البلاغات",
		adminAppeals: "الطعون",
		adminSupport: "الوارد",
		adminVerified: "موثّق",
		adminVip: "VIP / TOP",
		adminAudit: "السجل",
		actor: "المنفّذ",
		timestamp: "الوقت",
		previous: "السابق",
		newStatus: "الجديد",
		reason: "السبب",
		note: "ملاحظة",
		approve: "قبول",
		reject: "رفض",
		hide: "إخفاء",
		pending: "قيد الانتظار",
		approved: "مقبول",
		rejected: "مرفوض",
		rulesTitle: "قواعد المنصة",
		rulesBody: "Israel 1+1 دليل اجتماعي مهني للبالغين. يُمنع المحتوى غير القانوني وكشف الهوية والتهديدات والبيانات الخاصة (هاتف، عنوان دقيق، وثائق). المراجعات تُشرف. العلني فقط ما يُقبل. لا يمكن للمالك حذف مراجعة مشروعة بهدوء. لا يظهر حالة الاتصال.",
		privacyTitle: "الخصوصية",
		privacyBody: "يحفظ هذا النموذج التفضيلات في المتصفح فقط. لا قاعدة بيانات ولا مدفوعات ولا KYC ولا دليل هواتف حي. التحقق من العمر في الإنتاج مسار امتثال منفصل. الحقول العلنية: الاسم، المدينة، المنطقة إن سُمح، العمر، الطول، الوزن، اللغات، التقييم، الشارات. لا يظهر افتراضياً: الهاتف، العنوان الدقيق، حقول الموظفين، أسباب الإشراف، هويات المراجعين أو المشاهدين.",
		allCities: "كل المدن",
		results: "ملفات",
		writeComment: "اكتب تعليقاً",
		noComments: "لا تعليقات بعد.",
		shareToast: "تم نسخ الرابط (تجريبي).",
		reportToast: "أُرسل البلاغ إلى الإشراف.",
		reviewToast: "أُرسلت المراجعة إلى الإشراف.",
		supportToast: "سُجّلت الرسالة في الصندوق التجريبي.",
		required: "مطلوب",
		women: "نساء",
		men: "رجال",
		views: "مشاهدات",
		likes: "إعجابات",
		favs: "مفضلات",
		loadMore: "عرض المزيد",
		inDev: "قيد التطوير",
		totalGirls: "كل الفتيات",
		registeredAccounts: "ملفات مسجلة",
		publishBlocked: "Publishing is only for individual and agency profiles. All accounts are strictly checked against fraud.",
		newBadge: "جديد",
		storyStateNew: "قصص جديدة",
		storyStateSeen: "تمت مشاهدة كل القصص",
		storyStateEmpty: "لا توجد قصص",
		storyStateOwn: "قصتك",
		storiesNewCount: "{n} جديدة",
		storyOpenLabel: "فتح القصة",
		storyViewProfile: "فتح الملف الشخصي",
		storyClose: "إغلاق القصة",
		storyPaused: "متوقف مؤقتًا",
		storyProgressLabel: "تقدم القصة",
		storyPrevLabel: "القصة السابقة",
		storyNextLabel: "القصة التالية",
		less: "أقل",
		timeOnSite: "الوقت في الموقع",
		loyaltyHint: "The more time on the platform, the stronger the client status.",
		clientProfileHint: "Fill in your details and upload a photo.",
		preferences: "التفضيلات",
		prefHint: "Which profiles you are interested in",
		followers: "متابِعون",
		message: "مراسلة",
		gallery: "الصور",
		joinedSince: "منذ",
		block: "حظر",
		param_Incall: "في المكان",
		param_Outcall: "خارج المكان",
		param_Hotel: "فندق",
		param_Dinner: "عشاء",
		param_Events: "مناسبات",
		param_Shoots: "جلسات تصوير",
		param_Fitness: "لياقة",
		param_Travel: "سفر",
		param_Glamour: "أناقة",
		param_Casual: "يومي",
		param_Evening: "مسائي",
		param_Weekend: "نهاية الأسبوع",
		lang_ru: "روسية",
		lang_he: "عبرية",
		lang_en: "إنجليزية",
		lang_ar: "عربية"
	}
};
var CITIES = [
	"Tel Aviv",
	"Rishon LeZion",
	"Haifa",
	"Jerusalem",
	"Netanya",
	"Eilat",
	"Ashkelon",
	"Herzliya"
];
var CITY_LABEL = {
	en: {
		"Tel Aviv": "Tel Aviv",
		"Rishon LeZion": "Rishon LeZion",
		Haifa: "Haifa",
		Jerusalem: "Jerusalem",
		Netanya: "Netanya",
		Eilat: "Eilat",
		Ashkelon: "Ashkelon",
		Herzliya: "Herzliya"
	},
	ru: {
		"Tel Aviv": "Тель-Авив",
		"Rishon LeZion": "Ришон-ле-Цион",
		Haifa: "Хайфа",
		Jerusalem: "Иерусалим",
		Netanya: "Нетания",
		Eilat: "Эйлат",
		Ashkelon: "Ашкелон",
		Herzliya: "Герцлия"
	},
	he: {
		"Tel Aviv": "תל אביב",
		"Rishon LeZion": "ראשון לציון",
		Haifa: "חיפה",
		Jerusalem: "ירושלים",
		Netanya: "נתניה",
		Eilat: "אילת",
		Ashkelon: "אשקלון",
		Herzliya: "הרצליה"
	},
	ar: {
		"Tel Aviv": "تل أبيب",
		"Rishon LeZion": "ريشون لتسيون",
		Haifa: "حيفا",
		Jerusalem: "القدس",
		Netanya: "نتانيا",
		Eilat: "إيلات",
		Ashkelon: "عسقلان",
		Herzliya: "هرتسليا"
	}
};
var L = (en, ru, he, ar) => ({
	en,
	ru,
	he,
	ar
});
var PROFILES = [
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
		languages: [
			"he",
			"en",
			"ru"
		],
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
		gallery: [
			"/portraits/noa.jpg",
			"/portraits/lina.jpg",
			"/portraits/sofia.jpg"
		],
		about: L("Editorial muse of the directory. Studio work, quiet evenings, Hebrew / English / Russian.", "Редакционная муза каталога. Студия, спокойные вечера, иврит / английский / русский.", "המוזה העריכתית של המדריך. סטודיו, ערבים שקטים, עברית / אנגלית / רוסית.", "الوجه التحريري للدليل. استوديو، أمسيات هادئة، عبرية / إنجليزية / روسية."),
		params: ["studio", "editorial"]
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
		languages: [
			"ru",
			"he",
			"en"
		],
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
		about: L("Rooftop light, linen, and long conversations. New to the directory this month.", "Свет с крыши, лён и длинные разговоры. Новая в каталоге в этом месяце.", "אור גגות, פשתן ושיחות ארוכות. חדשה במדריך החודש.", "ضوء الأسطح، كتان وحوارات طويلة. جديدة هذا الشهر."),
		params: ["rooftop"]
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
		languages: [
			"he",
			"ar",
			"en"
		],
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
		about: L("Carmel mornings and the bay. Speaks Hebrew, Arabic and English.", "Утра на Кармеле и бухта. Иврит, арабский и английский.", "בקרים בכרמל והמפרץ. עברית, ערבית ואנגלית.", "صباحات الكرمل والخليج. عبرية وعربية وإنجليزية."),
		params: ["bay"]
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
		about: L("Stone streets, knit layers, museums on quiet days.", "Каменные улицы, вязаные слои, музеи в тихие дни.", "רחובות אבן, סריגים, מוזיאונים בימים שקטים.", "شوارع حجرية، طبقات صوف، متاحف في الأيام الهادئة."),
		params: ["old-city"]
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
		about: L("Desert dusk and the Red Sea. Just joined — still filling the gallery.", "Закат в пустыне и Красное море. Только присоединилась.", "שקיעה במדבר וים סוף. הצטרפה לאחרונה.", "غروب الصحراء والبحر الأحمر. انضمّت حديثاً."),
		params: ["sea"]
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
		languages: [
			"ru",
			"he",
			"en"
		],
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
		about: L("Black turtleneck, sea wind, slow afternoons on the promenade.", "Чёрная водолазка, морской ветер, медленные дни на набережной.", "גולף שחור, רוח ים, אחר צהריים איטיים בטיילת.", "ياقة سوداء، ريح البحر، عصاري هادئة على الكورنيش."),
		params: ["promenade"]
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
		about: L("Coast light and a calm schedule. Prefers clear plans.", "Свет побережья и спокойный график. Любит понятные планы.", "אור החוף ולוח זמנים רגוע. מעדיפה תוכניות ברורות.", "ضوء الساحل وجدول هادئ. تفضّل خططاً واضحة."),
		params: ["coast"]
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
		about: L("Night streets, design work, and a short list of good coffee.", "Ночные улицы, дизайн и короткий список хорошего кофе.", "רחובות לילה, עיצוב ורשימה קצרה של קפה טוב.", "شوارع ليلية، تصميم وقائمة قصيرة من القهوة الجيدة."),
		params: ["design"]
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
		languages: [
			"he",
			"ar",
			"en"
		],
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
		about: L("Hillside walks and linen jackets. Hebrew, Arabic, English.", "Прогулки по склонам и льняные пиджаки. Иврит, арабский, английский.", "טיולים במדרון וז׳קטים מפשתן. עברית, ערבית, אנגלית.", "مشايات على المنحدر وسترات كتان. عبرية وعربية وإنجليزية."),
		params: ["hills"]
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
		about: L("Evenings in the city, denim, photography on weekends.", "Вечера в городе, деним, фотография по выходным.", "ערבים בעיר, ג׳ינס, צילום בסופי שבוע.", "أمسيات في المدينة، دنيم، تصوير في عطلة الأسبوع."),
		params: ["photo"]
	}
];
var POSTS = [
	{
		id: "p1",
		profileId: "noa",
		photos: ["/portraits/noa.jpg"],
		caption: L("Studio notes.", "Студийные заметки.", "הערות סטודיו.", "ملاحظات الاستوديو."),
		likes: 142,
		comments: 31,
		created: "2026-09-20"
	},
	{
		id: "p2",
		profileId: "lina",
		photos: ["/portraits/lina.jpg"],
		caption: L("Golden hour up top.", "Золотой час наверху.", "שעת הזהב למעלה.", "الساعة الذهبية فوق."),
		likes: 88,
		comments: 12,
		created: "2026-09-19"
	},
	{
		id: "p3",
		profileId: "sofia",
		photos: ["/portraits/sofia.jpg"],
		caption: L("Wind off the water.", "Ветер с воды.", "רוח מהמים.", "ريح من الماء."),
		likes: 121,
		comments: 18,
		created: "2026-09-18"
	},
	{
		id: "p4",
		profileId: "maya",
		photos: ["/portraits/maya.jpg"],
		caption: L("Bay in the back.", "Бухта на фоне.", "המפרץ מאחור.", "الخليج في الخلف."),
		likes: 64,
		comments: 7,
		created: "2026-09-17"
	},
	{
		id: "p5",
		profileId: "adam",
		photos: ["/portraits/adam.jpg"],
		caption: L("After eleven.", "После одиннадцати.", "אחרי אחת עשרה.", "بعد الحادية عشرة."),
		likes: 41,
		comments: 4,
		created: "2026-09-16"
	},
	{
		id: "p6",
		profileId: "rina",
		photos: ["/portraits/rina.jpg"],
		caption: L("Coast light.", "Свет побережья.", "אור החוף.", "ضوء الساحل."),
		likes: 53,
		comments: 6,
		created: "2026-09-15"
	}
];
var REELS = [
	{
		id: "r1",
		profileId: "noa",
		photo: "/portraits/noa.jpg",
		caption: L("Dark studio.", "Тёмная студия.", "סטודיו כהה.", "استوديو داكن."),
		likes: 220,
		comments: 19
	},
	{
		id: "r2",
		profileId: "lina",
		photo: "/portraits/lina.jpg",
		caption: L("Roof.", "Крыша.", "גג.", "سطح."),
		likes: 140,
		comments: 8
	},
	{
		id: "r3",
		profileId: "sofia",
		photo: "/portraits/sofia.jpg",
		caption: L("Promenade.", "Набережная.", "טיילת.", "كورنيش."),
		likes: 175,
		comments: 11
	},
	{
		id: "r4",
		profileId: "daria",
		photo: "/portraits/daria.jpg",
		caption: L("Dusk.", "Сумерки.", "דמדומים.", "غسق."),
		likes: 90,
		comments: 5
	},
	{
		id: "r5",
		profileId: "maya",
		photo: "/portraits/maya.jpg",
		caption: L("Carmel.", "Кармель.", "כרמל.", "الكرمل."),
		likes: 101,
		comments: 6
	},
	{
		id: "r6",
		profileId: "adam",
		photo: "/portraits/adam.jpg",
		caption: L("Night walk.", "Ночная прогулка.", "הליכת לילה.", "مشية ليلية."),
		likes: 70,
		comments: 3
	}
];
var REVIEWS = [
	{
		id: "rv1",
		profileId: "noa",
		rating: 5,
		impression: "professional",
		text: "Clear, calm, on time.",
		status: "approved",
		created: "2026-09-10",
		reply: "Thank you."
	},
	{
		id: "rv2",
		profileId: "noa",
		rating: 5,
		impression: "respectful",
		text: "Straightforward conversation.",
		status: "approved",
		created: "2026-09-02"
	},
	{
		id: "rv3",
		profileId: "sofia",
		rating: 5,
		impression: "punctual",
		text: "Arrived exactly as planned.",
		status: "approved",
		created: "2026-08-28"
	},
	{
		id: "rv4",
		profileId: "lina",
		rating: 4,
		impression: "clear",
		text: "Good communication.",
		status: "approved",
		created: "2026-09-08"
	},
	{
		id: "rv5",
		profileId: "maya",
		rating: 5,
		impression: "would_recommend",
		text: "Would recommend the profile.",
		status: "pending",
		created: "2026-09-21"
	},
	{
		id: "rv6",
		profileId: "adam",
		rating: 2,
		impression: "professional",
		text: "Needs clarification on dates.",
		status: "needs_clarification",
		created: "2026-09-18"
	}
];
var ADMIN_QUEUE = [
	{
		id: "aq1",
		kind: "profile",
		title: "Daria · Eilat",
		subtitle: "New profile",
		status: "pending",
		created: "2026-09-16"
	},
	{
		id: "aq2",
		kind: "photo",
		title: "Yonatan gallery #2",
		subtitle: "Photo moderation",
		status: "pending",
		created: "2026-09-18"
	},
	{
		id: "aq3",
		kind: "post",
		title: "Maya · Bay in the back",
		subtitle: "Post",
		status: "approved",
		created: "2026-09-17"
	},
	{
		id: "aq4",
		kind: "review",
		title: "Review on Maya",
		subtitle: "Pending moderation",
		status: "pending",
		created: "2026-09-21"
	},
	{
		id: "aq5",
		kind: "report",
		title: "Report · phone number in comment",
		subtitle: "Hidden pending review",
		status: "pending",
		created: "2026-09-20"
	},
	{
		id: "aq6",
		kind: "verified",
		title: "Omer · Verified request",
		subtitle: "Badge",
		status: "pending",
		created: "2026-09-14"
	},
	{
		id: "aq7",
		kind: "vip",
		title: "Lina · VIP request",
		subtitle: "Badge",
		status: "pending",
		created: "2026-09-19"
	},
	{
		id: "aq8",
		kind: "appeal",
		title: "Yael · pause appeal",
		subtitle: "Owner appeal",
		status: "pending",
		created: "2026-09-15"
	}
];
var AUDIT = [
	{
		id: "au1",
		actor: "mod.ira",
		timestamp: "2026-09-21 14:12",
		target: "Review rv5",
		previous: "submitted",
		next: "pending",
		reason: "Queue",
		note: "Auto-route"
	},
	{
		id: "au2",
		actor: "mod.ira",
		timestamp: "2026-09-20 11:04",
		target: "Noa badges",
		previous: "verified",
		next: "verified+vip+top",
		reason: "Heritage account",
		note: "Manual"
	},
	{
		id: "au3",
		actor: "mod.lev",
		timestamp: "2026-09-18 09:40",
		target: "Yael status",
		previous: "active",
		next: "paused",
		reason: "Owner request",
		note: "No public reason"
	}
];
function profileById(id) {
	return PROFILES.find((p) => p.id === id);
}
function reelsByProfile(id) {
	return REELS.filter((r) => r.profileId === id);
}
function reviewsByProfile(id) {
	return REVIEWS.filter((r) => r.profileId === id);
}
var NEW_IDS = [
	"daria",
	"lina",
	"yonatan"
];
var STORIES = [
	{
		id: "s-noa-1",
		authorId: "noa",
		mediaType: "image",
		mediaUrl: "/portraits/noa.jpg",
		caption: {
			en: "New studio setup, finally sorted.",
			ru: "Новая студия — наконец-то готова.",
			he: "סטודיו חדש, הסתדר סוף סוף.",
			ar: "استوديو جديد، جاهز أخيرًا."
		},
		createdAt: "2026-09-24T18:10:00.000Z",
		durationMs: 5e3
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
			ar: "قهوة واستراحة قصيرة بين المكالمات."
		},
		createdAt: "2026-09-24T16:40:00.000Z",
		durationMs: 6e3
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
			ar: "مساءً: مواعيد مفتوحة للغد."
		},
		createdAt: "2026-09-24T16:44:00.000Z",
		durationMs: 5e3
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
			ar: "تحديث الإعلان — صور من الشرفة."
		},
		createdAt: "2026-09-24T16:47:00.000Z",
		durationMs: 5500
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
			ar: "الجري الصباحي، بدأ اليوم بشكل صحيح."
		},
		createdAt: "2026-09-24T06:20:00.000Z",
		durationMs: 5e3
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
			ar: "وقّعت على عميلين جديدين هذا الأسبوع."
		},
		createdAt: "2026-09-25T07:05:00.000Z",
		durationMs: 5e3
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
			ar: "شكرًا على اليوم المزدحم."
		},
		createdAt: "2026-09-25T07:08:00.000Z",
		durationMs: 5e3
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
			ar: "أمسية هادئة وكتاب جيد."
		},
		createdAt: "2026-09-24T21:30:00.000Z",
		durationMs: 5e3
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
			ar: "انتقلت للتو، ما زلت أفك الغرف."
		},
		createdAt: "2026-09-25T09:15:00.000Z",
		durationMs: 5e3
	},
	{
		id: "s-self-1",
		authorId: "me",
		mediaType: "gradient",
		demoGradient: "linear-gradient(145deg, #c9a227 0%, #3a2f10 50%, #0b0b0d 100%)",
		caption: {
			en: "Open to new introductions.",
			ru: "Открыта к новым знакомствам.",
			he: "פתוחה להכרויות חדשות.",
			ar: "مفتوحة لتعريفات جديدة."
		},
		createdAt: "2026-09-25T08:00:00.000Z",
		durationMs: 5e3
	},
	{
		id: "s-self-2",
		authorId: "me",
		mediaType: "gradient",
		demoGradient: "linear-gradient(215deg, #efe6d6 0%, #6a6459 40%, #141417 100%)",
		caption: {
			en: "Available for a call this evening.",
			ru: "Свободна для звонка сегодня вечером.",
			he: "פנויה לשיחה הערב.",
			ar: "متاحة لمكالمة هذا المساء."
		},
		createdAt: "2026-09-25T08:03:00.000Z",
		durationMs: 5e3
	}
];
/**
* Stories treated as already viewed on a fresh install, so the rail shows
* the new / seen / empty / own states instead of everything being "new".
*/
var DEMO_VIEWED_STORY_IDS = [
	"s-lina-1",
	"s-maya-1",
	"s-yael-1"
];
function storiesByProfile(id) {
	return STORIES.filter((s) => s.authorId === id);
}
var KEY = "i11-store-v3";
/**
* Stories pre-marked as viewed on a fresh install so the rail demonstrates
* the new / seen / empty / own states. A returning visitor whose saved payload
* predates this key keeps the value from `empty` via the spread in `read()`.
*/
function demoViewedBaseline() {
	const out = {};
	for (const id of DEMO_VIEWED_STORY_IDS) out[id] = "2026-09-25T00:00:00.000Z";
	return out;
}
var empty = {
	lang: "ru",
	theme: "dark",
	ageOk: false,
	onboarded: false,
	role: "guest",
	intent: "browse",
	discovery: "all",
	user: null,
	phoneVerified: false,
	verificationStatus: "unverified",
	likes: {},
	favorites: {},
	follows: {},
	savedPosts: {},
	viewedStoryIds: demoViewedBaseline(),
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
	limits: {
		unverifiedMaxPhotos: 3,
		unverifiedMaxVideos: 1,
		verifiedMaxPhotos: 20,
		verifiedMaxVideos: 10
	}
};
function read() {
	if (typeof localStorage === "undefined") return empty;
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return empty;
		const parsed = JSON.parse(raw);
		if (!parsed || typeof parsed !== "object") return empty;
		return {
			...empty,
			...parsed,
			viewedStoryIds: parsed.viewedStoryIds && typeof parsed.viewedStoryIds === "object" ? parsed.viewedStoryIds : empty.viewedStoryIds
		};
	} catch {
		return empty;
	}
}
var useAppStore = create((set, get) => ({
	...empty,
	hydrated: false,
	hydrate: () => {
		set({
			...read(),
			hydrated: true
		});
	},
	persist: () => {
		if (typeof localStorage === "undefined") return;
		const s = get();
		const snap = {
			lang: s.lang,
			theme: s.theme,
			ageOk: s.ageOk,
			onboarded: s.onboarded,
			role: s.role,
			intent: s.intent,
			discovery: s.discovery,
			user: s.user,
			phoneVerified: s.phoneVerified,
			verificationStatus: s.verificationStatus,
			likes: s.likes,
			favorites: s.favorites,
			follows: s.follows,
			savedPosts: s.savedPosts,
			viewedStoryIds: s.viewedStoryIds,
			blocked: s.blocked,
			view: s.view,
			extraReviews: s.extraReviews,
			extraReports: s.extraReports,
			extraComments: s.extraComments,
			safetyReports: s.safetyReports,
			myProfile: s.myProfile,
			agencyProfile: s.agencyProfile,
			adminStatus: s.adminStatus,
			demoAdmin: s.demoAdmin,
			limits: s.limits,
			sessionSeconds: s.sessionSeconds,
			clientPhoto: s.clientPhoto,
			prefCity: s.prefCity,
			prefAgeMin: s.prefAgeMin,
			prefAgeMax: s.prefAgeMax
		};
		try {
			localStorage.setItem(KEY, JSON.stringify(snap));
		} catch {}
	},
	setLang: (lang) => {
		set({ lang });
		get().persist();
	},
	setTheme: (theme) => {
		set({ theme });
		get().persist();
	},
	passAge: () => {
		set({ ageOk: true });
		get().persist();
	},
	setRole: (role) => {
		set({ role });
		get().persist();
	},
	setDiscovery: (discovery) => {
		set({ discovery });
		get().persist();
	},
	finishOnboarding: (user) => {
		set({
			onboarded: true,
			user,
			lang: user.lang,
			intent: user.intent,
			discovery: user.discovery,
			role: user.role,
			phoneVerified: user.phoneVerified,
			verificationStatus: user.verificationStatus
		});
		get().persist();
	},
	setPhoneVerified: (phoneVerified) => {
		set({ phoneVerified });
		get().persist();
	},
	setVerificationStatus: (verificationStatus) => {
		set({ verificationStatus });
		get().persist();
	},
	toggleLike: (id) => {
		if (!get().canInteract()) return;
		set({ likes: {
			...get().likes,
			[id]: !get().likes[id]
		} });
		get().persist();
	},
	toggleFav: (id) => {
		if (!get().canInteract()) return;
		set({ favorites: {
			...get().favorites,
			[id]: !get().favorites[id]
		} });
		get().persist();
	},
	toggleFollow: (id) => {
		if (!get().canInteract()) return;
		set({ follows: {
			...get().follows,
			[id]: !get().follows[id]
		} });
		get().persist();
	},
	toggleSaved: (id) => {
		if (!get().canInteract()) return;
		set({ savedPosts: {
			...get().savedPosts,
			[id]: !get().savedPosts[id]
		} });
		get().persist();
	},
	markStoryViewed: (storyId) => {
		if (get().viewedStoryIds[storyId]) return;
		set({ viewedStoryIds: {
			...get().viewedStoryIds,
			[storyId]: (/* @__PURE__ */ new Date()).toISOString()
		} });
		get().persist();
	},
	markUserStoriesViewed: (userId) => {
		const pending = storiesByProfile(userId).filter((s) => !get().viewedStoryIds[s.id]);
		if (pending.length === 0) return;
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const viewedStoryIds = { ...get().viewedStoryIds };
		for (const s of pending) viewedStoryIds[s.id] = now;
		set({ viewedStoryIds });
		get().persist();
	},
	isStoryViewed: (storyId) => Boolean(get().viewedStoryIds[storyId]),
	resetStoryViews: () => {
		set({ viewedStoryIds: {} });
		get().persist();
	},
	block: (id) => {
		set({ blocked: Array.from(/* @__PURE__ */ new Set([...get().blocked, id])) });
		get().persist();
	},
	unblock: (id) => {
		set({ blocked: get().blocked.filter((x) => x !== id) });
		get().persist();
	},
	setView: (view) => {
		set({ view });
		get().persist();
	},
	addReview: (profileId, rating, impression, text) => {
		if (!get().canInteract()) return;
		set({ extraReviews: [...get().extraReviews, {
			id: `ur-${Date.now()}`,
			profileId,
			rating,
			impression,
			text,
			status: "pending",
			created: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
		}] });
		get().persist();
	},
	addReport: (targetId, reason, note) => {
		if (!get().canInteract()) return;
		set({ extraReports: [...get().extraReports, {
			id: `rp-${Date.now()}`,
			targetId,
			reason,
			note
		}] });
		get().persist();
	},
	addComment: (postId, text) => {
		if (!get().canInteract()) return;
		set({ extraComments: [...get().extraComments, {
			id: `cm-${Date.now()}`,
			postId,
			author: get().user?.name || "You",
			text
		}] });
		get().persist();
	},
	addSafetyReport: (r) => {
		const role = get().role;
		if (role !== "individual" && role !== "agency") return;
		set({ safetyReports: [...get().safetyReports, {
			...r,
			id: `sr-${Date.now()}`,
			status: "submitted",
			created: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
		}] });
		get().persist();
	},
	updateSafetyReportStatus: (id, status, adminNote) => {
		set({ safetyReports: get().safetyReports.map((r) => r.id === id ? {
			...r,
			status,
			adminNote: adminNote ?? r.adminNote,
			updated: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
		} : r) });
		get().persist();
	},
	setMyProfile: (myProfile) => {
		set({ myProfile });
		get().persist();
	},
	setAgencyProfile: (agencyProfile) => {
		set({ agencyProfile });
		get().persist();
	},
	setAdmin: (id, s) => {
		set({ adminStatus: {
			...get().adminStatus,
			[id]: s
		} });
		get().persist();
	},
	setDemoAdmin: (demoAdmin) => {
		set({ demoAdmin });
		get().persist();
	},
	addSessionSeconds: (n) => {
		set({ sessionSeconds: get().sessionSeconds + n });
		get().persist();
	},
	setClientPhoto: (clientPhoto) => {
		set({ clientPhoto });
		get().persist();
	},
	setPrefs: (p) => {
		set({
			prefCity: p.prefCity ?? get().prefCity,
			prefAgeMin: p.prefAgeMin ?? get().prefAgeMin,
			prefAgeMax: p.prefAgeMax ?? get().prefAgeMax
		});
		get().persist();
	},
	canInteract: () => {
		const { role, onboarded } = get();
		if (!onboarded || role === "guest") return false;
		return role === "client" || role === "individual" || role === "agency";
	},
	canSeeContacts: () => {
		return true;
	},
	canAccessTrustSafety: () => {
		const { role, verificationStatus, demoAdmin, onboarded } = get();
		if (demoAdmin) return true;
		if (!onboarded) return false;
		if (role !== "individual" && role !== "agency") return false;
		return verificationStatus === "verified";
	},
	isGuest: () => get().role === "guest" || !get().onboarded,
	resetDemo: () => {
		try {
			localStorage.removeItem(KEY);
		} catch {}
		set({
			...empty,
			hydrated: true
		});
	}
}));
var styles_default = "/assets/styles-BbIi3J6r.css";
var APP_NAME = "Israel 1+1";
var Route$17 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#0B0B0D"
			},
			{
				name: "description",
				content: "Professional social directory for adults 18+"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600&family=Outfit:wght@400;500;600&display=swap"
			}
		]
	}),
	component: Root
});
function Root() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "ru",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "antialiased",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hydrate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					theme: "dark",
					position: "top-center",
					toastOptions: { className: "!bg-elevated !text-fg !border-line" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
function Hydrate({ children }) {
	const hydrate = useAppStore((s) => s.hydrate);
	const hydrated = useAppStore((s) => s.hydrated);
	const lang = useAppStore((s) => s.lang);
	const theme = useAppStore((s) => s.theme);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		const el = document.documentElement;
		el.lang = lang;
		el.dir = isRtl(lang) ? "rtl" : "ltr";
		el.dataset.theme = theme;
	}, [
		hydrated,
		lang,
		theme
	]);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center bg-black",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/brand/logo-israel-1plus1.png",
			alt: "Israel 1+1",
			className: "h-14 max-w-[280px] object-contain"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var $$splitComponentImporter$16 = () => import("./routes-SRorCNUt.mjs");
var Route$16 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("../_app-Co_L4VN5.mjs");
var Route$15 = createFileRoute("/_app")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./onboarding-De9CAxSV.mjs");
var Route$14 = createFileRoute("/onboarding")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./privacy-DMsIkjZt.mjs");
var Route$13 = createFileRoute("/privacy")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./rules-8Nk2a66d.mjs");
var Route$12 = createFileRoute("/rules")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./admin-j-IG7rdY.mjs");
var Route$11 = createFileRoute("/_app/admin")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./blocked-BSH8XHF_.mjs");
var Route$10 = createFileRoute("/_app/blocked")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./directory-mp9ZSmae.mjs");
var Route$9 = createFileRoute("/_app/directory")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./favorites-BdKiFJRI.mjs");
var Route$8 = createFileRoute("/_app/favorites")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./home-CpO3SpnM.mjs");
var Route$7 = createFileRoute("/_app/home")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./me-DiRrQrzb.mjs");
var Route$6 = createFileRoute("/_app/me")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./new-DzHqwuni.mjs");
var Route$5 = createFileRoute("/_app/new")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./reels-B1vXUGBy.mjs");
var Route$4 = createFileRoute("/_app/reels")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./search-68Z6k_gG.mjs");
var Route$3 = createFileRoute("/_app/search")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./settings-CGYGcMAX.mjs");
var Route$2 = createFileRoute("/_app/settings")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./support-C3Ri4Xcv.mjs");
var Route$1 = createFileRoute("/_app/support")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./profile._id-O0z4-Xqt.mjs");
var Route = createFileRoute("/_app/profile/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$16.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$17
});
var AppRoute = Route$15.update({
	id: "/_app",
	getParentRoute: () => Route$17
});
var OnboardingRoute = Route$14.update({
	id: "/onboarding",
	path: "/onboarding",
	getParentRoute: () => Route$17
});
var PrivacyRoute = Route$13.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$17
});
var RulesRoute = Route$12.update({
	id: "/rules",
	path: "/rules",
	getParentRoute: () => Route$17
});
var AppRouteChildren = {
	AppAdminRoute: Route$11.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => AppRoute
	}),
	AppBlockedRoute: Route$10.update({
		id: "/blocked",
		path: "/blocked",
		getParentRoute: () => AppRoute
	}),
	AppDirectoryRoute: Route$9.update({
		id: "/directory",
		path: "/directory",
		getParentRoute: () => AppRoute
	}),
	AppFavoritesRoute: Route$8.update({
		id: "/favorites",
		path: "/favorites",
		getParentRoute: () => AppRoute
	}),
	AppHomeRoute: Route$7.update({
		id: "/home",
		path: "/home",
		getParentRoute: () => AppRoute
	}),
	AppMeRoute: Route$6.update({
		id: "/me",
		path: "/me",
		getParentRoute: () => AppRoute
	}),
	AppNewRoute: Route$5.update({
		id: "/new",
		path: "/new",
		getParentRoute: () => AppRoute
	}),
	AppReelsRoute: Route$4.update({
		id: "/reels",
		path: "/reels",
		getParentRoute: () => AppRoute
	}),
	AppSearchRoute: Route$3.update({
		id: "/search",
		path: "/search",
		getParentRoute: () => AppRoute
	}),
	AppSettingsRoute: Route$2.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => AppRoute
	}),
	AppSupportRoute: Route$1.update({
		id: "/support",
		path: "/support",
		getParentRoute: () => AppRoute
	}),
	AppProfileIdRoute: Route.update({
		id: "/profile/$id",
		path: "/profile/$id",
		getParentRoute: () => AppRoute
	})
};
var rootRouteChildren = {
	IndexRoute,
	AppRoute: AppRoute._addFileChildren(AppRouteChildren),
	OnboardingRoute,
	PrivacyRoute,
	RulesRoute
};
var routeTree = Route$17._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { LANGS as _, AUDIT as a, NEW_IDS as c, REELS as d, profileById as f, DICT as g, storiesByProfile as h, ADMIN_QUEUE as i, POSTS as l, reviewsByProfile as m, Route as n, CITIES as o, reelsByProfile as p, useAppStore as r, CITY_LABEL as s, router_exports as t, PROFILES as u, isRtl as v };
