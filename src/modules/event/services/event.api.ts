import { clientApiWithAuth } from '@/shared/lib/client-api';
import { makeCursorPaginationSchema } from '@/shared/schemas';

import { EventSchema } from '../schemas';

export async function createEvent(body: {
  name: string;
  type: string;
  duration: number;
  scheduleId: number;
  locationType: string;
  inviteeLimit: number;
  description?: string;
  locationDetails: string;
}) {
  return clientApiWithAuth('@post/events', { body, throw: true });
}

export async function getEvents({ cursor }: { cursor: string | null }) {
  return clientApiWithAuth('@get/events', {
    throw: true,
    output: makeCursorPaginationSchema(EventSchema),
    query: { cursor },
  });
}
