import { queryOptions } from '@tanstack/react-query';

import { fetchTimeSlots } from '../services/query';

export const timeSlotsQuery = ({
  month,
  timezone,
  eventId,
}: {
  month: string;
  timezone: string;
  eventId: number;
}) =>
  queryOptions({
    queryKey: ['time-slots', month, timezone, eventId],
    queryFn: async () => fetchTimeSlots({ month, timezone, eventId }),
  });
