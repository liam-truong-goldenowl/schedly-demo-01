import { infiniteQueryOptions } from '@tanstack/react-query';

import { api } from '@/shared/lib/api';
import { makeCursorPaginationSchema } from '@/shared/schemas';

import { MeetingSchema } from '../schemas';

type Query = {
  period: string;
  cursor?: string | null;
  eventSlug: string | null;
  startDate: string | null;
  endDate: string | null;
};

export const meetingsQuery = (query: Query) =>
  infiniteQueryOptions({
    queryKey: ['meetings', query],
    queryFn: async ({ pageParam: cursor }) => getMeetings({ ...query, cursor }),
    initialPageParam: null as null | string,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextCursor : null,
    refetchOnWindowFocus: true,
  });

async function getMeetings(query: Query) {
  return await api('@get/meetings', {
    query,
    output: makeCursorPaginationSchema(MeetingSchema),
    throw: true,
  });
}
