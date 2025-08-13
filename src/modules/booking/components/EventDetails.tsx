'use client';

import { format } from 'date-fns';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  ClockIcon,
  GlobeIcon,
  MinusIcon,
  MapPinIcon,
  CalendarIcon,
} from 'lucide-react';

import { Heading } from '@/shared/components/layout/Heading';
import { TimezoneSelect } from '@/shared/components/TimezoneSelect';

import { useDateQueryState } from '../hooks/useDateQueryState';
import { useSlotQueryState } from '../hooks/useSlotQueryState';
import { eventDetailsQuery } from '../queries/event-details-query';
import { useTimezoneQueryState } from '../hooks/useTimezoneQueryState';

export function EventDetails({ eventSlug }: { eventSlug: string }) {
  const { data: eventDetails } = useSuspenseQuery(eventDetailsQuery(eventSlug));
  const { slot, setSlot, getStartTime, getEndTime } = useSlotQueryState();
  const { date, setDate } = useDateQueryState();
  const { timezone, setTimezone } = useTimezoneQueryState();

  const dateSelected = !!date;
  const slotSelected = !!slot;
  const isFillingTexts = dateSelected && slotSelected;

  function handleTimezoneChange(newTimezone: string) {
    setSlot(null);
    setDate(null);
    setTimezone(newTimezone);
  }

  return (
    <section className="bg-background max-w-prose p-6">
      <header>
        <p className="text-copy-16 mb-1.5 font-semibold text-gray-500">
          {eventDetails.host.name}
        </p>
        <Heading level={'h2'} className="mb-4">
          {eventDetails.name}
        </Heading>
      </header>
      <div className="text-copy-14 space-y-3">
        {eventDetails.description && (
          <p className="text-copy-14 mb-2 text-gray-500">
            {eventDetails.description}
          </p>
        )}
        {isFillingTexts && (
          <div className="flex items-start gap-2">
            <CalendarIcon size={16} className="mt-0.5" />
            <div className="space-y-1">
              <div>{format(date, 'PPPP')}</div>
              <div className="flex items-center gap-1">
                <span>{getStartTime()}</span>
                <MinusIcon size={16} />
                <span>{getEndTime(eventDetails.duration)}</span>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center gap-2">
          <ClockIcon size={16} />
          <span>{eventDetails.duration}m</span>
        </div>
        <div className="flex items-center gap-2">
          {eventDetails.location.type === 'in_person' && (
            <MapPinIcon size={16} />
          )}
          {eventDetails.location.details}
        </div>
        <div className="flex items-center gap-2">
          <GlobeIcon size={16} />
          {isFillingTexts ? (
            <span>{timezone}</span>
          ) : (
            <TimezoneSelect
              defaultTz={timezone}
              onChange={handleTimezoneChange}
            />
          )}
        </div>
      </div>
    </section>
  );
}
