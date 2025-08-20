import Link from 'next/link';
import { toast } from 'sonner';
import { useTransition } from 'react';
import { LinkIcon, ClockIcon, ExternalLinkIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { Heading } from '@/shared/components/layout/Heading';
import { useUser } from '@/modules/auth/contexts/UserContext';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';

type EventItemProps = {
  event: {
    id: number;
    name: string;
    duration: number;
    description?: string;
    slug: string;
    schedule: {
      name: string;
      id: number;
    };
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
          <Link
            href={`/availability?scheduleId=${event.schedule.id}`}
            className="hover:underline"
          >
            {event.schedule.name}
          </Link>
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
  const [isCopyingLink, startCopyingLink] = useTransition();

  const eventPath = `/sharing/${hostSlug}/${event.slug}`;

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
      </div>
    </div>
  );
}
