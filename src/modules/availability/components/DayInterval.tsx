'use client';

import { useState } from 'react';

import { isBefore, isOverlapping } from '@/shared/lib/time';
import { TimeIntervalInput } from '@/shared/components/TimeIntervalInput';

import { WeeklyHour } from '../types';
import { useScheduleMutations } from '../hooks/useScheduleMutations';

interface DayIntervalProps {
  hour: WeeklyHour;
  scheduleId: number;
  hours: WeeklyHour[];
}

export function DayInterval({ hour, hours, scheduleId }: DayIntervalProps) {
  const {
    deleteWeeklyHour,
    isDeletingWeeklyHour,
    updateWeeklyHour,
    isUpdatingWeeklyHour,
  } = useScheduleMutations();

  const [startTime, setStartTime] = useState(hour.startTime);
  const [endTime, setEndTime] = useState(hour.endTime);

  let errorMsg = null;

  if (isBefore(endTime, startTime)) {
    errorMsg = 'Start time must be before end time';
  } else if (checkOverlapping()) {
    errorMsg = 'This interval is overlapped';
  }

  function checkOverlapping() {
    return hours.some(
      (h) => h.id != hour.id && isOverlapping(h, { startTime, endTime }),
    );
  }

  async function handleDelete() {
    if (isDeletingWeeklyHour) return;
    await deleteWeeklyHour({ scheduleId, weeklyHourId: hour.id });
  }

  async function handleSave() {
    if (isUpdatingWeeklyHour) return;
    await updateWeeklyHour({
      scheduleId,
      weeklyHourId: hour.id,
      body: { startTime, endTime },
    });
  }

  return (
    <div className="space-y-1">
      <TimeIntervalInput
        isInvalid={!!errorMsg}
        defaultEndTime={hour.endTime}
        defaultStartTime={hour.startTime}
        onSave={() => handleSave()}
        onRemove={() => handleDelete()}
        onEndTimeChange={setEndTime}
        onStartTimeChange={setStartTime}
      />
      {errorMsg && (
        <p
          aria-live="polite"
          role="alert"
          className="text-copy-13 text-destructive px-1"
        >
          {errorMsg}
        </p>
      )}
    </div>
  );
}
