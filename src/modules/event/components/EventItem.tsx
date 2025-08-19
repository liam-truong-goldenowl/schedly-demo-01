import Link from 'next/link';
import { toast } from 'sonner';
import { useTransition } from 'react';
import {
  LinkIcon,
  ClockIcon,
  TrashIcon,
  ExternalLinkIcon,
  EllipsisVerticalIcon,
} from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { Heading } from '@/shared/components/layout/Heading';
import { useUser } from '@/modules/auth/contexts/UserContext';
import { StatefulButton } from '@/shared/components/ui/stateful-button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuItem,
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

import { useEventMutations } from '../hooks/useEventMutations';

type EventItemProps = {
  event: {
    id: number;
    name: string;
    duration: number;
    scheduleId: number;
    description?: string;
    slug: string;
  };
};

export function EventItem({ event }: EventItemProps) {
  return (
    <article className="bg-background flex items-center justify-between gap-4 px-6 py-4">
      <section className="space-y-2">
        <Heading level={'h3'} className="mb-1.5">
          {event.name}
        </Heading>
        <div className="text-copy-14 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded bg-gray-100 px-2 py-1">
            <ClockIcon className="size-4" />
            {event.duration} min
          </span>
        </div>
      </section>
      <EventItemActions event={event} />
    </article>
  );
}

type EventItemActionsProps = {
  event: {
    id: number;
    slug: string;
  };
};

function EventItemActions({ event }: EventItemActionsProps) {
  const { slug: hostSlug } = useUser();
  const { deleteEvent, isDeletingEvent } = useEventMutations();
  const [isCopyingLink, startCopyingLink] = useTransition();

  const eventPath = `/sharing/${hostSlug}/${event.slug}`;

  async function handleDeleteEvent() {
    if (isDeletingEvent) return;
    await deleteEvent(event.id);
  }

  async function handleCopyLink() {
    const eventLink = `${window.location.origin}${eventPath}`;
    startCopyingLink(async () => {
      await navigator.clipboard.writeText(eventLink);
      toast.success('Event link copied to clipboard');
    });
  }

  return (
    <div className="bg-border flex gap-[1px] overflow-clip rounded-md border">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="bg-background rounded-none"
            aria-label="Preview event"
            asChild
          >
            <Link href={eventPath} target="_blank">
              <ExternalLinkIcon className="size-4" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Preview</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="bg-background rounded-none"
            aria-label="Copy event link"
            onClick={handleCopyLink}
            disabled={isCopyingLink}
          >
            <LinkIcon className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy link to event</p>
        </TooltipContent>
      </Tooltip>

      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="bg-background rounded-none"
              aria-label="Delete event"
            >
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
    </div>
  );
}

export function EventItemFallback() {
  return (
    <div
      aria-hidden="true"
      className="bg-background flex items-center justify-between gap-4 px-6 py-4"
    >
      <div>
        <Skeleton className="text-heading-16 mb-2 h-[1lh] w-[20ch]" />
        <Skeleton className="h-5 w-[8ch]" />
      </div>
      <div className="flex items-center gap-[1px] overflow-clip rounded-md">
        <Skeleton className="size-9 rounded-none" />
        <Skeleton className="size-9 rounded-none" />
        <Skeleton className="size-9 rounded-none" />
      </div>
    </div>
  );
}
