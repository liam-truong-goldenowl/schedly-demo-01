'use client';

import {
  IconUsers,
  IconFolder,
  IconChartBar,
  IconSettings,
  IconDashboard,
  IconListDetails,
} from '@tabler/icons-react';

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
      url: '#',
      icon: IconDashboard,
    },
    {
      title: 'Meetings',
      url: '#',
      icon: IconListDetails,
    },
    {
      title: 'Availability',
      url: '#',
      icon: IconChartBar,
    },
    {
      title: 'Contacts',
      url: '#',
      icon: IconFolder,
    },
    {
      title: 'Integrations',
      url: '#',
      icon: IconUsers,
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '#',
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
