'use client';

import { ChevronsDownIcon } from 'lucide-react';

import { If } from '@/shared/components/If';
import { addMinutes } from '@/shared/lib/time';
import { cn, formatTime } from '@/shared/lib/utils';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { Heading } from '@/shared/components/layout/Heading';

import { useMeetingsInfiniteQuery } from '../hooks/useMeetingsInfiniteQuery';

export function MeetingList() {
  const {
    data,
    error,
    isFetching,
    isLoading: isLoadingMeetings,
    hasNextPage,
    fetchNextPage,
  } = useMeetingsInfiniteQuery();
  const isLoading = isLoadingMeetings || !data;

  if (error) {
    return <div>Error loading events</div>;
  }

  if (isLoading) {
    return (
      <div className="overflow-clip rounded-md border opacity-70">
        <div>
          <Skeleton className="mb-0.5 h-10 rounded-none border-b" />
          <Skeleton className="bg-background h-28 rounded-none" />
        </div>
        <div>
          <Skeleton className="mb-0.5 h-10 rounded-none border-y" />
          <Skeleton className="bg-background h-28 rounded-none" />
        </div>
      </div>
    );
  }

  const meetings = data.pages
    .flatMap((page) => page.items)
    .toSorted((a, b) =>
      a.startDate == b.startDate && a.startTime < b.startTime ? -1 : 1,
    );
  const groupedByDate = Object.groupBy(
    meetings,
    (meeting) => meeting.startDate,
  );

  if (meetings.length < 1) {
    return (
      <div className="bg-background grid place-content-center rounded-md border border-dashed p-6 text-gray-600">
        No meetings found.
      </div>
    );
  }

  return (
    <section>
      <div className="bg-background mb-4 overflow-clip rounded-md border">
        {Object.entries(groupedByDate).map(([date, meetings = []]) => (
          <div key={date} className="border-b last-of-type:border-b-0">
            <time className="flex border-b bg-gray-100 px-6 py-2 font-medium text-gray-600">
              {new Date(date).toDateString()}
            </time>
            <ul
              className={cn(
                'divide-border divide-y-1',
                isFetching && 'opacity-50',
              )}
            >
              {meetings.map((meeting) => (
                <li
                  className="border-b p-6 last-of-type:border-b-0"
                  key={meeting.id}
                >
                  <section className="grid space-y-4 md:grid-cols-2">
                    <header>
                      <Heading level={'h3'} className="mb-0.5 font-medium">
                        {meeting.event.name}
                      </Heading>
                      <time
                        dateTime={meeting.startDate}
                        className="text-gray-600"
                      >
                        {formatTime(meeting.startTime)} -{' '}
                        {addMinutes(meeting.startTime, meeting.event.duration)}
                      </time>
                    </header>
                    <section className="mb-2">
                      <Heading level={'h4'} className="mb-1 font-normal">
                        Invitees:
                      </Heading>
                      <details>
                        <summary>
                          <span>
                            {meeting.invitees.length} /{' '}
                            {meeting.event.inviteeLimit} invitees
                          </span>
                        </summary>
                        <div className="my-1 overflow-x-auto">
                          <table>
                            <thead className="sr-only">
                              <tr>
                                <th className="text-left">Name</th>
                                <th className="text-left">Email</th>
                                <th className="text-left">Timezone</th>
                              </tr>
                            </thead>
                            <tbody className="divide-border divide-y-1">
                              {meeting.invitees.map((invitee) => (
                                <tr key={invitee.email}>
                                  <td className="p-1 pe-4">{invitee.name}</td>
                                  <td className="p-1 pe-4">{invitee.email}</td>
                                  <td className="p-1">{invitee.timezone}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </details>
                    </section>
                  </section>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <footer className="text-center">
        <If
          condition={hasNextPage}
          show={() => (
            <button
              onClick={() => fetchNextPage()}
              className="hover:text-primary active:text-primary inline-flex cursor-pointer items-center gap-2"
            >
              <ChevronsDownIcon size={18} />
              <span>Show more</span>
            </button>
          )}
          otherwiseShow={() => (
            <p className="text-gray-600">You reached the end of the list.</p>
          )}
        />
      </footer>
    </section>
  );
}
