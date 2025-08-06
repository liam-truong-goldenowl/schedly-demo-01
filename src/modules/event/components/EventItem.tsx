import { ClockIcon, EllipsisVerticalIcon } from 'lucide-react';

import { toTitleCase } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { Heading } from '@/shared/components/layout/Heading';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

import { useSchedulesQuery } from '../hooks/useSchedulesQuery';

type EventItemProps = {
  event: {
    id: number;
    name: string;
    type: string;
    duration: number;
    description?: string;
  };
};

export function EventItem(props: EventItemProps) {
  const {} = useSchedulesQuery();

  return (
    <article className="flex items-center justify-between gap-4 rounded-lg border border-s-8 bg-white p-4 ps-5">
      <section className="space-y-2">
        <Heading level={'h3'} className="mb-1.5">
          {props.event.name}
        </Heading>
        <div className="text-copy-14 flex items-center gap-2">
          <span className="inline-flex items-center gap-1">
            <ClockIcon className="size-4" />
            {props.event.duration} min
          </span>
          <span>{toTitleCase(props.event.type)}</span>
        </div>
        <div>what schedule</div>
      </section>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" aria-label="Actions">
            <EllipsisVerticalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
        <Skeleton className="mb-2 h-6 w-[20ch]" />
        <div className="text-copy-14 flex items-center gap-2">
          <Skeleton className="h-5 w-[10ch]" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="mt-2 h-6 w-full" />
      </div>
      <Skeleton className="size-9" />
    </div>
  );
}
