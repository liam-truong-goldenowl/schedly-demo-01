import { jwtDecode } from 'jwt-decode';
import CredentialsProvider from 'next-auth/providers/credentials';
import {
  type UserObject,
  type AuthOptions,
  getServerSession,
  type AuthValidity,
} from 'next-auth';

import type { JWT } from 'next-auth/jwt';

import { env } from '@/shared/lib/env';
import { login, refresh } from '@/modules/auth/services/auth.api';

type DecodedJWT = UserObject & {
  exp: number;
  iat: number;
};

async function refreshTokens(nextAuthJWTCookie: JWT): Promise<JWT> {
  const { data, error } = await refresh();

  if (error) {
    return { ...nextAuthJWTCookie, error: 'RefreshTokenExpired' };
  }

  const accessTokenPayload = jwtDecode<DecodedJWT>(data.accessToken);
  const refreshTokenPayload = jwtDecode<DecodedJWT>(data.refreshToken);

  nextAuthJWTCookie.data.tokens.accessToken = data.accessToken;
  nextAuthJWTCookie.data.tokens.refreshToken = data.refreshToken;
  nextAuthJWTCookie.data.validity.valid_until = accessTokenPayload.exp;
  nextAuthJWTCookie.data.validity.refresh_until = refreshTokenPayload.exp;

  return { ...nextAuthJWTCookie, error: null };
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

        if (error) {
          throw new Error('WrongCredentials');
        }

        const accessTokenPayload = jwtDecode<DecodedJWT>(tokens.accessToken);
        const refreshTokenPayload = jwtDecode<DecodedJWT>(tokens.refreshToken);

        const id = crypto.randomUUID();
        const user: UserObject = {
          id: accessTokenPayload.id,
          email: accessTokenPayload.email,
        };
        const validity: AuthValidity = {
          valid_until: accessTokenPayload.exp * 1_000,
          refresh_until: refreshTokenPayload.exp * 1_000,
        };

        return { id, user, tokens, validity };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }): Promise<JWT> {
      const isInitialSignIn = user && account;

      if (isInitialSignIn) {
        return { ...token, data: user, error: null };
      }

      const accessTokenStillValid =
        Date.now() < token.data.validity.valid_until;

      if (accessTokenStillValid) {
        return token;
      }

      const refreshedTokens = await refreshTokens(token);
      return refreshedTokens;
    },
    async session({ session, token }) {
      session.user = token.data.user;
      session.error = token.error || null;
      session.validity = token.data.validity;
      return session;
    },
  },
};

export const getSession = async () => getServerSession(authOptions);
