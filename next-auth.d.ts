export type { AuthOptions } from 'next-auth';

type TokenError = 'RefreshTokenExpired' | 'InvalidToken' | 'UnknownError';

declare module 'next-auth' {
  /**
   * The user information we expect to be able to extract
   * from our decoded backend tokens
   */
  export interface UserObject {
    id: number;
    email: string;
  }

  /**
   * The contents of our refresh call to the backend is
   * a new access token and a new refresh token.
   */
  export interface BackendJWT {
    accessToken: string;
    refreshToken: string;
  }

  /**
   * The decoded contents of a JWT token returned from the backend.
   * Both access and refresh tokens have the same structure. Including user information.
   * `id` is the user ID,
   * `email` is the user's email address,
   * `iat` is the time the token was issued,
   * `exp` is the time the token expires
   */
  export interface DecodedJWT extends UserObject {
    exp: number;
    iat: number;
  }

  /**
   * Information extracted from our decoded backend tokens so that we
   * don't need to decode them again.
   * `valid_until` is the time the access token becomes invalid
   * `refresh_until` is the time the refresh token becomes invalid
   */
  export interface AuthValidity {
    valid_until: number;
    refresh_until: number;
  }

  /**
   * The returned data from the authorize method
   * This is data we extract from our own backend JWT tokens.
   */
  export interface User {
    user: UserObject;
    tokens: BackendJWT;
    validity: AuthValidity;
  }

  /**
   * Returned by `useSession`, `getSession`, returned by the `session`
   * callback and also the shape received as a prop on the SessionProvider
   * React Context
   */
  export interface Session {
    user: UserObject;
    validity: AuthValidity;
    error: TokenError | null;
  }
}

declare module 'next-auth/jwt' {
  /**
   * Returned by the `jwt` callback and `getToken`, when using JWT sessions
   */
  export interface JWT {
    data: import('next-auth').User;
    error: TokenError | null;
  }
}
