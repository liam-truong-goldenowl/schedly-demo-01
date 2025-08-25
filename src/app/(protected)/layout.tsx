import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { nextAuthOptions } from '@/shared/lib/next-auth';
import { AuthProvider } from '@/shared/components/providers/AuthProvider';

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect('/login');
  }

  return <AuthProvider>{children}</AuthProvider>;
}
