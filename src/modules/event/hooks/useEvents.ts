import { useInfiniteQuery } from '@tanstack/react-query';

import { getEvents } from '../services/event.api';

export function useEvents() {
  return useInfiniteQuery({
    queryKey: ['events'],
    queryFn: ({ pageParam: cursor }) => getEvents({ cursor }),
    initialPageParam: null as null | string,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextCursor : null,
  });
}
