import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProfileCard, SectionTitle } from "@/components/cards";
import { Chip } from "@/components/ui";
import { CITIES, CITY_LABEL } from "@/lib/demo-data";
import { useAllProfiles } from "@/lib/profiles-catalog";
import { useI18n } from "@/lib/use-i18n";
import { useAppStore } from "@/lib/store";
import type { ViewMode } from "@/lib/types";

export const Route = createFileRoute("/_app/directory")({
  component: DirectoryPage,
});

function DirectoryPage() {
  const { t, lang } = useI18n();
  const blocked = useAppStore((s) => s.blocked);
  const view = useAppStore((s) => (s.view === "cards" ? "grid" : s.view)) as Exclude<ViewMode, "cards">;
  const setView = useAppStore((s) => s.setView);

  const [city, setCity] = useState<string>("");
  const [cityOpen, setCityOpen] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [activeOnly, setActiveOnly] = useState(true);

  const all = useAllProfiles();
  const women = all.filter((p) => p.gender === "women");

  const filtered = useMemo(() => {
    return women.filter((p) => {
      if (blocked.includes(p.id)) return false;
      if (activeOnly && p.status !== "active") return false;
      if (city && p.city !== city) return false;
      if (p.rating < minRating) return false;
      return true;
    });
  }, [blocked, activeOnly, city, minRating, women]);

  const gridClass =
    view === "list" ? "grid gap-2.5 px-3 pb-4" : "grid grid-cols-3 gap-0.5 pb-4";

  const tt = t as Record<string, string>;
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3 px-3 pt-3">
        <div>
          <SectionTitle>{tt.totalGirls || "Всего девушек"}</SectionTitle>
          <h1 className="mt-1.5 text-xl font-semibold text-cream">
            {lang === "ru"
              ? "Каталог с номерами"
              : lang === "he"
                ? "מדריך עם מספרים"
                : lang === "ar"
                  ? "دليل مع أرقام"
                  : "Directory with numbers"}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {filtered.length} / {women.length} {tt.registeredAccounts || "зарегистрированных анкет"}
            {" · "}
            {lang === "ru"
              ? "нажми на трубку, чтобы открыть анкету и номер"
              : "tap the phone to open profile & number"}
          </p>
        </div>
        <div className="flex gap-1">
          {(["grid", "list"] as const).map((v) => (
            <Chip key={v} active={view === v} onClick={() => setView(v)}>
              {t[v]}
            </Chip>
          ))}
        </div>
      </div>

      <div className="mx-3 space-y-3 rounded-xl border border-line bg-surface p-4">
        <div>
          <button
            type="button"
            onClick={() => setCityOpen((v) => !v)}
            className="flex min-h-11 w-full items-center justify-between rounded-lg border border-line px-3 text-sm text-cream"
          >
            <span>
              {city
                ? CITY_LABEL[lang][city as keyof (typeof CITY_LABEL)["en"]] ?? city
                : t.allCities}
            </span>
            <span className="text-muted">{cityOpen ? "▴" : "▾"}</span>
          </button>
          {cityOpen ? (
            <div className="mt-2 flex flex-wrap gap-2">
              <Chip
                active={!city}
                onClick={() => {
                  setCity("");
                  setCityOpen(false);
                }}
              >
                {t.allCities}
              </Chip>
              {CITIES.map((c) => (
                <Chip
                  key={c}
                  active={city === c}
                  onClick={() => {
                    setCity(c);
                    setCityOpen(false);
                  }}
                >
                  {CITY_LABEL[lang][c]}
                </Chip>
              ))}
            </div>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <label className="flex items-center gap-2 text-muted">
            {t.minRating}
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="rounded-lg border border-line bg-bg px-2 py-1 text-fg"
            >
              {[0, 3, 4, 4.5].map((n) => (
                <option key={n} value={n}>
                  {n === 0 ? "—" : `${n}+`}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-muted">
            <input
              type="checkbox"
              checked={activeOnly}
              onChange={(e) => setActiveOnly(e.target.checked)}
              className="accent-[var(--color-accent)]"
            />
            {t.activeOnly}
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-muted">{t.empty}</p>
      ) : (
        <div className={gridClass}>
          {filtered.map((p) => (
            <ProfileCard key={p.id} profile={p} variant={view} />
          ))}
        </div>
      )}
    </div>
  );
}
