import z from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  email: z.email(),
  name: z.string(),
  publicSlug: z.string(),
});
export type User = z.infer<typeof UserSchema>;
