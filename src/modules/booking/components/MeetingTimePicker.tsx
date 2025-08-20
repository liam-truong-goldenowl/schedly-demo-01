'use client';

import { format } from 'date-fns';
import { useSuspenseQuery } from '@tanstack/react-query';

import { formatTime } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { Skeleton } from '@/shared/components/ui/skeleton';

import { useDateQueryState } from '../hooks/useDateQueryState';
import { useSlotQueryState } from '../hooks/useSlotQueryState';
import { useTimeSlotsQuery } from '../hooks/useTimeSlotsQuery';
import { eventDetailsQuery } from '../queries/event-details-query';

interface MeetingTimePickerProps {
  eventSlug: string;
}

export function MeetingTimePicker({ eventSlug }: MeetingTimePickerProps) {
  const { date } = useDateQueryState();
  const { setSlot } = useSlotQueryState();
  const { data: eventDetails } = useSuspenseQuery(eventDetailsQuery(eventSlug));
  const { timeSlots } = useTimeSlotsQuery(
    eventDetails.id,
    eventDetails.timezone,
    eventDetails.duration,
  );
  const dateString = date ? format(date, 'yyyy-MM-dd') : null;
  const { slots: dateSlots } = timeSlots.find(
    (slot) => slot.date === dateString,
  ) ?? { slots: [] };

  return (
    <div className="bg-background flex flex-col p-6 pe-2 min-[1010px]:w-50">
      {date ? (
        <>
          <p className="mb-4 font-medium">{format(date, 'EEEE d')}</p>
          <div className="grow overflow-y-auto pointer-fine:pe-4">
            <div className="grid gap-2 max-[1010px]:grid-cols-2">
              {dateSlots.map((slot) => (
                <Button
                  key={slot.dstSlot}
                  size={'lg'}
                  variant={'outline'}
                  className="active:bg-primary/10"
                  onClick={() => setSlot(slot.dstSlot)}
                >
                  {formatTime(slot.dstSlot)}
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
    <div className="bg-background space-y-4 p-6 min-[1010px]:w-50">
      <Skeleton className="h-[1lh]" />
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-10" />
        ))}
      </div>
    </div>
  );
}
