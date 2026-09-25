import { useEffect, useState } from "react";
import { PROFILES, profileById } from "@/lib/demo-data";
import type { Profile } from "@/lib/types";

/**
 * The generated catalogue (200 profiles, built by scripts/generate-profiles.mjs)
 * lives in its own JSON file and is pulled in with a dynamic import, so the
 * ~230 KB of data is a separate chunk instead of main-bundle weight for every
 * visitor. It is merged with the hand-written demo profiles at read time.
 *
 * Swapping in real data later means replacing the JSON and the photo files —
 * no call site changes.
 */

let cached: Profile[] | null = null;
let inflight: Promise<Profile[]> | null = null;

function loadGenerated(): Promise<Profile[]> {
  if (cached) return Promise.resolve(cached);
  inflight ??= import("@/data/profiles.generated.json").then((mod) => {
    const list = (mod as { default?: Profile[] }).default ?? (mod as unknown as Profile[]);
    cached = Array.isArray(list) ? list : [];
    return cached;
  });
  return inflight;
}

/** Synchronous peek; empty until the dynamic import resolves. */
export function generatedPeek(): Profile[] {
  return cached ?? [];
}

/** Hand-written demo profiles plus whatever has finished loading. */
export function useAllProfiles(): Profile[] {
  const [extra, setExtra] = useState<Profile[]>(cached ?? []);
  useEffect(() => {
    if (cached) return;
    let alive = true;
    loadGenerated().then((list) => {
      if (alive) setExtra(list);
    });
    return () => {
      alive = false;
    };
  }, []);
  return extra.length ? [...PROFILES, ...extra] : PROFILES;
}

/** Resolves a profile by id across both the hand-written and generated sets. */
export function useProfile(id: string): Profile | undefined {
  const all = useAllProfiles();
  return all.find((p) => p.id === id) ?? profileById(id);
}
