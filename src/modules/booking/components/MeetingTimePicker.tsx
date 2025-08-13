'use client';

import { format } from 'date-fns';
import { useSuspenseQuery } from '@tanstack/react-query';

import { formatTime } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { Skeleton } from '@/shared/components/ui/skeleton';

import { timeSlotsQuery } from '../queries/time-slots-query';
import { useDateQueryState } from '../hooks/useDateQueryState';
import { useSlotQueryState } from '../hooks/useSlotQueryState';
import { useMonthQueryState } from '../hooks/useMonthQueryState';
import { eventDetailsQuery } from '../queries/event-details-query';
import { useTimezoneQueryState } from '../hooks/useTimezoneQueryState';

interface MeetingTimePickerProps {
  eventSlug: string;
}

export function MeetingTimePicker({ eventSlug }: MeetingTimePickerProps) {
  const { date } = useDateQueryState();
  const { month } = useMonthQueryState();
  const { setSlot } = useSlotQueryState();
  const { timezone } = useTimezoneQueryState();
  const { data: eventDetails } = useSuspenseQuery(eventDetailsQuery(eventSlug));
  const { data: allDateTimeSlots } = useSuspenseQuery(
    timeSlotsQuery({ month, eventId: eventDetails.id, timezone }),
  );
  const dateString = date ? format(date, 'yyyy-MM-dd') : null;
  const { slots: dateSlots } = allDateTimeSlots.find(
    (slot) => slot.date === dateString,
  ) ?? { slots: [] };

  return (
    <div className="bg-background flex w-50 flex-col p-6 pe-2">
      {date ? (
        <>
          <p className="mb-4 font-medium">{format(date, 'EEEE d')}</p>
          <div className="grow overflow-y-auto pointer-fine:pe-4">
            <div className="grid gap-2">
              {dateSlots.map((slot) => (
                <Button
                  key={slot}
                  size={'lg'}
                  variant={'outline'}
                  className="active:bg-primary/10 w-full"
                  onClick={() => setSlot(slot)}
                >
                  {formatTime(slot)}
                </Button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p className="text-center">Select a date to continue.</p>
      )}
    </div>
  );
}

export function MeetingTimePickerFallback() {
  return (
    <div className="bg-background w-50 space-y-4 p-6">
      <Skeleton className="h-[1lh]" />
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-10" />
        ))}
      </div>
    </div>
  );
}
