import z from 'zod';

export const MeetingSchema = z.object({
  id: z.number(),
  startDate: z.string(),
  startTime: z.string(),
  event: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().optional(),
    inviteeLimit: z.number(),
    duration: z.number(),
  }),
  invitees: z.array(
    z.object({
      name: z.string(),
      email: z.string(),
      timezone: z.string(),
    }),
  ),
});
