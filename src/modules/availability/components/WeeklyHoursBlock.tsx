'use client';

import { RepeatIcon } from 'lucide-react';

import { WEEKDAYS } from '@/shared/constants/day';
import { MapItem } from '@/shared/components/MapItem';
import { Heading } from '@/shared/components/layout/Heading';
import { DayIndicator } from '@/shared/components/DayIndicator';
import { TimezoneSelect } from '@/shared/components/TimezoneSelect';
import { Description } from '@/shared/components/layout/Description';

import { useActiveSchedule } from '../hooks/useActiveSchedule';
import { useAvailability } from '../contexts/AvailabilityContext';
import { useScheduleMutations } from '../hooks/useScheduleMutations';

import { DayIntervalList } from './DayIntervalList';
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
  }

  return (
    <section className="space-y-6">
      <header>
        <Heading level={'h3'} className="mb-0 inline-flex items-center gap-1.5">
          <RepeatIcon size={18} />
          Weekly Hours
        </Heading>
        <Description className="text-copy-14 md:text-copy-16">
          Set when you are typically available for meetings
        </Description>
      </header>
      <ul className="space-y-6">
        <MapItem
          items={WEEKDAYS}
          itemKey={({ item }) => item}
          render={({ item, key }) => (
            <li
              key={key}
              className="flex flex-col items-start gap-1 md:flex-row md:gap-4"
            >
              <DayIndicator day={item} />
              <div className="flex items-start gap-1 md:gap-4">
                <DayIntervalList
                  day={item}
                  weeklyHours={activeSchedule.weeklyHours}
                />
                <AddDayIntervalButton day={item} />
              </div>
            </li>
          )}
        />
      </ul>
      <TimezoneSelect
        key={activeScheduleId}
        defaultTz={activeSchedule.timezone}
        onChange={handleTimezoneChange}
      />
    </section>
  );
}
