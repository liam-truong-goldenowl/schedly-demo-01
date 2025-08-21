import { SidebarTrigger } from '@/shared/components/ui/sidebar';

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="px-4 lg:px-6">
        <SidebarTrigger className="-ml-1" />
      </div>
    </header>
  );
}
