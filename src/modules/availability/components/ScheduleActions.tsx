'use client';

import { TrashIcon, EllipsisVerticalIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { StatefulButton } from '@/shared/components/ui/stateful-button';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogDescription,
} from '@/shared/components/ui/alert-dialog';

import { useActiveSchedule } from '../hooks/useActiveSchedule';
import { useAvailability } from '../contexts/AvailabilityContext';
import { useScheduleMutations } from '../hooks/useScheduleMutations';

export function ScheduleActions() {
  const { schedules } = useAvailability();
  const { activeScheduleId } = useActiveSchedule();

  const defaultSchedule =
    schedules.find((schedule) => schedule.isDefault) ?? schedules[0];
  const activeSchedule =
    schedules.find((schedule) => schedule.id == activeScheduleId) ??
    defaultSchedule;

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisVerticalIcon />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={4}>
          <DropdownMenuGroup>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem disabled={schedules.length <= 1}>
                <TrashIcon />
                Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuGroup>
        </DropdownMenuContent>
        <DeleteAction name={activeSchedule.name} id={activeSchedule.id} />
      </DropdownMenu>
    </AlertDialog>
  );
}

function DeleteAction({ name, id }: { name: string; id: number }) {
  const { deleteSchedule, isDeleting } = useScheduleMutations();

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete {name}</AlertDialogTitle>
        <AlertDialogDescription>
          <b>This action cannot be undone</b>. Any event types associated with
          this schedule will be set to custom availability with these hours.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction asChild variant="destructive">
          <StatefulButton
            onClick={() => deleteSchedule(id)}
            loading={isDeleting}
          >
            Delete Schedule
          </StatefulButton>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
