'use client';

import { Period } from '../enums';
import { useMeetingsQueryState } from '../hooks/useMeetingsQueryState';

const PeriodLabel = {
  [Period.UPCOMING]: 'Upcoming',
  [Period.PAST]: 'Past',
} as const;

export function FilterByPeriod() {
  const { setPeriod, period } = useMeetingsQueryState();

  return (
    <fieldset className="flex items-center gap-3">
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
            className="text-copy-14 md:text-copy-16 cursor-pointer rounded border bg-gray-100 px-4 py-1 peer-checked:bg-gray-200"
          >
            {label}
          </label>
        </div>
      ))}
    </fieldset>
  );
}
