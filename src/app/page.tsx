import { getTranslations } from 'next-intl/server';

import { ThemeToggle } from '@/shared/components/ThemeToggle';
import { LanguageSwitch } from '@/shared/components/LanguageSwitch';

export default async function Home() {
  const t = await getTranslations('HomePage');

  return (
    <div className="grid min-h-dvh place-content-center">
      <main className="mx-auto max-w-md rounded-lg border p-4 shadow-md">
        <div>{t('title')}</div>
        <div className="mt-4 flex items-center justify-end gap-2">
          <ThemeToggle />
          <LanguageSwitch />
        </div>
      </main>
    </div>
  );
}
