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

export function fetchAvailableMonthDates({
  monthString,
  eventId,
  timezone,
}: {
  monthString: string;
  eventId: number;
  timezone: string;
}) {
  return clientApi(`@get/bookings/available-month-dates`, {
    output: z.array(z.string()),
    query: {
      month: monthString,
      eventId,
      timezone,
    },
    throw: true,
  });
}

export function fetchAvailableStartTimes({
  dateString,
  eventId,
  timezone,
}: {
  dateString: string;
  eventId: number;
  timezone: string;
}) {
  return clientApi(`@get/bookings/available-start-times`, {
    output: z.array(z.string()),
    query: {
      date: dateString,
      eventId,
      timezone,
    },
    throw: true,
  });
}
