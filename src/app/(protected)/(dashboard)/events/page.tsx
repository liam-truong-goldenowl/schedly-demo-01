import { Heading } from '@/shared/components/layout/Heading';
import { EventList } from '@/modules/event/components/EventList';
import { Description } from '@/shared/components/layout/Description';
import { CreateEventButton } from '@/modules/event/components/CreateEventButton';

export default function EventsPage() {
  return (
    <>
      <header className="mb-8 flex items-center justify-between">
        <div>
          <Heading className="mb-0">Event Types</Heading>
          <Description>
            Create events to share for people to book on your calendar.
          </Description>
        </div>
        <CreateEventButton />
      </header>
      <main>
        <EventList />
      </main>
    </>
  );
}
