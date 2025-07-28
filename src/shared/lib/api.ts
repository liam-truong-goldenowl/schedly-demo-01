import { createFetch } from '@better-fetch/fetch';

import { env } from './env';

export const api = createFetch({
  baseURL: env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
});
