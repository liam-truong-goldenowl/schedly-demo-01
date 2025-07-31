'use client';

import { PlusIcon, ChevronDownIcon } from 'lucide-react';

import { Heading } from '@/shared/components/layout/Heading';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/shared/components/ui/dropdown-menu';

import { useAvailability } from '../contexts/AvailabilityContext';

export function SwitchSchedule() {
  const { schedules } = useAvailability();

  return (
    <div>
      <Heading level="h2" className="text-heading-14 mb-1 text-gray-600">
        Schedule {schedules.length}
      </Heading>
      <DropdownMenu>
        <DropdownMenuTrigger className="text-copy-20 text-primary group flex items-center gap-1 font-semibold">
          switch schedule (default)
          <ChevronDownIcon
            size={20}
            className="group-aria-expanded:rotate-180"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" sideOffset={4}>
          <DropdownMenuGroup className="w-72">
            {schedules.map((schedule) => (
              <DropdownMenuItem key={schedule.id}>
                {schedule.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="w-72">
            <DropdownMenuItem>
              <PlusIcon />
              Create Schedule
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
