import z from 'zod';

export const EventSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.string(),
  duration: z.number(),
  scheduleId: z.number(),
  locationType: z.string(),
  inviteeLimit: z.number(),
  description: z.string().optional(),
  locationDetails: z.string(),
});

export type Event = z.infer<typeof EventSchema>;
