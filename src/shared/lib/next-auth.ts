import { jwtDecode } from 'jwt-decode';
import CredentialsProvider from 'next-auth/providers/credentials';

import type { JWT } from 'next-auth/jwt';
import type { UserObject, AuthOptions } from 'next-auth';

import { env } from '@/shared/lib/env';
import { login, refresh } from '@/modules/auth/services/server/auth.api';

type DecodedJWT = UserObject & {
  exp: number;
  iat: number;
};

export const nextAuthOptions: AuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    error: '/login',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const tokens = await login(credentials);

        const { id, email } = jwtDecode<DecodedJWT>(tokens.accessToken);

        return { tokens, id: crypto.randomUUID(), user: { id, email } };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }): Promise<JWT> {
      const isInitialSignIn = user && account;

      if (isInitialSignIn) {
        return { ...token, data: user };
      }

      const { accessToken, refreshToken } = token.data.tokens;
      const { exp } = jwtDecode<DecodedJWT>(accessToken);
      const accessTokenExpired = Date.now() > exp * 1_000;

      if (accessTokenExpired) {
        const tokens = await refresh(refreshToken);
        token.data.tokens = tokens;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token.data.user;
      session.accessToken = token.data.tokens.accessToken;
      return session;
    },
  },
};
