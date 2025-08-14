import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { createFetch } from '@better-fetch/fetch';

import { authOptions } from '../server/auth';

import { env } from './env';

export const serverApi = createFetch({
  baseURL: env.NEXT_PUBLIC_API_URL,
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
