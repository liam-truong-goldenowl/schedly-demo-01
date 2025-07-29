import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
  server: {
    NEXTAUTH_SECRET: z.string().describe('The secret used for NextAuth.js.'),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.url().describe('The base URL for the API.'),
  },
  runtimeEnv: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});
