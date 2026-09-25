import { useEffect } from "react";
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { isRtl } from "@/lib/i18n";
import { useAppStore } from "@/lib/store";
import appCss from "../styles.css?url";

const APP_NAME = "Israel 1+1";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "theme-color", content: "#0B0B0D" },
      {
        name: "description",
        content: "Professional social directory for adults 18+",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600&family=Outfit:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: Root,
});

function Root() {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        <PreviewHostBridge />
        <AuthProvider>
          <Hydrate>
            <Outlet />
          </Hydrate>
        </AuthProvider>
        <Toaster
          theme="dark"
          position="top-center"
          toastOptions={{
            className: "!bg-elevated !text-fg !border-line",
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}

function Hydrate({ children }: { children: React.ReactNode }) {
  const hydrate = useAppStore((s) => s.hydrate);
  const hydrated = useAppStore((s) => s.hydrated);
  const lang = useAppStore((s) => s.lang);
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!hydrated) return;
    const el = document.documentElement;
    el.lang = lang;
    el.dir = isRtl(lang) ? "rtl" : "ltr";
    el.dataset.theme = theme;
  }, [hydrated, lang, theme]);

  if (!hydrated) {
    return (
      <div className="grid min-h-dvh place-items-center bg-black">
        <img src="/brand/logo-israel-1plus1.png" alt="Israel 1+1" className="h-14 max-w-[280px] object-contain" />
      </div>
    );
  }
  return <>{children}</>;
}
