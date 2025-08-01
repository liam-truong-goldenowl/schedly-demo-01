'use client';

import { IconLink, IconSettings, IconClockHour3 } from '@tabler/icons-react';

import { NavMain } from '@/shared/components/layout/NavMain';
import { NavUser } from '@/shared/components/layout/NavUser';
import { NavSecondary } from '@/shared/components/layout/NavSecondary';
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarContent,
} from '@/shared/components/ui/sidebar';

import { DashboardLogo } from '../DashboardLogo';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Scheduling',
      url: '/events',
      icon: IconLink,
    },
    {
      title: 'Availability',
      url: '/availability',
      icon: IconClockHour3,
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '/settings',
      icon: IconSettings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="py-4">
        <DashboardLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
