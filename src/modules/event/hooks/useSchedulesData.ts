import { useQuery } from '@tanstack/react-query';

import { getSchedules } from '@/modules/availability/services/client/availability.api';

export function useSchedulesData() {
  return useQuery({
    queryKey: ['schedules'],
    queryFn: getSchedules,
    select: ({ data, error }) => {
      if (error) {
        return [];
      }

      return data.map((schedule) => ({
        id: schedule.id,
        name: schedule.name,
      }));
    },
  });
}
