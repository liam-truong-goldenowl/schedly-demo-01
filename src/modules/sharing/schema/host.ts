import z from 'zod';

export const HostSchema = z.object({
  id: z.number(),
  name: z.string(),
});
export type Host = z.infer<typeof HostSchema>;
