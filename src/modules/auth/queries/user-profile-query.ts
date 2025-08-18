import z from 'zod';
import { queryOptions } from '@tanstack/react-query';

import { clientApiWithAuth } from '@/shared/lib/client-api';

export const userProfileQuery = queryOptions({
  queryKey: ['user', 'profile'],
  queryFn: async () => {
    return clientApiWithAuth('@get/profile', {
      output: z.object({
        email: z.string(),
        name: z.string(),
        slug: z.string(),
        avatarUrl: z.string().optional(),
      }),
      throw: true,
    });
  },
});
