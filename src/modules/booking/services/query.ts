import z from 'zod';

import { publicApi } from '@/shared/lib/api';

export function fetchEventDetails(eventSlug: string) {
  return publicApi(`/events/${eventSlug}`, {
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
  return publicApi(`@get/bookings/time-slots`, {
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
