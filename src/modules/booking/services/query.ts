import z from 'zod';

import { clientApi } from '@/shared/lib/client-api';

export function fetchEventDetails(eventSlug: string) {
  return clientApi(`/events/${eventSlug}`, {
    output: z.object({
      id: z.number(),
      name: z.string(),
      description: z.string().nullable(),
      duration: z.number(),
      host: z.object({
        name: z.string(),
      }),
      location: z.object({
        type: z.string(),
        details: z.string(),
      }),
      timezone: z.string(),
    }),
    throw: true,
  });
}

export function fetchTimeSlots(query: {
  month: string;
  eventId: number;
  timezone: string;
}) {
  return clientApi(`@get/bookings/time-slots`, {
    output: z.array(
      z.object({
        date: z.string(),
        slots: z.array(z.string()),
      }),
    ),
    query,
    throw: true,
  });
}
