'use client';

import {
  IconLink,
  IconClockHour3,
  IconCalendarWeek,
} from '@tabler/icons-react';

import { NavMain } from '@/shared/components/layout/NavMain';
import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from '@/shared/components/ui/sidebar';

import { DashboardLogo } from '../DashboardLogo';

import { NavUser } from './NavUser';

const data = {
  navMain: [
    {
      title: 'Event Types',
      url: '/events',
      icon: IconLink,
    },
    {
      title: 'Meetings',
      url: '/meetings',
      icon: IconCalendarWeek,
    },
    {
      title: 'Availability',
      url: '/availability',
      icon: IconClockHour3,
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
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
