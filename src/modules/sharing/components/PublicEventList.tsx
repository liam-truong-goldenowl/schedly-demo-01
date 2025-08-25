import Link from 'next/link';
import { PlayIcon } from 'lucide-react';

import { Heading } from '@/shared/components/layout/Heading';

import { EventList } from '../types';

type PublicEventListProps = {
  hostSlug: string;
  events: EventList;
};

export function PublicEventList({ events, hostSlug }: PublicEventListProps) {
  const isEmpty = events.length === 0;

  if (isEmpty) {
    return (
      <section>
        <Heading level={'h2'} className="sr-only">
          Public Events
        </Heading>
        <p className="text-muted-foreground text-center">
          This host has no public events.
        </p>
      </section>
    );
  }

  return (
    <section>
      <Heading level={'h2'} className="sr-only">
        Public Events
      </Heading>

      <ul className="grid gap-x-8 p-1 @md:max-h-110 @md:grid-cols-2 @md:overflow-y-auto">
        {events.map((event) => (
          <li key={event.id}>
            <Link
              href={`/sharing/${hostSlug}/${event.slug}`}
              className="hover:bg-accent focus-visible:bg-accent block aspect-[2/1] border-t-2 px-6 py-8 focus-visible:border-transparent"
            >
              <div className="mb-2.5 flex items-center justify-between">
                <Heading level={'h3'} className="mb-0">
                  {event.name}
                </Heading>
                <PlayIcon size={18} className="fill-current" />
              </div>
              <p className="text-muted-foreground text-copy-14 text-pretty">
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
