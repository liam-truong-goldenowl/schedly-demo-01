import z from 'zod';
import { queryOptions } from '@tanstack/react-query';

import { clientApiWithAuth } from '@/shared/lib/client-api';

export const meetingsQuery = (query: {
  period: string;
  startDate?: string;
  endDate?: string;
}) =>
  queryOptions({
    staleTime: 60 * 1_000,
    queryKey: ['meetings', query],
    queryFn: async () => {
      return clientApiWithAuth('@get/meetings', {
        throw: true,
        query,
        output: z.array(
          z.object({
            id: z.number(),
            note: z.string().nullable(),
            startDate: z.string(),
            startTime: z.string(),
            timezone: z.string(),
            event: z.object({
              id: z.number(),
              name: z.string(),
              description: z.string(),
              inviteeLimit: z.number(),
            }),
            invitees: z.array(
              z.object({
                name: z.string(),
                email: z.string(),
              }),
            ),
          }),
        ),
      });
    },
  });
