'use client';

import { PlusIcon, CheckIcon, ChevronDownIcon } from 'lucide-react';

import { Heading } from '@/shared/components/layout/Heading';
import { Dialog, DialogTrigger } from '@/shared/components/ui/dialog';
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

import { CreateScheduleDialog } from './CreateScheduleDialog';

export function SwitchSchedule() {
  const { schedules, loading } = useAvailability();
  const { activeScheduleId, setActiveScheduleId, checkActive } =
    useActiveSchedule();

  const defaultSchedule =
    schedules.find((schedule) => schedule.isDefault) ?? schedules[0];
  const activeSchedule =
    schedules.find((schedule) => schedule.id === activeScheduleId) ??
    defaultSchedule;
  const displayScheduleName = `${activeSchedule.name}${activeSchedule.isDefault ? ' (default)' : ''}`;

  return (
    <div>
      <Heading level="h2" className="text-heading-14 mb-1 text-gray-600">
        Schedule
      </Heading>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-copy-20 text-primary group flex items-center gap-1 font-semibold">
            {loading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              <>
                {displayScheduleName}
                <ChevronDownIcon
                  size={20}
                  className="group-aria-expanded:rotate-180"
                />
              </>
            )}
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
              <DialogTrigger asChild>
                <DropdownMenuItem className="flex items-center gap-2">
                  <PlusIcon size={16} />
                  Create Schedule
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <CreateScheduleDialog />
      </Dialog>
    </div>
  );
}
