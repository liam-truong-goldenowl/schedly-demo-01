import DashboardLayout from '@/shared/components/layout/DashboardLayout';

export default function AvailabilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
