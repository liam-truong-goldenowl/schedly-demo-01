import { queryOptions } from '@tanstack/react-query';

import { fetchEventDetails } from '../services/query';

export const eventDetailsQuery = (eventSlug: string) =>
  queryOptions({
    queryKey: ['events', eventSlug],
    queryFn: async () => fetchEventDetails(eventSlug),
  });
