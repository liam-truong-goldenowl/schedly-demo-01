import { api } from '@/shared/lib/api';

import { EventLimitReachedException } from '../exceptions/event-limit-reached';

export async function createBooking(body: {
  eventId: number;
  invitees: { name: string; email: string }[];
  startDate: string;
  startTime: string;
  timezone: string;
  note?: string;
}) {
  const { data, error } = await api('@post/bookings', { body });

  if (error) {
    throw new EventLimitReachedException();
  }

  return data;
}
