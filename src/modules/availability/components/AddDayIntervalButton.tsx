'use client';

import { CirclePlusIcon } from 'lucide-react';

import { Weekday } from '@/shared/enums';
import { toTitleCase } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { findAvailableSlots } from '@/shared/lib/time';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';

import { useActiveSchedule } from '../hooks/useActiveSchedule';
import { useScheduleMutations } from '../hooks/useScheduleMutations';

interface AddDayIntervalButtonProps {
  day: Weekday;
}

export function AddDayIntervalButton({ day }: AddDayIntervalButtonProps) {
  const { activeScheduleId, activeSchedule } = useActiveSchedule();
  const { createWeeklyHour } = useScheduleMutations();

  const currentWeeklyHours = activeSchedule.weeklyHours
    .filter((wh) => wh.weekday === day)
    .map((wh) => ({
      startTime: wh.startTime,
      endTime: wh.endTime,
    }));

  const availableIntervals = findAvailableSlots(currentWeeklyHours);

  const { startTime, endTime } = availableIntervals[0] ?? {
    startTime: '09:00',
    endTime: '17:00',
  };

  const defaultStartTime = currentWeeklyHours.length ? startTime : '09:00';
  const defaultEndTime = currentWeeklyHours.length ? endTime : '17:00';

  async function handleAdd() {
    await createWeeklyHour({
      scheduleId: activeScheduleId,
      body: {
        weekday: day,
        startTime: defaultStartTime,
        endTime: defaultEndTime,
      },
    });
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="size-9"
          onClick={handleAdd}
          disabled={availableIntervals.length == 0}
        >
          <CirclePlusIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>New interval for {toTitleCase(day)}</span>
      </TooltipContent>
    </Tooltip>
  );
}
