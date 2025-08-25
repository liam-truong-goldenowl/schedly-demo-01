import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { nextAuthOptions } from '@/shared/lib/next-auth';

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect('/login');
  }

  return children;
}
