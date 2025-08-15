import Link from 'next/link';

import { Heading } from '@/shared/components/layout/Heading';

export default function GuestPage() {
  return (
    <main className="mx-auto max-w-prose py-4">
      <header>
        <Heading>Marketing Page</Heading>
      </header>
      <nav className="flex items-center gap-4">
        <Link className="underline" href="/login">
          Login
        </Link>
        <Link className="underline" href="/sign-up">
          Sign up
        </Link>
      </nav>
    </main>
  );
}
