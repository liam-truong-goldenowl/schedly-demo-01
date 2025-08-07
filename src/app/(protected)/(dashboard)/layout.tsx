import { fetchUser } from '@/modules/auth/server/query';
import { UserProvider } from '@/modules/auth/contexts/UserContext';
import DashboardLayout from '@/shared/components/layout/DashboardLayout';

export default async function ProtectedDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await fetchUser();

  return (
    <DashboardLayout>
      <UserProvider user={user}>{children}</UserProvider>
    </DashboardLayout>
  );
}
