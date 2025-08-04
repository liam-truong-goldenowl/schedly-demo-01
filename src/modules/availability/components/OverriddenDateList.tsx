import { TimeIntervalInput } from '@/shared/components/TimeIntervalInput';

import { DateOverride } from '../schemas';

interface OverriddenDateListProps {
  overriddenDates: DateOverride[];
}

export function OverriddenDateList({
  overriddenDates,
}: OverriddenDateListProps) {
  const sorted = overriddenDates.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
  const groupedByDate = Object.groupBy(sorted, (override) =>
    new Date(override.date).toDateString(),
  );

  return (
    <ul className="space-y-4">
      {Object.entries(groupedByDate).map(([date, overrides]) => (
        <li
          key={date}
          className="bg-muted/50 flex items-start gap-1.5 rounded p-4"
        >
          <span className="w-[16ch] py-0.5">{date}</span>
          <ul className="space-y-2">
            {overrides?.map((override) => (
              <li key={override.id}>
                {!override.endTime && !override.startTime ? (
                  <span>Unavailable</span>
                ) : (
                  <TimeIntervalInput
                    defaultEndTime={override.endTime || undefined}
                    defaultStartTime={override.startTime || undefined}
                  />
                )}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
