'use client';

import { DateTime } from 'luxon';
import { format } from 'date-fns';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  ClockIcon,
  GlobeIcon,
  MinusIcon,
  MapPinIcon,
  CalendarIcon,
} from 'lucide-react';

import { formatTime } from '@/shared/lib/utils';
import { Heading } from '@/shared/components/layout/Heading';
import { TimezoneSelect } from '@/shared/components/TimezoneSelect';

import { useDateQueryState } from '../hooks/useDateQueryState';
import { useSlotQueryState } from '../hooks/useSlotQueryState';
import { eventDetailsQuery } from '../queries/event-details-query';
import { useTimezoneQueryState } from '../hooks/useTimezoneQueryState';

export function EventDetails({ eventSlug }: { eventSlug: string }) {
  const { data: eventDetails } = useSuspenseQuery(eventDetailsQuery(eventSlug));
  const { setTimezone, timezone } = useTimezoneQueryState(
    eventDetails.timezone,
  );
  const { slot } = useSlotQueryState();
  const { date } = useDateQueryState();

  const dateSelected = !!date;
  const slotSelected = !!slot;
  const isFillingTexts = dateSelected && slotSelected;

  return (
    <section
      className="bg-background max-w-prose p-6"
      aria-labelledby="event-title"
    >
      <header>
        <p
          className="text-copy-16 mb-1.5 font-semibold text-gray-500"
          aria-label={`Event host: ${eventDetails.host.name}`}
        >
          {eventDetails.host.name}
        </p>
        <Heading level={'h2'} id="event-title" className="mb-4">
          {eventDetails.name}
        </Heading>
      </header>
      <div className="text-copy-14 space-y-3">
        {eventDetails.description && (
          <p
            aria-label="Event description"
            className="text-copy-14 mb-2 text-gray-500"
          >
            {eventDetails.description}
          </p>
        )}
        {isFillingTexts && (
          <div className="flex items-start gap-2">
            <CalendarIcon size={16} className="mt-0.5" />
            <div className="space-y-1">
              <div>{format(date, 'PPPP')}</div>
              <div className="flex items-center gap-1">
                <span>{formatTime(slot)}</span>
                <MinusIcon size={16} />
                <span>
                  {DateTime.fromFormat(slot, 'HH:mm:ss')
                    .plus({
                      minutes: eventDetails.duration,
                    })
                    .toFormat('HH:mm a')}
                </span>
              </div>
            </div>
          </div>
        )}
        <div
          aria-label={`Duration: ${eventDetails.duration}`}
          className="flex items-center gap-2"
        >
          <ClockIcon size={16} />
          <span>{eventDetails.duration}m</span>
        </div>
        <div
          aria-label={`Location type: ${eventDetails.location.type}, details: ${eventDetails.location.details}`}
          className="flex items-center gap-2"
        >
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
            <TimezoneSelect onChange={setTimezone} defaultTz={timezone} />
          )}
        </div>
      </div>
    </section>
  );
}
