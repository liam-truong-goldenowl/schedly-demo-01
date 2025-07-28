import Link from 'next/link';

import { AppLogo } from '../AppLogo';
import { Button } from '../ui/button';

import { Container } from './Container';

export function Header() {
  return (
    <header className="h-19.5 border-b">
      <Container className="flex h-full items-center justify-between">
        <AppLogo />

        <div className="flex items-center gap-4">
          <Button asChild variant={'ghost'}>
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-up">Get started</Link>
          </Button>
        </div>
      </Container>
    </header>
  );
}
