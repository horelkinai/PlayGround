import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "line" | "danger";
}) {
  const styles = {
    primary: "bg-accent text-accent-fg hover:bg-accent/90",
    ghost: "bg-elevated text-fg hover:bg-surface",
    line: "border border-line bg-transparent text-fg hover:bg-elevated",
    danger: "bg-accent/20 text-accent hover:bg-accent/30",
  }[variant];
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-opacity duration-150 disabled:opacity-50",
        styles,
        className,
      )}
      {...props}
    />
  );
}

export function Field({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "min-h-11 w-full rounded-lg border border-line bg-surface px-4 text-sm text-fg placeholder:text-subtle",
        className,
      )}
      {...props}
    />
  );
}

export function Area({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-fg placeholder:text-subtle",
        className,
      )}
      {...props}
    />
  );
}

export function Chip({
  active,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        "min-h-10 rounded-full border px-4 text-sm",
        active
          ? "border-cream bg-cream text-bg"
          : "border-line bg-transparent text-muted hover:text-fg",
        className,
      )}
      {...props}
    />
  );
}
