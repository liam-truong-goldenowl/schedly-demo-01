'use client';

import { Suspense } from 'react';

import { useDateQueryState } from '../hooks/useDateQueryState';
import { useSlotQueryState } from '../hooks/useSlotQueryState';

import { BookingForm } from './BookingForm';
import {
  MeetingDatePicker,
  MeetingDatePickerFallback,
} from './MeetingDatePicker';
import {
  MeetingTimePicker,
  MeetingTimePickerFallback,
} from './MeetingTimePicker';

interface BookingStepsProps {
  eventSlug: string;
}

export function BookingSteps({ eventSlug }: BookingStepsProps) {
  const { slot } = useSlotQueryState();
  const { date } = useDateQueryState();

  const dateSelected = !!date;
  const slotSelected = !!slot;

  if (dateSelected && slotSelected) {
    return <BookingForm eventSlug={eventSlug} />;
  }

  return (
    <>
      <Suspense fallback={<MeetingDatePickerFallback />}>
        <MeetingDatePicker eventSlug={eventSlug} />
      </Suspense>
      <Suspense fallback={<MeetingTimePickerFallback />}>
        <MeetingTimePicker eventSlug={eventSlug} />
      </Suspense>
    </>
  );
}
