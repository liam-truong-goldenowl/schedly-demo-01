import { Heading } from '@/shared/components/layout/Heading';
import { EventList } from '@/modules/event/components/EventList';
import { CreateEventButton } from '@/modules/event/components/CreateEventButton';
import { VisitLandingPageLink } from '@/modules/event/components/VisitLandingPageLink';

export default function EventsPage() {
  return (
    <main>
      <Heading>Scheduling</Heading>
      <div className="space-y-8">
        <div className="bg-background flex items-center justify-end gap-4 rounded-lg border p-4">
          <CreateEventButton />
        </div>
        <div>
          <div className="flex items-center justify-end py-2">
            <VisitLandingPageLink />
          </div>
          <EventList />
        </div>
      </div>
    </main>
  );
}
