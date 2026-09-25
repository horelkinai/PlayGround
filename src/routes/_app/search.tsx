import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SectionTitle } from "@/components/cards";
import { Button, Chip, Field } from "@/components/ui";
import { CITIES, CITY_LABEL } from "@/lib/demo-data";
import { useI18n } from "@/lib/use-i18n";
import { useAppStore } from "@/lib/store";
import type { Discovery } from "@/lib/types";

export const Route = createFileRoute("/_app/search")({
  component: SearchPage,
});

function SearchPage() {
  const { t, lang } = useI18n();
  const discovery = useAppStore((s) => s.discovery);
  const setDiscovery = useAppStore((s) => s.setDiscovery);
  const isGuest = useAppStore((s) => s.isGuest());

  const [city, setCity] = useState("");
  const [ageMin, setAgeMin] = useState("18");
  const [ageMax, setAgeMax] = useState("45");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [vipOnly, setVipOnly] = useState(false);

  return (
    <div className="space-y-6 px-4 py-4">
      <div>
        <SectionTitle>{(t as Record<string, string>).navSearch || t.search}</SectionTitle>
        <p className="mt-2 text-sm text-muted">
          {(t as Record<string, string>).searchHint ||
            "Укажите предпочтения — лента и каталог подстроятся под них."}
        </p>
      </div>

      <div className="space-y-4 rounded-xl border border-line bg-surface p-4">
        <div>
          <p className="mb-2 text-xs tracking-wide text-muted uppercase">
            {(t as Record<string, string>).discTitle || "Кого ищете?"}
          </p>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["women", t.discWomen],
                ["men", t.discMen],
                ["all", t.discAll],
              ] as [Discovery, string][]
            ).map(([id, label]) => (
              <Chip key={id} active={discovery === id} onClick={() => setDiscovery(id)}>
                {label}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-xs text-muted">
            {(t as Record<string, string>).city || "Город"}
          </p>
          <Field
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={CITY_LABEL[lang]?.["Tel Aviv"] || "Tel Aviv"}
            list="city-list"
          />
          <datalist id="city-list">
            {CITIES.map((c) => (
              <option
                key={c}
                value={CITY_LABEL[lang]?.[c as keyof (typeof CITY_LABEL)["en"]] ?? c}
              />
            ))}
          </datalist>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="mb-1.5 text-xs text-muted">
              {(t as Record<string, string>).ageMin || "Возраст от"}
            </p>
            <Field
              type="number"
              min={18}
              max={99}
              value={ageMin}
              onChange={(e) => setAgeMin(e.target.value)}
            />
          </div>
          <div>
            <p className="mb-1.5 text-xs text-muted">
              {(t as Record<string, string>).ageMax || "до"}
            </p>
            <Field
              type="number"
              min={18}
              max={99}
              value={ageMax}
              onChange={(e) => setAgeMax(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Chip active={verifiedOnly} onClick={() => setVerifiedOnly((v) => !v)}>
            Verified
          </Chip>
          <Chip active={vipOnly} onClick={() => setVipOnly((v) => !v)}>
            VIP
          </Chip>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <Link
            to="/directory"
            className="block rounded-lg bg-accent py-3 text-center text-sm font-medium text-black"
          >
            {(t as Record<string, string>).openCatalog || t.navDir}
          </Link>
        </div>
      </div>

      {isGuest && (
        <p className="text-center text-sm text-muted">
          {(t as Record<string, string>).guestCta ||
            "Зарегистрируйтесь, чтобы пользоваться функциями платформы"}
        </p>
      )}
    </div>
  );
}
