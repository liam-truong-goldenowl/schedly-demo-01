import { SiteHeader } from '@/shared/components/layout/SiteHeader';
import { SidebarInset, SidebarProvider } from '@/shared/components/ui/sidebar';

import { AppSidebar } from './AppSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 64)',
          '--header-height': 'calc(var(--spacing) * 18)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="floating" />
      <SidebarInset>
        <SiteHeader />
        <main className="bg-muted/50 h-full">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
