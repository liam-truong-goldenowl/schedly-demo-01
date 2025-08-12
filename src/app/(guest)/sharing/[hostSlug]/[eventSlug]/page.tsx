import { BookingSteps } from '@/modules/booking/components/BookingSteps';
import { EventDetails } from '@/modules/booking/components/EventDetails';

export default async function PublicEventPage({
  params,
}: {
  params: Promise<{ hostSlug: string; eventSlug: string }>;
}) {
  const { eventSlug } = await params;

  return (
    <main className="bg-muted flex min-h-dvh items-center justify-center">
      <div className="bg-border flex h-110 w-fit gap-0.5 overflow-clip rounded-lg border-2">
        <EventDetails eventSlug={eventSlug} />
        <BookingSteps eventSlug={eventSlug} />
      </div>
    </main>
  );
}
