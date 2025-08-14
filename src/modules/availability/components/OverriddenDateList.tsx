'use client';

import { DateTime } from 'luxon';
import { XIcon, MinusIcon } from 'lucide-react';

import { formatTime } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button';

import { DateOverride } from '../schemas';
import { useActiveSchedule } from '../hooks/useActiveSchedule';
import { useScheduleMutations } from '../hooks/useScheduleMutations';

interface OverriddenDateListProps {
  overriddenDates: DateOverride[];
}

export function OverriddenDateList({
  overriddenDates,
}: OverriddenDateListProps) {
  const { activeScheduleId } = useActiveSchedule();
  const { deleteDateOverride, isDeletingDateOverride } = useScheduleMutations();

  const sorted = overriddenDates.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
  const groupedByDate = Object.groupBy(sorted, (override) =>
    DateTime.fromJSDate(new Date(override.date)).toFormat('yyyy-MM-dd'),
  );

  async function handleDelete(overrideIds: number[]) {
    if (isDeletingDateOverride) return;
    await Promise.all(
      overrideIds.map((overrideId) =>
        deleteDateOverride({
          scheduleId: activeScheduleId,
          dateOverrideId: overrideId,
        }),
      ),
    );
  }

  return (
    <ul className="space-y-4">
      {Object.entries(groupedByDate).map(([date, overrides]) => (
        <li
          key={date}
          className="bg-muted/50 flex items-start gap-4 rounded p-3"
        >
          <span className="w-[16ch]">{date}</span>
          <ul className="grow space-y-2">
            {overrides?.map((override) => (
              <li key={override.id} className="">
                {!override.endTime && !override.startTime ? (
                  <span className="py-0.5">Unavailable</span>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>{formatTime(override.startTime!)}</span>
                    <MinusIcon size={12} />
                    <span>{formatTime(override.endTime!)}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <Button
            className="ms-auto"
            size={'icon'}
            variant={'ghost'}
            onClick={() => handleDelete(overrides!.map((o) => o.id))}
          >
            <XIcon />
          </Button>
        </li>
      ))}
    </ul>
  );
}
