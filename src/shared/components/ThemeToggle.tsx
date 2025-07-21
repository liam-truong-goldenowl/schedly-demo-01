'use client';

import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { Sun, Check, MoonStar } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

enum Theme {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

export function ThemeToggle() {
  const { setTheme, theme: currentTheme = Theme.System } = useTheme();
  const t = useTranslations('ThemeToggle');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="[--icon-size:1rem]">
          <Sun className="size-(--icon-size) scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <MoonStar className="absolute size-(--icon-size) scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">{t('trigger')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.values(Theme).map((theme) => (
          <DropdownMenuItem key={theme} onClick={() => setTheme(theme)}>
            {t(theme)} {currentTheme === theme && <Check />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
