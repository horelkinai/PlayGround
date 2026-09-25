import { cn } from "@/lib/cn";

/**
 * Primary brand mark: white script "Israel 1+1" + Israeli flag.
 * compact — smaller height for mobile header.
 * textFallback — pure text if image unavailable.
 */
export function Logo({
  className,
  compact = false,
  textFallback = false,
}: {
  className?: string;
  compact?: boolean;
  textFallback?: boolean;
}) {
  if (textFallback) {
    if (compact) {
      return (
        <span className={cn("font-display text-lg tracking-wide text-cream", className)}>
          1+1
        </span>
      );
    }
    return (
      <div className={cn("flex items-end gap-2", className)}>
        <div className="leading-none">
          <div className="font-display text-[0.7rem] tracking-[0.35em] text-cream/80">ISRAEL</div>
          <div className="font-display text-4xl leading-none tracking-wide text-cream">1+1</div>
        </div>
      </div>
    );
  }

  return (
    <img
      src="/brand/logo-israel-1plus1.png"
      alt="Israel 1+1"
      className={cn(
        "w-auto object-contain object-center",
        compact ? "h-8 max-w-[160px]" : "h-10 max-w-[220px] sm:h-11 sm:max-w-[260px]",
        className,
      )}
    />
  );
}
