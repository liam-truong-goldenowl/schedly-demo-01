import z from 'zod';
import { queryOptions } from '@tanstack/react-query';

import { clientApiWithAuth } from '@/shared/lib/client-api';

export const eventSelectQuery = queryOptions({
  queryKey: ['event-select'],
  queryFn: async () =>
    clientApiWithAuth('@get/events/select', {
      throw: true,
      output: z.array(
        z.object({
          id: z.number(),
          slug: z.string(),
          name: z.string(),
        }),
      ),
    }),
  staleTime: Number.POSITIVE_INFINITY,
});
