import { Heading } from '@/shared/components/layout/Heading';
import { Description } from '@/shared/components/layout/Description';
import { BackToEventsPage } from '@/modules/event/components/BackToEventsPage';
import { CreateEventBlock } from '@/modules/event/components/CreateEventBlock';

export default function CreateEventPage() {
  return (
    <main className="mx-auto max-w-prose space-y-8">
      <header className="space-y-4">
        <BackToEventsPage />
        <Heading className="mb-2">Create Event</Heading>
        <Description>Set up a new event for your clients</Description>
      </header>

      <CreateEventBlock />
    </main>
  );
}
