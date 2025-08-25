import 'server-only';
import { getServerSession } from 'next-auth';
import { createFetch } from '@better-fetch/fetch';
import { notFound, redirect } from 'next/navigation';

import { env } from '../lib/env';
import { nextAuthOptions } from '../lib/next-auth';

export const api = createFetch({
  throw: true,
  credentials: 'include',
  baseURL: env.NEXT_PUBLIC_API_URL,
  onRequest: async (context) => {
    const session = await getServerSession(nextAuthOptions);

    if (session) {
      context.headers.set('Authorization', `Bearer ${session.accessToken}`);
    }

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
