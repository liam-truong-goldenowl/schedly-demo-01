import { api } from '@/shared/server/api';

import { HostSchema } from '../schema/host';
import { EventListSchema } from '../schema/event';

export async function fetchHost(slug: string) {
  return api('@get/sharing/:slug/host', {
    params: { slug },
    output: HostSchema,
  });
}

export async function fetchEvents(slug: string) {
  return api('@get/sharing/:slug/events', {
    params: { slug },
    output: EventListSchema,
  });
}
