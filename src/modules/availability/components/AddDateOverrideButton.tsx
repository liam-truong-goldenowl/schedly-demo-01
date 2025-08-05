'use client';

import { DateTime } from 'luxon';
import { PlusIcon } from 'lucide-react';
import { useRef, useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import { Calendar } from '@/shared/components/ui/calendar';
import { Heading } from '@/shared/components/layout/Heading';
import { StatefulButton } from '@/shared/components/ui/stateful-button';
import { TimeIntervalInput } from '@/shared/components/TimeIntervalInput';
import { isBefore, isOverlapping, findAvailableSlots } from '@/shared/lib/time';
import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from '@/shared/components/ui/dialog';

import { useActiveSchedule } from '../hooks/useActiveSchedule';
import { useScheduleMutations } from '../hooks/useScheduleMutations';

export function AddDateOverrideButton() {
  const { activeScheduleId } = useActiveSchedule();
  const { createDateOverride, isCreatingDateOverride } = useScheduleMutations();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [date, setDate] = useState<Date[] | undefined>(undefined);
  const [intervals, setIntervals] = useState<
    Map<string, { startTime: string; endTime: string }>
  >(new Map());
  const intervalsArray = Array.from(intervals.values());

  const availableIntervals = findAvailableSlots(
    intervalsArray.map((i) => ({
      startTime: `${i.startTime}:00`,
      endTime: `${i.endTime}:00`,
    })),
  );
  const isOverlapped = checkOverlapping();
  const isEndtimeBeforeStarttime = checkEndtimeBeforeStarttime();
  const isAddDisabled =
    isOverlapped || isEndtimeBeforeStarttime || availableIntervals.length == 0;
  const isApplyDisabled =
    date === undefined ||
    date.length === 0 ||
    isAddDisabled ||
    isCreatingDateOverride;

  function checkEndtimeBeforeStarttime() {
    return intervalsArray.some((interval) =>
      isBefore(interval.endTime, interval.startTime),
    );
  }

  function checkOverlapping() {
    if (intervals.size === 0) return false;

    const intervalsArray = Array.from(intervals.values());
    for (let i = 0; i < intervalsArray.length; i++) {
      for (let j = i + 1; j < intervalsArray.length; j++) {
        if (isOverlapping(intervalsArray[i], intervalsArray[j])) {
          return true;
        }
      }
    }
    return false;
  }

  function handleCancel() {
    setDate(undefined);
    setIntervals(new Map());
  }

  async function handleApply() {
    if (!date) {
      return;
    }

    await createDateOverride({
      scheduleId: activeScheduleId,
      body: {
        intervals: intervalsArray,
        dates: date.map((d) => DateTime.fromJSDate(d).toFormat('yyyy-MM-dd')),
      },
    });

    setDate(undefined);
    setIntervals(new Map());
    closeButtonRef.current?.click();
  }

  function handleAddInterval() {
    const newInterval =
      availableIntervals.length > 0 && intervals.size > 0
        ? availableIntervals[0]
        : { startTime: '09:00', endTime: '17:00' };
    setIntervals((prev) => new Map(prev).set(crypto.randomUUID(), newInterval));
  }

  function handleRemoveInterval(id: string) {
    setIntervals((prev) => {
      const newIntervals = new Map(prev);
      newIntervals.delete(id);
      return newIntervals;
    });
  }

  function handleStartChange({
    id,
    startTime,
  }: {
    startTime: string;
    id: string;
  }) {
    setIntervals((prev) => {
      const newIntervals = new Map(prev);
      const targetInterval = newIntervals.get(id);

      if (!targetInterval) return newIntervals;

      newIntervals.set(id, { startTime, endTime: targetInterval.endTime });

      return newIntervals;
    });
  }

  function handleEndChange({ id, endTime }: { endTime: string; id: string }) {
    setIntervals((prev) => {
      const newIntervals = new Map(prev);
      const targetInterval = newIntervals.get(id);

      if (!targetInterval) return newIntervals;

      newIntervals.set(id, { startTime: targetInterval.startTime, endTime });

      return newIntervals;
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          aria-label="Add date override"
          className="rounded-full"
        >
          <PlusIcon size={16} />
          Hour
        </Button>
      </DialogTrigger>
      <DialogContent className="w-110 px-0">
        <DialogHeader className="px-4">
          <DialogTitle>Add Date Override</DialogTitle>
          <DialogDescription>
            Select the date(s) you want to assign specific hours
          </DialogDescription>
        </DialogHeader>
        <Calendar
          mode="multiple"
          selected={date}
          onSelect={setDate}
          className="mx-auto rounded-md border p-2"
          disabled={{ before: new Date() }}
        />

        {date && date.length > 0 ? (
          <section className="bg-muted/50 border-y px-4 py-3">
            <Heading level={'h3'} className="mb-2">
              What hours are you available?
            </Heading>
            <div className="flex items-start justify-between">
              {intervals.size > 0 ? (
                <ul className="text-copy-14 space-y-2">
                  {Array.from(intervals.entries()).map(([id, interval]) => (
                    <li key={id} className="space-y-1">
                      <TimeIntervalInput
                        isDirtyDisabled={true}
                        defaultEndTime={interval.endTime}
                        defaultStartTime={interval.startTime}
                        onRemove={() => handleRemoveInterval(id)}
                        onStartTimeChange={(startTime) =>
                          handleStartChange({ id, startTime })
                        }
                        onEndTimeChange={(endTime) =>
                          handleEndChange({ id, endTime })
                        }
                        isInvalid={
                          isBefore(interval.endTime, interval.startTime) ||
                          isOverlapped
                        }
                      />
                      {isBefore(interval.endTime, interval.startTime) && (
                        <p className="text-destructive text-copy-13 px-1">
                          Start time must be before end time
                        </p>
                      )}
                    </li>
                  ))}
                  {isOverlapped && (
                    <p className="text-destructive text-copy-13 px-1">
                      Some intervals overlap. Please adjust them.
                    </p>
                  )}
                </ul>
              ) : (
                <span className="text-copy-14 text-gray-600">Unavailable</span>
              )}
              <Button
                variant={'ghost'}
                size={'icon'}
                onClick={handleAddInterval}
                aria-label="Add new time interval"
                disabled={isAddDisabled}
              >
                <PlusIcon size={16} />
              </Button>
            </div>
          </section>
        ) : null}

        <DialogFooter className="mb-0 grid grid-cols-2 gap-4 px-4">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              ref={closeButtonRef}
            >
              Cancel
            </Button>
          </DialogClose>
          <StatefulButton
            loading={isCreatingDateOverride}
            type="button"
            variant="default"
            onClick={handleApply}
            disabled={isApplyDisabled}
          >
            Apply
          </StatefulButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
