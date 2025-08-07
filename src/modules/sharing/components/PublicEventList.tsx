import Link from 'next/link';
import { PlayIcon } from 'lucide-react';

import { Heading } from '@/shared/components/layout/Heading';

import { EventList } from '../schema/event';

type PublicEventListProps = {
  hostSlug: string;
  events: EventList;
};

export function PublicEventList({ events, hostSlug }: PublicEventListProps) {
  return (
    <section className="mx-auto max-w-[860px] px-7 py-6">
      <Heading level={'h2'} className="sr-only">
        Public Events
      </Heading>

      <ul className="bg-muted grid grid-cols-2 gap-(--border-width) p-(--border-width) [--border-width:calc(var(--spacing)*0.5)]">
        {events.map((event) => (
          <li key={event.id}>
            <Link
              href={`/sharing/${hostSlug}/${event.slug}`}
              className="bg-background hover:bg-accent block aspect-[2/1] px-6 py-8"
            >
              <div className="mb-2.5 flex items-center justify-between">
                <Heading level={'h3'} className="mb-0">
                  {event.name}
                </Heading>
                <PlayIcon size={18} className="fill-current" />
              </div>
              <p className="text-muted-foreground text-copy-14">
                {event.description
                  ? event.description
                  : 'No description available'}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
