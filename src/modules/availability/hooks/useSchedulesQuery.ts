import { useQuery } from '@tanstack/react-query';

import { Schedule } from '../types';
import { getSchedules } from '../services/client/availability.api';

export function useSchedulesQuery(initialData: Schedule[]) {
  return useQuery({
    initialData,
    queryFn: getSchedules,
    queryKey: ['schedules'],
  });
}
