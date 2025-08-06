'use client';

import { ChevronsDownIcon } from 'lucide-react';

import { Skeleton } from '@/shared/components/ui/skeleton';

import { useEvents } from '../hooks/useEvents';
import {
  EVENT_ITEMS_COUNT,
  INITIAL_FALLBACK_ITEMS_COUNT,
  FETCHING_FALLBACK_ITEMS_COUNT,
} from '../config';

import { EventItem, EventItemFallback } from './EventItem';

export function EventList() {
  const {
    isLoading,
    isFetchingNextPage,
    data,
    error,
    hasNextPage,
    fetchNextPage,
  } = useEvents();

  if (isLoading) {
    return (
      <section>
        <h2 className="sr-only">Event list</h2>
        <ul className="space-y-4">
          {Array.from({ length: INITIAL_FALLBACK_ITEMS_COUNT }).map(
            (_, index) => (
              <li key={index}>
                <EventItemFallback />
              </li>
            ),
          )}
        </ul>
      </section>
    );
  }

  if (error) {
    return <div>Error loading events</div>;
  }

  if (!data) {
    return null;
  }

  const lastPage = data.pages[data.pages.length - 1];
  const events = data.pages.flatMap((page) => page.items);
  const nextNumberOfEvents = Math.min(
    EVENT_ITEMS_COUNT,
    lastPage.totalCount - events.length,
  );

  return (
    <section className="space-y-4">
      <h2 className="sr-only">Event list</h2>
      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
        {isFetchingNextPage && (
          <li>
            {Array.from({ length: FETCHING_FALLBACK_ITEMS_COUNT }).map(
              (_, index) => (
                <Skeleton key={index} className="h-16 w-full" />
              ),
            )}
          </li>
        )}
      </ul>
      {hasNextPage ? (
        <button
          onClick={() => fetchNextPage()}
          className="hover:text-primary active:text-primary inline-flex cursor-pointer items-center gap-2"
        >
          <ChevronsDownIcon size={18} />
          <span>Show more event types ({nextNumberOfEvents})</span>
        </button>
      ) : (
        <p className="text-gray-600">You reached the end of the list.</p>
      )}
    </section>
  );
}
