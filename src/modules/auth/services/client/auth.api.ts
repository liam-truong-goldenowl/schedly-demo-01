import { clientApi } from '@/shared/lib/client-api';

export async function signUp(userData: {
  name: string;
  email: string;
  timezone: string;
  password: string;
}) {
  return clientApi('@post/auth/signup', { body: userData });
}
