import { Heading } from '@/shared/components/layout/Heading';
import { EventList } from '@/modules/event/components/EventList';
import { SearchEvent } from '@/modules/event/components/SearchEvent';
import { FilterEvent } from '@/modules/event/components/FilterEvent';
import { CreateEventButton } from '@/modules/event/components/CreateEventButton';

export default function EventsPage() {
  return (
    <main>
      <Heading>Scheduling</Heading>

      <div className="space-y-8">
        <div className="bg-background flex items-center justify-between gap-4 rounded-lg border p-4">
          <div className="flex items-center gap-4">
            <SearchEvent />
            <FilterEvent />
          </div>
          <CreateEventButton />
        </div>
        <EventList />
      </div>
    </main>
  );
}
