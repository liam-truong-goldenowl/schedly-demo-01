'use client';

import { format } from 'date-fns';
import { useSuspenseQuery } from '@tanstack/react-query';

import { formatTime } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { Skeleton } from '@/shared/components/ui/skeleton';

import { useDateQueryState } from '../hooks/useDateQueryState';
import { useSlotQueryState } from '../hooks/useSlotQueryState';
import { eventDetailsQuery } from '../queries/event-details-query';
import { useTimezoneQueryState } from '../hooks/useTimezoneQueryState';
import { availableStartTimesQuery } from '../queries/available-start-times-query';

interface MeetingTimePickerProps {
  eventSlug: string;
}

export function MeetingTimePicker({ eventSlug }: MeetingTimePickerProps) {
  const { date } = useDateQueryState();
  const dateString = date ? format(date, 'yyyy-MM-dd') : null;
  const { data: eventDetails } = useSuspenseQuery(eventDetailsQuery(eventSlug));
  const { timezone } = useTimezoneQueryState(eventDetails.timezone);
  const { setSlot } = useSlotQueryState();
  const { data: timeSlots } = useSuspenseQuery(
    availableStartTimesQuery({
      dateString,
      timezone,
      eventId: eventDetails.id,
    }),
  );

  return (
    <div className="bg-background flex w-50 flex-col p-6 pe-2">
      {date ? (
        <>
          <p className="mb-4 font-medium">{format(date, 'EEEE d')}</p>
          <div className="grow overflow-y-auto pointer-fine:pe-4">
            <div className="grid gap-2">
              {timeSlots.map((timeSlot) => (
                <Button
                  key={timeSlot}
                  size={'lg'}
                  variant={'outline'}
                  className="active:bg-primary/10 w-full"
                  onClick={() => setSlot(timeSlot)}
                >
                  {formatTime(timeSlot)}
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
