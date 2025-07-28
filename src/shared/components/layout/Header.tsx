import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { AppLogo } from '../AppLogo';
import { Button } from '../ui/button';

import { Container } from './Container';

export function Header() {
  const t = useTranslations('Header');

  return (
    <header className="h-19.5 border-b">
      <Container className="flex h-full items-center justify-between">
        <AppLogo />

        <div className="flex items-center gap-4">
          <Button asChild variant={'ghost'}>
            <Link href="/login">{t('login')}</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-up">{t('sign-up')}</Link>
          </Button>
        </div>
      </Container>
    </header>
  );
}
