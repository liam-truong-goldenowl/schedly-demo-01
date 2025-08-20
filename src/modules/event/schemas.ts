import z from 'zod';

export const EventSchema = z.object({
  id: z.number(),
  name: z.string(),
  duration: z.number(),
  inviteeLimit: z.number(),
  description: z.string().optional(),
  slug: z.string(),
  schedule: z.object({
    id: z.number(),
    name: z.string(),
  }),
});

export type Event = z.infer<typeof EventSchema>;
