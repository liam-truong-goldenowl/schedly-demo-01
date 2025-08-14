'use client';

import { useQuery } from '@tanstack/react-query';

import { cn, formatTime } from '@/shared/lib/utils';
import { Heading } from '@/shared/components/layout/Heading';

import { meetingsQuery } from '../queries/meetings-query';
import { useMeetingsQueryState } from '../hooks/useQueryState';

export function MeetingList() {
  const { period, startDate, endDate } = useMeetingsQueryState();
  const { data, isLoading, isFetching } = useQuery(
    meetingsQuery({ period, startDate, endDate }),
  );

  if (isLoading) {
    return <div className="p-4">loading...</div>;
  }

  if (!data) {
    return <div className="p-4">No meetings found</div>;
  }

  if (!data.length) {
    return <div className="p-4">No meetings found</div>;
  }

  return (
    <section>
      <h2 className="sr-only">Meetings</h2>
      <ul
        className={cn('divide-border divide-y-1', isFetching && 'opacity-50')}
      >
        {data.map((meeting) => (
          <li className="p-4" key={meeting.id}>
            <section>
              <header className="mb-2 flex items-center gap-4">
                <Heading level={'h3'} className="mb-0">
                  {meeting.event.name}
                </Heading>
                <time dateTime={meeting.startDate}>
                  {meeting.startDate} {formatTime(meeting.startTime)}
                </time>
              </header>
              <section className="mb-2">
                <Heading level={'h4'} className="sr-only">
                  More information
                </Heading>
                <div>
                  <span>Remaining Invitees: </span>
                  <span>
                    {meeting.event.inviteeLimit - meeting.invitees.length}
                  </span>
                </div>
              </section>
              <section className="mb-2">
                <Heading level={'h4'} className="mb-0.5">
                  Invitees:
                </Heading>
                <ol className="list-disc ps-8">
                  {meeting.invitees.map((invitee) => (
                    <li key={invitee.email}>
                      {invitee.name} - {invitee.email}
                    </li>
                  ))}
                </ol>
              </section>
            </section>
          </li>
        ))}
      </ul>
    </section>
  );
}
