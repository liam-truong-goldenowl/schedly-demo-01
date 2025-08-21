import { useInfiniteQuery } from '@tanstack/react-query';

import { useDebounce } from '@/shared/hooks/use-debounce';

import { getEvents } from '../services/event.api';

import { useEventSearchQueryState } from './useEventSearchQueryState';

export function useEvents() {
  const { eventSearch } = useEventSearchQueryState();
  const search = useDebounce(eventSearch, 300);

  return useInfiniteQuery({
    queryKey: ['events', { search }],
    queryFn: ({ pageParam: cursor }) => getEvents({ cursor, search }),
    initialPageParam: null as null | string,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextCursor : null,
  });
}
