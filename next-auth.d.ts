export type { AuthOptions } from 'next-auth';

type TokenError = 'RefreshTokenExpired' | 'InvalidToken' | 'UnknownError';

declare module 'next-auth' {
  export interface UserObject {
    id: number;
    email: string;
  }

  export interface AuthValidity {
    valid_until: number;
    refresh_until: number;
  }

  export interface User {
    user: UserObject;
    tokens: BackendJWT;
    validity: AuthValidity;
  }

  export interface Session {
    user: UserObject;
    validity: AuthValidity;
    error: TokenError | null;
  }
}

declare module 'next-auth/jwt' {
  export interface JWT {
    data: import('next-auth').User;
    error: TokenError | null;
  }
}
