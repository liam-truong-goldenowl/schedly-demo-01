import z from 'zod';

import { api } from '@/shared/lib/api';

export async function signUp(userData: {
  name: string;
  email: string;
  timezone: string;
  password: string;
}) {
  return api('@post/auth/signup', {
    body: userData,
    output: z.object({
      email: z.string(),
    }),
  });
}
