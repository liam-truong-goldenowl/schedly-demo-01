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

async function refreshTokens(nextAuthJWTCookie: JWT): Promise<JWT> {
  const { data, error } = await refresh(
    nextAuthJWTCookie.data.tokens.refreshToken,
  );

  if (error) {
    throw new Error('Failed to refresh tokens');
  }

  nextAuthJWTCookie.data.tokens.accessToken = data.accessToken;
  nextAuthJWTCookie.data.tokens.refreshToken = data.refreshToken;

  return nextAuthJWTCookie;
}

export const authOptions: AuthOptions = {
  secret: env.NEXTAUTH_SECRET,

  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { data: tokens, error } = await login(credentials);

        // TODO: Handle error properly
        if (error) {
          throw new Error('WrongCredentials');
        }

        const accessTokenPayload = jwtDecode<DecodedJWT>(tokens!.accessToken);

        return {
          tokens,
          id: crypto.randomUUID(),
          user: {
            id: accessTokenPayload.id,
            email: accessTokenPayload.email,
          },
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }): Promise<JWT> {
      const isInitialSignIn = user && account;

      if (isInitialSignIn) {
        return { ...token, data: user, error: null };
      }

      const accessTokenPayload = jwtDecode<DecodedJWT>(
        token.data.tokens.accessToken,
      );
      const accessTokenStillValid = Date.now() < accessTokenPayload.exp * 1_000;

      if (accessTokenStillValid) {
        return token;
      }

      return refreshTokens(token);
    },

    async session({ session, token }) {
      session.user = token.data.user;
      session.accessToken = token.data.tokens.accessToken;
      return session;
    },
  },
};
