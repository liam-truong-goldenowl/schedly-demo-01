import { queryOptions } from '@tanstack/react-query';

import { fetchAvailableStartTimes } from '../services/query';

export const availableStartTimesQuery = ({
  dateString,
  timezone,
  eventId,
}: {
  dateString: string | null;
  timezone: string;
  eventId: number;
}) =>
  queryOptions({
    queryKey: ['available-start-times', dateString, timezone, eventId],
    queryFn: async () =>
      dateString
        ? fetchAvailableStartTimes({
            dateString,
            timezone,
            eventId,
          })
        : [],
  });
