import { Suspense } from 'react';

import {
  BookingSteps,
  BookingStepsFallback,
} from '@/modules/booking/components/BookingSteps';
import {
  EventDetails,
  EventDetailsFallback,
} from '@/modules/booking/components/EventDetails';

export default async function PublicEventPage({
  params,
}: {
  params: Promise<{ hostSlug: string; eventSlug: string }>;
}) {
  const { eventSlug, hostSlug } = await params;

  return (
    <main className="bg-muted flex min-h-dvh sm:items-center sm:justify-center">
      <div className="bg-border flex w-full gap-0.5 overflow-clip rounded-lg max-[1010px]:flex-col sm:w-fit sm:border-2">
        <Suspense fallback={<EventDetailsFallback />}>
          <EventDetails eventSlug={eventSlug} />
        </Suspense>
        <Suspense fallback={<BookingStepsFallback />}>
          <BookingSteps eventSlug={eventSlug} hostSlug={hostSlug} />
        </Suspense>
      </div>
    </main>
  );
}
