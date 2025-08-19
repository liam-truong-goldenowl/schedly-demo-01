'use client';

import { ChevronsDownIcon } from 'lucide-react';

import { If } from '@/shared/components/If';
import { MapList } from '@/shared/components/MapList';

import { useEvents } from '../hooks/useEvents';

import { EmptyEventList } from './EmptyEventList';
import { EventItem, EventItemFallback } from './EventItem';

export function EventList() {
  const {
    data,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isLoadingEvents,
  } = useEvents();
  const isLoading = isLoadingEvents || !data;

  if (error) {
    return <div>Error loading events</div>;
  }

  if (isLoading) {
    return (
      <div className="bg-border space-y-(--divider-size) overflow-clip rounded-md border [--divider-size:1px]">
        <MapList
          items={Array.from({ length: 3 }, (_, index) => index)}
          itemKey={({ item }) => item}
          render={() => <EventItemFallback />}
          className="grid gap-(--divider-size)"
        />
      </div>
    );
  }

  const events = data.pages.flatMap((page) => page.items);

  if (events.length < 1) {
    return <EmptyEventList />;
  }

  return (
    <section className="space-y-4">
      <header>
        <h2 className="sr-only">Event list</h2>
      </header>
      <div className="bg-border space-y-(--divider-size) overflow-clip rounded-md border [--divider-size:1px]">
        <MapList
          items={events}
          itemKey={({ item }) => item.id}
          render={({ item }) => <EventItem event={item} />}
          className="grid gap-(--divider-size)"
        />
        <If
          condition={isFetchingNextPage}
          show={
            <MapList
              items={Array.from({ length: 5 }, (_, index) => index)}
              itemKey={({ item }) => item}
              render={() => <EventItemFallback />}
              className="grid gap-(--divider-size)"
            />
          }
        />
      </div>
      <footer>
        <If
          condition={hasNextPage}
          show={
            <button
              onClick={() => fetchNextPage()}
              className="hover:text-primary active:text-primary inline-flex cursor-pointer items-center gap-2"
            >
              <ChevronsDownIcon size={18} />
              <span>Show more</span>
            </button>
          }
          otherwiseShow={
            <p className="text-gray-600">You reached the end of the list.</p>
          }
        />
      </footer>
    </section>
  );
}
