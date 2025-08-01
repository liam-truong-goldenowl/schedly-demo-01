import z from 'zod';

import { clientApi } from '@/shared/lib/client-api';

export async function signUp(userData: {
  name: string;
  email: string;
  timezone: string;
  password: string;
}) {
  return clientApi('@post/auth/sign-up', {
    body: userData,
    output: z.object({
      name: z.string(),
      email: z.email(),
      publicSlug: z.string(),
    }),
  });
}
