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
      // Move the default schedule to the first position
      const sorted = data.toSorted(
        (a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0),
      );

      return sorted.map((schedule) => ({
        id: schedule.id,
        name: schedule.name,
        isDefault: schedule.isDefault,
      }));
    },
  });
}
