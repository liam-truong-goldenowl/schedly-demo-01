import { getSession } from 'next-auth/react';
import { createFetch } from '@better-fetch/fetch';

import { env } from './env';

export const api = createFetch({
  baseURL: env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
  onRequest: async (context) => {
    const session = await getSession();

    if (session) {
      context.headers.set('Authorization', `Bearer ${session.accessToken}`);
    }

    return context;
  },
  onResponse: (context) => {
    switch (context.response.status) {
      case 401:
      case 403:
        window.location.href = '/login';
        break;
    }

    return context;
  },
});

export const publicApi = createFetch({
  baseURL: env.NEXT_PUBLIC_API_URL,
});
