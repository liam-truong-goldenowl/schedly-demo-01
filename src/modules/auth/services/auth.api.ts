import z from 'zod';

import { api } from '@/shared/lib/api';

export async function signUp(userData: {
  name: string;
  email: string;
  password: string;
}) {
  return await api('@post/auth/sign-up', {
    body: userData,
    output: z.object({
      name: z.string(),
      email: z.email(),
      publicSlug: z.string(),
    }),
  });
}
