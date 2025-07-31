import { redirect } from 'next/navigation';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { createFetch } from '@better-fetch/fetch';

import { env } from './env';
import { authOptions } from './auth';

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

export const serverApiWithAuth = createFetch({
  baseURL: env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
  onRequest: async (context) => {
    const session = await getServerSession(authOptions);

    if (!session) {
      redirect('/login');
    }

    context.headers.set('Authorization', `Bearer ${session.accessToken}`);

    return context;
  },
});

const isServer = typeof window === 'undefined';

export const apiWithAuth = isServer ? serverApiWithAuth : clientApiWithAuth;
