import { clientApiWithAuth } from '@/shared/lib/client-api';

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
