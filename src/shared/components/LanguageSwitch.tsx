'use client';

import { useTransition } from 'react';
import { Check, Languages } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { Locale, LOCALES } from '@/i18n/config';
import { setUserLocale } from '@/shared/lib/locale';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

import { Button } from './ui/button';

export function LanguageSwitch() {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('LanguageSwitch');
  const locale = useLocale();

  function onChangeLanguage(language: Locale) {
    startTransition(() => {
      setUserLocale(language);
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={isPending}>
          <Languages />
          {t(locale)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LOCALES.map((language) => (
          <DropdownMenuItem
            key={language}
            onClick={() => onChangeLanguage(language)}
            className="flex items-center justify-between gap-2"
          >
            {t(language)} {language === locale && <Check />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
