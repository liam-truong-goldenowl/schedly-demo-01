import { Suspense } from 'react';

import { EventDetails } from '@/modules/booking/components/EventDetails';
import {
  MeetingDatePicker,
  MeetingDatePickerFallback,
} from '@/modules/booking/components/MeetingDatePicker';
import {
  MeetingTimePicker,
  MeetingTimePickerFallback,
} from '@/modules/booking/components/MeetingTimePicker';

export default async function PublicEventPage({
  params,
}: {
  params: Promise<{ hostSlug: string; eventSlug: string }>;
}) {
  const { eventSlug } = await params;

  return (
    <main className="bg-muted flex min-h-dvh items-center justify-center">
      <div className="bg-border flex h-100 w-fit gap-0.5 overflow-clip rounded-lg border-2">
        <EventDetails eventSlug={eventSlug} />
        <Suspense fallback={<MeetingDatePickerFallback />}>
          <MeetingDatePicker eventSlug={eventSlug} />
        </Suspense>
        <Suspense fallback={<MeetingTimePickerFallback />}>
          <MeetingTimePicker eventSlug={eventSlug} />
        </Suspense>
      </div>
    </main>
  );
}
