import z from 'zod';

import { serverApi } from '@/shared/lib/server-api';

export async function login(credentials: { email: string; password: string }) {
  return serverApi('@post/auth/login', {
    body: credentials,
    output: z.object({
      accessToken: z.string(),
      refreshToken: z.string(),
    }),
  });
}

export async function refresh(refreshToken: string) {
  return serverApi('@post/auth/refresh', {
    output: z.object({
      accessToken: z.string(),
      refreshToken: z.string(),
    }),
    onRequest(context) {
      context.headers.set('Authorization', `Bearer ${refreshToken}`);
      return context;
    },
  });
}
