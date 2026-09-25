import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Logo } from "@/components/logo";
import { Button, Field } from "@/components/ui";
import { LangSwitch } from "@/components/lang-switch";
import { useI18n } from "@/lib/use-i18n";
import { useAppStore } from "@/lib/store";
import type { Discovery, Intent, Role } from "@/lib/types";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/onboarding")({
  component: Onboarding,
});

type Step = "role" | "signin" | "phone" | "otp" | "setup-individual" | "done";

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

  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<Role>("client");
  const [intent, setIntent] = useState<Intent>("browse");
  const [discovery, setDiscovery] = useState<Discovery>("women");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [otpLimit, setOtpLimit] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  const [consent, setConsent] = useState(false);
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("Tel Aviv");
  const [district, setDistrict] = useState("");
  const [age, setAge] = useState(25);
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(55);
  const [about, setAbout] = useState("");

  useEffect(() => {
    if (resendIn <= 0) return;
    const tmr = setTimeout(() => setResendIn((n) => n - 1), 1000);
    return () => clearTimeout(tmr);
  }, [resendIn]);

  if (!hydrated) return null;
  if (!ageOk) return <Navigate to="/" />;
  if (onboarded) return <Navigate to="/directory" />;

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
        verificationStatus: "unverified",
      });
      navigate({ to: "/directory" });
      return;
    }
    if (role === "client") {
      // Single solo flow: signin -> phone verify -> catalog
      setStep("phone");
      return;
    } else if (role === "individual") {
      setStep("setup-individual");
    }
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
      verificationStatus: "unverified",
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
      verificationStatus: "unverified",
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
      languages: [lang],
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
      verificationStatus: "unverified",
    });
    navigate({ to: "/me" });
  }

  const roles: { id: Role; label: string; locked?: boolean; hint?: string }[] = [
    { id: "guest", label: t.roleGuest || "Guest" },
    { id: "client", label: t.roleClient || "Client" },
    { id: "individual", label: t.roleIndividual || "Individual" },
  ];

  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-6 px-6 py-10">
      <div className="flex items-start justify-between gap-4">
        <Logo />
        <LangSwitch value={lang} onChange={setLang} />
      </div>

      {step === "role" && (
        <section className="space-y-5">
          <h1 className="font-display text-3xl tracking-wide text-cream">
            {t.intentTitle}
          </h1>
          <p className="text-sm text-muted">
            {t.roleHint || "Choose account type."}
          </p>
          <div className="flex flex-col gap-2">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                disabled={r.locked}
                onClick={() => !r.locked && setRole(r.id)}
                className={cn(
                  "flex min-h-12 items-center justify-between rounded-full border px-4 text-left text-sm",
                  r.locked
                    ? "cursor-not-allowed border-line bg-surface/40 text-muted opacity-50"
                    : role === r.id
                      ? "border-cream bg-cream text-bg"
                      : "border-line text-muted hover:text-fg",
                )}
              >
                <span>{r.label}</span>
                {r.locked ? (
                  <span className="text-[10px] uppercase tracking-wide">
                    {(t as Record<string, string>).inDev || "In development"}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
          <Button
            onClick={() => {
              if (role === "guest") {
                afterSignIn();
              } else {
                setStep("signin");
              }
            }}
          >
            {role === "guest" ? t.continueAsGuest || "Continue as Guest" : t.next}
          </Button>
        </section>
      )}

      {step === "signin" && (
        <section className="space-y-5">
          <h1 className="font-display text-3xl tracking-wide text-cream">
            {t.signInTitle || "Sign in"}
          </h1>
          <p className="text-sm text-muted">{t.regHint}</p>
          <Button
            variant="line"
            className="w-full justify-center gap-2"
            onClick={() => {
              setName(name || "Demo User");
              setContact("demo.google@example.com");
              afterSignIn();
            }}
          >
            <span className="text-lg">G</span>
            {t.continueGoogle || "Continue with Google"}
          </Button>
          <Field
            placeholder={t.emailPhone}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <Field
            type="password"
            placeholder={t.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Field
            placeholder={t.name || "Display name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="flex items-start gap-3 text-sm text-muted">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 size-4 accent-[var(--color-accent)]"
            />
            <span>{t.consent}</span>
          </label>
          <div className="flex gap-2">
            <Button variant="line" onClick={() => setStep("role")}>
              {t.back}
            </Button>
            <Button onClick={afterSignIn} disabled={!consent || (!contact && !name)}>
              {t.continue}
            </Button>
          </div>
        </section>
      )}

      {step === "phone" && (
        <section className="space-y-5">
          <h1 className="font-display text-3xl tracking-wide text-cream">
            {t.phoneTitle || "Phone verification"}
          </h1>
          <p className="text-sm text-muted">{t.phoneHint}</p>
          <Field
            placeholder="+972 50 000 0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="flex gap-2">
            <Button variant="line" onClick={() => setStep("signin")}>
              {t.back}
            </Button>
            <Button
              onClick={() => {
                setResendIn(30);
                setOtp("");
                setStep("otp");
              }}
              disabled={phone.length < 6}
            >
              {t.sendCode || "Send code"}
            </Button>
          </div>
          <button
            type="button"
            onClick={skipPhoneVerify}
            className="w-full pt-1 text-center text-xs text-muted underline-offset-4 hover:text-cream hover:underline"
          >
            {lang === "ru" ? "Пропустить (номера будут скрыты)" : "Skip (numbers stay hidden)"}
          </button>
        </section>
      )}

      {step === "otp" && (
        <section className="space-y-5">
          <h1 className="font-display text-3xl tracking-wide text-cream">
            {t.otpTitle || "Enter code"}
          </h1>
          <p className="text-sm text-muted">{t.otpHint}</p>
          <Field
            placeholder="••••"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
              setOtpError(false);
            }}
            maxLength={6}
          />
          {otpError && (
            <p className="text-sm text-red-400">{t.otpInvalid || "Invalid code"}</p>
          )}
          <div className="flex gap-2">
            <Button variant="line" onClick={() => setStep("phone")}>
              {t.back}
            </Button>
            <Button onClick={verifyOtp} disabled={otpLimit}>
              {t.verify || "Verify"}
            </Button>
          </div>
          <button
            type="button"
            onClick={skipPhoneVerify}
            className="w-full pt-1 text-center text-xs text-muted underline-offset-4 hover:text-cream hover:underline"
          >
            {lang === "ru" ? "Пропустить проверку" : "Skip verification"}
          </button>
        </section>
      )}

      {step === "setup-individual" && (
        <section className="space-y-5">
          <h1 className="font-display text-3xl tracking-wide text-cream">
            {t.setupIndividual || "Create your profile"}
          </h1>
          <Field placeholder={t.publicName || "Public name"} value={name} onChange={(e) => setName(e.target.value)} />
          <Field placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Field placeholder={t.city || "City"} value={city} onChange={(e) => setCity(e.target.value)} />
          <Field placeholder={t.district || "District"} value={district} onChange={(e) => setDistrict(e.target.value)} />
          <div className="grid grid-cols-3 gap-2">
            <Field type="number" placeholder="Age" value={String(age)} onChange={(e) => setAge(Number(e.target.value) || 18)} />
            <Field type="number" placeholder="Height" value={String(height)} onChange={(e) => setHeight(Number(e.target.value) || 0)} />
            <Field type="number" placeholder="Weight" value={String(weight)} onChange={(e) => setWeight(Number(e.target.value) || 0)} />
          </div>
          <Field placeholder={t.about || "About"} value={about} onChange={(e) => setAbout(e.target.value)} />
          <div className="flex gap-2">
            <Button variant="line" onClick={() => setStep("signin")}>
              {t.back}
            </Button>
            <Button onClick={finishIndividual} disabled={!name.trim() || !username.trim()}>
              {t.createProfile || "Create profile"}
            </Button>
          </div>
        </section>
      )}
    </main>
  );
}
