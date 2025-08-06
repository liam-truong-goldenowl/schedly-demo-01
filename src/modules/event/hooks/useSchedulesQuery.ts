import { useQuery } from '@tanstack/react-query';

import { getSchedules } from '@/modules/availability/services/client/availability.api';

export function useSchedulesQuery() {
  return useQuery({
    queryFn: getSchedules,
    queryKey: ['schedules'],
    select: (schedules) => {
      const DO_NOT_MOVE = 0;
      const MOVE_TO_FIRST = 1;

      const defaultFirstSchedules = schedules.toSorted(
        (a, b) =>
          (b.isDefault ? MOVE_TO_FIRST : DO_NOT_MOVE) -
          (a.isDefault ? MOVE_TO_FIRST : DO_NOT_MOVE),
      );

      return defaultFirstSchedules.map((schedule) => ({
        id: schedule.id,
        name: schedule.name,
        isDefault: schedule.isDefault,
      }));
    },
  });
}
