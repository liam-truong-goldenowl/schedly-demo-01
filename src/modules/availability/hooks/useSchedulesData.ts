import { useQuery } from '@tanstack/react-query';

import { Schedule } from '../schemas';
import { getSchedules } from '../services/client/availability.api';

export function useSchedulesData(initialData: Schedule[]) {
  return useQuery({
    initialData,
    queryFn: async () => {
      const { data, error } = await getSchedules();

      if (error) {
        throw new Error(`Failed to fetch schedules`);
      }

      return data;
    },
    queryKey: ['schedules'],
  });
}
