import { Heading } from '@/shared/components/layout/Heading';
import { Description } from '@/shared/components/layout/Description';
import { BackToEventsPage } from '@/modules/event/components/BackToEventsPage';
import { CreateEventBlock } from '@/modules/event/components/CreateEventBlock';

export default function CreateEventPage() {
  return (
    <div className="mx-auto max-w-prose space-y-8">
      <header className="space-y-4">
        <BackToEventsPage />
        <Heading className="mb-2">Add a new event type</Heading>
        <Description>
          Create a new event type for people to book times with.
        </Description>
      </header>
      <main>
        <CreateEventBlock />
      </main>
    </div>
  );
}
