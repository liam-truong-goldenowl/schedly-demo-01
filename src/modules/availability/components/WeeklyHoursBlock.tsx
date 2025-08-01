'use client';

import { toast } from 'sonner';
import { RepeatIcon } from 'lucide-react';

import { WEEKDAYS } from '@/shared/constants/day';
import { Heading } from '@/shared/components/layout/Heading';
import { TimezoneSelect } from '@/shared/components/TimezoneSelect';
import { Description } from '@/shared/components/layout/Description';

import { useActiveSchedule } from '../hooks/useActiveSchedule';
import { useAvailability } from '../contexts/AvailabilityContext';
import { useScheduleMutations } from '../hooks/useScheduleMutations';

import { DayInterval } from './DayInterval';
import { DayIndicator } from './DayIndicator';
import { AddDayIntervalButton } from './AddDayIntervalButton';

export function WeeklyHoursBlock() {
  const { schedules } = useAvailability();
  const { activeScheduleId } = useActiveSchedule();
  const { updateTimezone } = useScheduleMutations();

  const defaultSchedule =
    schedules.find((schedule) => schedule.isDefault) ?? schedules[0];
  const activeSchedule =
    schedules.find((schedule) => schedule.id === activeScheduleId) ??
    defaultSchedule;

  async function handleTimezoneChange(timezone: string) {
    await updateTimezone({ scheduleId: activeSchedule.id, timezone });
    toast.success('Saved');
  }

  return (
    <section className="space-y-6">
      <header>
        <Heading level={'h3'} className="mb-0 inline-flex items-center gap-1.5">
          <RepeatIcon size={18} />
          Weekly Hours
        </Heading>
        <Description>
          Set when you are typically available for meetings
        </Description>
      </header>

      <ul className="space-y-6">
        {WEEKDAYS.map((day) => (
          <li key={day} className="flex items-start gap-4">
            <DayIndicator day={day} />
            <DayInterval day={day} weeklyHours={activeSchedule.weeklyHours} />
            <AddDayIntervalButton day={day} />
          </li>
        ))}
      </ul>

      <TimezoneSelect
        key={activeScheduleId}
        defaultTz={activeSchedule.timezone}
        onChange={handleTimezoneChange}
      />
    </section>
  );
}
