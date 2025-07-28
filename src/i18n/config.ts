export const LOCALES = ['en', 'de', 'vi'] as const;
export const DEFAULT_LOCALE: Locale = 'en';

export type Locale = (typeof LOCALES)[number];
