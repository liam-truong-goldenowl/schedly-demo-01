import { queryOptions } from '@tanstack/react-query';

import { fetchAvailableMonthDates } from '../services/query';

export const availableMonthDatesQuery = ({
  monthString,
  timezone,
  eventId,
}: {
  monthString: string;
  timezone: string;
  eventId: number;
}) =>
  queryOptions({
    queryKey: ['available-month-dates', monthString, timezone, eventId],
    queryFn: async () =>
      fetchAvailableMonthDates({
        monthString,
        timezone,
        eventId,
      }),
  });
