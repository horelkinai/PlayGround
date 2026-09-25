import { DICT, isRtl } from "./i18n";
import { useAppStore } from "./store";

export function useI18n() {
  const lang = useAppStore((s) => s.lang);
  return { lang, t: DICT[lang], rtl: isRtl(lang) };
}
