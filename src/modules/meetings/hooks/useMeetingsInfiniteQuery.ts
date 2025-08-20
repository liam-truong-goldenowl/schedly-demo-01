import { useInfiniteQuery } from '@tanstack/react-query';

import { meetingsQuery } from '../queries/meetings-query';

import { useMeetingsQueryState } from './useMeetingsQueryState';

export function useMeetingsInfiniteQuery() {
  const { period, eventType } = useMeetingsQueryState();
  return useInfiniteQuery(meetingsQuery({ period, eventType }));
}
