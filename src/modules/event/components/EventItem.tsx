import Link from 'next/link';
import { ClockIcon, TrashIcon, EllipsisVerticalIcon } from 'lucide-react';

import { toTitleCase } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { Heading } from '@/shared/components/layout/Heading';
import { StatefulButton } from '@/shared/components/ui/stateful-button';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogDescription,
} from '@/shared/components/ui/alert-dialog';

import { useSchedulesQuery } from '../hooks/useSchedulesQuery';
import { useEventMutations } from '../hooks/useEventMutations';

type EventItemProps = {
  event: {
    id: number;
    name: string;
    type: string;
    duration: number;
    scheduleId: number;
    description?: string | null;
  };
};

export function EventItem({ event }: EventItemProps) {
  const { isLoading: isLoadingSchedule, data: schedules } = useSchedulesQuery();
  const { deleteEvent, isDeletingEvent } = useEventMutations();

  const schedule =
    isLoadingSchedule || !schedules
      ? undefined
      : schedules.find((s) => s.id === event.scheduleId);

  async function handleDeleteEvent() {
    if (isDeletingEvent) return;
    await deleteEvent(event.id);
  }

  return (
    <article className="flex items-center justify-between gap-4 rounded-lg border border-s-8 bg-white p-4 ps-5">
      <section className="space-y-2">
        <Heading level={'h3'} className="mb-1.5">
          {event.name}
        </Heading>
        <div className="text-copy-14 flex items-center gap-2">
          <span className="inline-flex items-center gap-1">
            <ClockIcon className="size-4" />
            {event.duration} min
          </span>
          <span>{toTitleCase(event.type)}</span>
        </div>
        <div className="text-copy-14">
          <span className="font-semibold">Schedule: </span>
          {schedule && (
            <Link
              href={`/availability?scheduleId=${schedule.id}`}
              className="hover:text-primary hover:underline"
            >
              {schedule.name} {schedule.isDefault ? '(default)' : ''}
            </Link>
          )}
        </div>
      </section>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" aria-label="Actions">
              <EllipsisVerticalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <AlertDialogTrigger asChild>
              <DropdownMenuItem>
                <TrashIcon />
                Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this event?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="outline" disabled={isDeletingEvent}>
                Cancel
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction
              asChild
              variant={'destructive'}
              disabled={isDeletingEvent}
              onClick={handleDeleteEvent}
            >
              <StatefulButton loading={isDeletingEvent}>Delete</StatefulButton>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </article>
  );
}

export function EventItemFallback() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-between gap-4 rounded-lg border border-s-8 bg-white p-4 ps-5"
    >
      <div>
        <Skeleton className="mb-2 h-5.5 w-[20ch]" />
        <div className="text-copy-14 flex items-center gap-2">
          <Skeleton className="h-5 w-[10ch]" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="mt-2 h-5 w-full" />
      </div>
      <Skeleton className="size-9" />
    </div>
  );
}
