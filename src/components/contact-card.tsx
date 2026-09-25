import { useState } from "react";
import { Phone, Copy, Check, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { useAppStore } from "@/lib/store";

function maskPhone(phone: string) {
  // +972-50-123-4567 -> +972 •• ••• 4567
  const digits = phone.replace(/\D/g, "");
  const last4 = digits.slice(-4);
  if (!last4) return phone;
  return `+972 •• ••• ${last4}`;
}

const DICT: Record<string, Record<string, string>> = {
  ru: {
    show: "Показать номер",
    hide: "Скрыть",
    copy: "Копировать",
    copied: "Номер скопирован",
    call: "Позвонить",
    wa: "WhatsApp",
    tg: "Telegram",
    hint: "Демо-номер. В проде — только после проверки телефона.",
    guestHint: "Войдите, чтобы увидеть номер.",
    signIn: "Войти",
  },
  en: {
    show: "Show number",
    hide: "Hide",
    copy: "Copy",
    copied: "Number copied",
    call: "Call",
    wa: "WhatsApp",
    tg: "Telegram",
    hint: "Demo number. In production — after phone verification only.",
    guestHint: "Sign in to see the number.",
    signIn: "Sign in",
  },
  he: {
    show: "הצג מספר",
    hide: "הסתר",
    copy: "העתק",
    copied: "המספר הועתק",
    call: "חיוג",
    wa: "WhatsApp",
    tg: "Telegram",
    hint: "מספר דמו. בפרודקשן — רק אחרי אימות טלפון.",
    guestHint: "התחברו כדי לראות את המספר.",
    signIn: "התחברות",
  },
  ar: {
    show: "إظهار الرقم",
    hide: "إخفاء",
    copy: "نسخ",
    copied: "تم نسخ الرقم",
    call: "اتصال",
    wa: "WhatsApp",
    tg: "Telegram",
    hint: "رقم تجريبي. في الإنتاج — بعد توثيق الهاتف فقط.",
    guestHint: "سجّل الدخول لرؤية الرقم.",
    signIn: "تسجيل الدخول",
  },
};

export function ContactCard({
  phone,
  profileName,
  compact,
}: {
  phone: string;
  profileName: string;
  compact?: boolean;
}) {
  const lang = useAppStore((s) => s.lang);
  const isGuest = useAppStore((s) => s.isGuest());
  const phoneVerified = useAppStore((s) => s.phoneVerified);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const t = DICT[lang] ?? DICT.ru;

  if (!phone) return null;

  if (isGuest) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-xl border border-accent/30 bg-elevated/60 px-3 py-2.5">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-full bg-accent/15 text-accent">
            <Phone className="size-4" />
          </span>
          <div>
            <p className="font-mono text-sm tracking-wide text-cream">{maskPhone(phone)}</p>
            <p className="text-[11px] text-muted">{t.guestHint}</p>
          </div>
        </div>
        <a
          href="/onboarding"
          className="shrink-0 rounded-full bg-cream px-4 py-2 text-xs font-semibold text-black"
        >
          {t.signIn}
        </a>
      </div>
    );
  }

  const canReveal = phoneVerified || !isGuest;
  void canReveal;

  return (
    <div
      className={
        compact
          ? "rounded-xl border border-line bg-elevated/60 px-3 py-2"
          : "rounded-xl border border-line bg-elevated/60 p-3"
      }
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-green-500/15 text-green-400">
            <Phone className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-mono text-[15px] font-semibold tracking-wide text-cream">
              {revealed ? phone : maskPhone(phone)}
            </p>
            {!compact && <p className="text-[11px] text-muted">{t.hint}</p>}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {!revealed ? (
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="rounded-full bg-green-500 px-3.5 py-2 text-xs font-semibold text-black hover:bg-green-400"
            >
              {t.show}
            </button>
          ) : (
            <>
              <a
                href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                aria-label={t.call}
                className="grid size-9 place-items-center rounded-full bg-green-500 text-black hover:bg-green-400"
              >
                <Phone className="size-4" />
              </a>
              <button
                type="button"
                aria-label={t.copy}
                onClick={() => {
                  void navigator.clipboard?.writeText(phone);
                  setCopied(true);
                  toast.success(t.copied);
                  setTimeout(() => setCopied(false), 1500);
                }}
                className="grid size-9 place-items-center rounded-full border border-line text-cream hover:bg-surface"
              >
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              </button>
              <button
                type="button"
                onClick={() => setRevealed(false)}
                className="hidden rounded-full px-2 py-1 text-[11px] text-muted hover:text-cream sm:block"
              >
                {t.hide}
              </button>
            </>
          )}
        </div>
      </div>
      {revealed && !compact && (
        <div className="mt-2.5 flex gap-2">
          <a
            href={`https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${profileName}! (demo)`)}`}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-line py-2 text-xs font-medium text-cream hover:bg-surface"
          >
            <MessageCircle className="size-3.5" />
            {t.wa}
          </a>
          <a
            href={`https://t.me/share/url?url=${encodeURIComponent("demo")}&text=${encodeURIComponent(`Hi ${profileName}! (demo)`)}`}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-line py-2 text-xs font-medium text-cream hover:bg-surface"
          >
            <Send className="size-3.5" />
            {t.tg}
          </a>
        </div>
      )}
    </div>
  );
}
