'use server';

import { cookies } from 'next/headers';

import { LOCALES, DEFAULT_LOCALE } from '@/i18n/config';

import type { Locale } from '@/i18n/config';

const COOKIE_NAME = 'NEXT_LOCALE';
const LOCALE_REGEX = /^[a-z]{2}$/;

export async function getUserLocale() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value || DEFAULT_LOCALE;
}

export async function setUserLocale(locale: Locale) {
  const cookieStore = await cookies();

  if (!locale) {
    cookieStore.delete(COOKIE_NAME);
    return;
  }

  if (!locale || !locale.match(LOCALE_REGEX)) {
    throw new Error(`Invalid locale: ${locale}`);
  }

  if (!LOCALES.includes(locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }

  cookieStore.set({
    name: COOKIE_NAME,
    value: locale,
  });
}
