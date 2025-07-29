import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
  server: {
    NEXT_AUTH_SECRET: z.string().describe('The secret used for NextAuth.js.'),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.url().describe('The base URL for the API.'),
  },
  runtimeEnv: {
    NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});
