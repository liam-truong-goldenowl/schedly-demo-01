'use client';

import { useQueryState, parseAsInteger } from 'nuqs';

export function useActiveSchedule() {
  const [activeScheduleId, setActiveScheduleId] = useQueryState(
    'scheduleId',
    parseAsInteger,
  );

  const checkActive = (scheduleId: number | null) =>
    scheduleId === activeScheduleId;

  return {
    checkActive,
    activeScheduleId,
    setActiveScheduleId,
  };
}
