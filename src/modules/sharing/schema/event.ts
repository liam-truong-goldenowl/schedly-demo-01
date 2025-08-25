import z from 'zod';

export const EventSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  description: z.string().nullable(),
});

export const EventListSchema = z.array(EventSchema);
export type EventList = z.infer<typeof EventListSchema>;
