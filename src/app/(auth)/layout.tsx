import { redirect } from 'next/navigation';

import { getSession } from '@/shared/lib/auth';
import { Page } from '@/shared/components/layout/Page';
import { Footer } from '@/shared/components/layout/Footer';
import { Header } from '@/shared/components/layout/Header';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session && !session.error) {
    redirect('/events');
  }

  return (
    <Page>
      <Header />
      {children}
      <Footer />
    </Page>
  );
}
