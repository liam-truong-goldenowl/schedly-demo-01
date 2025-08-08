import { api } from '@/shared/server/api';

import { UserSchema } from '../schema/user';

export async function fetchUser() {
  return api('@get/auth/me', { output: UserSchema, throw: true });
}
