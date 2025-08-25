import z from 'zod';

import { api } from '@/shared/lib/api';

export function fetchEventDetails(eventSlug: string) {
  return api(`/events/${eventSlug}`, {
    output: z.object({
      id: z.number(),
      name: z.string(),
      description: z.string().nullable(),
      duration: z.number(),
      host: z.object({
        name: z.string(),
      }),
      timezone: z.string(),
      inviteeLimit: z.number(),
    }),
    throw: true,
  });
}

export function fetchTimeSlots(query: { month: string; eventId: number }) {
  return api(`@get/bookings/time-slots`, {
    output: z.array(
      z.object({
        date: z.string(),
        slots: z.array(
          z.object({
            slot: z.string(),
            remaining: z.number(),
          }),
        ),
      }),
    ),
    query,
    throw: true,
  });
}
