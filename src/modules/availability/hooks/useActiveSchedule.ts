'use client';

import { useQueryState, parseAsInteger } from 'nuqs';

import { useAvailability } from '../contexts/AvailabilityContext';

export function useActiveSchedule() {
  const [activeScheduleId, setActiveScheduleId] = useQueryState(
    'scheduleId',
    parseAsInteger,
  );
  const { schedules } = useAvailability();

  const defaultSchedule = schedules.find((s) => s.isDefault) || schedules[0];

  const checkActive = (scheduleId: number | null) =>
    scheduleId === activeScheduleId;

  return {
    checkActive,
    activeScheduleId: activeScheduleId ?? defaultSchedule.id,
    setActiveScheduleId,
  };
}
