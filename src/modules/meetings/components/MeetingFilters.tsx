'use client';

import { Period } from '../enums';
import { useMeetingsQueryState } from '../hooks/useQueryState';

const PeriodLabel = {
  [Period.UPCOMING]: 'Upcoming',
  [Period.PAST]: 'Past',
} as const;

export function MeetingFilters() {
  const { setPeriod, period } = useMeetingsQueryState();
  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <fieldset className="flex items-center gap-2">
        <legend className="sr-only">Filter Meetings</legend>
        {Object.entries(PeriodLabel).map(([periodKey, label]) => (
          <div key={periodKey} className="flex">
            <input
              type="radio"
              id={periodKey}
              name="period"
              value={periodKey}
              defaultChecked={periodKey === period}
              className="peer sr-only"
              onChange={() =>
                setPeriod(
                  Object.values(Period).find((p) => p === periodKey) || null,
                )
              }
            />
            <label
              htmlFor={periodKey}
              className="text-copy-14 peer-checked:bg-accent cursor-pointer rounded border px-3 py-1 font-medium"
            >
              {label}
            </label>
          </div>
        ))}
      </fieldset>
      <div>Filter by event type</div>
    </div>
  );
}
