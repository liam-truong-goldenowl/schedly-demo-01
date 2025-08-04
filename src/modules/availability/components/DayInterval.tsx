'use client';

import { XIcon, MinusIcon } from 'lucide-react';

import { Weekday } from '@/shared/schemas';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';

import { WeeklyHour } from '../schemas';
import { useActiveSchedule } from '../hooks/useActiveSchedule';
import { useScheduleMutations } from '../hooks/useScheduleMutations';

interface DayIntervalProps {
  day: Weekday;
  weeklyHours: WeeklyHour[];
}

export function DayInterval({ day, weeklyHours }: DayIntervalProps) {
  const { activeScheduleId: scheduleId } = useActiveSchedule();
  const { deleteWeeklyHour, isDeletingWeeklyHour } = useScheduleMutations();

  const dayHours = weeklyHours
    .filter((wh) => wh.weekday === day)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  function handleDelete(weeklyHourId: number) {
    if (isDeletingWeeklyHour) return;
    deleteWeeklyHour({ scheduleId, weeklyHourId });
  }

  if (dayHours.length == 0) {
    return (
      <div className="text-copy-14 flex items-center self-stretch text-gray-600">
        Unavailable
      </div>
    );
  }

  return (
    <ul className="space-y-2.5">
      {dayHours.map((h) => (
        <li key={h.id} className="flex items-center gap-1.5">
          <div className="flex items-center gap-1.5">
            <Input type="time" defaultValue={h.startTime} className="pe-0" />
            <MinusIcon />
            <Input type="time" defaultValue={h.endTime} className="pe-0" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={() => handleDelete(h.id)}
            disabled={isDeletingWeeklyHour}
          >
            <XIcon />
          </Button>
        </li>
      ))}
    </ul>
  );
}
