'use client';

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
  hostSlug: string;
}

export function BookingSteps({ eventSlug, hostSlug }: BookingStepsProps) {
  const { slot } = useSlotQueryState();
  const { date } = useDateQueryState();

  const dateSelected = !!date;
  const slotSelected = !!slot;

  if (dateSelected && slotSelected) {
    return <BookingForm eventSlug={eventSlug} hostSlug={hostSlug} />;
  }

  return (
    <>
      <MeetingDatePicker eventSlug={eventSlug} />
      <MeetingTimePicker eventSlug={eventSlug} />
    </>
  );
}

export function BookingStepsFallback() {
  return (
    <>
      <MeetingDatePickerFallback />
      <MeetingTimePickerFallback />
    </>
  );
}
