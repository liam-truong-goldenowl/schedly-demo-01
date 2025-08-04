'use client';

import { CirclePlusIcon } from 'lucide-react';

import { Weekday } from '@/shared/schemas';
import { toTitleCase } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button';
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
  const { activeScheduleId } = useActiveSchedule();
  const { createWeeklyHour } = useScheduleMutations();

  async function handleAdd() {
    console.debug('Adding new interval for', day);
    await createWeeklyHour({
      scheduleId: activeScheduleId,
      body: { weekday: day, startTime: '09:00', endTime: '17:00' },
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
