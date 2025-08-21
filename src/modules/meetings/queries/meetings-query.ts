import { infiniteQueryOptions } from '@tanstack/react-query';

import { clientApiWithAuth } from '@/shared/lib/client-api';
import { makeCursorPaginationSchema } from '@/shared/schemas';

import { MeetingSchema } from '../schemas';

export const meetingsQuery = (query: {
  period: string;
  eventType: string | null;
  startDate: string | null;
  endDate: string | null;
}) =>
  infiniteQueryOptions({
    queryKey: ['meetings', query],
    queryFn: async ({ pageParam: cursor }) => getMeetings({ ...query, cursor }),
    initialPageParam: null as null | string,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextCursor : null,
  });

async function getMeetings({
  period,
  cursor,
  eventType,
  startDate,
  endDate,
}: {
  period: string;
  cursor?: string | null;
  eventType: string | null;
  startDate: string | null;
  endDate: string | null;
}) {
  return await clientApiWithAuth('@get/meetings', {
    query: {
      period,
      cursor,
      eventSlug: eventType,
      startDate: startDate,
      endDate: endDate,
    },
    output: makeCursorPaginationSchema(MeetingSchema),
    throw: true,
  });
}
