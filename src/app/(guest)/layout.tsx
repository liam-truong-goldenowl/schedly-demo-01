import { redirect } from 'next/navigation';

import { getSession } from '@/shared/lib/auth';

export default async function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session && !session.error) {
    redirect('/events');
  }

  return children;
}
