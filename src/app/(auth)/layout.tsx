import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { Page } from '@/shared/components/layout/Page';
import { Footer } from '@/shared/components/layout/Footer';
import { Header } from '@/shared/components/layout/Header';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (session) {
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
