'use client';

import { useMemo } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Calendar } from '@/shared/components/ui/calendar';

import { timeSlotsQuery } from '../queries/time-slots-query';
import { useDateQueryState } from '../hooks/useDateQueryState';
import { useMonthQueryState } from '../hooks/useMonthQueryState';
import { eventDetailsQuery } from '../queries/event-details-query';
import { useTimezoneQueryState } from '../hooks/useTimezoneQueryState';

interface MeetingDatePickerProps {
  eventSlug: string;
}

export function MeetingDatePicker({ eventSlug }: MeetingDatePickerProps) {
  const today = new Date();
  const { date, setDate } = useDateQueryState();
  const { month, setMonthFromDate } = useMonthQueryState();
  const { data: eventDetails } = useSuspenseQuery(eventDetailsQuery(eventSlug));
  const { timezone } = useTimezoneQueryState();
  const { data: timeSlots } = useSuspenseQuery(
    timeSlotsQuery({
      month: month,
      eventId: eventDetails.id,
      timezone: timezone,
    }),
  );
  const unavailableDates = useMemo(
    () =>
      timeSlots
        .filter((slot) => slot.slots.length == 0)
        .map((slot) => new Date(slot.date)),
    [timeSlots],
  );

  function handleNextClick(date: Date) {
    setMonthFromDate(date);
    setDate(null);
  }

  function handlePrevClick(date: Date) {
    setMonthFromDate(date);
    setDate(null);
  }

  function handleSelect(newDate: Date | undefined) {
    if (newDate) {
      setDate(newDate);
    }
  }

  return (
    <div className="bg-background p-6">
      <Calendar
        mode="single"
        timeZone="utc"
        className="p-2 sm:pe-5"
        month={new Date(month)}
        selected={date || undefined}
        onSelect={handleSelect}
        onNextClick={handleNextClick}
        onPrevClick={handlePrevClick}
        disabled={[{ before: today }, ...unavailableDates]}
        showOutsideDays={false}
      />
    </div>
  );
}

export function MeetingDatePickerFallback() {
  const { month } = useMonthQueryState();

  return (
    <div className="bg-background p-6">
      <div className="relative">
        <Calendar
          mode="single"
          timeZone="utc"
          month={new Date(month)}
          className="p-2 sm:pe-5"
          showOutsideDays={false}
          loading={true}
        />
      </div>
    </div>
  );
}
