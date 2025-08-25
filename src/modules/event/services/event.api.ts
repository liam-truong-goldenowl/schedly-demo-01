import { api } from '@/shared/lib/api';
import { makeCursorPaginationSchema } from '@/shared/schemas';

import { EventSchema } from '../schemas';

export async function createEvent(body: {
  name: string;
  duration: number;
  scheduleId: number;
  inviteeLimit: number;
  description?: string;
}) {
  return api('@post/events', { body, throw: true });
}

export async function getEvents({
  cursor,
  search,
}: {
  cursor: string | null;
  search: string | null;
}) {
  return api('@get/events', {
    throw: true,
    output: makeCursorPaginationSchema(EventSchema),
    query: { cursor, search },
  });
}

export async function deleteEvent(eventId: number) {
  return api(`@delete/events/${eventId}`, { throw: true });
}
