import { clientApi } from '@/shared/lib/client-api';

import { EventLimitReachedException } from '../exceptions/event-limit-reached';

export async function createBooking(body: {
  eventId: number;
  name: string;
  email: string;
  guestEmails: string[];
  startDate: string;
  startTime: string;
  timezone: string;
  note?: string;
}) {
  const { data, error } = await clientApi('@post/bookings', {
    body,
  });

  if (error) {
    throw new EventLimitReachedException();
  }

  return data;
}
