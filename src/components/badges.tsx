import { BadgeCheck, Crown, Star } from "lucide-react";
import { DICT } from "@/lib/i18n";
import type { Lang } from "@/lib/types";
import { cn } from "@/lib/cn";

export function VerifiedBadge({ lang, className }: { lang: Lang; className?: string }) {
  const t = DICT[lang];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-verified/15 px-2 py-0.5 text-[11px] font-medium text-verified",
        className,
      )}
    >
      <BadgeCheck className="size-3.5" />
      {t.verified}
    </span>
  );
}

export function VipBadge({ lang, className }: { lang: Lang; className?: string }) {
  const t = DICT[lang];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-vip/15 px-2 py-0.5 text-[11px] font-medium text-vip",
        className,
      )}
    >
      <Crown className="size-3.5" />
      {t.vip}
    </span>
  );
}

export function TopBadge({ lang, className }: { lang: Lang; className?: string }) {
  const t = DICT[lang];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-medium text-accent",
        className,
      )}
    >
      {t.top}
    </span>
  );
}

export function RatingMark({
  value,
  count,
  className,
}: {
  value: number;
  count?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1 text-sm tabular-nums text-cream", className)}>
      <Star className="size-3.5 fill-vip text-vip" />
      {value.toFixed(1)}
      {typeof count === "number" ? <span className="text-muted">· {count}</span> : null}
    </span>
  );
}

export function BadgeRow({
  lang,
  verified,
  vip,
  top,
}: {
  lang: Lang;
  verified?: boolean;
  vip?: boolean;
  top?: boolean;
}) {
  if (!verified && !vip && !top) return null;
  return (
    <div className="flex flex-wrap gap-1">
      {verified ? <VerifiedBadge lang={lang} /> : null}
      {vip ? <VipBadge lang={lang} /> : null}
      {top ? <TopBadge lang={lang} /> : null}
    </div>
  );
}
