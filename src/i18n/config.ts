export const LOCALES = ['en', 'vi'] as const;
export const DEFAULT_LOCALE: Locale = 'en';

export type Locale = (typeof LOCALES)[number];
