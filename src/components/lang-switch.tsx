import { useState } from "react";
import { LANGS } from "@/lib/i18n";
import type { Lang } from "@/lib/types";
import { cn } from "@/lib/cn";

export function LangSwitch({
  value,
  onChange,
  className,
}: {
  value: Lang;
  onChange: (l: Lang) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const current = LANGS.find((l) => l.id === value) ?? LANGS[0];

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="grid size-10 place-items-center rounded-full border border-white/20 bg-black/40 text-[11px] font-semibold tracking-wide text-cream backdrop-blur"
        aria-label="Language"
      >
        {current.id.toUpperCase()}
      </button>
      {open ? (
        <div className="absolute end-0 top-12 z-40 min-w-36 overflow-hidden rounded-xl border border-line bg-surface shadow-xl">
          {LANGS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => {
                onChange(l.id);
                setOpen(false);
              }}
              className={cn(
                "flex min-h-10 w-full items-center justify-between px-3 text-sm",
                value === l.id ? "bg-elevated text-cream" : "text-muted hover:text-fg",
              )}
            >
              <span>{l.native}</span>
              <span className="text-[10px]">{l.id.toUpperCase()}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
