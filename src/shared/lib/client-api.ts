import { getSession } from 'next-auth/react';
import { createFetch } from '@better-fetch/fetch';

import { env } from './env';

export const clientApi = createFetch({
  baseURL: env.NEXT_PUBLIC_API_URL,
});

export const clientApiWithAuth = createFetch({
  baseURL: env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
  onRequest: async (context) => {
    const session = await getSession();

    if (!session) {
      window.location.href = '/login';
      return context;
    }

    context.headers.set('Authorization', `Bearer ${session.accessToken}`);

    return context;
  },
});
