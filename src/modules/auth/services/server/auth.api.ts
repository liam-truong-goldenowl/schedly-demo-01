import { api } from '@/shared/server/api';

import { TokensSchema } from '../../schemas';

export async function login(credentials: { email: string; password: string }) {
  return api('@post/auth/login', {
    body: credentials,
    output: TokensSchema,
  });
}

export async function refresh(refreshToken: string) {
  return api('@post/auth/refresh', {
    output: TokensSchema,
    onRequest(context) {
      context.headers.set('Authorization', `Bearer ${refreshToken}`);
      return context;
    },
  });
}
