import { Weekday } from '@/shared/schemas';

import { WeeklyHour } from '../schemas';
import { useActiveSchedule } from '../hooks/useActiveSchedule';

import { DayInterval } from './DayInterval';

interface DayIntervalProps {
  day: Weekday;
  weeklyHours: WeeklyHour[];
}

export function DayIntervalList({ day, weeklyHours }: DayIntervalProps) {
  const { activeScheduleId: scheduleId } = useActiveSchedule();

  const dayHours = weeklyHours
    .filter((wh) => wh.weekday === day)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  if (dayHours.length == 0) {
    return (
      <div className="text-copy-14 flex items-center self-stretch text-gray-600">
        Unavailable
      </div>
    );
  }

  return (
    <ul className="space-y-2.5">
      {dayHours.map((hour) => (
        <li key={hour.id}>
          <DayInterval hour={hour} hours={dayHours} scheduleId={scheduleId} />
        </li>
      ))}
    </ul>
  );
}
