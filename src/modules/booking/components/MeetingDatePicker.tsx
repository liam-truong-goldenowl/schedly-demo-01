'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { Calendar } from '@/shared/components/ui/calendar';

import { useDateQueryState } from '../hooks/useDateQueryState';
import { useTimeSlotsQuery } from '../hooks/useTimeSlotsQuery';
import { useMonthQueryState } from '../hooks/useMonthQueryState';
import { eventDetailsQuery } from '../queries/event-details-query';

interface MeetingDatePickerProps {
  eventSlug: string;
}

export function MeetingDatePicker({ eventSlug }: MeetingDatePickerProps) {
  const today = new Date();
  const { date, setDate } = useDateQueryState();
  const { month, setMonthFromDate } = useMonthQueryState();
  const { data: event } = useSuspenseQuery(eventDetailsQuery(eventSlug));
  const { unavailableDates } = useTimeSlotsQuery(
    event.id,
    event.timezone,
    event.duration,
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
    <div className="bg-background flex justify-center p-6">
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
