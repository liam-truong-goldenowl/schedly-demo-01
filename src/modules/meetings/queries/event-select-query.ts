import { queryOptions } from '@tanstack/react-query';

import { api } from '@/shared/lib/api';

import { EventSelectListSchema } from '../schemas';

export const eventSelectQuery = queryOptions({
  queryKey: ['event-select'],
  queryFn: async () =>
    api('@get/events/select', {
      throw: true,
      output: EventSelectListSchema,
    }),
  staleTime: Number.POSITIVE_INFINITY,
});
