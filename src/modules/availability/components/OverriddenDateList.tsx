'use client';

import { DateTime } from 'luxon';
import { XIcon, MinusIcon } from 'lucide-react';

import { formatTime } from '@/shared/lib/utils';
import { MapItem } from '@/shared/components/MapItem';
import { MapList } from '@/shared/components/MapList';
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
      <MapItem
        items={Object.entries(groupedByDate)}
        itemKey={({ item: [date] }) => date}
        render={({ item: [date, overrides = []], key }) => (
          <li
            key={key}
            className="bg-muted/50 flex items-center justify-between gap-4 rounded p-3"
          >
            <span className="w-[10ch]">{date}</span>
            <MapList
              items={overrides}
              itemKey={({ item }) => item.id}
              render={({ item: override }) => (
                <div>
                  {!override.endTime && !override.startTime ? (
                    <span>Unavailable</span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>{formatTime(override.startTime!)}</span>
                      <MinusIcon size={12} />
                      <span>{formatTime(override.endTime!)}</span>
                    </div>
                  )}
                </div>
              )}
            />
            <Button
              size={'icon'}
              variant={'ghost'}
              onClick={() => handleDelete(overrides.map((o) => o.id))}
            >
              <XIcon />
            </Button>
          </li>
        )}
      />
    </ul>
  );
}
