'use client';

import { cn } from '@/shared/lib/utils';

import { Period } from '../enums';
import { useMeetingsQueryState } from '../hooks/useMeetingsQueryState';

import { FilterByDateRange } from './FilterByDateRange';

const PeriodLabel = {
  [Period.UPCOMING]: 'Upcoming',
  [Period.PAST]: 'Past',
} as const;

export function FilterByPeriod() {
  const { setPeriod, period } = useMeetingsQueryState();

  return (
    <div className="flex items-center gap-3">
      {Object.entries(PeriodLabel).map(([periodKey, label]) => (
        <button
          key={periodKey}
          className={cn(
            'text-copy-14 bg-background inline-flex h-9 cursor-pointer items-center rounded-md border px-4',
            period === periodKey && 'bg-accent',
          )}
          onClick={() => setPeriod(periodKey as Period)}
        >
          {label}
        </button>
      ))}
      <FilterByDateRange />
    </div>
  );
}
