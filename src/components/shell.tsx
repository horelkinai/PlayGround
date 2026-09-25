import { Link, Outlet, useRouterState, Navigate } from "@tanstack/react-router";
import {
  Clapperboard,
  Heart,
  Home,
  LayoutGrid,
  Plus,
  Search,
  User,
} from "lucide-react";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/cn";
import { useI18n } from "@/lib/use-i18n";
import { useAppStore } from "@/lib/store";
import type { Role } from "@/lib/types";

type NavItem = {
  to: string;
  key: string;
  icon: typeof Home;
};

function primaryNav(_role: Role): NavItem[] {
  return [
    { to: "/directory", key: "navDir", icon: LayoutGrid },
    { to: "/home", key: "navHome", icon: Home },
    { to: "/reels", key: "navReels", icon: Clapperboard },
    { to: "/search", key: "navSearch", icon: Search },
    { to: "/me", key: "navMe", icon: User },
  ];
}

export function AppShell() {
  const ageOk = useAppStore((s) => s.ageOk);
  const onboarded = useAppStore((s) => s.onboarded);
  if (!ageOk) return <Navigate to="/" />;
  if (!onboarded) return <Navigate to="/onboarding" />;
  return <ShellFrame />;
}

function ShellFrame() {
  const { t } = useI18n();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const role = useAppStore((s) => s.role);
  const isGuest = useAppStore((s) => s.isGuest());
  const addSessionSeconds = useAppStore((s) => s.addSessionSeconds);
  const canPublish = role === "individual" || role === "agency";

  const primary = useMemo(() => primaryNav(role), [role]);
  const notifTo = isGuest ? "/onboarding" : "/favorites";

  useEffect(() => {
    if (role !== "client") return;
    const id = window.setInterval(() => addSessionSeconds(1), 1000);
    return () => window.clearInterval(id);
  }, [role, addSessionSeconds]);

  function onPublish() {
    if (canPublish) return;
    toast.message(
      (t as Record<string, string>).publishBlocked ||
        "Публикации доступны только анкетам individual и агентствам. Все аккаунты строго проверяются от мошенников.",
    );
  }

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <aside className="fixed inset-y-0 start-0 z-30 hidden w-56 flex-col border-e border-line bg-surface p-4 lg:flex">
        <Link to="/directory" className="mb-8 flex justify-center">
          <Logo />
        </Link>
        <nav className="flex flex-1 flex-col gap-1">
          {primary.map((item) => (
            <Link
              key={item.to + item.key}
              to={item.to}
              className={cn(
                "flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm",
                path.startsWith(item.to) ? "bg-elevated text-cream" : "text-muted hover:text-fg",
              )}
            >
              <item.icon className="size-4" />
              {(t as Record<string, string>)[item.key] || item.key}
            </Link>
          ))}
          <Link
            to={notifTo}
            className={cn(
              "flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm",
              path.startsWith("/favorites") ? "bg-elevated text-cream" : "text-muted hover:text-fg",
            )}
          >
            <Heart className="size-4" />
            {(t as Record<string, string>).navFav || "Favorites"}
          </Link>
        </nav>
        <p className="mt-4 text-xs text-subtle">{t.demo}</p>
      </aside>

      <div className="lg:ps-56">
        <header className="sticky top-0 z-20 grid grid-cols-3 items-center border-b border-line bg-bg/95 px-3 py-2.5 backdrop-blur lg:hidden">
          <div className="flex justify-start">
            {canPublish ? (
              <Link
                to="/me"
                className="grid size-10 place-items-center rounded-full text-cream"
                aria-label={(t as Record<string, string>).createPost || "Publish"}
              >
                <Plus className="size-6" strokeWidth={1.75} />
              </Link>
            ) : (
              <button
                type="button"
                onClick={onPublish}
                className="grid size-10 place-items-center rounded-full text-muted"
                aria-label={(t as Record<string, string>).createPost || "Publish"}
              >
                <Plus className="size-6 opacity-40" strokeWidth={1.75} />
              </button>
            )}
          </div>
          <div className="flex justify-center">
            <Link to="/directory" className="block">
              <Logo compact />
            </Link>
          </div>
          <div className="flex justify-end">
            <Link
              to={notifTo}
              className="grid size-10 place-items-center rounded-full text-cream"
              aria-label={(t as Record<string, string>).navFav || "Notifications"}
            >
              <Heart className="size-6" strokeWidth={1.75} />
            </Link>
          </div>
        </header>

        <main
          className={cn(
            "mx-auto px-0 pb-20 pt-0 lg:px-4 lg:pb-10 lg:pt-4",
            path.startsWith("/reels") ? "max-w-none" : "max-w-lg lg:max-w-5xl",
          )}
        >
          <Outlet />
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-line bg-surface/95 backdrop-blur lg:hidden">
        {primary.map((item) => {
          const active =
            item.to === "/directory"
              ? path.startsWith("/directory")
              : path.startsWith(item.to);
          return (
            <Link
              key={item.to + item.key}
              to={item.to}
              className={cn(
                "flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[10px]",
                active ? "text-cream" : "text-muted",
              )}
            >
              <item.icon className={cn("size-6", active && "stroke-[2.25]")} strokeWidth={active ? 2.25 : 1.75} />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
