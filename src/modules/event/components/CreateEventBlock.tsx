import { Heading } from '@/shared/components/layout/Heading';
import { Description } from '@/shared/components/layout/Description';

import { CreateEventForm } from './CreateEventForm';

export function CreateEventBlock() {
  return (
    <section className="bg-background space-y-8 rounded-lg border p-6">
      <header>
        <Heading level={'h2'} className="mb-1.5">
          Event Details
        </Heading>
        <Description>
          Fill out the details of your event to get started.
        </Description>
      </header>

      <CreateEventForm />
    </section>
  );
}
