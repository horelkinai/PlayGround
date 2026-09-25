import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SectionTitle } from "@/components/cards";
import { Button, Field, Area, Chip } from "@/components/ui";
import { CITIES, CITY_LABEL } from "@/lib/demo-data";
import { useI18n } from "@/lib/use-i18n";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/_app/me")({
  component: MePage,
});

function formatTime(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m ${sec % 60}s`;
}

function MePage() {
  const { t, lang } = useI18n();
  const user = useAppStore((s) => s.user);
  const myProfile = useAppStore((s) => s.myProfile);
  const setMyProfile = useAppStore((s) => s.setMyProfile);
  const role = useAppStore((s) => s.role);
  const sessionSeconds = useAppStore((s) => s.sessionSeconds);
  const clientPhoto = useAppStore((s) => s.clientPhoto);
  const setClientPhoto = useAppStore((s) => s.setClientPhoto);
  const prefCity = useAppStore((s) => s.prefCity);
  const prefAgeMin = useAppStore((s) => s.prefAgeMin);
  const prefAgeMax = useAppStore((s) => s.prefAgeMax);
  const setPrefs = useAppStore((s) => s.setPrefs);

  const [name, setName] = useState(myProfile?.name || user?.name || "");
  const [username, setUsername] = useState(myProfile?.username || "");
  const [city, setCity] = useState(myProfile?.city || "Tel Aviv");
  const [age, setAge] = useState(String(myProfile?.age || 25));
  const [about, setAbout] = useState(myProfile?.about || "");

  function save() {
    setMyProfile({
      name: name.trim() || "User",
      username: username.trim() || "user",
      city,
      age: Number(age) || 25,
      height: myProfile?.height || 170,
      weight: myProfile?.weight || 70,
      about,
      languages: [lang],
    });
    toast.success(t.sent);
  }

  const loyalty =
    sessionSeconds > 3600 * 5 ? "VIP client" : sessionSeconds > 1800 ? "Active client" : "New client";

  return (
    <div className="mx-auto max-w-lg space-y-6 px-3 pt-3">
      <SectionTitle>{t.navMe}</SectionTitle>

      {role === "client" && (
        <div className="rounded-xl border border-line bg-surface p-4 space-y-2 text-sm">
          <p className="text-cream">{loyalty}</p>
          <p className="text-muted">
            {(t as Record<string, string>).timeOnSite || "Time on site"}: {formatTime(sessionSeconds)}
          </p>
          <p className="text-xs text-subtle">
            {(t as Record<string, string>).loyaltyHint ||
              "Чем больше времени на платформе, тем выше статус клиента."}
          </p>
        </div>
      )}

      <div className="space-y-3 rounded-xl border border-line bg-surface p-4">
        <p className="text-sm text-muted">
          {role === "client"
            ? (t as Record<string, string>).clientProfileHint || "Заполните анкету о себе и загрузите фото."
            : t.regHint}
        </p>
        <label className="block">
          <div className="mb-2 overflow-hidden rounded-xl border border-line bg-elevated">
            {clientPhoto ? (
              <img src={clientPhoto} alt="" className="aspect-square w-full object-cover" />
            ) : (
              <div className="grid aspect-square place-items-center text-sm text-muted">Photo</div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            className="text-sm"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => setClientPhoto(String(reader.result || ""));
              reader.readAsDataURL(file);
            }}
          />
        </label>
        <Field placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Field placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Field
          type="number"
          placeholder={t.age}
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <Area placeholder={t.about} value={about} onChange={(e) => setAbout(e.target.value)} />
        <Button onClick={save}>{t.save}</Button>
      </div>

      {role === "client" && (
        <div className="space-y-3 rounded-xl border border-line bg-surface p-4">
          <h3 className="font-medium text-cream">
            {(t as Record<string, string>).preferences || "Preferences"}
          </h3>
          <p className="text-xs text-muted">
            {(t as Record<string, string>).prefHint || "Какие анкеты вас интересуют"}
          </p>
          <div className="flex flex-wrap gap-2">
            <Chip active={!prefCity} onClick={() => setPrefs({ prefCity: "" })}>
              {t.allCities}
            </Chip>
            {CITIES.map((c) => (
              <Chip key={c} active={prefCity === c} onClick={() => setPrefs({ prefCity: c })}>
                {CITY_LABEL[lang][c]}
              </Chip>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Field
              type="number"
              placeholder="Age from"
              value={String(prefAgeMin)}
              onChange={(e) => setPrefs({ prefAgeMin: Number(e.target.value) || 18 })}
            />
            <Field
              type="number"
              placeholder="Age to"
              value={String(prefAgeMax)}
              onChange={(e) => setPrefs({ prefAgeMax: Number(e.target.value) || 45 })}
            />
          </div>
        </div>
      )}
    </div>
  );
}
