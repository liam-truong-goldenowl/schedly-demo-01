import 'server-only';
import { getServerSession } from 'next-auth';
import { createFetch } from '@better-fetch/fetch';
import { notFound, redirect } from 'next/navigation';

import { env } from '../lib/env';

import { authOptions } from './auth';

export const api = createFetch({
  throw: true,
  credentials: 'include',
  baseURL: env.NEXT_PUBLIC_API_URL,
  onRequest: async (context) => {
    const session = await getServerSession(authOptions);

    if (!session) {
      redirect('/login');
    }

    context.headers.set('Authorization', `Bearer ${session.accessToken}`);

    return context;
  },
  onResponse: (context) => {
    if (context.response.status === 401) {
      redirect('/login');
    }

    if (context.response.status === 404) {
      notFound();
    }

    return context;
  },
});
