import { useInfiniteQuery } from '@tanstack/react-query';

import { meetingsQuery } from '../queries/meetings-query';

import { useMeetingsQueryState } from './useMeetingsQueryState';

export function useMeetingsInfiniteQuery() {
  const { period, eventType, from, to } = useMeetingsQueryState();
  return useInfiniteQuery(
    meetingsQuery({
      period,
      eventSlug: eventType,
      startDate: from,
      endDate: to,
    }),
  );
}
