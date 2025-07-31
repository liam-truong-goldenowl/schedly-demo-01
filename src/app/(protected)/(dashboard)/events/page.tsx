'use client';

import { signOut } from 'next-auth/react';

import { Button } from '@/shared/components/ui/button';
import { Section } from '@/shared/components/layout/Section';

export default function EventsPage() {
  return (
    <div>
      <Section>
        <h1>Protected Events Page</h1>
      </Section>
      <Button onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>
        Log out
      </Button>
    </div>
  );
}
