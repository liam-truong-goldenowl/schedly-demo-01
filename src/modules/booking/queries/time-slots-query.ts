import { queryOptions } from '@tanstack/react-query';

import { fetchTimeSlots } from '../services/query';

export const timeSlotsQuery = ({
  month,
  eventId,
}: {
  month: string;
  eventId: number;
}) =>
  queryOptions({
    queryKey: ['time-slots', month, eventId],
    queryFn: async () => fetchTimeSlots({ month, eventId }),
  });
