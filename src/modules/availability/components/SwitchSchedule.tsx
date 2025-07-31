'use client';

import { PlusIcon, CheckIcon, ChevronDownIcon } from 'lucide-react';

import { Heading } from '@/shared/components/layout/Heading';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/shared/components/ui/dropdown-menu';

import { useActiveSchedule } from '../hooks/useActiveSchedule';
import { useAvailability } from '../contexts/AvailabilityContext';

export function SwitchSchedule() {
  const { schedules } = useAvailability();
  const { activeScheduleId, setActiveScheduleId, checkActive } =
    useActiveSchedule();

  const defaultSchedule =
    schedules.find((schedule) => schedule.isDefault) ?? schedules[0];
  const activeSchedule =
    schedules.find((schedule) => schedule.id === activeScheduleId) ??
    defaultSchedule;

  return (
    <div>
      <Heading level="h2" className="text-heading-14 mb-1 text-gray-600">
        Schedule
      </Heading>
      <DropdownMenu>
        <DropdownMenuTrigger className="text-copy-20 text-primary group flex items-center gap-1 font-semibold">
          {activeSchedule.name} {activeSchedule.isDefault && '(default)'}
          <ChevronDownIcon
            size={20}
            className="group-aria-expanded:rotate-180"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" sideOffset={4}>
          <DropdownMenuGroup className="min-w-72">
            {schedules.map((schedule) => (
              <DropdownMenuItem
                key={schedule.id}
                className="flex justify-between"
                onClick={() =>
                  setActiveScheduleId(schedule.isDefault ? null : schedule.id)
                }
              >
                <span>{schedule.name}</span>
                {checkActive(schedule.isDefault ? null : schedule.id) && (
                  <CheckIcon className="text-primary" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="min-w-72">
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
