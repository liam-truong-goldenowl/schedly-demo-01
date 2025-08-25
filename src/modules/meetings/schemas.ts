import z from 'zod';

import { IdSchema, DateStringSchema, TimeStringSchema } from '@/shared/schemas';

export const EventSchema = z.object({
  id: IdSchema,
  name: z.string(),
  description: z.string().optional(),
  inviteeLimit: z.number(),
  duration: z.number(),
});

export const InviteeSchema = z.object({
  name: z.string(),
  email: z.string(),
  timezone: z.string(),
});

export const MeetingSchema = z.object({
  id: IdSchema,
  startDate: DateStringSchema,
  startTime: TimeStringSchema,
  event: EventSchema,
  invitees: z.array(InviteeSchema),
});

export const EventSelectSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
});

export const EventSelectListSchema = z.array(EventSelectSchema);
