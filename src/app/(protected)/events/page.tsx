'use client';

import { signOut } from 'next-auth/react';

import { Page } from '@/shared/components/layout/Page';
import { Button } from '@/shared/components/ui/button';
import { Section } from '@/shared/components/layout/Section';
import { Container } from '@/shared/components/layout/Container';

export default function EventsPage() {
  return (
    <Page>
      <Container>
        <Section>
          <h1>Protected Events Page</h1>
        </Section>
        <Button onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>
          Log out
        </Button>
      </Container>
    </Page>
  );
}
