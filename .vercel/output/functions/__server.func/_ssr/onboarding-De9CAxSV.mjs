import { i as __toESM } from "../_runtime.mjs";
import { C as useNavigate, S as Navigate, T as require_jsx_runtime, Z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useAppStore } from "./router-CWqAbG_v.mjs";
import { n as useI18n, t as cn } from "./use-i18n-DMLbRgsP.mjs";
import { t as Logo } from "./logo-DBidGl-8.mjs";
import { i as Field, n as Button } from "./ui-xEub4V1l.mjs";
import { t as LangSwitch } from "./lang-switch-CAAajOcN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-De9CAxSV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Onboarding() {
	const { t } = useI18n();
	const navigate = useNavigate();
	const ageOk = useAppStore((s) => s.ageOk);
	const onboarded = useAppStore((s) => s.onboarded);
	const lang = useAppStore((s) => s.lang);
	const setLang = useAppStore((s) => s.setLang);
	const finishOnboarding = useAppStore((s) => s.finishOnboarding);
	const setMyProfile = useAppStore((s) => s.setMyProfile);
	const hydrated = useAppStore((s) => s.hydrated);
	const [step, setStep] = (0, import_react.useState)("role");
	const [role, setRole] = (0, import_react.useState)("client");
	const [intent, setIntent] = (0, import_react.useState)("browse");
	const [discovery, setDiscovery] = (0, import_react.useState)("women");
	const [name, setName] = (0, import_react.useState)("");
	const [contact, setContact] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [otp, setOtp] = (0, import_react.useState)("");
	const [otpError, setOtpError] = (0, import_react.useState)(false);
	const [otpLimit, setOtpLimit] = (0, import_react.useState)(false);
	const [resendIn, setResendIn] = (0, import_react.useState)(0);
	const [consent, setConsent] = (0, import_react.useState)(false);
	const [username, setUsername] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("Tel Aviv");
	const [district, setDistrict] = (0, import_react.useState)("");
	const [age, setAge] = (0, import_react.useState)(25);
	const [height, setHeight] = (0, import_react.useState)(170);
	const [weight, setWeight] = (0, import_react.useState)(55);
	const [about, setAbout] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (resendIn <= 0) return;
		const tmr = setTimeout(() => setResendIn((n) => n - 1), 1e3);
		return () => clearTimeout(tmr);
	}, [resendIn]);
	if (!hydrated) return null;
	if (!ageOk) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	if (onboarded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/directory" });
	function afterSignIn() {
		if (role === "guest") {
			finishOnboarding({
				name: "Guest",
				contact: "",
				password: "",
				lang,
				intent: "browse",
				discovery: "women",
				role: "guest",
				phoneVerified: false,
				verificationStatus: "unverified"
			});
			navigate({ to: "/directory" });
			return;
		}
		if (role === "client") {
			setStep("phone");
			return;
		} else if (role === "individual") setStep("setup-individual");
	}
	function skipPhoneVerify() {
		finishOnboarding({
			name: name || "Client",
			contact: contact || "demo@example.com",
			password,
			lang,
			intent,
			discovery: "women",
			role: "client",
			phoneVerified: false,
			verificationStatus: "unverified"
		});
		navigate({ to: "/directory" });
	}
	function verifyOtp() {
		if (otpLimit) return;
		if (otp === "0000" || otp.length < 4) {
			setOtpError(true);
			return;
		}
		setOtpError(false);
		finishOnboarding({
			name: name || "Client",
			contact: phone || contact,
			password,
			lang,
			intent,
			discovery: "women",
			role: "client",
			phoneVerified: true,
			verificationStatus: "unverified"
		});
		navigate({ to: "/directory" });
	}
	function finishIndividual() {
		if (!name.trim() || !username.trim()) return;
		setMyProfile({
			name: name.trim(),
			username: username.trim(),
			city,
			district,
			age,
			height,
			weight,
			about,
			languages: [lang]
		});
		finishOnboarding({
			name: name.trim(),
			contact: contact || phone || "demo@example.com",
			password,
			lang,
			intent: "create",
			discovery,
			role: "individual",
			phoneVerified: true,
			verificationStatus: "unverified"
		});
		navigate({ to: "/me" });
	}
	const roles = [
		{
			id: "guest",
			label: t.roleGuest || "Guest"
		},
		{
			id: "client",
			label: t.roleClient || "Client"
		},
		{
			id: "individual",
			label: t.roleIndividual || "Individual"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-dvh max-w-lg flex-col gap-6 px-6 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LangSwitch, {
					value: lang,
					onChange: setLang
				})]
			}),
			step === "role" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl tracking-wide text-cream",
						children: t.intentTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: t.roleHint || "Choose account type."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-2",
						children: roles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: r.locked,
							onClick: () => !r.locked && setRole(r.id),
							className: cn("flex min-h-12 items-center justify-between rounded-full border px-4 text-left text-sm", r.locked ? "cursor-not-allowed border-line bg-surface/40 text-muted opacity-50" : role === r.id ? "border-cream bg-cream text-bg" : "border-line text-muted hover:text-fg"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.label }), r.locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase tracking-wide",
								children: t.inDev || "In development"
							}) : null]
						}, r.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => {
							if (role === "guest") afterSignIn();
							else setStep("signin");
						},
						children: role === "guest" ? t.continueAsGuest || "Continue as Guest" : t.next
					})
				]
			}),
			step === "signin" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl tracking-wide text-cream",
						children: t.signInTitle || "Sign in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: t.regHint
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "line",
						className: "w-full justify-center gap-2",
						onClick: () => {
							setName(name || "Demo User");
							setContact("demo.google@example.com");
							afterSignIn();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-lg",
							children: "G"
						}), t.continueGoogle || "Continue with Google"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						placeholder: t.emailPhone,
						value: contact,
						onChange: (e) => setContact(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						type: "password",
						placeholder: t.password,
						value: password,
						onChange: (e) => setPassword(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						placeholder: t.name || "Display name",
						value: name,
						onChange: (e) => setName(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-start gap-3 text-sm text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: consent,
							onChange: (e) => setConsent(e.target.checked),
							className: "mt-1 size-4 accent-[var(--color-accent)]"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.consent })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "line",
							onClick: () => setStep("role"),
							children: t.back
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: afterSignIn,
							disabled: !consent || !contact && !name,
							children: t.continue
						})]
					})
				]
			}),
			step === "phone" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl tracking-wide text-cream",
						children: t.phoneTitle || "Phone verification"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: t.phoneHint
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						placeholder: "+972 50 000 0000",
						value: phone,
						onChange: (e) => setPhone(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "line",
							onClick: () => setStep("signin"),
							children: t.back
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => {
								setResendIn(30);
								setOtp("");
								setStep("otp");
							},
							disabled: phone.length < 6,
							children: t.sendCode || "Send code"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: skipPhoneVerify,
						className: "w-full pt-1 text-center text-xs text-muted underline-offset-4 hover:text-cream hover:underline",
						children: lang === "ru" ? "Пропустить (номера будут скрыты)" : "Skip (numbers stay hidden)"
					})
				]
			}),
			step === "otp" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl tracking-wide text-cream",
						children: t.otpTitle || "Enter code"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: t.otpHint
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						placeholder: "••••",
						value: otp,
						onChange: (e) => {
							setOtp(e.target.value);
							setOtpError(false);
						},
						maxLength: 6
					}),
					otpError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-red-400",
						children: t.otpInvalid || "Invalid code"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "line",
							onClick: () => setStep("phone"),
							children: t.back
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: verifyOtp,
							disabled: otpLimit,
							children: t.verify || "Verify"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: skipPhoneVerify,
						className: "w-full pt-1 text-center text-xs text-muted underline-offset-4 hover:text-cream hover:underline",
						children: lang === "ru" ? "Пропустить проверку" : "Skip verification"
					})
				]
			}),
			step === "setup-individual" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl tracking-wide text-cream",
						children: t.setupIndividual || "Create your profile"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						placeholder: t.publicName || "Public name",
						value: name,
						onChange: (e) => setName(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						placeholder: "username",
						value: username,
						onChange: (e) => setUsername(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						placeholder: t.city || "City",
						value: city,
						onChange: (e) => setCity(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						placeholder: t.district || "District",
						value: district,
						onChange: (e) => setDistrict(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								type: "number",
								placeholder: "Age",
								value: String(age),
								onChange: (e) => setAge(Number(e.target.value) || 18)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								type: "number",
								placeholder: "Height",
								value: String(height),
								onChange: (e) => setHeight(Number(e.target.value) || 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								type: "number",
								placeholder: "Weight",
								value: String(weight),
								onChange: (e) => setWeight(Number(e.target.value) || 0)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						placeholder: t.about || "About",
						value: about,
						onChange: (e) => setAbout(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "line",
							onClick: () => setStep("signin"),
							children: t.back
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: finishIndividual,
							disabled: !name.trim() || !username.trim(),
							children: t.createProfile || "Create profile"
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { Onboarding as component };
