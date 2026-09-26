// Minimal i18n for ru/en/he/ar. Hebrew + Arabic use RTL.
export type Lang = 'ru' | 'en' | 'he' | 'ar';
export const LANGS: { code: Lang; label: string; rtl: boolean }[] = [
  { code: 'ru', label: 'Русский', rtl: false },
  { code: 'en', label: 'English', rtl: false },
  { code: 'he', label: 'עברית', rtl: true },
  { code: 'ar', label: 'العربية', rtl: true },
];

const D: Record<string, Record<Lang, string>> = {
  home: { ru: 'Главная', en: 'Home', he: 'בית', ar: 'الرئيسية' },
  explore: { ru: 'Обзор', en: 'Explore', he: 'לגלות', ar: 'استكشف' },
  directory: { ru: 'Каталог', en: 'Directory', he: 'קטלוג', ar: 'الدليل' },
  reels: { ru: 'Видео', en: 'Shorts', he: 'סרטונים', ar: 'فيديو' },
  favorites: { ru: 'Избранное', en: 'Saved', he: 'שמורים', ar: 'المحفوظات' },
  profile: { ru: 'Профиль', en: 'Profile', he: 'פרופיל', ar: 'الملف' },
  search: { ru: 'Поиск…', en: 'Search…', he: 'חיפוש…', ar: 'بحث…' },
  forYou: { ru: 'Для вас', en: 'For You', he: 'בשבילך', ar: 'لك' },
  following: { ru: 'Подписки', en: 'Following', he: 'מעקבים', ar: 'المتابَعون' },
  latest: { ru: 'Новые', en: 'Latest', he: 'חדשים', ar: 'الأحدث' },
  newProfiles: { ru: 'Новые профили', en: 'New profiles', he: 'פרופילים חדשים', ar: 'ملفات جديدة' },
  viewProfile: { ru: 'Открыть профиль', en: 'View profile', he: 'לפרופיל', ar: 'عرض الملف' },
  needAuth: { ru: 'Зарегистрируйтесь, чтобы пользоваться функциями платформы.', en: 'Sign up to use platform features.', he: 'הירשמו כדי להשתמש בתכונות.', ar: 'سجّل للاستفادة من الميزات.' },
  support: { ru: 'Поддержка', en: 'Support', he: 'תמיכה', ar: 'الدعم' },
  settings: { ru: 'Настройки', en: 'Settings', he: 'הגדרות', ar: 'الإعدادات' },
  admin: { ru: 'Админ', en: 'Admin', he: 'ניהול', ar: 'الإدارة' },
  apply: { ru: 'Применить', en: 'Apply', he: 'להחיל', ar: 'تطبيق' },
  reset: { ru: 'Сбросить всё', en: 'Reset all', he: 'לאפס', ar: 'إعادة تعيين' },
  verifiedNote: { ru: 'Фото проверены администрацией.', en: 'Photos reviewed by administration.', he: 'התמונות נבדקו על ידי ההנהלה.', ar: 'تمت مراجعة الصور من الإدارة.' },
  verifiedSub: { ru: 'Материалы прошли проверку по правилам платформы на момент публикации.', en: 'Materials passed platform checks at publication time.', he: 'החומרים עברו בדיקה בעת הפרסום.', ar: 'اجتازت المواد الفحص وقت النشر.' },
  paused: { ru: 'Профиль временно недоступен.', en: 'Profile temporarily unavailable.', he: 'הפרופיל אינו זמין זמנית.', ar: 'الملف غير متاح مؤقتًا.' },
};

export function t(key: string, lang: Lang): string {
  const e = D[key];
  if (!e) return key;
  return e[lang] ?? e.en;
}
export function fmtNum(n: number, lang: Lang): string {
  try { return new Intl.NumberFormat(lang === 'he' ? 'he-IL' : lang === 'ar' ? 'ar-EG' : lang === 'ru' ? 'ru-RU' : 'en-US').format(n); }
  catch { return String(n); }
}
export function fmtDate(d: string, lang: Lang): string {
  try { return new Intl.DateTimeFormat(lang === 'he' ? 'he-IL' : lang === 'ar' ? 'ar-EG' : lang === 'ru' ? 'ru-RU' : 'en-US', { dateStyle: 'medium' }).format(new Date(d)); }
  catch { return d; }
}
