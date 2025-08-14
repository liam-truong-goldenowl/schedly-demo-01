export type { AuthOptions } from 'next-auth';

declare module 'next-auth' {
  export interface BackendJWT {
    accessToken: string;
    refreshToken: string;
  }

  export interface UserObject {
    id: number;
    email: string;
  }

  export interface User {
    user: UserObject;
    tokens: BackendJWT;
  }

  export interface Session {
    user: UserObject;
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  export interface JWT {
    data: import('next-auth').User;
  }
}
